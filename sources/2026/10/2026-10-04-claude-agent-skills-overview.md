---
title: "Agent Skills overview (Claude docs)"
url: https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
archived:
type: docs
author: Anthropic
date_published:
date_added: 2026-10-04
tags: [skills, agents, anthropic]
topics: [tooling/skills]
---

## Summary

Skills are folders of instructions, scripts, and resources that an agent loads only
when relevant. Each skill has a `SKILL.md` file whose name and description are always
visible to the model; the full body and extra files are read on demand.

## Key points

- Progressive disclosure: metadata first, full instructions when needed, files when used.
- Usable in Claude apps, Claude Code, the Claude API (via code execution), and Managed Agents.
- The Skills API (`/v1/skills`) is generally available; the earlier beta header is no longer needed.
- Skills package know-how; MCP servers provide connections to tools and data.

## Why it matters

A lightweight way to give agents repeatable expertise without bloating every prompt.
