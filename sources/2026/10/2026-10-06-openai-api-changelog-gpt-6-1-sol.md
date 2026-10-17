---
title: "OpenAI API changelog: GPT-6.1 Sol, Agents API computer use, ultrafast tier"
url: https://developers.openai.com/api/docs/changelog
archived:
type: release
author: OpenAI
date_published: 2026-09-29
date_added: 2026-10-06
tags: [openai, llm, computer-use, agents, cost]
topics: [models/gpt, agents/tool-use]
---

## Summary

OpenAI's API changelog entry for 2026-09-29 confirms the release of GPT-6.1 Sol
(`gpt-6.1-sol`), which OpenAI positions for complex coding and professional work at a
lower cost than GPT-6 Astra. The same day, the Agents API gained hosted computer use, and
GPT-6 Astra gained an "ultrafast" service tier. Later entries add an image-encoding fix
(2026-09-25) and HIPAA compliance setup in organisation settings (2026-10-05).

## Key points

- GPT-6.1 Sol: $2 input, $0.10 cached input, $2.50 cache writes, $10 output per 1M tokens.
  It supports multi-agent work (beta) through the Responses API.
- Agents API computer use: agents work in an OpenAI-hosted browser; the application
  handles website access approvals and sign-in.
- `service_tier: "ultrafast"` on `gpt-6-astra` reduces time between output tokens. It
  supports global processing with US data residency but no EU regional processing.
- 2026-09-25: a bug in image encoding had degraded image understanding in GPT-6 Sol and
  Luna. OpenAI advises rerunning image evals.
- 2026-10-05: administrators can now accept a Business Associate Agreement (HIPAA) in
  API organisation settings.

## Why it matters

This is the primary source for GPT-6.1 Sol, which earlier notes only recorded as
reported. Hosted computer use in the Agents API moves browser automation from the client
side to an OpenAI-run environment.
