
/* IMPORT */

import * as pify from 'pify';
import * as request from 'request';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* STATUSBAR */

class Statusbar {

  bell; config; token; all = 0;

  async init () {

    await this.initBell ();

    this.update ();

    vscode.workspace.onDidChangeConfiguration ( this.update.bind ( this ) );

    setInterval ( this.update.bind ( this ), 30000 );

  }

  initBell () {

    this.updateConfig ();

    const alignment = ( this.config.alignment === 'left' ) ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right;

    this.bell = vscode.window.createStatusBarItem ( alignment, -Infinity );
    this.bell.text = `$(${this.config.icon})`;
    this.bell.command = 'githubNotificationsBell.openInBrowser';

  }

  async update ( force? ) {

    this.updateConfig ();
    this.updateToken ();

    if ( !this.token ) return vscode.window.showErrorMessage ( 'You need to provide an OAuth token either via the "githubNotificationsBell.oauthToken" setting or the "GITHUB_NOTIFICATIONS_TOKEN" environment variable' );

    await this.updateState ( force );

    this.updateText ();
    this.updateColor ();
    this.updateTooltip ();
    this.updateVisibility ();

  }

  updateConfig () {

    this.config = Config.get ();

  }

  updateToken () {

    this.token = this.config.oauthToken || process.env.GITHUB_NOTIFICATIONS_TOKEN;

  }

  async updateState ( force? ) {

    if ( force || ( Date.now () - Utils.state.get ( 'date', 0 ) ) >= ( this.config.refreshInterval * 1000 ) ) { // Refresh

      await Utils.state.update ( 'date', Date.now () );

      try {

        const headers = {
          Authorization: `token ${this.token}`,
          'User-Agent': 'vscode-github-notifications-bell'
        };

        const { domain } = this.config;

        const result = await Promise.all ([
          pify ( request )({ url: `https://${domain}/notifications`, headers })
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
