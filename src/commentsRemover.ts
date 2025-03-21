import * as vscode from 'vscode';

// Regex untuk PHP
const phpSingleLineComment = /\/\/(?!\[|\w|https?:\/\/).*?$|#.*?$/gm;
const phpMultiLineComment = /\/\*[\s\S]*?\*\//gm;
const phpAllComments = /\/\/.*?$|\/\*[\s\S]*?\*\/|#.*?$/gm;
const emptyLineRegex = /^\s*[\r\n]/gm;

// Fungsi utama untuk menghapus komentar atau garis kosong
function removeCommentsUsingRegex(regex: RegExp, message: string) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('Tidak ada file yang terbuka!');
    return;
  }

  const document = editor.document;
  const text = document.getText();

  const cleanedText = text.replace(regex, '');

  editor.edit((editBuilder) => {
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );
    editBuilder.replace(fullRange, cleanedText);
  });

  vscode.window.showInformationMessage(message);
}

// Fungsi spesifik
export function removeSingleLineComments() {
  removeCommentsUsingRegex(phpSingleLineComment, 'Single-line comments berhasil dihapus!');
}

export function removeMultiLineComments() {
  removeCommentsUsingRegex(phpMultiLineComment, 'Multi-line comments berhasil dihapus!');
}

export function removeAllComments() {
  removeCommentsUsingRegex(phpAllComments, 'Semua komentar berhasil dihapus!');
}

export function removeEmptyLines() {
  removeCommentsUsingRegex(emptyLineRegex, 'Baris kosong berhasil dihapus!');
}
