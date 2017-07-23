
/* IMPORT */

import * as _ from 'lodash';
import * as open from 'open';
import * as vscode from 'vscode';
import Config from './config';
import statusbar from './statusbar';

/* COMMANDS */

async function refresh () {

  const result = await statusbar.update ();

  if ( result === true ) vscode.window.showInformationMessage ( `GitHub Notifications refreshed. ${statusbar.allNr} Notifications - ${statusbar.mineNr} Participating.` );

}

async function openInBrowser () {

  const config = await Config.get (),
        browser = config.openInBrowser || undefined,
        url = statusbar.mineNr
                ? 'https://github.com/notifications/participating'
                : 'https://github.com/notifications';

  open ( url, browser );

}

/* EXPORT */

export {openInBrowser, refresh};
