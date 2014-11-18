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
 * 条件分岐を表すクラス
 */
export class Branch {
    public constructor(
        public id: string,
        public question: sentence.Sentence) {
    }

    /***
     * 条件分岐を追加する
     * @param answer 質問文
     * @param next   次の会話
     */
    public add(answer: sentence.Sentence, next: talk.Talk): Branch {
        throw 'Not Implemented';
        return this;
    }

    /**
     * 質問文を取得する
     */
    public getQuestionText(args: phrase.PhraseArguments): string {
        return this.question.getText(args);
    }

    /**
     * 解答一覧を取得する
     */
    public getAnswers(args: phrase.PhraseArguments): BranchAnswer[]{
        throw 'Not Implemented';
        return [];
    }
} 