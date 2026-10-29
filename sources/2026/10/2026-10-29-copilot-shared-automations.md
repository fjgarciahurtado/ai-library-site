---
title: "Shared Copilot Automations for teams"
url: https://github.blog/changelog/2026-10-28-build-shared-workflows-for-your-team-with-copilot-automations
archived:
type: release
author: GitHub
date_published: 2026-10-28
date_added: 2026-10-29
tags: [coding-agents, agents]
topics: [tooling/coding-agents]
---

## Summary

Copilot Automations combine a prompt, triggers, and allowed tools into a workflow that
Copilot runs in the cloud. On 2026-10-28 GitHub began rolling out shared automations that
belong to a repository rather than to one person. Before, automations were personal and
used the creator's identity and AI credits.

## Key points

- **Create one:** on github.com, in the Copilot app, or in VS Code, choose **Shared**
  under **Type** (it cannot be changed later) in any repo where you have write access.
- **Good for:** event-driven team chores, for example reproducing a bug when an issue
  opens, taking screenshots when a PR is marked ready, or investigating an incident when
  monitoring fires. Copilot uses only the tools you allow.
- **Ownership:** read access shows the automation, write access edits it, actions are
  attributed to Copilot, credits are billed to the repo owner, and it keeps running if
  the creator leaves; change history tracks prompt, tool, and trigger edits.
- **Availability:** rolling out to Copilot Pro, Pro+, Max, Business, and Enterprise. For
  organization repos an admin must enable "Allow use of Copilot cloud agent billed to the
  organization".
- Same-day entries add new tools, triggers, and cost controls, automations that "learn
  from outcomes", and management from VS Code; those were not read in detail.

## Why it matters

It is GitHub's equivalent of Claude Code's cloud routines, but owned by the repository,
which suits teams better than personal scheduled agents.
