import * as vscode from 'vscode';
import fatumCommands from './commands/fatum';
import logger from './logger';

const MESSAGES = {
    'ACTIVATION' : 'Extension activated'
};

export function activate(context: vscode.ExtensionContext) {
    logger.info(MESSAGES.ACTIVATION);

    context.subscriptions.push(
        ...fatumCommands.map(
            command =>
                vscode.commands.registerCommand(command.id, command.handler)
        )
    );
}

export function deactivate() {}
