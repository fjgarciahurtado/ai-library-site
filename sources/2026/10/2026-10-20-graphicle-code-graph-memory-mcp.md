---
title: "Graphicle: code graph and memory for coding agents"
url: https://github.com/Graphicle-AI/graphicle
archived:
type: repo
author: KarLex AI
date_published: 2026-10-14
date_added: 2026-10-20
tags: [mcp, coding-agents, memory, open-source]
topics: [tooling/mcp, agents/memory]
---

## Summary

Graphicle is a local Rust program, licensed Apache-2.0, that indexes a repository into a
code graph (files, functions, calls, imports). It also stores project docs, decisions,
and past agent sessions, then serves cited excerpts with file and line references to
coding agents over MCP. It needs no account or API key and sends no telemetry. The repo
first appeared in this library's GitHub trends on 2026-10-20 (about 325 stars in six
days), so `date_published` is approximate. It is labelled pre-release.

## Key points

- Install on macOS or Linux with `brew install graphicle-ai/tap/graphicle`, then run
  `graphicle setup` in the repository. For Claude Code it adds an MCP entry to
  `.mcp.json` and session-capture hooks to `.claude/settings.local.json`, and backs up
  each changed file as `<file>.graphicle-bak`. `graphicle disconnect` undoes it. A
  Windows build is in preview.
- MCP tools include `query_graph`, `get_neighbors`, and `shortest_path`, plus memory
  tools. With `--pull-requests` it also adds `list_prs`, `get_pr_impact`, and
  `triage_prs` (these use the GitHub CLI).
- CLI commands: `ask`, `context`, `graph affected`, `open`, and `doctor`. Written
  answers are optional and need a model (`graphicle config set model anthropic`,
  `openai`, or `ollama`).
- Good for: finding callers and impact of a change in a large codebase, and giving the
  agent memory of earlier sessions and decisions without a hosted service.
- The engine is a Rust port of Graphify. The benchmarks (dated 2026-10-15) are
  self-reported. The project has only about 23 commits, so how well it is maintained is
  not yet clear.

## Why it matters

It combines two things coding agents usually lack, structural code navigation and
persistent project memory, in one local MCP server that is easy to remove. Try it on a
large repository before relying on it.
