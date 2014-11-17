/// <reference path="../typings/lodash/lodash.d.ts" />

import _ = require('lodash');

import talk = require('./talk');
import pointer = require('./pointer');

/**
 * 会話一覧を表すクラス
 */
export class TalkList {
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
    public startTalk(id: string): talk.Talk {
        return this.talksHash[id] || null;
    }

    /**
     * 会話を再開する
     * @param p 会話位置を示すポインタ
     */
    public resumeTalk(p: pointer.Pointer): void {
        
    }

    public clear(): TalkList {
        this.talks.length = 0;
        this.talksHash = {};
        return this;
    }

    public get length(): number {
        return this.talks.length;
    }
} 