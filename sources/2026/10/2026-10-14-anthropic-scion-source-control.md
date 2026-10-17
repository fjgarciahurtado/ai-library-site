---
title: "Redesigning source control at Anthropic"
url: https://www.anthropic.com/engineering/redesigning-source-control
archived: http://web.archive.org/web/20261013191925/https://www.anthropic.com/engineering/redesigning-source-control
type: article
author: Anthropic
date_published: 2026-10-13
date_added: 2026-10-14
tags: [anthropic, coding-agents, deployment]
topics: [tooling/coding-agents]
---

## Summary

Anthropic explains why it replaced git for its monorepo with an in-house system, Scion,
built in five months by seven engineers working with Claude. Agent-driven merge volume
grew more than tenfold in four months, and git's full-clone, offline-first design did
not fit clients that are almost all always-online agents and CI jobs.

## Key points

- Merges per day: about 2,500 in May 2026, over 30,000 by September 2026. About 25
  million checkouts per day for CI alone; the repo history is almost 100 GB.
- Design: server-side commits, merges and rebases; clients fetch trees and blobs on
  demand; source-control queries exposed as APIs, so many jobs need no checkout; sparse
  and virtualised working copies; tiered daemon, regional cache, and Spanner-backed servers.
- No global merge queue: Anthropic relies on post-merge and pre-deploy testing, with
  Claude resolving most conflicts.
- Also built: a code review tool (Antique) with semantic approval rules, code search,
  and per-directory access control.
- Results: about 200x less CPU and memory than the old git mirrors; CI and research
  checkouts went from minutes to seconds.
- Engineers' role shifted to setting constraints and reviewing intent, often telling
  Claude "no" when it broke invariants or over-engineered. "Superfan" agents watch
  each component's telemetry.
- Scion will not be released; Anthropic plans to share ideas with GitHub, GitLab, and
  the git community.

## Why it matters

Concrete numbers on how coding agents change engineering infrastructure: at agent scale,
source control, merge queues, and review become the bottleneck.
