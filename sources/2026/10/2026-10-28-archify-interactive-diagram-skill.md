---
title: "Archify: interactive diagrams from an agent skill"
url: https://github.com/tt-a1i/archify
archived:
type: repo
author: tt-a1i
date_published: 2026-10-28
date_added: 2026-10-28
tags: [skills, coding-agents]
topics: [tooling/skills]
---

## Summary

Archify is an agent skill for Claude Code, Codex, Cursor, and OpenCode that turns an
idea, a plan, or a codebase into an interactive diagram in a single self-contained HTML
file. It covers architecture, workflow, sequence, data flow, ERD, class, tree, timeline,
and waterfall views, plus one-page explainers. It is Apache-2.0 (earlier MIT grants still
apply), at v3.2.0 with about 1,750 commits and some 90,000 stars when read on 2026-10-28
(the date above is that reading date, not a release date).

## Key points

- **Install:** `npx skills add tt-a1i/archify -g` installs it for your agents. It goes in
  `~/.claude/skills/` (or `.claude/skills/`) for Claude Code and `~/.agents/skills/` for
  Codex. To try it once in Codex: `npx skills use tt-a1i/archify@archify --agent codex`.
- **Use:** ask the agent to diagram something ("draw the request flow of this repo as a
  sequence diagram"). The output opens in a browser with light and dark themes.
- **Export:** PNG to clipboard, long-image PNG, WebP or JPG, print to PDF for explainers,
  and 1200×630 share cards.
- **Update checks** only show a reminder and never install anything; set
  `ARCHIFY_UPDATE_CHECK_DISABLED=1` to turn them off.
- Its star count rose by about 4,000 in the week to 2026-10-28. The repo's long commit
  history suggests real use, but treat the raw count with care.

## Why it matters

Diagrams are a fast way to check that an agent understood a codebase or a plan. This
skill makes that a one-line request, with output you can share without extra tooling.
