---
title: "Agent skills"
tags: [skills, agents, anthropic]
related: [tooling/mcp, agents/tool-use, tooling/coding-agents]
last_reviewed: 2026-11-12
---

## Overview

A skill is a folder of instructions, scripts, and reference files that teaches an agent
how to do a specific job: fill in a PDF form, follow a company style guide, run a
deployment. The agent sees only each skill's name and description until a task needs it,
then loads the rest. Skills package *know-how*; [MCP](mcp.md) provides *connections*.

## Key concepts

- **`SKILL.md`:** the entry file, with frontmatter (`name`, `description`) and the
  instructions in Markdown.
- **Progressive disclosure:** metadata always loaded, body loaded when relevant, extra
  files and scripts read or run only when needed. Many skills can be installed at little
  context cost.
- **Scripts:** skills can include code the agent runs instead of generating it each time.
- **Where they run:** Claude apps, Claude Code (project, user, and plugin skills), the
  Claude API (with code execution, including through Google Cloud since 2026-10-22), and
  Managed Agents, plus the other agents that follow the open standard.
- **Open standard:** Agent Skills has been an open standard (spec at agentskills.io)
  since December 2025, and since 2026-10-22 the Agentic AI Foundation (Linux Foundation)
  governs it, as it does MCP. Anthropic counts over 70 platforms that load skills,
  including ChatGPT, Codex, Cursor, GitHub Copilot, and VS Code, so a skill is portable
  across agents.
- **Plugins:** bundles of skills, commands, hooks, agents, and MCP servers that can be
  shared through marketplaces (Claude Code plugins).
- **Skills API:** `/v1/skills` manages skills on the Claude API; it is generally
  available and no longer needs the beta header (as of 2026-10-04).
- **Long sessions in Claude Code:** since 2.1.304 (2026-10-19) the full skill list is
  resent after compaction, so skills stay discoverable; `/reload-skills` sends only new
  or changed skills, and one source can register at most 1,024 skill hooks per session.
  Since 2.1.309 a skill in an `--add-dir` folder whose name clashes with another is
  offered as `<folder>:<name>`, and since 2.1.312 `paths:` skills are found after a `cd`.
- **Example third-party skill:** Dashboard Design (MIT, 2026-10-21) builds and critiques
  analytics dashboards (web and SwiftUI) with a screenshot QA pass. Install it with
  `/plugin marketplace add abdiraimov-otabek/dashboard-design-skill`, then
  `/plugin install dashboard-design@dashboard-design-skill`. It adds a promotional
  sign-off once per conversation unless you turn it off.
- **Learning skill:** rederive (MIT) teaches you a codebase by having you work out its
  design decisions yourself, while a background agent maps the repo. It works with about
  25 agents: `npx skills add EricJujianZou/rederive` (add `-g` for all projects), then
  `/rederive`. In Claude Code you can also run
  `/plugin marketplace add EricJujianZou/rederive`.
- **Language skill pack:** BeautifulRust (MIT) has three Rust skills (write, review with
  cited findings, port from other languages tests-first) plus a matching clippy config
  for CI: `/plugin marketplace add morganlinton/BeautifulRust`, then
  `/plugin install beautiful-rust@beautiful-rust`; for Codex, copy `skills/rust-*` into
  `~/.agents/skills/`. Its author reports Codex CLI's pass rate on 85 Rust tasks rising
  from 53 to 76 with the skills (single run, graded by a Claude model).
- **Diagram skill:** Archify (Apache-2.0) turns a plan or codebase into an interactive,
  self-contained HTML diagram (architecture, sequence, ERD, timeline, and more) with PNG
  and PDF export: `npx skills add tt-a1i/archify -g`.
