
/* IMPORT */

import * as open from 'open';
import Config from './config';
import statusbar from './statusbar';

/* COMMANDS */

function refresh () {

  statusbar.update ();

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
