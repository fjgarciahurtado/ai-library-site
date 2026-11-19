---
title: "Customize GitHub Copilot for your team"
url: https://github.blog/changelog/2026-11-18-customize-github-copilot-for-your-team
archived:
type: release
author: GitHub
date_published: 2026-11-18
date_added: 2026-11-19
tags: [plugins, coding-agents, ide]
topics: [tooling/coding-agents, tooling/skills]
---

## Summary

Team customizations for GitHub Copilot are generally available (2026-11-18) on Copilot
Business and Enterprise. Team maintainers and organization owners can pick approved
Agent Plugins that are switched on by default for the team's direct members in VS Code,
the GitHub Copilot app, and Copilot CLI.

## Key points

- **Set up:** open the organization team on github.com → **Customize Copilot** tab →
  browse Copilot's built-in marketplaces, enterprise marketplaces, or a marketplace
  added from any GitHub repository that contains one → add plugins to the team.
- Child teams do not inherit the defaults. Members can turn a team plugin off in their
  client where policy allows.
- Enterprise and organization policies (allowed marketplaces, required or blocked
  plugins) override team choices.
- No file paths or commands are given; documentation is under Copilot customizations →
  plugins on docs.github.com.

## Why it matters

Plugin bundles of skills, agents, and MCP servers can now be rolled out per team
without each developer installing them, a step beyond the organization-wide controls
GitHub added earlier in November.
