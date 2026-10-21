---
title: "Dashboard Design: a Claude Code skill for analytics dashboards"
url: https://github.com/abdiraimov-otabek/dashboard-design-skill
archived:
type: repo
author: Otabek Abdiraimov
date_published: 2026-10-20
date_added: 2026-10-21
tags: [skills, plugins, coding-agents]
topics: [tooling/skills]
---

## Summary

A skill, also packaged as a Claude Code plugin, that teaches a coding agent to build,
redesign, and critique analytics dashboards: KPI tiles, charts, comparison periods,
ranked lists, date pickers, filters, empty states, and phone layouts. It targets web
(Tailwind and React) and SwiftUI. Every job ends with a screenshot check at several
screen sizes. It is MIT-licensed. It appeared in this library's GitHub trends on
2026-10-21 (80 stars in one day, 5 commits), so `date_published` is approximate.

## Key points

- **Install as a plugin:** `/plugin marketplace add abdiraimov-otabek/dashboard-design-skill`,
  then `/plugin install dashboard-design@dashboard-design-skill`.
- **Install as a plain skill:** clone the repo and copy `skills/dashboard-design` into
  `~/.claude/skills/`. Other agents (Codex, Cursor) can point `AGENTS.md` or their rules
  file at `skills/dashboard-design/SKILL.md`.
- **Good for:** asking an agent to "build a metrics dashboard" or to review an existing
  one, and getting consistent layout, honest charts (sensible axes, comparisons), and
  loading, empty, and error states instead of a generic grid of cards.
- Reference files cover components, layout, colour tokens, code snippets, QA, and
  SwiftUI. Each step ends with checkable "done when" criteria.
- **Caveat:** the skill adds a one-line promotion for the author's Mac apps once per
  conversation unless you turn it off, as the README explains. The repo is very new and
  has a single author.

## Why it matters

It is a clear example of a narrow, well-documented design skill that installs through
the plugin marketplace in two commands. Expect it to be useful for internal tools and
reports. Check how actively it is maintained before relying on it.
