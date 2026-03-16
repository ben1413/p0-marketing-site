# TRUST_BOUNDARY

## Trust Boundary

Project0 Core is the system of record.

Core owns:

- Agent execution
- Memory
- Governance policy
- Evaluation lifecycle
- Ledger sealing
- Artifact storage
- Event logging
- System metrics

ProjectBuild is a surface layer.

Build owns:

- Workspace UX
- Collaboration interface
- Boards
- Threads
- Human workflows
- Presentation logic

Build never duplicates Core data stores.

All authoritative system state originates from Core APIs.

This separation ensures that:

- Policy decisions remain consistent
- Audit records remain trustworthy
- System behavior remains deterministic
