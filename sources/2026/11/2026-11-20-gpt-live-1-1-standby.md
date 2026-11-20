---
title: "OpenAI API: GPT-Live-1.1 and standby for Live sessions"
url: https://developers.openai.com/api/docs/changelog#2026-11-19-gpt-live-1-1
archived:
type: release
author: OpenAI
date_published: 2026-11-19
date_added: 2026-11-20
tags: [openai, multimodal, cost]
topics: [models/gpt]
---

## Summary

OpenAI's API changelog for 2026-11-19 adds `gpt-live-1.1` for the Live (real-time
voice) API, with better pronunciation, accent consistency, and transcription in
multilingual conversations. It also adds standby for GPT-Live-1 and 1.1 WebRTC
sessions, which pauses inference while nobody is speaking. The changelog entry has no
anchor of its own; the fragment in the URL only distinguishes this note, and the link
opens the changelog page.

## Key points

- Use it by setting `gpt-live-1.1` as the model in an existing `v1/live/sessions`
  configuration.
- **Standby:** for WebRTC sessions on GPT-Live-1 and 1.1, inference pauses during
  inactivity and resumes when someone speaks; see "Configure standby" in the Live
  conversations guide.
- The changelog gives no price change for 1.1.

## Why it matters

Standby should cut the cost of long, mostly idle voice sessions (for example an
assistant left open in a meeting), and 1.1 is a drop-in quality upgrade for
multilingual voice apps.
