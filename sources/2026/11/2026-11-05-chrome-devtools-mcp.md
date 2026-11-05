---
title: "Chrome DevTools MCP: a live Chrome browser for coding agents"
url: https://github.com/ChromeDevTools/chrome-devtools-mcp
archived:
type: repo
author: Google (Chrome DevTools team)
date_published: 2026-11-05
date_added: 2026-11-05
tags: [mcp, plugins, skills, coding-agents, google, open-source, cli]
topics: [tooling/mcp]
---

## Summary

Chrome DevTools MCP is Google's official MCP server (and `chrome-devtools` CLI) that lets
a coding agent drive and inspect a real Chrome browser: record and analyse performance
traces, read network requests and console messages with source-mapped stack traces, take
screenshots, and automate pages through Puppeteer. It is Apache-2.0, had about 54,800
GitHub stars on 2026-11-05 (+431 in a week), and is under active development. The date
above is the date the repo was checked; it has been public for much longer.

## Key points

- **Install in Claude Code as a plugin** (server plus skills):
  `/plugin marketplace add ChromeDevTools/chrome-devtools-mcp`, then
  `/plugin install chrome-devtools-mcp@chrome-devtools-plugins`.
- **Or as a plain MCP server** in any client: command `npx`, args
  `["-y", "chrome-devtools-mcp@latest"]` (for Claude Code:
  `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`). Needs Node.js
  LTS and current stable Chrome or Chrome for Testing.
- **Bundled skills** cover debugging, the CLI, accessibility, cookies, LCP
  (Largest Contentful Paint), and memory leaks.
- **Useful options:** `--headless`, `--isolated` (throwaway profile), `--slim` (reduced
  tool set for basic browsing), `--no-performance-crux`, `--no-usage-statistics`.
- **Privacy:** usage statistics go to Google by default (off with
  `--no-usage-statistics`, `CHROME_DEVTOOLS_MCP_NO_USAGE_STATISTICS`, or `CI`); the
  performance tools may send trace URLs to the CrUX API. Anything in the browser is
  visible to the MCP client, so use a separate profile for sensitive sites.
- Good for: letting the agent verify a web change itself (load the page, check the
  console, measure LCP) instead of you pasting screenshots and errors.

## Why it matters

Giving an agent a way to check its own work is the main lever for coding-agent quality.
This is the official, maintained way to do that for front-end work, from the team that
builds DevTools.
