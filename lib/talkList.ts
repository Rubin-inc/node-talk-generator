/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

// 会話の一覧を表す

import _ = require('lodash');

import talk = require('./talk');
import pointer = require('./pointer');

/**
 * 会話一覧を表すクラス
 */
export class TalkList {
    /**
     * 会話の一覧
     */
    private talks: talk.Talk[] = [];
    private talksHash: { [key: string]: talk.Talk } = {};

    /**
     * 会話を追加する
     */
    public add(talk: talk.Talk): TalkList {
        this.talks.push(talk);
        this.talksHash[talk.id] = talk;
        return this;
    }

    /**
     * 会話を削除する
     */
    public remove(talk: talk.Talk): TalkList {
        this.talks = _.without(this.talks, talk);
        this.talksHash[talk.id] = undefined;

        return this;
    }

    /**
     * 会話一覧を取得する
     */
    public items(): talk.Talk[] {
        return this.talks;
    }

    /**
     * 会話を開始する
     * @returns 開始する会話、見つからない場合は null
     */
    public start(id: string): talk.Talk {
        return this.talksHash[id] || null;
    }

    /**
     * 会話を再開する
     * @param   p 会話位置を示すポインタ
     * @returns 再開した会話、再開できない場合は null
     */
    public resume(p: pointer.Pointer): talk.Talk {
        if (!p) return null;
        if (!p.talkId) return null;

        // 会話を取得
        var talk = this.talksHash[p.talkId];
        if (!talk) return null;

        // 会話を再開
        talk.resume(p);

        return talk;
    }

    /**
     * 会話一覧をクリアする
     */
    public clear(): TalkList {
        this.talks.length = 0;
        this.talksHash = {};
        return this;
    }

    /**
     * 会話の個数を返す
     */
    public get length(): number {
        return this.talks.length;
    }
} 