
/* IMPORT */

import * as open from 'open';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';
import statusbar from './statusbar';

/* COMMANDS */

async function refresh ( silence? ) {

  await statusbar.update ( true );

  if ( !silence ) {
    vscode.window.showInformationMessage ( `GitHub Notifications refreshed. ${Utils.state.get ( 'all', 0 )} Notifications.` );
  }

}

function openInBrowser () {

  const config = Config.get (),
        browser = config.openInBrowser || undefined,
        url = 'https://github.com/notifications';

  open ( url, browser );

  Utils.state.update ( 'didOpenInBrowser', true );

}

/* EXPORT */

export {openInBrowser, refresh};
