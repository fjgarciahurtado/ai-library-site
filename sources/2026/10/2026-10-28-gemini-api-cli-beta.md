---
title: "Gemini API CLI (gemini-api) beta"
url: https://ai.google.dev/gemini-api/docs/cli
archived:
type: docs
author: Google
date_published: 2026-10-27
date_added: 2026-10-28
tags: [google, cli, coding-agents, tool-use, multimodal]
topics: [models/gemini, agents/tool-use]
---

## Summary

On 2026-10-27 Google released `gemini-api`, an open-source beta command-line client for
the Gemini API. It is a single binary with no dependencies and no state between runs,
built on the Interactions API and aimed at coding agents, scripts, and CI. It can generate
text, images, speech, music, and video, analyse files, and run Gemini managed agents such
as Deep Research from the shell. It is a different tool from Gemini CLI, Google's coding
agent.

## Key points

- **Install:** `curl -fsSL https://raw.githubusercontent.com/google-gemini/gemini-api-cli/main/scripts/install.sh | bash`
  on macOS or Linux, or `go install github.com/google-gemini/gemini-api-cli/cmd/gemini-api@latest`.
  Pin a version with `GEMINI_VERSION` in the install script.
- **Authenticate:** `export GEMINI_API_KEY=...` or `gemini-api configure --api-key ...`
  (stores it in the OS keychain). `gemini-api whoami` shows which credential is in use.
- **Commands:** `generate`, `image`, `tts`, `music`, `video`, `analyze`, `transcribe`,
  `agent run|status|cancel`, plus `files`, `models`, `environments`, `webhooks`, and
  `triggers`. Media commands write files and print the path.
- **Agent-friendly output:** `-o json`, `-o toon`, or `--jq` for machine-readable output,
  `--dry-run` to preview a request, and `--schema` to inspect payloads before building
  `--body`. Streaming commands need `--stream=false` with JSON output.
- **Using it from Claude Code or Codex:** there is no skill package; the guide suggests
  adding a short snippet to `CLAUDE.md` or `AGENTS.md` telling the agent to read
  `gemini-api --help`, check `--schema`, and use `--dry-run -o json` for complex calls.
- **Example:** `gemini-api image "isometric cloud database icon" --out ./db.jpg`, or
  `gemini-api agent run "Compare WebRTC SFUs" --agent deep-research-preview-04-2026 --background --stream=false`.
- **Limits:** inline inputs up to 14 MB raw (use `files upload --wait` for larger),
  uploaded files are deleted after 48 hours, no WebSocket or Live API support.
  Exit codes: 0 ok, 1 runtime or API error, 2 usage error, 3 auth error.
- **Beta:** breaking changes can happen between minor versions, so pin a release in CI.

## Why it matters

It gives any coding agent shell access to Gemini's image, video, speech, and Deep Research
features without an MCP server or SDK code. A Claude Code session can, for example,
generate an asset or start a Deep Research job with one Bash command.
