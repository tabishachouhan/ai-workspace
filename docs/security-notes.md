# Security Notes

## Known accepted vulnerability: @xenova/transformers → onnxruntime-web → protobufjs

`npm audit` flags a critical vulnerability chain through
`@xenova/transformers` (used for local embedding generation) →
`onnxruntime-web` → `protobufjs`. As of this writing, there is no
patched version of `onnxruntime-web` available upstream that
`@xenova/transformers` supports — `npm audit fix --force` only offers
a *downgrade* to an older `@xenova/transformers` release, which is not
a genuine fix.

**Risk assessment:** this code runs entirely locally, processing only
documents the authenticated user uploads to their own project. It is
not exposed to arbitrary untrusted network input the way a public API
endpoint would be, which significantly limits the exploitability of
these advisories in this application's context.

**Decision:** accept this risk for now, monitor for an upstream patch,
and re-run `npm audit` periodically. If `@xenova/transformers` releases
an update pulling in a patched `onnxruntime-web`, upgrade immediately.

Last checked: 2026-07-18
