---
title: "Gemini (Google)"
tags: [google, llm, multimodal]
related: [models/claude, models/gpt, models/open-weight]
last_reviewed: 2026-11-09
---

## Overview

Gemini is Google DeepMind's model family, used in the Gemini app, Google products, and
through the Gemini API and Vertex AI. Gemini is natively multimodal (text, images, audio,
video) and known for long context. Its most capable model is Gemini 4 Argon (public since
2026-10-13). Google also publishes the open-weight Gemma models (see
[open-weight models](open-weight.md)).

## Key concepts

- **Tiers:** Pro (most capable), Flash (fast workhorse), Flash-Lite (cheapest), plus
  specialised variants such as Flash Cyber.
- **Gemma:** Google's open-weight family, separate from Gemini. A fine-tuned Gemma
  powers an on-device scam detector built with Singapore's government (2026-10-14, not
  released; see [open-weight models](open-weight.md)).
- **Current lineup (as of 2026-10-18):**
  - *Gemini 4 Argon* (`gemini-4-argon`) is the most capable model (see below).
  - *Gemini 3.8 Flash* (GA 2026-09-02) is the newest generally available Flash model,
    aimed at long-horizon coding, agents, and enterprise workflows: 1M input and 64K
    output tokens, text, image, video, audio, and PDF input, thinking levels, and
    computer use (GA since 2026-10-30).
  - *Gemini 3.1 Pro Preview* is the newest 3.x Pro model on the pricing page
    (2026-10-07).
  - The July 2026 release added 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber, with no
    3.5 Pro.
  - *Deprecated on 2026-10-08:* Gemini 3.7 Flash (released 2026-08-13) and 3.5 Flash
    (2026-05-19). Their requests are now routed to 3.8 Flash and 3.6 Flash, and no
    shutdown dates are set. The Deep Research agent
    `deep-research-pro-preview-12-2025` shut down on 2026-10-23; use
    `deep-research-preview-04-2026` or `deep-research-max-preview-04-2026`.
  - *Gemini 2.5:* since 2026-09-18, only existing active users can use it. 2.5 Pro and
    2.5 Flash were deprecated on 2026-11-02. From 2026-12-01 their requests are routed
    to 3.8 Flash and 3.5 Flash-Lite and billed at those models' rates. Expect breaking
    changes when that happens: `thinking_level` replaces `thinking_budget`, sampling
    parameters are removed, and prefilled model turns are not accepted.
  - *Gemini Omni 1.2 Flash* (`gemini-omni-1.2-flash`, GA 2026-11-05) is the current
    Omni model: 15-second video, 30% cheaper video output than 1.1, and doubled paid
    rate limits. Calls to `gemini-omni-1.1-flash` route to it from 2026-12-03.
- **Gemini 4 Argon:** first released to cybersecurity partners in the Fairwind Program on
  2026-09-30, then publicly on 2026-10-13 (paid API tier, Gemini app for Pro and Ultra
  subscribers, Antigravity). On the Gemini API it is a Stable, GA model (model page
  checked 2026-10-15). It is also GA on the Gemini Enterprise Agent Platform (Vertex AI)
  since 2026-10-13, in `global`, `us`, `eu`, `europe-west2`, and `asia-southeast1`, with
  retirement there "October 13, 2027 or later". Input and output
  share a 1M-token limit. Output defaults to 64K tokens per synchronous request and goes
  up to 1M with "long decode". Thinking levels are low, medium, and high. It supports
  implicit caching only (no explicit caching). Computer use was a preview feature at
  launch and is GA since 2026-10-30 (not on the Cyber Permissive variant). Google claims
  #1 on the Vals Index (a vendor claim, not independently checked).
- **Gemini 4 Argon safety:** Google applied its strongest Frontier Safety Framework
  safeguards for cyber and biology (input screening, activation probes, multi-step
  monitoring), and reports 0.7% attack success on Gray Swan's indirect prompt injection
  benchmark. See [security](../practices/security.md).
- **Robotics:** Google pitches Argon itself as a physical reasoning model for robotics
  (87% on ERQA), not a separate robotics model.
- **Voice and speech:** Gemini 3.8 Live (and a Live Extended Thinking variant) from
  2026-09-15; 3.8 Flash TTS and Flash-Lite TTS GA on 2026-09-22. Since 2026-11-04,
  voice remixing changes a prebuilt or designed voice with natural-language instructions
  (`POST /v1beta/voices` with `gemini-3.8-flash-tts`, or in AI Studio) and returns a
  reusable `voice_...` ID for both TTS models.
- **Image models ("Nano Banana"):** Flash-class image generation and editing models.
  The current one is `gemini-nano-banana-2.1` (GA 2026-10-06): panoramic ratios up to
  8:1, 1K–4K output at every ratio, up to 14 reference images. Its predecessor
  `gemini-3.1-flash-image` is deprecated, with no shutdown date yet.
- **Antigravity:** Google's agent preview (`antigravity-preview-09-2026` since
  2026-09-17) uses PascalCase tool parameters and line-range file edits.

## How to use it

- The Gemini API docs moved from ai.google.dev to aistudio.google.com/docs, and the
  Vertex AI docs now live under "Gemini Enterprise Agent Platform" on
  docs.cloud.google.com (old addresses redirect; noticed 2026-11-02 and 2026-11-08).
- Flash models are the usual starting point for high-volume work.
- Watch the deprecations page: deprecated Flash models may be routed to a newer model
  automatically, so pinning a model name does not guarantee the same model.
