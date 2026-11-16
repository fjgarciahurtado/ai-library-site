---
title: "Building strong safety evaluations"
url: https://www.anthropic.com/research/building-strong-safety-evaluations
archived:
type: article
author: Anthropic (Ruth Appel, Evan Frondorf, Jeremy Hadfield, and others)
date_published: 2026-11-13
date_added: 2026-11-16
tags: [anthropic, evals, safety]
topics: [practices/evals]
---

## Summary

An Anthropic engineering post on how to design, run, and report safety evaluations so
that the claims built on them hold up. It borrows from psychology's replication reforms:
choose a design that fits the question, measure the right construct, validate graders
against humans, preregister the analysis, and report uncertainty and configuration.

## Key points

- **Measure the right thing:** for example an "appropriate response rate" rather than a
  raw refusal rate; pair harmful and benign prompts in the same domain to catch both
  harmful compliance and over-refusal.
- **Multi-turn simulations:** fix the first user turn, let a separate model play the user
  from an expert-written spec, and grade the whole transcript (one bad turn fails it).
- **Vary one factor at a time:** cross dimensions such as severity and tone so each
  effect can be isolated; ground scenarios in real usage, incident reports, or expert
  interviews, across languages and product surfaces.
- **Graders:** atomic, binary criteria; say what does not change the verdict (such as
  disclaimers); use a different model from the one tested; check length and position
  bias; validate against human labels with chance-corrected agreement (Cohen's kappa),
  aiming for grader-expert agreement close to expert-expert agreement; fail loudly.
- **Sample size and statistics:** preregister metrics and thresholds; at least about 100
  items for complex multi-turn evals and 1,000 for simple single-turn ones, run several
  times; report confidence intervals and per-category results, and correct for multiple
  comparisons.
- **Document the configuration:** model version, sampling settings, prompts, grader
  version, and date. Anthropic saw up to a 34-point gap between API and claude.ai
  configurations, so scores from different setups are not comparable.
- **Tools:** recommends the open-source Inspect framework (UK AI Security Institute) and
  Anthropic's Petri toolkit, built on Inspect, for automated multi-turn behaviour tests.

## Why it matters

The advice applies to any LLM eval, not only safety: grader validation, sample sizes,
and configuration logging are where most home-made evals go wrong.
