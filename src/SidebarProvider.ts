import * as vscode from "vscode";
import { getNonce } from "./getNonce";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,

      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
}

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleMainUri = webview.asWebviewUri(
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
          <link href="${styleMainUri}" rel="stylesheet">
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