# PLATFORM_THESIS

Project0 is the operating system for AI-native infrastructure.

Organizations are beginning to adopt AI agents as operational participants in work. However, the infrastructure required to manage agents safely and coherently is largely missing.

Current AI tools provide model access but lack mechanisms for governance, evaluation, decision traceability, and structured collaboration between humans and agents.

Project0 addresses this gap by providing a governed runtime for AI systems.

## Core Primitives

### Agents

Autonomous or semi-autonomous system participants capable of executing tasks.

### Governance

Deterministic rules that control agent behavior and actions.

### Evaluations

Structured mechanisms for assessing agent outputs and behavior.

### Memory

A scoped knowledge system allowing agents to retain contextual information.

### Ledger

An immutable decision record that captures committed outcomes and artifacts.

### Promote

Promote is the primitive used to convert mutable system state into immutable ledger records.

Promote represents a commitment event.

When an item is promoted:

- A summary of the decision or artifact is created.
- Supporting evaluation context may be attached.
- Authority mode is declared.
- Actor attribution is recorded.
- The record becomes immutable.

Promote is the only path into the ledger.

Promote enforces a clear boundary between exploratory work and committed outcomes.

## Promote As The Commitment Primitive

AI systems generate large volumes of intermediate output.

Without a commitment boundary, organizations cannot distinguish between exploration and decisions.

Project0 introduces Promote as a primitive that explicitly marks when an outcome becomes part of the organization's permanent record.

This ensures:

- Accountability
- Traceability
- Decision clarity
- Tamper-evident history

Promote transforms working state into institutional memory.

These primitives form the foundation of a platform designed for multi-human, multi-agent collaboration.

ProjectBuild is the primary surface for interacting with the platform. It provides a workspace where humans and agents collaborate within structured projects.

In this architecture:

- Core provides the runtime and control plane.
- Build provides the human collaboration environment.

Together they enable organizations to operate AI systems with transparency, governance, and accountability.
