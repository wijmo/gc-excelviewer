# CSV & Excel Viewer

Preview CSV files and Excel spreadsheets in Visual Studio Code.

[Install from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Development42.csv-excel-viewer)

> **Fork notice:** This extension is a fork of [gc-excelviewer](https://github.com/wijmo/gc-excelviewer) by GrapeCity/MESCIUS.
> The original extension requires a paid Wijmo license. This fork replaces Wijmo with
> free, open-source alternatives: [AG Grid Community](https://www.ag-grid.com) (MIT)
> for the data grid, and [SheetJS](https://sheetjs.com) (Apache 2.0) for Excel parsing.

## Who this is for

Developers, analysts, and other VS Code users who want to inspect CSV, TSV, and Excel
files without leaving their editor.

The extension is built with TypeScript and JavaScript, uses AG Grid Community for the
grid and SheetJS for Excel parsing, is bundled with webpack, and uses Bun for
development tooling.

## Usage

### CSV files
Open any `.csv`, `.tsv`, or `.tab` file. Use the explorer context menu or editor title menu to invoke **Open Preview**. Columns support sorting and filtering via their headers.

For plain text files with a non-standard extension, open the file in an editor and execute the **CSV: Open Preview** command from the command palette. You can also right-click a file tab and use **Reopen Editor With → CSV Viewer**.

### Excel files
Open any `.xlsx` or `.xlsm` file. The custom editor opens automatically. Use the sheet tabs at the bottom to switch between sheets.

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `csv-preview.separator` | `,` | Column separator character |
| `csv-preview.quoteMark` | `"` | Quote character for cell values |
| `csv-preview.hasHeaders` | `true` | Treat first row as column headers |
| `csv-preview.capitalizeHeaders` | `true` | Capitalize header names |
| `csv-preview.resizeColumns` | `all` | Auto-resize columns: `all`, `first`, or `none` |
| `csv-preview.maxColumnWidth` | `300` | Maximum column width in pixels when auto-sizing |
| `csv-preview.lineNumbers` | `none` | Show line numbers: `ordinal`, `source`, or `none` |
| `csv-preview.commentCharacter` | `#` | Character that marks comment lines |
| `csv-preview.skipComments` | `false` | Omit comment lines from the preview |
| `csv-preview.formatValues` | `never` | Apply number formatting: `always`, `unquoted`, or `never` |
| `csv-preview.numberFormat` | `g6` | [.NET-style format string](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) for numeric columns |
| `csv-preview.wrapText` | `false` | Wrap cell text and expand rows to fit content |
| `csv-preview.theme` | `auto` | Grid color theme: `auto`, `light`, or `dark` |
| `csv-preview.openStdin` | `false` | Auto-open text piped to stdin as a CSV preview |
| `excel-viewer.showInfo` | `true` | Show info bar at the bottom of the preview |

## Development

Requirements: VS Code and [Bun](https://bun.sh).

```bash
bun install
bun run compile
bun test
```

To run the extension from source:

1. Open this repository in VS Code.
2. Open the **Run and Debug** view.
3. Select **Launch Extension** and start debugging.

Sample files for manual testing are under `data/`.

See [ROADMAP.md](ROADMAP.md) for planned work.

## License

MIT — see [LICENSE](LICENSE). Third-party notices are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
