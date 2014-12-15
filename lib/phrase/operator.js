/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/// <reference path="../../typings/node/node.d.ts" />
// 演算子の定義
var _ = require('lodash');
function wrapNumberImpl(func) {
    return function (lhs, rhs) {
        return func(Number(lhs), Number(rhs));
    };
}
/**
 * 数値演算子を文字列引数に対応させるラッパー
 * 戻り値をキャッシュするため、同一関数に対しては同じ関数オブジェクトを返す
 */
var wrapNumber = _.memoize(wrapNumberImpl);
var equal = function (lhs, rhs) { return lhs == rhs; };
var notEqual = function (lhs, rhs) { return lhs != rhs; };
var greater = function (lhs, rhs) { return lhs > rhs; };
var greaterOrEqual = function (lhs, rhs) { return lhs >= rhs; };
var less = function (lhs, rhs) { return lhs < rhs; };
var lessThanEqual = function (lhs, rhs) { return lhs <= rhs; };
/**
 * 演算子の文字列と、処理関数の連想配列
 */
exports.OPERATORS = {
    "=": equal,
    "==": equal,
    "!=": notEqual,
    "<>": notEqual,
    "≠": notEqual,
    ">": wrapNumber(greater),
    ">=": wrapNumber(greaterOrEqual),
    "≧": wrapNumber(greaterOrEqual),
    "<": wrapNumber(less),
    "≦": wrapNumber(lessThanEqual),
    "<=": wrapNumber(lessThanEqual),
};
