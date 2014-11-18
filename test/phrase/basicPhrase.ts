/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/chai/chai.d.ts" />
/// <reference path="../../typings/mocha/mocha.d.ts" />

//  フレーズの基礎クラスに対するテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

describe('BasicPhrase class', () => {
    var s: tg.Sentence;
    var bp: tg.BasicPhrase;

    before(() => {
        s = new tg.Sentence('id');
    });

    beforeEach(() => {
        bp = new tg.BasicPhrase('id');
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

    it('BasicPhrase isn\'t empty', () => {
        expect(bp).to.not.be.empty;
    });

    describe('BasicPhrase#getText() throw Error', () => {
        it('From BasicPhrase#getText()', () => {
            expect(() => {
                bp.getText({}); // 抽象メソッド
            }).to.throw(Error);
        });

        it('From Sentence#getText()', () => {
            expect(() => {
                s.getText({}); // 文章経由で BasicPhrase#getText() を呼び出す
            }).to.throw(Error);
        });
    });
}); 