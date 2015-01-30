/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import _ = require('lodash');

import talk = require('./talk');

/**
 * 会話の現在位置を表すクラス
 */
export class Pointer {
    /**
     * JSON へシリアライズするキー
     */
    private static SERIALIZE_KEYS = [
        "talkId", "sentenceId", "branchId", "inputId"
    ];

    /**
     * 会話 ID
     */
    public talkId: string = null;
    public sentenceId: string = null;
    public branchId: string = null;
    public inputId: string = null;

    /**
     * ポインタのコピーを作成する
     */
    public constructor(pointer?: Pointer);
    public constructor(pointer?: {});
    public constructor(pointer?: string);
    public constructor(pointer?: any) {
        if (pointer) {
            if (_.isString(pointer)) {
                pointer = JSON.parse(pointer);
            }

            var pointer_: Pointer = pointer;
            this.talkId = pointer_.talkId;
            this.sentenceId = pointer_.sentenceId;
            this.branchId = pointer_.branchId;
            this.inputId = pointer_.inputId;
        }
    }

    /**
     * ポインタを同一のものか比較する
     */
    public equals(pointer: Pointer): boolean {
        if (!pointer) return false;

        return this.talkId === pointer.talkId &&
            this.sentenceId === pointer.sentenceId &&
            this.branchId === pointer.branchId &&
            this.inputId === pointer.inputId;
    }

    /**
     * ポインタを JSON 形式にシリアライズする
     */
    public toJSON(): any {
        // 文字列型ではなく、シリアライズするオブジェクトをそのまま返す
        // そうしないと、JSON.stringify が正常に動作しない
        return _.pick(this, Pointer.SERIALIZE_KEYS);
    }
}
