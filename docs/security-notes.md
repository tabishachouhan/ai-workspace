# Security Notes

This file tracks known dependency vulnerabilities that `npm audit`
flags, along with the reasoning behind each decision - fix, defer, or
accept - rather than silently ignoring warnings or blindly running
`npm audit fix --force`.

## 1. @xenova/transformers -> onnxruntime-web -> protobufjs (critical) + sharp (high)

`npm audit` flags a critical vulnerability chain through
`@xenova/transformers` (used for local embedding generation) ->
`onnxruntime-web` -> `protobufjs`, plus a related `sharp` (image
processing) vulnerability pulled in by the same package. As of this
writing, there is no patched version of `onnxruntime-web` available
upstream that `@xenova/transformers` supports - `npm audit fix
--force` only offers a *downgrade* to an older `@xenova/transformers`
release, which is not a genuine fix.

**Risk assessment:** this code runs entirely locally, processing only
documents the authenticated user uploads to their own project. It is
not exposed to arbitrary untrusted network input the way a public API
endpoint would be, which significantly limits the exploitability of
these advisories in this application's context.

**Decision:** accept this risk for now, monitor for an upstream patch,
and re-run `npm audit` periodically.

## 2. eslint chain (brace-expansion) + vite/esbuild (dev-only tooling)

`npm audit` also flags `brace-expansion` (via `eslint`'s dependency
chain) and `esbuild` (via `vite`). Both fixes require breaking major
version upgrades (`eslint@10`, `vite@8`).

**Risk assessment:** both `eslint` and `vite` are dev-only
dependencies - they run during local development and the build
process, never in the deployed production server, and are never
exposed to end users or untrusted input.

**Decision:** accept for now rather than force a breaking upgrade to
tooling that's currently working correctly. Revisit when there's a
natural reason to upgrade the frontend build tooling anyway.

## 3. react-router / react-router-dom (moderate)

Two moderate-severity advisories (an open-redirect issue and an
arbitrary constructor injection via SSR hydration) affect
`react-router` versions in the 6.x line, including the `^6.26.2` this
project currently specifies. The patched version requires upgrading
to the 7.x line, a breaking change.

**Risk assessment:** the frontend's routing isn't built yet as of this
note, so no code currently depends on the vulnerable behavior.

**Decision:** defer the upgrade and start directly on the patched 7.x
line when frontend routing is actually implemented, rather than
building on 6.x now and migrating later.

---

Last updated: 2026-07-26