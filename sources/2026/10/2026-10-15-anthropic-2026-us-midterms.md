---
title: "Preparing for the 2026 US midterms"
url: https://www.anthropic.com/news/2026-us-midterms
archived:
type: article
author: Anthropic
date_published: 2026-10-14
date_added: 2026-10-15
tags: [anthropic, safety, security, industry]
topics: [practices/security, models/claude]
---

## Summary

Anthropic describes how Claude is used for election topics, the voter-information
features it is adding before the 2026 US midterms, its political-bias testing, and the
election misuse it has detected and banned. It updates the company's earlier election
safeguards work.

## Key points

- Usage, from 250,000 sampled US Claude.ai conversations (2026-09-21 to 09-27): about
  5.75% touch politics or social issues, 0.51% elections or voting, 0.01% ask whom to vote
  for, and about 0.002% violate election-integrity policies.
- Since April a TurboVote banner (Democracy Works) appears for registration and polling
  questions. Later in October 2026, US Claude.ai users will get state-specific official
  voting information inside the chat, and official vote counts on election night.
- Opus 5.5, Sonnet 5.5, and Haiku 5.5 score 99% on Anthropic's political evenhandedness
  evaluation, its best so far; they also refuse fewer political requests.
- External reviewers (Future of Free Speech, Foundation for American Innovation,
  Collective Intelligence Project) rated most responses strong. Weaknesses: unsolicited
  caveats and counterarguments, and Sonnet 4.5 hedging unevenly (softening right-leaning
  arguments more).
- Red teaming by the Institute for Strategic Dialogue and McCain Institute (US, Israel,
  Brazil) found Claude refuses single harmful requests reliably but can miss campaigns
  split into harmless-looking subtasks. New classifiers target this multi-step misuse.
- Banned operations: a foreign fake-news site pushing Russian, Iranian, and North Korean
  narratives, and ad-revenue schemes producing fabricated US news.

## Why it matters

It is a concrete case of the "decomposed task" weakness in refusal-based safety: single
requests are caught, but distributed campaigns need account-level detection. It also
gives rare usage figures for how often people ask a chatbot about elections.
