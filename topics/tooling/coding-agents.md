---
title: "Coding agents"
tags: [coding-agents, agents, cli, ide]
related: [agents/agent-patterns, tooling/skills, tooling/mcp, practices/security]
last_reviewed: 2026-10-30
---

## Overview

Coding agents read a codebase, plan, edit files, run commands and tests, and iterate
until a task is done. They range from IDE assistants to terminal tools to cloud agents
that open pull requests by themselves. In 2026 they are the most widely used kind of AI agent.

## Key concepts

- **Main tools:** Claude Code (Anthropic; CLI, desktop app, web app, IDE extensions, and
  cloud scheduled routines), Codex (OpenAI; GPT-6 models since October 2026), Gemini CLI
  and Jules (Google), GitHub Copilot's agent mode, and editors such as Cursor.
  Open-source options include Aider, Cline, and OpenCode. Adoption extends to government:
  over 1,500 engineers and technical staff at Singapore's GovTech use Claude Code
  (Anthropic, 2026-10-14).
- **Project instructions:** files such as `CLAUDE.md` or `AGENTS.md` describe build
  commands, conventions, and rules.
- **Permissions:** modes from "ask every time" to automatic approval with safety checks;
  sandboxes and worktrees isolate changes. Prompts alone protect little: Anthropic found
  users approved about 93% of Claude Code prompts, and OS-level sandboxing (Seatbelt,
  bubblewrap) cut prompts by 84% while confining writes to the workspace and blocking
  network by default. Claude Code's auto mode adds a classifier that catches about 83% of
  overeager actions, and project settings and hooks are not parsed before the user
  trusts the project (Anthropic, May 2026; see [security](../practices/security.md)).
  Since 2.1.304 (2026-10-19), `/auto-mode-setup` teaches the auto mode classifier about
  a project, and a permission mod can answer `decider: "person"` to require a human
  decision even under auto mode (`e.isReadOnly` is also available to mods). Since
  2.1.302, headless sessions on third-party providers start in `default` permission
  mode, and `CLAUDE_CODE_AUTO_MODE_MODEL` picks the client-side classifier model.
  GitHub Copilot has a similar mode, "assisted permissions", generally available since
  2026-10-26 in Copilot CLI (`/permissions` → assisted), the Copilot app, and VS Code. A
  model lets clearly safe commands, paths, and URLs through and asks about the rest.
- **Extensibility:** [skills](skills.md), slash commands, hooks, subagents, plugins,
  and [MCP](mcp.md) servers. Hooks used as guardrails should fail closed: since 2.1.295
  (2026-10-08), Claude Code hooks can set `onFailure: "block"` so that a hook that
  crashes or times out blocks the action; 2.1.294 fixed a bug that let instruction-style
  `prompt` hooks allow what they should block. At most 12 hooks run per event at once
  (2.1.302), and since 2.1.312 (2026-10-27) prompt and agent hooks are also capped at 24
  running at a time per session, subagents included. Subagents take an `effort` parameter (2.1.292), and fork subagents are on
  by default in `claude -p`, the Agent SDK, desktop, and VS Code (2.1.302), where
  subagents always run in the background.
- **Observability:** Claude Code emits OpenTelemetry with GenAI attributes (2.1.300),
  and fields that explain why auto mode allowed or blocked a tool call (2.1.301). The
  `claude_code.safety_event` event added in 2.1.307 was removed again in 2.1.312
  (2026-10-27). `/usage` (2.1.305) shows usage and applies suggested
  fixes with `f`.
- **Context handling:** idle sessions are compacted before the prompt cache expires
  (2.1.299), `@` mentions pass paths instead of contents, and switching to a
  smaller-context model summarises first (2.1.301).
- **Add-ons for everyday work** (added to the library in October 2026; MIT unless
  noted): Ribbon shows usage left,
  reset times, and prompt-cache warmth above the prompt
  (`/plugin install ribbon --marketplace robonuggets/ribbon`; see
  [cost and caching](../practices/cost-and-caching.md)). stalemap (JS/TS only) tells an
  agent which npm dependencies changed after its training cutoff: it writes notes into
  `CLAUDE.md`/`AGENTS.md`, adds an edit-time type-check guard, and provides a
  `search_changes` MCP tool (`/plugin marketplace add Umair/stalemap`, then
  `/plugin install stalemap@stalemap`). For local models, Ollama 0.40.9 (2026-10-22) runs
  the Flint coding model on macOS, Linux, and Windows, and `ollama launch` passes cloud
  model context lengths to coding tools. Context Mode (Elastic License 2.0) keeps large
  tool output in a sandbox and returns only what the code prints
  (`/plugin marketplace add mksglu/context-mode`, then
  `/plugin install context-mode@context-mode`; see [MCP](mcp.md)). The rederive skill
  helps you learn a repo by asking you to work out its design
  (`npx skills add EricJujianZou/rederive`; see [skills](skills.md)).
