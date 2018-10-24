
/* IMPORT */

import * as pify from 'pify';
import * as request from 'request';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* STATUSBAR */

class Statusbar {

  bell; config; all = 0;

  async init () {

    await this.initBell ();

    this.update ();

    vscode.workspace.onDidChangeConfiguration ( this.update.bind ( this ) );

    setInterval ( this.update.bind ( this ), 30000 );

  }

  initBell () {

    const config = Config.get (),
          alignment = config.alignment === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right;

    this.bell = vscode.window.createStatusBarItem ( alignment, -Infinity );
    this.bell.text = `$(${config.icon})`;
    this.bell.command = 'githubNotificationsBell.openInBrowser';

  }

  async update ( force? ) {

    this.config = Config.get ();

    if ( !this.config.oauthToken ) return vscode.window.showErrorMessage ( 'You need to provide an OAuth token via the "githubNotificationsBell.oauthToken" setting' );

    await this.updateState ( force );
    this.updateText ();
    this.updateColor ();
    this.updateTooltip ();
    this.updateVisibility ();

  }

  async updateState ( force? ) {

    if ( force || ( Date.now () - Utils.state.get ( 'date', 0 ) ) >= ( this.config.refreshInterval * 1000 ) ) { // Refresh

      await Utils.state.update ( 'date', Date.now () );

      try {

        const headers = {
          Authorization: `token ${this.config.oauthToken}`,
          'User-Agent': 'vscode-github-notifications-bell'
        };

        const result = await Promise.all ([
          pify ( request )({ url: 'https://api.github.com/notifications', headers })
        ]);

        await Utils.state.update ( 'all', JSON.parse ( result[0].body ).length );

      } catch ( e ) {}

    }

    this.all = Utils.state.get ( 'all', 0 );

  }

  updateText () {

    this.bell.text = this.all ? `$(${this.config.icon}) ${this.all}` : `$(${this.config.icon})`;

  }

  updateColor () {

    const {color} = this.config;

    this.bell.color = this.all ? color : '';

  }

  updateTooltip () {

    this.bell.tooltip = `${this.all} Notifications`;

  }

  updateVisibility () {

    const {hideIfNone} = this.config;
    const isVisible = this.all || !hideIfNone;

    this.bell[isVisible ? 'show' : 'hide']();

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
