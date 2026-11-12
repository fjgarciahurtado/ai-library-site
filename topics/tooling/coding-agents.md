---
title: "Coding agents"
tags: [coding-agents, agents, cli, ide]
related: [agents/agent-patterns, tooling/skills, tooling/mcp, practices/security]
last_reviewed: 2026-11-12
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
  (Anthropic, 2026-10-14). Since 2026-11-04, GitHub Copilot is also a provider in Xcode's
  built-in coding assistant (public preview, Xcode 27.3 beta, any Copilot plan).
- **Switching tools:** Codex's `/import` copies a Claude Code or Cursor setup
  (instructions, skills, hooks, MCP servers, subagents, memories) into Codex; in the CLI
  it is a one-time copy (Codex docs, read 2026-11-05; see [memory](../agents/memory.md)).
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
  Since 2.1.319 (2026-11-06), with telemetry or feature flags off (for example behind an
  LLM gateway), auto mode asks about or denies what the server cannot check instead of
  falling back to the local classifier; `CLAUDE_CODE_AUTO_MODE_SERVER=0` restores the
  fallback. The same release adds `permissions.denyInsteadOfPrompting`, which denies any
  call that would wait on a prompt and lets the turn continue, for unattended runs.
  GitHub Copilot has a similar mode, "assisted permissions", generally available since
  2026-10-26 in Copilot CLI (`/permissions` → assisted), the Copilot app, and VS Code. A
  model lets clearly safe commands, paths, and URLs through and asks about the rest;
  admins can allow Assisted while blocking Allow All. Since the week of 2026-11-02 the
  Copilot app also takes plain-language guidance (personal instructions) on which tool
  requests it may approve on its own.
  For a hard boundary, Claude Code 2.1.314 (2026-10-30) adds
  `permissions.blockWritesOutsideWorkingDirectories: true`: Write, Edit, and
  NotebookEdit then refuse paths outside the working directories in every mode, bypass
  included. 2.1.309 (2026-10-22) closed several sandbox gaps (shell startup files ran
  outside the sandbox, `denyWrite` failed through symlinks, sandboxed commands could edit
  the `--mcp-config` file); since then `sed -i` gets a normal Bash prompt that `/rewind`
  does not undo, and `claude ultrareview` needs workspace trust (`--trust-workspace` in
  scripts). On Linux, `sandbox.allowNestedUserNamespaces` (2.1.305) allows Chromium and
  rootless podman inside the sandbox at the cost of weaker file protection.
- **Extensibility:** [skills](skills.md), slash commands, hooks, subagents, plugins,
  and [MCP](mcp.md) servers. Hooks used as guardrails should fail closed: since 2.1.295
  (2026-10-08), Claude Code hooks can set `onFailure: "block"` so that a hook that
  crashes or times out blocks the action, and since 2.1.317 (2026-11-03) Agent SDK hook
  callbacks accept the same option (`on_failure="block"` in Python); 2.1.294 fixed a bug that let instruction-style
  `prompt` hooks allow what they should block. At most 12 hooks run per event at once
  (2.1.302), and since 2.1.312 (2026-10-27) prompt and agent hooks are also capped at 24
  running at a time per session, subagents included. Since 2.1.314 Bash hooks also
  cover the Monitor tool's commands. Subagents take an `effort` parameter (2.1.292), can
  use MCP servers that connect late (2.1.311), and fork subagents are on by default in
  `claude -p`, the Agent SDK, desktop, and VS Code (2.1.302), where subagents always run
  in the background.
- **Effort:** in Claude Code, typing `ultrathink` runs that one turn at `xhigh` effort on
  the 5.5-generation models and Fable 5.1 (2.1.311, 2026-10-26;
  `CLAUDE_CODE_DISABLE_ULTRATHINK=1` turns it off since 2.1.316); cloud routines have an
  effort setting (2.1.312). Since 2.1.316 (2026-10-31), `CLAUDE_CODE_SUBAGENT_EFFORT` sets
  the effort subagents run at instead of inheriting the session's. Fast mode works on
  Vertex AI since 2.1.322 (global, us, eu), and since 2.1.321 a rate-limited fast mode
  retries at standard speed on the same model first. Since 2.1.317
  subagents on a different model use that model's own effort setting (see
  [cost and caching](../practices/cost-and-caching.md)). Codex takes model, effort, and speed inline in `/model`
  (0.164) and lets you change effort mid-conversation (0.165). Codex `/presets` saves
  prompts, slash commands, or permission settings in ten slots (0.164, 2026-10-23).
