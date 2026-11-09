---
title: "Google ADK (Python) v2.14.0"
url: https://github.com/google/adk-python/releases/tag/v2.14.0
archived:
type: release
author: Google
date_published: 2026-11-07
date_added: 2026-11-09
tags: [google, frameworks, agents, evals, sdk]
topics: [frameworks/landscape, practices/evals]
---

## Summary

Google's Agent Development Kit for Python 2.14.0 was published on GitHub on 2026-11-07
(its changelog entry is dated 2026-11-04). Execution environments and the A2A integration
are now stable. Evals can repeat each case several times, and tool-argument checks can
match by meaning. It has one breaking change for enum tool arguments.

## Key points

- **Stable execution environments:** `BaseEnvironment`, `LocalEnvironment`,
  `EnvironmentToolset`, `DaytonaEnvironment`, and `E2BEnvironment` leave experimental.
  `ReadFileTool` can read a line range instead of the whole file.
- **A2A stable:** a new `adk generate_agent_card` command builds agent cards.
- **Multi-run evals:** `adk eval --num_runs N --parallelism M` runs each case several
  times and combines the results, which helps with flaky agent behaviour.
- **`ToolArgsMatcher`:** compares tool arguments by exact, case-insensitive,
  numeric-tolerance, or LLM-judged semantic match.
- **Integrations:** `TeamsRunner` (Microsoft Teams), `OpenAIDecisionsClassifier`
  (OpenAI Decisions API), and `MongoDbMemoryService` with vector search and TTL expiry.
- **Performance:** about 23% faster and about 9% lower peak memory on a 30-node,
  200-turn workflow (Google's figures).
- **Breaking:** enum tool arguments now arrive as enum members, not strings; code that
  compares them with strings needs updating.
- Upgrade: `pip install -U google-adk==2.14.0`.

## Why it matters

Repeated eval runs and semantic argument matching are practical answers to measuring
agents that do not behave the same way twice.
