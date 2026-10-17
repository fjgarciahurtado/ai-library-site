---
title: "Google DeepMind and Singapore Government collaborate to build fine-tuned AI model for scam detection"
url: https://deepmind.google/blog/on-device-ai-scam-detection-mddi/
archived:
type: article
author: Google DeepMind
date_published: 2026-10-14
date_added: 2026-10-15
tags: [google, fine-tuning, open-source, deployment, security]
topics: [fundamentals/training-and-fine-tuning, models/open-weight, models/gemini]
---

## Summary

Google DeepMind and Singapore's MDDI and GovTech fine-tuned a lightweight Gemma model on
local scam conversations to detect scams on the user's device. A small classifier screens
incoming messages and passes suspicious ones to the Gemma model for multi-turn analysis,
which shows a warning when it detects manipulation. Announced at Singapore International
Cyber Week 2026; not yet available.

## Key points

- Base model: a lightweight Gemma; the exact variant, size, and fine-tuning method are
  not given.
- Training data: anonymised scam reports and intelligence feeds (impersonation of
  institutions, banks, local figures), with no personal data; trained in GovTech's managed
  Google Cloud environment.
- Two-stage pipeline: cheap classifier first, then the Gemma model only for flagged
  conversations.
- Runs on-device with user consent; neither Google nor the government can see the
  conversations.
- No accuracy figures published; the model was stress-tested on synthetic dialogues and
  local corpora. Rollout into apps will be phased.

## Why it matters

A clear example of the pattern "small open model, fine-tuned on domain data, run on
device" for privacy-sensitive classification, with a cascade to keep costs low.
