/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
// 条件分岐
var _ = require('lodash');
/**
 * 条件分岐を表すクラス
 */
var Branch = (function () {
    function Branch(id, question) {
        this.id = id;
        this.question = question;
        /**
         * 解答の一覧
         */
        this.answers = [];
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
        return this;
    };
    /**
     * 質問文を取得する
     */
    Branch.prototype.getQuestionText = function (args) {
        return this.question.getText(args);
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
    return Branch;
})();
exports.Branch = Branch;
