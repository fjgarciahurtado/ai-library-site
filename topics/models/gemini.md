---
title: "Gemini (Google)"
tags: [google, llm, multimodal]
related: [models/claude, models/gpt, models/open-weight]
last_reviewed: 2026-10-15
---

## Overview

Gemini is Google DeepMind's model family, used in the Gemini app, Google products, and
through the Gemini API and Vertex AI. Gemini is natively multimodal (text, images, audio,
video) and known for long context. Google also publishes the open-weight Gemma models
(see [open-weight models](open-weight.md)).

## Key concepts

- **Tiers:** Pro (most capable), Flash (fast workhorse), Flash-Lite (cheapest), plus
  specialised variants such as Flash Cyber.
- **Gemma:** Google's open-weight family, separate from Gemini.
- **Current lineup (as of 2026-10-11):** Gemini 3.8 Flash (GA 2026-09-02) is the newest
  generally available text model, aimed at long-horizon coding, agents, and enterprise
  workflows: 1M input and 64K output tokens, text, image, video, audio, and PDF input,
  thinking levels, and computer use (preview). Gemini 3.1 Pro Preview is the newest Pro.
  The July 2026 release added 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber, with no
  3.5 Pro. Gemini 3.7 Flash (released 2026-08-13) and 3.5 Flash (2026-05-19) were
  deprecated on 2026-10-08; their requests are now routed to 3.8 Flash and 3.6 Flash.
  Gemini 4 Argon (`gemini-4-argon`) is the most capable model: first released to
  cybersecurity partners in the Fairwind Program on 2026-09-30, then publicly on
  2026-10-13 (paid API tier, Gemini app for Pro and Ultra, Antigravity). On the Gemini
  API it is a stable, GA model. It has a 1M-token limit shared by input and output;
  output defaults to 64K tokens per synchronous request, up to 1M with "long decode".
  Thinking levels are low, medium, and high. It supports implicit caching only (no
  explicit caching), and computer use is still a preview feature.
- **Gemini 4 Argon safety:** Google applied its strongest Frontier Safety Framework
  safeguards for cyber and biology (input screening, activation probes, multi-step
  monitoring), and reports 0.7% attack success on Gray Swan's indirect prompt injection
  benchmark. See [security](../practices/security.md).
- **Robotics:** Google pitches Argon itself as a physical reasoning model for robotics
  (87% on ERQA), not a separate robotics model.
- **Voice and speech:** Gemini 3.8 Live (and a Live Extended Thinking variant) from
  2026-09-15; 3.8 Flash TTS and Flash-Lite TTS GA on 2026-09-22.
- **Image models ("Nano Banana"):** Flash-class image generation and editing models.
  The current one is `gemini-nano-banana-2.1` (GA 2026-10-06): panoramic ratios up to
  8:1, 1K–4K output at every ratio, up to 14 reference images.
- **Antigravity:** Google's agent preview (`antigravity-preview-09-2026` since
  2026-09-17) uses PascalCase tool parameters and line-range file edits.

## How to use it

- Flash models are the usual starting point for high-volume work.
- Watch the deprecations page: deprecated Flash models may be routed to a newer model
  automatically, so pinning a model name does not guarantee the same model.
- Use Gemini for heavy video and audio input, where it has long been strong.
- Prices per 1M tokens (input / output, paid tier, as of 2026-10-07; Argon as of
  2026-10-14): 4 Argon $2 / $10 until 2026-11-30, then $4 / $20; 3.8 Flash
  $0.75 / $3.75 (doubling in 2027), 3.5 Flash $1.50 / $9.00 (deprecated 2026-10-08), 3.1 Pro Preview $2 / $12
  ($4 / $18 above 200K), 2.5 Pro $1.25 / $10, 2.5 Flash-Lite $0.10 / $0.40. See
  [cost and caching](../practices/cost-and-caching.md).

## Current state

- **2026-10-15:** The Gemini API model page labels `gemini-4-argon` Stable, and the
  changelog lists it as GA from 2026-10-13. No explicit caching; long decode up to 1M
  output tokens.
