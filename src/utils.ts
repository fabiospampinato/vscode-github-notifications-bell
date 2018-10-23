
/* IMPORT */

import * as _ from 'lodash';
import * as vscode from 'vscode';
import * as Commands from './commands';

/* UTILS */

const Utils = {

  state: <vscode.Memento> null,

  initCommands ( context: vscode.ExtensionContext ) {

    const {commands} = vscode.extensions.getExtension ( 'fabiospampinato.vscode-github-notifications-bell' ).packageJSON.contributes;

    commands.forEach ( ({ command, title }) => {

      const commandName = _.last ( command.split ( '.' ) ) as string,
            handler = Commands[commandName],
            disposable = vscode.commands.registerCommand ( command, args => handler ( args ) );

      context.subscriptions.push ( disposable );

    });

    return Commands;

  }

};

/* EXPORT */

export default Utils;
