---
title: "GitHub Copilot in VS Code: Universe 2026 releases"
url: https://github.blog/changelog/2026-10-28-github-copilot-in-vs-code-universe-releases
archived:
type: release
author: GitHub
date_published: 2026-10-28
date_added: 2026-10-29
tags: [coding-agents, ide, computer-use, plugins, mcp]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

GitHub's Universe 2026 update for Copilot in VS Code (2026-10-28) is about sessions that
outlive the editor. A background Agent Host keeps sessions running after the window
closes, sessions can run on remote machines or in GitHub's cloud and be continued from
other clients, and an open Agent Host Protocol lets other apps share them. It also adds
experimental desktop computer use and a customizations marketplace.

## Key points

- **Agent Host:** `code agent host` keeps Copilot sessions running after you close the
  folder or window. Run `code agent host --github-environment` in a project to check on,
  steer, or start tasks from GitHub Mobile.
- **Remote and cloud sessions:** run agents on another machine over Remote SSH or dev
  tunnels (Remote menu in the Agents window), or start a cloud session from the Agents
  window. Sessions continue across VS Code, the Copilot app, GitHub Mobile, github.com,
  Copilot CLI, and Slack or Teams DMs.
- **Computer use (experimental, macOS and Windows):** enable
  `chat.agentHost.computerUse.enabled`, restart, then type `/computer on` in a session.
  Each app needs your approval, and organizations can disable it by policy.
- **Customizations browser and marketplace (preview):** **Chat: Open Customizations**
  gathers skills, MCP servers, plugins, and connectors in one place. A repo can register
  plugin marketplaces and default plugins in `.github/copilot/settings.json`
  (contributors can turn them off unless policy requires them).
- **Agent Host Protocol (AHP):** an open protocol, with client libraries for
  TypeScript, Rust, Go, Kotlin, and Swift, for custom clients that share live sessions
  with VS Code and catch up after reconnecting.
- The Copilot harness, built on the Copilot SDK, stays the default. GitHub also said the
  same day that the GitHub Copilot SDK is becoming the Microsoft Copilot SDK; no action
  is required from existing users.

## Why it matters

Coding agents are moving from "a chat panel in the editor" to long-running sessions that
live on a host and can be reached from anywhere, as Claude Code already does with
background sessions and Remote Control. AHP is a bid to make that session layer open.
