/// <reference path="../test.d.ts" />

//  条件分岐に対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

describe('Branch class', () => {
    var QUESTION_TEXT = 'question';
    var ANSWER_TEXT_1 = 'answer_1';
    var ANSWER_TEXT_2 = 'answer_2';

    var talk1: tg.Talk;
    var talk2: tg.Talk;
    var talk3: tg.Talk;
    var branch: tg.Branch;
    var question: tg.Sentence;
    var answer1: tg.Sentence;
    var answer2: tg.Sentence;

    before(() => {
        talk1 = new tg.Talk('talk_id_1');
        talk2 = new tg.Talk('talk_id_2');
        talk3 = new tg.Talk('talk_id_3');

        question = new tg.Sentence('sentence_id');
        question.add(new tg.Phrase('phrase_id').add(QUESTION_TEXT));

        branch = new tg.Branch('branch_id', question);

        answer1 = new tg.Sentence('answer_1');
        answer1.add(new tg.Phrase('answer_1').add(ANSWER_TEXT_1));

        answer2 = new tg.Sentence('answer_2');
        answer2.add(new tg.Phrase('answer_2').add(ANSWER_TEXT_2));
    });

    afterEach(() => {
        talk1.clear();
        talk2.clear();
        talk3.clear();

        branch.clear();
    });

    it('Talk isn\'t empty', () => {
        expect(talk1).to.not.be.empty;
        expect(talk2).to.not.be.empty;
        expect(talk3).to.not.be.empty;
    });

    it('Branch#length === 0', () => {
        expect(branch).to.have.length(0);
    });

    it('Branch new (id only)', () => {
        var b = new tg.Branch('id');
        expect(b.question).to.be.null;
    });

    it('Branch#clear()', () => {
        branch.add(answer1, talk2);
        branch.clear();
        expect(branch).to.have.length(0);
    });

    it('Branch#clear() returns', () => {
        expect(branch.clear()).to.equal(branch);
    });

    it('Branch#add()', () => {
        branch.add(answer1, talk2);
        expect(branch).to.have.length(1); // === 1
    });

    it('Branch#add() x2', () => {
        branch.add(answer1, talk2);
        branch.add(answer2, talk3);
        expect(branch).to.have.length(2); // === 2
    });

    it('Branch#add() returns', () => {
        expect(branch.add(answer1, talk2)).to.equal(branch);
    });

    it('Branch#question equal', () => {
        expect(branch.question).to.equal(question);
    });

    describe('Branch#getQuestionText()', () => {
        it('question = typeof Sentence', () => {
            expect(branch.getQuestionText({})).to.equal(QUESTION_TEXT);
        });

        it('question = null', () => {
            branch.question = null;
            expect(branch.getQuestionText({})).to.equal('');
        });

        it('question = undefined', () => {
            branch.question = null;
            expect(branch.getQuestionText({})).to.equal('');
        });
    });

    describe('Branch#getAnswers()', () => {
        it('nop');

    });
});