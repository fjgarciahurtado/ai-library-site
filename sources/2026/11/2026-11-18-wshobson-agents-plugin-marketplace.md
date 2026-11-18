---
title: "wshobson/agents: multi-harness plugins, agents, and skills"
url: https://github.com/wshobson/agents
archived:
type: repo
author: Seth Hobson
date_published: 2026-11-18
date_added: 2026-11-18
tags: [plugins, skills, coding-agents, open-source]
topics: [tooling/skills]
---

## Summary

A large, MIT-licensed collection of Claude Code plugins, subagents, skills, and slash
commands, written once in Markdown and converted by adapters for Claude Code, Codex CLI,
Cursor, OpenCode, Antigravity CLI, GitHub Copilot, and Pi. As read on 2026-11-18 it
has 94 plugins, 202 agents, 185 skills, and 105 commands, about 42.6k stars, and few open
issues (7) and PRs (9). `date_published` is the date read; the repo has no releases.

## Key points

- **Install in Claude Code:** `/plugin marketplace add wshobson/agents`, then install
  only the plugins you need, for example
  `/plugin install python-development@claude-code-workflows`.
- **Use:** ask Claude to use the plugin's agents, or call commands such as
  `/python-development:python-scaffold`.
- Plugins are grouped by domain (language development, infrastructure, security, and
  more), so you can load a small set instead of everything.
- CI regenerates and validates the output for every harness on each change.
- Good for: a ready-made set of language and ops specialists you can reuse across
  several coding agents.

## Why it matters

It is one of the largest maintained plugin marketplaces and shows the "write once,
generate per harness" approach to cross-agent skills. Install selectively: loading many
plugins adds descriptions to every session's context.
