---
title: "GitHub Agentic Workflows generally available"
url: https://github.blog/changelog/2026-10-28-github-agentic-workflows-generally-available
archived:
type: release
author: GitHub
date_published: 2026-10-28
date_added: 2026-10-29
tags: [coding-agents, agents, cli, security]
topics: [tooling/coding-agents, practices/security]
---

## Summary

GitHub Agentic Workflows (`gh aw`), an open-source GitHub Next project, became generally
available on 2026-10-28 for GitHub Free, Team, and Enterprise. You write an automation
as a Markdown file with YAML frontmatter, and `gh aw compile` turns it into a standard
GitHub Actions workflow that runs a coding agent (Copilot CLI by default, or Claude,
Codex, Gemini, or Pi). Typical jobs are issue triage, CI failure analysis, doc updates,
and test writing.

## Key points

- **Install and try:** `gh extension install github/gh-aw`, then from the repo root
  `gh aw add-wizard githubnext/agentics/repo-status` (picks an engine and sets up
  auth), `gh aw compile`, and `gh aw run repo-status`. Workflows live in
  `.github/workflows/<name>.md`; commit both the `.md` and the generated `.lock.yml`.
- **Good for:** recurring repository chores that need judgement rather than a fixed
  script. Ready-made workflows are in the
  [githubnext/agentics](https://github.com/githubnext/agentics) repository.
- **Safeguards:** agents run read-only by default in a sandboxed container behind the
  Agent Workflow Firewall; writes go through "safe outputs", and a threat-detection job
  scans proposed changes before they apply. Agents can also run in a micro-VM, and
  enclaves guard cross-repository workflows.
- **Cost:** `gh aw forecast` (no longer experimental) estimates monthly spend, including
  threat-detection credits. The default Copilot CLI engine needs a Copilot licence.
- Supports self-hosted Actions Runner Controller runners, per-workflow model provider
  choice, and model routing by task difficulty.

## Why it matters

It brings "agent as a CI job" into plain Actions with security defaults built in, so an
agent can triage issues or fix failing builds without a separate service. Because the
engine is pluggable, it also works for people who use Claude Code or Codex rather than
Copilot.
