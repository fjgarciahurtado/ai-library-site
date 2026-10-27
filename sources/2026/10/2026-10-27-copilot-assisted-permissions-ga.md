---
title: "GitHub Copilot assisted permissions generally available"
url: https://github.blog/changelog/2026-10-26-github-copilot-assisted-permissions-generally-available
archived:
type: release
author: GitHub
date_published: 2026-10-26
date_added: 2026-10-27
tags: [coding-agents, security, cli, ide]
topics: [tooling/coding-agents, practices/security]
---

## Summary

GitHub's "assisted permissions" mode for Copilot reached general availability on
2026-10-26. When Copilot wants to run a command, access a file path, or open a URL, a
language model checks the request. Requests it classes as clearly safe run without
asking, and you approve everything else yourself. It works in Copilot CLI, the Copilot
app, and VS Code.

## Key points

- **Enable it:** in Copilot CLI, run `/permissions` and choose assisted. In the Copilot
  app, open the mode picker, then Tool permissions, then Assisted. In VS Code, open the
  permissions picker and choose Assisted permissions.
- **What it is good for:** fewer approval prompts for routine commands, without going as
  far as "Allow All". It works like Claude Code's auto mode, which also uses a classifier
  to approve or block actions.
- **Admin controls:** enterprise-managed settings can block Allow All but keep Assisted,
  turn off Assisted on its own, or set the default mode for new sessions. If the default
  is not available or not allowed, new sessions start with manual approval.
- The changelog does not say which Copilot plans include it. GitHub Docs explains how
  requests are judged in "Allowing safe commands to run without manual approval".

## Why it matters

Using a model to approve agent actions is becoming a standard option in coding agents,
between asking every time and allowing everything. It is still a probabilistic check,
so sandboxing and admin policy remain the hard limits.
