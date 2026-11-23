---
title: "diagram-design: editorial diagrams skill for coding agents"
url: https://github.com/cathrynlavery/diagram-design
archived:
type: repo
author: Cathryn Lavery
date_published: 2026-11-23
date_added: 2026-11-23
tags: [skills, plugins, coding-agents, open-source]
topics: [tooling/skills]
---

## Summary

diagram-design is an MIT-licensed agent skill and plugin. It draws diagrams as one
self-contained HTML and SVG file in a fixed editorial style, with no Mermaid rendering
and no drop shadows. It can also import Mermaid, draw.io, Excalidraw, and PlantUML files
and redraw them. It is packaged for Claude Code, Codex, GitHub Copilot, Factory Droid,
Pi, and other Agent Skills hosts. The date above is that of the latest release commit
(2.6.172); the repo is older.

## Key points

- **Install (any Agent Skills host):** `npx skills add cathrynlavery/diagram-design`.
  - Claude Code: `/plugin marketplace add cathrynlavery/diagram-design`, then
    `/plugin install diagram-design@diagram-design`.
  - Codex: `codex plugin marketplace add cathrynlavery/diagram-design`, then
    `codex plugin add diagram-design@diagram-design`.
  - Copilot CLI: `copilot plugin marketplace add …`, then
    `copilot plugin install diagram-design@diagram-design`.
- **Commands (Claude Code):** `/diagram-design:import-mermaid`, `import-drawio`,
  `import-excalidraw`, `import-plantuml`, `export-diagram`, `profile`, and `doctor`.
  - Self-check a diagram: `python3 skills/diagram-design/scripts/self_check.py <file>`.
  - PNG export needs Playwright (`pip install playwright && playwright install chromium`).
- **Good for:** architecture, flow, and sequence diagrams for docs and slides that look
  hand-designed, and for cleaning up old Mermaid or draw.io diagrams.
- **Size:** the README header says 52 diagram types and the repo description says 45
  (read 2026-11-23).
- **Activity:** about 70,400 stars (+3,000 in a week), 4,700 forks, 481 commits, and
  many distinct contributors. That is consistent with a real, maintained project.

## Why it matters

It is one of the most-used "taste" skills. Like Impeccable and Taste Skill, it gives an
agent a fixed visual vocabulary, so the output looks consistent and not generic.
