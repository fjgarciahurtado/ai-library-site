---
title: "GitHub Copilot weekly releases: November 9"
url: https://github.blog/changelog/2026-11-16-github-copilot-weekly-releases-november-9
archived:
type: release
author: GitHub
date_published: 2026-11-16
date_added: 2026-11-17
tags: [coding-agents, ide, mcp, anthropic, google]
topics: [tooling/coding-agents]
---

## Summary

GitHub's roundup for the week of 2026-11-09 (published 2026-11-16) covers VS Code 1.146
and the Copilot app. New agent features include letting an agent run model comparisons
itself, an inbox view across all workspaces' sessions, and in-chat re-authentication for
MCP-backed connectors. Claude Fable 5.2 and Gemini 4 Carbon are now in Copilot.

## Key points

- **Agent model comparisons (experimental, VS Code 1.146):** turn on `Compare Models`,
  then enable the agent tools in settings; the agent can then find models, launch a
  comparison, and summarise the results for you.
- **Inbox mode (experimental):** enable it in the Agents window's sessions list to see
  sessions from all workspaces, with the ones needing attention first; dismiss, hold, or
  snooze the rest.
- **MCP re-authentication in conversation:** when a server such as Slack needs a new
  sign-in, the chat offers the matching connector, connects it, and resumes the task.
- **VS Code chat windows (preview):** move a chat out of the Agents window into its own
  window; extensions can be installed from the Agents window (experimental).
- **Copilot app:** hand off cloud and Codespace sessions to GitHub Mobile with a QR code
  (**Open in** menu); GitHub Enterprise Server support is generally available (no cloud
  sessions on GHES); Project automations take minute-level or cron schedules;
  multilingual dictation.
- **Models:** Claude Fable 5.2 (Pro+, Max, Business, Enterprise; requires data retention
  by default; Business and Enterprise admins must turn on its policy) and Gemini 4
  Carbon (same plans).

## Why it matters

Model comparison moves from a manual preview to something the agent can drive, and the
inbox view helps when many background sessions run at once. The MCP sign-in flow removes
a common reason long tasks stall.
