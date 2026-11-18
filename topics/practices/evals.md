---
title: "Evaluating LLM applications"
tags: [evals, prompting, agents]
related: [practices/prompting, agents/agent-patterns]
last_reviewed: 2026-11-18
---

## Overview

An eval is a repeatable test of how well a model, prompt, or agent does a task. Without
evals, changes to prompts, models, or tools are guesswork. Public benchmarks compare
models in general; your own evals tell you what works for your use case.

## Key concepts

- **Eval set:** realistic inputs, ideally drawn from real usage, including hard and edge cases.
- **Grading methods:**
  - *Code-based:* exact match, regex, tests passing, valid JSON. Cheap and reliable.
  - *LLM-as-judge:* a model scores outputs against a rubric. Flexible; check it against
    human judgement.
  - *Human review:* slowest; the reference for subjective quality.
- **Agent evals:** judge the final outcome (did the tests pass, was the task done) more
  than the exact path; read transcripts to understand failures.
- **Train / test split:** keep a held-out set so prompt tuning does not overfit.
- **Variance:** outputs vary between runs; run each case several times.
- **Common benchmarks:** SWE-bench (coding), Terminal-Bench (command-line work), GPQA
  (science), tau-bench (tool-using agents), OSWorld (computer use), Humanity's Last
  Exam. Benchmarks saturate and leak into training data, so treat them as rough guides.
  By 2026, agentic benchmarks (long coding tasks, computer use, multi-hour work) had
  replaced static quizzes as the headline comparisons for frontier models.
- **Limits of capability evals:** dangerous-capability evals try to elicit what a model
  can do. "AI Models Can Provably Hide Arbitrary Capabilities" (arXiv, 2026-10-09) embeds
  encrypted networks in model weights that run only on a secret trigger. A
  proof-of-concept on a CBRN proxy task resisted fine-tuning, weight noise, gradient
  trigger search, and latent adversarial training; the authors released the models for
  defence research. Evals measure what a model shows, not what it can do.
- **Third-party evaluator access:** external evaluators are only as useful as their
  access and their freedom to publish. Anthropic's 2026 scheme defines three tiers:
  (1) narrow access with lab approval to publish; (2) broader information and
  publication without approval, subject to fixed redaction categories; (3)
  "employee-like" internal access plus the same publication rights.
- **Validity:** an eval result is only as good as its design. Anthropic's guidance on
  safety evals (2026-11-13) applies to any eval: measure the construct you care about
  (for example an "appropriate response" rate rather than a raw refusal rate), pair
  harmful and benign prompts to catch both failure directions, vary one factor at a
  time, and guard against contamination, reward hacking, and saturation. For multi-turn
  behaviour, fix the first user turn, let a second model play the user from an
  expert-written spec, and grade the whole transcript.
- **Grader validation:** LLM judges should use atomic, binary criteria, come from a
  different model than the one tested, and be checked for length and position bias.
  Compare their verdicts with human labels using chance-corrected agreement (Cohen's
  kappa); a good grader agrees with experts about as often as experts agree with each
  other.
- **Configuration matters:** Anthropic saw gaps of up to 34 percentage points between
  API and claude.ai configurations of the same model, so record model version, sampling
  settings, prompts, grader version, and date, and do not compare scores across setups.

## How to use it

1. Start small: 20–50 real cases are enough to catch big regressions.
2. Automate grading wherever possible.
3. Run the eval on every prompt, model, or tool change.
4. Track cost and latency alongside quality.
5. Run agent eval cases several times and combine the results, since agents do not
   behave the same way twice. Google ADK 2.14 does this with
   `adk eval --num_runs N --parallelism M`. Its `ToolArgsMatcher` can also accept tool
   arguments that match in meaning rather than exactly.
6. Before relying on a result, decide the metric and threshold in advance, size the set
   (Anthropic suggests at least about 100 items for complex multi-turn evals and 1,000
   for simple single-turn ones), and report confidence intervals and per-category
   results. The open-source Inspect framework and Anthropic's Petri toolkit (built on
   Inspect) handle running, logging, and grading.
7. To test your own agent customizations (skills, custom agents, MCP tools), GitHub
   Copilot Evals (preview since 2026-11-17) adds an `/eval` command in VS Code, the
   Copilot CLI, and the Copilot app. It checks both the result and the agent's process
   and compares runs before and after a change.

## Current state

- **2026-11-18:** GitHub Copilot Evals entered public preview (2026-11-17), built on the
  local Vally eval tool (see How to use it, step 7).

- **2026-11-16:** Anthropic published "Building strong safety evaluations" (2026-11-13),
  a checklist for designing, running, and reporting evals (see Validity, Grader
  validation, and How to use it).

- **2026-11-09:** Google ADK 2.14.0 (2026-11-07) adds multi-run evals and semantic
  tool-argument matching (see How to use it). Claude Code 2.1.319 adds
  `/claude-api latency-optimize`, which tests faster API settings against your own eval.

- **2026-10-15:** Anthropic embedded a six-person METR team with employee-like access
  (Tier 3). Anthropic cannot veto publication, only redact customer data, privileged
  legal material, and architecture details. SecureBio (Tier 2-style review of the CBRN
  chapter), Accenture, Faculty, and Hugging Face are at earlier stages.
- **2026-10-13:** A paper showed that capabilities can be provably hidden from
  elicitation (see Limits of capability evals).

## Open questions

- How to evaluate multi-hour autonomous agent runs affordably.
- Will other frontier labs give evaluators comparable (Tier 3) access? None had
  announced it as of 2026-10-16.

## Sources

- [Building effective agents](../../sources/2026/10/2026-10-04-building-effective-agents.md)
- [AI Models Can Provably Hide Arbitrary Capabilities](../../sources/2026/10/2026-10-13-ai-models-hide-capabilities.md)
- [An update on independent evaluators](../../sources/2026/10/2026-10-16-anthropic-independent-evaluators-update.md)
- [Google ADK (Python) v2.14.0](../../sources/2026/11/2026-11-09-google-adk-python-v2-14.md)
- [Claude Code release 2.1.319](../../sources/2026/11/2026-11-09-claude-code-2-1-319.md)
- [Building strong safety evaluations](../../sources/2026/11/2026-11-16-anthropic-strong-safety-evaluations.md)
- [GitHub Copilot Evals is now in public preview](../../sources/2026/11/2026-11-18-github-copilot-evals-preview.md)
