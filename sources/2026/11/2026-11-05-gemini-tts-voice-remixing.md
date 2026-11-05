---
title: "Voice remixing for Gemini 3.8 TTS"
url: https://aistudio.google.com/docs/changelog#voice-remixing-2026-11-04
archived:
type: release
author: Google
date_published: 2026-11-04
date_added: 2026-11-05
tags: [google, multimodal]
topics: [models/gemini]
---

## Summary

The Gemini API changelog entry of 2026-11-04 adds voice remixing to Gemini 3.8 TTS: you
take a prebuilt or designed voice and change it with natural-language instructions. The
result is saved as a new, independent voice that you can use for speech synthesis.

## Key points

- Create a remix with `POST /v1beta/voices` using `gemini-3.8-flash-tts`, or interactively
  in Google AI Studio. Either way you get back a `voice_...` ID.
- Use the ID with Gemini 3.8 Flash TTS or Gemini 3.8 Flash-Lite TTS.
- The changelog points to a "Voice remixing" guide for details; pricing and limits were
  not checked.

## Why it matters

Custom voices no longer need audio samples: describing the change is enough, which makes
consistent narration voices easy to set up for apps and agents.
