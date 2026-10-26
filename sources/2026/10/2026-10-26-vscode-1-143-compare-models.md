---
title: "VS Code 1.143: compare model results and the Copilot harness by default"
url: https://code.visualstudio.com/updates/v1_143
archived:
type: release
author: Microsoft
date_published: 2026-10-22
date_added: 2026-10-26
tags: [coding-agents, ide, plugins, multi-agent, open-source]
topics: [tooling/coding-agents]
---

## Summary

Visual Studio Code 1.143 (with patch 1.143.1) was released on 2026-10-22. The release
notes give no date; it comes from the `microsoft/vscode` release feed. It makes the
Copilot harness the default for new agent sessions and adds a preview that runs one task
with several models and then compares or combines the results. It also has experimental
on-device models, auto-install of plugins required by an organization, and many changes
to the Agents window.

## Key points

- **Compare model results (preview):** in the Agents window, run the same task with
  several models or harnesses at once. Each attempt gets its own session. An optional
  Judge model scores the attempts and recommends one, and **Synthesize** combines ideas
  from them. Enable it with `sessions.chat.compareAgents.enabled`.
- **Copilot harness by default:** new sessions use the Copilot harness, built on the
  Copilot SDK and run through the Agent Host. Sessions can keep running in the background
  and be opened from both the editor and the Agents window.
- **On-device model (experimental):** MAI Code 1.1 Flash can run locally for Copilot
  harness sessions, and these runs use no AI credits. It needs GitHub sign-in, a
  compatible llama.cpp build, and an NVIDIA GPU with at least 96 GB of memory. Set
  `chat.copilot.localModel.llamaServerPath` and `chat.copilot.localModel.enabled`.
- **Managed plugins:** administrators can require agent plugins with `enabledPlugins` in
  managed settings (for example `"my-plugin@my-marketplace": true`). Sessions then
  install or update them automatically, for that session only.
- **Session tools:** discard changes per branch, session, or last turn. An experimental
  command removes inactive agent worktrees to free disk space. Detached background shells
  get output and stop controls. Sandboxing can be toggled per session where policy allows
  it. Long chats open much faster.
- **MCP:** chat no longer waits as long for MCP servers that never finish loading their
  tools.
- **Install:** the GitHub Copilot CLI can now be installed through the VS Code installer.

## Why it matters

Running several models on the same task and having a judge pick or merge the results is
now built into a mainstream editor. Before, people did this by hand with worktrees.
Organizations can now push required agent plugins to every developer.
