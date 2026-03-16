/**
 * ProjectBuild Companion — localhost API for folder-scoped file access.
 * Runs independently on port 3001. Web app stays hosted; this runs on the user's machine.
 * Access is folder-scoped, revocable, and logged. No background access.
 * Compatible with Solo Companion (port 3847) — both can run simultaneously.
 */
const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { exec } = require("child_process");

const PORT = process.env.COMPANION_PORT || 3001;
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

app.listen(PORT, "127.0.0.1", () => {
  console.log(`ProjectBuild Companion listening on http://127.0.0.1:${PORT}`);
  if (allowedRoot) console.log(`Scope: ${allowedRoot}`);
  else console.log("Scope: not set (set COMPANION_ROOT or POST /api/scope)");
});
