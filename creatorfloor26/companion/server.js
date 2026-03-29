/**
 * CreatorFloor Companion — localhost API for folder-scoped file access (Rojo / Studio projects).
 * Runs independently on port 3002. Point scope at your game repo root.
 * Access is folder-scoped, revocable, and logged. No background access.
 * Compatible with Solo Companion (port 3847) — both can run simultaneously.
 */
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");

const PORT = process.env.COMPANION_PORT || 3002;
let allowedRoot = process.env.COMPANION_ROOT || null; // revocable: set to null to revoke

const app = express();
app.use(express.json({ limit: "10mb" }));

function log(method, url, detail = "") {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${method} ${url} ${detail}`);
}

function resolveSafe(relativePath) {
  if (!allowedRoot) return null;
  const normalized = path.normalize(relativePath || ".").replace(/^(\.\.(\/|\\))+/, "");
  const resolved = path.resolve(allowedRoot, normalized);
  return resolved.startsWith(allowedRoot) ? resolved : null;
}

const EXEC_MAX_OUTPUT = 80_000;
const ALLOWED_COMMANDS = [
  /^npm run lint(?:\s+--.*)?$/i,
  /^npm run build(?:\s+--.*)?$/i,
  /^npm test(?:\s+--.*)?$/i,
  /^npm run test(?:\s+--.*)?$/i,
  /^pnpm lint(?:\s+--.*)?$/i,
  /^pnpm build(?:\s+--.*)?$/i,
  /^pnpm test(?:\s+--.*)?$/i,
  /^yarn lint(?:\s+--.*)?$/i,
  /^yarn build(?:\s+--.*)?$/i,
  /^yarn test(?:\s+--.*)?$/i,
  /^git status(?:\s+--.*)?$/i,
  /^git diff(?:\s+--.*)?$/i,
  /^git rev-parse --abbrev-ref HEAD$/i,
  /^git add\s+(\.|[A-Za-z0-9._/:-]+)$/i,
  /^git commit -m\s+("[^"]+"|'[^']+')$/i,
  /^git push(?:\s+-u)?(?:\s+[A-Za-z0-9._/-]+){0,2}$/i,
  /^git pull --ff-only(?:\s+[A-Za-z0-9._/-]+){0,2}$/i,
  /^git branch(?:\s+--show-current)?$/i,
  /^git checkout -b\s+[A-Za-z0-9._/-]+$/i,
  /^git switch -c\s+[A-Za-z0-9._/-]+$/i,
  /^ls(?:\s+.*)?$/i,
  /^pwd$/i,
];

function validateCommand(command, cwd) {
  const trimmed = (command || "").trim();
  if (!trimmed) {
    return { ok: false, error: "command is required" };
  }

  // Block shell chaining/injection primitives.
  if (/[;&|`]|>\s*|<\s*|\$\(/.test(trimmed)) {
    return { ok: false, error: "Command contains blocked shell operators" };
  }

  // Guardrails for git push.
  if (/^git push\b/i.test(trimmed)) {
    if (/(^|\s)--force(\s|$)|(^|\s)-f(\s|$)/i.test(trimmed)) {
      return { ok: false, error: "Force push is not allowed by Companion policy" };
    }
    if (/\b(main|master)\b/i.test(trimmed)) {
      return { ok: false, error: "Direct push to main/master is blocked by Companion policy" };
    }
  }

  // Strongly encourage running git commands from repo root scope.
  if (/^git\s+/i.test(trimmed) && typeof cwd === "string" && cwd.trim() === "") {
    return { ok: false, error: "git commands require a scoped cwd path (e.g. 'projectbuild-app')" };
  }

  const allowed = ALLOWED_COMMANDS.some((re) => re.test(trimmed));
  if (!allowed) {
    return { ok: false, error: "Command not allowed by Companion policy" };
  }
  return { ok: true };
}

function truncateOutput(text) {
  if (!text || text.length <= EXEC_MAX_OUTPUT) return { text, truncated: false };
  return { text: text.slice(0, EXEC_MAX_OUTPUT), truncated: true };
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // localhost only in practice
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// GET /api/scope — is a folder allowed?
app.get("/api/scope", (req, res) => {
  log("GET", "/api/scope");
  if (allowedRoot) {
    res.json({ ok: true, allowed: true, root: allowedRoot });
  } else {
    res.json({ ok: true, allowed: false });
  }
});

// POST /api/scope — set or revoke allowed root folder
app.post("/api/scope", async (req, res) => {
  const { path: userPath } = req.body || {};
  log("POST", "/api/scope", userPath ? `path=${userPath}` : "revoke");
  if (!userPath || typeof userPath !== "string" || !userPath.trim()) {
    allowedRoot = null;
    return res.json({ ok: true, allowed: false, revoked: true });
  }
  const candidate = path.resolve(userPath.trim());
  try {
    const stat = await fs.stat(candidate);
    if (!stat.isDirectory()) {
      return res.status(400).json({ ok: false, error: "Not a directory" });
    }
    allowedRoot = candidate;
    res.json({ ok: true, allowed: true, root: allowedRoot });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message || "Directory not found" });
  }
});