- **Process skill packs:** Addy Osmani's agent-skills (MIT, 25 skills) covers the whole
  lifecycle from spec to ship, with `/spec`, `/plan`, `/build`, `/test`, `/review`, and
  `/ship` commands: `/plugin marketplace add addyosmani/agent-skills`, then
  `/plugin install agent-skills@addy-agent-skills` (Codex:
  `codex plugin marketplace add addyosmani/agent-skills`; others:
  `npx skills add addyosmani/agent-skills`). MiniMax's mcode-stack (MIT, new in October
  2026) shares its coding-agent team's own skills for planning, context management, and
  long sessions: `/plugin marketplace add MiniMax-AI/mcode-stack`, then
  `/plugin install ronny@mcode-stack`. Google's Elephant-Goldfish Model (EGM,
  Apache-2.0, 2026-11) is a design-before-code pack: Brainstorm, Draft, Review (fresh
  subagents with no conversation history look for unstated assumptions), Resolve,
  Bootstrap, and Drift report (docs against code):
  `claude plugin marketplace add google/elephant-goldfish-model`, then
  `claude plugin install egm@egm` (Codex: `codex plugin marketplace add
  google/elephant-goldfish-model`, then `codex plugin add egm@egm`); commands start with
  `/egm:`.
- **Front-end design pack:** Impeccable (Apache-2.0, grown from Anthropic's
  frontend-design skill) gives agents 24 design commands, such as `critique`, `audit`,
  `polish`, `bolder`, and `live`, plus a 62-rule detector for generic "AI slop" styling
  that needs no LLM (`npx impeccable detect`). Install with `npx impeccable install`, then
  `/impeccable init`; in Claude Code, `/plugin marketplace add pbakaus/impeccable` also
  works. Use as `/impeccable critique the pricing cards`. For whole company websites,
  Taste Skill (MIT) runs a fixed workflow instead: classify the business, pick palette,
  fonts, and hero layout, then verify the page in headless Chrome
  (`/plugin marketplace add Leonxlnx/taste-skill`, then
  `/plugin install taste-skill@taste-skill`; Codex and `npx skills` also supported).
- **Writing skill:** Humanizer (MIT) rewrites AI-sounding prose against 26 patterns from
  Wikipedia's "Signs of AI writing", edits only prose when pointed at a file, and asks
  rather than inventing facts: `/plugin marketplace add blader/humanizer`, then
  `/plugin install humanizer@humanizer` (others:
  `npx skills add blader/humanizer --global --agent '*'`).
- **Skills as project dependencies:** Microsoft's APM (Agent Package Manager) declares
  skills, prompts, instructions, plugins, and MCP servers in `apm.yml`; `apm install`
  deploys them to Claude Code, Codex, Copilot, Cursor, Gemini, and others, and
  `apm.lock.yaml` pins content hashes. Installs scan for hidden Unicode and can enforce
  an `apm-policy.yml`. Since 2026-11-03 Dependabot opens update PRs for `apm.yml`
  dependencies (version updates only, all GitHub plans).
- **Team adoption kit:** Anthropic's Champion Kit plugin (2026-11-06,
  `claude plugin install champion-kit@claude-plugins-official`) adds seven skills for
  spreading Claude Code in a team (hackathons, office hours, a maturity report).
  `/champion-kit:patterns` finds repeated work worth turning into skills or `CLAUDE.md`
  rules, which also helps a solo user. Its design is a useful model: reading goes
  through a read-only subagent with no shell or edit tools, and the plugin adds no hooks
  or MCP servers.
- **Governance of the standard:** since the donation to the AAIF (2026-10-22),
  maintainers from Anthropic, Google, OpenAI, and others steer the spec. Anthropic
  reports about 1 million skills published and nearly 280 million installs.
- **Bundled skills:** Claude Code ships some skills itself; since 2.1.309 its
  `/claude-api` skill builds Managed Agents teams on `multiagent_20261001`, and dataviz
  checks APCA contrast. Since 2.1.321 (2026-11-09), `.claude/skills` folders inside
  `~/.claude/plugins` no longer load when Claude works on files there, and headless
  sessions reload mods in `.claude/skills` when their files change.
- **Discovery in Copilot:** VS Code's customizations browser (preview, 2026-10-28)
  lists skills, MCP servers, and plugins from available sources in one place, and a repo
  can suggest default plugins in `.github/copilot/settings.json`.

## How to use it

- Write the `description` carefully: it decides when the skill is used.
- Keep `SKILL.md` focused; move long reference material into separate files.
- Include scripts for steps that must be exact.
- Test that the skill triggers on the right requests and not on the wrong ones.
- Review third-party skills before installing: they can contain instructions and code.
- To share skills across a team and several agents, pin them in an APM `apm.yml`, commit
  the lockfile, and let Dependabot propose updates you review like any dependency.

