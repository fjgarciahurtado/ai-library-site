---
title: "External sandboxes for coding agents"
url: https://blog.primeradiant.com/external-sandboxes-for-coding-agents/
archived:
type: article
author: Simon Willison (Prime Radiant)
date_published: 2026-11-16
date_added: 2026-11-18
tags: [coding-agents, security, open-source, cli]
topics: [practices/security, tooling/coding-agents]
---

## Summary

Prime Radiant released experimental "external sandbox" servers: the coding agent stays
on the host, but every command it runs executes in a Linux VM that sees only the folders
and network hosts you allow. Three interchangeable servers share one localhost API
(spec in `prime-radiant-inc/external-sandbox`), and adapters exist for Claude Code, Codex,
and Pi. The post is a prototype announcement, not audited software.

## Key points

- **Start a sandbox** in the project folder (mounts it read-write at `/mnt/project`):
  - any OS with Node 22.19+: `npx --yes external-sandbox-v86 --preserve-paths --mount-rw "project=$PWD"` (port 8686; Alpine in WebAssembly);
  - Apple silicon: `uvx external-sandbox-container ...` (Apple Containers, port 8687) or
    `uvx external-sandbox-quicksand ...` (QEMU via Microsoft Quicksand, port 8688).
  Add `--mount-ro name=/path` for read-only folders. Each port also serves a web UI.
- **Claude Code:** set `CLAUDE_CODE_SHELL_PREFIX` to the repo's `claude-shell-prefix.sh`,
  plus `CLAUDE_CODE_SHELL=/bin/bash`, `CLAUDE_CODE_TMPDIR` inside the mount, and
  `EXTERNAL_SANDBOX_API_URL`. Only Bash runs in the sandbox; Read and Edit still run on
  the host.
- **Codex:** point an `environments.toml` in a dedicated `CODEX_HOME` at the sandbox's
  `/codex` WebSocket (exec-server, experimental; tested with Codex CLI 0.164.0).
- **Pi:** `pi install npm:external-sandbox-pi`; it replaces all file and shell tools, so
  nothing runs on the host.
- **Network:** no access by default. `--proxy` or `--proxy-config proxy.json` enables an
  allow-list proxy (origins and HTTP methods) with a live policy editor and request log.
- **Credential replacement:** the sandbox sees a placeholder; the proxy swaps in the
  real secret from a host variable on allowed hosts. A host that echoes headers could
  leak it, so use only trusted services.
- Good for: trying local or weaker models, or untrusted repos, without risking the host.

## Why it matters

It is a concrete, tool-neutral way to put a hard boundary under coding agents and to
keep API keys out of the agent's reach. The limits are clear: a read-write mount can
still be damaged, and Claude Code's file tools bypass it.
