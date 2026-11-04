---
title: "Impeccable: design vocabulary for coding agents"
url: https://github.com/pbakaus/impeccable
archived:
type: repo
author: Paul Bakaus
date_published:
date_added: 2026-11-04
tags: [skills, plugins, coding-agents, open-source]
topics: [tooling/skills]
---

## Summary

Impeccable (Apache-2.0) is a front-end design skill pack for coding agents that grew out
of Anthropic's frontend-design skill. It gives the agent 24 named design commands for
steering, reviewing, and finishing UI work, plus a deterministic detector for generic
"AI slop" styling. On 2026-11-04 it was rising in GitHub trends (about 10,900 stars in a
week, 101,700 total, 2,600+ commits).

## Key points

- **Install:** `npx impeccable install`, then `/impeccable init` in your agent (writes
  `PRODUCT.md`; `$impeccable init` on Codex). In Claude Code you can instead run
  `/plugin marketplace add pbakaus/impeccable`. Update with `npx impeccable update`.
  A VS Code extension (`renaissance-geek.impeccable`) and a no-Node manual copy also
  exist.
- **Use:** `/impeccable <command> <target>`, for example
  `/impeccable critique the pricing cards`; `/impeccable` alone lists commands.
- **Commands:** steer (`bolder`, `quieter`, `distill`, `colorize`, `typeset`, `layout`,
  `animate`, `delight`, `overdrive`), review (`critique` gives a scored UX review,
  `audit` a technical report ranked P0 to P3), finish (`polish`, `harden`, `clarify`,
  `adapt`, `optimize`, `onboard`), live iteration in a running dev server (`live`,
  `generate`), and setup (`shape`, `init`, `document` writes `DESIGN.md`, `extract`).
- **Detector:** 62 rules, no LLM or API key, run as an agent hook, a CLI
  (`npx impeccable detect`), or a Chrome extension.
- **Agents:** Claude Code, Codex CLI, Cursor, GitHub Copilot, Gemini CLI, OpenCode,
  Antigravity, Kiro, and about a dozen more.
- **Good for:** giving UI feedback in precise terms and getting a repeatable design
  review before shipping a front end.

## Why it matters

A shared vocabulary of design operations makes front-end work with agents less
trial-and-error, and the rule-based detector gives a check that does not depend on a
model's taste.
