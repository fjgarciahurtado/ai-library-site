---
title: "Self-hosted Claude Managed Agents"
url: https://platform.claude.com/docs/en/managed-agents/self-hosted
archived:
type: docs
author: Anthropic
date_published: 2026-11-12
date_added: 2026-11-13
tags: [anthropic, agents, deployment, security, frameworks]
topics: [frameworks/landscape, models/claude]
---

## Summary

Since 2026-11-12, organizations can run the whole Claude Managed Agents service on their
own infrastructure, not only the sandboxes. The self-hosted server stores agents, sessions,
and session history in your own PostgreSQL database and sends model calls to the Claude API
or to another provider you choose. Access is by request through the Anthropic account team.

## Key points

- **Three options:** cloud sandboxes (Anthropic hosts everything), self-hosted sandboxes
  (you host the tool sandboxes), and self-hosted Managed Agents (you host sandboxes and the
  service; the model runs at Anthropic or your chosen provider).
- **Components:** `cma-server` (API, agent loop, storage; never runs shell or file tools),
  PostgreSQL 16+ (without it, data lives in memory and is lost on restart), workers
  (`ant beta:worker` or an SDK worker) that run tools in your sandboxes, a web console with
  sign-in through your identity provider, and the `cma-server-admin` CLI (Linux x86-64 and
  Arm, macOS on Apple silicon).
- **Inference providers:** Claude API (default), Amazon Bedrock, Claude on Google Cloud
  (Google managed), Microsoft Foundry, or your own model gateway.
- **Same API:** the SDKs and `ant` CLI work against your server; a "differences" page lists
  features only the hosted service has.
- **Security is yours:** the `bash` tool is a real shell with the worker's permissions.
  The Docker Compose stack and `cma-sandboxes` Helm chart give each session its own
  container or pod; each trust level needs its own deployment.
- **Data:** each model call sends the conversation (including tool inputs and results) to
  the inference provider; calls to the Claude API also carry session, agent, and
  environment IDs.
- Each release includes `operator-guide.md`, which the docs suggest giving to Claude so it
  can help configure the server. Licensed under a separate server software agreement.

## Why it matters

It removes the main blocker for regulated teams that liked Managed Agents but could not
store agent sessions with Anthropic or had to route inference through Bedrock, Google
Cloud, Foundry, or an internal gateway.
