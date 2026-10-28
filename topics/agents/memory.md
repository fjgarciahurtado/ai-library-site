---
title: "Memory for agents"
tags: [memory, agents, tokens]
related: [agents/agent-patterns, fundamentals/tokens-and-context, fundamentals/rag]
last_reviewed: 2026-10-28
---

## Overview

Models have no memory between requests: each call sees only what is in its context.
Agents that work for long periods or across sessions need ways to keep what matters and
drop what does not. "Memory" covers both managing the current context and storing
knowledge outside it.

## Key concepts

- **Short-term (in-context):** the conversation and tool results in the current window.
- **Context editing:** clearing stale tool results or thinking blocks.
- **Compaction:** summarising older history when the context fills up.
- **Long-term memory:** facts, preferences, and notes saved outside the model (files,
  databases, vector stores) and read back when relevant.
- **File-based memory:** the agent reads and writes notes in a directory. Simple,
  inspectable, works well with coding agents (for example `CLAUDE.md` files and memory
  directories).
- **Memory tools and stores:** vendor features such as Claude's memory tool and Managed
  Agents memory stores.
- **Retrieval:** looking up memories by search or [embeddings](../fundamentals/embeddings.md).
- **Code graphs as memory:** for coding agents, a local index of the codebase (calls,
  imports, dependencies) plus captured past sessions can be served over
  [MCP](../tooling/mcp.md), giving cited answers instead of re-reading files each time.
  Graphicle is one example.
- **Session event logs:** another approach records what happened in a session (file
  edits, git operations, tasks, errors) in a local database. After compaction the agent
  searches the log instead of relying on the summary. Context Mode does this with SQLite
  full-text search.

## How to use it

- Keep the context lean: drop raw tool output once it has been used.
- Save durable facts in structured notes with dates; delete ones that become wrong.
- Treat stored memories as data, not instructions, to limit prompt injection.
- Let the agent check memories against current reality before acting on them.

## Current state

- **2026-10-27:** Codex CLI 0.165.0 turns Memory v2 on by default for new profiles and
  can import memories from other coding agents, a first step towards memory you can
  carry between tools. The release notes do not say which formats it reads (see Open
  questions).
- **2026-10-26:** Context Mode (an MCP server and Claude Code plugin, Elastic License
  2.0, about 32,000 stars) is rising in GitHub trends. It keeps raw tool output in a
  sandbox and stores session events in SQLite, so work state can be recovered after
  compaction (see [MCP](../tooling/mcp.md)).
- **2026-10-20:** Graphicle, a new open-source Rust MCP server (pre-release), combines a
  code graph with memory of project decisions and past agent sessions. It runs locally
  with no account, and `graphicle setup` wires it into Claude Code, Codex, and Cursor.
- **2026-10-12:** Meta's Muse Wonder ships "Active Memory": the model carries context
  about the user across conversations and retrieves what is relevant to the current
  task. Meta has not said how it is stored or controlled. Memory is becoming a headline
  model feature, not only an application-layer add-on.
- **2026-10-04:** Server-side compaction and context editing are available in the Claude
  API (beta). File-based memory is the common pattern in coding agents.

## Open questions

- How to decide automatically what is worth remembering.
- How Muse Wonder's Active Memory is stored, and whether users can inspect or delete it.
- Which agents' memory files Codex 0.165's import reads (for example Claude Code's
  `MEMORY.md` or `CLAUDE.md`), and whether it imports them once or keeps them in sync.
  The release notes do not say (checked 2026-10-28).

## Sources

- [Building effective agents](../../sources/2026/10/2026-10-04-building-effective-agents.md)
- [Muse Wonder](../../sources/2026/10/2026-10-13-meta-muse-wonder.md)
- [Graphicle: code graph and memory for coding agents](../../sources/2026/10/2026-10-20-graphicle-code-graph-memory-mcp.md)
- [Context Mode](../../sources/2026/10/2026-10-26-context-mode-tool-output-sandbox.md)
- [Codex CLI 0.165.0](../../sources/2026/10/2026-10-28-codex-cli-0-165-vertex.md)
