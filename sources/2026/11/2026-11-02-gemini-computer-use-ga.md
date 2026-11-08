---
title: "Gemini API Computer Use generally available"
url: https://aistudio.google.com/docs/computer-use
archived:
type: docs
author: Google
date_published: 2026-10-30
date_added: 2026-11-02
tags: [google, computer-use, agents, tool-use, safety]
topics: [models/gemini, agents/tool-use]
---

## Summary

The Gemini API changelog for 2026-10-30 says the Computer Use tool is now generally
available in both the Interactions API and the GenerateContent API, with no other
details. The Computer Use docs page describes the tool: the model proposes browser,
desktop, or mobile actions and your own client carries them out.

## Key points

- **Models:** Gemini 4 Argon, Gemini 3.8 Flash (the page's recommendation for computer
  use), Gemini 3.5 Flash-Lite (lower latency and cost), and Gemini 3 Flash Preview.
- **Enable it:** add a `computer_use` tool with an `environment` (browser, desktop, or
  mobile). Python needs `google-genai` 2.7.0 or later. Coordinates come on a 0–999 grid,
  which your client scales to the screen.
- **Actions:** the browser has the widest set (`navigate`, `go_back`, `scroll`,
  `drag_and_drop`, `hotkey`); mobile adds `open_app`, `list_apps`, `long_press`; desktop
  uses OS-level mouse and keyboard. You can exclude predefined functions.
- **Safety:** each call may carry a `safety_decision` (for example
  `require_confirmation`); you must ask the user and acknowledge it in the function
  result. Policies cover payments, sensitive data, communications, account creation, and
  legal terms. Prompt injection detection is opt-in
  (`enable_prompt_injection_detection`) and needs 3.5 Flash-Lite or later.
- Google still advises close supervision, sandboxed environments, and allowlists.
- The docs page itself does not mention GA status or prices (checked 2026-11-02).

## Why it matters

Before this, computer use on Gemini models was a preview feature. GA on Flash and
Flash-Lite makes cheap, client-run browser and desktop automation an option alongside
Claude's computer use and OpenAI's hosted computer use.
