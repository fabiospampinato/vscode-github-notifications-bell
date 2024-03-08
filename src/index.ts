
/* IMPORT */

import vscode from 'vscode';
import Context from './context';
import * as Commands from './commands';
import Statusbar from './statusbar';

/* MAIN */

//TODO: Rename "oauthToken" to "patToken", or better yet switch to the secure authorization API

const activate = ( context: vscode.ExtensionContext ): void => {

  /* INIT */

  Context.store = context.globalState;
  Statusbar.refresh ( Context.statusbar );
  Commands.update ( false );

  /* COMMANDS */

  vscode.commands.registerCommand ( 'githubNotificationsBell.refresh', Commands.refresh );
  vscode.commands.registerCommand ( 'githubNotificationsBell.openInBrowser', Commands.openInBrowser );

  /* SETTINGS */

  vscode.workspace.onDidChangeConfiguration ( () => Commands.update ( true ) );

  setInterval ( () => Commands.update ( false ), 30_000 );

};

/* EXPORT */

export {activate};
