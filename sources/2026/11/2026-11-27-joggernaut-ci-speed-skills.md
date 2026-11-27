---
title: "joggernaut: agent skills that diagnose and speed up GitHub Actions CI"
url: https://github.com/usejog/joggernaut
archived:
type: repo
author: Jog (usejog)
date_published: 2026-11-22
date_added: 2026-11-27
tags: [skills, plugins, coding-agents, open-source]
topics: [tooling/skills]
---

## Summary

joggernaut is an MIT-licensed set of seven agent skills that look at why pull requests
wait on GitHub Actions, apply a fix you pick, and then measure whether it helped. It
installs as a Claude Code plugin, a Gemini CLI extension, or plain skills for other
agents. The repo was about five days old with 66 stars when it was read (2026-11-27), so
`date_published` is approximate.

## Key points

- **Skills:** `ci-diagnose` (where the time goes), `ci-measure` (before/after timing),
  `ci-cache`, `ci-workflow` (job layout and triggers), `ci-slow-tests`,
  `ci-flaky-tests`, and `ci-guard` (keeps regressions out).
- **Install in Claude Code:** `/plugin marketplace add usejog/joggernaut`, then
  `/plugin install jog@joggernaut`, then `/reload-plugins`.
- **Other agents:** `npx skills add usejog/joggernaut -g -y -a <agent>` for Codex,
  Cursor, OpenCode, Copilot CLI, and Amp; `gemini extensions install
  https://github.com/usejog/joggernaut` for Gemini CLI.
- **Requirements:** Python 3.9 or later and an authenticated `gh` CLI (`gh auth login`),
  because the skills read workflow runs through the GitHub API.
- The README says it was tested on Claude Code, Codex, OpenCode, and Gemini CLI; for the
  other agents it only checked that the files install.
- It documents which permissions it needs, how many API requests it makes, and what it
  will not change. The savings figures in the README come from third-party reports it
  did not reproduce, so treat them as unverified.
- Good for: a slow or flaky CI pipeline where you want the agent to find the cause and
  prove the fix with numbers, rather than guess at caching tweaks.

## Why it matters

Most CI help from agents is one-off edits to YAML. This packages a measure, fix, and
re-measure loop as skills, which matches the "verify with real data" advice elsewhere in
the library.