- **Unattended runs:** since 2.1.311 Claude Code no longer retries requests the API marks
  as not retryable (a retry loop could hang scripts); since 2.1.314 `claude -p` exits 1
  when startup fails; and since 2.1.318 (2026-11-04) it reports when a stored claude.ai
  sign-in ends (`loginExpiresAt` in `claude auth status`, `credential_expires_at` in
  `claude -p` JSON, and a stderr warning from 10 days before). Since 2.1.318 background
  subagents move shell commands to the background after 3 minutes so the prompt cache
  does not expire.
- **Observability:** Claude Code emits OpenTelemetry with GenAI attributes (2.1.300),
  and fields that explain why auto mode allowed or blocked a tool call (2.1.301). The
  `claude_code.safety_event` event added in 2.1.307 was removed again in 2.1.312
  (2026-10-27). `/usage` (2.1.305) shows usage and applies suggested
  fixes with `f`.
- **Context handling:** idle sessions are compacted before the prompt cache expires
  (2.1.299), `@` mentions pass paths instead of contents, and switching to a
  smaller-context model summarises first (2.1.301). Standard-context sessions compact
  instead of stopping when a request passes 200K tokens (2.1.311), and idle compaction
  also runs in VS Code and the Desktop Code tab (2.1.314), so returning to a long session
  after the cache expires costs less.
- **Other providers:** Claude Code runs on Bedrock, Vertex, Foundry, and Mantle; the
  Monitor tool works there since 2.1.310, and 2.1.305 fixed a 2.1.304 regression that
  broke requests on those providers (skip 2.1.304). Since 2.1.312, unrecognised model
  names on those providers get the short system prompt
  (`CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT=0` restores the full one). Codex has a built-in Vertex AI
  provider (`model_provider = "gcp"`, 0.165, 2026-10-27) and enterprise MCP sign-in
  (0.164).
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
  (`npx skills add EricJujianZou/rederive`; see [skills](skills.md)). claude-mem (about
  105K stars, Apache-2.0) is the most popular automatic-memory plugin for Claude Code and
  other agents (see [memory](../agents/memory.md)). For design before implementation,
  Google's Elephant-Goldfish Model plugin (Apache-2.0, 2026-11) drafts a design document
  with full context and has fresh, context-free subagents review it
  (`claude plugin marketplace add google/elephant-goldfish-model`, then
  `claude plugin install egm@egm`; also for Codex and Antigravity; see
  [skills](skills.md)). Floorplan (Claude Code and Codex, 2026-11) draws an interactive
  plain-English map of a codebase and of what the agent recently changed
  (`claude plugin marketplace add haydenschmitty/floorplan`). For Apple platforms,
  Apple's `xcode` plugin is in the official marketplace
  (`claude plugin install xcode@claude-plugins-official`, 2026-11-06): it builds, runs,
  and tests schemes, renders SwiftUI previews, drives simulators, and searches Apple
  docs over MCP, linking the plugin shipped with your Xcode through
  `xcrun agent plugin path`. For websites, Taste Skill (MIT, 2026-11) makes the agent
  choose a palette, fonts, and layout for the client's business and checks the page in
  headless Chrome before handover (`/plugin marketplace add Leonxlnx/taste-skill`, then
  `/plugin install taste-skill@taste-skill`; see [skills](skills.md)).
