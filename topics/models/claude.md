---
title: "Claude (Anthropic)"
tags: [anthropic, llm, reasoning, cost]
related: [models/gpt, models/gemini, tooling/skills, tooling/mcp, tooling/coding-agents]
last_reviewed: 2026-10-25
---

## Overview

Claude is Anthropic's family of models, offered through claude.ai, the Claude API,
Claude Code, and cloud platforms (Amazon Bedrock, Google Vertex AI, Microsoft Foundry,
Claude Platform on AWS, and, since 2026-10-22, Claude Models on Google Cloud
(Anthropic managed)). The lineup has tiers trading capability against price and
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
- **API versions and sampling:** every request carries an `anthropic-version` header.
  Version `2026-10-21` (the first since `2023-06-01`) removes `temperature`, `top_p`,
  and `top_k`: sending any of them returns 400 on every model. Claude 4.7 and later
  already accepted only the defaults. Steer output with prompting instead. The SDK
  majors released the same day (Python 2.0, TypeScript 1.0, and others) send the new
  version, send keys as `Authorization: Bearer`, and are Apache 2.0 licensed. Other
  breaking changes in `2026-10-21`: a `document` block in an `assistant` message and
  `citations` on `user` text return 400, and Admin and Analytics API fields were renamed
  (API keys report `scope` instead of `workspace_id`). Text Completions is gone from most
  SDKs, and the `ant` CLI drops `--api-key`. On Bedrock the new version works only for
  Claude 4.7 and later. `2023-06-01` has no retirement date (checked 2026-10-22).
- **Prompt caching:** reuse of stable prompt prefixes at a large discount.
- **Batch API:** asynchronous processing at about half price.
- **Structured outputs:** JSON responses guaranteed to match a schema.
- **Agent features:** [Skills](../tooling/skills.md), an [MCP](../tooling/mcp.md)
  connector, memory tool, compaction, and Managed Agents (Anthropic-hosted agent loop
  and sandbox). Anthropic donated the Agent Skills standard to the Agentic AI Foundation
  on 2026-10-22.
- **Platform governance:** inference hooks (GA for Claude Enterprise since 2026-10-20)
  allow or deny every governed prompt server-side (see
  [security](../practices/security.md)). `/v1/user_profiles` lets platforms tag requests
  by end customer, so an enforcement action hits only that customer; profiles show
  `enforcement_status`. Organization webhooks in the Admin API (beta, header
  `webhooks-2026-10-07`) report profile restrictions.
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
- **Independent evaluators:** since 2026-10-15 six METR staff have "employee-like
  access" (hardware, office, internal tools) and can publish without approval, apart
  from redactions in three fixed categories. SecureBio reviews the CBRN chapter of the
  August 2026 Risk Report, and Accenture and Faculty are negotiating broader evaluation
  work. See [evals](../practices/evals.md) for the access tiers.
- **Political neutrality:** Anthropic reports 99% on its political evenhandedness
  evaluation for Opus 5.5, Sonnet 5.5, and Haiku 5.5 (2026-10-14), with fewer refusals of
  political requests; external reviewers still flag unsolicited caveats. US Claude.ai
  users get state-specific voting information and election-night results from Democracy
  Works for the 2026 midterms.

## How to use it

| Need | Model | Price per 1M tokens (input / output) |
|---|---|---|
| Hardest reasoning, long-horizon agents | Claude Fable 5.1 (`claude-fable-5-1`) | $10 / $50 |
| Default for most demanding work | Claude Opus 5.5 (`claude-opus-5-5`) | $4 / $20 |
| Everyday coding, agents, high volume | Claude Sonnet 5.5 (`claude-sonnet-5-5`) | $2 / $10 |
| Classification, extraction, routing, high volume | Claude Haiku 5.5 (`claude-haiku-5-5`) | $0.10 / $0.50 (prompts ≤100K tokens); $0.50 / $2.50 above |

- All four current models have 1M context, 128K output, and a June 2026 knowledge
  cutoff. Haiku 4.5 (200K context, 64K output, $1 / $5) is superseded but still listed
  as Active, with retirement "not sooner than 2026-10-15". That date has passed, but
  there was still no deprecation notice on 2026-10-22. Anthropic gives at least 60 days'
  notice, so it cannot retire before late December 2026. Sonnet 4.5 (deprecated 2026-09-30) retires on 2026-11-30; Opus 4.5 is
  active until at least 2026-11-24.
- Haiku 5.5 (released 2026-10-07) is the first Haiku with effort control and supports
  computer and browser use. Anthropic reports 72.4% on OSWorld 2.1 (offline subset) and
  39.2% on Terminal-Bench 4.0. Claude Code 2.1.293 made it the default Haiku.
