/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import _ = require('lodash');

/**
 * 会話の現在位置を表すクラス
 */
export class Pointer {
    /**
     * JSON へシリアライズするキー
     */
    private static SERIALIZE_KEYS = [
        "talkId", "sentenceId", "branchId"
    ];

    /**
     * 会話 ID
     */
    public talkId: string = null;
    public sentenceId: string = null;
    public branchId: string = null;

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
        }
    }

    /**
     * ポインタを同一のものか比較する
     */
    public equals(pointer: Pointer): boolean {
        if (!pointer) return false;

        return this.talkId == pointer.talkId &&
            this.sentenceId == pointer.sentenceId &&
            this.branchId == pointer.branchId;
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
