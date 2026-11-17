---
title: "Control where GitHub Copilot customizations come from"
url: https://github.blog/changelog/2026-11-16-control-where-github-copilot-customizations-come-from
archived:
type: article
author: GitHub
date_published: 2026-11-16
date_added: 2026-11-17
tags: [coding-agents, plugins, skills, mcp, security]
topics: [tooling/skills, practices/security]
---

## Summary

GitHub Enterprise Cloud admins can now require that Copilot skills, custom agents,
hooks, MCP servers, and executable extensions come only from plugins or managed settings,
not from standalone user or project files. Combined with marketplace restrictions, this
lets an organisation hand out approved tools through a plugin library instead of turning
them off.

## Key points

- **Setting:** `strictPluginOnlyCustomization` (managed setting) blocks standalone
  customizations from user and project sources; eligible plugins and managed settings
  still load, subject to other policies.
- **Scope:** apply it to all five categories or a subset: skills, custom agents, hooks,
  MCP servers, and executable Copilot extensions (canvas providers, not VS Code
  Marketplace extensions).
- **Marketplace control:** pair it with `strictKnownMarketplaces` to limit which
  marketplaces count. GitHub notes that "plugin-only" does not mean enterprise-managed
  plugins only, and the setting is not a marketplace allowlist by itself.
- **Availability:** GitHub Enterprise Cloud, for Copilot Business and Enterprise seats
  issued by the enterprise or its organisations. The post does not say which clients
  honour it.

## Why it matters

Skills, hooks, and MCP servers in a repository can run code; letting admins route them
through reviewed plugins is the same supply-chain control Claude Code offers with managed
plugin settings, now on Copilot.
