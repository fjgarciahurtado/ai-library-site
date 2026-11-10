---
title: "Taste Skill (design-taste-frontend)"
url: https://github.com/Leonxlnx/taste-skill
archived:
type: repo
author: Leonxlnx
date_published: 2026-11-10
date_added: 2026-11-10
tags: [skills, plugins, coding-agents, open-source]
topics: [tooling/skills, tooling/coding-agents]
---

## Summary

Taste Skill is an MIT-licensed agent skill that steers coding agents away from generic
landing pages when building company websites. Its main skill, `design-taste-frontend`,
classifies the client's business, picks a palette, font pairing, and hero layout, uses
vetted photographs and real UI fragments, and runs a headless-browser check and a
"finish gate" before handing the page over. `date_published` is the date the README was
read; the repo shows version 2.5.1 and about 321 commits.

## Key points

- **Install in Claude Code:** `/plugin marketplace add Leonxlnx/taste-skill`, then
  `/plugin install taste-skill@taste-skill` (`/plugin update` to upgrade).
- **Install in Codex:** `codex plugin marketplace add Leonxlnx/taste-skill`, then
  `codex plugin add taste-skill@taste-skill`.
- **Any agent with `npx skills`:**
  `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"`.
  From a clone, `./install.sh` (with `--codex` or `--all-agents`) symlinks it.
- **Needs:** Node 22+ and Chrome, Edge, or Chromium for the page check; ffmpeg is
  optional. No API keys.
- **Good for:** marketing and company sites where the agent should make deliberate art
  direction choices. Shader and scroll effects are limited to software, tech, and gaming
  sites. Other skills that used to live here moved to separate repositories.
- **Popularity:** about 112,600 stars and 7,600 forks on 2026-11-10 (+3,700 stars in the
  week before). The star count is high for a single skill and could not be verified, but
  the repo has a changelog, releases, and steady commits.

## Why it matters

It complements Impeccable (design vocabulary and audits) with an opinionated, verified
workflow for one common task: shipping a business website that does not look
AI-generated.
