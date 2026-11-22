---
title: "Model Context Protocol (MCP)"
tags: [mcp, tool-use, security]
related: [agents/tool-use, tooling/skills, practices/security]
last_reviewed: 2026-11-22
---

## Overview

MCP is an open protocol for connecting AI applications to tools and data. A service
builds one MCP server; any MCP-capable client (Claude, ChatGPT, IDEs, coding agents,
custom agents) can use it. Anthropic introduced it in November 2024; within a year it was
the de facto standard, with official SDKs in many languages.

## Key concepts

- **Host / client / server:** the host app (for example Claude Code) runs a client that
  connects to each server.
- **Primitives:** *tools* (functions the model can call), *resources* (data the app can
  read), *prompts* (reusable templates).
- **Stateless core:** since the 2026-07-28 spec there is no `initialize` handshake and
  no protocol session; each request stands alone, so remote servers can run behind
  ordinary load balancers (routing uses `Mcp-Method` and `Mcp-Name` headers). This was
  the largest revision since launch, so servers and clients built on earlier versions
  need changes.
- **Deprecated features:** the 2026-07-28 spec deprecated Roots, Sampling, and Logging
  with a 12-month removal window, so they may disappear from around July 2027.
- **Scale:** the maintainers reported SDK downloads approaching 500 million a month
  (2026-07-28).
- **Transports:** stdio for local servers; HTTP for remote ones.
- **Authorization:** OAuth-based for remote servers, aligned with OpenID Connect.
- **Extensions:** a formal extensions framework and deprecation policy. Tasks (for
  long-running operations) is an opt-in extension. Client support: Claude Code 2.1.319
  and the TypeScript Agent SDK 0.3.319 (2026-11-06) move a tool call that the server runs
  as a task to the background at once and report the result when it finishes, so the
  agent keeps working. In the SDK this needs `CLAUDE_AUTO_BACKGROUND_TASKS=1` and
  streaming input.
- **Files (experimental):** the proposed `io.modelcontextprotocol/files` extension
  (blog post 2026-11-10) moves file bytes outside the model. A tool argument marked
  `x-mcp-file` gets only metadata; the server answers `upload_required` with HTTPS upload
  targets and a `requestState`, the client uploads and retries the call; downloads come as
  targets in the result's `_meta`, checked by size and SHA-256 digest. Credentials go only
  to the server's own origin. No reference implementation or SDK support yet; the
  maintainers aim to stabilise it by the end of 2026.
- **MCP Apps:** servers can render interactive HTML UIs in a sandboxed iframe. Since VS
  Code 1.145 (2026-11-04), MCP apps can also register tools the model can call.
- **Declaring servers as dependencies:** Microsoft's APM lists MCP servers by registry
  ID (for example `io.github.github/github-mcp-server`) in `apm.yml` next to skills,
  installs them into each supported agent, and checks them against an `apm-policy.yml`;
  Dependabot can update them (see [skills](skills.md)).
- **Admin allowlists:** in VS Code 1.145 an enterprise `allowedMcpServers` list overrides
  the registry-only restriction (`[]` blocks all; `deniedMcpServers` still wins).
