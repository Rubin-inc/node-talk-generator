/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../../test.d.ts" />

//  演算子に対するテスト

import _ = require('lodash');
import chai = require('chai');

import operator = require('../../../lib/phrase/operator');

var expect = chai.expect;

describe('Operator definitions', () => {
    describe('equal (==)', () => {
        var equal: operator.OperatorFunction;

        before(() => {
            equal = operator.OPERATORS['='];
        });

        it('0 == 0 (true)', () => {
            expect(equal('0', '0')).to.be.true;
        });

        it('0 == 1 (false)', () => {
            expect(equal('0', '1')).to.be.false;
        });

        it('1 == 0 (false)', () => {
            expect(equal('1', '0')).to.be.false;
        });

        it('"a" == "a" (true)', () => {
            expect(equal('a', 'a')).to.be.true;
        });

        it('"a" == "b" (false)', () => {
            expect(equal('a', 'b')).to.be.false;
        });

        it('"b" == "a" (false)', () => {
            expect(equal('b', 'a')).to.be.false;
        });

        it('=', () => {
            expect(operator.OPERATORS['=']).to.equal(equal);
        });

        it('==', () => {
            expect(operator.OPERATORS['==']).to.equal(equal);
        });
    });

    describe('not equal (!=)', () => {
        var notEqual: operator.OperatorFunction;

        before(() => {
            notEqual = operator.OPERATORS['!='];
        });

        it('0 != 0 (false)', () => {
            expect(notEqual('0', '0')).to.be.false;
        });

        it('0 != 1 (true)', () => {
            expect(notEqual('0', '1')).to.be.true;
        });

        it('1 != 0 (true)', () => {
            expect(notEqual('1', '0')).to.be.true;
        });

        it('"a" != "a" (false)', () => {
            expect(notEqual('a', 'a')).to.be.false;
        });

        it('"a" != "b" (true)', () => {
            expect(notEqual('a', 'b')).to.be.true;
        });

        it('"b" != "a" (true)', () => {
            expect(notEqual('b', 'a')).to.be.true;
        });

        it('!=', () => {
            expect(operator.OPERATORS['!=']).to.equal(notEqual);
        });

        it('<>', () => {
            expect(operator.OPERATORS['<>']).to.equal(notEqual);
        });

        it('≠', () => {
            expect(operator.OPERATORS['≠']).to.equal(notEqual);
        });
    });

    describe('greater (>)', () => {
        var greater: operator.OperatorFunction;

        before(() => {
            greater = operator.OPERATORS['>'];
        });

        it('0 > 0 (false)', () => {
            expect(greater('0', '0')).to.be.false;
        });

        it('0 > 1 (false)', () => {
            expect(greater('0', '1')).to.be.false;
        });

        it('1 > 0 (true)', () => {
            expect(greater('1', '0')).to.be.true;
        });

        it('"a" > "a" (false)', () => {
            expect(greater('a', 'a')).to.be.false;
        });

        it('"a" > "b" (false)', () => {
            expect(greater('a', 'b')).to.be.false;
        });

        it('"b" > "a" (false)', () => {
            expect(greater('b', 'a')).to.be.false;
        });

        it('>', () => {
            expect(operator.OPERATORS['>']).to.equal(greater);
        });
    });

    describe('greater or equal (>=)', () => {
        var greaterOrEqual: operator.OperatorFunction;

        before(() => {
            greaterOrEqual = operator.OPERATORS['>='];
        });

        it('0 >= 0 (true)', () => {
            expect(greaterOrEqual('0', '0')).to.be.true;
        });

        it('0 >= 1 (false)', () => {
            expect(greaterOrEqual('0', '1')).to.be.false;
        });

        it('1 >= 0 (true)', () => {
            expect(greaterOrEqual('1', '0')).to.be.true;
        });

        it('"a" >= "a" (false)', () => {
            expect(greaterOrEqual('a', 'a')).to.be.false;
        });

        it('"a" >= "b" (false)', () => {
            expect(greaterOrEqual('a', 'b')).to.be.false;
        });

        it('"b" >= "a" (false)', () => {
            expect(greaterOrEqual('b', 'a')).to.be.false;
        });

        it('>=', () => {
            expect(operator.OPERATORS['>=']).to.equal(greaterOrEqual);
        });

        it('≧', () => {
            expect(operator.OPERATORS['≧']).to.equal(greaterOrEqual);
        });
    });

    describe('less (<)', () => {
        var less: operator.OperatorFunction;

        before(() => {
            less = operator.OPERATORS['<'];
        });

        it('0 < 0 (false)', () => {
            expect(less('0', '0')).to.be.false;
        });

        it('0 < 1 (true)', () => {
            expect(less('0', '1')).to.be.true;
        });

        it('1 < 0 (false)', () => {
            expect(less('1', '0')).to.be.false;
        });

        it('"a" < "a" (false)', () => {
            expect(less('a', 'a')).to.be.false;
        });

        it('"a" < "b" (false)', () => {
            expect(less('a', 'b')).to.be.false;
        });

        it('"b" < "a" (false)', () => {
            expect(less('b', 'a')).to.be.false;
        });

        it('<', () => {
            expect(operator.OPERATORS['<']).to.equal(less);
        });
    });

    describe('less or equal (<=)', () => {
        var lessOrEqual: operator.OperatorFunction;

        before(() => {
            lessOrEqual = operator.OPERATORS['<='];
        });

        it('0 <= 0 (true)', () => {
            expect(lessOrEqual('0', '0')).to.be.true;
        });

        it('0 <= 1 (true)', () => {
            expect(lessOrEqual('0', '1')).to.be.true;
        });

        it('1 <= 0 (false)', () => {
            expect(lessOrEqual('1', '0')).to.be.false;
        });

        it('"a" <= "a" (false)', () => {
            expect(lessOrEqual('a', 'a')).to.be.false;
        });

        it('"a" <= "b" (false)', () => {
            expect(lessOrEqual('a', 'b')).to.be.false;
        });

        it('"b" <= "a" (false)', () => {
            expect(lessOrEqual('b', 'a')).to.be.false;
        });

        it('<=', () => {
            expect(operator.OPERATORS['<=']).to.equal(lessOrEqual);
        });

        it('≦', () => {
            expect(operator.OPERATORS['≦']).to.equal(lessOrEqual);
        });
    });
}); 