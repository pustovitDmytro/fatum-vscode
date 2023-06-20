import * as vscode from 'vscode';
import { createLogger, format } from 'winston';
import VSCTransport from 'winston-vscode';
import packageInfo from '../package.json';

const transport  = new VSCTransport({
    window : vscode.window,
    name   : 'Fatum'
});

const perfix = `${packageInfo.name} v.${packageInfo.version}`;

export default createLogger({
    level  : 'info',
    format : format.combine(
        format.splat(),
        format.printf(({ message }:{ message:string }) => {
            return `${perfix} ${message}`;
        })
    ),
    transports : [ transport ]
});
