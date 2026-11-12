---
title: "A More Predictable Release Cycle for MCP"
url: https://blog.modelcontextprotocol.io/posts/mcp-release-cycle/
archived:
type: article
author: Den Delimarsky and David Soria Parra (MCP lead maintainers)
date_published: 2026-11-11
date_added: 2026-11-12
tags: [mcp]
topics: [tooling/mcp]
---

## Summary

The MCP maintainers moved the specification to a fixed six-month release schedule,
usually on the last Tuesday of March and September. Proposals that miss a deadline move
to the next release instead of delaying it. The process is defined in SEP-3398, and Luca
Chang joins as release manager. Version names stay date-based, and nothing changes in
the protocol messages or version negotiation.

## Key points

- **Next releases:** the next spec is `2027-03-30` (its planning closed in August 2026,
  so it follows a slightly shorter cycle), followed by 2027-09-28.
- **Timeline before each release:** planning at 8 months; core maintainer reviews from
  6 months; soft freeze at 2.5 months (proposals must be Final and merged); Tier 1 SDK
  betas at 1.5 months; hard freeze at 1 month (only critical fixes by core maintainer
  vote).
- Tier 1 SDKs must have stable support on release day. A late SDK is documented as a gap
  but does not move the date.
- **For server and client authors:** nothing to change now. Test the Tier 1 SDK betas
  about six weeks before each release (mid-February 2027 for `2027-03-30`) and report
  bugs before the hard freeze.

## Why it matters

Fixed dates make it possible to plan MCP upgrades and to know when a proposed feature,
such as the draft file-transfer extension, could land in the spec.
