/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import _ = require('lodash');

import phrase = require('./phrase/index');

export class Sentence {
    /**
     * フレーズ一覧
     */
    private phrases: phrase.BasicPhrase[] = [];

    public constructor(public id: string) { }

    /**
     * 文章を構成し、返す
     */
    public getText(args: phrase.PhraseArguments): string {
        var texts = _.map(this.phrases, p => p.getText(args)); // 各フレーズを変換
        return texts.join('');
    }

    /**
     * フレーズを追加する
     */
    public add(phrase: phrase.BasicPhrase): Sentence {
        this.phrases.push(phrase);
        return this;
    }

    /**
     * フレーズ一覧をクリアする
     */
    public clear(): Sentence {
        this.phrases.length = 0;
        return this;
    }

    /**
     * フレーズの個数を取得する
     */
    public get length(): number {
        return this.phrases.length;
    }

    /**
     * フレーズ一覧を取得する
     */
    public items(): phrase.BasicPhrase[] {
        return this.phrases;
    }
}
