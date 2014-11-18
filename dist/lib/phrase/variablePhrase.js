/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// 変数フレーズの実装
var _ = require('lodash');
var basicPhrase = require('./basicPhrase');
/**
 * 変数を含んだテキストを出力するフレーズ
 */
var VariablePhrase = (function (_super) {
    __extends(VariablePhrase, _super);
    /**
     * フレーズの初期化を行う
     * 変数名、接頭語、接尾語は getText() 呼び出しまでに設定すれば OK
     */
    function VariablePhrase(id, variableName, prefix, suffix) {
        if (variableName === void 0) { variableName = null; }
        if (prefix === void 0) { prefix = ''; }
        if (suffix === void 0) { suffix = ''; }
        _super.call(this, id);
        /**
         * 変数名
         */
        this.variableName = null;
        /**
         * 接頭語
         */
        this.prefix = '';
        /**
         * 接尾語
         */
        this.suffix = '';
        this.variableName = variableName;
        this.prefix = prefix;
        this.suffix = suffix;
    }
    /**
     * フレーズを生成して返す
     * 変数名が無効な場合、変数値は空文字として扱う
     * 変数値が文字列でない場合、変数値は空文字として扱う
     */
    VariablePhrase.prototype.getText = function (args) {
        var prefix = this.prefix || '';
        var suffix = this.suffix || '';
        var val = this.getArgumentsValue(args, this.variableName); // 変数値
        return prefix + val + suffix;
    };
    /**
     * フレーズを初期化する
     * 変数名、接頭語、接尾語はクリアされる
     */
    VariablePhrase.prototype.clear = function () {
        this.variableName = null;
        this.prefix = '';
        this.suffix = '';
        return this;
    };
    /**
     * 変数の値を取得する
     * 変数の値が存在しない場合、空文字として扱う (運用時を考え、エラーにはしない)
     */
    VariablePhrase.prototype.getArgumentsValue = function (args, variableName) {
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
    };
    return VariablePhrase;
})(basicPhrase.BasicPhrase);
exports.VariablePhrase = VariablePhrase;
