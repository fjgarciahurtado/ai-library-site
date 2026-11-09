---
title: "GitHub Copilot weekly releases: November 2"
url: https://github.blog/changelog/2026-11-06-github-copilot-weekly-releases-november-2
archived:
type: release
author: GitHub
date_published: 2026-11-06
date_added: 2026-11-09
tags: [coding-agents, cli, ide, mcp, plugins]
topics: [tooling/coding-agents]
---

## Summary

GitHub's roundup of Copilot changes for the week of 2026-11-02, covering the Copilot
app, Copilot CLI, JetBrains, Xcode, and VS Code 1.145. New items here are a single
settings dashboard in the CLI, guided tool approval in the app, and Copilot in JetBrains
Air. The Xcode and VS Code items were already covered by their own notes.

## Key points

- **Copilot CLI `/settings`:** one searchable dashboard for plugins, MCP servers, and
  other settings. Run `/settings` in the CLI.
- **Copilot app, assisted approval (opt-in):** you write guidance, using personal
  instructions, about which tool requests Copilot may approve without asking. It applies
  to local sessions. The post does not say where the setting is.
- **Copilot app, other changes:** set up Agent Merge from a pull request so Copilot
  merges once checks pass. From a context-limit error you can compact or see what fills
  the context. Drop files on "New" to start a session (CSV/TSV open as tables). Archive
  pinned sessions whose PRs closed. Get the app at gh.io/app.
- **JetBrains Air:** Copilot now runs in JetBrains Air with your existing subscription.
  You can track several agent sessions and run tasks locally or in the cloud through Air
  Teams.
- **Already covered:** Copilot in Xcode's coding assistant (public preview, Xcode 27.3
  beta) and VS Code 1.145 (local automations on cron, remote apps and canvases).

## Why it matters

Copilot is moving toward the same "agent approves its own safe actions" model as Claude
Code's auto mode, here driven by plain-language instructions. The CLI's `/settings` makes
plugins and MCP servers easier to manage.
