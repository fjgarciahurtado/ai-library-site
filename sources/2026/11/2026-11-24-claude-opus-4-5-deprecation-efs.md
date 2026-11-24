---
title: "Claude Platform release notes: Opus 4.5 deprecated, Enterprise Frontier Safeguards beta"
url: https://platform.claude.com/docs/en/manage-claude/enterprise-frontier-safeguards/overview
archived:
type: docs
author: Anthropic
date_published: 2026-11-23
date_added: 2026-11-24
tags: [anthropic, llm, security]
topics: [models/claude]
---

## Summary

On 2026-11-23 Anthropic deprecated Claude Opus 4.5. It retires from the API on
2027-01-22, and Opus 5.5 is the replacement. The same release notes start a beta of
Enterprise Frontier Safeguards (EFS), which gives eligible organisations zero data
retention on the most capable models. Encrypted safety data goes to a storage bucket
the customer owns. The deprecation facts come from the release notes
(<https://platform.claude.com/docs/en/release-notes/overview>, 2026-11-23 entries) and the
model deprecations page (<https://platform.claude.com/docs/en/about-claude/model-deprecations>).

## Key points

- **Opus 4.5 deprecation:** `claude-opus-4-5-20251101` and the alias `claude-opus-4-5`
  are deprecated as of 2026-11-23 and retire on 2027-01-22. Migrate to
  `claude-opus-5-5`, using the Opus 5.5 migration guide.
- **Deprecations table (checked 2026-11-24):** Sonnet 4.5 retires on 2026-11-30.
  Haiku 4.5 is still Active with no deprecation date; its retirement is "not sooner
  than October 15, 2026". Opus 4.6, 4.7, and 4.8 and Sonnet 4.6 are Active, with
  retirement no sooner than February to May 2027.
- **What EFS is:** Anthropic keeps no prompts or responses. Encrypted "Sealed Safety
  Data" goes to a bucket in your own cloud account, which is required. Anthropic does
  not charge for EFS; your cloud provider bills the storage.
- **EFS scope:** it applies to every model in a workspace. It does not cover the Default
  Workspace, code execution containers, Files API uploads, Batch results, or Managed
  Agents sessions. Anthropic human review is always off, so your own team reviews
  flagged safety cases.
- **EFS eligibility:** request access from your account team. It is for internal use
  only and is unavailable when HIPAA readiness is on.
- **How to enable EFS:** an admin accepts the terms on the Programs page. This also turns
  on the Compliance API and Access Transparency, which cannot be turned off. Then set up
  the bucket (and an optional customer-managed key) on the Data retention page, and pick
  EFS per workspace.
- New organisation webhooks (beta), `external_storage.failed` and
  `external_storage.recovered`, report problems with customer-owned storage.

## Why it matters

Anyone still on Opus 4.5 has two months to move. EFS is Anthropic's route to zero data
retention on frontier models for regulated organisations, with safety data kept in the
customer's own cloud account.
