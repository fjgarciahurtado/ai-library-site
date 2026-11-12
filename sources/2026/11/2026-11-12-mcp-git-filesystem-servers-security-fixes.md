---
title: "MCP reference servers 2026.11.11: security fixes for git, filesystem, and fetch"
url: https://github.com/modelcontextprotocol/servers/security/advisories
archived:
type: release
author: Model Context Protocol
date_published: 2026-11-11
date_added: 2026-11-12
tags: [mcp, security]
topics: [tooling/mcp, practices/security]
---

## Summary

On 2026-11-11 the MCP reference servers repository published six security advisories and
released fixed Python packages stamped 2026.11.11. The most serious, rated High, lets a
repository's own `.git/config` run arbitrary commands through `mcp-server-git`, even
when the agent only calls read-only tools such as `git_status`. The filesystem server
had two path-escape bugs, and the fetch server had two low-severity bypasses.

## Key points

- **Upgrade now:** move `mcp-server-git` (and the filesystem and fetch servers) to
  2026.11.11 or later. With `uvx`, pin `mcp-server-git>=2026.11.11` or clear the cache
  so the new version is fetched. The advisory says there is no other workaround.
- **mcp-server-git, High (GHSA-6hqx-gqrx-c5r2):** Git honours command-bearing keys in the
  repository config (`core.fsmonitor`, `diff.external`, hooks, `gpg.program`, filter
  drivers). A repository whose `.git` folder came from an archive, backup, shared folder,
  or copied workspace can run code with the server's environment and credentials. No
  approval prompt appears, and the tool result looks normal. A plain `git clone` does not
  carry the payload.
- **The fix:** the server now overrides risky settings for every Git command with
  `GIT_CONFIG_COUNT`, disables fsmonitor and repo hooks, adds `--no-ext-diff
  --no-textconv` to diffs, keeps global drivers such as Git LFS working, and refuses to
  run on Git older than 2.31.
- **mcp-server-git, Moderate (GHSA-q74p-4wrc-q7w6):** an incomplete earlier fix still
  allowed escaping the `--repository` confinement.
- **server-filesystem, Moderate (GHSA-7m4x-rv66-mxhh, GHSA-p9cv-8g75-4xcg):**
  `move_file` and a symlink swap after validation could expose files outside the allowed
  directories.
- **mcp-server-fetch, Low (GHSA-3rxj-6jhw-qfv7, GHSA-f9hh-cmx9-2f23):** IPv6 site-local
  addresses were treated as public by the SSRF guard, and robots.txt paths could be
  bypassed through canonicalisation.
- The advisory list does not show patched versions for every advisory; only the git
  advisory names 2026.11.11 explicitly. The other fixes landed in the same release
  commits.

## Why it matters

The reference servers are the default choice in many setups, and the git bug turns any
untrusted working copy into code execution. It is a clear case of a tool that looks
read-only but runs other programs, which is the risk to check in any MCP server.
