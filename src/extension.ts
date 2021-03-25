import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { PanelProvider } from './PanelProvider';

export function activate(context: vscode.ExtensionContext) {

	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"vstodolist-sidebar",
			sidebarProvider
		)
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodolist.todoList", () => {
			PanelProvider.createOrShow(context.extensionUri);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("vstodolist.refresh", async() => {
			PanelProvider.kill();
			PanelProvider.createOrShow(context.extensionUri);
			await vscode.commands.executeCommand("workbench.action.closeSidebar");
			await vscode.commands.executeCommand("workbench.view.extension.vstodolist-sidebar-view");
			/*setTimeout(() => {
				vscode.commands.executeCommand("workbench.action.webview.openDeveloperTools");
			}, 500);*/
		})
	);
}

export function deactivate() {}
