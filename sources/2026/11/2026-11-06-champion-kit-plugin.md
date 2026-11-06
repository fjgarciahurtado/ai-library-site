---
title: "Champion Kit plugin for Claude Code"
url: https://github.com/anthropics/claude-plugins-official/tree/main/plugins/champion-kit
archived:
type: repo
author: Anthropic
date_published: 2026-11-06
date_added: 2026-11-06
tags: [plugins, skills, anthropic, coding-agents]
topics: [tooling/skills]
---

## Summary

Champion Kit (v0.5.0, Apache 2.0) is an Anthropic plugin added to the official marketplace
on 2026-11-06 for people who promote Claude Code inside a team. Seven skills plan
hackathons and office hours from your real repo, find repeated work worth turning into
rules or skills, and write a team-level AI adoption ("maturity") report. It builds on the
Claude Code champion kit page in the docs.

## Key points

- **Install:** `claude plugin install champion-kit@claude-plugins-official`, or in the
  desktop app's Code tab: **+** → Add plugins → `champion-kit`. Type `/champion-kit:` to
  list the commands. Test a local copy with `claude --plugin-dir ./champion-kit`.
- **Commands:** `hackathon` (hack day from your backlog), `office-hours` (agenda, optional
  calendar event after approval), `patterns` (repeated work to turn into `CLAUDE.md`
  rules or skills), `climb` (next adoption step for a person or team), `faq` (turn
  repeated questions into a findable answer), `maturity` (scored HTML report,
  `ai-maturity-report.html`), `routines` (ready-to-paste `/schedule` lines for weekly
  pattern digests, monthly stale-guidance checks, and similar).
- Each command states what it will produce, then asks questions one at a time; answer
  "go" to accept defaults or give answers inline.
- **Safety design:** a read-only `repo-scout` subagent (no shell, no edit tools) does the
  reading and returns only counts and citations; the plugin adds no hooks or MCP servers,
  asks before reading git history or writing files, never sends messages, and never ranks
  individuals. In auto or accept-edits mode writes are not prompted, so use Manual mode if
  you want to approve each one.
- Useful even for a solo user: `/champion-kit:patterns` on your own repo suggests skills
  and rules to extract.

## Why it matters

A worked example from Anthropic of a multi-skill plugin with a locked-down helper agent,
and a ready-made way to find skill candidates in your own work.
