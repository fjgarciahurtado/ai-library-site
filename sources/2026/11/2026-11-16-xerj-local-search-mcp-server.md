---
title: "XERJ: local search engine and MCP server for agents"
url: https://github.com/xerj-org/xerj
archived:
type: repo
author: xerj-org
date_published: 2026-11-16
date_added: 2026-11-16
tags: [mcp, rag, coding-agents, open-source]
topics: [tooling/mcp]
---

## Summary

XERJ is a single Rust binary that indexes code, docs, logs, CSV/JSONL, and PDFs on your
machine and serves keyword (BM25), vector, and hybrid search through an
Elasticsearch-compatible API and a stdio MCP server. It is Apache-2.0 for the engine,
with about 19K stars and over 4,000 commits (read 2026-11-16; latest release candidate
v1.0.0-rc.101). The date above is the read date; the repo is not new but was rising in
the GitHub trends report.

## Key points

- **Install:** `curl -fsSL https://xerj.org/get | sh` (read the script first), a Nix
  flake, or `cargo build --release -p xerj-server` in `engine/`.
- **Run and index:** `xerj --insecure --data-dir ~/xerj-data &` starts a local node
  (`--insecure` turns off TLS and API keys: single-user, localhost only), then
  `xerj autoindex ~/my-project`.
- **Use from Claude Code:** `claude mcp add xerj -- /absolute/path/to/xerj mcp` (or an
  `mcpServers` entry in `.mcp.json`); set `XERJ_URL` if the node is not on
  `http://localhost:9200`, and pass the key from `admin.key` via `XERJ_AUTH` when auth is
  on. `xerj mcp` only proxies to a running node. Tools include `xerj_search` and
  `xerj_def`.
- **Good for:** giving an agent fast search over a large repo plus its logs and docs
  without reading whole files into context.
- **Caveats:** the token-saving and accuracy figures are the project's own and some
  benchmark scripts are unpublished; the optional XERJ Query-1 answer model shipped in
  release binaries since rc.101 is proprietary; the README is heavily promotional.

## Why it matters

A self-hosted alternative to cloud doc and code search MCP servers: one binary, local
data, and a familiar Elasticsearch API for other tools.
