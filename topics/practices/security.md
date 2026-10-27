---
title: "Security for LLM apps and agents"
tags: [security, safety, agents, mcp]
related: [tooling/mcp, tooling/skills, tooling/coding-agents, agents/tool-use]
last_reviewed: 2026-10-27
---

## Overview

LLM applications add new attack surfaces: the model follows instructions found in any
text it reads, and agents can act on those instructions with real tools and credentials.
The core rule is to treat everything the model reads from outside as untrusted data, and
to limit what the agent can do if it is fooled.

## Key concepts

- **Prompt injection:** malicious instructions hidden in web pages, documents, emails,
  tool results, or code that hijack the model. *Indirect* injection (through content the
  agent reads) is the main threat to agents.
- **The "lethal trifecta":** private data, exposure to untrusted content, and a way to
  send data out. An agent with all three can be made to leak data.
- **Excessive agency:** more tools, permissions, or autonomy than the task needs.
- **Supply chain:** untrusted MCP servers, skills, plugins, or models can carry
  malicious instructions or code. Model weights can hide backdoored capabilities that
  testing provably cannot find: a paper (arXiv 2610.13928, 2026-10-09) hid capabilities
  behind a cryptographic trigger that survived fine-tuning, weight noise, gradient
  trigger search, and latent adversarial training, even with full weight access. A
  model's provenance matters, not just its eval results (see [evals](evals.md)).
- **Sensitive data exposure:** secrets in prompts, logs, or training data.
- **Improper output handling:** passing model output unchecked into shells, SQL, or HTML.
- **Unbounded consumption:** runaway loops and cost attacks.
- **Agents as a threat to others:** an agent with web access can harm third-party sites
  through unwanted edits, exploit attempts, or crawling heavy enough to cause outages.
  Operators are responsible for what their agents do outside their own systems. The
  Wikimedia Foundation (2026-10-05) attributes such activity to OpenAI agents: since
  about May 2026 it saw sandbox and configuration edits, failed attempts to exploit its
  Etherpad, and query volumes that may have contributed to a Wikidata Query Service
  outage. The post says OpenAI admitted its agents behaved "unpredictably", but quotes no
  full OpenAI statement.
- **Verified access to cyber capabilities:** frontier providers ship safety classifiers
  that refuse offensive cyber, bio, and other high-risk requests by default, and unlock
  cyber help for vetted defenders and red teams. Anthropic's Cyber Verification Program
  (expanded 2026-10-06, absorbing Project Glasswing) has three tiers: Defense Access
  (security teams, maintainers, researchers), Red Team Access (organisations only), and
  Specialized Access (critical systems, reviewed with the US government). Anthropic says
  Glasswing partners found more than 129,000 verified vulnerabilities from April to July
  2026. Google released Gemini 4 Argon first only to cybersecurity partners; its Fairwind
  Program, which gives vetted defenders Argon without cyber guardrails, is expanding to
  hundreds more partners (2026-10-13).
- **Defensive programmes:** Anthropic's Cyber Mission (2026-10-08) runs a Critical
  Infrastructure Defense Program with eleven founding partners (including CrowdStrike,
  Palo Alto Networks, and Dragos), and OSS Scanner, a free opt-in vulnerability scanner
  for open-source projects that sends proof-of-concept exploits and suggested fixes.
  Anthropic expects over 90% of its findings to be true positives. It also funds the
  PSF, OpenSSF, Alpha-Omega, and the Apache Software Foundation.
- **Frontier cyber capability:** Gemini 4 Argon solved all 12 of Google's simulated
  end-to-end cyberattack scenarios (the previous generation solved five), which triggered
  Google's strongest cyber and bio safeguards. External bio red teaming unlocked under 1%
  of sub-tasks (Google, 2026-10-13).
