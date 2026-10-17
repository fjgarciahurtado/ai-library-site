---
title: "crewAI 1.15.0 release notes"
url: https://github.com/crewAIInc/crewAI/releases/tag/1.15.0
archived:
type: release
author: crewAI
date_published: 2026-06-25
date_added: 2026-10-09
tags: [frameworks, multi-agent, open-source]
topics: [frameworks/landscape]
---

## Summary

crewAI 1.15.0 is the first release of the current 1.15 line of the role-based
multi-agent framework. It centres on Flows, crewAI's event-driven workflow layer: flows
can now be declared in configuration files and can contain crews inline. Patch releases
followed every one to two weeks, up to 1.15.26 on 2026-10-08 (dates from PyPI; GitHub's
release page showed wrong years on 2026-10-09).

## Key points

- Declarative flow loading with CLI support; crew definitions can be written inline in
  flow configuration.
- Conversational flows with telemetry and a terminal UI.
- New composite flow actions, such as "each" steps with optional conditions.
- A DMN (Decision Model and Notation) mode for creating and running crews.
- Token usage aggregated across all LLM calls; faster `crewai run` startup.
- Security fixes for credential file permissions, skill archive extraction, and symlinks.
- Later patches added features too: 1.15.24 (2026-10-07) added `crewai eval` with a
  `--models` flag and `llm_overlay` for swapping models, Oracle integrations, and an
  experimental job lifecycle and runner.

## Why it matters

Confirms crewAI's recent direction: from free-form agent "crews" towards declarative,
configurable workflows with evaluation built in, as other frameworks have done. It also
shows that crewAI ships features in patch releases, so the version number says little.
