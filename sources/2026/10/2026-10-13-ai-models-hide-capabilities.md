---
title: "AI Models Can Provably Hide Arbitrary Capabilities"
url: https://arxiv.org/abs/2610.13928
archived:
type: paper
author: Andis Draguns, Sumeet Ramesh Motwani, Raymond Douglas, Christian Schroeder de Witt
date_published: 2026-10-09
date_added: 2026-10-13
tags: [research, evals, safety, security]
topics: [practices/evals, practices/security]
---

## Summary

A paper showing that a model's weights can contain a hidden capability that capability
evaluations cannot find. The authors embed an encrypted neural network in a host model;
it is decrypted and runs only when a secret trigger appears in the input. Using
"digital lockers", they argue that under standard cryptographic assumptions the hidden
circuit is provably hard to elicit or interpret, even with full access to the weights.

## Key points

- Extends earlier backdoor work from hiding fixed strings to hiding arbitrary
  computations.
- Proof-of-concept in PyTorch on a small chemical reaction prediction task, used as a
  stand-in for CBRN-relevant capability.
- Common elicitation methods all failed to surface the hidden capability: fine-tuning,
  adding noise to weights, gradient-based trigger search, and latent adversarial
  training.
- The authors conclude that audits based on eliciting capabilities have a fundamental
  limit against an adversarial model developer.
- The backdoored models were released to support research on defences.

## Why it matters

Dangerous-capability evals assume that if a capability exists, enough effort will
reveal it. This result says that assumption fails when whoever trained the model wants
to hide something, so trust in a model's provenance cannot be replaced by testing it.
It also strengthens the case for treating third-party model weights as a supply-chain
risk.
