---
title: "Powering the Agent Development Lifecycle with any framework, from ADK to LangChain and beyond"
url: https://developers.googleblog.com/powering-the-agent-development-lifecycle-with-any-framework-from-adk-to-langchain-and-beyond/
archived:
type: article
author: Google
date_published: 2026-10-21
date_added: 2026-10-22
tags: [google, frameworks, cli, deployment, plugins]
topics: [frameworks/landscape]
---

## Summary

Google's Agents CLI scaffolds, runs, evaluates, and deploys agents on Google Cloud. Its
extension system (added in 1.5.0, labelled experimental in 1.8.0) lets teams override
built-in commands or add new ones. The first official extension is a LangChain template,
which lets a LangChain or LangGraph agent use the same scaffold, run, and deploy
workflow without the Agent Development Kit (ADK).

## Key points

- **Install:** `uvx google-agents-cli setup`.
- **LangChain agent on Cloud Run:**
  `agents-cli create my-agent --agent google/agents-cli/extensions/langchain/template@v1.8.0 -d cloud_run`,
  then `agents-cli install`, `agents-cli run "..."`, `agents-cli playground` (a
  LangGraph dev server on port 8080), and `agents-cli deploy`. The ADK-only commands
  `eval dataset` and `eval optimize` refuse to run and explain why.
- **Extensions:** an extension is a directory in any Git repository with an
  `agents-cli-extension.yaml` manifest. There is no central registry. Add one with
  `agents-cli extension add <owner/repo#name>` (or `local@<path>`). Scope is per project
  (default, committed) or `--global`, and project scope wins.
- **Pinning:** a lockfile pins each extension to a commit SHA, and
  `agents-cli extension update` moves the pin forward. Help output marks overridden
  commands with `[↑ <extension>]`.
- **Platform policy:** the example `sbom-deploy` extension runs syft and grype before
  the native deploy and fails it on critical findings. Extensions call the native
  command with `AGENTS_CLI_DISABLE_OVERRIDES=1` to avoid loops.

## Why it matters

Google is decoupling its agent deployment tooling from ADK. Teams can keep LangGraph and
still use Google's scaffold, evaluation, and deploy workflow. Platform teams also get a
supported way to enforce checks such as SBOM scans in every deploy.
