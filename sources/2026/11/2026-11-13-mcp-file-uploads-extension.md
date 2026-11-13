---
title: "Exploring File Uploads and Downloads in MCP"
url: https://blog.modelcontextprotocol.io/posts/exploring-file-uploads-and-downloads-in-mcp/
archived:
type: article
author: Den Delimarsky and Wil St. Charles (MCP maintainers)
date_published: 2026-11-10
date_added: 2026-11-13
tags: [mcp, tool-use, security]
topics: [tooling/mcp]
---

## Summary

The MCP maintainers propose an experimental extension, `io.modelcontextprotocol/files`, so
tools can take and return files without the bytes passing through the model. The client
uploads or downloads files directly over HTTPS, using targets the server hands out during a
tool call. There is no reference implementation yet; the authors aim to stabilise it before
the end of 2026.

## Key points

- **Scope:** for protocol revision `2026-07-28` and later; optional for clients and servers.
- **Declaring files:** a tool argument marked `x-mcp-file` (optionally with `accept` and
  `maxSize`) takes a file object (`id`, `name`, `mimeType`, `size`, optional inline `data`
  and SHA-256 `digest`). Servers advertise `upload` and `maxInlineBytes` in
  `server/discover`; clients declare `upload`/`download` per request.
- **Upload flow:** the client calls `tools/call` with metadata only (after user approval or
  agent policy); the server checks quota and returns a new `upload_required` result with
  upload targets and a `requestState`; the client `PUT`s or `POST`s the bytes and retries
  the call with the same state. The tool does not run if the upload fails. This builds on
  the Multi Round-Trip Requests pattern.
- **Download flow:** the tool result's `_meta` lists download targets; the client fetches
  them and checks size and digest.
- **Credential safety:** each target says `omit` or `include` credentials; with `include`,
  the MCP credential goes only to the server's own origin or MCP path, redirects are
  refused, and targets cannot set their own `Authorization` header.
- **Open questions:** whether downloads should stay in `_meta`, and whether hosts must
  allowlist destinations for `omit` targets.
- **How to try it:** read the draft spec and extension repository and join the working
  group; no SDK support was announced.

## Why it matters

Moving files (PDFs, CSVs, ZIPs) through MCP today means base64 in the context window or
custom conventions per server. A standard side channel would save tokens and make file
tools portable across clients.
