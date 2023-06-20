/* eslint-disable censor/no-swear */
import * as vscode from 'vscode';
import { isString } from 'myrmidon';
import logger from '../logger';

const MESSAGES = {
    ERROR_MESSAGE    : 'Error occured',
    EDITOR_NOT_FOUND : 'No editor found'
};

export function CommandDecorator(
    // eslint-disable-next-line no-undef
    fatumRunner: FatumInsertionHandler,
    opts: { prompt?:any} = {}
) {
    return async function () {
        try {
            const { prompt } = opts;

            const editor = vscode.window.activeTextEditor;

            let promptedValue: any;

            if (prompt) {
                const value = await vscode.window.showInputBox({
                    placeHolder : prompt.placeHolder,
                    prompt      : prompt.helperText,
                    value       : prompt.defaultValue
                });

                logger.log('debug', 'received prompt: %s', value);
                promptedValue = prompt.validate(value);
                logger.log('info', 'prompt value %s', promptedValue);
            }

            if (!editor) {
                vscode.window.showErrorMessage(MESSAGES.EDITOR_NOT_FOUND);
                logger.log('error', MESSAGES.EDITOR_NOT_FOUND);

                return;
            }

            const fatumValue = fatumRunner(promptedValue);
            const asString = isString(fatumValue)
                ? fatumValue
                : fatumValue.toString();

            logger.log('info', 'generated %s', fatumValue);

            editor.edit(edit => {
                editor.selections.forEach(selection => {
                    edit.insert(
                        selection.active,
                        asString
                    );
                });
            });
        } catch (error) {
            vscode.window.showErrorMessage(MESSAGES.ERROR_MESSAGE);
            logger.log('error', error);
        }
    };
}
