/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

// 会話

import _ = require('lodash');

import sentence = require('./sentence');
import pointer = require('./pointer');
import branch = require('./branch');


/**
 * 会話の次を表すインターフェイス
 */
export interface TalkNext {
    sentence?: sentence.Sentence;
    branch?: branch.Branch;
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
     * 文章 ID の一覧
     */
    private sentenceIds: string[] = [];

    /**
     * 条件分岐が存在する場合、条件分岐
     */
    public branch: branch.Branch = null;

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
        this.pointer.branchId = null;
    }

    /**
     * 会話を途中から再開する
     */
    public resume(pointer: pointer.Pointer): Talk {
        // 違う会話のポインタである場合
        if (this.id !== pointer.talkId) {
            throw new Error('TalkId does not match');
        }

        this.pointer = pointer;
        return this;
    }

    /**
     * 会話をリセットし、はじめから開始する
     */
    public reset(): Talk {
        this.pointer.branchId = null;
        this.pointer.sentenceId = null;

        return this;
    }

    /**
     * 次の文章を開始する
     */
    public next(): TalkNext {
        // 現在の文書 ID & 分岐 ID が無い場合、新規に開始する
        if (!this.pointer.sentenceId && !this.pointer.branchId) {
            // 文章がある場合
            if (this.sentenceIds.length > 0) {
                this.pointer.sentenceId = this.sentenceIds[0];
            }

            // 条件分岐が存在する場合
            else if (this.branch) {
                this.pointer.branchId = this.branch.id;
            }

            else {
                return null; // 会話終了
            }
        }

        // 既に開始されている場合、次に進める
        else {
            // 分岐で終了している場合
            if (this.pointer.branchId) {
                return null; // 会話終了
            }

            // 文章で終了している場合
            else {
                // 現在の文章 ID の位置を調べる
                var current = _.indexOf(this.sentenceIds, this.pointer.sentenceId);

                // 現在の文章が見つからない場合
                if (current < 0) {
                    this.pointer.sentenceId = null;
                    return null; // 会話終了
                }

                // 次の文章へ移動
                this.pointer.sentenceId = this.sentenceIds[current + 1];

                // 次の文章が見つからない場合
                if (!this.pointer.sentenceId) {
                    // 分岐が存在する場合
                    if (this.branch) {
                        this.pointer.branchId = this.branch.id;
                    }

                    // 分岐が存在しない場合
                    else {
                        return null; // 会話終了
                    }
                }
            }
        }

        // 次の構成要素を返す
        if (this.pointer.sentenceId) {
            return {
                sentence: _.sample(this.sentencesHash[this.pointer.sentenceId])
            };
        }
        else {
            return {
                branch: this.branch
            };
        }
    }

    /**
     * 会話に分岐を追加する。分岐は会話の最後に一回のみ設定できます。
     */
    public add(item: branch.Branch): Talk;

    /**
     * 会話に文章を追加します。文章 ID は重複が可能です。
     */
    public add(item: sentence.Sentence): Talk;

    public add(item: any): Talk {
        if (item instanceof sentence.Sentence) {
            var s: sentence.Sentence = item;

            this.sentences.push(s);

            // 文書 ID は重複可なため、配列で保持
            // 既に同じ ID が存在する場合
            if (this.sentencesHash[s.id]) {
                this.sentencesHash[s.id].push(s);
            }

            // 新規文章 ID の場合
            else {
                this.sentenceIds.push(s.id);
                this.sentencesHash[s.id] = [s];
            }
        }

        else if(item instanceof branch.Branch){
            this.branch = <branch.Branch>item;
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

