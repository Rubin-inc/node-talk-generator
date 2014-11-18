/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// 条件フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');

export class BranchPhrase extends basicPhrase.BasicPhrase {
    public getText(): string {
        throw 'Not Implemented';
    }
} 