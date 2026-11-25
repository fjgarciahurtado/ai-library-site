---
title: "Claude Security plugin v0.13.0"
url: https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-security
archived:
type: release
author: Anthropic
date_published: 2026-11-24
date_added: 2026-11-25
tags: [anthropic, plugins, security, coding-agents, multi-agent]
topics: [practices/security, tooling/skills]
---

## Summary

Claude Security is Anthropic's official Claude Code plugin for finding vulnerabilities
in a codebase; its README calls it "the in-your-session version of Claude Security".
Version 0.13.0 was merged into the official plugin marketplace on 2026-11-24
([commit beb1e2b](https://github.com/anthropics/claude-plugins-official/commit/beb1e2b0f1088800e7a15f30885e028522b6444c)).
It adds an attack surface analysis skill, a live scan view, sandbox scripts, and a
`claude-security` CLI. There are no release notes; the changes below were read from the
commit diff.

## Key points

- **Install:** `/plugin install claude-security@claude-plugins-official`, then
  `/reload-plugins`. If the marketplace is missing, first run
  `/plugin marketplace add anthropics/claude-plugins-official`. Update with
  `claude plugin update claude-security@claude-plugins-official`.
- **What it does:** a team of agents maps the codebase, hunts for vulnerabilities, and
  verifies each finding before it goes into the report. Reports come as Markdown, JSONL,
  and SARIF; findings can be turned into patch files that you review and apply yourself.
- **Other uses:** scan a diff or pull request, triage existing findings, build a threat
  model, run in CI through a GitHub Action, and read findings from hosted Claude
  Security.
- **New in 0.13.0:** an `attack-surface-analysis` skill (three stages, documented in
  `ATTACK-SURFACE.md`); new agents for attack surface, scanning, patching, and explaining
  findings; a live terminal view of the scan, on by default (plugin option `live_view`);
  sandbox scripts; and a `claude-security` command-line tool.
- The commit is large (181 files), so expect behaviour changes from 0.12.

## Why it matters

It is the easiest way to run a verified multi-agent security review inside Claude Code
on your own repositories, and the new attack surface analysis gives a map of entry
points before a deeper scan.
