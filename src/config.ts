
/* IMPORT */

import * as vscode from 'vscode';

/* CONFIG */

const Config = {

  getExtension ( extension = 'githubNotificationsBell' ) {

    const config = vscode.workspace.getConfiguration ().get ( extension );

    return config as any;

  },

  async get () {

    return Config.getExtension ();

  }

};

/* EXPORT */

export default Config;
