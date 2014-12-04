/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
// 条件分岐
var _ = require('lodash');
/**
 * 条件分岐を表すクラス
 */
var Branch = (function () {
    function Branch(id, question) {
        if (question === void 0) { question = null; }
        this.id = id;
        /**
         * 解答の一覧
         */
        this.answers = [];
        /**
         * 質問文
         */
        this.question = null;
        this.question = question;
    }
    /***
     * 条件分岐を追加する
     * @param sentence 質問文
     * @param next     次の会話
     */
    Branch.prototype.add = function (sentence, next) {
        this.answers.push({
            sentence: sentence,
            next: next
        });
        return this;
    };
    /**
     * 条件分岐の質問文と解答のデータを削除する
     */
    Branch.prototype.clear = function () {
        this.answers.length = 0;
        this.question = null;
        return this;
    };
    /**
     * 質問文を取得する
     * 質問文が取得できない場合は、空文字を返す
     */
    Branch.prototype.getQuestionText = function (args) {
        if (this.question) {
            return this.question.getText(args);
        }
        return '';
    };
    /**
     * 解答一覧を取得する
     */
    Branch.prototype.getAnswers = function (args) {
        return _.map(this.answers, function (x) {
            return {
                text: x.sentence.getText(args),
                next: x.next
            };
        });
    };
    Object.defineProperty(Branch.prototype, "length", {
        /**
         * 解答の数を返す
         */
        get: function () {
            return this.answers.length;
        },
        enumerable: true,
        configurable: true
    });
    return Branch;
})();
exports.Branch = Branch;
