---
title: "Agent Merge watches and fixes pull requests in the cloud"
url: https://github.blog/changelog/2026-10-28-agent-merge-watches-and-fixes-pull-requests-in-the-cloud
archived:
type: release
author: GitHub
date_published: 2026-10-28
date_added: 2026-10-29
tags: [coding-agents, agents]
topics: [tooling/coding-agents]
---

## Summary

Agent Merge, a Copilot feature that keeps a pull request mergeable, is now built into
pull requests on github.com (2026-10-28); it was already in the Copilot app and VS Code.
Copilot watches the PR and, in a cloud development environment, fixes failing Actions
workflows and resolves merge conflicts as they appear.

## Key points

- **Enable it:** in a PR's merge box click **Watch and fix**, then choose failing
  workflows, merge conflicts, or both. To turn it on for all your PRs, enable Agent
  Merge by default in your Copilot settings.
- **Good for:** long-lived PRs that keep going red after rebases or upstream changes.
  Pair it with auto-merge so GitHub merges once all requirements pass.
- **Availability:** paid Copilot plans, subject to organization and enterprise policy.
- Docs: "Get pull requests ready to merge" in GitHub Docs.

## Why it matters

The last mile of a PR (CI fixes, conflicts) is routine work that an agent can do without
a local checkout. It shifts the human role towards reviewing the fix rather than doing it.
