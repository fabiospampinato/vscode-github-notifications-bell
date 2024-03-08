
/* IMPORT */

import Context from './context';
import {getOptions} from './utils';

/* HELPERS */

const KEY_COUNTER = 'githubNotificationsBell.counter';
const KEY_DATE = 'githubNotificationsBell.date';

/* MAIN */

const State = {

  /* API */

  getCounter: (): number => {

    return Context.store?.get ( KEY_COUNTER, 0 ) || 0;

  },

  setCounter: ( counter: number ): void => {

    Context.store?.update ( KEY_COUNTER, counter );

  },

  getDate: (): number => {

    return Context.store?.get ( KEY_DATE, 0 ) || 0;

  },

  setDate: ( date: number ): void => {

    Context.store?.update ( KEY_DATE, date );

  },

  fetch: async ( page: number = 1 ): Promise<number> => {

    try {

      const options = getOptions ();

      const headers = {
        'Authorization': `token ${options.token}`,
        'User-Agent': 'vscode-github-notifications-bell'
      };

      const url = `${options.protocol}://api.${options.domain}/notifications?page=${page}`;
      const response = await fetch ( url, { headers } );
      const result = await response.json ();
      const resultsPerPage = 50;
      const counter = result.length || 0;
      const isLastPage = ( counter !== resultsPerPage );

      return isLastPage ? counter : counter + await State.fetch ( page + 1 );

    } catch ( error ) {

      console.error ( error );

      return 0;

    }

  },

  refresh: async ( force?: boolean ): Promise<void> => {

    const options = getOptions ();
    const isRefreshable = force || ( Date.now () - State.getDate () ) >= ( options.refreshInterval * 1000 );

    if ( !isRefreshable ) return;

    State.setDate ( Date.now () );

    const counter = await State.fetch ();

    State.setCounter ( counter );

  }

};

/* EXPORT */

export default State;
