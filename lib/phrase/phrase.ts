/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');
import args = require('./args');

export class Phrase extends basicPhrase.BasicPhrase {
    public constructor(id: string) {
        super(id);
    }

    public getText(args: args.PhraseArguments): string {
        return null;
    }
}
