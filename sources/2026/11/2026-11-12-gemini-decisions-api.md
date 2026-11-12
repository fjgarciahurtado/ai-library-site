---
title: "Gemini Decisions API: fast, calibrated multimodal decisions"
url: https://blog.google/innovation-and-ai/technology/developers-tools/gemini-decisions-api/
archived:
type: release
author: Google DeepMind (Min Choi, Felix Yu)
date_published: 2026-11-11
date_added: 2026-11-12
tags: [google, structured-output, cost, multimodal]
topics: [models/gemini, practices/cost-and-caching]
---

## Summary

Google released Gemini Decision 1 (`gemini-decision-1`) and the Decisions API on
2026-11-11. Instead of generating text, the model returns probabilities for yes/no,
multiple-choice, and rubric-score questions about a shared input. It charges only for
input tokens. It is Google's counterpart to OpenAI's Decisions API, and unlike OpenAI's
it accepts audio, video, and PDFs as well as text and images. The Gemini API changelog
lists it on the same date with no preview label.

## Key points

- **Decision types:** `noul` (yes/no probability, with optional true/false criteria),
  `choice` (2 to 255 options with normalised probabilities), and `score` (an ordered
  rubric from 0, returning a weighted score and per-level probabilities). Each answer has
  a 0–1 confidence, so code can route uncertain cases to a fallback or a person.
- **Inputs:** text, images, audio, video, and PDFs, up to 256K tokens, with up to 1,000
  questions per request against the same input. The `input` field uses the Interactions
  API content format.
- **Price:** $0.10 per 1M input tokens, no output or thinking charges. The shared input
  is billed once per request; each question adds only its own tokens. A free tier exists
  in AI Studio.
- **Latency (vendor figures):** 150–250 ms end to end, nearly flat from 1 to 100
  questions. Google claims it is about 5x cheaper than Gemini 3.5 Flash-Lite with the
  Interactions API on its own benchmark suite, which is not named.
- **How to call it:** in Python, `genai.Client(http_options={"api_version": "v1beta"})`
  and `client.decisions.create(model="gemini-decision-1", ...)`. Available with an AI
  Studio API key; Google Cloud (Vertex) support is "coming soon".
- **Integrations rolling out:** OpenRouter, LangChain, Vercel AI SDK, LiteLLM, Pydantic
  AI, Pipecat, LiveKit, and OpenCode.
- Simon Willison's test returned graded probabilities (for example 0.92) where OpenAI's
  API returns 1.0 or 0.0 for yes/no questions.

## Why it matters

Routing, tool selection, policy checks, and grading can run on a cheap, fast model that
returns calibrated numbers rather than parsed text. With both OpenAI and Google offering
the same shape of API, such checks are now easy to swap between providers.