- **Comparing models on one task:** VS Code 1.143 (2026-10-22) has this built in as a
  preview. Each model works in its own session, and a judge model can pick the best
  result or merge them. Before, people ran parallel worktrees by hand.
- **Letting the tool pick models:** GitHub Copilot Fusion (GA 2026-10-28) routes each
  prompt across several models, using a single model, a cascade (cheap draft, escalate if
  needed), or a critique loop, at Standard, High, or Max effort. GitHub reports Fusion Max
  within two points of Claude Code with Opus 5.5 Max on the Artificial Analysis Coding
  Agent Index at about half the cost (vendor figures; see
  [cost and caching](../practices/cost-and-caching.md)).
- **Background and scheduled agents:** run in the cloud on a schedule or trigger. Options
  as of 2026-10-28: Claude Code cloud routines; GitHub Agentic Workflows (GA), which
  compile a Markdown file into a GitHub Actions job that runs Copilot, Claude, Codex,
  Gemini, or Pi (`gh extension install github/gh-aw`, then
  `gh aw add-wizard githubnext/agentics/repo-status`); shared Copilot Automations that
  belong to a repository and fire on events; and Copilot Agent Merge, which fixes failing
  checks and merge conflicts on a PR (**Watch and fix** in the merge box).
- **Long-lived sessions:** sessions increasingly run on a host rather than in the editor
  window. Claude Code has background sessions and Remote Control; VS Code's Agent Host
  (`code agent host`, 2026-10-28) keeps Copilot sessions running after the window
  closes, runs them on remote machines or in the cloud, and lets GitHub Mobile and other
  clients continue them through the open Agent Host Protocol.
- **SDKs:** for example the Claude Agent SDK packages the Claude Code harness as a
  library for building your own agents.
- **Infrastructure at agent scale:** when most commits come from agents, source control
  and review become the bottleneck. Anthropic's merges grew from about 2,500 a day (May
  2026) to over 30,000 (September 2026), with about 25 million CI checkouts a day. In
  five months it replaced git with a server-side, on-demand system (Scion), dropped its
  global merge queue in favour of post-merge testing, and added review rules that
  separate cosmetic from sensitive changes. Claude resolves most merge conflicts, and
  engineers' role shifted to setting constraints and reviewing intent.
