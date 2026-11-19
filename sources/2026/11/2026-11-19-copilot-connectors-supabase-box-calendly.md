---
title: "Connect Supabase, Box, Calendly, and more to Copilot"
url: https://github.blog/changelog/2026-11-18-connect-supabase-box-calendly-and-more-to-copilot
archived:
type: release
author: GitHub
date_published: 2026-11-18
date_added: 2026-11-19
tags: [mcp, coding-agents, ide]
topics: [tooling/mcp, tooling/coding-agents]
---

## Summary

GitHub added eight connectors (GitHub-verified MCP servers) to Copilot: Box, Buildkite,
Calendly, ClickUp, Mixpanel, Supabase, Webflow, and Wix. They join Slack, Figma, Sentry,
and others. Connectors are in public preview on all Copilot plans and, once connected,
work across Copilot surfaces.

## Key points

- **Enable:** Copilot app → Customize → Connect; Copilot CLI → `/mcp` → Connectors tab →
  Connect; VS Code → Agents window → Customizations; or the Copilot customization page
  on github.com.
- **Useful for:** Supabase (projects and databases) and Buildkite (pipelines and
  builds) are the most relevant to coding; the rest cover files, scheduling, tasks,
  analytics, and website builders.
- **Admins:** on Business and Enterprise, the `Editor preview features` policy must be
  on. Enterprises that allowlist MCP servers one by one (rather than by wildcard) must
  add the new connectors. Some services need their own admin to allow MCP access (Box,
  for example).

## Why it matters

Copilot users can add common SaaS MCP servers with one click and verified provenance
instead of configuring each server by hand.
