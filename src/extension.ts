
/* IMPORT */

import * as vscode from 'vscode';
import statusbar from './statusbar';
import Utils from './utils';

/* ACTIVATE */

function activate ( context: vscode.ExtensionContext ) {

  Utils.state = context.globalState;
  Utils.initCommands ( context );

  return statusbar.init ();

}

/* EXPORT */

export {activate};
