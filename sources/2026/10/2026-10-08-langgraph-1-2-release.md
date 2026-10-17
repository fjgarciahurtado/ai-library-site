---
title: "LangGraph 1.2.0 release notes"
url: https://github.com/langchain-ai/langgraph/releases/tag/1.2.0
archived:
type: release
author: LangChain
date_published: 2026-05-12
date_added: 2026-10-08
tags: [frameworks, agents, open-source]
topics: [frameworks/landscape]
---

## Summary

LangGraph 1.2.0 is the latest minor release of LangChain's graph-based agent framework.
It focuses on durability and checkpointing rather than new APIs. PyPI dates it
2026-05-12. Patch releases have followed steadily since; the latest is 1.2.14 on
2026-10-06 (PyPI release history, checked 2026-10-08).

## Key points

- Error handlers can resume durably after the host process crashes.
- New `StateGraph.set_node_defaults()` sets shared configuration for all nodes.
- Delta channels force a full snapshot after a maximum number of supersteps, and the
  SQLite checkpointer can stream through delta channel history.
- Requires langchain-core 1.4.0.
- Later 1.2.x patches: 1.2.12 (2026-09-21) added `response_schema` to `interrupt()`;
  1.2.13 and 1.2.14 (2026-10-05 and 2026-10-06) fixed checkpoint and `update_state`
  bugs with delta channels.
- Dates on GitHub's release pages have been read back as 2024 by the fetch tool used
  for this library; PyPI gives 2026 for the same versions, which fits the version
  sequence. PyPI dates are used here.

## Why it matters

LangGraph's 1.x line is mature and changes slowly: five months of patches without a new
minor version. The work goes into reliability of long-running, resumable agents.
