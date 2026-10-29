---
title: "Ollama v0.40.13: LFM3 on Linux and Windows"
url: https://github.com/ollama/ollama/releases/tag/v0.40.13
archived:
type: release
author: Ollama
date_published: 2026-10-29
date_added: 2026-10-29
tags: [open-source, deployment, other-provider]
topics: [models/open-weight]
---

## Summary

Ollama v0.40.13 (2026-10-29) extends Liquid AI's LFM3 models, including `lfm3-audio`
(text-to-speech) and `lfm3-omni`, to Linux and Windows. In v0.40.12, two days earlier,
they ran on Apple hardware only.

## Key points

- Upgrade Ollama, then `ollama run lfm3` (or `lfm3-vl`, `lfm3-audio`, `lfm3-omni`).
- The release notes are short; the d1 2B decision models built on LFM3 are not
  mentioned, so their Linux and Windows status is unclear.

## Why it matters

The LFM3 small models (1.7B to 2B, 256K context) can now be tried locally on any common
desktop OS, not just Macs.
