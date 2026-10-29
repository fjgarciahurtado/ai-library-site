---
title: "GitHub Copilot Fusion generally available"
url: https://github.blog/changelog/2026-10-28-route-and-orchestrate-models-with-github-copilot-fusion
archived:
type: release
author: GitHub
date_published: 2026-10-28
date_added: 2026-10-29
tags: [coding-agents, cost, ide, cli]
topics: [tooling/coding-agents, practices/cost-and-caching]
---

## Summary

Copilot Fusion, generally available since 2026-10-28, is a model-picker option that
routes each prompt across several models instead of using one. It combines the earlier
HydraFusion research preview with Copilot's auto model selection, and picks one of three
patterns per prompt: Single (one model), Cascade (a fast model drafts and a check decides
whether to escalate), or Critique (one model drafts, another reviews, the first revises).

## Key points

- **Enable it:** update the client, open the model picker, choose **Copilot Fusion**,
  and pick an effort level: Standard, High, or Max. Works in VS Code, the Copilot app,
  Copilot CLI, and JetBrains IDEs on all Copilot plans.
- **Cost:** each model Fusion calls is billed at its normal rate; paid plans get a 30%
  discount on model costs with Fusion "for a limited time" (no end date given).
- **Vendor-reported results:** Fusion Max scored 60 on the Artificial Analysis Coding
  Agent Index, within two points of Claude Code with Opus 5.5 Max, at about half the API
  cost, half the tokens, and roughly 40% less time per task. These are GitHub's figures.
- **Admins:** Fusion uses only models allowed by policy; admins can exclude a model from
  Fusion alone, or make Fusion the default through enterprise managed settings.
- A separate changelog entry the same day says Fusion can now also select local models;
  details were not read.

## Why it matters

Routing and draft-review patterns move from hand-built agent code into the product. If
the cost claims hold up, letting the tool choose models becomes a sensible default for
everyday coding.
