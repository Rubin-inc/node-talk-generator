﻿/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

// 条件分岐

import _ = require('lodash');

import sentence = require('./sentence');
import talk = require('./talk');
import phrase = require('./phrase/index');

/**
 * 条件分岐の解答を表す
 */
export interface BranchAnswer {
    /**
     * 質問文
     */
    text: string;

    /**
     * 次の会話
     */
    next: talk.Talk;
}

/**
 * 条件分岐の文章を表す
 */
interface BranchAnswerSentence {
    /**
     * 解答文章
     */
    sentence: sentence.Sentence;

    /**
     * 次の会話
     */
    next: talk.Talk;
}

/**
 * 条件分岐を表すクラス
 */
export class Branch {
    /**
     * 解答の一覧
     */
    private answers: BranchAnswerSentence[] = [];

    /**
     * 質問文
     */
    public question: sentence.Sentence = null;

    public constructor(
        public id: string,
        question: sentence.Sentence = null) {
        this.question = question;
    }

    /***
     * 条件分岐を追加する
     * @param sentence 質問文
     * @param next     次の会話
     */
    public add(sentence: sentence.Sentence, next: talk.Talk): Branch {
        this.answers.push({
            sentence: sentence,
            next: next
        });

        return this;
    }

    /**
     * 条件分岐の質問文と解答のデータを削除する
     */
    public clear(): Branch {
        this.answers.length = 0;
        this.question = null;
        return this;
    }

    /**
     * 質問文を取得する
     * 質問文が取得できない場合は、空文字を返す
     */
    public getQuestionText(args: phrase.PhraseArguments): string {
        if (this.question) {
            return this.question.getText(args);
        }

        return '';
    }

    /**
     * 解答一覧を取得する
     */
    public getAnswers(args: phrase.PhraseArguments): BranchAnswer[] {
        return _.map(this.answers, x => {
            return {
                text: x.sentence.getText(args),
                next: x.next
            };
        });
    }

    /**
     * 解答の数を返す
     */
    public get length(): number {
        return this.answers.length;
    }
}