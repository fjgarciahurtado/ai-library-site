---
title: "Claude (Anthropic)"
tags: [anthropic, llm, reasoning, cost]
related: [models/gpt, models/gemini, tooling/skills, tooling/mcp, tooling/coding-agents]
last_reviewed: 2026-11-11
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
  controls depth (`low` to `max`). On Fable 5.2, Fable 5.1, and Opus 5.5 thinking is always on and
  cannot be disabled. Haiku 5.5 accepts `thinking: {type: "disabled"}` at effort `high`
  or below, and Sonnet 5.5 turns off up-front thinking with `{type: "between_tools"}`
  (also at `high` or below). Default effort is `high` on Fable 5.1 and Sonnet 5.5, `medium` on
  Opus 5.5 and Haiku 5.5. Thinking blocks are tied to the model and conversation that produced them
  ("preserved thinking"). Since 2026-11-09, preserved thinking applies to all API
  accounts: 5.2 thinking blocks work only in the account that produced them, and sending
  one back after editing `system`, `tools`, or an earlier message returns 400 (the
  "prefix check").
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
  Claude 4.7 and later. `2023-06-01` has no retirement date (checked 2026-10-22). In
  Claude Code, `/claude-api api-version` (2.1.307) helps migrate code; check code and
  gateways for the new Bearer key header before upgrading.
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
- **Text watermark:** nearly every current Claude model watermarks its text. On
  first-party surfaces (API, Claude apps, Claude Code, Cowork) that covers Fable 5 to
  5.2, Mythos 5 to 5.2, Opus 4.5 to 5.5, Sonnet 4.5 to 5.5, and Haiku 4.5 and 5.5; on
  AWS, Google Cloud, and Foundry the 4.5 and Opus 4.6 models are not marked (Help Center,
  read 2026-11-10). The 2026-11-03 release note covered the last three models to join
  (Mythos 5, Opus 4.7, Sonnet 4.6). Models launched since 2026-08-02 are marked from
  launch. It adds no tokens or hidden characters and needs no code changes. On Sonnet
  4.6 a non-default `temperature`, `top_p`, or `top_k` may leave output unmarked.
  Detection is a private-preview API for eligible organizations; the free Claude
  Content Checker reads only file Content Credentials (C2PA).
- **Usage Policy:** a revised policy takes effect on 2026-11-12. It adds a section on
  fake account networks, narrows the elections rules to voter deception (personalised
  campaign targeting is now allowed), spells out weapons, surveillance, and
  law-enforcement limits, and bans sustained cruelty towards models in extreme cases.
- **Corporate governance:** the Anthropic Public Benefit Fund (2026-10-18) is an LLC
  holding 5% of Anthropic's shares (subject to stockholder approval), with 2% more
  possible per 50% rise in valuation above an unpublished baseline. The equity would
  otherwise have gone to executive compensation and may not fund lobbying or political
  giving. Anthropic puts the total equity dedicated to the public good at about 20%,
  counting founder and employee pledges.
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
| Hardest reasoning, long-horizon agents | Claude Fable 5.2 (`claude-fable-5-2`) | $8 / $40 |
| Default for most demanding work | Claude Opus 5.5 (`claude-opus-5-5`) | $4 / $20 |
| Everyday coding, agents, high volume | Claude Sonnet 5.5 (`claude-sonnet-5-5`) | $2 / $10 |
| Classification, extraction, routing, high volume | Claude Haiku 5.5 (`claude-haiku-5-5`) | $0.10 / $0.50 (prompts ≤100K tokens); $0.50 / $2.50 above |

- Fable 5.2 (2026-11-09) replaces Fable 5.1 ($10 / $50, still Active) as the top
  general-access model; Mythos 5.2 (`claude-mythos-5-2`) is the same model with fewer
  safeguards, for verified organizations only. Anthropic reports 49.1% on FrontierCode
  2.0 (Opus 5.5: 45.5%) and says Fable 5.2 at `high` effort matches Opus 5.5's best
  score at about half the cost per task (vendor figures). Before switching: it requires
  30-day retention (no ZDR without approval), computer use needs
  `computer_toolset_20260801` (the older `computer_20251124` returns 400 except on
  Bedrock), and the prefix check above applies. Every model accepts Fable 5.2 as an
  advisor (advisor tool, beta). Fast mode costs $16 / $80.
- All four current models have 1M context, 128K output, and a June 2026 knowledge
  cutoff, Fable 5.2 included (reliable knowledge and training data cutoff both June
  2026, per the models overview checked 2026-11-11). Haiku 4.5 (200K context, 64K output, $1 / $5) is superseded but still listed
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
  Microsoft Foundry deployments hosted on Azure. On Opus 5 it is still a research
  preview that needs the `fast-mode-2026-02-01` beta header. On Opus 4.8 it is
  deprecated (2026-10-30) and will be removed on 2026-11-30, after which fast requests to
  `claude-opus-4-8` return an error instead of falling back to standard speed.
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
  `ANTHROPIC_GOOGLE_CLOUD_PROJECT` and `ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID`. Revoking
  IAM access does not stop Managed Agents sessions or scheduled deployments that are
  already running.
