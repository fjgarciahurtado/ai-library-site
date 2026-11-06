---
title: "Floorplan: plain-English interactive map of your codebase"
url: https://github.com/haydenschmitty/floorplan
archived:
type: repo
author: Hayden Smith
date_published: 2026-11-06
date_added: 2026-11-06
tags: [plugins, coding-agents, open-source]
topics: [tooling/coding-agents]
---

## Summary

Floorplan is an MIT-licensed plugin for Claude Code and Codex that reads a codebase and
draws an interactive, plain-English map of it: the parts of the app, files, endpoints,
screens, and how they connect, including across separate repos. It also offers a health
check for common mistakes in AI-built apps, a "Recent work" view of what the agent
changed, "Ask the map" questions, and a "blueprint" mode that maps an app from a PRD
before it exists. `date_published` is the date it was checked (version 0.6.3).

## Key points

- **Install in Claude Code:** `claude plugin marketplace add haydenschmitty/floorplan`,
  then `claude plugin install floorplan@floorplan`, and start a new session. The README
  also gives a Codex install path.
- **Requirements:** Node.js 18+; no API keys; the README says it has no dependencies.
- **Good for:** getting oriented in an unfamiliar repo, reviewing what an agent changed
  across a session, and checking a vibe-coded app for structural problems.
- **Maintenance signals (2026-11-06):** about 3,000 stars (+2,610 in 7 days), 230 forks,
  120 commits, a changelog, CI tests, 19 open issues and 29 open PRs. The fork ratio looks
  organic; the large open-PR count may mean a review backlog.

## Why it matters

A visual alternative to reading an agent's summary of a codebase; useful as a quick check
after a long agent session.
