---
title: "Le Chonk brings the brains. Studio puts it to work."
url: https://mistral.ai/news/build-with-studio/
archived:
type: article
author: Mistral AI
date_published: 2026-11-05
date_added: 2026-11-06
tags: [mistral, agents, frameworks, mcp, skills]
topics: [frameworks/landscape]
---

## Summary

Mistral announced on 2026-11-05 a set of new features in Mistral AI Studio, its platform for
building on Mistral Large 4 ("Le Chonk"). The main ones are managed agents with skills,
sandboxes, subagents, and hooks; durable workflows that mix rules, agent steps, and human
approvals; hosted apps; and a Mistral MCP server so you can build from an existing coding
agent and deploy to Studio with one command.

## Key points

- **Managed agents:** multi-step agents with reusable skills, code sandboxes, subagents,
  and hooks for custom logic, with limits on which tools, data, and actions each agent can
  use. This matches the managed-agent design of Anthropic and OpenAI.
- **Workflows:** fixed rules, agent reasoning, and human approvals in one graph; runs
  resume after interruption; event triggers from enterprise systems and a visual graph.
- **Apps:** hosted apps with authentication and access controls that can call agents,
  workflows, and enterprise search.
- **Mistral MCP server:** build with Mistral Vibe or another coding agent, test locally,
  and deploy to Studio with one command. The post does not give the install command.
- **Observability and evals:** OpenTelemetry traces for model calls, tool use, and
  approvals; evaluations against your own datasets.
- Deploys in Mistral's cloud, your VPC, on-premises, or a mix. No prices or availability
  tiers are given in the post.

## Why it matters

Mistral now offers the same managed-agent building blocks (skills, subagents, hooks, MCP)
as the US providers, with on-premises deployment as its main difference.
