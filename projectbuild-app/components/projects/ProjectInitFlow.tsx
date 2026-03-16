"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AGENT_BANK_DEFAULTS,
  INDUSTRY_OPTIONS,
  STARTER_SPINE,
  isSingleSentence,
  type AgentRoleKey,
  type IndustryOption,
} from "@/lib/projectInit/config";
import {
  createProjectWithInitialization,
  type InitProgressKey,
  type InitProgressState,
} from "@/lib/projectInit/createProjectWithInitialization";

interface ProjectInitFlowProps {
  onClose: () => void;
}

type ProgressMap = Record<InitProgressKey, InitProgressState>;

const STEPS = [
  "Project Basics",
  "Spine Selection",
  "Agent Roster",
  "Ready",
] as const;

const PROGRESS_ORDER: { key: InitProgressKey; label: string }[] = [
  { key: "create_workspace", label: "Creating project workspace..." },
  { key: "load_spine_context", label: "Loading Starter Spine context..." },
  { key: "brief_agents", label: "Briefing your agents..." },
  { key: "seed_project_memory", label: "Seeding project memory..." },
];

const INITIAL_PROGRESS: ProgressMap = {
  create_workspace: "pending",
  load_spine_context: "pending",
  brief_agents: "pending",
  seed_project_memory: "pending",
};

function statusClass(status: InitProgressState): string {
  if (status === "done") return "text-amber-300";
  if (status === "in_progress") return "text-amber-300/80 animate-pulse";
  return "text-[var(--muted)]/45";
}