- **Comparing models on one task:** VS Code 1.143 (2026-10-22) has this built in as a
  preview (`sessions.chat.compareAgents.enabled`). Each model works in its own session,
  and a judge model can pick the best result or **Synthesize** a merge. Before, people
  ran parallel worktrees by hand. The same release made the Copilot harness (Copilot
  SDK, Agent Host) the default for new VS Code sessions and lets admins require plugins
  with `enabledPlugins`, which then install automatically. VS Code 1.145 (2026-11-04)
  lets nested sessions use a different agent harness (preview,
  `chat.agentHost.multipleChatProviders.enabled`), and a working set keeps or undoes
  pending agent edits. VS Code 1.143 also has an experimental local MAI Code 1.1 Flash
  model (needs a 96 GB NVIDIA GPU).
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
  checks and merge conflicts on a PR (**Watch and fix** in the merge box, any PR on
  github.com, paid plans). Agentic Workflows run on Free, Team, and Enterprise plans
  with read-only sandboxed agents, "safe outputs", and threat detection. Locally, VS Code
  automations take cron schedules and workspace custom agents (1.145), and Claude Code
  cloud routines load your claude.ai plugins (2.1.314).
- **Long-lived sessions:** sessions increasingly run on a host rather than in the editor
  window. Claude Code has background sessions and Remote Control; VS Code's Agent Host
  (`code agent host`, 2026-10-28) keeps Copilot sessions running after the window
  closes, runs them on remote machines or in the cloud, and lets GitHub Mobile and other
  clients continue them through the open Agent Host Protocol. The same release added
  experimental desktop computer use (`chat.agentHost.computerUse.enabled`, then
  `/computer on`). Codex CLI has a similar command center: `codex agents` (with
  `--no-daemon` since 0.167.0, 2026-11-06), `codex queue --resume` (0.166), unread
  markers, and backend switching in the session picker.
- **SDKs:** for example the Claude Agent SDK packages the Claude Code harness as a
  library for building your own agents. The GitHub Copilot SDK is being renamed the
  Microsoft Copilot SDK (2026-10-28).
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
  always-on subscription (2.1.307). The official marketplace's `code-review` plugin
  prints to the terminal unless `--comment` is passed (since 2026-10-27).

## How to use it

- Give the agent a way to check its work: tests, type checks, linters, screenshots.
- Keep project instruction files short, current, and specific.
- Start with small, well-scoped tasks; review diffs before merging.
- Never give an agent production credentials it does not need.
- Add a `REVIEW.md` saying what failure looks like in each area, and fix recurring
  review comments at the source (a lint rule, a skill, or `CLAUDE.md`).
- When the agent writes code against libraries that changed after its knowledge cutoff,
  give it current docs: Context7 (`npx ctx7 setup --claude`) installs a skill that
  fetches version-specific docs on demand (see [MCP](mcp.md)).
- If the agent over-builds (new helpers, extra dependencies, speculative abstractions),
  try Ponytail: `/plugin marketplace add DietrichGebert/ponytail`, then
  `/plugin install ponytail@ponytail` (also for Codex). It makes the agent check
  existing code, the standard library, and platform features before writing new code,
  and adds `/ponytail-review` for diffs. Its savings figures are the author's own.

## Current state

- **2026-11-12:** Ponytail added (see How to use it). No new Claude Code, Codex (only
  0.167.2, a Vertex AI default change), or Gemini CLI feature releases since
  2026-11-11. Update `mcp-server-git` if your agent uses it (see [MCP](mcp.md)).

- **2026-11-11:** Context7 (library docs as a skill + CLI or MCP server) is rising in
  GitHub trends; see How to use it. No new Claude Code release since 2.1.322; Gemini CLI
  0.68.0 (2026-11-10) adds a `SubagentStop` hook event and an extension validation
  command, otherwise fixes.

- **2026-11-10:** Claude Code 2.1.321 (2026-11-09) makes Claude Fable 5.2 the default
  Fable model (saved Fable 5.1 picks move to it; see [Claude](../models/claude.md)),
  adds `claude remote-control --settings <file>`, lets mods Claude writes turn on without
  asking in auto and bypass modes, and fixes an MCP OAuth token leak and several
  permission gaps (see [security](../practices/security.md)). 2.1.322 (2026-11-10) adds
  fast mode on Vertex AI. Fable 5.2 is also in GitHub Copilot. Taste Skill (above) is a
  new design skill for company websites.
