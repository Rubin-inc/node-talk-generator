/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../test.d.ts" />

// 会話に対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

describe('Talk class', () => {
    var TALK_ID_1 = 'talk_id_1';
    var TALK_ID_2 = 'talk_id_2';

    var talkList: tg.TalkList;
    var talk1: tg.Talk;
    var talk2: tg.Talk;

    before(() => {
        talkList = new tg.TalkList();
    });

    beforeEach(() => {
        talkList.add(new tg.Talk(TALK_ID_1));
        talkList.add(new tg.Talk(TALK_ID_2, true));

        talk1 = talkList.start(TALK_ID_1);
        talk2 = talkList.start(TALK_ID_2);
    });

    afterEach(() => {
        talkList.clear();
    });

    after(() => {
        talkList = undefined;
        talk1 = undefined;
        talk2 = undefined;
    });

    it('TalkList !== null', () => {
        expect(talkList).to.not.be.null;
    });

    it('Talk !== null (talk1)', () => {
        expect(talk1).to.not.be.null;
    });

    it('Talk !== null (talk2)', () => {
        expect(talk2).to.not.be.null;
    });

    it('Talk#id equals', () => {
        expect(talk1.id).to.equal(TALK_ID_1);
    });

    it('Talk#id entryPoint === false', () => {
        expect(talk1.entryPoint).to.be.false;
    });

    it('Talk#id entryPoint === true', () => {
        expect(talk2.entryPoint).to.be.true;
    });

    it('Talk#getPointerClone() p !== q', () => {
        var p = talk1.getPointerClone();
        var q = talk1.getPointerClone();

        expect(p).to.not.equal(q); // 別インスタンス
    });

    it('Talk#getPointerClone() p.equals(q)', () => {
        var p = talk1.getPointerClone();
        var q = talk1.getPointerClone();

        expect(p.equals(q)).to.be.true; // 中身は同一
    });

    it('Talk#getPointerClone() !p.equals(q)', () => {
        var p = talk1.getPointerClone();
        var q = talk2.getPointerClone();

        expect(p.equals(q)).to.be.false; // 中身も違う場合
    });

    it('Talk#length === 0', () => {
        expect(talk1.length).to.equal(0);
    });

    it('Talk#length > 0', () => {
        var s = new tg.Sentence('sentence_id');
        talk1.add(s);

        expect(talk1.length).to.above(0); // > 0
    });

    it('Talk#clear()', () => {
        var s = new tg.Sentence('sentence_id');
        talk1.add(s);
        talk1.clear();

        expect(talk1.length).to.equal(0);
    });

    describe('Talk#items()', () => {
        it('#items() !== null', () => {
            expect(talk1.items()).to.not.be.null;
        });

        it('#items().length == 0', () => {
            expect(talk1.items().length).to.equal(0);
        });

        it('#items() should include sentence', () => {
            var s = new tg.Sentence('id');
            talk1.add(s);

            expect(talk1.items()).to.include(s);
        });
    });

    it('Talk#add() same Sentence#id', () => {
        var S_ID = 'sentence_id';
        var s1 = new tg.Sentence(S_ID);
        var s2 = new tg.Sentence(S_ID);

        talk1.add(s1);
        talk1.add(s2);

        expect(talk1.length).to.least(2); // >= 2
    });

    describe('Talk#add() (branch)', () => {
        var branch: tg.Branch;

        beforeEach(() => {
            branch = new tg.Branch('id');
            talk1.add(branch);
        });

        it('length === 0', () => {
            expect(talk1.length).to.equal(0);
        });

        it('items().length === 0', () => {
            expect(talk1.items().length).to.equal(0);
        });

        it('#branch equals', () => {
            expect(talk1.branch).to.equal(branch);
        });
    });

    describe('Talk#next() (1 sentence)', () => {
        var s: tg.Sentence;

        beforeEach(() => {
            s = new tg.Sentence('id');
            talk1.add(s);
        });

        it('#next() isn\'t empty', () => {
            expect(talk1.next()).to.not.be.empty;
        });

        it('#next().branch is empty', () => {
            var next = talk1.next();
            expect(next.branch).to.be.empty;
        });

        it('#next().sentence isn\'t empty', () => {
            var next = talk1.next();
            expect(next.sentence).to.not.be.empty;
        });

        it('#next().sentence === s', () => {
            var next = talk1.next();
            expect(next.sentence).to.equal(s);
        });

        it('#next() x2 is empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next).to.be.empty;
        });
    });

    describe('Talk#next() (2 sentences)', () => {
        var s: tg.Sentence;
        var s2: tg.Sentence;

        beforeEach(() => {
            s = new tg.Sentence('id');
            s2 = new tg.Sentence('id2');

            talk1.add(s);
            talk1.add(s2);
        });

        it('#next().sentence === s', () => {
            var next = talk1.next();
            expect(next.sentence).to.equal(s);
        });

        it('#next() x2 .sentence === s2', () => {
            talk1.next();
            var next = talk1.next();

            expect(next.sentence).to.equal(s2);
        });

        it('#next() x3 is empty', () => {
            talk1.next();
            talk1.next();
            var next = talk1.next();

            expect(next).to.be.empty;
        });
    });


    describe('Talk#reset()', () => {
        var s: tg.Sentence;
        var branch: tg.Branch;

        beforeEach(() => {
            s = new tg.Sentence('id');
            branch = new tg.Branch('branch');

            talk1.add(s);
            talk1.add(branch);
        });

        it('#next().sentence === s', () => {
            talk1.next();
            talk1.reset();
            var next = talk1.next();

            expect(next.sentence).to.equal(s);
        });

        it('#next() x2 .branch === branch', () => {
            talk1.next();
            talk1.next();

            talk1.reset();

            talk1.next()
            var next = talk1.next();

            expect(next.branch).to.equal(branch);
        });
    });

    describe('Talk#next() (2 same id sentences)', () => {
        var s: tg.Sentence;
        var s2: tg.Sentence;
        
        beforeEach(() => {
            var S_ID = 'id';
            s = new tg.Sentence(S_ID);
            s2 = new tg.Sentence(S_ID);

            talk1.add(s);
            talk1.add(s2);
        });

        // s もしくは s2 が返る
        it('#next().sentence === s|s2', () => {
            var next: tg.TalkNext;

            // s が返るまで繰り返す
            while (true) {
                talk1.reset();
                next = talk1.next();

                expect(next).to.not.be.empty;

                if (next.sentence === s) {
                    expect(next.sentence).to.equal(s);
                    break;
                }
            }

            // s2 が返るまで繰り返す
            while (true) {
                talk1.reset();
                next = talk1.next();

                expect(next).to.not.be.empty;

                if (next.sentence === s2) {
                    expect(next.sentence).to.equal(s2);
                    break;
                }
            }
        });

        it('#next() x2 is empty', () => {
            talk1.next();
            var next = talk1.next();

            expect(next).to.be.empty;
        });
    });

    describe('Talk#next() (1 branch)', () => {
        var branch: tg.Branch;

        beforeEach(() => {
            branch = new tg.Branch('id');
            talk1.add(branch);
        });

        it('#next() isn\'t empty', () => {
            expect(talk1.next()).to.not.be.empty;
        });

        it('#next().sentence is empty', () => {
            var next = talk1.next();
            expect(next.sentence).to.be.empty;
        });

        it('#next().branch isn\'t empty', () => {
            var next = talk1.next();
            expect(next.branch).to.not.be.empty;
        });

        it('#next().branch === branch', () => {
            var next = talk1.next();
            expect(next.branch).to.equal(branch);
        });

        it('#next() x2 is empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.prevBranch).to.equal(branch);
        });
    });

    describe('Talk#next() (1 input)', () => {
        var INPUT = new tg.Input('id', tg.InputType.Number);

        beforeEach(() => {
            talk1.add(INPUT);
        });

        it('#next() isn\'t empty', () => {
            expect(talk1.next()).to.not.be.empty;
        });

        it('#next().sentence is empty', () => {
            var next = talk1.next();
            expect(next.sentence).to.be.empty;
        });

        it('#next().branch is empty', () => {
            var next = talk1.next();
            expect(next.branch).to.be.empty;
        });

        it('#next().input equal', () => {
            var next = talk1.next();
            expect(next.input).to.equal(INPUT);
        });

        it('#next() x2 is empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.prevInput).to.equal(INPUT);
        });
    });

    describe('Talk#next() (1 sentence & 1 branch)', () => {
        var s: tg.Sentence;
        var branch: tg.Branch;

        beforeEach(() => {
            s = new tg.Sentence('id');
            branch = new tg.Branch('id');

            talk1.add(s);
            talk1.add(branch);
        });

        it('#next() != null', () => {
            expect(talk1.next()).to.not.be.null;
        });

        it('#next().sentence === s', () => {
            var next = talk1.next();
            expect(next.sentence).to.equal(s);
        });

        it('#next().branch is empty', () => {
            var next = talk1.next();
            expect(next.branch).to.be.empty;
        });

        it('#next() x2 isn\'t empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.branch).to.not.be.empty;
        });

        it('#next() x2 .branch === branch', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.branch).to.equal(branch);
        });

        it('#next() x2 .sentence is empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.sentence).to.be.empty;
        });

        it('#next() x3 .prevBranch is branch', () => {
            talk1.next();
            talk1.next();
            var next = talk1.next();
            expect(next.prevBranch).to.equal(branch);
        });
    });

    describe('Talk#resume() (3 sentence)', () => {
        var s: tg.Sentence;
        var s2: tg.Sentence;
        var s3: tg.Sentence;

        beforeEach(() => {
            s = new tg.Sentence('id_1');
            s2 = new tg.Sentence('id_2');
            s3 = new tg.Sentence('id_3');

            talk1.add(s);
            talk1.add(s2);
            talk1.add(s3)
        });

        it('#resume(blank)', () => {
            var p = talk1.getPointerClone();

            talk1.next();
            talk1.next();

            talk1.resume(p);

            var next = talk1.next();
            expect(next).to.not.be.empty;
            expect(next.sentence).to.equal(s);
        });

        it('#resume(s)', () => {
            talk1.next();

            var p = talk1.getPointerClone();

            talk1.next();
            talk1.next();

            talk1.resume(p);

            var next = talk1.next();
            expect(next).to.not.be.empty;
            expect(next.sentence).to.equal(s2);
        });

        it('#resume(s2)', () => {
            talk1.next();
            talk1.next();

            var p = talk1.getPointerClone();

            talk1.reset();
            talk1.resume(p);

            var next = talk1.next();
            expect(next.sentence).to.equal(s3);
        });

        it('#resume(s3)', () => {
            talk1.next();
            talk1.next();
            talk1.next();

            var p = talk1.getPointerClone();

            talk1.reset();
            talk1.resume(p);

            var next = talk1.next();
            expect(next).to.be.empty;
        });

        it('#resume(invalid)', () => {
            var p = talk1.getPointerClone();
            p.talkId = 'wrong_talk_id';

            expect(() => { talk1.resume(p); }).to.throw();
        });
    });


    describe('Talk#next() (1 sentence & 1 input)', () => {
        var s: tg.Sentence;
        var input: tg.Input;

        beforeEach(() => {
            s = new tg.Sentence('id');
            input = new tg.Input('id', tg.InputType.Number);

            talk1.add(s);
            talk1.add(input);
        });

        it('#next() != null', () => {
            expect(talk1.next()).to.not.be.null;
        });

        it('#next().sentence === s', () => {
            var next = talk1.next();
            expect(next.sentence).to.equal(s);
        });

        it('#next().input is empty', () => {
            var next = talk1.next();
            expect(next.input).to.be.empty;
        });

        it('#next() x2 isn\'t empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.input).to.not.be.empty;
        });

        it('#next() x2 .input === input', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.input).to.equal(input);
        });

        it('#next() x2 .sentence is empty', () => {
            talk1.next();
            var next = talk1.next();
            expect(next.sentence).to.be.empty;
        });

        it('#next() x3 .prevInput is input', () => {
            talk1.next();
            talk1.next();
            var next = talk1.next();
            expect(next.prevInput).to.equal(input);
        });
    });

    describe('Talk#next() (invalid sentenceId)', () => {
        var s1: tg.Sentence;
        var s2: tg.Sentence;

        beforeEach(() => {
            s1 = new tg.Sentence('id_1');
            s2 = new tg.Sentence('id_2');

            talk1.add(s1);
            talk1.add(s2);
        });

        it('#next() != null', () => {
            expect(talk1.next()).to.not.be.null;
        });

        it('#next().sentence == s1', () => {
            expect(talk1.next().sentence).to.equal(s1);
        });

        it('#next() invalid pointer', () => {
            talk1.next();

            // このポインタで再開したら、s2 になるはず
            var p = talk1.getPointerClone();

            // 開始位置のポインタを存在しない値にする
            p.sentenceId = 'invalid_id_1';

            expect(talk1.resume(p)).to.equal(talk1);
            expect(talk1.next()).to.be.empty;
        });
    });
});