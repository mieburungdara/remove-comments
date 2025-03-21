import * as vscode from 'vscode';

// Regex umum untuk berbagai jenis komentar
const commentPatterns: { [key: string]: RegExp[] } = {
  'javascript': [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  'typescript': [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  'c': [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  'cpp': [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  'java': [/\/\/.*$/gm, /\/\*[\s\S]*?\*\//gm],
  'python': [/#.*$/gm],
  'ruby': [/#.*$/gm],
  'shellscript': [/#.*$/gm],
  'yaml': [/#.*$/gm],
  'html': [/<!--[\s\S]*?-->/gm],
  'xml': [/<!--[\s\S]*?-->/gm],
  'lisp': [/;.*$/gm],
  'assembly': [/;.*$/gm],
  'php': [\/\*.*?\*\/|\/\/(?!\[|\w).*|#.*]
};

// Fungsi untuk menghapus komentar
export function removeComments() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage('Tidak ada file yang terbuka!');
    return;
  }

  const document = editor.document;
  const languageId = document.languageId;
  const text = document.getText();

  const patterns = commentPatterns[languageId];
  if (!patterns) {
    vscode.window.showErrorMessage(`Bahasa ${languageId} belum didukung.`);
    return;
  }
  
  // Regex khusus untuk PHP
  if (languageId === 'php') {
    const phpCommentRegex = /\/\/.*?$|\/\*[\s\S]*?\*\/|#.*?$/gm;
    const cleanedText = text.replace(phpCommentRegex, '');

    editor.edit((editBuilder) => {
      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );
      editBuilder.replace(fullRange, cleanedText);
    });

    vscode.window.showInformationMessage('Semua komentar PHP berhasil dihapus!');
  } else {
    vscode.window.showErrorMessage('File ini bukan file PHP!');
  }

  let cleanedText = text;
  patterns.forEach(pattern => {
    cleanedText = cleanedText.replace(pattern, '');
  });

  editor.edit((editBuilder) => {
    const fullRange = new vscode.Range(
      document.positionAt(0),
      document.positionAt(text.length)
    );
    editBuilder.replace(fullRange, cleanedText);
  });

  vscode.window.showInformationMessage(`Komentar berhasil dihapus untuk ${languageId}!`);
}
