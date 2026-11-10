---
title: "How Claude marks AI-generated content (Help Center)"
url: https://support.claude.com/en/articles/16266773-how-claude-labels-ai-generated-content
archived:
type: docs
author: Anthropic
date_published: 2026-11-10
date_added: 2026-11-10
tags: [anthropic, safety, llm]
topics: [models/claude]
---

## Summary

Anthropic's Help Center article lists which Claude models carry the text watermark on
which platforms, and how Content Credentials (C2PA) and detection work. It shows "Updated
today" with no explicit date, so `date_published` is the date it was read. It answers the
question left open by the 2026-11-03 release note, which named only three models.

## Key points

- **First-party surfaces** (Claude Platform API, Claude apps, Claude Code, Claude Cowork,
  Claude Tag): watermarked models are Fable 5.2, 5.1, 5; Mythos 5.2, 5.1, 5; Opus 5.5,
  5, 4.8, 4.7, 4.6, 4.5; Sonnet 5.5, 5, 4.6, 4.5; Haiku 5.5 and 4.5.
- **Cloud partners** (AWS, Google Cloud, Microsoft Foundry): Fable 5.2, 5.1, 5; Mythos
  5.2, 5.1, 5; Opus 5.5, 5, 4.8, 4.7; Sonnet 5.5, 5, 4.6; Haiku 5.5. Opus 4.6, Opus 4.5,
  Sonnet 4.5, and Haiku 4.5 are marked only on first-party surfaces. Rollout on Amazon
  Bedrock for Mythos 5, Opus 4.7, and Sonnet 4.6 completes "by November 10".
- Models launched on or after 2026-08-02 carry the mark from launch; older models are in
  a transition period.
- On Sonnet 4.6, a non-default `temperature`, `top_p`, or `top_k` may leave output
  unmarked.
- **Detection:** text watermark detection is a private preview API for eligible
  organizations (request form; Anthropic plans to widen access). The free "Claude
  Content Checker" checks files for Content Credentials only, not text watermarks.
- Content Credentials (C2PA) apply only to files Claude creates in the Claude apps and the
  Claude Platform API, including Claude Platform on AWS and Microsoft Foundry.

## Why it matters

Almost all current Claude output is watermarked, not just the three models in the first
announcement. There is still no public text detector, so a third party cannot check
text without the private API.
