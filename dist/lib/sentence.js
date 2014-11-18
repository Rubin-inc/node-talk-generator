/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
var _ = require('lodash');
var Sentence = (function () {
    function Sentence(id) {
        this.id = id;
        /**
         * フレーズ一覧
         */
        this.phrases = [];
    }
    /**
     * 文章を構成し、返す
     */
    Sentence.prototype.getText = function (args) {
        var texts = _.map(this.phrases, function (p) { return p.getText(args); }); // 各フレーズを変換
        return texts.join('');
    };
    /**
     * フレーズを追加する
     */
    Sentence.prototype.add = function (phrase) {
        this.phrases.push(phrase);
        return this;
    };
    /**
     * フレーズ一覧をクリアする
     */
    Sentence.prototype.clear = function () {
        this.phrases.length = 0;
        return this;
    };
    Object.defineProperty(Sentence.prototype, "length", {
        /**
         * フレーズの個数を取得する
         */
        get: function () {
            return this.phrases.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * フレーズ一覧を取得する
     */
    Sentence.prototype.items = function () {
        return this.phrases;
    };
    return Sentence;
})();
exports.Sentence = Sentence;
