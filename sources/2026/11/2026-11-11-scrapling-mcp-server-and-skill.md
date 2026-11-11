---
title: "Scrapling: web scraping framework with an MCP server and agent skill"
url: https://github.com/D4Vinci/Scrapling
archived:
type: repo
author: Karim Shoair (D4Vinci)
date_published: 2026-11-11
date_added: 2026-11-11
tags: [mcp, skills, tool-use, open-source, security]
topics: [tooling/mcp]
---

## Summary

Scrapling is a BSD-3-Clause Python framework for web scraping, covering plain HTTP
requests, stealth browser fetching, parsing, and spider-based crawls. It ships an MCP
server with 17 tools, so Claude Code, Claude Desktop, or Cursor can fetch and drive pages
through it, and an agent skill that teaches coding agents its current API. It is rising
in GitHub trends (about 6,000 new stars in the week to 2026-11-11, 101,000 in total, with
1,825 commits). `date_published` is the date the README was read; the repo shows no
dated releases.

## Key points

- **Install:** `pip install "scrapling[ai]"`, then `scrapling install` to fetch the
  browsers. Docker images: `pyd4vinci/scrapling` or `ghcr.io/d4vinci/scrapling`.
- **Add to Claude Code:** `claude mcp add ScraplingServer "$(which scrapling-mcp)"`
  (the `scrapling-mcp` command exists from v0.4.13; older versions use
  `scrapling mcp`). In Claude Desktop, add `"ScraplingServer": {"command":
  "scrapling-mcp"}` under `mcpServers`.
- **Tools:** one-shot `make_request` and `browser_fetch_once`; sessions
  (`browser_open`, `open_request_session`, `list_sessions`, `close_session`); saved
  login state (`browser_save_state`, `browser_load_state`); `browser_screenshot`,
  `browser_observe`, `browser_extract`, `browser_actions`, `browser_evaluate`; and
  network history (`browser_network_requests`, `browser_network_request`) for reading
  the API responses a page loads in the background.
- **Transports:** stdio by default; `scrapling-mcp --http` serves Streamable HTTP on
  127.0.0.1:8000 and requires a bearer token (`SCRAPLING_MCP_AUTH_TOKEN`). Put a TLS
  proxy in front before exposing it beyond localhost.
- **Prompt-injection hygiene:** with `main_content_only` on (the default), hidden
  elements, `aria-hidden` nodes, templates, HTML comments, and zero-width characters
  are stripped before content reaches the model. Keep it on.
- **Agent skill:** a separate installable skill (docs: scrapling.readthedocs.io, "AI"
  section) so generated scraping code matches the current API.
- Good for: logged-in scraping, sites that block simple fetchers, extracting data from
  a page's XHR traffic, and turning a one-off agent fetch into a reusable spider.

## Why it matters

It gives a coding agent a browser-grade fetcher with saved sessions and network
inspection, which built-in web fetch tools lack, and it strips common hidden-text
injection tricks by default. Check the target site's terms before scraping.
