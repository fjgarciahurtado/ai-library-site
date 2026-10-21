---
title: "Voxtral 3"
url: https://mistral.ai/news/voxtral-3/
archived:
type: release
author: Mistral AI
date_published: 2026-10-20
date_added: 2026-10-21
tags: [mistral, multimodal, agents]
topics: [models/open-weight]
---

## Summary

Mistral released Voxtral 3, a family of speech models for voice agents: two batch
transcription models, a realtime transcription model, a text-to-speech model, and a
Voice Agent SDK built on LiveKit. The post has no explicit date. Mistral's news index
lists it on 2026-10-20, and its benchmarks were generated that day. The post does not
say whether the weights are open, but it offers self-hosting.

## Key points

- **Models (documentation slugs, likely the API ids):** `voxtral-small-transcribe-3-0`,
  `voxtral-mini-transcribe-3-0` (4B), `voxtral-mini-transcribe-realtime-3-0` (under
  500 ms latency), and `voxtral-mini-tts-3-0`.
- **Transcription:** diarization, keyword biasing, and end-of-turn detection. Batch
  covers 50+ languages and realtime 35+ (the post also says 40+ in one place).
- **TTS:** emotion, pacing, and emphasis control, and voice cloning from about 30 minutes
  of audio. It covers 35+ languages and 50+ dialects.
- **Voice Agent SDK:** chains transcription, an LLM, and TTS with function calling, web
  search, and retrieval. It supports SIP telephony and WebRTC.
- **Prices (2026-10-20):** batch transcription $0.0035/min (Mini) and $0.004/min (Small);
  realtime $0.008/min; TTS $13 per 1M characters; voice agent API $0.04/min with Mistral
  Small 4.
- **Benchmarks (self-reported):** about 4.1% WER on FLEURS for Small, against about 16%
  for Whisper large-v3. Mistral says it beats Scribe v2 and Gemini 3.5 Transcribe.
- **Availability:** Mistral API (EU, US, and global endpoints), Studio playgrounds, and
  self-hosting. Contact Mistral for on-premises deployment.

## Why it matters

It is a full European voice-agent stack at low per-minute prices, and its transcription
is a strong alternative to Whisper. It is unclear whether the weights are open as
Voxtral 1 (Apache 2.0) was; this is noted as an open question.
