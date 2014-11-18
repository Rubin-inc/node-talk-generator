/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');
import args = require('./args');

/**
 * 通常のフレーズを表すクラス
 */
export class Phrase extends basicPhrase.BasicPhrase {
    /**
     * フレーズで用いるテキストの配列
     */
    private texts: string[] = [];

    public constructor(id: string) {
        super(id);
    }

    /**
     * ランダムでテキストを返す
     * 候補が無い場合は空文字を返す
     */
    public getText(args: args.PhraseArguments): string {
        return _.sample(this.texts) || '';
    }

    /**
     * フレーズで用いるテキストを追加する
     * @param text フレーズで用いるテキスト
     */
    public add(text: string): Phrase {
        this.texts.push(text);
        return this;
    }

    /**
     * 追加されているテキストの個数を返す
     */
    public get length(): number {
        return this.texts.length;
    }
}
