/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

// 会話

import _ = require('lodash');

import sentence = require('./sentence');
import pointer = require('./pointer');
import switch_ = require('./switch');


/**
 * 会話の次を表すインターフェイス
 */
export interface TalkNext {
    sentence: sentence.Sentence;
}

/**
 * 会話を表すクラス
 */
export class Talk {
    /**
     * 現在の会話位置を表す
     */
    private pointer: pointer.Pointer = new pointer.Pointer();

    /**
     * 文章の一覧を表す
     */
    private sentences: sentence.Sentence[] = [];
    private sentencesHash: { [key: string]: sentence.Sentence[] } = {};

    /**
     * 条件分岐が存在する場合、条件分岐
     */
    private switch_: switch_.Switch = null;

    /**
     * 会話を新規に作成する
     * @param id         会話 ID
     * @param entryPoint 会話が開始地点であるか
     */
    public constructor(
        id: string,
        public entryPoint: boolean = false
        ) {
        this.pointer.talkId = id;
        this.pointer.sentenceId = null;
        this.pointer.switchId = null;
    }

    /**
     * 次の文章を開始する
     */
    public next(): TalkNext {
        return null;
    }

    /**
     * 文章を追加する
     */
    public add(sentence: sentence.Sentence): Talk {
        this.sentences.push(sentence);

        // 文書 ID は重複可なため、配列で保持
        if (this.sentencesHash[sentence.id]) {
            this.sentencesHash[sentence.id].push(sentence);
        }

        else {
            this.sentencesHash[sentence.id] = [sentence];
        }

        return this;
    }

    /**
     * 文章一覧をクリアする
     */
    public clear(): Talk {
        this.sentences.length = 0;
        this.sentencesHash = {};

        return this;
    }

    /**
     * 文書の一覧を返す
     */
    public items(): sentence.Sentence[] {
        return this.sentences;
    }

    /**
     * 文章の数を返す
     */
    public get length(): number {
        return this.sentences.length;
    }

    /**
     * 現在の会話へのポインタのコピーを返す
     */
    public getPointerClone(): pointer.Pointer {
        return new pointer.Pointer(this.pointer);
    }

    /**
     * 現在の会話 ID を取得する
     */
    public get id(): string {
        return this.pointer.talkId;
    }
}

