---
title: "Inference hooks (Claude docs)"
url: https://platform.claude.com/docs/en/manage-claude/inference-hooks
archived:
type: docs
author: Anthropic
date_published: 2026-10-20
date_added: 2026-10-21
tags: [anthropic, security, safety]
topics: [practices/security, models/claude]
---

## Summary

Inference hooks came out of beta on 2026-10-20 for Claude Enterprise organizations,
according to the Claude platform release notes. A hook sends each governed prompt, and
optionally each batch of tool calls, to an HTTPS "AI security server" that the
organization runs. Inference continues only if the server answers allow. The hook runs
on Anthropic's servers, so it covers claude.ai, Cowork, Claude Code, Claude Tag, Claude
in Chrome, and the other Claude apps without installing anything on users' devices. The
same release notes add user profiles and organization webhooks to the API.

## Key points

- **Who can use it:** Claude Enterprise only. It is configured by the Owner or Primary
  owner (`organization:manage`). It does not cover API (Platform) organizations, Amazon
  Bedrock, or Google Cloud.
- **Events:** `prompt` fires before each governed inference request. `tool_call` fires
  before Claude's tool calls run, if **Validate tool calls** is on, and one verdict
  covers all the calls in a response.
- **What it sends:** an HTTPS `POST` with the transcript, tool calls and results, and
  text extracted from attachments, signed under the Standard Webhooks specification.
  It never sends system prompts, tool definitions, or raw image or file bytes, so
  screenshots of documents are not inspected.
- **Verdicts:** allow or deny only, within a timeout that defaults to 5 seconds. Hooks
  cannot redact or rewrite content. A deny shows the server's `deny_reason` plus an
  admin message, and is logged in the Activity Feed.
- **Rollout controls:** shadow mode, a rollout percentage, role exclusions, a choice
  between failing open and failing closed, and a circuit breaker for a failing server.
- **After a deny:** later requests resend the whole conversation, so the user must
  remove the content. In Claude Code, `/rewind` to the prompt that brought it in, or
  `/clear`.
- **Uses:** inline DLP, live transcript archiving (always allow), prompt telemetry, and
  policy engines (model allowlists, working hours).
- **Also in the 2026-10-20 release notes:** the `/v1/user_profiles` endpoints let a
  platform or reseller tag each API request with its end customer. A safety enforcement
  action can then target that customer instead of the whole organization. Admin API
  organization webhooks (beta header `webhooks-2026-10-07`, access through the account
  team) report when a user profile is restricted or banned, and when that ends.

## Why it matters

Hooks give enterprises one server-side control point across every Claude surface,
including Claude Code, instead of per-device agents. For the owner's own use, the
practical points are that Claude Code sessions in an enterprise may be blocked by
policy, and that `/rewind` is how to recover.
