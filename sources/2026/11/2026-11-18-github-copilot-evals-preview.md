---
title: "GitHub Copilot Evals is now in public preview"
url: https://github.blog/changelog/2026-11-17-github-copilot-evals-is-now-in-public-preview
archived:
type: release
author: GitHub
date_published: 2026-11-17
date_added: 2026-11-18
tags: [evals, skills, mcp, coding-agents, plugins]
topics: [practices/evals, tooling/skills]
---

## Summary

Copilot Evals (public preview, 2026-11-17) lets you write and run repeatable tests for
your own Copilot customizations: skills, custom agents, and MCP tools. An eval gives an
agent a realistic task, describes what a good result looks like, and checks both the
outcome and the process (for example, which tool calls failed). It runs on Vally, a
local, extensible eval tool.

## Key points

- **Install:** VS Code: the "GitHub Copilot Evals" extension from the Marketplace.
  Copilot CLI: the GitHub Copilot Evals plugin. Copilot app: Customize → add the
  `github/evals` marketplace, then install the plugin.
- **Use:** ask in plain language or run `/eval` to create an eval for a skill, agent, or
  MCP tool in the project, run it (each run needs your approval), inspect failed checks,
  and compare runs before and after a change.
- Each check is pass or fail; the tool also compares observed with expected evidence.
- GitHub advises rerunning the same eval after each change, because output varies.
- Plans: Copilot Individual, Business, and Enterprise. Docs: aka.ms/evals.
- Good for: proving a skill rewrite helps rather than hurts, and catching regressions
  when you change an MCP tool's description.

## Why it matters

Skill and tool evaluation moves from a manual habit to a built-in command. It is the
Copilot counterpart to Anthropic's skill-creator evals, and it measures the agent's
process as well as its final answer.
