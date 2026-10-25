---
title: "How we contain Claude across products"
url: https://www.anthropic.com/research/how-we-contain-claude
archived:
type: article
author: Max McGuinness, Mikaela Grace, Jiri De Jonghe, Jake Eaton, Abel Ribbink (Anthropic)
date_published: 2026-05-25
date_added: 2026-10-09
tags: [anthropic, security, agents, coding-agents]
topics: [practices/security, tooling/coding-agents]
---

## Summary

Anthropic's engineering team describes how it isolates Claude in claude.ai, Claude Code,
and Claude Cowork, and which attacks got through. Its model has three layers: the
environment (sandbox), the model's own behaviour, and limits on external content. The
environment is treated as the main defence, because "the deterministic boundary is what
gets hit when everything probabilistic misses".

## Key points

- **claude.ai:** code runs in ephemeral gVisor containers with seccomp filtering on
  Anthropic's servers. Custom proxy components proved weaker than hardened standard
  parts: "the weakest layer is the one you built yourself".
- **Claude Code:** users approved about 93% of permission prompts, so prompts gave little
  protection. OS-level sandboxing (Seatbelt on macOS, bubblewrap on Linux) cut prompts by
  84%; writes are confined to the workspace and network is denied by default. The auto
  mode classifier catches about 83% of overeager actions.
- A real bug: project settings and hooks were parsed before the trust dialog. The fix
  defers all project-local parsing until the user consents.
- **Claude Cowork:** runs code in a full VM, with credentials kept in the host keychain,
  scoped per-session tokens, and an egress allowlist. A malicious workspace file holding
  an attacker's API key could exfiltrate data through the allowed api.anthropic.com
  domain; a proxy in the VM now accepts only the VM's own session token.
- Prompt injection: Claude Opus 4.7 had about 0.1% attack success on single attempts and
  5–6% after 100 adaptive attempts (Gray Swan benchmark).
- MCP servers and connectors are both supply-chain and injection risks; remote tools are
  trusted less than locally auditable ones.
- VM isolation also hides guest activity from endpoint security agents, so logs must be
  exported (for example via OTLP).

## Why it matters

A primary-source case study of layered agent defence, with numbers. It shows that model
robustness alone leaves a measurable failure rate, approval prompts fail through fatigue,
and approved domains can still be exfiltration routes. Published in May 2026; added
while answering an open question on prompt-injection defence.