- **2026-10-14:** Google DeepMind and Singapore's government announced an on-device scam
  detector built on a fine-tuned Gemma model (not yet released). See
  [open-weight models](open-weight.md).
- **2026-10-13:** Gemini 4 Argon became publicly available on the paid Gemini API at
  introductory prices ($2 / $10, doubling after 2026-11-30). Google claims #1 on the Vals
  Index and 87% on ERQA. Companion posts cover its safety evaluations and robotics uses.

- **2026-10-08:** Gemini 3.7 Flash and 3.5 Flash deprecated, with requests routed
  automatically to 3.8 Flash and 3.6 Flash; no shutdown dates. The Deep Research agent
  `deep-research-pro-preview-12-2025` shuts down on 2026-10-23 (replacements:
  `deep-research-preview-04-2026` or `deep-research-max-preview-04-2026`).
- **2026-10-07:** The pricing page lists Gemini 3.1 Pro Preview as the newest Pro model,
  and Gemini 2.5 Flash-Lite as the only Flash-Lite model with a price. It also lists
  Gemini 3.7 Flash (released 2026-08-13), priced the same as 3.8 Flash.
- **2026-10-06:** Nano Banana 2.1 GA; `gemini-3.1-flash-image` is deprecated, with no
  shutdown date yet.
- **2026-09-30:** Gemini 4 Argon released only to cybersecurity partners.
- **2026-09-18:** Gemini 2.5 models restricted to existing active users; Google directs new
  projects to 3.5 Flash-Lite or 3.8 Flash.
- **2026-09-02:** Gemini 3.8 Flash GA, at introductory prices that double on 2027-01-01.

## Open questions

- Smaller Gemini 4 models (Flash, Flash-Lite) have not been announced (checked
  2026-10-15). Answered on 2026-10-15: Argon itself is Stable and GA on the Gemini API.
  Its status on the Gemini Enterprise Agent Platform (Vertex AI) was not checked.
- Google directs new projects to Gemini 3.5 Flash-Lite, but the pricing page (2026-10-07)
  lists no price for it or for 3.6 Flash.
- Is traffic routed from deprecated 3.5 Flash to 3.6 Flash billed at the 3.6 Flash
  price? Neither the deprecations page nor the changelog says (checked 2026-10-12).
- Nano Banana 2.1 per-image prices were not on its model page on 2026-10-07.

## Sources

- [Gemini 4 Argon](../../sources/2026/10/2026-10-04-gemini-4-argon.md)
- [Three new Gemini models, July 2026](../../sources/2026/10/2026-10-04-gemini-july-2026-models.md)
- [Gemini API changelog, September 2026](../../sources/2026/10/2026-10-06-gemini-api-changelog-september-2026.md)
- [Gemini 3.8 Flash model page and pricing](../../sources/2026/10/2026-10-06-gemini-3-8-flash-model-page.md)
- [Gemini Nano Banana 2.1 model page](../../sources/2026/10/2026-10-07-gemini-nano-banana-2-1.md)
- [Gemini Developer API pricing](../../sources/2026/10/2026-10-07-gemini-api-pricing.md)
- [Gemini API deprecations, October 2026](../../sources/2026/10/2026-10-12-gemini-api-deprecations-october-2026.md)
- [Gemini 4 Argon: Built to solve your hardest problems](../../sources/2026/10/2026-10-14-gemini-4-argon-public-launch.md)
- [Developing Gemini 4 Argon responsibly and safely](../../sources/2026/10/2026-10-14-gemini-4-argon-safety.md)
- [Gemini 4 Argon for Robotics](../../sources/2026/10/2026-10-14-gemini-4-argon-for-robotics.md)
- [Gemini 4 Argon model page](../../sources/2026/10/2026-10-15-gemini-4-argon-model-page.md)
- [On-device scam detection with a fine-tuned Gemma](../../sources/2026/10/2026-10-15-gemma-on-device-scam-detection.md)
