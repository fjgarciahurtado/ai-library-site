---
title: "ARIS: Markdown skills for autonomous ML research with cross-model review"
url: https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep
archived:
type: repo
author: wanshuiyin
date_published: 2026-11-19
date_added: 2026-11-20
tags: [skills, plugins, coding-agents, multi-agent, research, open-source]
topics: [tooling/skills]
---

## Summary

ARIS ("Auto-Research-In-Sleep") is a bundle of about 83 Markdown skills that run ML
research workflows in Claude Code and Codex CLI: idea discovery, literature search,
experiments, paper review, rebuttals, and slides or posters. Its main idea is a
cross-model loop in which one model does the work and a different model (Codex by
default) reviews it. MIT licence, about 19.5k stars, actively maintained (last commits
2026-11-19, many external PRs merged). `date_published` is the date of the latest
commit, not of a release.

## Key points

- **Install in Claude Code:** `claude plugin marketplace add
  wanshuiyin/Auto-claude-code-research-in-sleep`, then `claude plugin install aris@aris`,
  run `/aris:setup` once, and restart. Codex has an equivalent `codex plugin add
  aris@aris`. These commands were read from a summary of the README, so check them
  against the README before running.
- **Commands:** `/research-pipeline "<direction>"` for an end-to-end run, `/rebuttal`
  (paper, reviews, venue limits), `/research-implement-feature` on a base repo, and
  `/paper-slides` or `/paper-poster-html` after acceptance.
- **Reviewer:** the review loop needs a second model, by default Codex via an MCP
  server or the bundled ARIS-Code CLI, so it needs OpenAI (or other) API access.
- **Good for:** literature reviews, rebuttal drafting, and turning a paper into slides;
  the skills are plain Markdown and can be read or adapted one by one.
- **Caution:** it is built to run experiments unattended, including over SSH. Use a
  sandbox or dedicated machine with limited credentials. The README is promotional;
  treat its claimed results with care.

## Why it matters

A large, maintained example of the "executor plus independent reviewer model" pattern
packaged as ordinary skills, which can be reused outside research (for example for
code or document review loops).
