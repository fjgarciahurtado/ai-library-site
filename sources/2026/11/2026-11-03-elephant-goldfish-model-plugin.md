---
title: "Elephant-Goldfish Model (EGM): design and review skills from Google"
url: https://github.com/google/elephant-goldfish-model
archived:
type: repo
author: Google
date_published: 2026-11-03
date_added: 2026-11-03
tags: [skills, plugins, coding-agents, multi-agent, google, open-source]
topics: [tooling/skills, tooling/coding-agents]
---

## Summary

EGM is an Apache-2.0 plugin from a Google GitHub organisation (the README says it is
"not an officially supported Google product") with skills for designing software before
an agent builds it. An "elephant" agent with full project context drafts the design;
"goldfish" reviewers, fresh subagents with no conversation history, read only the
document and look for unstated assumptions and gaps. You decide the trade-offs and
approve the design. The repository gained about 8,900 stars in the week to 2026-11-03
(10,700 total) and had a burst of commits on 2026-11-02 and 11-03.
`date_published` is the date it was checked; the README gives no release date.

## Key points

- **Install in Claude Code:** `claude plugin marketplace add google/elephant-goldfish-model`,
  then `claude plugin install egm@egm`, and start a new session. Commands use the
  `/egm:` prefix, for example `/egm:egm-brainstorm`.
- **Codex:** `codex plugin marketplace add google/elephant-goldfish-model`, then
  `codex plugin add egm@egm`. **Antigravity CLI:** `agy plugin install
  https://github.com/google/elephant-goldfish-model`. A separate guide covers Claude
  Cowork and ChatGPT Work; experimental support for Cursor, Copilot CLI, and opencode
  landed on 2026-11-03.
- **Skills:** Brainstorm (concept brief), Draft (design document), Review (five-stage
  review by fresh agents), Review loop (a configured group of reviewers), Resolve (work
  through findings), Bootstrap (write or refresh docs for an existing codebase), and
  Drift report (compare checked-in docs with the code).
- Brainstorm and Review need an agent that can start fresh subagents.
- **Good for:** catching hidden assumptions in a plan before an agent spends hours
  implementing it, and keeping design docs in step with the code.

## Why it matters

It packages a useful pattern, review by context-free reviewers, as a portable plugin
that runs in Claude Code, Codex, and Antigravity.
