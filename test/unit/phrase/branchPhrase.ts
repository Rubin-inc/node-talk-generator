/// <reference path="../../test.d.ts" />

//  分岐フレーズクラスに対するテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../../index');

var expect = chai.expect;

describe('BranchPhrase class', () => {
    var P_ID = 'phrase_id';
    var s: tg.Sentence;
    var bp: tg.BranchPhrase;

    before(() => {
        s = new tg.Sentence('id');
    });

    beforeEach(() => {
        bp = new tg.BranchPhrase(P_ID);
        s.add(bp);
    });

    afterEach(() => {
        s.clear();
    });

    it('Sentence isn\'t empty', () => {
        expect(s).to.not.be.empty;
    });

    it('Sentence#length > 0', () => {
        expect(s).to.have.length.above(0); // > 0
    });

    it('BranchPhrase isn\'t empty', () => {
        expect(bp).to.not.be.empty;
    });

    it('BranchPhrase#length === 0', () => {
        expect(bp).to.have.length(0);
    });

    it('BranchPhrase#add()', () => {
        bp.add('foo', new tg.Condition('id'));
        expect(bp).to.have.length(1);
    });

    it('BranchPhrase#add() returns', () => {
        expect(bp.add('foo')).to.equal(bp);
    });

    it('BranchPhrase#clear()', () => {
        bp.add('foo');
        bp.clear();
        expect(bp).to.have.length(0);
    });

    it('BranchPhrase#clear() returns', () => {
        expect(bp.clear()).to.equal(bp);
    });

    describe('BranchPhrase#getText() not throw Error', () => {
        it('From BranchPhrase#getText()', () => {
            expect(() => {
                bp.getText({}); // 抽象メソッド
            }).to.not.throw(Error);
        });

        it('From Sentence#getText()', () => {
            expect(() => {
                s.getText({}); // 文章経由で BasicPhrase#getText() を呼び出す
            }).to.not.throw(Error);
        });
    });

    describe('BranchPhrase#clear() throw Error', () => {
        it('From BranchPhrase#clear()', () => {
            expect(() => {
                bp.getText({}); // 抽象メソッド
            }).to.not.throw(Error);
        });

        it('From Sentence#clear()', () => {
            expect(() => {
                s.getText({}); // 文章経由で BasicPhrase#clear() を呼び出す
            }).to.not.throw(Error);
        });
    });

    describe('BranchPhrase#getText()', () => {
        it('0 text (direct & empty)', () => {
            expect(bp.getText({})).to.equal('');
        });

        it('1 text (direct & empty)', () => {
            var TEXT = 'foo';
            bp.add(TEXT);
            expect(bp.getText({})).to.equal(TEXT);
        });

        it('1 text (direct & true)', () => {
            var NAME = 'name';
            var VALUE = 'value';
            var TEXT = 'foo';

            var cond = new tg.Condition('id').add(NAME, '=', VALUE);
            bp.add(TEXT, cond);

            var args: tg.PhraseArguments = {};
            args[NAME] = VALUE;

            expect(bp.getText(args)).to.equal(TEXT);
        });

        it('1 text (direct & false)', () => {
            var NAME = 'name';
            var VALUE = 'value';
            var TEXT = 'foo';

            var cond = new tg.Condition('id').add(NAME, '!=', VALUE);
            bp.add(TEXT, cond);

            var args: tg.PhraseArguments = {};
            args[NAME] = VALUE;

            expect(bp.getText(args)).to.equal('');
        });

        it('2 text (direct & true & false)', () => {
            var NAME_1 = 'name_1';
            var NAME_2 = 'name_2';
            var VALUE_1 = 'value_1';
            var VALUE_2 = 'value_2';
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';

            var cond = new tg.Condition('id').add(NAME_1, '=', VALUE_1);
            bp.add(TEXT_1, cond);

            var cond2 = new tg.Condition('id').add(NAME_2, '!=', VALUE_2);
            bp.add(TEXT_2, cond2);

            var args: tg.PhraseArguments = {};
            args[NAME_1] = VALUE_1;
            args[NAME_2] = VALUE_2;

            expect(bp.getText(args)).to.equal(TEXT_1);
        });

        // ランダムに発生するかテストする
        it('2 texts (direct)', () => {
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';

            bp.add(TEXT_1);
            bp.add(TEXT_2);

            // TEXT_1 が出るまで繰り返す
            while (true) {
                var text = bp.getText({});
                if (text == TEXT_1) {
                    expect(text).to.be.equal(TEXT_1);
                    break;
                }
            }

            // TEXT_2 が出るまで繰り返す
            while (true) {
                var text = bp.getText({});
                if (text == TEXT_2) {
                    expect(text).to.be.equal(TEXT_2);
                    break;
                }
            }
        });
    });
});