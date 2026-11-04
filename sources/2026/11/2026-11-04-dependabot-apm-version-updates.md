---
title: "Dependabot version updates support Agent Package Manager"
url: https://github.blog/changelog/2026-11-03-dependabot-version-updates-support-agent-package-manager
archived:
type: release
author: GitHub
date_published: 2026-11-03
date_added: 2026-11-04
tags: [skills, mcp, security]
topics: [tooling/skills, practices/security]
---

## Summary

Since 2026-11-03 Dependabot can open pull requests that update the agent skills,
prompts, and instructions a repo declares in APM's `apm.yml`
([APM note](2026-11-04-apm-agent-package-manager.md)). It is generally available on
github.com for all plans and coming to GitHub Enterprise Server 3.24.

## Key points

- **Enable it:** add an entry with `package-ecosystem: "apm"` to
  `.github/dependabot.yml`, with the `directory` that holds `apm.yml` and a `schedule`.
  The changelog does not show the YAML; the ecosystem name comes from its wording, so
  check GitHub's supported-ecosystems page if the key is rejected.
- **What it updates:** supported git dependencies in `apm.yml`; it regenerates
  `apm.lock.yaml` when present.
- **Limits:** version updates only, no security updates (no advisories yet).

## Why it matters

Third-party skills are code and instructions that agents follow. Pinning them and
getting reviewable update PRs is the same supply-chain hygiene used for packages.
