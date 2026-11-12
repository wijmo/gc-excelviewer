# User-Centric Analysis: CSV & Excel Viewer Extension

> **Historical document.** This analysis was committed on 2026-06-15 and is kept
> as input for future planning, not as a statement of current behavior or
> committed project direction. Multi-column sorting and the CSV status bar have
> since shipped (versions 1.9.0 and 1.8.8 respectively). The monetization
> discussion is speculative and is not a committed plan. See
> [ROADMAP.md](../../../ROADMAP.md) for the current planned work.

## What I asked
Think as a user: what's there that can be better, what's missing, what would I pay for.

---

## What exists (baseline)
Sort/filter/find, column auto-sizing, state persistence, multi-sheet Excel, export to CSV, theme sync, cell editing, row/column pinning, text wrap toggle, line numbers.

---

## Friction (exists but hurts)

### 1. Formula cells show stale values
Excel files with formulas show the cached value (whatever Excel last computed). No indicator that a cell IS a formula. Users are confused when they see "1234" and don't know if it's a formula or a raw value.
**Fix:** Show formula icon or formula bar text on cell focus. Even just display the formula string in a tooltip.

### 2. Number formatting is .NET format strings
`g6`, `n2`, etc. Nobody outside .NET knows this. The setting is a black box.
**Fix:** A dropdown or examples in the setting description. Or switch to Intl.NumberFormat options.

### 3. No way to freeze rows/columns globally
Pin/freeze works per-column via right-click, but there's no "freeze first N rows/columns" setting. Power users with headers + subheaders can't freeze row 1 AND row 2.
**Fix:** Setting `csv-preview.freezeRows` (int) and UI toggle to freeze first N rows.

### 4. Excel-only config is almost empty
CSV has 12 config options. Excel has 1 (`showInfo`). Excel users have zero control over column sizing, text wrap, theme override at file level, etc.
**Fix:** Share/expose the same CSV config options for Excel (most already work, just not configurable separately).

### 5. Export only exports filtered rows to CSV
No "export to Excel", no "copy filtered as Markdown table", no "export current sheet only". One format, no options.
**Fix:** Export menu with: CSV, TSV, Markdown table, JSON array.

### 6. No status bar info for CSV — *addressed*
Excel shows an info bar (rows/cols/sheet). At the time of writing, CSV showed nothing outside the grid, so users scrolled to the bottom to see the total row count.
**Fix:** VS Code status bar contribution showing row count, column count, selected cell value. *(A status bar showing row counts and preview actions shipped in 1.8.8.)*

---

## Missing (obvious gaps)

### 7. Column statistics / data profiling
Click a column header → sidebar or tooltip shows:
- Row count / null count / unique count
- Min / Max / Mean / Median (numeric columns)
- Most frequent value
- Data type inferred (string/number/date/boolean)

This is THE feature data engineers and analysts want. It's why people use tools like DBeaver or DataGrip for CSV. Nobody wants to open Python just to run `df.describe()`.

### 8. Find & Replace
Ctrl+F only finds. No replace. For CSV editing this is a massive gap — renaming a category value across 10,000 rows requires an external tool.

### 9. Multi-column sort — *addressed*
At the time of writing, clicking a second column header replaced the first sort. Users expect Shift+click to add a secondary sort key. AG Grid Community supports this natively. *(Shift+click multi-column sorting shipped in 1.9.0.)*

### 10. Diff/compare mode
Open two CSV/Excel files side by side and highlight rows that differ. Common use case: "what changed in this report vs. last week's?" Zero tools in VS Code do this well.

### 11. Column type display
Show inferred data type per column in the header (string, number, date, boolean). Even a small icon. Helps users immediately understand what they're looking at.

### 12. Conditional formatting (basic)
Highlight cells above/below a threshold, or cells matching a regex, with a color. Users want to "see the outliers." Currently impossible without leaving the editor.

### 13. Large file handling
No pagination, no chunked loading. A 500MB CSV will bring AG Grid to its knees. No warning, just a frozen editor. At minimum: warn at >N rows and offer pagination.

### 14. Paste CSV from clipboard as new file
"I have CSV data on my clipboard, I want to inspect it quickly." No way to do this without creating a temp file. A command `CSV: Open Clipboard as Preview` would be instant value.

---

## What I would pay for

> Speculative discussion only. Nothing in this section is a committed pricing,
> licensing, or monetization plan.

| Feature | Willingness to pay | Why |
|---|---|---|
| **Column profiling / stats** | $8–15 one-time | Replaces Python/pandas for quick data checks. Daily use. |
| **Find & Replace** | Free — table stakes | Would block adoption if paywalled |
| **Large file support (pagination / streaming)** | $5–10 one-time | Unblocks a real use case (prod log CSVs, exports) |
| **Conditional formatting** | $5–10 one-time | Spreadsheet users expect this |
| **Diff/compare mode** | $10–20 one-time | Unique value, no good competitor in VS Code |
| **Export to Markdown/JSON** | Free — low lift, big goodwill |  |
| **Formula display in Excel** | Free (it's parity with Excel itself) | Paywalling this would feel wrong |
| **Multi-column sort** | Free (AG Grid supports it) | Should already work |

**Pricing model suggestion:** Free tier = current + table stakes fixes (replace, multi-sort, status bar). Pro tier ($9 one-time or $2/mo) = column profiling, conditional formatting, diff mode, large file support.

---

## Priority order (impact vs. effort)

| # | Feature | Effort | Impact |
|---|---|---|---|
| 1 | Multi-column sort (Shift+click) | Low (AG Grid config) | High |
| 2 | Export menu (CSV/TSV/Markdown/JSON) | Low | Medium |
| 3 | Status bar row/col count | Low | Medium |
| 4 | Find & Replace | Medium | High |
| 5 | Clipboard → preview command | Low | Medium |
| 6 | Column profiling/stats | Medium | Very High |
| 7 | Formula tooltip in Excel | Medium | High |
| 8 | Conditional formatting | High | High |
| 9 | Diff/compare mode | Very High | High |
| 10 | Large file pagination | High | Medium |
