---
title: "sandbox-mcp: throwaway Windows machines for agents"
url: https://github.com/shanselman/sandbox-mcp
archived:
type: repo
author: Scott Hanselman (shanselman)
date_published: 2026-11-06
date_added: 2026-11-09
tags: [mcp, cli, computer-use, security, open-source]
topics: [tooling/mcp, practices/security]
---

## Summary

sandbox-mcp gives you or an agent a fresh, disposable Windows 11 machine through Windows
Sandbox. It deploys an app, drives its UI, records crashes and evidence, and then throws
the machine away. It has a CLI (`sbx`) and an optional MCP server that share one engine.
It is MIT-licensed, at v1.2.0, and gained about 340 GitHub stars in its first three days
(GitHub trends, 2026-11-09). `date_published` is the approximate date of first
appearance.

## Key points

- **Good for:** checking that an app runs on a clean PC without your dev runtimes,
  testing installers, and opening untrusted files safely ("detonation"). A GUI run takes
  about 40–50 seconds end to end, by the author's measurement.
- **Needs:** Windows 11 24H2 or later, Pro/Enterprise/Education (not Home), with
  virtualization on and at least 4 GB RAM. It does not run on Linux or macOS.
- **Install:** download the portable ZIP from the latest release (it bundles Node.js),
  check its `.sha256`, then run `.\sbx.cmd doctor`. If the feature is off, run
  `Enable-WindowsOptionalFeature -Online -FeatureName Containers-DisposableClientVM -All`
  as admin and restart. Open Windows Sandbox once to install `wsb`. Try
  `.\sbx.cmd run C:\Windows\System32\charmap.exe --open`.
- **MCP:** add a stdio server whose command is the bundled `node.exe` and whose argument
  is `src\server.js` (VS Code `.vscode\mcp.json`; the README shows the Claude Desktop and
  Copilot CLI shapes). Copilot CLI can also install it as a plugin:
  `copilot plugin marketplace add shanselman/sandbox-mcp`.
- **Tools:** `sandbox_run` (boot, deploy, launch, observe, collect, destroy in one call),
  lifecycle tools, file copy and exec, UI tools (`sandbox_screenshot`, `sandbox_click`,
  `sandbox_ui_tree`, `sandbox_ui_action`), recording, `sandbox_install_test`,
  `sandbox_detonate`, and `sandbox_snapshot` / `sandbox_diff` for change tracking.

## Why it matters

Agents get a real, throwaway desktop to test Windows software in, so they can check
their own work end to end without touching the host machine.
