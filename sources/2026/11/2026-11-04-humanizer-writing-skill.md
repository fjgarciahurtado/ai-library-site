---
title: "Humanizer: a skill that removes signs of AI writing"
url: https://github.com/blader/humanizer
archived:
type: repo
author: blader
date_published:
date_added: 2026-11-04
tags: [skills, plugins, prompting, open-source]
topics: [tooling/skills]
---

## Summary

Humanizer (MIT) is an agent skill that rewrites AI-sounding text so it reads as if a
person wrote it, keeping the meaning. It is built on Wikipedia's "Signs of AI writing"
guide. It says it aims at human readers, not at getting past AI detectors, which still
flag most of its output. On 2026-11-04 it was rising in GitHub trends (about 2,900
stars in a week, 64,500 total).

## Key points

- **Install in Claude Code (2.1.142+):** `/plugin marketplace add blader/humanizer`, then
  `/plugin install humanizer@humanizer`. Codex:
  `npx skills add blader/humanizer --global --agent codex`; other agents:
  `--agent '*'`. Omit `--global` for one project only. Claude.ai and Desktop: upload the
  repo ZIP as a skill.
- **How it works:** checks text against 26 patterns in six groups (staging, rhythm,
  inflation, formatting, chatbot leftovers, wrong reader), drafts a rewrite, critiques
  what still sounds artificial, and gives a final version.
- **Safe on files:** pointed at a file, it edits only prose and leaves code, data,
  frontmatter, and links alone. It asks rather than inventing missing names, numbers,
  or dates.
- **Voice matching:** add a writing sample and it follows your rhythm and word choice.
- **Good for:** cleaning up docs, READMEs, emails, and notes an agent drafted.

## Why it matters

A packaged, reusable editing pass for the most common complaint about agent-written
prose, with a clear rule against adding facts.
