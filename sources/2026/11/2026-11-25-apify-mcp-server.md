---
title: "Apify MCP server"
url: https://github.com/apify/apify-mcp-server
archived:
type: repo
author: Apify
date_published: 2026-11-24
date_added: 2026-11-25
tags: [mcp, tool-use, agents]
topics: [tooling/mcp]
---

## Summary

The official Apify MCP server connects an agent to the Apify Store, a marketplace of
ready-made scrapers and automation tools ("Actors") for web search, web pages, maps,
e-commerce, and social media. The agent can search for an Actor, read its input schema
and price, run it, and page through the results. It is MIT-licensed and actively
maintained: 11 releases between 2026-11-10 and 2026-11-24, the latest being v0.23.0
(2026-11-24). It was rising in the 2026-11-25 GitHub trends report (about 17.8k stars).

## Key points

- **Install (hosted, recommended):** `claude mcp add apify "https://mcp.apify.com" -t http`.
  Sign in with OAuth in the browser, or send `Authorization: Bearer <APIFY_TOKEN>` if the
  client cannot do OAuth.
- **Install (local):** `npx -y @apify/actors-mcp-server` with `APIFY_TOKEN` set (or an
  `apify login` session); needs Node.js 22 or later.
- **Choose tools:** add `?tools=actors,docs,apify/web-search,apify/web-fetch` to the
  hosted URL (or `--tools` locally) to keep the tool list small.
- **Main tools:** `search-actors`, `fetch-actor-details`, `call-actor`,
  `get-dataset-items`; tools to call Actors that are themselves MCP servers; and Apify
  docs search. Default set: Actor and docs tools, Web Search, Web Fetch.
- **Care:** write tools such as `apify-api-write` can change your account;
  `delete-actor` is off by default. Actor runs are billed to your Apify account.
- v0.23.0 has a breaking change: an Actor's declared dataset schema becomes its output
  schema.

## Why it matters

One MCP server gives an agent thousands of maintained scrapers (for sites that block
simple fetches) without writing scraping code, with prices visible before each run.
