
/* IMPORT */

import {alert, openInExternal} from 'vscode-extras';
import Context from './context';
import Secrets from './secrets';
import State from './state';
import Statusbar from './statusbar';
import {getOptions} from './utils';

/* MAIN */

const openInBrowser = (): void => {

  const options = getOptions ();
  const url = `${options.protocol}://${options.domain}/notifications`;

  openInExternal ( url );

};

const refresh = async ( showNotification: boolean = true ): Promise<void> => {

  await update ( true );

  if ( showNotification ) {

    alert.info ( `GitHub Notifications refreshed. ${State.getCounter ()} Notifications.` );

  }

};

const setToken = async (): Promise<void> => {

  await Secrets.updateToken ();

};

const update = async ( force?: boolean ): Promise<void> => {

  await State.refresh ( force );
  await Statusbar.refresh ( Context.statusbar );

};

/* EXPORT */

export {openInBrowser, refresh, setToken, update};
