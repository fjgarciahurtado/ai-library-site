---
title: "VS Code 1.145: mixed agent harnesses, cron automations, and tools from MCP apps"
url: https://code.visualstudio.com/updates/v1_145
archived:
type: release
author: Microsoft
date_published: 2026-11-04
date_added: 2026-11-05
tags: [coding-agents, ide, mcp, multi-agent, security]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

VS Code 1.145 (stable, 2026-11-04) extends the agent features added at GitHub Universe.
A session can now contain nested sessions run by a different agent harness, local
automations accept cron schedules and workspace custom agents, interactive MCP apps can
register tools the model can call, and an enterprise `allowedMcpServers` list now
overrides the registry-only restriction.

## Key points

- **Mixed harnesses (Preview):** enable `chat.agentHost.multipleChatProviders.enabled`,
  then pick a harness in the harness picker when you create a nested session. Each chat
  keeps its own model, agent, and permission level, so you can ask a second agent for an
  opinion without leaving the session.
- **Local automations:** choose **Cron** and type a five-field expression when the
  presets are not precise enough (the dialog validates it and describes the schedule).
  Not available for cloud automations. A local automation can also run a custom agent
  defined in the selected workspace.
- **Tools from MCP apps:** interactive apps served by an MCP server can register tools
  that the model calls on its next request (the release notes' example is a ShaderToy
  server for iterating on shaders).
- **Managed MCP allowlist:** for servers VS Code starts, the enterprise
  `allowedMcpServers` list now wins over registry-only access: listed servers run even if
  they are not in the registry, unlisted registry servers are blocked, and `[]` blocks
  everything. `deniedMcpServers` still takes precedence. Prefer `serverUrl` and
  `serverCommand` rules; `serverName` is a label the server author chooses. Servers run
  by the Agent Host are not covered.
- **Working set (Experimental, on by default in the editor):** review, keep, or undo
  pending agent edits in Copilot harness sessions (`chat.editor.workingSet.enabled`).
- **Chat verbosity (Experimental):** `chat.persistentProgressVerbosity` with Conversation,
  Verbose, and Compact (default) views, picked under **More Actions > View Mode**. Only
  the display changes, not the agent's context.
- Pinned canvases in the sidebar (Experimental, `chat.canvases.enabled`), and files from
  anywhere on disk via **Add Context > Files**.

## Why it matters

VS Code is converging on the same pattern as Claude Code and Codex: several agents per
session, scheduled local runs, and MCP servers that ship UI plus tools. The allowlist
change gives admins one place to say exactly which MCP servers may run.
