# Third-Party Notices

This repository vendors the following third-party browser assets under `out/`.
They are loaded directly by the extension webviews and are not installed from
npm at build time.

## AG Grid Community

- **Version:** 32.3.4 (version string embedded in `out/ag-grid-community.min.js`)
- **Files:**
  - `out/ag-grid-community.min.js`
  - `out/styles/ag-grid.min.css`
  - `out/styles/ag-theme-alpine.min.css`
- **Upstream:** https://www.ag-grid.com/
- **License:** MIT (the `ag-grid-community` package; AG Grid Enterprise is
  separately licensed)
- **Upstream license file:** https://github.com/ag-grid/ag-grid/blob/v32.3.4/LICENSE.txt

The vendored minified files do not include a copyright or license header, and
no separate license file for AG Grid is present in this repository. The CSS
files also carry no version or copyright header; they are vendored alongside
the JavaScript bundle.

## SheetJS Community Edition

- **Version:** 0.18.5 (version string embedded in the bundled asset)
- **Files:**
  - `out/xlsx.full.min.js`
- **Upstream:** https://sheetjs.com/ and https://github.com/SheetJS/sheetjs
- **License:** Apache License 2.0
- **Upstream license file:** https://github.com/SheetJS/sheetjs/blob/v0.18.5/LICENSE
- **Copyright notice embedded in the file:** `xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com`

The vendored minified file includes the copyright notice above but not the full
license text. The upstream license terms apply.

## Verification

Versions and licenses were checked against the npm registry metadata for
`ag-grid-community@32.3.4` and `xlsx@0.18.5` and against the upstream license
files linked above. The embedded version strings match those releases.

## Historical note

Earlier versions of this repository vendored Wijmo controls from
GrapeCity/MESCIUS. Those assets were removed when the extension was rebranded
and rewritten on AG Grid Community and SheetJS.
