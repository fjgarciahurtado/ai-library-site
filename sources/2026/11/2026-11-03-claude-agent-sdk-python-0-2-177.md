---
title: "Claude Agent SDK (Python) v0.2.177"
url: https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.177
archived:
type: release
author: Anthropic
date_published: 2026-11-03
date_added: 2026-11-03
tags: [anthropic, sdk, frameworks, agents, security]
topics: [frameworks/landscape]
---

## Summary

Version 0.2.177 of the Python Claude Agent SDK (2026-11-03) adds an `on_failure` option
to `HookMatcher` and bundles Claude Code CLI 2.1.317.

## Key points

- **Install:** `pip install claude-agent-sdk==0.2.177`.
- **`on_failure="block"`** on a `HookMatcher` blocks the action when the hook callback
  raises, returns `None`, or returns a value the CLI rejects. The default, `"continue"`,
  treats a failure as "no decision", which lets the action run.
- It needs a CLI that supports the option. Connecting to an older CLI with
  `on_failure="block"` raises `CLIConnectionError`, so the guard cannot be lost silently.
- Bundled CLI: 2.1.317 (see the
  [Claude Code 2.1.317 note](2026-11-03-claude-code-2-1-317.md)).

## Why it matters

Policy hooks (for example "never write outside this folder") can now fail closed, which
is what a security control should do.
