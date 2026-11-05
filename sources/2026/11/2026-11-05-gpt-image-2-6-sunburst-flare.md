---
title: "OpenAI Images 2.6: GPT-Image-2.6 Sunburst and Flare in the API"
url: https://openai.com/index/introducing-images-2-6
archived:
type: release
author: OpenAI
date_published: 2026-11-04
date_added: 2026-11-05
tags: [openai, multimodal, llm]
topics: [models/gpt]
---

## Summary

On 2026-11-04 OpenAI released Images 2.6 across ChatGPT, Codex, and the API. The API
gets two new image models, `gpt-image-2.6-sunburst` and `gpt-image-2.6-flare`, on
`v1/images/generations` and `v1/images/edits`. The announcement post (the URL above)
returned 403, so this note relies on the 2026-11-04 entry in the
[API changelog](https://developers.openai.com/api/docs/changelog) and the RSS summary of
the announcement.

## Key points

- New in 2.6: adjustable complexity, SVG output, and animated GIF generation.
- Markup-guided editing (draw on the image to show what to change) works with supported
  GPT Image 2.5 and 2.6 models.
- OpenAI's summary also claims faster generation and more precise editing; no figures
  were available.
- Not checked: prices and how Sunburst and Flare differ (likely a quality versus speed
  split, but the changelog does not say).

## Why it matters

SVG and GIF output make the image API usable for icons, diagrams, and small animations
in code projects, and the models are also available inside Codex.
