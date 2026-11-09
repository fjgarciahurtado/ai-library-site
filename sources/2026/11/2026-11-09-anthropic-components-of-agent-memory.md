---
title: "The components of agent memory"
url: https://www.anthropic.com/research/components-of-agent-memory
archived:
type: article
author: Lance Martin (Anthropic)
date_published: 2026-11-06
date_added: 2026-11-09
tags: [anthropic, memory, agents, prompting, evals]
topics: [agents/memory, agents/agent-patterns, practices/prompting]
---

## Summary

An Anthropic engineering post that splits agent memory into layers: transcripts, memory
notes, structured representations such as wikis, and a small injected context. It adds
"dreaming", an offline pass in which Claude reviews its logs to fix and reorganise notes.
Experiments on a benchmark, Pokémon Red, and a 350,000-file corpus show what helps. The
main lesson is to tell strong models what memory is for, not give them rules about what
to save.

## Key points

- **Layers:** transcripts (searchable event log), memory notes (readable files kept
  across sessions), memory representations (wikis whose pages link to notes), injected
  context (loaded at every start, must stay small), and dreaming (moves information
  between layers, checks notes against transcripts, promotes or prunes them).
- **Writing a note is a prediction** that it will be useful later; newer models predict
  better. In Pokémon Red, Sonnet 3.7 wrote 413 memory files and earned one badge; Fable 5
  wrote nine and earned four, storing strategy rather than what is visible on screen.
- **CL-Bench (database task):** memory raised Opus 5.5 from 0.655 to 0.838. Sonnet 4.6
  gained little (0.330 to 0.364) without guidance, but prompting it to read memory and
  test its theories nearly doubled its score.
- **Rules can hurt:** a "record only failures" rule lowered scores for Opus 5 and Opus
  4.7. For frontier models: describe the purpose of memory and save notes when asked or
  when something is clearly worth keeping.
- **Dreaming fixes errors:** a wrong navigation note caused repeated failures until
  dreaming corrected it against the transcript.
- **Wikis plus search:** on a 350,000-file corpus, 128 dreaming sessions raised
  wiki-only accuracy from 13% to 48%; wiki plus search reached 61% against 53% for search
  alone. Watch wiki size (one grew to 1.77 times the corpus), and run a second pass to
  repair dangling links and add index pages.
- **Partition writes:** several agents writing one shared table lost 41 of 57 facts; one
  agent per page, quoting the source exactly, kept all 57.
- **Keep the top layer small:** long instruction files lower adherence. Claude Code's
  auto memory loads only the first 200 lines or 25 KB of `MEMORY.md` as an index.
- **Products mentioned:** the Managed Agents memory directory and dreaming (with a
  cookbook), the memory tool, and a knowledge-wiki quickstart in `claude-quickstarts`.

## Why it matters

It is the first provider guidance with measured results on what agents should remember
and how to keep memory correct. It also describes this library's own design: dated
source notes as the log, topic pages as the wiki, and a short `CLAUDE.md` on top.
