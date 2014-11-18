/// <reference path="../../typings/node/node.d.ts" />

// フレーズの抽象クラスの実装

import args = require('./args');

export class BasicPhrase {
    public constructor(public id: string) {
    }

    public getText(args: args.PhraseArguments): string {
        throw new Error('Not Implemented');
    }
}