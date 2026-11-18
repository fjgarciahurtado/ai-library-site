---
title: "Secret scanning on demand for developers and agents"
url: https://github.blog/changelog/2026-11-17-secret-scanning-on-demand-for-developers-and-agents
archived:
type: release
author: GitHub
date_published: 2026-11-17
date_added: 2026-11-18
tags: [security, coding-agents, cli, sdk]
topics: [practices/security]
---

## Summary

Copilot's security review specialist can now run GitHub's secret scanning detectors
alongside its LLM review (public preview, 2026-11-17). It checks your changes, not the
repository history, for over 500 known secret formats and uses a fine-tuned model for
credentials without a fixed format, such as passwords in connection strings.

## Key points

- **Run it:** in the Copilot CLI or app, type `/security-review`; agents can delegate to
  it through the `task` tool with `agent_type: "security-review"`. In the Copilot SDK,
  call `session.rpc.tasks.startAgent` with `agentType: "security-review"`.
- **Enable (off by default):** CLI `/settings aiSecretDetection on`; app Settings →
  Experimental → AI secret detection; SDK feature flag
  `SECURITY_REVIEW_FINE_TUNED_MODEL=true`; code review: repository Settings → Copilot →
  Code review → Secret scanning.
- No extra plan needed beyond Copilot security or code review; scans use AI credits
  under the Secret Protection AI Credit SKU.
- Good for: a pre-commit check before an agent's branch is pushed.

## Why it matters

Agents that write config and integration code often paste credentials. A detector the
agent itself can call closes that gap before the push, not after the leak.
