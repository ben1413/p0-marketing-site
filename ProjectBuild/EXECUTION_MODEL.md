# EXECUTION_MODEL

## Project0 Execution Model

Project0 Core supports three levels of agent execution.

These layers define how work is performed inside the system.

## 1. Agent Execution

The smallest unit of work.

A single agent receives input and produces an output.

Example flow:

```text
Human input
-> Core assembles runtime context
-> Agent executes
-> Output returned
```

API example:

```text
POST /api/v1/agents/run/simple
```

Execution includes:

- Context assembly
- Memory recall
- LLM invocation
- Governance checks
- Trace generation

Agent execution is stateless beyond the provided context and memory.

## 2. Run Orchestration

A structured run involving multiple steps within a single agent execution.

Example behavior:

- Tool calls
- Memory writes
- Action requests
- Structured reasoning

Conceptually this represents one agent solving a task that requires multiple internal steps.

API example:

```text
POST /api/v1/agents/run
```

Core manages:

- Tool execution
- Action normalization
- Memory writes
- Trace persistence

Run orchestration still involves a single agent.

## 3. Agent Orchestration

Multiple agents collaborating within a shared session.

Agents exchange responses and operate under a defined routing mode.

Example session:

- Research Agent
- Legal Agent
- Finance Agent

API example:

```text
POST /api/v1/agents/run/meeting
```

Core manages:

- Turn ordering
- Routing mode
- Session state
- Conversation history
- Agent identity context

Agent orchestration enables collaborative problem solving across agents.

## Execution Hierarchy

```text
Agent Execution
   ->
Run Orchestration
   ->
Agent Orchestration
```

Each layer builds on the previous one.

Agent execution is atomic.

Run orchestration coordinates a task.

Agent orchestration coordinates multiple agents.
