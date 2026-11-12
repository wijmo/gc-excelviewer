# Roadmap

This roadmap describes planned work, not completed features. The estimate is
approximately **32 hours** in total. Priorities and scope may change as work
begins and measurements come in.

## 1. Test architecture and regression coverage — 8 hours

- Extract shared webview utilities into importable modules.
- Remove the duplicated production implementation currently used by the numeric-sort tests.
- Add tests for parsing, sorting, filtering, copying, and CSV saving.
- Add regression coverage for previously reported loading and rendering bugs.

## 2. Large-file baseline and safeguards — 8 hours

- Benchmark CSV and Excel loading using generated synthetic fixtures.
- Measure parsing time, rendering time, and memory use.
- Add graceful errors and configurable warnings for oversized files.
- Implement incremental loading or pagination if measurements justify it.

## 3. Excel parity and formula inspection — 6 hours

- Audit and implement missing Excel configuration parity for sizing, wrapping, and themes.
- Distinguish formulas from cached values and expose formula information.
- Add tests for multi-sheet and formula-containing workbooks.

## 4. Additional export formats — 4 hours

- Export filtered rows as TSV, Markdown, and JSON.
- Preserve column order and document type conversions.
- Add automated export tests.

## 5. Accessibility and keyboard use — 4 hours

- Audit keyboard navigation, focus visibility, labels, and contrast.
- Verify light, dark, and high-contrast themes.

## 6. Documentation and release hygiene — 2 hours

- Keep README, changelog, package version, and future releases aligned.
- Maintain separate CI validation and explicitly triggered releases.
