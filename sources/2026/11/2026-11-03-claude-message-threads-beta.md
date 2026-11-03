---
title: "Claude API message threads (beta)"
url: https://platform.claude.com/docs/en/build-with-claude/message-threads
archived:
type: docs
author: Anthropic
date_published: 2026-11-02
date_added: 2026-11-03
tags: [anthropic, agents, sdk, tokens, caching]
topics: [models/claude, practices/cost-and-caching]
---

## Summary

Message threads, a Messages API beta announced in the Claude platform release notes on
2026-11-02, let the API keep a conversation on the server. After the first request,
each request sends only the new messages, which makes requests smaller and keeps time to
first token lower and steadier in long agent loops. Threads are short-lived and
best-effort, so the client must still keep the full conversation and be able to replay
it.

## Key points

- **Enable:** beta header `message-threads-2026-08-12`. The SDKs (Python, TypeScript, C#,
  Go, Java) have a helper, for example `client.beta.messages.thread(model=...,
  system=..., cache_control={"type": "ephemeral"})` and then `thread.send({...})` once
  per turn. The helper adds the header, creates and continues the thread, and replays it
  when it has expired.
- **Raw API:** the first request carries the full conversation, `system`, and `tools`
  plus `"thread": {"type": "create"}`. Later requests send only the new messages with
  `"thread": {"type": "continue", "previous_message_id": "<previous response id>"}` and
  leave out `system` and `tools`.
- **Lifetime:** a thread expires 5 minutes after its last request and is deleted no
  more than 1 hour after its last use. A continue request on an expired thread returns
  404; send the full conversation again as a new create request.
- **No management API:** threads cannot be listed, read, or deleted.
- **Pricing and rate limits are unchanged.** Threads cut upload and tokenisation work,
  not the token bill. Prompt caching still needs a `cache_control` (top-level automatic
  caching or your own breakpoints); without it nothing is cached.
- **Not ZDR-eligible:** thread contents are held in memory, encrypted, never written to
  durable storage, and deleted within an hour.
- **Models:** all current models from Haiku 4.5 and Sonnet 4.5 onwards, including Opus
  5.5, Sonnet 5.5, Haiku 5.5, and Fable 5.1.
- **Platforms (beta):** Claude API, Claude Platform on AWS, Claude Models on Google Cloud
  (Anthropic managed), and Microsoft Foundry.
- Different from session threads in Claude Managed Agents.

## Why it matters

Long agent loops re-upload a growing transcript every turn. Threads remove most of that
overhead without changing prices, as long as the client keeps a replay path.
