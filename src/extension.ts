import * as vscode from 'vscode';
import { removeSingleLineComments, removeMultiLineComments, removeAllComments, removeEmptyLines } from './commentsRemover';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.removeSingleLineComments', removeSingleLineComments),
    vscode.commands.registerCommand('extension.removeMultiLineComments', removeMultiLineComments),
    vscode.commands.registerCommand('extension.removeAllComments', removeAllComments),
    vscode.commands.registerCommand('extension.removeEmptyLines', removeEmptyLines)
  );

  vscode.window.showInformationMessage('Ekstensi Remove Comments & Empty Lines diaktifkan!');
}

export function deactivate() {}
