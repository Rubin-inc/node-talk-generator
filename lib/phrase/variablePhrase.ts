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
    public getText(args: args.PhraseArguments): string {
        var prefix = this.prefix || '';
        var suffix = this.suffix || '';
        var val = this.getArgumentsValue(args, this.variableName); // 変数値

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

    /**
     * 変数の値を取得する
     * 変数の値が存在しない場合、空文字として扱う (運用時を考え、エラーにはしない)
     */
    private getArgumentsValue(args: args.PhraseArguments, variableName: string): string {
        // 変数名が正常でない場合
        if (!variableName) {
            return '';
        }

        // 引数の値が正常である場合
        if (args && _.has(args, variableName) && _.isString(args[variableName])) {
            return args[variableName];
        }

        // 異常時は空文字
        return '';
    }
}