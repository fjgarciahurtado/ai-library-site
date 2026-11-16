---
title: "Update docx, pptx, xlsx, and pdf skills (anthropics/skills #2217)"
url: https://github.com/anthropics/skills/pull/2217
archived:
type: release
author: Anthropic
date_published: 2026-11-14
date_added: 2026-11-16
tags: [anthropic, skills, open-source]
topics: [tooling/skills]
---

## Summary

A pull request merged into Anthropic's public skills repository on 2026-11-14 that
updates the four document skills (Word, PowerPoint, Excel, PDF). It tightens validation,
adds two PowerPoint helper scripts, and fixes how the Excel recalculation script writes
results. The PR description lists the changes; the diffs were not read.

## Key points

- **docx, pptx, xlsx:** stricter validation and more accurate checks of tracked changes.
- **pptx:** new `slide_text.py` (slide text extraction) and `apply_theme.js` (apply a
  theme), plus expanded guidance on building decks.
- **xlsx:** `recalc.py` now writes back only computed values.
- **pdf:** `FORMS.md` and `REFERENCE.md` renamed to match `SKILL.md`; examples fixed.
- **Install or update:** in Claude Code, `/plugin marketplace add anthropics/skills`, then
  `/plugin install document-skills@anthropic-agent-skills` (or update it if already
  installed); or copy the skill folders
  into `~/.claude/skills/`. The claude.ai built-in versions are managed by Anthropic and
  may update on a different schedule.

## Why it matters

These are the most used office-file skills; anyone with a local copy should pull the new
version to get the validation and Excel fixes.
