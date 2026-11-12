# Security

## Reporting a vulnerability

Open a private security advisory through the repository's GitHub Security tab.
Please do not open a public issue for a suspected vulnerability.

## Secret-scanning audit note

Gitleaks 8.30.1 was run over the complete Git history, including all refs:

```bash
gitleaks git . --log-opts="--all" --redact
```

The initial scan reported two `generic-api-key` findings in a historical,
minified Wijmo bundle:

- Commit: `1a930495c59b41c88261c6723fe927b0e10679b6`
- Path: `out/controls/wijmo.grid.min.js`
- Line: 14
- Rule: `generic-api-key`

Both findings are the same false positive in a keyboard-event switch. The
matched text is a `case e.Key.PageUp:` or `case e.Key.PageDown:` label followed
by a `this...altKey;` expression. `Key` is a Wijmo keyboard-key enum and
`altKey` is a DOM keyboard-event property. The file contains 34 such
`case e.Key.<Name>:` labels and no `licenseKey`, `apiKey`, `password`,
`secret`, or `token` identifiers. The generic rule matched the `Key...:` text
as if it were a key/value assignment.

The bundle was removed from the current tree in commit `4a4d461`, but it remains
in history. History is not rewritten.

### Allowlist

`.gitleaksignore` contains one fingerprint scoped to the exact historical
finding:

```text
1a930495c59b41c88261c6723fe927b0e10679b6:out/controls/wijmo.grid.min.js:generic-api-key:14
```

This does not disable the `generic-api-key` rule and does not suppress findings
in other files, commits, or lines. With this allowlist, the scan exits 0 with
zero unresolved findings.
