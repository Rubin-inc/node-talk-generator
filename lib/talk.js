/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
// 会話
var _ = require('lodash');
var sentence = require('./sentence');
var pointer = require('./pointer');
var branch = require('./branch');
var input = require('./input');
/**
 * 会話を表すクラス
 */
var Talk = (function () {
    /**
     * 会話を新規に作成する
     * @param id         会話 ID
     * @param entryPoint 会話が開始地点であるか
     */
    function Talk(id, entryPoint) {
        if (entryPoint === void 0) { entryPoint = false; }
        this.entryPoint = entryPoint;
        /**
         * 現在の会話位置を表す
         */
        this.pointer = new pointer.Pointer();
        /**
         * 文章の一覧を表す
         */
        this.sentences = [];
        this.sentencesHash = {};
        /**
         * 文章 ID の一覧
         */
        this.sentenceIds = [];
        /**
         * 条件分岐が存在する場合、条件分岐
         */
        this.branch = null;
        /**
         * 入力が存在する場合、入力
         */
        this.input = null;
        this.pointer.talkId = id;
        this.pointer.sentenceId = null;
        this.pointer.branchId = null;
    }
    /**
     * 会話を途中から再開する
     */
    Talk.prototype.resume = function (pointer) {
        // 違う会話のポインタである場合
        if (this.id !== pointer.talkId) {
            throw new Error('TalkId does not match');
        }
        this.pointer = pointer;
        return this;
    };
    /**
     * 会話をリセットし、はじめから開始する
     */
    Talk.prototype.reset = function () {
        this.pointer.branchId = null;
        this.pointer.sentenceId = null;
        this.pointer.inputId = null;
        return this;
    };
    /**
     * 次の文章を開始する
     */
    Talk.prototype.next = function () {
        // 現在の文書 ID & 分岐 ID が無い場合、新規に開始する
        if (!this.pointer.sentenceId && !this.pointer.branchId && !this.pointer.inputId) {
            // 文章がある場合
            if (this.sentenceIds.length > 0) {
                this.pointer.sentenceId = this.sentenceIds[0];
            }
            else if (this.branch) {
                this.pointer.branchId = this.branch.id;
            }
            else if (this.input) {
                this.pointer.inputId = this.input.id;
            }
            else {
                return {}; // 会話終了
            }
        }
        else {
            // 分岐で終了している場合
            if (this.pointer.branchId) {
                // 会話終了
                return {
                    prevBranch: this.branch
                };
            }
            else if (this.pointer.inputId) {
                // 会話終了
                return {
                    prevInput: this.input
                };
            }
            else {
                // 現在の文章 ID の位置を調べる
                var current = _.indexOf(this.sentenceIds, this.pointer.sentenceId);
                // 現在の文章が見つからない場合
                if (current < 0) {
                    this.pointer.sentenceId = null;
                    return {}; // 会話終了
                }
                // 次の文章へ移動
                this.pointer.sentenceId = this.sentenceIds[current + 1];
                // 次の文章が見つからない場合
                if (!this.pointer.sentenceId) {
                    // 分岐が存在する場合
                    if (this.branch) {
                        this.pointer.branchId = this.branch.id;
                    }
                    else if (this.input) {
                        this.pointer.inputId = this.input.id;
                    }
                    else {
                        return {}; // 会話終了
                    }
                }
            }
        }
        // 次の構成要素を返す
        if (this.pointer.sentenceId) {
            return {
                sentence: _.sample(this.sentencesHash[this.pointer.sentenceId])
            };
        }
        else if (this.pointer.inputId) {
            return {
                input: this.input
            };
        }
        else {
            return {
                branch: this.branch
            };
        }
    };
    Talk.prototype.add = function (item) {
        if (item instanceof input.Input) {
            this.input = item;
        }
        else if (item instanceof sentence.Sentence) {
            var s = item;
            this.sentences.push(s);
            // 文書 ID は重複可なため、配列で保持
            // 既に同じ ID が存在する場合
            if (this.sentencesHash[s.id]) {
                this.sentencesHash[s.id].push(s);
            }
            else {
                this.sentenceIds.push(s.id);
                this.sentencesHash[s.id] = [s];
            }
        }
        else if (item instanceof branch.Branch) {
            this.branch = item;
        }
        return this;
    };
    /**
     * 文章一覧をクリアする
     */
    Talk.prototype.clear = function () {
        this.sentences.length = 0;
        this.sentencesHash = {};
        return this;
    };
    /**
     * 文書の一覧を返す
     */
    Talk.prototype.items = function () {
        return this.sentences;
    };
    Object.defineProperty(Talk.prototype, "length", {
        /**
         * 文章の数を返す
         */
        get: function () {
            return this.sentences.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 現在の会話へのポインタのコピーを返す
     */
    Talk.prototype.getPointerClone = function () {
        return new pointer.Pointer(this.pointer);
    };
    Object.defineProperty(Talk.prototype, "id", {
        /**
         * 現在の会話 ID を取得する
         */
        get: function () {
            return this.pointer.talkId;
        },
        enumerable: true,
        configurable: true
    });
    return Talk;
})();
exports.Talk = Talk;