export function ProjectInitFlow({ onClose }: ProjectInitFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [industry, setIndustry] = useState<IndustryOption | "">("");

  const [spineId, setSpineId] = useState(STARTER_SPINE.id);
  const [selectedRoles, setSelectedRoles] = useState<AgentRoleKey[]>(
    AGENT_BANK_DEFAULTS.map((agent) => agent.role)
  );

  const [errors, setErrors] = useState<{ name?: string; description?: string; roster?: string; submit?: string }>({});
  const [progress, setProgress] = useState<ProgressMap>(INITIAL_PROGRESS);
  const [isRunning, setIsRunning] = useState(false);

  const canClose = !isRunning;
  const selectedAgents = useMemo(
    () => AGENT_BANK_DEFAULTS.filter((agent) => selectedRoles.includes(agent.role)),
    [selectedRoles]
  );

  async function startInitialization() {
    setIsRunning(true);
    setErrors((prev) => ({ ...prev, submit: undefined }));
    setProgress(INITIAL_PROGRESS);

    try {
      const projectId = await createProjectWithInitialization(
        {
          name: projectName,
          description: projectDescription,
          industry: industry || undefined,
          selectedRoles,
        },
        (key, state) => {
          setProgress((prev) => ({ ...prev, [key]: state }));
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 500));
      router.push(`/projects/${projectId}/room`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Initialization failed";
      setErrors((prev) => ({ ...prev, submit: msg }));
      setIsRunning(false);
    }
  }

  function validateStep1(): boolean {
    const nextErrors: { name?: string; description?: string } = {};
    if (!projectName.trim()) {
      nextErrors.name = "Project name is required.";
    }
    if (!projectDescription.trim()) {
      nextErrors.description = "Project brief is required.";
    } else if (!isSingleSentence(projectDescription)) {
      nextErrors.description = "Use one sentence max.";
    }
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  }

  function validateStep3(): boolean {
    if (selectedRoles.length < 1) {
      setErrors((prev) => ({ ...prev, roster: "Select at least one agent." }));
      return false;
    }
    setErrors((prev) => ({ ...prev, roster: undefined }));
    return true;
  }

  function goNext() {
    if (step === 0 && !validateStep1()) return;
    if (step === 2 && !validateStep3()) return;
    setErrors({});
    if (step === 2) {
      setStep(3);
      void startInitialization();
      return;
    }
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  }

  function goBack() {
    if (step <= 0 || isRunning) return;
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }

  function toggleRole(role: AgentRoleKey) {
    setErrors((prev) => ({ ...prev, roster: undefined }));
    setSelectedRoles((prev) =>
      prev.includes(role)
        ? prev.filter((value) => value !== role)
        : [...prev, role]
    );
  }

  const headerLabel = STEPS[step];
  const showBack = step > 0 && step < 3;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-y-0 left-72 right-0 flex flex-col bg-[#111113] border-l border-white/10">
        <div className="h-24 border-b border-white/10 px-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-300/80 font-mono">
              Project Initialization
            </span>
            <span className="text-[10px] text-[var(--muted)]/60 font-mono">
              / {headerLabel}
            </span>
          </div>
          <button
            type="button"
            disabled={!canClose}
            onClick={onClose}
            className="rounded-full border border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-blue)]/70 hover:bg-white/5 disabled:opacity-40"
          >
            Cancel
          </button>
        </div>

        <div className="px-10 pt-5">
          <div className="flex items-center gap-2">
            {STEPS.map((label, index) => {
              const isActive = index === step;
              const isComplete = index < step;
              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`h-2.5 w-2.5 rounded-full border ${
                      isComplete || isActive
                        ? "bg-amber-300 border-amber-300"
                        : "bg-transparent border-white/20"
                    }`}
                  />
                  {index < STEPS.length - 1 && <div className="w-8 h-px bg-white/15" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-10 py-8">
          {step === 0 && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-[24px] text-[var(--text-bright)] font-semibold tracking-tight">Project basics</h2>
                <p className="text-[12px] text-[var(--muted)] mt-2">
                  Start with the brief your agents will use before they say a word.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--text-blue)]/70">
                    Project name
                  </span>
                  <input
                    autoFocus
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-[14px] text-[var(--text-blue)] outline-none focus:border-amber-300/60"
                  />
                  {errors.name && <p className="mt-2 text-[11px] text-amber-300/90">{errors.name}</p>}
                </label>

                <label className="block">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--text-blue)]/70">
                    What are you building?
                  </span>
                  <p className="mt-1 text-[11px] text-[var(--muted)]">
                    One sentence. This briefs your agents before they say a word.
                  </p>
                  <input
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Describe the product in one sentence"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-[14px] text-[var(--text-blue)] outline-none focus:border-amber-300/60"
                  />
                  {errors.description && (
                    <p className="mt-2 text-[11px] text-amber-300/90">{errors.description}</p>
                  )}
                </label>

                <label className="block max-w-sm">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[var(--text-blue)]/70">
                    Industry (optional)
                  </span>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as IndustryOption | "")}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-[13px] text-[var(--text-blue)] outline-none focus:border-amber-300/60"
                  >
                    <option value="">Select industry</option>
                    {INDUSTRY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[24px] text-[var(--text-bright)] font-semibold tracking-tight">
                  Your infrastructure foundation.
                </h2>
                <p className="text-[12px] text-[var(--muted)] mt-2">80% of your stack, ready on day one.</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setSpineId(STARTER_SPINE.id)}
                  className={`text-left rounded-2xl border p-5 ${
                    spineId === STARTER_SPINE.id
                      ? "border-amber-300 bg-amber-300/5"
                      : "border-white/10 bg-black/20"
                  }`}
                >
                  <p className="text-[14px] text-[var(--text-bright)] font-medium">{STARTER_SPINE.name}</p>
                  <p className="text-[11px] text-[var(--muted)] mt-1">{STARTER_SPINE.stack}</p>
                  <ul className="mt-4 space-y-1">
                    {STARTER_SPINE.included.map((item) => (
                      <li key={item} className="text-[11px] text-[var(--text-blue)]/80">
                        - {item}
                      </li>
                    ))}
                  </ul>
                </button>

                {["AWS Native spine", "GCP Native spine"].map((name) => (
                  <div
                    key={name}
                    className="rounded-2xl border border-white/10 bg-black/30 p-5 opacity-60"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[14px] text-[var(--text-bright)]/70 font-medium">{name}</p>
                      <span className="text-[12px]">🔒</span>
                    </div>
                    <p className="text-[11px] text-[var(--muted)] mt-1">Coming soon</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[24px] text-[var(--text-bright)] font-semibold tracking-tight">Your team is ready.</h2>
                <p className="text-[12px] text-[var(--muted)] mt-2">
                  Four agents ship with every project. They already know your stack.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {AGENT_BANK_DEFAULTS.map((agent) => {
                  const isSelected = selectedRoles.includes(agent.role);
                  return (
                    <button
                      key={agent.role}
                      type="button"
                      onClick={() => toggleRole(agent.role)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        isSelected
                          ? "border-amber-300 bg-amber-300/5"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-[14px] text-[var(--text-bright)] font-medium">{agent.name}</p>
                        <span className={isSelected ? "text-amber-300" : "text-white/30"}>
                          {isSelected ? "✓" : "○"}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] text-[var(--muted)] leading-relaxed">{agent.persona}</p>
                    </button>
                  );
                })}
              </div>

              {errors.roster && <p className="text-[11px] text-amber-300/90">{errors.roster}</p>}

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] text-[var(--text-blue)]/70 hover:text-amber-300 transition-colors"
              >
                Need more? Browse the agent marketplace →
              </a>
              {/* TODO: wire to agent marketplace when built */}
            </div>
          )}

          {step === 3 && (
            <div className="max-w-3xl space-y-5">
              <div>
                <h2 className="text-[24px] text-[var(--text-bright)] font-semibold tracking-tight">Building your project.</h2>
              </div>

              <div className="space-y-3">
                {PROGRESS_ORDER.map((item) => {
                  const status = progress[item.key];
                  return (
                    <div
                      key={item.key}
                      className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 flex items-center justify-between"
                    >
                      <span className={`text-[12px] font-mono ${statusClass(status)}`}>{item.label}</span>
                      <span className={`text-[14px] ${statusClass(status)}`}>
                        {status === "done" ? "✓" : status === "in_progress" ? "●" : "○"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                <p className="text-[11px] text-[var(--muted)]">
                  Spine: {STARTER_SPINE.name} · Agents: {selectedAgents.map((agent) => agent.name).join(", ")}
                </p>
              </div>

              {errors.submit && (
                <div className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3">
                  <p className="text-[11px] text-amber-300/90">{errors.submit}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-20 border-t border-white/10 px-10 flex items-center justify-between">
          <div>
            {showBack ? (
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-white/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-blue)]/70 hover:bg-white/5"
              >
                Back
              </button>
            ) : (
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--muted)]/45">
                Step {step + 1} of {STEPS.length}
              </span>
            )}
          </div>

          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full border border-amber-300/60 bg-amber-300/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300 hover:bg-amber-300/20"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              disabled={isRunning}
              onClick={() => {
                if (isRunning) return;
                void startInitialization();
              }}
              className="rounded-full border border-white/10 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-blue)]/60 disabled:opacity-50"
            >
              {isRunning ? "Initializing..." : "Retry"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