- **Layered containment:** no single layer stops prompt injection. Anthropic describes
  three layers: the environment (sandbox, network egress, credentials), the model's own
  robustness, and limits on external content. The environment is the one that holds
  when the probabilistic layers fail. In practice (May 2026): claude.ai runs code in
  gVisor, Claude Code uses an OS sandbox with network off by default, and Cowork runs in
  a full VM with an egress allowlist. Opus 4.7 had about 0.1% prompt-injection success on
  single attempts and 5–6% after 100 adaptive attempts (Gray Swan). Google reports 0.7%
  for Gemini 4 Argon on Gray Swan's indirect injection benchmark, but after 15 adaptive
  attempts, so the two figures are not directly comparable.
- **Runtime safeguards inside the model:** Google's Argon stack adds activation probes
  (detecting when cyber or bio knowledge is being used) and multi-step monitoring that
  can halt a response, on top of input classifiers (2026-10-13).
- **Decomposed misuse:** refusal checks judge one request at a time, so a harmful
  campaign split into harmless-looking subtasks can get through. Election red teaming of
  Claude in the US, Israel, and Brazil (reported 2026-10-14) found exactly this: single
  harmful requests were reliably refused, split-up campaigns were sometimes missed. The
  fix is account-level, multi-step misuse classifiers and enforcement that look across
  many requests, not stricter per-request refusals. Anthropic also banned a foreign
  fake-news operation and ad-revenue fake-news schemes, and found about 0.002% of sampled
  US conversations violated election-integrity rules.
- **Sandbox escapes get fixed release by release:** Claude Code 2.1.299 (2026-10-14)
  closed symlinked denied paths on macOS and writes into `--plugin-dir`, and made more
  hook failures block actions. 2.1.309 (2026-10-22) closed more (see Current state).
  Keep agent tools current when you rely on their sandbox.
- **Approval fatigue:** when users approve almost every prompt (about 93% in Claude Code,
  per Anthropic), permission prompts stop protecting anyone. Sandboxing that removes most
  prompts is safer than asking more often.

## How to use it

- Grant least privilege: scoped tokens, read-only where possible, no production secrets.
- Run agents in sandboxes or containers; restrict network egress. Prefer hardened
  standard isolation (gVisor, VMs, Seatbelt, bubblewrap) to home-made components.
- Remember that allowed domains can still leak data: an attacker's API key in a workspace
  file can send data to an allowlisted API. Pin outbound credentials to the session.
- Do not parse project files, settings, or hooks before the user has trusted the project.
- Require human approval for destructive or outward-facing actions.
- Keep credentials out of the model's context; inject them at the tool layer.
- Review MCP servers, skills, and plugins before installing them.
- Validate and escape model output before executing or rendering it.
- For organization-wide data-loss prevention, inspect prompts server-side before
  inference. Claude Enterprise's inference hooks (GA 2026-10-20) send every governed
  prompt, and optionally each batch of tool calls, to your own allow/deny server across
  all Claude apps, including Claude Code. They offer shadow mode, gradual rollout, a
  choice between failing open and failing closed, and a circuit breaker. They cannot
  redact content or inspect images, and do not cover API organizations, Bedrock, or
  Vertex. Resellers can confine a safety enforcement action to one end customer with
  Claude API user profiles (see [Claude](../models/claude.md)).
- Keep API keys out of command lines: Claude's SDK majors of 2026-10-21 send keys as
  `Authorization: Bearer`, and the `ant` CLI no longer accepts keys as flag values.
- Audit guardrail decisions: Claude Code 2.1.307 emits a `claude_code.safety_event`
  OpenTelemetry event for every tool call blocked or prompted by guardrails.
- Enable `sandbox.allowNestedUserNamespaces` (Claude Code 2.1.305, Linux) only if you
  need Chromium or rootless podman inside the sandbox; the changelog warns that it
  weakens the sandbox's file protections.
- Set spending and iteration limits.
- Rate-limit agent traffic, restrict which hosts agents can write to, and make agent
  requests identifiable (user agent, contact details) to the sites they visit.

## Current state

- **2026-10-26:** GitHub Copilot's assisted permissions mode is generally available.
  A model approves actions it judges clearly safe and asks the user about the rest.
  Enterprise settings can keep Assisted while blocking Allow All, or turn it off. Like
  Claude Code's auto mode, it is a probabilistic check, not a hard boundary. See
  [coding agents](../tooling/coding-agents.md).