- Requests to the Messages and Token Counting APIs can be up to 128 MB on the first-party
  API (raised from 32 MB on 2026-10-28), which matters for large PDFs and images.
- For spend reports per model, workspace, key, or user, use the Usage and Cost Analytics
  API (beta since 2026-10-29); the older Usage and Cost API and the Enterprise usage and
  cost reports are legacy but supported (see
  [cost and caching](../practices/cost-and-caching.md)).
- For long agent loops, try message threads (beta `message-threads-2026-08-12`, since
  2026-11-02): after the first request, send only the new messages with
  `"thread": {"type": "continue", "previous_message_id": ...}`, or use the SDK helper
  `client.beta.messages.thread(...)`. Threads expire 5 minutes after the last request,
  so keep your own copy of the conversation for replay. Prices are unchanged, and
  threads are not ZDR-eligible. They work on the Claude API, Claude Platform on AWS,
  Anthropic-managed Google Cloud, and Microsoft Foundry.
- Stream long requests. Use the Models API for live capability data; since 2026-10-15 it
  also reports whether a model accepts `between_tools` thinking.
- Try lower effort on a strong model before adding a cascade of smaller models.

## Current state

- **2026-11-11:** The models overview confirms a June 2026 knowledge cutoff for Fable
  5.2 and recommends Opus 5.5 as the default starting model, with Fable 5.2 for
  demanding reasoning and long-horizon agent work. Haiku 4.5 is still Active with no
  deprecation notice.

- **2026-11-10:** Claude Fable 5.2 and Mythos 5.2 released (2026-11-09) at $8 / $40,
  20% below 5.1; default Fable model in Claude Code 2.1.321 and available in GitHub
  Copilot. Retirement not before 2027-11-09. Haiku 4.5 still has no deprecation notice
  (checked 2026-11-10).
- **2026-11-03:** Text watermark extended to Mythos 5, Opus 4.7, and Sonnet 4.6; the full
  model list is in Key concepts (checked 2026-11-10).
- **2026-11-02:** Message threads (beta) launched; see How to use it.
- **2026-10-30:** Fast mode on Opus 4.8 is deprecated and will be removed on 2026-11-30;
  move `speed: "fast"` traffic to Opus 5.5. Opus 4.8 itself stays Active (retirement not
  before 2027-05-28). Sonnet 4.5 retires the same day.
- **2026-10-29:** Usage and Cost Analytics API is in beta
  (`analytics-usage-cost-2026-08-24`).
- **2026-10-08:** The revised Usage Policy takes effect on 2026-11-12 (see Key concepts).

## Open questions

- Simon Willison reported that reasoning cannot be disabled on Haiku 5.5, but Anthropic's
  docs (2026-10-13) say it can at effort `high` or below. He may have tested at `xhigh`
  or `max`; the docs are treated as authoritative here.
- Who governs the Public Benefit Fund, and what is the valuation baseline for the extra
  2% grants? Anthropic says it will publish this in the coming months (noted 2026-10-19).
- Haiku 4.5 retirement date: still not announced (checked 2026-11-02). The deprecations
  page lists it as Active with "not sooner than 2026-10-15", a date already past, and
  Haiku 5.5 is not yet named as its replacement. Still unchanged on 2026-11-10.
- Text watermark: answered 2026-11-10 (model list in Key concepts; no public text
  detector, detection API in private preview). Still open: when detection opens up, and
  why Opus 4.6 and the 4.5 models are unmarked on cloud partners.
- Fable 5.2's knowledge cutoff: answered 2026-11-11 (June 2026 on the models overview
  page; see How to use it).
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
- [Usage and Cost Analytics API](../../sources/2026/10/2026-10-30-claude-usage-cost-analytics-api.md)
- [Claude platform release notes: fast mode deprecated on Opus 4.8](../../sources/2026/11/2026-11-02-opus-4-8-fast-mode-deprecated.md)
- [Claude Code release 2.1.316](../../sources/2026/11/2026-11-02-claude-code-2-1-316.md)
- [Claude API message threads (beta)](../../sources/2026/11/2026-11-03-claude-message-threads-beta.md)
- [Claude text watermark](../../sources/2026/11/2026-11-04-claude-text-watermark.md)
- [Introducing Claude Fable 5.2 and Claude Mythos 5.2](../../sources/2026/11/2026-11-10-claude-fable-mythos-5-2.md)
- [How Claude marks AI-generated content](../../sources/2026/11/2026-11-10-claude-marks-ai-generated-content.md)
