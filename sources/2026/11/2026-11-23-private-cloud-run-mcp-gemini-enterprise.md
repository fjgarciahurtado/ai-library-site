---
title: "How to securely connect internal Cloud Run MCP servers to Gemini Enterprise"
url: https://developers.googleblog.com/how-to-securely-connect-internal-cloud-run-mcp-servers-to-gemini-enterprise/
archived:
type: article
author: Neeraj Agrawal (Google Cloud)
date_published: 2026-11-20
date_added: 2026-11-23
tags: [mcp, google, security, deployment]
topics: [tooling/mcp]
---

## Summary

A Google Cloud guide for exposing an MCP server that runs on Cloud Run with
internal-only ingress to Gemini Enterprise agents, without making it public. Traffic
goes through a Google-managed Egress Agent Gateway and Private Google Access or a Private
Service Connect (PSC) endpoint. Every request is checked twice: once by Cloud Run IAM
and once by the user's OAuth token. A companion repo (`MagnIeeT/ge-secure-cloud-run-mcp`)
has the setup.

## Key points

- **Lock down the server:** set Cloud Run ingress to internal only, and grant Cloud Run
  Invoker only to the project's Gemini Enterprise service agent.
- **Network:** a VPC with Private Google Access, a PSC network attachment, and an Egress
  Agent Gateway in Agent-to-Anywhere mode.
- **DNS:** a private Cloud DNS zone that covers only the MCP service's exact hostname. It
  points to the Private Google Access VIP (199.36.153.8) or a PSC endpoint, and is
  peered to the gateway.
- **Two credentials per request:**
  - `X-Serverless-Authorization` carries a Google-signed OIDC token, checked by Cloud
    Run IAM.
  - `Authorization: Bearer` carries the user's OAuth token, checked by the server's own
    middleware.
- **Register and verify:** bind the gateway in the Gemini Enterprise console, then
  register the MCP server with its endpoint and OAuth client. Cloud Logging shows
  whether discovery and tool calls went through the private path.

## Why it matters

It is a concrete pattern for enterprise MCP: keep the server private, authenticate the
platform at the network layer, and authorize the user at the application layer. The
same split applies outside Google Cloud.
