---
title: "Context7: up-to-date library docs for coding agents"
url: https://github.com/upstash/context7
archived:
type: repo
author: Upstash
date_published: 2026-11-11
date_added: 2026-11-11
tags: [mcp, skills, coding-agents, cli]
topics: [tooling/mcp, tooling/coding-agents]
---

## Summary

Context7 serves current, version-specific documentation and code examples for libraries
to coding agents, so they rely less on stale training data. It works either as an MCP
server or as a CLI plus skill with no MCP needed. The MCP server code is MIT-licensed;
the API, parsing, and crawling backend is private and hosted by Upstash. It was rising
in GitHub trends on 2026-11-11 (about 64,500 stars). `date_published` is the date the
README was read; the repo shows no dated releases.

## Key points

- **Quick install for Claude Code:** `npx ctx7 setup --claude` (Node.js 22.13+). It signs
  in with OAuth, creates an API key, and installs a skill. Undo with `npx ctx7 remove`.
- **Manual MCP setup:** remote server `https://mcp.context7.com/mcp` with an
  `Authorization: Bearer <API key>` header. A free key raises rate limits; the README
  gives no limit numbers or paid tiers.
- **Two modes:** CLI + skill (the agent runs `ctx7 library <name> <query>` to find a
  library ID and `ctx7 docs <libraryId> <query>` to read docs), or MCP with the tools
  `resolve-library-id` and `query-docs` (optional `language` to rank examples).
- The README suggests a `CLAUDE.md` rule telling Claude to use Context7 for library and
  API questions, so it is consulted without being asked each time.
- Good for: libraries that changed after the model's knowledge cutoff, version-pinned
  projects, and less hallucinated API usage.

## Why it matters

Stale API knowledge is a common cause of broken agent-written code. Context7 is a
widely used way to inject current docs on demand, and the skill mode keeps its tool
definitions out of the context window. Note that queries go to a third-party service.