- **2026-11-09:** Claude Code 2.1.319 (2026-11-06) runs MCP tasks in the background (see
  [MCP](mcp.md)), adds `permissions.denyInsteadOfPrompting` and
  `/claude-api latency-optimize`, keeps finished subagents in `/tasks`, and fixes several
  permission bypasses (see [security](../practices/security.md)). Self-paced `/loop` now
  ends when a turn does not reschedule (`CLAUDE_CODE_LOOP_KEEPALIVE=1` for the old
  behaviour). Copilot CLI gained a `/settings` dashboard for plugins and MCP servers, and
  Copilot runs in JetBrains Air. Ollama 0.40.15 adds Kimi Code CLI to `ollama launch`.
- **2026-11-06:** Latest releases: Claude Code 2.1.318 (2026-11-04; cloud sessions can
  start with no repository, and many fixes for headless runs that reported success after
  an error), Codex CLI 0.167.0, and VS Code 1.145. Apple's Xcode plugin and Floorplan
  (above) are new this week.
- **2026-11-03:** Claude Code 2.1.317 prompts before a web or shell tool call sends your
  account email, warns in `/schedule` about connectors you did not ask for, and adds a
  gateway cost report API (see [security](../practices/security.md)). Google's EGM
  design-review plugin (above) gained about 8,900 GitHub stars in its first week.
- **2026-10-31:** Fast mode on Opus 4.8 is deprecated and will be removed on 2026-11-30;
  move fast-mode sessions to Opus 5.5 (see [Claude](../models/claude.md)).
- **2026-10-28:** Shared Copilot Automations and the VS Code customizations marketplace
  are still rolling out; Copilot connectors (26 verified MCP servers) are in preview
  (see [MCP](mcp.md)).
- **2026-10-27:** GPT-6.1 Terra is in the Codex catalogue and rolling out in Copilot
  (see [GPT](../models/gpt.md)); Codex Memory v2 is on by default for new profiles
  (see [memory](../agents/memory.md)).

## Open questions

- Which Xcode version first ships `xcrun agent plugin path`, needed by Apple's `xcode`
  Claude Code plugin? Neither the PR nor the marketplace entry says (checked 2026-11-06).
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
- [Claude Code release 2.1.316](../../sources/2026/11/2026-11-02-claude-code-2-1-316.md)
- [Claude Code release 2.1.317](../../sources/2026/11/2026-11-03-claude-code-2-1-317.md)
- [Elephant-Goldfish Model (EGM)](../../sources/2026/11/2026-11-03-elephant-goldfish-model-plugin.md)
- [Claude Code release 2.1.318](../../sources/2026/11/2026-11-04-claude-code-2-1-318.md)
- [VS Code 1.145](../../sources/2026/11/2026-11-05-vscode-1-145-agents-mcp.md)
- [GitHub Copilot in Xcode's coding assistant](../../sources/2026/11/2026-11-05-copilot-in-xcode-coding-assistant.md)
- [Codex docs: Import from another agent](../../sources/2026/11/2026-11-05-codex-import-from-another-agent.md)
- [Apple's Xcode plugin for Claude Code](../../sources/2026/11/2026-11-06-apple-xcode-plugin-claude-code.md)
- [Codex CLI 0.167.0](../../sources/2026/11/2026-11-06-codex-cli-0-167-agent-center.md)
- [Floorplan](../../sources/2026/11/2026-11-06-floorplan-codebase-map-plugin.md)
- [Claude Code release 2.1.319](../../sources/2026/11/2026-11-09-claude-code-2-1-319.md)
- [GitHub Copilot weekly releases: November 2](../../sources/2026/11/2026-11-09-copilot-weekly-releases-nov-2.md)
- [Ollama v0.40.15](../../sources/2026/11/2026-11-09-ollama-v0-40-15.md)
- [Introducing Claude Fable 5.2 and Claude Mythos 5.2](../../sources/2026/11/2026-11-10-claude-fable-mythos-5-2.md)
- [Claude Code releases 2.1.321 and 2.1.322](../../sources/2026/11/2026-11-10-claude-code-2-1-321.md)
- [Taste Skill](../../sources/2026/11/2026-11-10-taste-skill-frontend-design.md)
- [Context7: up-to-date library docs for coding agents](../../sources/2026/11/2026-11-11-context7-docs-for-coding-agents.md)
- [Ponytail](../../sources/2026/11/2026-11-12-ponytail-write-less-code-plugin.md)
