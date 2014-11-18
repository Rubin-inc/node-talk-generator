/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />

//  ノーマルフレーズのクラスに対するテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

describe('Phrase class', () => {
    var s: tg.Sentence;
    var p: tg.Phrase;

    before(() => {
        s = new tg.Sentence('id');
    });

    beforeEach(() => {
        p = new tg.Phrase('id');
        s.add(p);
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

    it('Phrase isn\'t empty', () => {
        expect(p).to.not.be.empty;
    });

    it('Phrase#length === 0', () => {
        expect(p).to.have.length(0);
    });

    it('Phrase#add()', () => {
        p.add('foo');
        expect(p).to.have.length(1);
    });

    it('Phrase#clear()', () => {
        p.add('foo');
        p.clear();
        expect(p).to.have.length(0);
    });

    describe('Phrase#getText() not throw Error', () => {
        it('From Phrase#getText()', () => {
            expect(() => {
                p.getText({}); // 抽象メソッド
            }).to.not.throw(Error);
        });

        it('From Sentence#getText()', () => {
            expect(() => {
                s.getText({}); // 文章経由で BasicPhrase#getText() を呼び出す
            }).to.not.throw(Error);
        });
    });

    describe('Phrase#getText()', () => {
        it('0 text (direct)', () => {
            expect(p.getText({})).to.equal('');
        });

        it('1 text (direct)', () => {
            var TEXT = 'foo';
            p.add(TEXT);
            expect(p.getText({})).to.equal(TEXT);
        });

        // ランダムに発生するかテストする
        it('2 texts (direct)', () => {
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';

            p.add(TEXT_1);
            p.add(TEXT_2);

            // TEXT_1 が出るまで繰り返す
            while (true) {
                var text = p.getText({});
                if (text == TEXT_1) {
                    expect(text).to.be.equal(TEXT_1);
                    break;
                }
            }

            // TEXT_2 が出るまで繰り返す
            while (true) {
                var text = p.getText({});
                if (text == TEXT_2) {
                    expect(text).to.be.equal(TEXT_2);
                    break;
                }
            }
        });

        it('0 text (by sentence)', () => {
            expect(s.getText({})).to.equal('');
        });

        it('1 text (by sentence)', () => {
            var TEXT = 'foo';
            p.add(TEXT);
            expect(s.getText({})).to.equal(TEXT);
        });

        // ランダムに発生するかテストする
        it('2 texts (by sentence)', () => {
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';

            p.add(TEXT_1);
            p.add(TEXT_2);

            // TEXT_1 が出るまで繰り返す
            while (true) {
                var text = s.getText({});
                if (text == TEXT_1) {
                    expect(text).to.be.equal(TEXT_1);
                    break;
                }
            }

            // TEXT_2 が出るまで繰り返す
            while (true) {
                var text = s.getText({});
                if (text == TEXT_2) {
                    expect(text).to.be.equal(TEXT_2);
                    break;
                }
            }
        });

        it('100 texts (by sentence)', () => {
            var TEXT_N = 100; // テキストの値
            var TEST_N = 1000; // テスト回数

            for (var i = 0; i < TEXT_N; ++i) {
                p.add(i.toString());
            }

            for (var i = 0; i < TEST_N; ++i) {
                expect(parseInt(s.getText({}), 10)).to.be.within(0, TEST_N);
            }
        });
    });
}); 