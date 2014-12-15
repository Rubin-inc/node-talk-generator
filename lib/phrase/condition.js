/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
// 条件に関するクラス
var _ = require('lodash');
var args = require('./args');
var operator = require('./operator');
/**
 * 条件を表すクラス
 */
var Condition = (function () {
    function Condition(id) {
        this.id = id;
        this.conditions = [];
    }
    /**
     * 条件を追加する
     * すべての条件は & で結ばれる
     */
    Condition.prototype.add = function (variableName, operator, rightValue) {
        this.conditions.push({
            variableName: variableName,
            operator: operator,
            rightValue: rightValue
        });
        return this;
    };
    /*
     * 条件をクリアする
     */
    Condition.prototype.clear = function () {
        this.conditions.length = 0;
        return this;
    };
    /**
     * 条件の結果を返す
     */
    Condition.prototype.getResult = function (args_) {
        return _.every(this.conditions, function (cond) {
            var opFunc = operator.OPERATORS[cond.operator];
            if (opFunc) {
                return opFunc(args.getArgumentsValue(args_, cond.variableName), cond.rightValue);
            }
            return false;
        });
    };
    Object.defineProperty(Condition.prototype, "length", {
        /**
         * 条件の個数
         */
        get: function () {
            return this.conditions.length;
        },
        enumerable: true,
        configurable: true
    });
    return Condition;
})();
exports.Condition = Condition;
