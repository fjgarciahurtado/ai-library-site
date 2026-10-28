---
title: "BeautifulRust: agent skills for idiomatic Rust"
url: https://github.com/morganlinton/BeautifulRust
archived:
type: repo
author: Morgan Linton
date_published: 2026-10-23
date_added: 2026-10-28
tags: [skills, plugins, coding-agents]
topics: [tooling/skills]
---

## Summary

BeautifulRust is an MIT-licensed set of three Agent Skills and a clippy configuration
that teach coding agents to write, review, and port idiomatic Rust. It installs as a
Claude Code plugin or as plain skill folders for Codex and other agents. It appeared on
GitHub around 2026-10-23 and had about 1,300 stars five days later (the publish date is
estimated from that).

## Key points

- **Skills:** `rust-best-practices` loads when the agent writes or changes Rust;
  `rust-review` reviews a file, crate, or diff and gives a prioritised report where each
  finding cites its rule and shows a fix; `rust-port` ports C, C++, Python, Go, or
  JavaScript to Rust, porting the original tests first.
- **Lints:** a drop-in clippy config in `lints/` enforces the machine-checkable rules
  in CI. There is also a Bevy reference.
- **Install in Claude Code:** `/plugin marketplace add morganlinton/BeautifulRust`, then
  `/plugin install beautiful-rust@beautiful-rust`.
- **Install in Codex:** clone the repo and copy `skills/rust-*` into `~/.agents/skills/`
  (or `.agents/skills/` in a project), or run `npx skills add morganlinton/BeautifulRust -a codex`.
- **Author's benchmark:** pass rate rose from 72/85 to 80/85 with Claude Code and from
  53/85 to 76/85 with Codex CLI. These were single runs graded by a Claude model, so
  treat them as indicative.

## Why it matters

It is a good example of a narrow, testable skill pack: the review skill gives cited
findings, and the clippy config backs the same rules up in CI.
