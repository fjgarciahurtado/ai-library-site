---
title: "open-artifact: local, agent-agnostic artifacts"
url: https://github.com/JimLiu/open-artifact
archived:
type: repo
author: Jim Liu
date_published: 2026-11-24
date_added: 2026-11-24
tags: [plugins, skills, coding-agents]
topics: [tooling/skills]
---

## Summary

open-artifact gives coding agents artifacts like Claude.ai's, but saved locally as plain
files: slides, UI designs, design systems, whiteboards, sheets, dashboards, docs, and
motion. You can edit, comment on, and export them, with no account and no upload. It
ships as a plugin for several agents and as a standalone skill. It was formerly called
`baoyu-design`. `date_published` is the date the repo was read; it had about 460 stars
in its first week.

## Key points

- **Install as a plugin (recommended):** needs Node.js 22.18 or later. Download
  `open-artifact-plugins.zip` from the repo's latest GitHub release and extract it. In
  Claude Code, add the extracted folder as a marketplace (`/plugin marketplace add
  <folder>`), then install `open-artifact@open-artifact`. Per-agent steps are in
  `plugins/claude-code/README.md` in the repo.
- **Skill only:** copy `codex/skills/open-artifact/` from the bundle into your agent's
  skills folder. Check it works with
  `node codex/skills/open-artifact/scripts/open-artifact.mjs artifact '{"action":"list","scope":"types"}'`.
- **Agents:** Claude Code (CLI, desktop, IDE), Codex, ChatGPT desktop, Cursor, GitHub
  Copilot (CLI and VS Code), Antigravity, and any agent that can load a skill.
- **Good for:** making a slide deck, dashboard, or UI mock-up from a coding session and
  keeping it in the repo as files you can version, review, and export.
- Apache-2.0 licence. About 133 commits, a changelog, a tag-driven npm publish
  workflow, and docs in three languages, so it looks maintained.

## Why it matters

Artifacts usually live in one vendor's chat app. This keeps them as local files that
any agent can read and edit, which fits a git-based workflow.
