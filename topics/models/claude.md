---
title: "Claude (Anthropic)"
tags: [anthropic, llm, reasoning, cost]
related: [models/gpt, models/gemini, tooling/skills, tooling/mcp, tooling/coding-agents]
last_reviewed: 2026-10-18
---

## Overview

Claude is Anthropic's family of models, offered through claude.ai, the Claude API,
Claude Code, and cloud platforms (Amazon Bedrock, Google Vertex AI, Microsoft Foundry,
and Claude Platform on AWS). The lineup has tiers trading capability against price and
speed. Claude is especially strong at coding, agentic work, and long documents.

## Key concepts

- **Tiers:** Fable (most capable), Opus (default flagship), Sonnet (balanced, cheaper),
  Haiku (smallest, fastest). Mythos models run only in restricted programmes.
- **Model IDs:** short aliases such as `claude-opus-5-5`; no date suffix on current models.
- **Adaptive thinking and effort:** thinking is on by default; `output_config.effort`
  controls depth (`low` to `max`). On Fable 5.1 and Opus 5.5 thinking is always on and
  cannot be disabled. Haiku 5.5 accepts `thinking: {type: "disabled"}` at effort `high`
  or below, and Sonnet 5.5 turns off up-front thinking with `{type: "between_tools"}`
  (also at `high` or below). Default effort is `high` on Fable 5.1 and Sonnet 5.5, `medium` on
  Opus 5.5 and Haiku 5.5. Thinking blocks are tied to the model and conversation that produced them
  ("preserved thinking").
- **Tool use:** client tools you run, and server tools Anthropic runs (web search, web
  fetch, code execution, tool search). Fable 5.1, Opus 5.5, and Sonnet 5.5 reject forced
  `tool_choice` (`any` / `tool`).
- **No prefill:** the newest generation no longer accepts a prefilled assistant turn;
  use structured outputs or instructions instead.
- **Prompt caching:** reuse of stable prompt prefixes at a large discount.
- **Batch API:** asynchronous processing at about half price.
- **Structured outputs:** JSON responses guaranteed to match a schema.
- **Agent features:** [Skills](../tooling/skills.md), an [MCP](../tooling/mcp.md)
  connector, memory tool, compaction, and Managed Agents (Anthropic-hosted agent loop
  and sandbox).
- **Refusals:** safety classifiers can end a response with `stop_reason: "refusal"`;
  server-side fallbacks can retry on another model.
- **Cyber access:** cyber safeguards are relaxed for verified security professionals
  through the Cyber Verification Program, which has three tiers (Defense, Red Team,
  Specialized) and covers Opus 5.5, Sonnet 5.5, and Mythos 5.1. On 2026-10-06 it absorbed
  Project Glasswing and became the only route to Claude Mythos 5.1. Anthropic says
  Glasswing partners found over 129,000 verified vulnerabilities from April to July 2026.
  The Cyber Mission (2026-10-08) adds an infrastructure defence programme and a free OSS
  Scanner (see [security](../practices/security.md)).
- **Public sector:** Anthropic committed $150 million over three years to the US Genesis
  Mission (2026-10-08), giving Claude and Claude Code to 15+ federal agencies and several
  hundred research projects. In Singapore (office opened 2026-10-14) an MOU with MDDI
  covers joint model evaluation and testing standards, and regulated customers use
  in-region inference on Amazon Bedrock.
- **Independent evaluators:** METR staff work inside Anthropic with the right to publish
  without approval; see [evals](../practices/evals.md) for the access tiers.

## How to use it

| Need | Model | Price per 1M tokens (input / output) |
|---|---|---|
| Hardest reasoning, long-horizon agents | Claude Fable 5.1 (`claude-fable-5-1`) | $10 / $50 |
| Default for most demanding work | Claude Opus 5.5 (`claude-opus-5-5`) | $4 / $20 |
| Everyday coding, agents, high volume | Claude Sonnet 5.5 (`claude-sonnet-5-5`) | $2 / $10 |
| Classification, extraction, routing, high volume | Claude Haiku 5.5 (`claude-haiku-5-5`) | $0.10 / $0.50 (prompts ≤100K tokens); $0.50 / $2.50 above |

