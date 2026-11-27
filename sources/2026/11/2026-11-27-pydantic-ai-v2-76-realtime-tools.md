---
title: "Pydantic AI v2.76.0: mid-session tool updates and Code Mode final output"
url: https://github.com/pydantic/pydantic-ai/releases/tag/v2.76.0
archived:
type: release
author: Pydantic
date_published: 2026-11-26
date_added: 2026-11-27
tags: [frameworks, agents, computer-use, sdk]
topics: [frameworks/landscape]
---

## Summary

Pydantic AI v2.76.0 (2026-11-26) lets realtime voice sessions change their tool set
without reconnecting, lets Code Mode scripts return the run's final output, and adds
stateless support for Google's Interactions API. It also brings desktop computer-use
sandboxes to Pax. This note is based on the release notes only.

## Key points

- **Realtime tool updates:** models whose profile sets
  `RealtimeModelProfile.supports_tool_updates` accept a new `UpdateTools` input to add or
  remove tools mid-session.
- **Code Mode output:** `CodeMode(allow_final_output=True)` lets sandboxed code submit
  the agent's final result directly, saving a round trip through the model.
- **Google:** `GoogleInteractionsModel` gains stateless Interactions support.
- **UI control:** a per-tool `ui_visibility` setting keeps chosen tool results out of
  the client in UI adapters.
- **Pax:** `/computer-use` desktop sandboxes, clickable `StatusLink` plugin segments,
  and a `pydantic-ai-pax` extra that installs every provider.
- **Tracing:** nested agent spans record `pydantic_ai.root_conversation_id`.
- **Check before upgrading:** `UpdateTools` breaks exhaustive `assert_never` matches on
  `RealtimeInput`; `gemini-2.5-pro` and `gemini-2.5-flash` now raise
  `DeprecatedModelWarning`; `FileSystem.read_file` offsets are now 1-indexed.
- Upgrade with `pip install -U pydantic-ai`.

## Why it matters

Changing tools mid-session matters for voice agents that move between tasks, and letting
Code Mode return output directly makes code-execution agents cheaper. Both continue
Pydantic AI's fast weekly cadence.
