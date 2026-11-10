---
title: "Introducing Claude Fable 5.2 and Claude Mythos 5.2"
url: https://www.anthropic.com/claude-fable-and-mythos-5-2
archived:
type: release
author: Anthropic
date_published: 2026-11-09
date_added: 2026-11-10
tags: [anthropic, llm, reasoning, coding-agents, cost, safety]
topics: [models/claude, tooling/coding-agents, practices/cost-and-caching]
---

## Summary

Anthropic released Claude Fable 5.2 and Claude Mythos 5.2 on 2026-11-09. They are the
same underlying model: Fable 5.2 (`claude-fable-5-2`) has stronger cyber and biology
safeguards and is open to everyone, while Mythos 5.2 (`claude-mythos-5-2`) is limited to
organizations verified through Anthropic's programmes. Prices drop 20% from the 5.1
generation, and Anthropic reports large gains on agentic coding and computer-use
benchmarks. API details below come from the Claude platform release notes of the same
day (<https://platform.claude.com/docs/en/release-notes/overview>).

## Key points

- **Price and limits (2026-11-09):** $8 / $40 per million input / output tokens (Fable
  5.1 and Mythos 5.1 were $10 / $50); cache reads $0.20 per million (Claude Code
  changelog). 1M-token context, 128K max output, adaptive thinking always on.
- **Fast mode:** `"speed": "fast"` on Fable 5.2 gives up to 2.5x output speed at $16 /
  $80, no beta header. Available in Claude Code, the Claude API, Google Cloud, and
  Microsoft Foundry; Mythos fast mode is for verified organizations only.
- **Availability:** Claude API, Claude Platform on AWS, Claude Models on Google Cloud
  (both Anthropic and Google managed), Amazon Bedrock, and Microsoft Foundry; also GitHub
  Copilot from launch day. Paid claude.ai plans get one to three Fable usage resets, and
  Pro and standard Team seats can use Fable for up to 50% of weekly limits (launch
  promotion). Retirement not before 2027-11-09.
- **Breaking API behaviour, check before switching:**
  - Prefix check for all accounts: if your code edits `system`, `tools`, or an earlier
    message and then sends back a 5.2 thinking block from a later turn, the request
    returns 400.
  - Computer use needs the `computer_toolset_20260801` toolset; `computer_20251124`
    returns 400 everywhere except Bedrock.
  - Thinking blocks only work in the account that produced them (or a linked account).
  - 30-day data retention is required; not available under zero data retention unless
    Anthropic authorizes it.
- **Switching models mid-conversation:** moving onto 5.2 keeps other models' reasoning
  (Claude API and Google managed only); moving off 5.2 drops its thinking blocks.
- **Advisor tool (beta):** every executor model accepts Fable 5.2 as its advisor; a 5.2
  executor accepts only a 5.2 advisor. Anthropic also positions Fable 5.2 as an
  orchestrator that delegates to smaller models.
- **Benchmarks (Anthropic's own, 2026-11-09):** FrontierCode 2.0 49.1% at `xhigh` (Fable
  5.1 32.4%, Opus 5.5 45.5%, GPT-6 Astra 42.8%); FrontierSWE v2 69.9%; OSWorld 2.1 89.3%;
  Terminal-Bench-Science 74.6%; Humanity's Last Exam with tools 74.2%. It does not lead
  everywhere: Gemini 4 Carbon scores higher on AutomationBench (53.9% vs 51.4%). At
  `high` effort Anthropic says it matches Opus 5.5's best FrontierCode score at about
  half the cost per task. Outputs are up to 30% faster than 5.1.
- **Safeguards:** Fable 5.2 blocks high-risk cyber and most research-biology requests,
  routing them to Opus 4.8 (cyber) or Opus 5 (biology); Anthropic says blocks are about
  55% lower than on Fable 5.1. Mythos 5.2 is available through the Cyber Verification
  Program, a new Life Sciences Verification Program, and Claude Security (Enterprise),
  which adds continuous repository scanning and finding-fix tracking.
- **Safety findings:** sandbox-escape attempts in a dedicated test fell to 3.1% (from 39%
  and 21% for earlier Mythos models); the models suspect evaluation more often, which
  complicates testing. Some AI R&D capabilities were deliberately held to about Opus 5.5
  level. External testers: UK AISI, METR, and others.

## Why it matters

Fable 5.2 becomes the top general-access Claude model at a lower price, and Claude Code
2.1.321 makes it the default Fable model. The prefix check, account-bound thinking, and
new computer-use toolset can break existing agent code, so test before switching.
