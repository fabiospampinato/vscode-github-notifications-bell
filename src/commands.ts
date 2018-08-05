
/* IMPORT */

import * as open from 'open';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';
import statusbar from './statusbar';

/* COMMANDS */

async function refresh () {

  await statusbar.update ( true );

  vscode.window.showInformationMessage ( `GitHub Notifications refreshed. ${Utils.state.get ( 'all', 0 )} Notifications - ${Utils.state.get ( 'participating', 0 )} Participating.` );

}

function openInBrowser () {

  const config = Config.get (),
        browser = config.openInBrowser || undefined,
        url = Utils.state.get ( 'participating', 0 )
                ? 'https://github.com/notifications/participating'
                : 'https://github.com/notifications';

  open ( url, browser );

}

/* EXPORT */

export {openInBrowser, refresh};
