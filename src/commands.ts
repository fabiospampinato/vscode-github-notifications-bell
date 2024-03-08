
/* IMPORT */

import vscode from 'vscode';
import Context from './context';
import State from './state';
import Statusbar from './statusbar';
import {getOptions} from './utils';

/* MAIN */

const openInBrowser = (): void => {

  const options = getOptions ();
  const url = `${options.protocol}://${options.domain}/notifications`;

  vscode.env.openExternal ( vscode.Uri.parse ( url ) );

};

const refresh = async ( showNotification: boolean = true ): Promise<void> => {

  await update ( true );

  if ( showNotification ) {

    vscode.window.showInformationMessage ( `GitHub Notifications refreshed. ${State.getCounter ()} Notifications.` );

  }

};

const update = async ( force?: boolean ): Promise<void> => {

  await State.refresh ( force );
  await Statusbar.refresh ( Context.statusbar );

};

/* EXPORT */

export {openInBrowser, refresh, update};
