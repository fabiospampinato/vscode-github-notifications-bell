
/* IMPORT */

import vscode from 'vscode';
import Statusbar from './statusbar';

/* MAIN */

const Context = {
  store: <vscode.Memento | null> null,
  statusbar: <vscode.StatusBarItem> Statusbar.create ()
};

/* EXPORT */

export default Context;
