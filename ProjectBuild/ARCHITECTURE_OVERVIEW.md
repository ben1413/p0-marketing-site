# ARCHITECTURE_OVERVIEW

## Overview

Project0 is organized as a surface layer on top of a governed runtime.

ProjectBuild is the collaboration environment.

Core is the execution and control plane.

## Top-Level Architecture

```text
Users
   ->
ProjectBuild
   ->
Core API
   ->
Agent Runtime
Governance
Memory
Evaluations
Ledger
```

## Mental Model

- ProjectBuild is where humans and agents collaborate.
- Core is where execution, policy, memory, and commitment are enforced.
- Promote is the commitment primitive that moves outcomes into the ledger.

## Why This Matters

This separation keeps the platform disciplined.

- Build owns experience and workflow.
- Core owns truth and control.
- The ledger remains append-only and authority-attributed.
