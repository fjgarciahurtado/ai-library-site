---
title: "Claude API linked billing (beta): customers pay for usage in your app"
url: https://platform.claude.com/docs/en/manage-claude/oauth-apps/organization-billing-connections
archived:
type: docs
author: Anthropic
date_published: 2026-11-17
date_added: 2026-11-18
tags: [anthropic, cost, sdk]
topics: [models/claude, practices/cost-and-caching]
---

## Summary

Linked billing (beta, 2026-11-17) lets customers of an app built on Claude pay for their
own usage from their Claude Platform organization. The customer links once through
OAuth, setting a monthly spend cap; the app then chooses per request whether the
customer or the app pays. Requests still run in the developer's organization.

## Key points

- **Per request:** send `anthropic-user-profile-id` and the beta header
  `user-profiles-billing-2026-10-01`, with `billing_policy: {"type": "billing_policy",
  "bill_to": "user_profile"}` (customer pays) or `"self"`. Works on `/v1/messages` and
  `/v1/chat/completions`; not on Message Batches or billable code execution.
- **Setup:** create an OAuth app ("Bill and link to organizations") in the Console,
  authenticate with signed client assertions (no client secrets) and a Workload Identity
  Federation service account, create a user profile per customer, and run a PKCE
  pushed-authorization flow with scope `billing:attribution`. The app must pass
  Anthropic's review before going public.
- **Eligibility:** only organizations that pay Anthropic directly (prepaid or invoiced);
  cloud-marketplace or subscription-only organizations get `403
  user_profile_not_billable`. Promotional plan credits cannot pay.
- **Data terms:** the developer's rate limits, retention, and keys apply; the customer's
  ZDR, BAA, or CMEK do not carry over.
- Customers can cap spend or unlink in the Console; a 402 means no credit or cap reached.

## Why it matters

It removes the need to resell tokens or ask users for API keys in Claude-based tools,
while keeping the customer in control of spend. The data-terms caveat matters for
regulated customers.
