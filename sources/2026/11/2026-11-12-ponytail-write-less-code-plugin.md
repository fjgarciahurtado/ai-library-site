---
title: "Ponytail: a plugin that makes coding agents write less code"
url: https://github.com/DietrichGebert/ponytail
archived:
type: repo
author: Dietrich Gebert
date_published: 2026-11-12
date_added: 2026-11-12
tags: [plugins, skills, coding-agents]
topics: [tooling/skills, tooling/coding-agents]
---

## Summary

Ponytail is an MIT-licensed skill and plugin for Claude Code, Codex, and other agents
that pushes the agent to write the smallest change that works. Before writing code, the
agent works down a ladder: reuse existing code, then the standard library, then platform
features, and only then new code. The README says validation, security, error handling,
and accessibility are kept. It was rising in GitHub trends on 2026-11-12. `date_published`
is the date the README was read; no dated releases are shown.

## Key points

- **Install in Claude Code:** `/plugin marketplace add DietrichGebert/ponytail`, then
  `/plugin install ponytail@ponytail`.
- **Install in Codex:** `codex plugin marketplace add DietrichGebert/ponytail`, then
  `codex plugin add ponytail@ponytail`; open `/hooks` to trust its two lifecycle hooks
  and start a new thread.
- **Other agents:** copy its `AGENTS.md` into the project or install
  `skills/ponytail/SKILL.md` as a skill (INSTALL.md covers Copilot, Cursor, and Gemini).
- **Commands:** `/ponytail` sets intensity; `/ponytail-review` reviews a diff for bugs,
  security, and risky untested code; `/ponytail-audit` ranks repo-wide findings;
  `/ponytail-debt` collects `shortcut:` comments; `/ponytail-gain` shows its benchmark.
  Claude Code also gets a status band and a local dashboard.
- **Claims to check:** the author reports 53% less code, 41% less time, and 26% lower
  cost on 39 tasks (5 runs each, one model). These are self-reported.
- **Caution:** about 189,000 stars but only 449 watchers, a ratio worth treating with
  suspicion. The content is plain prompt files, so read `SKILL.md` and the hooks before
  installing.
- Good for: agents that over-engineer, add dependencies, or write helpers that already
  exist in the codebase.

## Why it matters

Over-building is a common complaint about coding agents. Ponytail packages a
"minimum change" discipline as a portable skill plus review commands, and it works in
several agents from one source.
