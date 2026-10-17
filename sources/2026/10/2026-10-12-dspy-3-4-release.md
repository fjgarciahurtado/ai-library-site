---
title: "DSPy 3.4.0 release notes"
url: https://github.com/stanfordnlp/dspy/releases/tag/3.4.0
archived:
type: release
author: Stanford NLP (DSPy maintainers)
date_published: 2026-09-25
date_added: 2026-10-12
tags: [frameworks, prompting, open-source]
topics: [frameworks/landscape]
---

## Summary

DSPy 3.4.0 (2026-09-25, date from PyPI) is the "LM transition" release of the framework
for programming LLM pipelines and optimising their prompts automatically. It moves model
calls onto a native engine layer (`dspy.lm15`), with LiteLLM as a fallback, and
deprecates the legacy interfaces, which will be removed in 3.5. The 3.x line started
with 3.0.0 on 2025-08-12.

## Key points

- **Native LM engines:** `engine="auto"` prefers native execution and falls back to
  LiteLLM; custom HTTP providers and engines can be registered.
- **Typed decisions (experimental):** through a TypeSafe integration, new output types
  `Noul` (boolean), `Choice`, and `Score` return values with probabilities and
  confidence. `ReAnchor` tunes their thresholds against a metric without changing
  prompts.
- **Agents and code:** async ReActV2 (`acall`); a `LocalInterpreter` subprocess for RLM
  and Flex, explicitly *not* a security sandbox.
- **GEPA optimiser:** a `code_proposer=` hook for custom program-structure proposals
  (Flex, from 3.3, lets GEPA change program structure, not just prompts).
- **Breaking changes:** the 3.3 experimental typed request/response types are removed;
  Pydantic 2.11 is the minimum; native `n` answers now send sequential requests and can
  bill input tokens several times.
- **Deprecated, removed in 3.5:** OpenAI-style `lm(messages=[...])` calls and custom
  `BaseLM.forward()` integrations. No date for 3.5 was given.

## Why it matters

DSPy remains the main framework built around automatic prompt and program optimisation.
This release cuts its dependency on LiteLLM and shows optimisation extending from
prompts to program structure and decision thresholds.
