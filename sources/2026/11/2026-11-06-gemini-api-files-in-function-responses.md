---
title: "Gemini API changelog, 2026-11-05: Omni 1.2 Flash GA, richer function responses"
url: https://aistudio.google.com/docs/changelog#2026-11-05
archived:
type: release
author: Google
date_published: 2026-11-05
date_added: 2026-11-06
tags: [google, tool-use, multimodal]
topics: [models/gemini]
---

## Summary

The Gemini API changelog for 2026-11-05 has three changes. Tools can now return Office and
OpenDocument files, audio, and video to the model in function responses; the API accepts
more document formats as input; and the video model Gemini Omni 1.2 Flash is generally
available, with Omni 1.1 Flash requests redirected to it from 2026-12-03.

## Key points

- **Richer function responses:** a tool result can include Office or OpenDocument files,
  audio, or video (inline or as file URIs), in both the GenerateContent and Interactions
  APIs. An agent's tool can hand back, say, a generated spreadsheet or a recording for the
  model to read directly.
- **More input formats:** PPT, ODP, and ODS are accepted. DOC, PPT, and ODP are processed
  as page images; for ODS the model receives the data and formulas of the first sheet.
- **Gemini Omni 1.2 Flash GA** (`gemini-omni-1.2-flash`): video up to 15 seconds,
  conversational editing, better subject consistency across up to six reference images,
  30% lower video output price, and doubled paid-tier rate limits.
- **Migration:** from 2026-12-03, calls to `gemini-omni-1.1-flash` are routed to 1.2 Flash
  and billed at its rates.

## Why it matters

Multimodal tool results remove a common workaround (upload a file, then reference it) when
agent tools produce documents or media.
