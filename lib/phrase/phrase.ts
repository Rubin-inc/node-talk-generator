﻿/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');

export class Phrase extends basicPhrase.BasicPhrase {
    public constructor(id: string) {
        super(id);
    }

    public getText(args: { [key: string]: string }): string {
        return null;
    }
}
