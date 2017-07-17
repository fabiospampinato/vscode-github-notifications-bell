
/* IMPORT */

import * as pify from 'pify';
import * as request from 'request';
import * as vscode from 'vscode';
import Config from './config';
import Utils from './utils';

/* STATUSBAR */

class Statusbar {

  bell; config; allNr = 0; mineNr = 0;

  async init () {

    await this.initBell ();

    this.update ();

    vscode.workspace.onDidChangeConfiguration ( this.update.bind ( this ) );

  }

  async initBell () {

    const config = await Config.get (),
          alignment = config.alignment === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right;

    this.bell = vscode.window.createStatusBarItem ( alignment, -Infinity );
    this.bell.text = '$(bell)';
    this.bell.command = 'githubNotificationsBell.openInBrowser';

  }

  async update () {

    this.config = await Config.get ();

    if ( !this.config.oauthToken ) return vscode.window.showErrorMessage ( 'You need to provide an OAuth token via the "githubNotificationsBell.oauthToken" setting' );

    await this.updateVariables ();
    this.updateColor ();
    this.updateTooltip ();
    this.updateVisibility ();

    setTimeout ( this.update.bind ( this ), this.config.refreshInterval * 1000 );

  }

  async updateVariables () {

    try {

      const headers = {
        Authorization: `token ${this.config.oauthToken}`,
        'User-Agent': 'vscode-github-notifications-bell'
      };

      const result = await Promise.all ([
        pify ( request )({ url: 'https://api.github.com/notifications', headers }),
        pify ( request )({ url: 'https://api.github.com/notifications?participating=1', headers })
      ]);

      this.allNr = JSON.parse ( result[0].body ).length;
      this.mineNr = JSON.parse ( result[1].body ).length;

    } catch ( e ) {}

  }

  updateColor () {

    const {color, colorNone, colorParticipating} = this.config;

    this.bell.color = this.allNr
                        ? this.mineNr
                          ? colorParticipating
                          : color
                        : colorNone;

  }

  updateTooltip () {

    this.bell.tooltip = `${this.allNr} Notifications - ${this.mineNr} Participating`;

  }

  updateVisibility () {

    const {hideIfNone, hideIfNotParticipating} = this.config;
    const isVisible = this.allNr
                        ? this.mineNr
                          ? true
                          : !hideIfNotParticipating
                        : !hideIfNone;

    this.bell[isVisible ? 'show' : 'hide']();

  }

}

/* EXPORT */

const statusbar = new Statusbar ();

export default statusbar;
