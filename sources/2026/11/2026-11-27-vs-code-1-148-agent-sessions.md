---
title: "VS Code 1.148: agent sessions in Dev Containers, sandbox profiles, fullscreen MCP Apps"
url: https://code.visualstudio.com/updates/v1_148
archived:
type: release
author: Microsoft
date_published: 2026-11-25
date_added: 2026-11-27
tags: [ide, coding-agents, mcp, security]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

VS Code 1.148 (stable, 2026-11-25) focuses on agent sessions: they start faster, can run
inside Dev Containers and sandbox profiles on remote hosts, and can keep the machine
awake while they work. MCP Apps can now go fullscreen. The older Local harness is
deprecated and will be removed in February 2027. It was missed on release day and added
two days later.

## Key points

- **Faster responses:** Agent Host chat responses start about 30% sooner on average.
- **Keep awake (preview):** `sessions.keepAwakeWhileWorking` with `whenPluggedIn`
  (default), `always`, or `never`, so long agent runs are not cut off by sleep.
- **Session inbox (experimental):** `sessions.list.inboxEnabled` lists sessions that
  need you; `sessions.list.inboxAutoAdvance` (`auto`, `on`, `off`, `newSession`)
  controls moving to the next one.
- **Dev Containers for agent sessions (experimental):**
  `chat.agentHost.devContainer.environments.enabled`, plus
  `chat.agentHost.devContainer.handoff.enabled` to let an agent move an existing session
  into a new Dev Container.
- **Sandbox profiles (experimental):** `chat.agent.sandbox.profiles.enabled`, managed
  with the command **Sandbox: Manage Sandbox Profiles**.
- **Password prompts for agent shell commands:** on by default in the Copilot harness;
  turn off with `chat.agentHost.copilot.shellAuthentication.enabled: false`.
- **Worktree cleanup:** **Chat: Open Worktree Cleanup** removes leftover agent
  worktrees on remote hosts. A **Troubleshoot Connection...** action helps with failed
  remote environments.
- **Fullscreen MCP Apps:** a button moves an MCP App into the editor area or the
  Secondary Side Bar.
- **For extension authors:** Agent Host Protocol 1.1.0 can represent skills served over
  MCP (SEP-2640).
- **Deprecation:** the Local harness goes away in February 2027.

## Why it matters

Running agent sessions in containers or sandbox profiles gives VS Code users isolation
similar to Claude Code's and Codex's sandboxes, and skills over MCP are now appearing in
a second major client after Claude Code.
