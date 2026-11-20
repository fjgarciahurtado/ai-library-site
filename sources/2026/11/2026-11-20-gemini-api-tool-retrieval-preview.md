---
title: "Gemini API: tool retrieval (preview) and Genie 4 GA"
url: https://aistudio.google.com/docs/changelog#11-19-2026
archived:
type: release
author: Google
date_published: 2026-11-19
date_added: 2026-11-20
tags: [google, tool-use, mcp, multimodal, cost]
topics: [agents/tool-use, models/gemini]
---

## Summary

The Gemini API changelog entry for 2026-11-19 adds tool retrieval in preview: the
Interactions API can search a tool library and load function schemas only when needed,
as Anthropic's tool search already does. The same entry makes Genie 4, the real-time
interactive world model, generally available. The old changelog URL on ai.google.dev
now redirects to AI Studio's docs.

## Key points

- **Tool retrieval (preview):** mark tools with `defer_loading: true` and add a
  `{"type": "tool_search"}` tool; the model then searches for and loads schemas on
  demand instead of receiving the whole catalogue each request. Set
  `execution: "client"` to run your own retrieval logic instead.
- Remote MCP servers also accept `defer_loading`, so large MCP tool sets can be
  attached without flooding the context.
- Works with Gemini 3.6 and later, including all Gemini 4 models.
- **Genie 4 GA (`models/genie-4`):** on the Interactions API (`v1beta`), streams
  steerable 24 fps 16:9 video with 48 kHz stereo audio over WebRTC or WebSockets.
  Worlds start from text, a reference image, or both, and are steered with WASD or
  arrow keys and text events.
- **Genie 4 paid-tier prices (2026-11-19):** $1.50 per 1M input tokens, $9.00 per 1M
  text output tokens, $17.50 per 1M video output tokens (about $0.10 per second of
  video, audio included).

## Why it matters

Deferred tool loading is now available from Anthropic and Google with near-identical
semantics, which makes it the default answer for agents with hundreds of tools or many
MCP servers.
