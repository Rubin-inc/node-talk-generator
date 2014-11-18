/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// フレーズの実装
var _ = require('lodash');
var basicPhrase = require('./basicPhrase');
/**
 * 通常のフレーズを表すクラス
 */
var Phrase = (function (_super) {
    __extends(Phrase, _super);
    function Phrase(id) {
        _super.call(this, id);
        /**
         * フレーズで用いるテキストの配列
         */
        this.texts = [];
    }
    /**
     * ランダムでテキストを返す
     * 候補が無い場合は空文字を返す
     */
    Phrase.prototype.getText = function (args) {
        return _.sample(this.texts) || '';
    };
    /**
     * フレーズで用いるテキストを追加する
     * @param text フレーズで用いるテキスト
     */
    Phrase.prototype.add = function (text) {
        this.texts.push(text);
        return this;
    };
    Object.defineProperty(Phrase.prototype, "length", {
        /**
         * 追加されているテキストの個数を返す
         */
        get: function () {
            return this.texts.length;
        },
        enumerable: true,
        configurable: true
    });
    return Phrase;
})(basicPhrase.BasicPhrase);
exports.Phrase = Phrase;
