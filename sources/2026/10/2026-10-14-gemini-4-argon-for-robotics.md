---
title: "Gemini 4 Argon for Robotics"
url: https://developers.googleblog.com/gemini-4-argon-for-robotics
archived:
type: article
author: Kanishka Rao (Google)
date_published: 2026-10-13
date_added: 2026-10-14
tags: [google, robotics, multimodal, reasoning]
topics: [models/gemini]
---

## Summary

Google Developers Blog post presenting Gemini 4 Argon as a general-purpose physical
reasoning model for robotics, usable through the Gemini API (`gemini-4-argon`, paid
tier, Interactions API). It shows the same general model controlling robots, building
simulations, and generating training data, rather than a separate robotics model.

## Key points

- Demos: mobile manipulation on a Spot robot in MuJoCo, zero-shot robotic arm control,
  steering a video world model.
- Real2Sim: builds simulation twins from robot camera feeds, egocentric video, or sketches.
- ERQA (embodied reasoning): 87% with pure reasoning, which Google says beats every other
  frontier model.
- Generated 4,500+ randomised sim episodes for a vision-language-action policy; real-world
  success rose from 56% to 75%.
- Reproduced 68 robotics papers as interactive browser sandboxes from single prompts.
- The post has no robotics-specific safety section; safety appears only as constraints in
  example prompts.

## Why it matters

Frontier general models are now pitched directly for robotics work, competing with
dedicated robot foundation models.
