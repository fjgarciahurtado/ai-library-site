---
title: "Ollama v0.40.8 and Flint, Recursive's open coding-agent model"
url: https://ollama.com/library/flint
archived:
type: release
author: Recursive (model); Ollama (release)
date_published: 2026-10-21
date_added: 2026-10-22
tags: [open-source, coding-agents, other-provider, deployment]
topics: [models/open-weight, frameworks/landscape]
---

## Summary

Ollama v0.40.8 (2026-10-21) adds Flint, a mixture-of-experts coding model from Recursive
released under Apache 2.0. The Ollama model page lists 39.8B total parameters with about
2.5B active, 262K context (the listing shows 256K), tool use, and thinking. In this
release Flint runs only on macOS, and Ollama says support for other GPUs is coming
later. No primary page from Recursive was checked.

## Key points

- **Try it:** `ollama run flint` (tags `flint:latest` and `flint:40b`, both 23 GB). It
  works with `ollama launch` for Claude Code, OpenCode, Hermes Agent, and OpenClaw.
- **Built for agents:** described as "built for coding agents": multi-turn bug
  investigation, feature work, and test writing.
- **Publisher benchmarks:** Terminal-Bench 2.1 54.9%, SWE-bench Verified 74.2%,
  SWE-bench Pro v2 89.7%. A Pro score above the Verified score is unusual. Ollama warns
  that the evaluation setup affects results, so treat these as unverified.

## Why it matters

With only about 2.5B active parameters and 23 GB of weights, Flint is a permissively
licensed local model aimed at agentic coding that fits on a well-equipped Mac.
