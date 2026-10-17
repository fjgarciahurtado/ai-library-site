---
title: "Accelerating the search for antimicrobial peptides with Google Antigravity"
url: https://deepmind.google/blog/accelerating-antimicrobial-discovery/
archived:
type: article
author: Google DeepMind
date_published: 2026-10-15
date_added: 2026-10-16
tags: [google, agents, research]
topics: [agents/agent-patterns]
---

## Summary

Google DeepMind researchers used Google Antigravity, Google's agentic development
platform, as a research assistant to find candidate antimicrobial peptides in bacterial
protein databases. A researcher set the goal and steered. The agent ran database
queries, structural comparisons, and literature synthesis over a multi-turn session,
then drafted a wet-lab plan.

## Key points

- The agent narrowed millions of UniProt entries, some annotated by Google's ProtNLM
  model, to a 97-amino-acid bacteriocin from *Streptococcus pseudopneumoniae* with no
  meaningful homolog in Swiss-Prot.
- It gathered supporting evidence: an AlphaFold structure matching a known bacteriocin
  fold, and a genomic neighbourhood consistent with a working bacteriocin system.
- It proposed a mechanism and activity spectrum, and drafted an experimental plan
  (expression, susceptibility testing, toxicity).
- A 3D Biomolecular Structure Viewer inside Antigravity acted as a shared canvas: the
  agent could highlight regions, and researchers could pin notes for the agent to use.
- Results are predictions only. The lead and other candidates are now in wet-lab
  validation, with no results reported.

## Why it matters

It is a concrete example of the human-steered research agent pattern outside coding.
The scientist sets direction and judges results, while the agent chains many tool calls
across databases and models. The shared visual canvas is a notable interface idea. The
post is partly promotional, and its scientific claims are still unvalidated.
