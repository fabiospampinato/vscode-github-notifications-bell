
/* IMPORT */

import vscode from 'vscode';
import Context from './context';

/* MAIN */

const Secrets = {

  /* API */

  getToken: async (): Promise<string | undefined> => {

    return Context.secrets?.get ( 'token' );

  },

  setToken: async ( token: string ): Promise<void> => {

    Context.token = token;

    return Context.secrets?.store ( 'token', token );

  },

  initToken: async (): Promise<void> => {

    const token = await Secrets.getToken ();

    if ( token ) {

      Context.token = token;

    } else {

      await Secrets.updateToken ();

    }

  },

  updateToken: async (): Promise<void> => {

    const token = await vscode.window.showInputBox ({
      title: 'GitHub Notifications - Personal Access Token',
      password: true
    });

    if ( !token ) return;

    return Secrets.setToken ( token );

  }

};

/* EXPORT */

export default Secrets;