- All four current models have 1M context, 128K output, and a June 2026 knowledge
  cutoff. Haiku 4.5 (200K context, 64K output, $1 / $5) is superseded but still listed
  as Active, with retirement "not sooner than 2026-10-15" and no deprecation notice as of
  2026-10-13. Anthropic gives at least 60 days' notice, so it cannot retire before
  mid-December 2026. Sonnet 4.5 (deprecated 2026-09-30) retires on 2026-11-30; Opus 4.5 is
  active until at least 2026-11-24.
- Haiku 5.5 (released 2026-10-07) is the first Haiku with effort control and supports
  computer and browser use. Anthropic reports 72.4% on OSWorld 2.1 (offline subset) and
  39.2% on Terminal-Bench 4.0. Claude Code 2.1.293 made it the default Haiku.
- Haiku 5.5 is the only current model priced by prompt length; the others bill the full
  1M window at one rate. Cache reads on Opus 5.5 and Sonnet 5.5 cost 5% of input.
- Stream long requests. Use the Models API for live capability data.
- Try lower effort on a strong model before adding a cascade of smaller models.

## Current state

- **2026-10-15:** Anthropic gave six METR staff "employee-like access" (hardware, office,
  internal tools) with the right to publish without approval, apart from redactions in
  three fixed categories. SecureBio is reviewing the CBRN chapter of the August 2026 Risk
  Report; Accenture and Faculty are negotiating broader evaluation work.
- **2026-10-14:** Anthropic reports that Opus 5.5, Sonnet 5.5, and Haiku 5.5 score 99%
  on its political evenhandedness evaluation and refuse fewer political requests. Later
  in October, US Claude.ai users get state-specific official voting information and
  election-night results in the chat (data from Democracy Works). External reviewers
  still flag unsolicited caveats. See [security](../practices/security.md) for misuse
  findings.
- **2026-10-08:** Anthropic published a revised Usage Policy, effective 2026-11-12. It
  adds a section on fake account networks, narrows the elections rules to voter deception
  (personalised campaign targeting is now allowed), spells out weapons, surveillance, and
  law-enforcement limits, and bans sustained cruelty towards models in extreme cases.
- **2026-10-07:** Claude Haiku 5.5 released, completing the 5.5 family (details above).

## Open questions

- Simon Willison reports new monthly API credits for Max and Team subscribers ($100 to
  $500) announced with Haiku 5.5; no Anthropic primary source found on 2026-10-08.
- Simon Willison reported that reasoning cannot be disabled on Haiku 5.5, but Anthropic's
  docs (2026-10-13) say it can at effort `high` or below. He may have tested at `xhigh`
  or `max`; the docs are treated as authoritative here.
- Haiku 4.5 retirement date: not yet announced (checked 2026-10-13). Check the
  deprecations page for a notice.

## Sources

- [Claude models overview](../../sources/2026/10/2026-10-04-claude-models-overview.md)
- [Prompt caching docs](../../sources/2026/10/2026-10-04-claude-prompt-caching-docs.md)
- [Agent Skills overview](../../sources/2026/10/2026-10-04-claude-agent-skills-overview.md)
- [Expanding the Cyber Verification Program](../../sources/2026/10/2026-10-07-anthropic-cyber-verification-program.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
- [Claude API pricing](../../sources/2026/10/2026-10-08-claude-api-pricing-docs.md)
- [2026 Usage Policy update](../../sources/2026/10/2026-10-09-anthropic-usage-policy-2026.md)
- [Introducing the Anthropic Cyber Mission](../../sources/2026/10/2026-10-09-anthropic-cyber-mission.md)
- [Anthropic's Genesis Mission commitment](../../sources/2026/10/2026-10-09-anthropic-genesis-mission.md)
- [Troubleshooting thinking (Claude API docs)](../../sources/2026/10/2026-10-13-claude-thinking-config-by-model.md)
- [Model deprecations (Claude API docs)](../../sources/2026/10/2026-10-13-claude-model-deprecations-page.md)
- [Preparing for the 2026 US midterms](../../sources/2026/10/2026-10-15-anthropic-2026-us-midterms.md)
- [Anthropic opens Singapore office](../../sources/2026/10/2026-10-15-anthropic-singapore-office.md)
- [An update on independent evaluators](../../sources/2026/10/2026-10-16-anthropic-independent-evaluators-update.md)