// GET /api/list?path= — list directory (path relative to root)
app.get("/api/list", async (req, res) => {
  const relativePath = req.query.path || "";
  log("GET", "/api/list", `path=${relativePath}`);
  const resolved = resolveSafe(relativePath);
  if (!resolved) {
    return res.status(403).json({ ok: false, error: "No scope set or path not allowed" });
  }
  try {
    const entries = await fs.readdir(resolved, { withFileTypes: true });
    const list = entries.map((d) => ({
      name: d.name,
      isDirectory: d.isDirectory(),
    }));
    res.json({ ok: true, entries: list });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message || "List failed" });
  }
});

// GET /api/read?path= — read file
app.get("/api/read", async (req, res) => {
  const relativePath = req.query.path || "";
  log("GET", "/api/read", `path=${relativePath}`);
  const resolved = resolveSafe(relativePath);
  if (!resolved) {
    return res.status(403).json({ ok: false, error: "No scope set or path not allowed" });
  }
  try {
    const stat = await fs.stat(resolved);
    if (stat.isDirectory()) {
      return res.status(400).json({ ok: false, error: "Cannot read directory as file" });
    }
    const content = await fs.readFile(resolved, "utf-8");
    res.json({ ok: true, content });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message || "Read failed" });
  }
});

// POST /api/write — write file (body: { path, content })
app.post("/api/write", async (req, res) => {
  const { path: relativePath, content } = req.body || {};
  log("POST", "/api/write", relativePath ? `path=${relativePath}` : "");
  const resolved = resolveSafe(relativePath);
  if (!resolved) {
    return res.status(403).json({ ok: false, error: "No scope set or path not allowed" });
  }
  if (typeof content !== "string") {
    return res.status(400).json({ ok: false, error: "content must be a string" });
  }
  try {
    await fs.mkdir(path.dirname(resolved), { recursive: true });
    await fs.writeFile(resolved, content, "utf-8");
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message || "Write failed" });
  }
});

// GET /api/git/branch — returns the current git branch for the scoped root
app.get("/api/git/branch", (req, res) => {
  log("GET", "/api/git/branch");
  if (!allowedRoot) {
    return res.status(403).json({ ok: false, error: "No scope set" });
  }
  exec("git rev-parse --abbrev-ref HEAD", { cwd: allowedRoot }, (err, stdout) => {
    if (err) {
      return res.json({ ok: true, branch: null, error: "Not a git repo or git unavailable" });
    }
    res.json({ ok: true, branch: stdout.trim() });
  });
});

// POST /api/exec — run a safe command in scoped root (or scoped cwd)
app.post("/api/exec", (req, res) => {
  const { command, cwd } = req.body || {};
  log("POST", "/api/exec", command ? `command=${String(command).slice(0, 120)}` : "");

  if (!allowedRoot) {
    return res.status(403).json({ ok: false, error: "No scope set" });
  }

  if (typeof command !== "string" || !command.trim()) {
    return res.status(400).json({ ok: false, error: "command is required" });
  }

  const validation = validateCommand(command, cwd);
  if (!validation.ok) {
    return res.status(403).json({
      ok: false,
      error: validation.error,
      allowedExamples: [
        "npm run lint",
        "npm run build",
        "npm test",
        "git status",
        "git diff",
        "git add .",
        "git commit -m \"message\"",
        "git push -u origin feature/my-branch",
      ],
    });
  }

  const runCwd = resolveSafe(typeof cwd === "string" ? cwd : ".") || allowedRoot;
  if (!runCwd) {
    return res.status(403).json({ ok: false, error: "cwd is outside scoped root" });
  }

  exec(
    command,
    {
      cwd: runCwd,
      timeout: 60_000,
      maxBuffer: 1024 * 1024,
    },
    (err, stdout, stderr) => {
      const out = truncateOutput(stdout || "");
      const errOut = truncateOutput(stderr || "");

      if (err) {
        return res.json({
          ok: false,
          exitCode: typeof err.code === "number" ? err.code : 1,
          signal: err.signal || null,
          stdout: out.text,
          stderr: errOut.text || err.message,
          truncated: out.truncated || errOut.truncated,
        });
      }

      return res.json({
        ok: true,
        exitCode: 0,
        stdout: out.text,
        stderr: errOut.text,
        truncated: out.truncated || errOut.truncated,
      });
    }
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`CreatorFloor Companion listening on http://127.0.0.1:${PORT}`);
  if (allowedRoot) console.log(`Scope: ${allowedRoot}`);
  else console.log("Scope: not set (set COMPANION_ROOT or POST /api/scope)");
});
