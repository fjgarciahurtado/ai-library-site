---
title: "webframe: run a web page like a program"
url: https://github.com/tractordev/webframe
archived:
type: repo
author: Jeff Lindsay (tractordev)
date_published: 2026-10-26
date_added: 2026-10-27
tags: [tool-use, cli, open-source, coding-agents]
topics: [agents/tool-use]
---

## Summary

webframe is a small Go command-line tool (MIT licence) that loads a URL or local HTML file
in a hidden system web view. It sends `console` output to stdout and exceptions to stderr,
and it can evaluate JavaScript read from stdin. It uses the browser engine already on
the system (WKWebView, WebKitGTK, or WebView2), so unlike Playwright-based tools it does
not download a browser. Simon Willison had Claude Opus 5.5 evaluate it as a scraper and
a sandbox on 2026-10-26. `date_published` is the date of that write-up, not of the repo.

## Key points

- **Install:** `go install tractor.dev/webframe/cmd/webframe@latest` (Go 1.27+), or a zip
  from the releases page, or Docker (`docker run --rm webframe https://example.com`).
  Linux needs WebKitGTK 4.1 or 6.0 and a display or Xvfb. Windows needs the WebView2
  runtime.
- **Scrape with JS:** `echo 'document.title' | webframe -c https://example.com` runs each
  line from stdin in the page (`-c` is console mode). `-e` exits with status 1 on the
  first exception, which is useful in scripts. `-w` shows a window and `-d` turns on the
  web inspector.
- **Good for:** giving a coding agent a lightweight way to run browser JavaScript or test
  a static page from the shell. Willison found it fast, comparable to his Playwright-based
  `shot-scraper javascript`.
- **Limits found in the evaluation:** Content Security Policy failures, a 0×0 viewport by
  default, page loads that can hang, no HTTP metadata such as status codes, and few
  browser controls. Do not treat it as a security sandbox for untrusted pages.
- **Maturity:** about 139 stars and one fork when checked on 2026-10-27, so it is a new,
  small project.

Evaluation report: [simonw/research webframe-evaluation](https://github.com/simonw/research/tree/main/webframe-evaluation#readme);
write-up: [simonwillison.net](https://simonwillison.net/2026/Oct/26/webframe-evaluation/).

## Why it matters

It is a lighter way than Playwright to give an agent a real browser engine for simple
scraping and page checks, which suits small machines such as a Raspberry Pi.
