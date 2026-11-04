---
title: "APM: Agent Package Manager"
url: https://microsoft.github.io/apm/
archived:
type: docs
author: Microsoft
date_published:
date_added: 2026-11-04
tags: [skills, plugins, mcp, cli, security, open-source]
topics: [tooling/skills, tooling/mcp]
---

## Summary

APM is Microsoft's open-source dependency manager for agent context, described as "like
npm for agent context". A project lists the skills, prompts, instructions, plugins, and
MCP servers it needs in `apm.yml`, and `apm install` deploys them to each developer's
coding agents, with a lockfile that pins exact content. The docs page has no publication
date; it is noted now because GitHub added Dependabot support for it on 2026-11-03.

## Key points

- **Install the CLI:** Homebrew, a shell script (Linux/macOS), PowerShell (Windows), pip,
  or Scoop; see the install page linked from the docs.
- **Use it:** add an `apm.yml` at the repo root and run `apm install`, or install one
  package directly with `apm install <owner>/<repo>`. Example manifest:

  ```yaml
  name: my-project
  version: 1.0.0
  dependencies:
    apm:
      - anthropics/skills/skills/frontend-design
      - github/awesome-copilot/plugins/context-engineering#v2.1
      - git: https://gitlab.com/acme/coding-standards.git
        path: instructions/security
        ref: v2.0
    mcp:
      - io.github.github/github-mcp-server
  ```

- **Targets:** GitHub Copilot, Claude Code, Codex, Cursor, Gemini, OpenCode, Windsurf,
  Kiro, and Grok Build; each gets the parts it supports.
- **Sources:** GitHub, GitLab, Azure DevOps, Bitbucket, Gitea, or any git server, pinned
  to a tag or ref. MCP servers can be named by registry ID.
- **Lockfile:** `apm.lock.yaml` pins versions and content hashes so a fresh clone gets
  byte-identical content.
- **Security:** every install scans for hidden Unicode, MCP servers are checked against
  policy, and an `apm-policy.yml` can enforce rules at install time.
- **Good for:** sharing one set of team skills and MCP servers across several agents
  and keeping them updated, now including Dependabot PRs (see
  [Dependabot APM support](2026-11-04-dependabot-apm-version-updates.md)).

## Why it matters

Skills and MCP servers have been installed per agent and per machine. APM treats them as
versioned, locked project dependencies, which makes them reproducible and reviewable
like code.
