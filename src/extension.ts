import * as vscode from 'vscode';
import { removeComments } from './commentsRemover';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.removeComments', () => {
    removeComments();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
