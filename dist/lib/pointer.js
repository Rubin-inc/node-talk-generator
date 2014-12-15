/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />
var _ = require('lodash');
var talk = require('./talk');
/**
 * 会話の現在位置を表すクラス
 */
var Pointer = (function () {
    function Pointer(pointer) {
        /**
         * 会話 ID
         */
        this.talkId = null;
        this.sentenceId = null;
        this.branchId = null;
        this.inputType = 0 /* None */;
        if (pointer) {
            if (_.isString(pointer)) {
                pointer = JSON.parse(pointer);
            }
            var pointer_ = pointer;
            this.talkId = pointer_.talkId;
            this.sentenceId = pointer_.sentenceId;
            this.branchId = pointer_.branchId;
            this.inputType = pointer_.inputType;
        }
    }
    /**
     * ポインタを同一のものか比較する
     */
    Pointer.prototype.equals = function (pointer) {
        if (!pointer)
            return false;
        return this.talkId === pointer.talkId && this.sentenceId === pointer.sentenceId && this.branchId === pointer.branchId && this.inputType === pointer.inputType;
    };
    /**
     * ポインタを JSON 形式にシリアライズする
     */
    Pointer.prototype.toJSON = function () {
        // 文字列型ではなく、シリアライズするオブジェクトをそのまま返す
        // そうしないと、JSON.stringify が正常に動作しない
        return _.pick(this, Pointer.SERIALIZE_KEYS);
    };
    /**
     * JSON へシリアライズするキー
     */
    Pointer.SERIALIZE_KEYS = [
        "talkId",
        "sentenceId",
        "branchId",
        "inputType"
    ];
    return Pointer;
})();
exports.Pointer = Pointer;