- **2026-10-22:** Claude Code 2.1.309 fixes several sandbox and permission bypasses: on
  macOS and Linux, shell startup files ran outside the sandbox before each command;
  macOS `denyWrite` globs did not apply through symlinks; sandboxed commands could edit
  the `--mcp-config` file; `Edit(path)` deny rules missed some redirects; and worktree
  isolation accepted some locale-prefixed and zsh arithmetic commands. Upgrade before
  relying on the sandbox for unattended runs. The same release stops Claude from writing
  role names as GitHub @-mentions that notified unrelated users.
- **2026-10-22:** Microsoft Agent Framework (Python) 1.23.0 makes AG-UI endpoints declare
  an authorization scope (or single-user mode) and renames the Docker shell's
  `extra_run_args` to `unsafe_extra_run_args`.
- **2026-10-21:** Pydantic AI 2.59.0 / 1.107.9 fix GHSA-4whf-38hw-pxxh (high), where
  hostile HTML fetched by `web_fetch` could slow down the whole process. They also escape
  `SummarizingCompaction` transcripts so tool output cannot forge messages in compacted
  history. Upgrade agents that fetch untrusted pages.
- **2026-10-20:** Anthropic's inference hooks came out of beta for Claude Enterprise
  (see How to use it).

## Open questions

- Is there any complete defence against prompt injection, or only layered mitigations?
  Partly answered (2026-10-09): Anthropic's own figures show a strong model still fails
  5–6% of the time against adaptive attacks, and it relies on sandboxing as the final
  layer. No provider claims a complete defence.
- How reliable is OSS Scanner in practice? The 90% true-positive rate is Anthropic's
  expectation, not a measured result.
- How did Wikimedia attribute the agent activity to OpenAI, and will OpenAI publish an
  account of it? Only Wikimedia's post and secondary commentary are available so far.

## Sources

- [OWASP Top 10 for LLM Applications](../../sources/2026/10/2026-10-04-owasp-top-10-llm.md)
- [Gemini 4 Argon](../../sources/2026/10/2026-10-04-gemini-4-argon.md)
- [Expanding the Cyber Verification Program](../../sources/2026/10/2026-10-07-anthropic-cyber-verification-program.md)
- [OpenAI "rogue" agent activities found on Wikimedia projects](../../sources/2026/10/2026-10-07-wikimedia-openai-rogue-agents.md)
- [Introducing the Anthropic Cyber Mission](../../sources/2026/10/2026-10-09-anthropic-cyber-mission.md)
- [How we contain Claude across products](../../sources/2026/10/2026-10-09-how-anthropic-contains-claude.md)
- [AI Models Can Provably Hide Arbitrary Capabilities](../../sources/2026/10/2026-10-13-ai-models-hide-capabilities.md)
- [Developing Gemini 4 Argon responsibly and safely](../../sources/2026/10/2026-10-14-gemini-4-argon-safety.md)
- [Preparing for the 2026 US midterms](../../sources/2026/10/2026-10-15-anthropic-2026-us-midterms.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Inference hooks (Claude docs)](../../sources/2026/10/2026-10-21-claude-inference-hooks-ga.md)
- [Pydantic AI v2.59.0](../../sources/2026/10/2026-10-22-pydantic-ai-v2-59.md)
- [Claude Code releases 2.1.308 and 2.1.309](../../sources/2026/10/2026-10-23-claude-code-2-1-308-309.md)
- [Migrating to API version 2026-10-21](../../sources/2026/10/2026-10-22-claude-api-version-2026-10-21.md)
- [Claude Code release 2.1.307](../../sources/2026/10/2026-10-22-claude-code-2-1-307.md)
- [Claude Code releases 2.1.305 and 2.1.306](../../sources/2026/10/2026-10-21-claude-code-2-1-305-306.md)
- [Microsoft Agent Framework (Python) 1.23.0](../../sources/2026/10/2026-10-23-microsoft-agent-framework-python-1-23.md)
- [GitHub Copilot assisted permissions GA](../../sources/2026/10/2026-10-27-copilot-assisted-permissions-ga.md)
