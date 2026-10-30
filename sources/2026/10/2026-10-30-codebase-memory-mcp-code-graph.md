---
title: "codebase-memory-mcp: a local code knowledge graph for agents"
url: https://github.com/DeusData/codebase-memory-mcp
archived:
type: repo
author: DeusData
date_published: 2026-10-16
date_added: 2026-10-30
tags: [mcp, coding-agents, memory, open-source]
topics: [tooling/mcp, agents/memory]
---

## Summary

codebase-memory-mcp is an MIT-licensed MCP server that indexes a repository's code, docs,
and infrastructure files into a persistent graph on your machine, so an agent can trace
calls, dependencies, and the impact of a change without re-reading files. It needs no
API key and runs locally. The latest release, v0.12.1 (2026-10-16), fixed installs and
added Helm charts to the graph.

## Key points

- **Install:** run the installer
  (`curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash`,
  or `install.ps1` on Windows), restart Claude Code, and ask it to index the project.
  It is also on npm, PyPI, Homebrew, and `go install`. Manual setup: add an
  `mcpServers` entry pointing at the binary in `~/.claude.json` or the project's
  `.mcp.json`, then check `/mcp`.
- **Tools:** 17 in all, including `index_repository`, `search_graph`, `trace_path`
  (call paths), `detect_changes` (what a diff affects), `get_architecture`, and
  `manage_adr` (architecture decision records).
- **What it is good for:** "what calls this?" and "what breaks if I change it?"
  questions in large or multi-language repositories, and infrastructure graphs (for
  example HelmRelease to Chart to Deployment to Image).
- **Optional:** CBM Lens, a browser visualiser in open beta (v0.0.1).
- **Caveats:** the binaries are large (over 300 MB in v0.12.0), and the first index after
  an upgrade is a full rebuild. Read the install script before piping it to a shell.
- Around 47,800 stars (+550 in the week to 2026-10-30) and frequent releases.

## Why it matters

It is a structural alternative to grep-style exploration: the agent asks a graph instead
of spending context reading files, which helps most in large codebases.
