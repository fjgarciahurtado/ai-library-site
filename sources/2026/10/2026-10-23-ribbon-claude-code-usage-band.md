---
title: "Ribbon: usage and prompt-cache band for Claude Code"
url: https://github.com/robonuggets/ribbon
archived:
type: repo
author: robonuggets
date_published: 2026-10-19
date_added: 2026-10-23
tags: [plugins, coding-agents, caching, cost, open-source]
topics: [tooling/coding-agents, practices/cost-and-caching]
---

## Summary

Ribbon (MIT) is a small Claude Code plugin. It adds a one-row band above the prompt
showing how much of your 5-hour and 7-day usage is left, when each resets, and whether
the prompt cache is WARM or COLD, with an estimated cost for your next message. It came
from today's GitHub trends (32 stars in 4 days; the publication date is approximate from
that). The project is early: 5 commits and no releases, but it has tests and a plugin
manifest.

## Key points

- **Install:** in a session, run `/plugin install ribbon --marketplace robonuggets/ribbon`,
  answer `y` at the marketplace prompt, pick user scope, and start a new session. From a
  shell: `claude plugin install ribbon --marketplace robonuggets/ribbon`. Remove it with
  `claude plugin uninstall ribbon`.
- **What it shows:** usage left and reset times for both windows, the cache state, and
  the estimated cost of the next turn. It makes no model calls and reads Claude Code's
  own numbers.
- **Limits:** prices come from a table in `hooks/cache-art.ts`, so they are estimates,
  not your bill. Subagents do not affect its cache timer.
- **Good for:** deciding whether to send a follow-up now, while the cache is warm, or
  after a break, and keeping an eye on Pro/Max limits without opening `/usage`.

## Why it matters

Prompt-cache expiry is invisible in normal use, yet a cold cache can make the next turn
much more expensive. Ribbon makes that state visible at a glance.
