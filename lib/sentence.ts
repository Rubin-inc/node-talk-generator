/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import _ = require('lodash');

import phrase = require('./phrase/index');

export class Sentence {
    private phrases: phrase.BasicPhrase[] = [];

    public constructor(public id: string) { }

    /**
     * フレーズを追加する
     */
    public add(phrase: phrase.BasicPhrase): Sentence {
        this.phrases.push(phrase);
        return this;
    }

    /**
     * 文章の構成要素をクリアする
     */
    public clear(): Sentence {
        this.phrases.length = 0;
        return this;
    }

    public get length(): number {
        return this.phrases.length;
    }
}
