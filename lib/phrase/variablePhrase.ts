/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// 変数フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');

export class VariablePhrase extends basicPhrase.BasicPhrase {
    public getText(args: { [key: string]: string }): string {
        return null;
    }
} 