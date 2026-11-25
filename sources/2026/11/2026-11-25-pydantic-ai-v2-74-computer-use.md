---
title: "Pydantic AI v2.74.0: computer use and CDP browser"
url: https://github.com/pydantic/pydantic-ai/releases/tag/v2.74.0
archived:
type: release
author: Pydantic
date_published: 2026-11-24
date_added: 2026-11-25
tags: [frameworks, computer-use, agents, security]
topics: [frameworks/landscape]
---

## Summary

Pydantic AI v2.74.0 (2026-11-24) adds a provider-neutral computer-use tool and a
browser capability that drives Chrome over the DevTools Protocol. It also fixes six
medium-severity security advisories, four of them in the Playwright browser capability.
This note is based on the release notes only.

## Key points

- **Computer use:** a new `pydantic_ai.computer_use` module with a `ComputerTool`
  contract, and a Harness `ComputerUse()` capability. Several sandboxes gain a
  `desktop=True` option to provide a screen to control.
- **Native tools per provider:** the computer tool maps to OpenAI's native computer tool
  (GPT-5.4 and later) and to Anthropic's and Google's computer-use tools, so the same
  agent code works across the three.
- **`CDPBrowser`:** a Harness capability that controls a browser through the Chrome
  DevTools Protocol.
- **Security fixes:** four advisories in `PlaywrightBrowser`, one trace leak in the
  ElevenLabs integration, and one in online-evaluation baggage. Upgrade if you use
  these. A separate v1.107.11 patches pydantic-evals on the 1.x line
  (GHSA-7xcv-6766-v6v5).
- Requests to `claude-opus-4-5` now raise `DeprecatedModelWarning`; the minimum
  `openai` package version is 3.50.0.
- Upgrade with `pip install -U pydantic-ai`.

## Why it matters

It is one of the first general agent frameworks to wrap all three major providers'
computer-use tools behind one interface, which makes GUI agents portable between
models.
