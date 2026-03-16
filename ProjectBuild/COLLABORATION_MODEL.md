# COLLABORATION_MODEL

Defines the human collaboration system.

## Collaboration Model

ProjectBuild enables multi-human, multi-agent collaboration.

## Participants

- Humans
- Agents
- External systems

## Rooms

The room is the shared activity space for a project.

The room contains:

- Conversation
- Agent activity
- System events
- Meeting launches

## Tracks

Tracks organize parallel thinking streams.

Each track contains threads and artifacts.

## Presence

Build should display active participants in the room.

Examples:

- Ben
- Sarah
- Research Agent
- Legal Agent

## Meetings

Meetings are structured multi-agent sessions executed through Core.

```text
POST /api/v1/agents/run/meeting
```

Meetings produce durable transcripts stored in Core.

Build displays and manages the meeting UI.
