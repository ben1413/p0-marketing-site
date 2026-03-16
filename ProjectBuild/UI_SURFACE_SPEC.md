# UI_SURFACE_SPEC

Defines layout.

## UI Surface Specification

ProjectBuild uses a three-panel layout.

## Left Panel

- Project navigation
- Agent directory
- Workspace tools

## Center Panel

- Room workspace
- Track conversation
- Canvas mode
- Meeting sessions

## Right Panel

- Tracks
- Artifacts
- Ledger preview
- Evaluation results

## Bottom Input

- Command input
- Human conversation
- Agent commands

## Modes

- Room Mode
- Track Mode
- Board Mode
- Meeting Mode
- Canvas Mode (future)

## Promote Actions

The Promote action should appear on:

- Agent responses
- Decision drafts
- Completed tasks
- Artifacts

Promote opens a confirmation panel allowing the user to:

- Edit summary
- Select authority mode
- Attach tags
- Review evidence

After confirmation, the system calls the Promote API and the item becomes a ledger entry.

The UI is one Promote surface, not the only Promote surface.

Some promotions may be initiated and committed directly through the API when authority mode and permissions allow it. In those cases, Build should focus on displaying resulting ledger state rather than assuming a visible approval flow always occurred.
