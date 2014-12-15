/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
// フレーズの引数
var _ = require('lodash');
/**
 * 変数の値を取得する
 * 変数の値が存在しない場合、空文字として扱う (運用時を考え、エラーにはしない)
 */
function getArgumentsValue(args, variableName) {
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
}
exports.getArgumentsValue = getArgumentsValue;
