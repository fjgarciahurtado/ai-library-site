---
title: "Gemini API logs and datasets: storage on by default for new projects"
url: https://ai.google.dev/gemini-api/docs/logs-datasets
archived:
type: docs
author: Google
date_published: 2026-10-26
date_added: 2026-10-27
tags: [google, security, deployment]
topics: [models/gemini]
---

## Summary

From 2026-10-26, new paid-tier Gemini API projects store Generate Content API requests by
default (`store=true`), as the Interactions API already did. This covers
`generateContent`, `streamGenerateContent`, and `batchGenerateContent`. Existing projects
keep their current setting, which is off unless logging was turned on in AI Studio. The
Gemini API changelog announced the change on 2026-10-26.

## Key points

- **What is stored:** the prompt, the response, and context from earlier turns. You can
  see the logs on the AI Studio Logs page for the project.
- **Retention:** logs are deleted after 55 days by default. You can choose 7, 14, 28, or
  55 days. Logs saved to a dataset do not expire.
- **Opt out:** pass `store=false` on a request, which overrides the project setting. Or
  turn off Generate Content API logging in the Settings panel of the Logs and Datasets
  dashboard. Generate Content and Interactions logging are set separately.
- **Caveat:** if you turn off Interactions logging, the API can no longer store and
  fetch conversation history for you, unless you turn it back on per request.
- **Scope:** only the paid tier. The page does not mention any charge for logging.
  Sharing datasets with Google is optional. See the "Data logging and sharing" policy.

## Why it matters

If you create a new Gemini project for sensitive data, your prompts and responses are
now kept for 55 days unless you opt out. Check this when setting up new projects.
