---
title: "Open Code Review (Alibaba)"
url: https://github.com/alibaba/open-code-review
archived:
type: repo
author: Alibaba
date_published: 2026-11-17
date_added: 2026-11-17
tags: [coding-agents, skills, plugins, cli, open-source, security]
topics: [tooling/coding-agents, tooling/skills]
---

## Summary

Open Code Review (OCR) is Alibaba's Apache-2.0 AI code review CLI. It mixes deterministic
steps (choosing files, bundling them, matching rules, placing comments) with an LLM agent
that writes line-level review comments on a diff or a whole directory. It ships as a CLI,
as agent skills, and as plugins for Claude Code, Codex, Cursor, and others, and can run
in CI. `date_published` is the date the README was read; the repo had about 53,000 stars
and 870 commits, with no tagged release shown.

## Key points

- **Install:** `npm install -g @alibaba-group/open-code-review` (needs Git 2.41+), then
  `ocr config provider` and `ocr config model` to pick an LLM. As skills for any Agent
  Skills agent: `npx skills add alibaba/open-code-review`.
- **Use:** `ocr review` reviews staged, unstaged, and untracked changes;
  `ocr review --from main --to my-branch` reviews a branch; `ocr review --commit <sha>`
  one commit; `ocr scan --path <dir>` whole files. `--format json --output result.json`
  for tooling; `--resume <session-id>` continues a review.
- **Two modes:** native mode (`open-code-review` skill) uses OCR's own agent and model
  settings; delegation mode (`open-code-review-delegate` skill) lets your coding agent
  do the review with its own model and login, while OCR supplies file selection, rules,
  and report checks. Delegation needs no separate API key.
- **Rules:** built-in rules for null dereferences, thread safety, XSS, and SQL injection;
  extensible with MCP tools. CI templates for GitHub Actions, GitLab CI, and Gerrit;
  OpenTelemetry tracing and a session viewer.
- **Claims:** the README reports higher precision than Claude Code's review at about a
  ninth of the tokens, with lower recall. These are Alibaba's own benchmark figures.

## Why it matters

A free, local review step that can run inside the coding agent you already use
(delegation mode) or in CI, with deterministic rules to keep comments focused. Useful as
a pre-PR check before a human or hosted review.
