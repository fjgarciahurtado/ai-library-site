---
title: "Copilot code review billing will default to the organization"
url: https://github.blog/changelog/2026-11-25-copilot-code-review-billing-will-default-to-the-organization
archived:
type: release
author: GitHub
date_published: 2026-11-25
date_added: 2026-11-26
tags: [coding-agents, cost, industry]
topics: [tooling/coding-agents]
---

## Summary

GitHub will change the default billing target for Copilot code review. From 2026-12-30,
organizations and enterprises on Copilot Business or Enterprise that have not chosen a
setting will have code reviews requested by licensed members billed to the organization
instead of the member.

## Key points

- Applies to Copilot Business and Copilot Enterprise organizations and enterprises.
- Until the change, an unset policy shows "Default (Member)" with a notice. To keep
  member billing, select **Member** in the organization or enterprise Copilot policy
  settings before 2026-12-30.
- Explicit **Member** or **Organization** choices are kept. The separate setting for
  members without a Copilot licence does not change.
- Organization billing needs AI Credits paid usage; accounts without it, with a billing
  lock, or with no billable customer will be set to **Member** instead.
- GitHub warns that organization billing can increase spending.

## Why it matters

Admins who leave the setting alone may see Copilot code review costs move onto the
organization's AI Credits bill at the end of December. Worth checking the policy now.
