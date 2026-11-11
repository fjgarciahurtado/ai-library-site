---
title: "Gemini 4 Carbon is now available"
url: https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
archived:
type: article
author: Google
date_published: 2026-11-10
date_added: 2026-11-11
tags: [google, llm, reasoning, coding-agents, security, cost]
topics: [models/gemini]
---

## Summary

Google made Gemini 4 Carbon (`gemini-4-carbon`), its strongest model, generally
available on 2026-11-10. Cyber defenders had it through the Fairwind Program about two
weeks earlier. Carbon is aimed at long, multi-step coding, debugging, and research, and
spends more tokens than Gemini 4 Argon to explore and check its work. Google still
recommends Argon for most everyday engineering and knowledge work. The developer post
(blog.google, "Gemini 4 Carbon is now available for developers"), the Gemini API
changelog, and the model page were read on 2026-11-11 for the API details.

## Key points

- **Where:** Gemini API paid tier (AI Studio, Android Studio), Gemini for business,
  Google Antigravity, and CodeMender; rolling out to Google AI Ultra subscribers in
  Antigravity, the Gemini app, and AI Mode in Search. Scientists can apply for six
  months of free access. A restricted "Carbon for cyber" stays in the Fairwind Program.
  GitHub Copilot added it on 2026-11-10 (Pro+, Max, Business, Enterprise).
- **Price per 1M tokens:** $2 input / $10 output until 2026-11-30 (the same as Argon),
  then $4 / $20.
- **Model page (Stable):** text, image, video, audio, and PDF input; text output; 1M
  tokens shared by input and output; 64K output by default, up to 1M with long decode;
  thinking levels low, medium, high; implicit caching only; computer use, code
  execution, file search, function calling, Search and Maps grounding, structured
  output, URL context; Batch, Flex, and Priority inference. No Live API or audio/image
  output.
- **Benchmarks (Google's figures):** first on CursorBench 4.0, Perplexity WANDR, and
  Zapier AutomationBench at less than half the next model's cost per task; second on
  the new Multimodal Knowledge Agent benchmark. An agentic honesty test: 92% vs 70% for
  Argon.
- **Safety (Google's figures):** blocks 99% of trajectories from an adaptive red-team
  agent (per-attempt breach 0.8% vs 3.1% on Argon); 0% attack success on Gray Swan's
  indirect prompt-injection benchmark, though Google says injection robustness still
  needs work.
- **/swarm** (preview in Antigravity) turns one prompt into a team of agents, with
  Carbon in planning and audit roles and lighter models doing parallel work.

## Why it matters

Carbon is Google's new top model, priced like Argon until the end of November. It is
worth testing on long agentic coding tasks before the price doubles. All benchmark and
safety numbers are vendor claims.
