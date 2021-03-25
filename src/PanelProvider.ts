import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class PanelProvider {
  public static currentPanel: PanelProvider | undefined;

  public static readonly viewType = "hello-world";

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionUri: vscode.Uri;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (PanelProvider.currentPanel) {
      PanelProvider.currentPanel._panel.reveal(column);
      PanelProvider.currentPanel._update();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      PanelProvider.viewType,
      "Todo List",
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, "media"),
          vscode.Uri.joinPath(extensionUri, "out/compiled"),
        ],
      }
    );

    PanelProvider.currentPanel = new PanelProvider(panel, extensionUri);
  }

  public static kill() {
    PanelProvider.currentPanel?.dispose();
    PanelProvider.currentPanel = undefined;
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    PanelProvider.currentPanel = new PanelProvider(panel, extensionUri);
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._extensionUri = extensionUri;
    this._update();
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
  }

  public dispose() {
    PanelProvider.currentPanel = undefined;
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview;

    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const cssUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "todoPage.css")
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" 
              content="img-src https: data:; style-src 'unsafe-inline' ${
                webview.cspSource
              }; script-src 'nonce-${nonce}';">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="${cssUri}" rel="stylesheet">
          <script nonce="${nonce}">
          </script>
        </head>
        <body>
          <iframe src="https://tim0-12432.github.io/todo-list" title="Todo List" class="frame">
            <p>Unable to display the Webpage!</p>
            <p>Please check <a href="https://tim0-12432.github.io/todo-list">https://tim0-12432.github.io/todo-list</a> is available!</p>
          </iframe>
        </body>
        </html>`;
  }
}