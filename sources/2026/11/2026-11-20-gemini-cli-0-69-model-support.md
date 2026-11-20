---
title: "Gemini CLI v0.69.0 and its Gemini 4 model support"
url: https://github.com/google-gemini/gemini-cli/releases/tag/v0.69.0
archived:
type: release
author: Google
date_published: 2026-11-19
date_added: 2026-11-20
tags: [google, coding-agents, cli]
topics: [tooling/coding-agents, models/gemini]
---

## Summary

Gemini CLI 0.69.0 (2026-11-19) adds a token-usage heatmap, standalone custom themes, and
a direct `/model <name>` argument. v0.70.0, released the same day, contains only fixes.
This note also records a check of which models the CLI supports: as of 2026-11-20 no
Gemini 4 model (Carbon, Neon, Hydrogen or Argon) appears in its releases, docs, or
model list.

## Key points

- **New in 0.69.0:** `/stats heatmap` shows daily token usage; custom themes can live
  in a standalone `theme.json`; `/model` validates names and accepts the model as an
  argument (`/model gemini-3.8-flash`).
- Update with `npm install -g @google/gemini-cli@latest`.
- **Model support (checked 2026-11-20):** the model list in
  [`packages/core/src/config/models.ts`](https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/config/models.ts)
  on `main` defines Gemini 2.5, 3, 3.1, 3.5 and 3.8 models plus two Gemma 4 models, but
  no `gemini-4-*` id. Release notes from v0.67.0 to the v0.71.0 nightly of 2026-11-20
  never mention Gemini 4.
- The [Gemini CLI docs](https://geminicli.com/docs/) carry a banner saying the CLI "has
  not been optimized for Gemini 4 Argon" and pointing to Antigravity, and that Gemini
  CLI was replaced by Antigravity CLI for unpaid-tier and Google One users on
  2026-06-18. The page's footer says it was last updated on 2026-04-17, which
  conflicts with the banner, so treat the dates with care.
- The `docs/cli/model.md` table still lists only Gemini 3 and 2.5 "Auto" modes, behind
  the source.

## Why it matters

Anyone wanting Gemini 4 models in a terminal agent should not expect them in Gemini
CLI yet; Google points Gemini 4 users to Antigravity instead.
