---
title: "Model deprecations (Claude API docs)"
url: https://platform.claude.com/docs/en/about-claude/model-deprecations
archived:
type: docs
author: Anthropic
date_published:
date_added: 2026-10-13
tags: [anthropic, deployment, llm]
topics: [models/claude]
---

## Summary

Anthropic's page listing each Claude model's lifecycle status (active, legacy,
deprecated, retired), tentative retirement dates, and the history of deprecation
notices with recommended replacements. The dates apply to the Claude API, Claude
Platform on AWS, and Microsoft Foundry; Bedrock and Google Cloud set their own. No
publication date is shown; content as read on 2026-10-13.

## Key points

- Anthropic gives at least 60 days' notice before retiring a publicly released model.
- **Haiku 4.5** (`claude-haiku-4-5-20251001`) is still listed as Active on 2026-10-13,
  with retirement "not sooner than" 2026-10-15 and no deprecation notice yet. Given
  the 60-day rule, it cannot be retired before mid-December 2026.
- **Sonnet 4.5** was deprecated on 2026-09-30 and retires on 2026-11-30 (replacement:
  `claude-sonnet-5-5`).
- Opus 4.5 is active until at least 2026-11-24. Opus 4.1 retired on 2026-08-05; Opus 4
  and Sonnet 4 retired on 2026-06-15.
- Earliest retirement dates for current models: Haiku 5.5 2027-10-07, Sonnet 5.5
  2027-09-28, Opus 5.5 2027-09-22, Fable 5.1 2027-09-01.
- `temperature`, `top_p`, and `top_k` are deprecated on Claude 4.7 and later; a
  non-default value returns a 400.

## Why it matters

This is the primary source for when old model IDs stop working. A "not sooner than"
date is a floor, not a schedule: retirement only becomes fixed once Anthropic issues a
deprecation notice.
