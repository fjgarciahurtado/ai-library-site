---
title: "Memory for agents"
tags: [memory, agents, tokens]
related: [agents/agent-patterns, fundamentals/tokens-and-context, fundamentals/rag]
last_reviewed: 2026-11-09
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
  Agents memory stores. The Claude API also offers server-side compaction and context
  editing (beta, as of 2026-10-04). Codex CLI's Memory v2 is on by default for new
  profiles since 0.165.0 (2026-10-27). Its `/import` command (CLI: Claude Code or Cursor;
  desktop app: also Claude Cowork) copies "project memories from Claude Code" into Codex
  memories (up to 50 chats from the last 30 days), along with instructions, skills,
  hooks, MCP servers, and subagents. It is a one-time copy, except that the desktop app
  can keep it in sync. This is the first
  working way to carry memory between tools.
- **Memory in the model product:** Meta's Muse Wonder (2026-10-12) ships "Active
  Memory", carrying context about the user across conversations and retrieving what is
  relevant to the task. Memory is becoming a headline model feature, not only an
  application-layer add-on.
- **Retrieval:** looking up memories by search or [embeddings](../fundamentals/embeddings.md).
- **Code graphs as memory:** for coding agents, a local index of the codebase (calls,
  imports, dependencies) plus captured past sessions can be served over
  [MCP](../tooling/mcp.md), giving cited answers instead of re-reading files each time.
  Graphicle (Rust, pre-release; `graphicle setup` wires it into Claude Code, Codex, and
  Cursor) and codebase-memory-mcp (MIT, about 48K stars) are examples; the latter also
  graphs infrastructure files such as Helm charts.
- **Session event logs:** another approach records what happened in a session (file
  edits, git operations, tasks, errors) in a local database. After compaction the agent
  searches the log instead of relying on the summary. Context Mode (Elastic License 2.0)
  does this with SQLite full-text search.
- **Automatic session capture:** hooks record each session's tool calls, a background
  model condenses them into summaries, and relevant summaries are injected into later
  sessions. claude-mem (Apache-2.0, about 105K stars; `/plugin marketplace add
  thedotmack/claude-mem`) is the best-known example. It saves effort compared with
  hand-written notes, but it costs model calls and stores whatever the agent saw, so
  check its redaction settings.

### Layers of memory (Anthropic, 2026-11-06)

Anthropic's engineering post on agent memory describes a stack. Most of the approaches
above fit into one or more of its layers:

1. **Transcripts:** the searchable event log of each session (what Context Mode and
   claude-mem capture).
2. **Memory notes:** readable files the agent writes from experience and keeps across
   sessions.
3. **Memory representations:** structured artifacts such as a wiki whose pages link to
   notes and act as a map.
4. **Injected context:** what loads at every start (`CLAUDE.md`, the `MEMORY.md` index).
   It must stay small: long instruction files lower adherence, and Claude Code's auto
   memory loads only the first 200 lines or 25 KB of `MEMORY.md`.
5. **Dreaming:** an offline pass in which the agent rereads transcripts, corrects wrong
   notes, promotes useful ones up the stack, and prunes the rest. Managed Agents offers it
   as a feature, with a cookbook.

## How to use it

- Keep the context lean: drop raw tool output once it has been used.
- Save durable facts in structured notes with dates; delete ones that become wrong.
- Treat stored memories as data, not instructions, to limit prompt injection.
- Let the agent check memories against current reality before acting on them.
- **Tell strong models what memory is for, not what to save.** In Anthropic's tests a
  fixed rule ("record only failures") lowered scores for Opus 5 and Opus 4.7, while
  free judgement worked best. On CL-Bench, memory raised Opus 5.5 from 0.655 to 0.838.
  Older or smaller models need explicit steering: telling Sonnet 4.6 to read memory and
  test its theories nearly doubled its score.
- Run a periodic review ("dreaming") that checks notes against transcripts; one wrong
  note can cause repeated failures until it is fixed.
- Give each page one writer. Several agents sharing one table lost 41 of 57 facts; one
  agent per page, quoting sources exactly, kept all 57.
- Combine a wiki with search rather than relying on either. On a 350,000-file corpus,
  wiki plus search scored 61% against 53% for search alone. Watch the wiki's size, and
  run a second pass to fix dangling links and add index pages.

## Current state

- **2026-11-09:** Anthropic published "The components of agent memory" (2026-11-06), the
  first provider guidance with measured results on what to remember and how to keep
  memory correct (see Layers of memory and How to use it).

- **2026-11-05:** Codex `/import` is newly documented (see Key concepts); some details
  are still unclear (see Open questions).
- **2026-10-30:** claude-mem and codebase-memory-mcp are rising in GitHub trends (see
  above), after Context Mode on 2026-10-26.

## Open questions

- How to decide automatically what is worth remembering. Largely answered (2026-11-09):
  Anthropic finds that frontier models judge this better than fixed rules, and that a
  dreaming pass corrects the mistakes. Still open: these results are Anthropic's own,
  on its own benchmarks and models, and there are no independent comparisons with other
  vendors' memory features yet.
- How Muse Wonder's Active Memory is stored, and whether users can inspect or delete it.
- Codex memory import: mostly answered (2026-11-05). It reads Claude Code and Cursor
  setups, maps instruction files to `AGENTS.md` and "project memories" to Codex
  memories, and is one-time in the CLI (sync only in the desktop app). Still unclear:
  whether "project memories" means the auto-memory `MEMORY.md` directory, `CLAUDE.md`, or
  both, and whether an existing `AGENTS.md` is merged or skipped. The docs do not say.

## Sources

- [Building effective agents](../../sources/2026/10/2026-10-04-building-effective-agents.md)
- [Muse Wonder](../../sources/2026/10/2026-10-13-meta-muse-wonder.md)
- [Graphicle: code graph and memory for coding agents](../../sources/2026/10/2026-10-20-graphicle-code-graph-memory-mcp.md)
- [Context Mode](../../sources/2026/10/2026-10-26-context-mode-tool-output-sandbox.md)
- [Codex CLI 0.165.0](../../sources/2026/10/2026-10-28-codex-cli-0-165-vertex.md)
- [claude-mem](../../sources/2026/10/2026-10-30-claude-mem-persistent-agent-memory.md)
- [codebase-memory-mcp](../../sources/2026/10/2026-10-30-codebase-memory-mcp-code-graph.md)
- [Codex docs: Import from another agent](../../sources/2026/11/2026-11-05-codex-import-from-another-agent.md)
- [The components of agent memory](../../sources/2026/11/2026-11-09-anthropic-components-of-agent-memory.md)