- Haiku 5.5 is the only current model priced by prompt length; the others bill the full
  1M window at one rate. Cache reads on Opus 5.5 and Sonnet 5.5 cost 5% of input.
- Fast mode (`speed: "fast"`) is generally available on Opus 5.5 since 2026-10-15, at
  $8 / $40 with up to 2.5x output speed. It needs no beta header or access request, has
  a default fast mode rate limit in the Start, Build, and Scale tiers, and also works on
  Microsoft Foundry deployments hosted on Azure. On Opus 5 and Opus 4.8 it is still a
  research preview that needs the `fast-mode-2026-02-01` beta header.
- Max and Team subscribers get monthly API credits ($100 for Max 5x, $200 for Max 20x,
  up to $500 pooled for Team) for the API, Managed Agents, and the Agent SDK. They do not
  cover Claude Code (as of 2026-10-20; see
  [cost and caching](../practices/cost-and-caching.md)).
- On Google Cloud there are two options. Vertex AI is run by Google. Claude Models on
  Google Cloud (Anthropic managed, since 2026-10-22) is Anthropic's own API reached
  through `claude.googleapis.com`, with Google IAM, Marketplace billing (1 Claude
  Consumption Unit = $0.01), and Cloud Audit Logs. It supports nearly all first-party
  features, including fast mode, skills, and Managed Agents, but not API keys or MCP
  tunnels. Setup creates a new Anthropic organization, so files, skills, and agents do
  not carry over. Python setup: `pip install -U "anthropic[google_cloud]"`, then set
  `ANTHROPIC_GOOGLE_CLOUD_PROJECT` and `ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID`.
- Stream long requests. Use the Models API for live capability data; since 2026-10-15 it
  also reports whether a model accepts `between_tools` thinking.
- Try lower effort on a strong model before adding a cascade of smaller models.

## Current state

- **2026-10-22:** Claude Models on Google Cloud (Anthropic managed) launched, with Opus
  5.5 fast mode from day one (see How to use it). Revoking IAM access does not stop
  Managed Agents sessions or scheduled deployments that are already running.
- **2026-10-21:** API version `2026-10-21` and new major SDK and `ant` CLI versions
  (see API versions and sampling). Claude Code 2.1.307 adds `/claude-api api-version`
  to migrate code; check code and gateways for the new Bearer key header before upgrading.
- **2026-10-18:** Anthropic created the Anthropic Public Benefit Fund, an LLC holding 5%
  of its shares (subject to stockholder approval), with 2% more possible per 50% rise in
  valuation above an unpublished baseline. The equity would otherwise have gone to
  executive compensation and may not fund lobbying or political giving. Anthropic puts
  the total share of equity dedicated to the public good at about 20%, counting founder
  and employee pledges. Governance details are promised "in the coming months".
- **2026-10-08:** Anthropic published a revised Usage Policy, effective 2026-11-12. It
  adds a section on fake account networks, narrows the elections rules to voter deception
  (personalised campaign targeting is now allowed), spells out weapons, surveillance, and
  law-enforcement limits, and bans sustained cruelty towards models in extreme cases.

## Open questions

- Simon Willison reported that reasoning cannot be disabled on Haiku 5.5, but Anthropic's
  docs (2026-10-13) say it can at effort `high` or below. He may have tested at `xhigh`
  or `max`; the docs are treated as authoritative here.
- Who governs the Public Benefit Fund, and what is the valuation baseline for the extra
  2% grants? Anthropic says it will publish this in the coming months (noted 2026-10-19).
- Haiku 4.5 retirement date: still not announced (checked 2026-10-22). The deprecations
  page lists it as Active with "not sooner than 2026-10-15", a date already past, and
  Haiku 5.5 is not yet named as its replacement. Check again in November.
- When will API version `2023-06-01` be retired? The versioning page gives no date
  (checked 2026-10-22).

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
- [Investing in the public benefit](../../sources/2026/10/2026-10-19-anthropic-public-benefit-fund.md)
- [Fast mode (Claude API docs)](../../sources/2026/10/2026-10-20-claude-opus-5-5-fast-mode-ga.md)
- [API credits for Max and Team plans](../../sources/2026/10/2026-10-20-claude-api-credits-max-team.md)
- [Inference hooks (Claude docs)](../../sources/2026/10/2026-10-21-claude-inference-hooks-ga.md)
- [Migrating to API version 2026-10-21](../../sources/2026/10/2026-10-22-claude-api-version-2026-10-21.md)
- [Claude Models on Google Cloud (Anthropic managed)](../../sources/2026/10/2026-10-23-claude-on-google-cloud-anthropic-managed.md)
- [Donating Agent Skills to the Agentic AI Foundation](../../sources/2026/10/2026-10-23-agent-skills-donated-to-aaif.md)
