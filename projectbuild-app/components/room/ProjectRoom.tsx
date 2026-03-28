"use client";

import { useState, useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useTracks } from "@/lib/hooks/useTracks";
import { useTTS } from "@/lib/hooks/useTTS";
import { ProjectSurfaceShell } from "@/components/layout/ProjectSurfaceShell";
import { MessageFeed } from "@/components/messages/MessageFeed";
import { BottomInputBar } from "@/components/input/BottomInputBar";
import { BuilderButtonAndShell } from "@/components/builder/BuilderButtonAndShell";
import { DesignerButtonAndShell } from "@/components/designer/DesignerButtonAndShell";
import Link from "next/link";
import type { Agent, RunSimpleResponse, BoardAction } from "@/types";

interface ProjectRoomProps {
  projectId: string;
}

const RUN_ID_KEY = (projectId: string) => `pb_runId_${projectId}`;

function getOrCreateRunId(projectId: string): string {
  if (typeof window === "undefined") return `run_${projectId}`;
  const stored = window.localStorage.getItem(RUN_ID_KEY(projectId));
  if (stored) return stored;
  const newId = `run_${projectId}_${Date.now()}`;
  window.localStorage.setItem(RUN_ID_KEY(projectId), newId);
  return newId;
}

export function ProjectRoom({ projectId }: ProjectRoomProps) {
  const showTracks = process.env.NEXT_PUBLIC_SHOW_TRACK_ROUTES === "1";
  const tracks = useTracks(projectId);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentsLoaded, setAgentsLoaded] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState("");
  const [runError, setRunError] = useState<string | null>(null);
  const seededWelcomeRef = useRef(false);
  const { supported: ttsSupported, enabled: ttsEnabled, speaking: ttsSpeaking, speak, toggle: toggleTTS } = useTTS();

  // Load run ID client-side (avoids SSR mismatch)
  useEffect(() => {
    setRunId(getOrCreateRunId(projectId));
  }, [projectId]);

  // Load agents from Core via our API proxy
  useEffect(() => {
    setAgentsLoaded(false);
    fetch(`/api/agents/list?projectId=${projectId}`)
      .then((r) => r.json())
      .then((d: { items?: Agent[] }) => {
        const items = d.items ?? [];
        setAgents(items);
        if (items.length > 0) setSelectedAgentId(items[0].id);
      })
      .catch(() => {})
      .finally(() => setAgentsLoaded(true));
  }, [projectId]);

  // Seed welcome message after agents load — uses /agents/{id}/self for contextual opening.
  useEffect(() => {
    if (!runId || !agentsLoaded || seededWelcomeRef.current) return;
    seededWelcomeRef.current = true;

    void (async () => {
      const projectRef = doc(db, "pb_projects", projectId);
      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data() as
        | { initialization?: { cognitivePreload?: unknown; welcomeSeededAt?: unknown }; name?: string }
        | undefined;
      const initialization = projectData?.initialization;

      if (!initialization?.cognitivePreload || initialization.welcomeSeededAt) {
        return;
      }

      const existing = await getDocs(
        query(
          collection(db, "pb_messages"),
          where("projectId", "==", projectId),
          where("runId", "==", runId),
          limit(1)
        )
      );

      if (!existing.empty) {
        await updateDoc(projectRef, { "initialization.welcomeSeededAt": serverTimestamp() });
        return;
      }

      const leadAgent = agents[0];
      const agentName = leadAgent?.jobTitle ?? "Systems Architect";

      let welcomeText = "I've reviewed the project brief and the starter spine. Ready when you are.";

      if (leadAgent) {
        try {
          const selfRes = await fetch(`/api/agents/${leadAgent.id}/self`);
          if (selfRes.ok) {
            const selfData = (await selfRes.json()) as {
              self?: {
                recent_gov_decisions?: { action?: string; outcome?: string; reason?: string }[];
                roster?: { name?: string; job_title?: string }[];
              };
            };
            const govDecisions = selfData?.self?.recent_gov_decisions;
            const roster = selfData?.self?.roster;

            if (govDecisions && govDecisions.length > 0) {
              const latest = govDecisions[0];
              const govLine = [latest.outcome, latest.action, latest.reason].filter(Boolean).join(" — ");
              const rosterNames = roster && roster.length > 0
                ? roster.map((r) => r.job_title ?? r.name).join(", ")
                : null;
              welcomeText = rosterNames
                ? `Back in ${projectData?.name ?? "the project"}. Last governance thread: ${govLine}. ${rosterNames} ${roster!.length === 1 ? "is" : "are"} on the roster. Want to extend that thread or tackle something new?`
                : `Back in ${projectData?.name ?? "the project"}. Last governance thread: ${govLine}. Want to pick that up or go a different direction?`;
            } else if (roster && roster.length > 0) {
              const rosterNames = roster.map((r) => r.job_title ?? r.name).join(", ");
              welcomeText = `I've reviewed the project brief. ${rosterNames} ${roster.length === 1 ? "is" : "are"} on the roster with me. What are we tackling first?`;
            }
          }
        } catch {
          // Non-fatal: fall through to static welcome
        }
      }

      await addDoc(collection(db, "pb_messages"), {
        projectId,
        runId,
        text: welcomeText,
        authorType: "agent",
        authorName: agentName,
        agentJobTitle: agentName,
        agentId: leadAgent?.id,
        createdAt: serverTimestamp(),
      });

      await updateDoc(projectRef, { "initialization.welcomeSeededAt": serverTimestamp() });
    })().catch((err) => {
      console.error("[Room] failed to seed welcome message:", err);
    });
  }, [projectId, runId, agentsLoaded, agents]);

  const handleSend = async (text: string) => {
    if (!runId) return;
    setIsRunning(true);
    setRunError(null);

    // Write human message to Firestore immediately
    await addDoc(collection(db, "pb_messages"), {
      projectId,
      runId,
      text,
      authorType: "human",
      authorName: "You",
      createdAt: serverTimestamp(),
    });

    try {
      const res = await fetch("/api/agent/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgentId,
          message: text,
          memoryScope: "working",
          runId,
          projectId,
        }),
      });

      const data = (await res.json()) as RunSimpleResponse;

      // 429 = turn cap or rate limit — surface the reason explicitly
      if (res.status === 429) {
        const reason = (data as { error?: string }).error ?? "Turn limit reached. Start a new conversation or contact your admin to adjust limits.";
        setRunError(reason);
        setIsRunning(false);
        return;
      }

      if (data.reply) {
        // Collect applied board actions for display in the bubble
        const boardActions = (data.actions ?? []).filter(
          (a): a is Extract<BoardAction, { ok: true; clientExecute: true }> =>
            "clientExecute" in a && a.ok === true
        );
        const actionsApplied = boardActions.map((a) => {
          if (a.type === "create_board_task") return `Created task: ${a.payload.title}`;
          if (a.type === "move_board_task") return `Moved task`;
          if (a.type === "assign_board_task") return `Assigned task`;
          return (a as { type: string }).type;
        });

        // Write agent reply to Firestore
        const guardrails = data.trace?.guardrails ?? {};
        await addDoc(collection(db, "pb_messages"), {
          projectId,
          runId,
          text: data.reply,
          authorType: "agent",
          agentId: selectedAgentId,
          agentJobTitle: agents.find((a) => a.id === selectedAgentId)?.jobTitle ?? "Agent",
          truthPosture: data.truthPosture ?? "inferred",
          actionsApplied,
          ...(guardrails.inputTruncated && { inputTruncated: true }),
          ...(guardrails.maxTurnsPerMeeting != null && { maxTurnsPerMeeting: guardrails.maxTurnsPerMeeting }),
          createdAt: serverTimestamp(),
        });

        // Apply board actions if any
        if (boardActions.length > 0) {
          // Board hook lives on the board page — post a custom event so board can react
          window.dispatchEvent(
            new CustomEvent("pb:boardActions", { detail: boardActions })
          );
        }
      }
    } catch (e) {
      console.error("[Room] run failed:", e);
      setRunError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <ProjectSurfaceShell
      projectId={projectId}
      breadcrumb="Room"
      headerActions={
        <>
          <BuilderButtonAndShell projectId={projectId} runId={runId} />
          <DesignerButtonAndShell projectId={projectId} />
          <Link
            href={`/projects/${projectId}/ledger`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
          >
            Ledger
          </Link>
          <Link
            href={`/projects/${projectId}/board`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-blue)] hover:bg-white/10 transition-colors"
          >
            PM Board
          </Link>
          {showTracks && (
            <Link
              href={`/projects/${projectId}/tracks/new`}
              className="bg-white text-black px-6 py-2 rounded-full font-bold text-[10px] tracking-widest uppercase soft-elevate"
            >
              New Track
            </Link>
          )}
        </>
      }
      center={
        <>
          {isRunning && (
            <div className="px-12 pt-4 shrink-0">
              <span className="text-[11px] text-[var(--muted)] animate-pulse">
                {agents.find((a) => a.id === selectedAgentId)?.jobTitle ?? "Agent"} is thinking…
              </span>
            </div>
          )}

          {runError && (
            <div className="mx-12 mt-4 shrink-0 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start justify-between gap-3">
              <p className="text-[12px] text-amber-300/80 leading-relaxed">{runError}</p>
              <button
                onClick={() => setRunError(null)}
                className="shrink-0 text-[10px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors"
              >
                X
              </button>
            </div>
          )}

          <div className="px-12 pt-4 text-xs uppercase tracking-[0.28em] text-[var(--text-blue)]">
            Room / Project conversation
          </div>

          {runId && (
            <MessageFeed
              projectId={projectId}
              runId={runId}
              ttsEnabled={ttsEnabled}
              onSpeak={speak}
            />
          )}

          <div className="px-12 pb-10 flex flex-col gap-6 pt-4">
            <BottomInputBar
              agents={agents}
              selectedAgentId={selectedAgentId}
              selectedModel={selectedModel}
              onAgentChange={setSelectedAgentId}
              onModelChange={setSelectedModel}
              onSend={handleSend}
              isRunning={isRunning}
              placeholder="Message the room…"
              ttsEnabled={ttsEnabled}
              ttsSupported={ttsSupported}
              ttsSpeaking={ttsSpeaking}
              onTTSToggle={toggleTTS}
            />
          </div>
        </>
      }
      right={
        <div className="flex flex-col h-full">
          {showTracks && (
            <div className="px-5 pt-5 pb-3 border-b border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60">
                  Tracks
                </span>
                <Link
                  href={`/projects/${projectId}/tracks/new`}
                  className="text-[9px] font-bold tracking-widest uppercase text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors"
                >
                  + New
                </Link>
              </div>
              <div className="space-y-1">
                {tracks.length === 0 ? (
                  <p className="text-[11px] text-[var(--muted)]/60">No tracks yet.</p>
                ) : (
                  tracks.map((t) => (
                    <Link
                      key={t.id}
                      href={`/projects/${projectId}/tracks/${t.id}`}
                      className="block px-3 py-2 rounded-lg text-[12px] text-[var(--text-blue)] hover:bg-white/5 transition-colors truncate"
                    >
                      {t.name}
                    </Link>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="px-5 py-4 border-b border-white/10">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60 block mb-2">
              Board
            </span>
            <Link
              href={`/projects/${projectId}/board`}
              className="text-[11px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors"
            >
              Open board →
            </Link>
          </div>

          <div className="px-5 py-4">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[var(--text-blue)]/60 block mb-2">
              Ledger
            </span>
            <Link
              href={`/projects/${projectId}/ledger`}
              className="text-[11px] text-[var(--muted)] hover:text-[var(--text-blue)] transition-colors"
            >
              Open ledger →
            </Link>
          </div>
        </div>
      }
    />
  );
}
