---
title: "Claude Agent SDK (TypeScript) v0.3.317 and v0.3.318"
url: https://github.com/anthropics/claude-agent-sdk-typescript/releases/tag/v0.3.318
archived:
type: release
author: Anthropic
date_published: 2026-11-04
date_added: 2026-11-04
tags: [anthropic, sdk, agents, security]
topics: [frameworks/landscape]
---

## Summary

Two TypeScript Agent SDK releases matching Claude Code 2.1.317 (2026-11-03) and 2.1.318
(2026-11-04). 0.3.317 adds fail-closed hook matchers and one breaking type change;
0.3.318 reports when the stored claude.ai sign-in ends and when a config file is invalid.

## Key points

- **Install:** `npm install @anthropic-ai/claude-agent-sdk@0.3.318`.
- **0.3.317, `onFailure: "block"` on hook matchers:** a hook callback that throws or
  returns invalid output blocks the action instead of letting it through, and a warning
  appears in the stream when a hook fails. Same feature as `on_failure="block"` in the
  Python SDK 0.2.177.
- **0.3.317, breaking:** the `file_unchanged` variant of `FileReadOutput` is gone; a
  repeated Read returns the file content again. Code that matched that variant needs
  updating.
- **0.3.317, other:** a `session_writes_lost` system message after the result when a full
  disk stopped the transcript or `~/.claude.json` being saved; `lossy` in `readFile()`
  results when invalid UTF-8 was replaced; `task.description` in TaskCreate results.
- **0.3.318:** `credential_expires_at` on result messages; `config_file_invalid` as a
  `startup_failure_reason`; the interrupt response now covers a message held behind a
  model change; `PushNotificationInput.status` is optional.

## Why it matters

Guardrail hooks in SDK apps can now fail closed, and long-running SDK services can alert
before a stored sign-in expires.
