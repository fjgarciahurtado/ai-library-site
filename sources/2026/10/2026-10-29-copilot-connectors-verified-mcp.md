---
title: "Copilot connectors: GitHub-verified MCP servers (public preview)"
url: https://github.blog/changelog/2026-10-28-connect-your-tools-to-copilot-without-all-the-setup
archived:
type: release
author: GitHub
date_published: 2026-10-28
date_added: 2026-10-29
tags: [mcp, coding-agents, ide, cli]
topics: [tooling/mcp, tooling/coding-agents]
---

## Summary

GitHub launched "connectors", GitHub-verified MCP servers, in public preview on
2026-10-28. You connect a service once and the connection works across the Copilot app,
Copilot CLI, VS Code, Copilot cloud sessions, and GitHub Mobile, instead of finding an
MCP server and setting up sign-in in each client. 26 services are available at launch,
including Slack, Figma, Notion, Sentry, Linear, Atlassian Rovo, Cloudflare, and Vercel.

## Key points

- **Enable it:** in Copilot CLI run `/mcp` and open the **Connectors** tab; in VS Code
  open the Agents window → **Customizations**; in the Copilot app use **Customize** →
  **Connect**; on github.com use the Copilot customization page.
- **Good for:** giving Copilot access to team tools (issue trackers, error monitoring,
  design files) without running or configuring MCP servers yourself.
- **Availability:** all Copilot plans. On Business and Enterprise an admin must allow
  the `Editor preview features` policy; enterprises with an MCP allowlist must add the
  verified servers; some services (for example Slack) need admin consent on their side.
- Docs: "Copilot connectors" in GitHub Docs (concepts → customizations).

## Why it matters

It is the same move as Claude's hosted connectors: MCP becomes something you sign in to
rather than install. A verified, centrally hosted list also gives admins a smaller set of
servers to approve.
