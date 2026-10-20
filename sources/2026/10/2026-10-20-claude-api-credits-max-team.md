---
title: "API credits for Max and Team plans (Claude Platform docs)"
url: https://platform.claude.com/docs/en/about-claude/api-credits-for-subscribers
archived:
type: docs
author: Anthropic
date_published: 2026-10-07
date_added: 2026-10-20
tags: [anthropic, cost, sdk]
topics: [models/claude, practices/cost-and-caching]
---

## Summary

Anthropic's documentation for the monthly Claude API credits included with Max and Team
plans, launched on 2026-10-07 according to the Help Center release notes. Subscribers
link a Claude Console organization to their plan and receive credits each billing cycle
for the API, Managed Agents, the Agent SDK, and the Console playground. Credits do not
cover Claude Code or extra usage in the Claude apps. This is the primary source for what
the library previously knew only from Simon Willison.

## Key points

- Amounts (checked 2026-10-20): Max 5x $100 a month, Max 20x $200. Team plans get $20 per
  Standard seat and $100 per Premium seat, pooled and capped at $500 a month, and
  discounted Team plans get the same.
- Claim: on claude.ai go to Settings > Billing (Max) or Organization settings > Billing
  (Team), then link a Console organization in the "API credits" section. New subscribers
  wait 7 days. Each plan links to one organization, and changing it needs support.
- Credits expire at the end of each billing cycle with no rollover. They are spent before
  purchased credits, and every key and workspace in the organization shares them.
- Credits cannot be used on Bedrock, Vertex AI (Google Cloud), Foundry, or Claude
  Platform on AWS. Free, Pro, and Enterprise plans are not eligible.
- Linked organizations move up to at least the Start tier, or the Build tier if the
  credits exceed $200. The credits do not count towards higher tiers.
- When the credits run out and no purchased balance remains, API requests stop. Nothing
  is ever charged to the Claude plan.

## Why it matters

Max and Team subscribers can build and run small agents on the API at no extra cost.
Because Claude Code is excluded, the credits suit Agent SDK scripts and Managed Agents,
not interactive coding.