- **MCP connector:** some APIs (including Claude's) can connect to remote MCP servers directly.
- **Hosted connectors:** clients increasingly offer a curated list of hosted servers you
  sign in to once, instead of installing servers yourself. Claude has connectors, and
  since 2026-10-28 GitHub Copilot has "connectors" (GitHub-verified MCP servers, public
  preview): 26 services such as Slack, Figma, Notion, Sentry, and Linear, shared across
  the Copilot app, Copilot CLI (`/mcp` → **Connectors**), VS Code, cloud sessions, and
  GitHub Mobile (all plans; Business and Enterprise need the `Editor preview features`
  policy). Eight more were added on 2026-11-18 (Box, Buildkite, Calendly, ClickUp,
  Mixpanel, Supabase, Webflow, Wix); enterprises that allowlist MCP servers one by one
  must add them. VS Code's customizations browser lists MCP servers next to skills and plugins.
- **Adoption of the stateless spec:** Claude Code negotiates the 2026-07-28 protocol by
  default for local stdio servers since 2.1.292 (2026-10-06; opt out with
  `MCP_PROTOCOL_NEGOTIATION=legacy`, and servers that do not answer fall back to the old
  handshake), and for cloud session and Remote Control connectors since 2.1.299
  (2026-10-14). Google ADK for Python supports MCP SDK 2.x as an opt-in (2.11,
  2026-10-02), and Microsoft Agent Framework (Python) moved to MCP 2.x as a breaking
  change in 1.23.0 (2026-10-22): new transports, errors, and schemas, and separate
  caller-owned and framework-owned client lifecycles. Some servers on the new spec omit `resultType`, `ttlMs`,
  or `cacheScope`, so clients must tolerate their absence (Claude Code fixed this in
  2.1.302).
- **Client behaviour in Claude Code:** MCP permission rules match exact server names
  (`mcp__a` no longer matches `a__b`), and policy-blocked servers are not contacted
  (2.1.299). Tool descriptions are capped at 4,096 characters by default. After a
  dropped connection, an HTTP tool call is retried only if the tool is read-only or
  idempotent (2.1.307). Cloud sessions do not wait for a plugin's stdio servers unless
  the server sets `alwaysLoad: true`, and tool search is on by default behind a custom
  `ANTHROPIC_BASE_URL` (2.1.304). Since 2.1.309 sandboxed commands cannot modify the
  `--mcp-config` file, and a disabled server is no longer reconnected by a later
  permission prompt. Headless runs recover servers after sleep (2.1.307) and do not
  repeat a call that timed out waiting for an unanswered elicitation (2.1.310). Since
  2.1.314 (2026-10-30), servers that also work signed out are used without sign-in when
  their stored sign-in breaks. For organizations: since 2.1.305, `allowedMcpServers` no
  longer filters `managed-mcp.json` stdio servers that use `${VAR}` only in `env`, so
  list servers you mean to block in `deniedMcpServers`. Since 2.1.323 (2026-11-12)
  Claude asks you to confirm before finishing an MCP server sign-in, even in auto and
  bypass modes, and project `.mcp.json` approvals must match the server's exact name.
  2.1.327 (2026-11-17) stopped project-scope `claude mcp add` and `remove` from deleting
  other top-level keys such as `$schema` from `.mcp.json`; 2.1.328 lets `mcp_tool` hooks
  fail closed with `"onFailure": "block"`; and since 2.1.329 (2026-11-19) `/mcp` shows a
  remote HTTP server's JSON-RPC refusal error as a "Server message" row, which helps
  debug auth and connection failures.
- **Client behaviour in Codex:** since Codex CLI 0.164.0 (2026-10-23) MCP connections
  can sign in with Codex account grants or a dedicated sign-in, including OAuth clients
  that need a secret; tool-list changes apply within a turn, and coordinated OAuth
  refresh is on by default. [Codex CLI 0.170.0](https://github.com/openai/codex/releases/tag/rust-v0.170.0)
  (2026-11-18) adds experimental support for identically named MCP servers across
  environments.
- **Deferred loading:** the Gemini API's tool retrieval (preview, 2026-11-19) accepts
  `defer_loading` on remote MCP servers, so their schemas load only when needed (see
  [tool use](../agents/tool-use.md)).
- **Notable new servers (October 2026):** MCPtoCodeMode (MIT) puts all your MCP servers
  behind three tools (`search`, `describe`, `execute`); the model writes JavaScript that
  runs in a QuickJS sandbox with no network or filesystem, and the project claims about
  5.7× fewer input tokens (self-reported). Graphicle (pre-release) gives coding agents
  code-graph tools (`query_graph`, `get_neighbors`, `shortest_path`) and memory tools
  (see [memory](../agents/memory.md)). stalemap's `search_changes` tool reports
  dependency changes after a model's cutoff (`npx -y stalemap@latest mcp`; see
  [coding agents](coding-agents.md)). Context Mode (Elastic License 2.0, about 32,000
  stars) handles the output side. It runs large tool calls in a sandbox
  (`ctx_execute`, 12 runtimes) and returns only stdout. It indexes fetched pages for
  search and keeps session events in SQLite so work state survives compaction
  ([memory](../agents/memory.md)). It claims about 98% less output in one example
  (self-reported). codebase-memory-mcp (MIT, about 48K stars) is a local server with 17
  tools (`trace_path`, `detect_changes`, `get_architecture`, and others) over a
  persistent graph of code, docs, and infrastructure, with no API key. XERJ
  (Apache-2.0 engine, about 19K stars on 2026-11-16) is a single Rust binary that indexes
  code, docs, logs, CSV/JSONL, and PDFs locally and serves BM25, vector, and hybrid
  search through an Elasticsearch-compatible API and a stdio MCP server (`xerj_search`,
  `xerj_def`); its token-saving figures are self-reported, and its optional Query-1
  answer model is proprietary.
- **Notable new servers (November 2026):** REA (`npx rea-agents setup`) lets agents
  reverse engineer binaries, Electron apps, APKs, and firmware, using Ghidra, IDA, or
  Hopper for native code; install only from `morluto/rea`, as look-alike repos exist
  (see [security](../practices/security.md)). rust-anything
  (`cargo install rust-anything && rust-anything setup` registers it in Claude Code,
  Codex, Cursor, Gemini CLI, and OpenCode) gives agents record, replay, and diff tools
  for porting code to Rust (see [coding agents](coding-agents.md)). Scrapling (about
  101,000 stars) and Context7 (about 64,500) were rising in GitHub trends on 2026-11-11
  (see How to use it).

## How to use it

- Use existing servers for common services before writing your own.
- Install only servers you trust; a server's tool descriptions and outputs go straight
  into the model's context (see [security](../practices/security.md)).
- Keep tool lists small; prefer clients that load tools on demand. With many servers, a
  "code mode" proxy such as MCPtoCodeMode exposes only search/describe/execute tools and
  lets the model chain calls in sandboxed code. Add it to Claude Code with
  `claude mcp add codemode -- npx -y mcptocodemode serve`, or run
  `npx -y mcptocodemode setup` for other agents.
- If tool *results* (logs, test output, web pages) are what fill your context, try
  Context Mode: `claude mcp add context-mode -- npx -y context-mode`, or install it as a
  plugin (`/plugin marketplace add mksglu/context-mode`) to get its routing hooks.
- For front-end work, let the agent check pages itself with Google's Chrome DevTools MCP
  (`/plugin marketplace add ChromeDevTools/chrome-devtools-mcp`, or
  `claude mcp add chrome-devtools -- npx -y chrome-devtools-mcp@latest`): performance
  traces, console, network, screenshots. Add `--no-usage-statistics` to stop telemetry.
- For Apple-platform work on a Mac, install Apple's plugin
  (`claude plugin install xcode@claude-plugins-official`) rather than wiring
  `xcrun mcpbridge` by hand; it uses the MCP server of your installed Xcode. It is the
  first official marketplace entry whose source is a local command
  (`xcrun agent plugin path --plugin-format claude`) rather than a Git repo.
- To let an agent test Windows software on a clean, throwaway machine, try
  sandbox-mcp (MIT; Windows 11 Pro or Enterprise 24H2 and later only). Unzip the
  portable release, run `.\sbx.cmd doctor`, then add `src\server.js` as a stdio server.
  Its `sandbox_run` tool boots Windows Sandbox, deploys and drives the app, collects
  evidence, and destroys the machine.
- For scraping beyond what built-in web fetch handles (logins, blocking sites, a page's
  background API calls), use Scrapling's MCP server: `pip install "scrapling[ai]"`,
  `scrapling install`, then `claude mcp add ScraplingServer "$(which scrapling-mcp)"`.
  Keep `main_content_only` on: it strips hidden text and zero-width characters that are
  common prompt-injection carriers.
- To give an agent current library docs, use Context7: `npx ctx7 setup --claude`
  installs a skill and CLI (no MCP needed), or add the remote MCP server
  `https://mcp.context7.com/mcp` with a bearer API key. Queries go to Upstash's hosted
  service.
- Keep reference servers up to date. `mcp-server-git` before 2026.11.11 runs commands
  from a repository's own `.git/config` even on read-only calls such as `git_status`
  (High, fixed 2026-11-11). If you launch servers with `uvx`, pin
  `mcp-server-git>=2026.11.11` so a cached old version is not reused.
- For local search over a big repo plus its logs and docs, try XERJ: install the binary
  (`curl -fsSL https://xerj.org/get | sh`; read the script first), start a node with
  `xerj --insecure --data-dir ~/xerj-data &` (localhost, single user only), run
  `xerj autoindex ~/my-project`, then `claude mcp add xerj -- /absolute/path/to/xerj mcp`.
- When a server needs a token in its config, add it in Claude Code with
  `claude mcp add-json <name> -` and paste the JSON on stdin (2.1.327 and later), so the
  token stays out of shell history.
- Build a server when you want one integration usable from many AI clients.
- Spec releases now follow a fixed six-month schedule (last Tuesday of March and
  September; next `2027-03-30`). Test the Tier 1 SDK betas about six weeks before each
  release.

## Current state

- **2026-11-20:** Deferred tool loading for MCP servers is spreading across vendors
  (Gemini API preview; see [tool use](../agents/tool-use.md)).
- **2026-11-19:** GitHub Copilot connectors, including the eight added on 2026-11-18,
  are still in public preview. GitHub Copilot Evals (preview) can test MCP tools (see
  [evals](../practices/evals.md)).
- **2026-11-13:** The file upload and download extension is a draft (2026-11-10; see Key
  concepts); the maintainers aim to stabilise it by the end of 2026.
- **2026-11-12:** Reference servers fixed six advisories in 2026.11.11 (see How to use
  it), and the spec moved to a six-month release cycle (SEP-3398); the next version is
  `2027-03-30`.

## Open questions

- How quickly clients and servers migrate to the stateless spec. Partly answered: Google
  ADK supports MCP SDK 2.x only as an opt-in (2026-10-02), while Claude Code has used the
  new protocol by default for local servers since 2026-10-06 and for its cloud and
  Remote Control connectors since 2026-10-14. Microsoft Agent Framework (Python) moved to
  MCP 2.x in 1.23.0 (2026-10-22). Checked 2026-10-26: the Codex 0.164 and ADK 2.13
  release notes do not mention the 2026-07-28 protocol, and modelcontextprotocol.io has
  no client support matrix. Still unknown: other major clients, and how many servers
  support it.

## Sources

- [The 2026-07-28 MCP specification](../../sources/2026/10/2026-10-04-mcp-spec-2026-07-28.md)
- [Google ADK (Python) v2.11.0](../../sources/2026/10/2026-10-04-google-adk-python-v2-11.md)
- [Claude Code 2.1.292 to 2.1.296](../../sources/2026/10/2026-10-12-claude-code-2-1-292-296.md)
- [Claude Code releases 2.1.299 and 2.1.300](../../sources/2026/10/2026-10-15-claude-code-2-1-299-300.md)
- [Claude Code releases 2.1.302 and 2.1.303](../../sources/2026/10/2026-10-19-claude-code-2-1-302-303.md)
- [Claude Code release 2.1.304](../../sources/2026/10/2026-10-20-claude-code-2-1-304.md)
- [Graphicle: code graph and memory for coding agents](../../sources/2026/10/2026-10-20-graphicle-code-graph-memory-mcp.md)
- [Claude Code releases 2.1.305 and 2.1.306](../../sources/2026/10/2026-10-21-claude-code-2-1-305-306.md)
- [Claude Code release 2.1.307](../../sources/2026/10/2026-10-22-claude-code-2-1-307.md)
- [stalemap](../../sources/2026/10/2026-10-22-stalemap-post-cutoff-dependency-changes.md)
- [MCPtoCodeMode](../../sources/2026/10/2026-10-23-mcptocodemode-mcp-code-mode-proxy.md)
- [Microsoft Agent Framework (Python) 1.23.0](../../sources/2026/10/2026-10-23-microsoft-agent-framework-python-1-23.md)
- [Claude Code releases 2.1.308 and 2.1.309](../../sources/2026/10/2026-10-23-claude-code-2-1-308-309.md)
- [Codex CLI 0.164.0](../../sources/2026/10/2026-10-26-codex-cli-0-164-presets.md)
- [Context Mode](../../sources/2026/10/2026-10-26-context-mode-tool-output-sandbox.md)
- [Google ADK (Python) v2.13.0](../../sources/2026/10/2026-10-26-google-adk-python-v2-13.md)
- [Copilot connectors](../../sources/2026/10/2026-10-29-copilot-connectors-verified-mcp.md)
- [Copilot in VS Code: Universe 2026](../../sources/2026/10/2026-10-29-copilot-vscode-universe-agent-host.md)
- [codebase-memory-mcp](../../sources/2026/10/2026-10-30-codebase-memory-mcp-code-graph.md)
- [APM: Agent Package Manager](../../sources/2026/11/2026-11-04-apm-agent-package-manager.md)
- [VS Code 1.145](../../sources/2026/11/2026-11-05-vscode-1-145-agents-mcp.md)
- [Chrome DevTools MCP](../../sources/2026/11/2026-11-05-chrome-devtools-mcp.md)
- [Apple's Xcode plugin for Claude Code](../../sources/2026/11/2026-11-06-apple-xcode-plugin-claude-code.md)
- [Claude Code release 2.1.319](../../sources/2026/11/2026-11-09-claude-code-2-1-319.md)
- [Claude Agent SDK (TypeScript) v0.3.319](../../sources/2026/11/2026-11-09-claude-agent-sdk-ts-0-3-319.md)
- [sandbox-mcp](../../sources/2026/11/2026-11-09-sandbox-mcp-windows-sandbox.md)
- [Scrapling: web scraping framework with an MCP server and agent skill](../../sources/2026/11/2026-11-11-scrapling-mcp-server-and-skill.md)
- [Context7: up-to-date library docs for coding agents](../../sources/2026/11/2026-11-11-context7-docs-for-coding-agents.md)
- [MCP reference servers 2026.11.11: security fixes](../../sources/2026/11/2026-11-12-mcp-git-filesystem-servers-security-fixes.md)
- [A More Predictable Release Cycle for MCP](../../sources/2026/11/2026-11-12-mcp-six-month-release-cycle.md)
- [Exploring File Uploads and Downloads in MCP](../../sources/2026/11/2026-11-13-mcp-file-uploads-extension.md)
- [XERJ: local search engine and MCP server for agents](../../sources/2026/11/2026-11-16-xerj-local-search-mcp-server.md)
- [Claude Code release 2.1.327](../../sources/2026/11/2026-11-18-claude-code-2-1-327.md)
- [GitHub Copilot Evals is now in public preview](../../sources/2026/11/2026-11-18-github-copilot-evals-preview.md)
- [Claude Code release 2.1.328](../../sources/2026/11/2026-11-19-claude-code-2-1-328.md)
- [Connect Supabase, Box, Calendly, and more to Copilot](../../sources/2026/11/2026-11-19-copilot-connectors-supabase-box-calendly.md)
- [REA: reverse engineering with agents](../../sources/2026/11/2026-11-19-rea-reverse-engineering-agents.md)
- [Claude Code release 2.1.329](../../sources/2026/11/2026-11-20-claude-code-2-1-329.md)
- [rust-anything: incremental Rust rewrites](../../sources/2026/11/2026-11-20-rust-anything-incremental-rust-rewrites.md)
