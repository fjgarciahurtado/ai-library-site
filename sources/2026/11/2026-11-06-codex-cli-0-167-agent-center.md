---
title: "Codex CLI 0.167.0"
url: https://github.com/openai/codex/releases/tag/rust-v0.167.0
archived:
type: release
author: OpenAI
date_published: 2026-11-06
date_added: 2026-11-06
tags: [openai, coding-agents, cli]
topics: [tooling/coding-agents]
---

## Summary

Codex CLI 0.167.0 was released on 2026-11-06. It adds an agent command center that can run
without the background daemon, backend switching from the session picker, image previews
while composing, more sign-in options including a Vertex AI setup wizard, opt-in system
proxy support, and expandable patch details during approval.

## Key points

- **Agent command center:** `codex agents --no-daemon` opens it without the daemon; it and
  the session picker mark sessions with unread results.
- **Backend switching:** switch between connected backends from the terminal session
  picker without losing your draft.
- **Images:** local image attachments preview while you type (on supported terminals);
  images Codex viewed open from clickable paths in the transcript.
- **Sign-in:** API key and cloud provider options are under "Sign in another way"; the
  `gcp_setup_wizard` flag walks through Google Cloud Vertex AI setup (Vertex support
  arrived in 0.165).
- **Proxy:** opt into macOS or Windows system proxy settings from `/experimental`.
- **Approvals:** expand a patch's details in the transcript while the approval prompt is
  open, so you can read the full change before saying yes.
- Upgrade with your usual install method (for example `npm i -g @openai/codex`).

## Why it matters

Small but practical changes for people running several Codex sessions at once: unread
markers and a daemon-free command center make parallel work easier to track.
