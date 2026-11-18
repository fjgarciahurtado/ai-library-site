---
title: "Let GitHub Copilot interact with your browser"
url: https://github.blog/changelog/2026-11-17-let-github-copilot-interact-with-your-browser
archived:
type: release
author: GitHub
date_published: 2026-11-17
date_added: 2026-11-18
tags: [coding-agents, computer-use, plugins, cli, ide]
topics: [tooling/coding-agents]
---

## Summary

GitHub Copilot can now drive your own Chrome browser (public preview, 2026-11-17)
through the GitHub Copilot Chrome extension. It works in the Copilot CLI, the Copilot
app, VS Code, and JetBrains IDEs, and can be combined with computer use. GitHub pitches
it for debugging web apps live, automating browser tests, and multistep web tasks in the
browser you are already signed in to.

## Key points

- **Install:** add the GitHub Copilot extension to Chrome (the Copilot app post says any
  Chromium browser, such as Edge, works).
- **Enable in Copilot CLI:** run `/plugin`, find browser use, enable it, and start a new
  session.
- **Enable in the Copilot app:** Settings → Computer Use → turn on Enable Browser Use
  (and Enable Computer Use). It is off by default and runs in an isolated tab group.
- **Enable in VS Code or JetBrains:** Settings → turn on Enable Browser Use.
- Open the extension and check that it shows "connected", then ask Copilot to do a
  browser task. Permission levels are set in the extension's settings.
- Good for: reproducing UI bugs, checking a page after a change, filling forms, and
  pulling data from signed-in pages. Docs: gh.io/about-browser-use.

## Why it matters

Browser control in the user's real, signed-in browser is now built into Copilot on every
surface, much like Claude in Chrome for Claude Code. Because it uses live sessions,
treat its permission levels like any agent with access to your accounts.
