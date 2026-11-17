---
title: "VS Code retires the Local harness in February 2027"
url: https://github.blog/changelog/2026-11-16-vs-code-retires-the-local-harness-in-february-2027
archived:
type: article
author: GitHub
date_published: 2026-11-16
date_added: 2026-11-17
tags: [coding-agents, ide, sdk, mcp]
topics: [tooling/coding-agents]
---

## Summary

VS Code 1.146 deprecates the Local harness, the older component that runs GitHub Copilot
agent sessions in the editor, and removes it in February 2027. The replacement is the
Copilot harness, built on the Copilot SDK and shared with Copilot CLI and the Copilot
app, which has been the default for new sessions since VS Code 1.143.

## Key points

- **Timeline:** deprecated in VS Code 1.146 (announced 2026-11-16); about three months of
  transition where policy allows; removed in February 2027. New features go only to the
  Copilot harness.
- **What the Copilot harness adds:** Copilot Fusion model routing (supported tiers),
  assisted permissions that auto-approve calls a risk check accepts and ask about the
  rest, Copilot connectors (preview) for team services without configuring MCP servers,
  canvases (preview) for task boards and diagrams, and admin-managed runtime permissions
  and sandbox rules. Files stay on your machine.
- **What to do:** start a new session and pick **Copilot** under **Session Target**;
  check your customizations (skills, agents, hooks, MCP) because switching does not
  convert all of them; follow GitHub's Local harness transition guide.
- **Admins:** review any `vscode.temporaryDefaultToLocalHarness` exception; it is removed
  with the Local harness, so it will not keep it alive.
- All Copilot plans, including Free, keep working; features depend on plan and policy.

## Why it matters

Copilot in VS Code, Copilot CLI, and the Copilot app now converge on one agent runtime.
Anyone with custom Copilot workflows in VS Code has until February 2027 to test them on
the new harness.
