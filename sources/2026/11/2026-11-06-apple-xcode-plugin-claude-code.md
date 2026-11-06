---
title: "Apple's Xcode plugin added to the official Claude Code marketplace"
url: https://github.com/anthropics/claude-plugins-official/pull/6338
archived:
type: release
author: Apple Inc. (listed by Anthropic)
date_published: 2026-11-06
date_added: 2026-11-06
tags: [plugins, mcp, coding-agents, anthropic, ide]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

On 2026-11-06 Anthropic merged an `xcode` plugin, authored by Apple, into the official
Claude Code plugin marketplace (`claude-plugins-official`). It is described as "Work with
Xcode projects from Claude Code": it exposes Xcode capabilities through MCP so Claude Code
can build, run, and test schemes, render SwiftUI previews, drive simulators and devices,
read build logs and diagnostics, and search Apple developer documentation.

## Key points

- **Install:** `claude plugin install xcode@claude-plugins-official` (or `/plugin` →
  Discover inside a session). The plugin is not stored in the marketplace repo: its
  source is a `command` entry that runs `xcrun agent plugin path --plugin-format claude`
  and links the plugin that ships with your installed Xcode. So it only works on a Mac
  with an Xcode version that has the `xcrun agent` command; the PR does not say which
  version that is.
- **Good for:** native iOS/macOS work from the terminal: build and test a scheme, check
  a SwiftUI preview visually, run on a simulator, and read diagnostics without switching
  to Xcode.
- This is the first marketplace entry whose source is a local command rather than a Git
  repo; CI change #7015 was needed to allow it.
- Older manual setup, still documented by Apple: `claude mcp add --transport stdio xcode
  -- xcrun mcpbridge` (Xcode 26.3 and later). Open the project in Xcode first.
- The PR (opened 2026-09-30, merged 2026-11-06) and the marketplace entry are the only
  primary sources found; Apple's page on giving external agents access to Xcode could not
  be read on 2026-11-06.

## Why it matters

Apple-platform development gets a first-party, one-line install for Claude Code instead of
hand-wiring the `mcpbridge` server, and it tracks the Xcode version you have installed.
