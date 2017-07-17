
/* IMPORT */

import * as vscode from 'vscode';
import statusbar from './statusbar';
import Utils from './utils';

/* ACTIVATE */

async function activate ( context: vscode.ExtensionContext ) {

  Utils.initCommands ( context );

  return statusbar.init ();

}

/* EXPORT */

export {activate};
