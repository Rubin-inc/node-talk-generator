/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/**
 * 会話の入力の種類を表す
 */
(function (InputType) {
    /**
     * 数値
     */
    InputType[InputType["Number"] = 1] = "Number";
    /**
     * 文字列
     */
    InputType[InputType["String"] = 2] = "String";
    /**
     * 特殊入力
     */
    InputType[InputType["Special"] = 3] = "Special";
})(exports.InputType || (exports.InputType = {}));
var InputType = exports.InputType;
;
/**
 * ユーザーの入力を表すクラス
 */
var Input = (function () {
    function Input(id, inputType, next) {
        if (next === void 0) { next = null; }
        this.id = id;
        this.inputType = inputType;
        this.next = next;
    }
    return Input;
})();
exports.Input = Input;
