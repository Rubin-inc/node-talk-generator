/// <reference path="../../test.d.ts" />

//  変数フレーズクラスに対するテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../../index');

var expect = chai.expect;

describe('VariablePhrase class', () => {
    var P_ID = 'phrase_id';

    var s: tg.Sentence;
    var vp: tg.VariablePhrase;

    before(() => {
        s = new tg.Sentence('id');
    });

    beforeEach(() => {
        vp = new tg.VariablePhrase(P_ID);
        s.add(vp);
    });

    afterEach(() => {
        s.clear();
    });

    it('Sentence new', () => {
        expect(s).to.not.be.empty;
    });

    it('VariablePhrase new (id)', () => {
        expect(vp).to.not.be.empty;
    });

    it('VariablePhrase new (id, variableName)', () => {
        var NAME = 'foo';
        var vp2 = new tg.VariablePhrase(P_ID, NAME);

        expect(vp2.id).to.equal(P_ID);
        expect(vp2.variableName).to.equal(NAME);
    });

    it('VariablePhrase new (id, variableName, prefix)', () => {
        var NAME = 'foo';
        var PREFIX = 'prefix';
        var vp2 = new tg.VariablePhrase(P_ID, NAME, PREFIX);

        expect(vp2.id).to.equal(P_ID);
        expect(vp2.variableName).to.equal(NAME);
        expect(vp2.prefix).to.equal(PREFIX);
    });

    it('VariablePhrase new (id, variableName, prefix, suffix)', () => {
        var NAME = 'foo';
        var PREFIX = 'prefix';
        var SUFFIX = 'suffix';
        var vp2 = new tg.VariablePhrase(P_ID, NAME, PREFIX, SUFFIX);

        expect(vp2.id).to.equal(P_ID);
        expect(vp2.variableName).to.equal(NAME);
        expect(vp2.prefix).to.equal(PREFIX);
        expect(vp2.suffix).to.equal(SUFFIX);
    });

    it('VariablePhrase#id equal', () => {
        expect(vp.id).to.equal(P_ID);
    });

    describe('VariablePhrase#clear()', () => {
        beforeEach(() => {
            vp.prefix = 'prefix';
            vp.suffix = 'suffix';
            vp.variableName = 'name';
            vp.clear();
        });

        it('#prefix === \'\'', () => {
            expect(vp.prefix).to.equal('');
        });

        it('#suffix === \'\'', () => {
            expect(vp.suffix).to.equal('');
        });

        it('#variableName === null', () => {
            expect(vp.variableName).to.be.null;
        });

        it('#id isn\'t empty', () => {
            expect(vp.id).to.not.be.empty;
        });
    });

    describe('Phrase#getText() not throw Error', () => {
        it('From Phrase#getText()', () => {
            expect(() => {
               vp.getText({}); // 抽象メソッド
            }).to.not.throw(Error);
        });

        it('From Sentence#getText()', () => {
            expect(() => {
                s.getText({}); // 文章経由で BasicPhrase#getText() を呼び出す
            }).to.not.throw(Error);
        });
    });

    describe('VariablePhrase#getText()', () => {
        var NAME: string;
        var VALUE: string;
        var arg: tg.PhraseArguments;

        beforeEach(() => {
            NAME = 'name';
            VALUE = 'value';

            arg = {};
            arg[NAME] = VALUE;
        });

        it('name = null', () => {
            expect(vp.getText({})).to.equal('');
        });

        it('name = undefined', () => {
            vp.variableName = undefined;
            expect(vp.getText({})).to.equal('');
        });

        it('name = \'\' (empty string)', () => {
            vp.variableName = '';
            expect(vp.getText({})).to.equal('');
        });

        it('name = \'nothing_name\'', () => {
            vp.variableName = 'nothing_name';
            expect(vp.getText({})).to.equal('');
        });

        it('name = 0', () => {
            vp.variableName = <any>0;
            expect(vp.getText({})).to.equal('');
        });

        it('name = 1', () => {
            vp.variableName = <any>1;
            expect(vp.getText({})).to.equal('');
        });

        it('name = true', () => {
            vp.variableName = <any>true;
            expect(vp.getText({})).to.equal('');
        });

        it('name = false', () => {
            vp.variableName = <any>false;
            expect(vp.getText({})).to.equal('');
        });

        it('name = new String(\'nothing_name\')', () => {
            vp.variableName = <any>new String('nothing_name');
            expect(vp.getText({})).to.equal('');
        });

        it('name = \'valid_name\'', () => {
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('name = \'valid_name\' (by sentence)', () => {
            vp.variableName = NAME;
            expect(s.getText(arg)).to.equal(VALUE);
        });

        it('name = \'0\'', () => {
            vp.variableName = '0';
            arg['0'] = VALUE;
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('value = null', () => {
            arg[NAME] = null;
            expect(vp.getText(arg)).to.equal('');
        });

        it('value = undefined', () => {
            arg[NAME] = undefined;
            expect(vp.getText(arg)).to.equal('');
        });

        it('value = 0', () => {
            arg[NAME] = <any>0;
            expect(vp.getText(arg)).to.equal('');
        });

        it('value = 1', () => {
            arg[NAME] = <any>1;
            expect(vp.getText(arg)).to.equal('');
        });

        it('value = true', () => {
            arg[NAME] = <any>true;
            expect(vp.getText(arg)).to.equal('');
        });

        it('value = false', () => {
            arg[NAME] = <any>false;
            expect(vp.getText(arg)).to.equal('');
        });

        it('value = \'日本語\'', () => {
            var VALUE2 = '日本語';
            arg[NAME] = VALUE2;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE2);
        });

        it('prefix = null', () => {
            vp.prefix = null;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('prefix = undefined', () => {
            vp.prefix = undefined;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('prefix = \'valid_value\'', () => {
            var PREFIX = 'prefix';
            vp.prefix = PREFIX;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(PREFIX + VALUE);
        });

        it('suffix = null', () => {
            vp.suffix = null;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('suffix = undefined', () => {
            vp.suffix = undefined;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('suffix = \'valid_value\'', () => {
            var SUFFIX = 'suffix';
            vp.suffix = SUFFIX;
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE + SUFFIX);
        });

        it('prefix & suffix', () => {
            var PREFIX = 'prefix';
            var SUFFIX = 'suffix';

            vp.prefix = PREFIX;
            vp.suffix = SUFFIX;
            vp.variableName = NAME;

            expect(vp.getText(arg)).to.equal(PREFIX + VALUE + SUFFIX);
        });

        it('getText() x2', () => {
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('getText() x3', () => {
            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);
            expect(vp.getText(arg)).to.equal(VALUE);
            expect(vp.getText(arg)).to.equal(VALUE);
        });

        it('getText() x1000', () => {
            var N = 1000;
            vp.variableName = NAME;

            for (var i = 0; i < N; ++i) {
                expect(vp.getText(arg)).to.equal(VALUE);
            }
        });

        it('getText() x2 & change value', () => {
            var VALUE2 = 'value2';

            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);

            arg[NAME] = VALUE2;
            expect(vp.getText(arg)).to.equal(VALUE2);
        });

        it('getText() x2 & change object', () => {
            var VALUE2 = 'value2';

            vp.variableName = NAME;
            expect(vp.getText(arg)).to.equal(VALUE);

            var arg2: tg.PhraseArguments = {};
            arg2[NAME] = VALUE2;
            expect(vp.getText(arg2)).to.equal(VALUE2);
        });
    });
}); 