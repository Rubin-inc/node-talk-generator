/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
// 条件フレーズの実装
var _ = require('lodash');
var basicPhrase = require('./basicPhrase');
/**
 * 条件フレーズ
 */
var BranchPhrase = (function (_super) {
    __extends(BranchPhrase, _super);
    function BranchPhrase(id) {
        _super.call(this, id);
        this.conditions = [];
    }
    /**
     * 条件とテキストを追加する
     * 条件が無い場合、常に成立しているとして扱う
     */
    BranchPhrase.prototype.add = function (text, cond) {
        if (cond === void 0) { cond = null; }
        this.conditions.push({
            cond: cond,
            text: text
        });
        return this;
    };
    /**
     * 条件が成立した項目からランダムに選ぶ
     */
    BranchPhrase.prototype.getText = function (args_) {
        // 条件に合う項目を抽出する
        // 条件が無い場合は、成立しているとみなす
        var items = _.filter(this.conditions, function (cond) {
            if (cond && cond.cond) {
                return cond.cond.getResult(args_);
            }
            return true;
        });
        // 条件が成立した項目からランダムに選ぶ
        var sample = _.sample(items);
        // 文字列に変換
        return sample ? sample.text || '' : '';
    };
    /**
     * 条件とテキストをクリアする
     */
    BranchPhrase.prototype.clear = function () {
        this.conditions.length = 0;
        return this;
    };
    Object.defineProperty(BranchPhrase.prototype, "length", {
        /**
         * 条件とテキストのペアの個数を返す
         */
        get: function () {
            return this.conditions.length;
        },
        enumerable: true,
        configurable: true
    });
    return BranchPhrase;
})(basicPhrase.BasicPhrase);
exports.BranchPhrase = BranchPhrase;
