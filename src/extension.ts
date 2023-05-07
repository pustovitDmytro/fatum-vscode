import * as vscode from 'vscode';
import * as commands from './commands';

const MESSAGES = {
    'ACTIVATION' : 'Extension "fatum" is active'
};

export function activate(context: vscode.ExtensionContext) {
    console.log(MESSAGES.ACTIVATION);

    context.subscriptions.push(
        vscode.commands.registerCommand('fatum.firstName', commands.firstName),
        vscode.commands.registerCommand('fatum.password', commands.password),
        vscode.commands.registerCommand('fatum.int', commands.int),
    );
}

export function deactivate() {}
