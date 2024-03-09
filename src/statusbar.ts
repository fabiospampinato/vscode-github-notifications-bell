
/* IMPORT */

import vscode from 'vscode';
import Context from './context';
import State from './state';
import {getOptions, once} from './utils';

/* MAIN */

const Statusbar = {

  /* API */

  create: once ((): vscode.StatusBarItem => {

    const options = getOptions ();
    const alignment = ( options.alignment === 'left' ) ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right;
    const priority = -Infinity;
    const item = vscode.window.createStatusBarItem ( alignment, priority );

    return item;

  }),

  refresh: ( item: vscode.StatusBarItem ): void => {

    const options = getOptions ();
    const enabled = !!Context.token;
    const counter = State.getCounter ();
    const visible = !enabled || counter || !options.hideIfNone;

    item.command = enabled ? 'githubNotificationsBell.openInBrowser' : 'githubNotificationsBell.setToken';
    item.text = `$(${options.icon})${counter && options.showNumberOfNotifications ? ` ${counter}` : ''}`;
    item.color = enabled ? options.color : '#ff2200';
    item.tooltip = `${counter} Notifications`;
    item[visible ? 'show' : 'hide']();

  }

};

/* EXPORT */

export default Statusbar;
