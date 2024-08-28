'use strict';
import { window, workspace, WebviewPanel, ExtensionContext, ViewColumn } from 'vscode';
import { URI } from 'vscode-uri';
import BaseDocumentView from './baseDocumentView';
import { ExcelDocument } from './excelEditor';
import { getLicenseKey } from './license';

export default class ExcelDocumentView extends BaseDocumentView {

    static create(context: ExtensionContext, uri: URI, viewColumn: ViewColumn): ExcelDocumentView {
        let preview = new ExcelDocumentView(context, uri);
        preview.scheme = "excel-preview";
        preview.initWebviewPanel(viewColumn);
        preview.initialize();
        return preview;
    }

    static revive(context: ExtensionContext, uri: URI, webviewPanel: WebviewPanel): ExcelDocumentView {
        let preview = new ExcelDocumentView(context, uri);
        preview.scheme = "excel-preview";
        preview.attachWebviewPanel(webviewPanel);
        preview.initialize();
        return preview;
    }

    public getOptions(): any {    
        let viewerConfig = workspace.getConfiguration('excel-viewer');

        return {
            customEditor: this.hasCustomEditor,
            uri: this.uri.toString(),
            previewUri: this.previewUri.toString(),
            state: this.state,
            showInfo: <boolean>viewerConfig.get("showInfo")
        };
    }

    private _document: ExcelDocument;

    public enableEditing(document: ExcelDocument) {
        this._document = document;
        this.webview.onDidReceiveMessage((e) => {
            if (e.changed) {
                this._document.change(e.reason);
            }
        }, this, this._disposables);
    }

    refresh(): void {
        let self = this;
        workspace.fs.readFile(this.uri).then(buffer => {
            self.webview.postMessage({
                refresh: true,
                content: buffer
            })
        }, reason => {
            window.showInformationMessage(reason);
        });
    }

    undo(): void {
        this.webview.postMessage({
            undo: true
        });
    }

    redo(): void {
        this.webview.postMessage({
            redo: true
        });
    }
    
	getHtml(ignoreState: boolean = false): string {
		return `
        <!DOCTYPE html>
        <html>
        <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${this.webview.cspSource} 'unsafe-inline'; script-src ${this.webview.cspSource} 'unsafe-inline';">
            <link href="${this.scriptUri}/styles/wijmo.min.css" rel="stylesheet" type="text/css" />
            <link href="${this.scriptUri}/styles/vscode.css" rel="stylesheet" type="text/css" />
        </head>
        <script src="${this.scriptUri}/controls/wijmo.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/controls/wijmo.input.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/controls/wijmo.grid.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/controls/wijmo.grid.filter.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/controls/wijmo.grid.sheet.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/controls/wijmo.grid.xlsx.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/controls/wijmo.xlsx.min.js" type="text/javascript"></script>
        <script src="${this.scriptUri}/jszip.min.js"></script>
        <script src="${this.scriptUri}/excel.js"></script>
        <body style="padding:0px; overflow:hidden" onload="resizeSheet()" onresize="resizeSheet()">
            <div id="sheet"></div>
            <div id="aboutWjmo" style="box-sizing: border-box;position:fixed;z-index:10000;bottom:0px;left:0px;right:0px;padding:4px 20px;background: rgb(90,227,255);background: linear-gradient(129deg, rgba(90,227,255,1) 0%, rgba(5,77,107,1) 100%);color:#000;text-align:right;">powered by: <a href="https://developer.mescius.com/wijmo/flexgrid-javascript-data-grid?utm_source=VSCode&utm_medium=Wijmo-Extension" target="_blank" style="color:#fff;text-decoration:none;font-weight:600;">Wijmo FlexGrid</a></div>
        </body>
        <script type="text/javascript">
            wijmo.setLicenseKey("${getLicenseKey()}");
            function ignoreState() {
                return ${ignoreState};
            }
            function getOptions() {
                return ${JSON.stringify(this.getOptions())};
            }
            handleEvents();
            initPage();
        </script>
        </html>`;
	}

    get viewType(): string {
        return "gc-excelviewer-excel-preview";
    }

    get configurable(): boolean {
        return false;
    }
}
