
/* IMPORT */

import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';
import statusbar from './statusbar';

/* COMMANDS */

async function refresh ( showNotification = true ) {

  await statusbar.update ( true );

  if ( showNotification ) {

    vscode.window.showInformationMessage ( `GitHub Notifications refreshed. ${Utils.state.get ( 'all', 0 )} Notifications.` );

  }

}

function openInBrowser () {

  const url = 'https://github.com/notifications';

  vscode.commands.executeCommand ( 'vscode.open', vscode.Uri.parse(url) );

  Utils.state.update ( 'didOpenInBrowser', true );

}

/* EXPORT */

export {openInBrowser, refresh};
