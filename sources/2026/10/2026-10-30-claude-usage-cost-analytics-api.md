---
title: "Usage and Cost Analytics API (beta)"
url: https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api
archived:
type: docs
author: Anthropic
date_published: 2026-10-29
date_added: 2026-10-30
tags: [anthropic, cost, sdk]
topics: [practices/cost-and-caching, models/claude]
---

## Summary

On 2026-10-29 Anthropic launched a beta Usage and Cost Analytics API that reports token
usage and cost for Claude Console and Claude Enterprise organizations, grouped by model,
workspace, API key, the user or service account behind a request, and more. It replaces
the older Usage and Cost API and the Enterprise Analytics usage and cost reports, which
are now legacy but still supported. The day before (2026-10-28), the maximum request
size for the Messages and Token Counting APIs rose from 32 MB to 128 MB.

## Key points

- **Endpoints:** `GET /v1/organizations/analytics/usage` (tokens and request counts) and
  `GET /v1/organizations/analytics/cost` (USD, in cents as decimal strings, with both the
  discounted `amount` and the `list_amount`).
- **Enable:** send `anthropic-beta: analytics-usage-cost-2026-08-24`. Auth is an Admin API
  key or an OAuth token with the `org:admin` scope; Anthropic recommends Workload Identity
  Federation for collectors. Not available to individual accounts. The SDKs and the `ant`
  CLI send the headers and paginate for you.
- **Shape:** `group_by[]` takes up to five dimensions (for example `model`, `actor`,
  `service_tier`); the cost endpoint adds `cost_type` and `token_type`. Filters such as
  `models[]=claude-opus-5-5` combine with grouping. `time_bucket_width` is `1m`, `1h`, or
  `1d`; results are ranked by the metric unless `order_by=time`.
- **Limits:** data from 2026-01-01 and within the last 365 days; at most 31 days per
  request, 24 hours with one-minute buckets.
- **Other platforms:** also on Claude Platform on AWS (per region, IAM actions
  `ListAccountUsage` and `ListAccountCost`) and Anthropic-managed Claude on Google Cloud
  (IAM permissions `usageAnalytics.list` and `costAnalytics.list`). Some dimensions, such
  as Managed Agents IDs, are null on AWS.
- **Request size:** per the release notes, the 128 MB limit applies to the first-party
  Claude API only.

## Why it matters

Per-key and per-actor cost breakdowns make it practical to see which agent, script, or
person is spending, and to build hourly dashboards without the Console.
