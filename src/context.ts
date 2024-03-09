
/* IMPORT */

import vscode from 'vscode';
import Statusbar from './statusbar';

/* MAIN */

const Context = {
  token: <string | undefined> undefined,
  secrets: <vscode.SecretStorage | undefined> undefined,
  store: <vscode.Memento | undefined> undefined,
  statusbar: <vscode.StatusBarItem> Statusbar.create ()
};

/* EXPORT */

export default Context;
