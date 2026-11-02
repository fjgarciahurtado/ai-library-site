---
title: "Claude platform release notes: fast mode deprecated on Opus 4.8"
url: https://platform.claude.com/docs/en/release-notes/overview
archived:
type: release
author: Anthropic
date_published: 2026-10-30
date_added: 2026-11-02
tags: [anthropic, cost, deployment]
topics: [models/claude, practices/cost-and-caching]
---

## Summary

On 2026-10-30 Anthropic deprecated fast mode for Claude Opus 4.8. It will be removed on
2026-11-30. After that date, requests to `claude-opus-4-8` with `speed: "fast"` return an
error. Anthropic points users to Opus 5.5, where fast mode is generally available.

## Key points

- Deprecated 2026-10-30; removal on 2026-11-30.
- After removal, fast requests on Opus 4.8 fail; Claude Code's changelog (2.1.316) adds
  that they do not fall back to standard-speed Opus 4.8.
- Replacement: Opus 5.5 fast mode (GA since 2026-10-15, $8 / $40 per 1M tokens), with a
  migration guide from Opus 4.8.
- Only fast mode is deprecated. The Opus 4.8 model itself stays Active, with retirement
  "not sooner than May 28, 2027" on the deprecations page (checked 2026-11-02).

## Why it matters

Any code or gateway config that sends `speed: "fast"` to Opus 4.8 has four weeks to move
to Opus 5.5 or drop the flag, or it starts failing.
