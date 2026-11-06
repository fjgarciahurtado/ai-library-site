---
title: "IP allowlisting for Claude organizations (beta)"
url: https://platform.claude.com/docs/en/manage-claude/ip-allowlist
archived:
type: docs
author: Anthropic
date_published: 2026-11-05
date_added: 2026-11-06
tags: [anthropic, security]
topics: [practices/security]
---

## Summary

On 2026-11-05 Anthropic added a beta IP allowlist to the Claude Console. Requests to covered
services from addresses outside the list are refused, which limits where a leaked API key
can be used. The same release notes add a beta Admin API call that signs a Claude
Enterprise member out everywhere.

## Key points

- **IP allowlist:** set in the Claude Console; IPv4 and IPv6 addresses or CIDR ranges, up
  to 1,000 entries per organization. The docs page lists which services are covered.
- Plan before enabling: CI runners, cron hosts (such as a home Raspberry Pi on a dynamic
  IP), and developer laptops all need to be inside the list, or their calls will fail.
- **Sign a member out everywhere (beta):** an Admin API request ends a Claude Enterprise
  member's sessions on all devices. The member stays in the organization and can sign in
  again. It needs a beta header; the user-management docs list what the request does not
  end.
- Source: [Claude platform release notes, 2026-11-05](https://platform.claude.com/docs/en/release-notes/overview).

## Why it matters

API keys are the main credential for Claude apps and agents; an allowlist turns a leaked
key from a full compromise into a much smaller problem.
