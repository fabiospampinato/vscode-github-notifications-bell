
/* IMPORT */

import * as vscode from 'vscode';
import statusbar from './statusbar';
import Utils from './utils';

/* ACTIVATE */

function activate ( context: vscode.ExtensionContext ) {

  Utils.state = context.globalState;
  Utils.initCommands ( context );

  context.subscriptions.push ( vscode.window.onDidChangeWindowState ( onDidChangeWindowState ) );

  return statusbar.init ();

}

function onDidChangeWindowState ( event ) {

  if (event.focused && Utils.state.get ( 'didOpenInBrowser', false ) ) {
    
    vscode.commands.executeCommand ( 'githubNotificationsBell.refresh', true );

    Utils.state.update ( 'didOpenInBrowser', false );

  }

}

/* EXPORT */

export {activate};
