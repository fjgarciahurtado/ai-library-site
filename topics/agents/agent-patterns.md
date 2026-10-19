---
title: "Agent patterns"
tags: [agents, multi-agent, tool-use]
related: [agents/tool-use, agents/memory, tooling/coding-agents, frameworks/landscape]
last_reviewed: 2026-10-19
---

## Overview

An agent is an LLM that works in a loop: it decides what to do, uses tools, observes the
results, and continues until the task is done. Agents suit open-ended tasks whose steps
cannot be predicted. For predictable tasks, a fixed workflow is cheaper and more reliable.

## Key concepts

- **Augmented LLM:** the building block: a model with tools, retrieval, and memory.
- **Agent loop (ReAct):** think, act (call a tool), observe, repeat.
- **Workflows vs agents:** in workflows your code decides the path; in agents the model does.
- **Workflow patterns:**
  - *Prompt chaining:* fixed sequence of steps, with checks in between.
  - *Routing:* classify the input, then send it to a specialised prompt or model.
  - *Parallelisation:* split into independent parts, or run several attempts and vote.
  - *Orchestrator-workers:* a lead model splits work dynamically and delegates.
  - *Evaluator-optimiser:* one model drafts, another critiques, repeat until good.
- **Multi-agent systems:** a lead agent delegates to subagents with their own context
  windows. Useful when work fans out (research across many sources) or would overflow
  one context; costs more tokens.
- **Harness:** the code around the model: loop, tools, context management, permissions.
  Examples: Claude Agent SDK, Claude Code, Managed Agents, framework runtimes.
- **Human in the loop:** approval steps before risky actions.
- **Human-steered research agent:** a domain expert sets the goal and judges results,
  while the agent chains database queries, model calls, and literature search over a
  long multi-turn session. A shared canvas (for example a 3D structure viewer both can
  annotate) keeps human and agent looking at the same evidence.
- **Parallel review with voting:** several agents look for problems independently, a
  separate group votes on each finding, and only confirmed findings are reported. This
  combines parallelisation (voting) with evaluator-optimiser, and cuts noise. A round cap
  stops the evaluator-optimiser loop from running forever on old issues. Anthropic uses
  this for code review (2026-10-15; see [coding agents](../tooling/coding-agents.md)).

## How to use it

1. Start with a single call; move to a workflow; use an agent only when needed.
2. Check: is the task complex, valuable enough, within the model's ability, and are
   errors recoverable (tests, review, rollback)?
3. Spend most effort on tool design and the task description.
4. Give agents a way to verify their own work (tests, checks, a grader).
5. Log every step; read transcripts to find failures.

## Current state

- **2026-10-15:** The Claude Code team's code reviewer runs parallel bug-hunting agents
  and a voting step. After one PR went through over fifty overnight review rounds, a
  three-round cap and diff-only re-review cut PRs needing five or more rounds from 8.9%
  to 1.5%.
- **2026-10-15:** Google DeepMind used its Antigravity agent platform to search UniProt
  for antimicrobial peptides. The agent shortlisted a novel 97-amino-acid bacteriocin,
  gathered structural and genomic evidence, and drafted a wet-lab plan. Candidates are in
  lab validation, with no results yet.
- **2026-10-04:** Long-running agents (hours of autonomous work) are now practical with
  frontier models. Vendors offer hosted agent runtimes (for example Anthropic's Managed
  Agents, with scheduled runs and "outcomes" graded against a rubric).

## Open questions

- Reliable ways to evaluate long-horizon agents.

## Sources

- [Building effective agents](../../sources/2026/10/2026-10-04-building-effective-agents.md)
- [ReAct](../../sources/2026/10/2026-10-04-react-reasoning-and-acting.md)
- [Antimicrobial peptides with Google Antigravity](../../sources/2026/10/2026-10-16-deepmind-antimicrobial-peptides-antigravity.md)
- [How the Claude Code team does code review](../../sources/2026/10/2026-10-19-claude-code-team-code-review.md)
