---
title: "Copilot code review: adaptive effort, secret detection, and more"
url: https://github.blog/changelog/2026-11-17-copilot-code-review-adaptive-effort-secret-detection-and-more
archived:
type: release
author: GitHub
date_published: 2026-11-17
date_added: 2026-11-18
tags: [coding-agents, security]
topics: [tooling/coding-agents]
---

## Summary

Copilot code review (2026-11-17) can now choose its own review depth per pull request,
read related public repositories, and flag secrets in review comments, all in public
preview. Review outcomes appear in repository insights, and Copilot code review for
Azure Repos is generally available.

## Key points

- **Adaptive effort:** Copilot rates each PR's complexity and risk and reviews at Lite,
  Balanced, or Max, showing the level it chose. Pick Adaptive in the Reviewers bar or set
  it as the default at personal, repo, org, or enterprise level; it never exceeds the
  configured maximum. Balanced remains the default otherwise.
- **Cross-repository context:** reviews can read related public repos to find code that
  depends on the change, plus documentation, instructions, and skills stored elsewhere.
- **Secret detection:** turn on under Settings → Copilot → Code review; uses 500+ known
  formats and an ML detector.
- **Repository insights:** Insights → Repository insights shows how review comments
  were addressed.
- Preview features need Copilot Pro, Pro+, Max, Business, or Enterprise.

## Why it matters

Adaptive effort addresses the cost of reviewing the large volume of agent-written PRs:
small changes get a cheap pass and risky ones a deep one, without manual tuning.
