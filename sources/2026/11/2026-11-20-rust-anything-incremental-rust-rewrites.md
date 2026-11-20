---
title: "rust-anything: incremental Rust rewrites checked against recorded behaviour"
url: https://github.com/erkamyaman/rust-anything
archived:
type: repo
author: Erkam Yaman
date_published: 2026-11-19
date_added: 2026-11-20
tags: [coding-agents, mcp, skills, plugins, cli, open-source]
topics: [tooling/coding-agents, tooling/mcp]
---

## Summary

rust-anything is a CLI, MCP server, and agent skill for porting an application to Rust
one unit at a time. It records what the original code does, generates a Rust crate plus
a bridge so callers keep the same API, and replays every recorded case against the port
before the unit counts as done. It does not translate code itself: your coding agent
writes the Rust, and the tool provides the safety net. MIT licence; release 2.1.0 on
2026-11-19, about 5.5k stars in its first four days (GitHub trends log, 2026-11-20).

## Key points

- **Install:** `cargo install rust-anything` (or `npm install -g rust-anything`, or a
  prebuilt binary from Releases), then `rust-anything setup`. Setup registers the MCP
  server and skill with Claude Code, Codex, Cursor, Gemini CLI and OpenCode, backs up
  each edited config as `<file>.rust-anything.bak`, and `setup --remove` undoes it.
- **Claude Code plugin:** `/plugin install rust-anything --marketplace
  erkamyaman/rust-anything` (the CLI must still be on `PATH`).
- **Workflow:** `record` runs the original on generated and user inputs, `bridge`
  creates the Rust crate and binding, `diff` replays all cases against the port,
  `gate` decides whether a unit is done, and `app lift` produces a pure-Rust app once
  every unit passes.
- **Languages:** TypeScript/JavaScript, Python, C, Go, Ruby, Java and Kotlin; PHP and
  C# only partly (analysis and whole-app record and replay).
- **Good for:** speeding up a hot path or a small CLI or server while proving outputs
  stay the same. The README's speed-ups (for example 19x on Prettier) are self-reported.
- **Caution:** `record` really executes the original code, so anything that writes
  files, touches a database, or calls the network does so once per case. Run it on a
  copy with test data and no production credentials. `setup` edits global agent
  configs.

## Why it matters

It turns "let the agent rewrite this in Rust" from a leap of faith into a test-driven
loop: behaviour is captured first and every unit must replay identically, which is the
missing piece when agents do large ports.
