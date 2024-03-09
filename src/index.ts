
/* IMPORT */

import vscode from 'vscode';
import Context from './context';
import * as Commands from './commands';
import Secrets from './secrets';
import Statusbar from './statusbar';

/* MAIN */

const activate = async ( context: vscode.ExtensionContext ): Promise<void> => {

  /* INIT */

  Context.secrets = context.secrets;
  Context.store = context.globalState;

  await Secrets.initToken ();

  Statusbar.refresh ( Context.statusbar );
  Commands.update ( false );

  /* COMMANDS */

  vscode.commands.registerCommand ( 'githubNotificationsBell.openInBrowser', Commands.openInBrowser );
  vscode.commands.registerCommand ( 'githubNotificationsBell.refresh', Commands.refresh );
  vscode.commands.registerCommand ( 'githubNotificationsBell.setToken', Commands.setToken );

  /* SETTINGS CHANGE */

  vscode.workspace.onDidChangeConfiguration ( () => Commands.update ( true ) );

  setInterval ( () => Commands.update ( false ), 30_000 );

  /* SECRETS CHANGE */

  Context.secrets?.onDidChange ( async () => {

    Secrets.initToken ();
    Commands.update ( true );

  });

};

/* EXPORT */

export {activate};
