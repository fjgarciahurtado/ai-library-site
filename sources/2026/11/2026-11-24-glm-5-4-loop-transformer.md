---
title: "GLM-5.4: Z.ai's first loop transformer (Simon Willison)"
url: https://simonwillison.net/2026/Nov/23/glm-54/
archived:
type: article
author: Simon Willison
date_published: 2026-11-23
date_added: 2026-11-24
tags: [other-provider, transformers, coding-agents]
topics: [fundamentals/transformers, models/open-weight]
---

## Summary

Z.ai released GLM-5.4, which it calls its first looped-transformer model and aims at
coding. This note uses Simon Willison's write-up because the primary announcement
(<https://z.ai/blog/glm-5.4>) returned an empty page to automated reads on 2026-11-24.
GLM-5.4 is not available as open weights so far. It is reachable through Z.ai's Coding
Plan, not the regular API.

## Key points

- **Loop transformer:** Z.ai describes a group of weight-shared layers that runs for
  several iterations, each pass refining the hidden states from the last. This gives a
  deeper network without more parameters.
- Thinking Machines' Inkling 2 Mini (2026-11-20) is also a looped transformer, so this is
  the second such release in a week.
- **Access:** through Z.ai's Coding Plan (<https://docs.z.ai/devpack/overview>), on the
  OpenAI-compatible Responses endpoint at `https://api.z.ai/api/v1`. Simon says there are
  no open weights "(yet?)".
- No benchmarks, prices, or context length are given in the post. Simon's quick tests
  found quality similar to GLM-5.3.
- Simon built an `llm-glm` plugin for his `llm` CLI
  (<https://github.com/simonw/llm-glm>) until `llm-zai` supports 5.4.

## Why it matters

Looped (recurrent-depth) transformers trade parameters for repeated compute per token.
Two labs shipping them in one week suggests the idea has moved from papers to products.
