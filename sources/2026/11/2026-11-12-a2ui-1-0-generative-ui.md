---
title: "A2UI 1.0: Build delightful, fast, reliable, agentic experiences"
url: https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/
archived:
type: release
author: Google
date_published: 2026-11-11
date_added: 2026-11-12
tags: [frameworks, agents, google, sdk]
topics: [frameworks/landscape]
---

## Summary

A2UI, an open protocol for agents to answer with interactive UI instead of text, reached
a stable 1.0 on 2026-11-11. The agent describes a view (a form, a confirmation dialog, a
chart), and each app renders it with its own native components; only components the
developer has registered can appear. Version 1.0 adds bidirectional function calls,
accessibility support, and extensions.

## Key points

- **Renderers:** React, Angular, and Lit for the web (`@a2ui/react`, `@a2ui/angular`,
  `@a2ui/lit`), Flutter (`a2ui_flutter`), SwiftUI, and Jetpack Compose (still v0.9.1,
  1.0 "coming soon"). The web and Flutter renderers also work inside MCP Apps.
- **Agent SDKs:** TypeScript (`@a2ui/agent`), Python, and Dart, which help generate
  skills, translate messages, and correct errors. Python adds A2UI Macros for component
  expansion and data binding.
- **Bidirectional function calls:** a rendered component can call back to the agent,
  for example to check availability while the user picks a slot.
- **Upgrading from 0.9:** follow the evolution guide in the repo
  (`specification/v1_0/docs`). Docs and quickstart are at a2ui.org; the repo is
  github.com/a2ui-project/a2ui.
- The post does not state the licence or how A2UI relates to ADK or A2A beyond MCP Apps;
  the Python and Dart package links on the page point to the same PyPI package, so check
  package names before installing.

## Why it matters

Generative UI lets agents collect structured input and show results without free text.
Because the client controls the component catalogue, it avoids running agent-written
HTML or code in the app.
