// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { generateTable } from './generator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-table-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('markdown-table-generator.generateTable', async () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from markdown-table-generator!');
		const cols = await vscode.window.showInputBox({
			prompt: 'Columns Number',
			placeHolder: 'Enter Columns Number',
			ignoreFocusOut: true,
			validateInput: (val) => {
				const err = 'Columns Number should be [1, 100]'
				const num = parseInt(val, 10)
				if (isNaN(num)) {
					return err
				}
				if (num < 1 || num > 100) {
					return err
				}
				return ''
			},
		})

		const rows = await vscode.window.showInputBox({
			prompt: 'Rows Number',
			placeHolder: 'Enter Rows Number',
			ignoreFocusOut: true,
			validateInput: (val) => {
				const err = 'Rows Number should be [1, 100]'
				const num = parseInt(val, 10)
				if (isNaN(num)) {
					return err
				}
				if (num < 1 || num > 100) {
					return err
				}
				return ''
			},
		})

		if (cols && rows) {
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				editor.edit(p => p.insert(editor.selection.active, generateTable(parseInt(cols, 10), parseInt(rows, 10))));
			}
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
