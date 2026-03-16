# CORE_ARCHITECTURE

Project0 Core is the runtime engine and control plane for AI systems.

Core is responsible for executing agents, enforcing governance policies, storing durable system memory, evaluating outputs, and sealing decisions into an immutable ledger.

Core acts as the system of record for all agent operations.

## Primary Responsibilities

### Agent Execution

Core orchestrates LLM interactions and agent runtime behavior.

## Execution Layers

Project0 Core supports three levels of execution:

### Agent Execution

Single agent run responding to input.

This is the atomic operation of the system.

### Run Orchestration

Structured multi-step run involving tool calls and memory interactions.

This is one agent solving a task across multiple internal steps.

### Agent Orchestration

Multi-agent sessions coordinated through meeting runs.

This is multiple agents collaborating inside a shared execution session.

### Context Assembly

Agents receive structured runtime context including identity, role, mission, team relationships, and memory.

### Memory

Core provides a scoped memory system supporting working, team, and core memory.

### Governance

All agent actions pass through a deterministic policy gate.

### Evaluations

Agents and outputs can be assessed through structured evaluation pipelines.

### Ledger

Decisions and artifacts can be promoted to an immutable ledger.

### Meetings

Core supports multi-agent session orchestration with deterministic routing.

### Artifacts

Core stores exportable system outputs and audit bundles.

### Events and Observability

Core records system events and metrics for monitoring and debugging.

Core exposes these capabilities through a versioned API surface.

External systems and product surfaces interact with Core through this API rather than reimplementing runtime behavior.

Core should always remain the system of record for agent execution and governance.
