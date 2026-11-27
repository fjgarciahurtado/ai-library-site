---
title: "NestJS agent skills: official skills for the NestJS framework"
url: https://github.com/nestjs/agent-skills
archived:
type: repo
author: NestJS
date_published: 2026-11-20
date_added: 2026-11-27
tags: [skills, plugins, coding-agents, open-source]
topics: [tooling/skills]
---

## Summary

The NestJS organisation publishes six MIT-licensed agent skills for building NestJS
applications, written for NestJS 12 on Node.js 20 or later. They install through an
official `@nestjs/skills` CLI, as a Claude Code plugin, or with the generic `skills`
installer. The repo appeared on GitHub trends in its first week (167 stars, read
2026-11-27), so `date_published` is approximate.

## Key points

- **Skills:** `nestjs` (core conventions), `nestjs-feature` (modules, controllers,
  providers), `nestjs-auth`, `nestjs-data` (persistence), `nestjs-testing`, and
  `nestjs-production` (deployment and hardening).
- **Install with the NestJS CLI:** `npx @nestjs/skills add` writes to
  `.agents/skills/`; add `--agent claude` or `--agent all` to target agents, and
  `--global` for a user-wide install.
- **Install as a Claude Code plugin:** `claude plugin marketplace add
  nestjs/agent-skills`, then `claude plugin install nestjs@nestjs`.
- **Other routes:** `npx skills add nestjs/agent-skills`, or `gemini extensions install
  https://github.com/nestjs/agent-skills` for Gemini CLI. Works with Codex, Cursor, and
  any agent that reads the Agent Skills format.
- Versions are pinned in the README, and contributors get validation commands, so the
  skills should track framework releases.
- Good for: anyone generating or reviewing NestJS code with an agent, so it follows
  current NestJS 12 patterns instead of older ones from training data.

## Why it matters

Skills written by a framework's own maintainers turn framework-specific guidance into a
first-party, versioned artefact rather than community prompts of unknown age.
