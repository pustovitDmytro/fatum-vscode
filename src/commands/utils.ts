import * as vscode from 'vscode';
import fatum from 'fatum';

const MESSAGES = {
    ERROR_MESSAGE    : 'Error occured',
    EDITOR_NOT_FOUND : 'No editor found'
};

export function fatumCommandDecorator(
    // eslint-disable-next-line no-undef
    cb: FatumInsertionHandler,
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

                promptedValue = prompt.validate(value);
            }

            if (!editor) {
                vscode.window.showErrorMessage(MESSAGES.EDITOR_NOT_FOUND);

                return;
            }

            editor.edit(edit => {
                editor.selections.forEach(selection => {
                    edit.insert(
                        selection.active,
                        // eslint-disable-next-line callback-return , promise/prefer-await-to-callbacks
                        cb(fatum, { prompt: promptedValue })
                    );
                });
            });
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage(MESSAGES.ERROR_MESSAGE);
        }
    };
}
