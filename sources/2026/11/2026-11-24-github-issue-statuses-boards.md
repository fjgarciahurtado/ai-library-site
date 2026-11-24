---
title: "GitHub issue statuses and repository boards (public preview)"
url: https://github.blog/changelog/2026-11-23-issue-statuses-and-repository-boards-are-in-public-preview
archived:
type: article
author: GitHub
date_published: 2026-11-23
date_added: 2026-11-24
tags: [coding-agents, mcp]
topics: [tooling/coding-agents]
---

## Summary

GitHub Issues gained built-in statuses and a board view for each repository, in public
preview. Statuses change on their own as work moves, including when an issue is
assigned to a coding agent. They can be read and set via GraphQL, REST, and the GitHub
MCP server.

## Key points

- Statuses: Backlog, Todo, In progress, In review, Done, Not planned, Duplicate.
- **Automatic moves:** assigning a person moves an issue to Todo, and assigning an agent
  moves it to In progress. Linking a draft PR moves it to In progress; marking the PR
  ready for review moves it to In review.
- Saved views in a repository can use a board layout grouped by status.
- Statuses are available through GraphQL, REST, and the GitHub MCP server, so an agent
  can read and update them.
- Issue fields can now be added to any issue, whatever its type.

## Why it matters

When you hand issues to Copilot or another agent, the board shows its progress without
manual updates. Agents that use the GitHub MCP server can also move cards themselves.
