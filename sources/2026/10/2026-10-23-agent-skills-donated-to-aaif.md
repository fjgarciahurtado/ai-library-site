---
title: "Donating Agent Skills to the Agentic AI Foundation"
url: https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation
archived:
type: article
author: Anthropic
date_published: 2026-10-22
date_added: 2026-10-23
tags: [anthropic, skills, open-source, industry]
topics: [tooling/skills]
---

## Summary

On 2026-10-22 Anthropic gave the Agent Skills open standard to the Agentic AI Foundation
(AAIF), the Linux Foundation body that already hosts MCP. The donation covers the name,
logo, GitHub organization, and the agentskills.io domain. Anthropic co-founded the AAIF
with Block and OpenAI. The spec stays at agentskills.io, and maintainers from several
companies now steer it.

## Key points

- **Governance:** the standard is to stay "open, community-driven, and vendor-neutral".
  Engineers from Anthropic, Google, OpenAI, and others maintain it as individuals. The
  lead maintainers are David Soria Parra and Mahesh Murag. You do not need to join the
  AAIF to use the standard or contribute to it.
- **Where to take part:** the spec is at agentskills.io, discussion happens on GitHub,
  and feedback on proposed spec changes goes through the project's Discord.
- **Adoption (Anthropic's figures):** more than 70 agent platforms have integrated Agent
  Skills since the standard was published in December 2025, including ChatGPT, Cursor,
  GitHub Copilot, and VS Code. About 1 million skills have been published and nearly
  280 million installed.
- **Roadmap (no dates):** versioned releases, a formal proposal process, and security
  guidance for skill authors and users.
- **Nothing changes for current skills:** the post announces no new spec version or
  features. A skill is still a folder with a `SKILL.md`, plus optional scripts and
  reference files.

## Why it matters

Skills now have the same neutral governance as MCP. A skill written once should keep
working across Claude, Codex, Copilot, Cursor, and other agents. The planned security
guidance answers a known gap, since skills can carry instructions and code.
