/// <reference path="../../test.d.ts" />

//  条件に対するテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../../index');

var expect = chai.expect;

describe('Condition class', () => {
    var CONDITION_ID = 'condition_id';
    var cond: tg.Condition;

    before(() => {
        cond = new tg.Condition(CONDITION_ID);
    });

    afterEach(() => {
        cond.clear();
    });

    it('Condition isn\'t empty', () => {
        expect(cond).to.not.be.empty;
    });

    it('Condition#id equal', () => {
        expect(cond.id).to.equal(CONDITION_ID);
    });

    it('Condition#length === 0', () => {
        expect(cond).to.have.length(0);
    });

    it('Condition#add()', () => {
        cond.add('name', '=', '0');
        expect(cond).to.have.length(1);
    });

    it('Condition#add() returns', () => {
        expect(cond.add('name', '=', '0')).to.equal(cond);
    });

    it('Condition#clear()', () => {
        cond.add('name', '=', '0');
        cond.clear();
        expect(cond).to.have.length(0);
    });

    it('Condition#clear() returns', () => {
        cond.add('name', '=', '0');
        expect(cond.clear()).to.equal(cond);
    });

    describe('Condition#getResult()', () => {
        it('0 conditions', () => { // 条件がひとつもない場合は成立
            expect(cond.getResult({})).to.be.true;
        });

        it('1 conditions (true)', () => {
            var NAME = 'name';
            var VALUE = 'value';

            var args: tg.PhraseArguments = {};
            args[NAME] = VALUE;

            cond.add(NAME, '=', VALUE);
            expect(cond.getResult(args)).to.be.true;
        });

        it('1 conditions (false)', () => {
            var NAME = 'name';
            var VALUE = 'value';

            var args: tg.PhraseArguments = {};
            args[NAME] = VALUE + 'x';

            cond.add(NAME, '=', VALUE);
            expect(cond.getResult(args)).to.be.false;
        });

        // 変数が存在しない場合は、変数値は空文字として扱われる
        it('1 conditions (nothing key; true)', () => {
            cond.add('nothing_variable_name', '=', '');
            expect(cond.getResult({})).to.be.true;
        });

        it('1 conditions (nothing key; false)', () => {
            cond.add('nothing_variable_name', '=', 'x');
            expect(cond.getResult({})).to.be.false;
        });

        it('2 conditions (true & true)', () => {
            var NAME_1 = 'name_1';
            var NAME_2 = 'name_2';
            var VALUE_1 = 'value_1';
            var VALUE_2 = 'value_2';

            var args: tg.PhraseArguments = {};
            args[NAME_1] = VALUE_1;
            args[NAME_2] = VALUE_2;

            cond.add(NAME_1, '=', VALUE_1);
            cond.add(NAME_2, '=', VALUE_2);

            expect(cond.getResult(args)).to.be.true;
        });

        it('2 conditions (true & false)', () => {
            var NAME_1 = 'name_1';
            var NAME_2 = 'name_2';
            var VALUE_1 = 'value_1';
            var VALUE_2 = 'value_2';

            var args: tg.PhraseArguments = {};
            args[NAME_1] = VALUE_1;
            args[NAME_2] = VALUE_2;

            cond.add(NAME_1, '=', VALUE_1);
            cond.add(NAME_2, '!=', VALUE_2);

            expect(cond.getResult(args)).to.be.false;
        });


        it('2 conditions (false & true)', () => {
            var NAME_1 = 'name_1';
            var NAME_2 = 'name_2';
            var VALUE_1 = 'value_1';
            var VALUE_2 = 'value_2';

            var args: tg.PhraseArguments = {};
            args[NAME_1] = VALUE_1;
            args[NAME_2] = VALUE_2;

            cond.add(NAME_1, '!=', VALUE_1);
            cond.add(NAME_2, '=', VALUE_2);

            expect(cond.getResult(args)).to.be.false;
        });

        it('2 conditions (false & false)', () => {
            var NAME_1 = 'name_1';
            var NAME_2 = 'name_2';
            var VALUE_1 = 'value_1';
            var VALUE_2 = 'value_2';

            var args: tg.PhraseArguments = {};
            args[NAME_1] = VALUE_1;
            args[NAME_2] = VALUE_2;

            cond.add(NAME_1, '!=', VALUE_1);
            cond.add(NAME_2, '!=', VALUE_2);

            expect(cond.getResult(args)).to.be.false;
        });
    });
}); 