## Current state

- **2026-11-12:** Ponytail (plugin and skill that makes agents write the smallest change
  that works, with review and audit commands) added to the library. It installs from
  its own marketplace in Claude Code and Codex. Its star count (about 189,000, but only
  449 watchers) looks inflated, so judge it by its `SKILL.md`. See
  [coding agents](coding-agents.md).

- **2026-11-10:** Taste Skill (about 112,600 stars, +3,700 in a week) added to the
  library; Impeccable and Humanizer keep rising. Claude Code 2.1.321 changes nested skill
  loading (see Key concepts).
- **2026-11-04:** Rising in GitHub trends: Impeccable (about 10,900 stars in a week,
  101,700 total) and Humanizer (about 2,900 in a week, 64,500 total).
- **2026-11-03:** Google's EGM plugin is rising fast (about 8,900 stars in its first
  week), with experimental Cursor, Copilot CLI, and opencode support.
- **2026-10-29:** addyosmani/agent-skills (about 111,500 stars) and Archify keep rising
  in GitHub trends.
- **2026-10-22:** The AAIF's planned versioned spec releases, proposal process, and
  security guidance have no dates yet (see Open questions).

## Open questions

- Will a shared skill format be adopted across vendors, as MCP was? Largely answered
  (2026-10-22): over 70 platforms support it (Anthropic's count), and it now has neutral
  governance at the AAIF. Still open: when the first versioned spec release and the
  security guidance arrive. Checked 2026-11-04: the
  [agentskills/agentskills](https://github.com/agentskills/agentskills) repo has no
  tagged releases, and [agentskills.io](https://agentskills.io/) lists the
  specification, creator guides (best practices, descriptions, evaluation, scripts), and
  a client guide, but no security, versioning, or proposal pages yet.
- Does APM's `apm.yml` format stay Microsoft's, or move toward a shared packaging
  standard for skills? No other agent vendor has said it will read `apm.yml` (as of
  2026-11-04).

## Sources

- [Agent Skills overview](../../sources/2026/10/2026-10-04-claude-agent-skills-overview.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
- [Dashboard Design: a Claude Code skill for analytics dashboards](../../sources/2026/10/2026-10-21-dashboard-design-skill.md)
- [Donating Agent Skills to the Agentic AI Foundation](../../sources/2026/10/2026-10-23-agent-skills-donated-to-aaif.md)
- [Claude Code releases 2.1.308 and 2.1.309](../../sources/2026/10/2026-10-23-claude-code-2-1-308-309.md)
- [rederive](../../sources/2026/10/2026-10-26-rederive-learn-codebase-skill.md)
- [BeautifulRust](../../sources/2026/10/2026-10-28-beautifulrust-idiomatic-rust-skills.md)
- [Archify](../../sources/2026/10/2026-10-28-archify-interactive-diagram-skill.md)
- [agent-skills (Addy Osmani)](../../sources/2026/10/2026-10-29-addyosmani-agent-skills.md)
- [mcode-stack (MiniMax)](../../sources/2026/10/2026-10-29-minimax-mcode-stack-skills.md)
- [Elephant-Goldfish Model (EGM)](../../sources/2026/11/2026-11-03-elephant-goldfish-model-plugin.md)
- [APM: Agent Package Manager](../../sources/2026/11/2026-11-04-apm-agent-package-manager.md)
- [Dependabot version updates support APM](../../sources/2026/11/2026-11-04-dependabot-apm-version-updates.md)
- [Impeccable](../../sources/2026/11/2026-11-04-impeccable-design-skills.md)
- [Humanizer](../../sources/2026/11/2026-11-04-humanizer-writing-skill.md)
- [Champion Kit plugin for Claude Code](../../sources/2026/11/2026-11-06-champion-kit-plugin.md)
- [Claude Code releases 2.1.321 and 2.1.322](../../sources/2026/11/2026-11-10-claude-code-2-1-321.md)
- [Taste Skill](../../sources/2026/11/2026-11-10-taste-skill-frontend-design.md)
- [Ponytail](../../sources/2026/11/2026-11-12-ponytail-write-less-code-plugin.md)
