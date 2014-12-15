/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// 変数フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');
import args = require('./args');

/**
 * 変数を含んだテキストを出力するフレーズ
 */
export class VariablePhrase extends basicPhrase.BasicPhrase {
    /**
     * 変数名
     */
    public variableName: string = null;
    
    /**
     * 接頭語
     */
    public prefix = '';

    /**
     * 接尾語
     */
    public suffix = '';

    /**
     * フレーズの初期化を行う
     * 変数名、接頭語、接尾語は getText() 呼び出しまでに設定すれば OK
     */
    public constructor(
        id: string,
        variableName: string = null,
        prefix = '',
        suffix = ''
        ) {
        super(id);

        this.variableName = variableName;
        this.prefix = prefix;
        this.suffix = suffix;
    }

    /**
     * フレーズを生成して返す
     * 変数名が無効な場合、変数値は空文字として扱う
     * 変数値が文字列でない場合、変数値は空文字として扱う
     */
    public getText(args_: args.PhraseArguments): string {
        var prefix = this.prefix || '';
        var suffix = this.suffix || '';
        var val = args.getArgumentsValue(args_, this.variableName); // 変数値

        return prefix + val + suffix;
    }

    /**
     * フレーズを初期化する
     * 変数名、接頭語、接尾語はクリアされる
     */
    public clear(): VariablePhrase {
        this.variableName = null;
        this.prefix = '';
        this.suffix = '';

        return this;
    }
}