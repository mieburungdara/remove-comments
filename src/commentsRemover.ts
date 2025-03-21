import * as vscode from 'vscode';

// Default regex values
const defaultSettings = {
  'regexRemover.singleLineComment': "//.*?$|#.*?$",
  'regexRemover.multiLineComment': "/\\*[\\s\\S]*?\\*/",
  'regexRemover.emptyLine': "^\\s*$"
};

// Function to get regex from settings
function getRegexFromSettings(settingKey: string): RegExp {
  const configuration = vscode.workspace.getConfiguration();
  const regexString = configuration.get<string>(settingKey);
  if (!regexString) {
    throw new Error(`Regex not found for ${settingKey}!`);
  }
  try {
    return new RegExp(regexString, 'gm');
  } catch (error) {
    vscode.window.showErrorMessage(`Invalid regex: ${error}`);
    throw error;
  }
}

// Function to check and show notifications
function showNotification(message: string, type: 'info' | 'error' = 'info') {
  const configuration = vscode.workspace.getConfiguration();
  const disableNotifications = configuration.get<boolean>('regexRemover.disableNotifications');
  
  if (!disableNotifications) {
    if (type === 'info') {
      vscode.window.showInformationMessage(message);
    } else {
      vscode.window.showErrorMessage(message);
    }
  }
}

// Main function to remove comments or empty lines using regex
function removeCommentsUsingRegex(settingKey: string, message: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    showNotification('No active editor detected!', 'error');
    return;
  }

  const document = editor.document;
  const text = document.getText();

  let regex: RegExp;
  try {
    regex = getRegexFromSettings(settingKey);
  } catch (error) {
    return;
  }

  if (!regex.test(text)) {
    showNotification('No comments or empty lines found!');
    return;
  }

  const cleanedText = text.replace(regex, '');

  editor.edit((editBuilder) => {
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );
    editBuilder.replace(fullRange, cleanedText);
  }).then(success => {
    if (success) {
      showNotification(message);
    } else {
      showNotification('Failed to remove comments!', 'error');
    }
  });
}

// Functions for specific actions
export function removeSingleLineComments() {
  removeCommentsUsingRegex('regexRemover.singleLineComment', 'Single-line comments removed successfully!');
}

export function removeMultiLineComments() {
  removeCommentsUsingRegex('regexRemover.multiLineComment', 'Multi-line comments removed successfully!');
}

export function removeEmptyLines() {
  removeCommentsUsingRegex('regexRemover.emptyLine', 'Empty lines removed successfully!');
}

// ✅ Reset to Default Function
export function resetToDefaults() {
  const configuration = vscode.workspace.getConfiguration();
  
  Object.entries(defaultSettings).forEach(([key, value]) => {
    configuration.update(key, value, vscode.ConfigurationTarget.Global)
      .then(() => {
        showNotification(`Reset ${key} to default.`);
      })
      .then(undefined, (error) => {
        showNotification(`Failed to reset ${key}: ${error}`, 'error');
      });
  });
}

// Register commands
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('regexRemover.removeSingleLineComments', removeSingleLineComments),
    vscode.commands.registerCommand('regexRemover.removeMultiLineComments', removeMultiLineComments),
    vscode.commands.registerCommand('regexRemover.removeEmptyLines', removeEmptyLines),
    vscode.commands.registerCommand('regexRemover.resetDefaults', resetToDefaults)
  );

  showNotification('Regex Remover Extension activated!');
}

export function deactivate() {}