- **Reviewing agent-written code:** the Claude Code team (about 90% of its code written
  by Claude) aims for the least human review time that does not raise revert or incident
  rates. Every PR gets a multi-agent AI review (parallel bug hunters, a voting step, only
  confirmed findings posted) and a security pass; open findings block merge. Human
  approvals scale with risk set by a classifier: none for low-risk changes, one person for
  ordinary changes, two for the riskiest paths. An agent's approval never replaces a
  human's. Review rounds are capped at three to make review converge. Anthropic reports
  merged PRs more than doubled from June to September 2026 while the reverted share fell
  by over 40% (Anthropic's own figures). The hosted Claude Code Review product offers
  Quick, Standard, and Deep levels per organization or repository and can review every
  repository in an organization (since 2026-10-19); `@claude review stop` ends an
  always-on subscription (2.1.307).

## How to use it

- Give the agent a way to check its work: tests, type checks, linters, screenshots.
- Keep project instruction files short, current, and specific.
- Start with small, well-scoped tasks; review diffs before merging.
- Never give an agent production credentials it does not need.
- Add a `REVIEW.md` saying what failure looks like in each area, and fix recurring
  review comments at the source (a lint rule, a skill, or `CLAUDE.md`).

## Current state

- **2026-10-30:** Claude Code 2.1.314 (no public 2.1.313):
  `permissions.blockWritesOutsideWorkingDirectories` makes Write, Edit, and NotebookEdit
  refuse paths outside the working directories in every permission mode, bypass
  included. Idle compaction in VS Code and the Desktop Code tab summarises an idle
  conversation over 200K tokens so a cold-cache return costs less. `claude -p` now exits
  1 with an error when startup fails. Bash hooks also cover the Monitor tool's commands,
  and cloud routines load your claude.ai plugins.
- **2026-10-29:** Codex CLI 0.166.0: keyboard selection and search in the transcript,
  clearer safety-block explanations, `codex queue --resume`, and
  `codex doctor --network-only`.
- **2026-10-30:** claude-mem (about 105K stars, Apache-2.0) is the most popular
  automatic-memory plugin for Claude Code and other agents; see
  [memory](../agents/memory.md).
- **2026-10-28:** GitHub Universe. Agentic Workflows (`gh aw`) is GA on Free, Team, and
  Enterprise, with read-only sandboxed agents, "safe outputs", and threat detection.
  Copilot Fusion (multi-model routing) is GA on all plans. Agent Merge now works from
  any PR on github.com (paid plans). Shared Copilot Automations are rolling out.
  Copilot connectors put 26 GitHub-verified MCP servers one click away (preview; see
  [MCP](mcp.md)). VS Code gains the Agent Host, remote and cloud sessions, experimental
  desktop computer use (`chat.agentHost.computerUse.enabled`, then `/computer on`), and
  a customizations marketplace; the GitHub Copilot SDK is being renamed the Microsoft
  Copilot SDK.
- **2026-10-27:** Claude Code 2.1.312: Write no longer overwrites a large CLAUDE.md or
  rules file Claude has only partly read, and `paths:` skills are found after a `cd`.
  Prompt and agent hooks are capped at 24 concurrent per session. On Bedrock, Vertex,
  Foundry, and Mantle, unrecognised model names get the short system prompt
  (`CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT=0` restores the full one). Cloud routines gain an
  effort setting. The official marketplace's `code-review` plugin now prints to the
  terminal unless `--comment` is passed.
- **2026-10-27:** Codex CLI 0.165.0: built-in Vertex AI provider
  (`model_provider = "gcp"`), Memory v2 on by default for new profiles with import from
  other agents (see [memory](../agents/memory.md)), effort changes mid-conversation, and
  GPT-6.1 Terra in the catalogue.
- **2026-10-26:** Claude Code 2.1.311: typing `ultrathink` in the terminal now runs that
  turn at `xhigh` effort on the 5.5-generation models and Fable 5.1. Standard-context
  sessions compact instead of stopping when a request passes 200K tokens. Subagents can
  use MCP servers that connect late, and `SubagentStop` hooks fire once per subagent.
  Requests the API marks as not retryable are no longer retried, a retry loop that
  could hang unattended runs. TypeScript Agent SDK 0.3.311 splits cache-write tokens into
  5-minute and 1-hour counts.
- **2026-10-26:** GitHub Copilot assisted permissions are generally available in Copilot
  CLI, the Copilot app, and VS Code: a model approves clearly safe actions and asks
  about the rest. Admins can allow Assisted while blocking Allow All. GPT-6.1 Terra is
  also rolling out in Copilot (see [GPT](../models/gpt.md)).
- **2026-10-23:** Claude Code 2.1.310: the Monitor tool and plugin monitors now work on
  Bedrock, Vertex, and Foundry and with telemetry off, where long foreground sleeps are
  now blocked. It retries without the `effort` beta or mid-conversation system messages
  when a gateway rejects them. On Windows it closes a fail-open path for hooks whose
  command is only quoted strings. Enterprise custom roles now cover cloud sessions and
  Remote Control.
- **2026-10-23:** Codex CLI 0.164.0 adds `/presets` (ten slots for prompts, slash
  commands, or permission settings) and inline `/model` and `/permissions` arguments,
  image previews in Kitty and Sixel terminals, enterprise MCP sign-in, and credential
  masking in remote shells.
- **2026-10-22:** VS Code 1.143 makes the Copilot harness (Copilot SDK, Agent Host) the
  default for new sessions. It adds a preview that runs one task with several models,
  with a Judge model to score the results and **Synthesize** to merge them
  (`sessions.chat.compareAgents.enabled`). Experimental: a local MAI Code 1.1 Flash
  model (needs a 96 GB NVIDIA GPU). Admins can require plugins with `enabledPlugins`,
  and those plugins install automatically.
- **2026-10-22:** Claude Code 2.1.309 (2.1.308 is fixes only) closes several sandbox
  gaps: shell startup files ran outside the sandbox, `denyWrite` failed through symlinks,
  and sandboxed commands could edit the `--mcp-config` file. It also tightens `Edit` deny
  rules, `cd`+git prompts, and worktree isolation. Behaviour changes: `sed -i` now gets a
  normal Bash prompt and `/rewind` does not undo it. `claude ultrareview` needs workspace
  trust (`--trust-workspace` in scripts). Dangerous `rm` in bypass mode on Desktop and
  VS Code is denied with a rewrite hint.
- **2026-10-21:** Claude Code 2.1.307: `/claude-api api-version` migrates Claude API code
  to API version `2026-10-21` (see [Claude](../models/claude.md)). Unparseable tool
  calls are retried twice, and self-hosted runner checkout hooks now time out after 30
  minutes by default.
- **2026-10-20/21:** Claude Code 2.1.305 fixes a 2.1.304 regression that broke all
  requests on Bedrock, Vertex, and gateways that reject tool search, so skip 2.1.304
  there. It adds `sandbox.allowNestedUserNamespaces` on Linux (Chromium and rootless
  podman inside the sandbox, at the cost of weaker file protection). 2.1.306 fixes
  `claude -p` in cloud sessions and spurious "prompt is too long" errors with many MCP
  tools.

## Open questions

- How teams should review the volume of code agents produce. Partly answered
  (2026-10-13): Anthropic uses semantic approval rules and post-merge testing rather
  than reviewing every change equally. On 2026-10-15 the Claude Code team published
  outcome data (reverted share down over 40% while merged PRs doubled), but only for its
  own repositories; no independent or cross-company figures yet.
- Copilot Fusion's cost and score claims (2026-10-28) are GitHub's own. Are there
  independent results, and how does it compare with Claude Code at lower effort levels?
  The details of local-model selection in Fusion were not read.

## Sources

- [Agent Skills overview](../../sources/2026/10/2026-10-04-claude-agent-skills-overview.md)
- [Introducing GPT-6 Sol and Luna](../../sources/2026/10/2026-10-04-gpt-6-sol-and-luna.md)
- [How we contain Claude across products](../../sources/2026/10/2026-10-09-how-anthropic-contains-claude.md)
- [Claude Haiku 5.5](../../sources/2026/10/2026-10-08-claude-haiku-5-5.md)
- [Claude Code 2.1.292 to 2.1.296](../../sources/2026/10/2026-10-12-claude-code-2-1-292-296.md)
- [Redesigning source control at Anthropic](../../sources/2026/10/2026-10-14-anthropic-scion-source-control.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Anthropic opens Singapore office](../../sources/2026/10/2026-10-15-anthropic-singapore-office.md)
- [Claude Code release 2.1.301](../../sources/2026/10/2026-10-16-claude-code-2-1-301.md)
- [How the Claude Code team does code review](../../sources/2026/10/2026-10-19-claude-code-team-code-review.md)
- [Claude Code releases 2.1.302 and 2.1.303](../../sources/2026/10/2026-10-19-claude-code-2-1-302-303.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
- [Claude Code releases 2.1.305 and 2.1.306](../../sources/2026/10/2026-10-21-claude-code-2-1-305-306.md)
- [Claude Code release 2.1.307](../../sources/2026/10/2026-10-22-claude-code-2-1-307.md)
- [stalemap](../../sources/2026/10/2026-10-22-stalemap-post-cutoff-dependency-changes.md)
- [Claude Code releases 2.1.308 and 2.1.309](../../sources/2026/10/2026-10-23-claude-code-2-1-308-309.md)
- [Ribbon](../../sources/2026/10/2026-10-23-ribbon-claude-code-usage-band.md)
- [Ollama v0.40.9](../../sources/2026/10/2026-10-23-ollama-v0-40-9-phonon-d3.md)
- [Claude Code release 2.1.310](../../sources/2026/10/2026-10-26-claude-code-2-1-310.md)
- [Codex CLI 0.164.0](../../sources/2026/10/2026-10-26-codex-cli-0-164-presets.md)
- [VS Code 1.143](../../sources/2026/10/2026-10-26-vscode-1-143-compare-models.md)
- [Claude Code release 2.1.311](../../sources/2026/10/2026-10-27-claude-code-2-1-311.md)
- [GitHub Copilot assisted permissions GA](../../sources/2026/10/2026-10-27-copilot-assisted-permissions-ga.md)
- [Claude Code release 2.1.312](../../sources/2026/10/2026-10-28-claude-code-2-1-312.md)
- [Codex CLI 0.165.0](../../sources/2026/10/2026-10-28-codex-cli-0-165-vertex.md)
- [GitHub Agentic Workflows GA](../../sources/2026/10/2026-10-29-github-agentic-workflows-ga.md)
- [Copilot connectors](../../sources/2026/10/2026-10-29-copilot-connectors-verified-mcp.md)
- [Agent Merge](../../sources/2026/10/2026-10-29-copilot-agent-merge-pull-requests.md)
- [GitHub Copilot Fusion GA](../../sources/2026/10/2026-10-29-github-copilot-fusion-ga.md)
- [Shared Copilot Automations](../../sources/2026/10/2026-10-29-copilot-shared-automations.md)
- [Copilot in VS Code: Universe 2026](../../sources/2026/10/2026-10-29-copilot-vscode-universe-agent-host.md)
- [Claude Code release 2.1.314](../../sources/2026/10/2026-10-30-claude-code-2-1-314.md)
- [Codex CLI 0.166.0](../../sources/2026/10/2026-10-30-codex-cli-0-166-transcript-selection.md)
- [claude-mem](../../sources/2026/10/2026-10-30-claude-mem-persistent-agent-memory.md)