- Use Gemini for heavy video and audio input, where it has long been strong.
- Prices per 1M tokens (input / output, paid tier, as of 2026-10-07; Argon as of
  2026-10-14): 4 Argon $2 / $10 until 2026-11-30, then $4 / $20; 3.8 Flash
  $0.75 / $3.75 (doubling on 2027-01-01; 3.7 Flash was priced the same), 3.5 Flash
  $1.50 / $9.00 (deprecated; no longer on the pricing page on 2026-11-03), 3.1 Pro
  Preview $2 / $12 ($4 / $18 above 200K), 2.5 Pro $1.25 / $10 (until it is routed to
  3.8 Flash on 2026-12-01), 2.5 Flash-Lite $0.10 / $0.40. Added on 2026-10-26 from the page updated
  2026-10-22: 3.6 Flash $0.75 / $3.75 (the same as 3.8 Flash, including the doubling),
  3.5 Flash-Lite $0.30 / $2.50, and 3.1 Flash-Lite $0.25 / $1.50. See
  [cost and caching](../practices/cost-and-caching.md).
- Data retention: new paid-tier projects created on or after 2026-10-26 log Generate
  Content API requests by default (`store=true`), and keep them for 55 days unless you
  choose 7, 14, or 28. Send `store=false` per request, or turn logging off in the Logs
  and Datasets settings, for sensitive data. Older projects keep their setting.
- From the shell or a coding agent: the `gemini-api` CLI (open-source beta since
  2026-10-27) wraps the Interactions API. `gemini-api configure --api-key ...`, then
  for example `gemini-api analyze -i report.pdf "Summarise"` or `gemini-api agent run
  "..." --agent deep-research-preview-04-2026 --background --stream=false`. Use
  `-o json` and `--dry-run` from agents, and pin a version in CI. It is separate from
  Gemini CLI, the coding agent, which since 0.66.0 (2026-10-27) warns that it is not yet
  optimised for Gemini 4.
- Function calling: since 2026-11-05, function responses can carry Office and
  OpenDocument files, audio, and video (inline or as file URIs) in GenerateContent and
  the Interactions API. PPT, ODP, and ODS inputs are accepted (ODS: the first sheet's
  data and formulas).
- Computer use: add a `computer_use` tool with an `environment` (browser, desktop, or
  mobile) in the Interactions or GenerateContent API (`google-genai` 2.7.0+). Your
  client runs the actions and must handle `safety_decision` confirmations. Google
  recommends 3.8 Flash; 3.5 Flash-Lite is the cheap, low-latency option. It is billed
  as regular tokens at the model's price and is not on the free tier (pricing page,
  2026-11-03). Turn on `enable_prompt_injection_detection` (off by default). See
  [tool use](../agents/tool-use.md).

## Current state

- **2026-11-09:** `gemini-embedding-2-preview` was deprecated on 2026-11-06. Its requests
  now go to `gemini-embedding-2` at that model's rates. The two share an embedding space,
  so stored vectors stay valid (see [embeddings](../fundamentals/embeddings.md)). The API
  changelog has moved to aistudio.google.com/docs/changelog.
- **2026-11-05:** Omni 1.1 Flash calls start routing to Omni 1.2 Flash on 2026-12-03.
- **2026-11-02:** Gemini 2.5 Pro and 2.5 Flash are routed to 3.8 Flash and 3.5
  Flash-Lite from 2026-12-01, with breaking changes; migrate before then (see Key
  concepts).
- **2026-10-30:** Computer Use is GA on Argon, 3.8 Flash, and 3.5 Flash-Lite; 3 Flash
  stays in preview, and rate limits are not yet published.
- **2026-10-27:** The `gemini-api` CLI is a beta.
- **2026-10-13:** Gemini 4 Argon's introductory prices ($2 / $10) double after
  2026-11-30.

## Open questions

- Smaller Gemini 4 models (Flash, Flash-Lite) have not been announced (checked
  2026-10-15).
- Computer Use GA (2026-10-30): pricing answered on 2026-11-03 (regular tokens at the
  model's price, no free tier). Still open: rate limits, and the docs page still does
  not say GA.
- Is traffic routed from deprecated 3.5 Flash to 3.6 Flash billed at the 3.6 Flash
  price? The deprecations page still does not say (checked 2026-11-03). The 2.5
  notices of 2026-11-02 do say routed traffic is billed at the target's rates, and 3.5
  Flash is no longer on the pricing page, so 3.6 Flash pricing is likely but
  unconfirmed.
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
- [Gemini API logs and datasets: storage on by default](../../sources/2026/10/2026-10-27-gemini-api-logging-default-on.md)
- [Gemini API CLI (gemini-api) beta](../../sources/2026/10/2026-10-28-gemini-api-cli-beta.md)
- [Gemini API Computer Use generally available](../../sources/2026/11/2026-11-02-gemini-computer-use-ga.md)
- [Gemini 4 Argon on Gemini Enterprise Agent Platform](../../sources/2026/11/2026-11-02-gemini-4-argon-vertex-ga.md)
- [Gemini API changelog: Gemini 2.5 Pro and 2.5 Flash deprecated](../../sources/2026/11/2026-11-03-gemini-2-5-pro-flash-deprecation.md)
- [Voice remixing for Gemini 3.8 TTS](../../sources/2026/11/2026-11-05-gemini-tts-voice-remixing.md)
- [Gemini API changelog, 2026-11-05](../../sources/2026/11/2026-11-06-gemini-api-files-in-function-responses.md)
- [Gemini Embedding 2 Preview deprecated](../../sources/2026/11/2026-11-09-gemini-embedding-2-preview-deprecation.md)
