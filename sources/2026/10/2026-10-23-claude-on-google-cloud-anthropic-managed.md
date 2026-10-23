---
title: "Claude Models on Google Cloud (Anthropic managed)"
url: https://platform.claude.com/docs/en/build-with-claude/claude-models-on-google-cloud/anthropic-managed
archived:
type: docs
author: Anthropic
date_published: 2026-10-22
date_added: 2026-10-23
tags: [anthropic, google, deployment, agents]
topics: [models/claude]
---

## Summary

A new way to use Claude on Google Cloud, launched on 2026-10-22 (Claude platform release
notes). Anthropic runs the Claude API itself, and you reach it through your Google Cloud
project. Google Cloud IAM controls access and Google Cloud Marketplace handles billing.
It sits alongside the existing Google-managed offering (Vertex AI). Fast mode for Opus
5.5 is available from launch.

## Key points

- **Setup:** subscribe to the Marketplace listing and run
  `gcloud services enable claude.googleapis.com ...`. This creates a new, separate
  Anthropic organization; existing organizations, API keys, and Enterprise orgs cannot be
  converted. Grant IAM roles, then set `ANTHROPIC_GOOGLE_CLOUD_PROJECT` and
  `ANTHROPIC_GOOGLE_CLOUD_WORKSPACE_ID`. For Python, install
  `pip install -U "anthropic[google_cloud]"`. Requests go to
  `https://claude.googleapis.com/v1/projects/<project>/locations/global/workspaces/<id>/invoke/v1/messages`.
- **Auth:** Google Cloud credentials only (Application Default Credentials); there are
  no API keys. The SDK ignores `ANTHROPIC_API_KEY` and `ANTHROPIC_BASE_URL` for this
  route.
- **Features:** about the same as the first-party API. That includes tool use (web
  search and fetch, code execution, memory, advisor, MCP connector), Agent Skills, Files,
  prompt caching, thinking, structured outputs, batches, fast mode, and Claude Managed
  Agents (including scheduled deployments and self-hosted sandboxes). Context windows
  match the Claude API.
- **Not supported:** API keys, MCP tunnels, memory stores on self-hosted environments,
  and the pre-built self-hosted sandbox workers in the CLI and SDKs (write your own
  worker against the Environments Work endpoints).
- **Billing:** charges come through Marketplace in Claude Consumption Units
  (1 unit = $0.01) and count towards Google Cloud spend commitments. Rate limits are
  Anthropic's. Anthropic is the data processor, and some services, such as trust and
  safety, run outside Google Cloud. ZDR is available on request.
- **Logging:** Cloud Audit Logs under `claude.googleapis.com`. Data Access logs (most
  routes) are off by default.
- **Managed Agents caveat:** access is checked only when a session or deployment is
  created. Revoking IAM does not stop running sessions or scheduled deployments.

## Why it matters

Google Cloud customers can now get Anthropic's own API, with day-one features such as
fast mode, Managed Agents, and skills, while keeping Google IAM and billing. Moving over
means setting up a new organization: files, skills, and agents do not carry over.
