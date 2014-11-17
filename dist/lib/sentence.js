/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
var Sentence = (function () {
    function Sentence(id) {
        this.id = id;
        this.phrases = [];
    }
    /**
     * フレーズを追加する
     */
    Sentence.prototype.add = function (phrase) {
        this.phrases.push(phrase);
        return this;
    };
    /**
     * 文章の構成要素をクリアする
     */
    Sentence.prototype.clear = function () {
        this.phrases.length = 0;
        return this;
    };
    Object.defineProperty(Sentence.prototype, "length", {
        get: function () {
            return this.phrases.length;
        },
        enumerable: true,
        configurable: true
    });
    return Sentence;
})();
exports.Sentence = Sentence;
