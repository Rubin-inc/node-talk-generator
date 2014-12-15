/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../test.d.ts" />

// 会話ポインタに対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

describe('Pointer class', () => {
    var p: tg.Pointer;
    var q: tg.Pointer;

    beforeEach(() => {
        p = new tg.Pointer();
        q = new tg.Pointer();
    });

    afterEach(() => {
        p = undefined;
        q = undefined;
    });

    it('Pointer (blank) p !== q', () => {
        expect(p).not.to.equal(q);
    });

    it('Pointer (blank) p.equals(q)', () => {
        expect(p.equals(q)).to.be.true;
    });

    it('Pointer (tabId) p.equals(q)', () => {
        p.talkId = 'p';
        q.talkId = 'p';

        expect(p.equals(q)).to.be.true;
    });

    it('Pointer (tabId) !p.equals(q)', () => {
        p.talkId = 'p';
        q.talkId = 'q';

        expect(p.equals(q)).to.be.false;
    });

    it('Pointer (sentenceId) !p.equals(q)', () => {
        p.sentenceId = 'p';
        q.sentenceId = 'p';

        expect(p.equals(q)).to.be.true;
    });

    it('Pointer (sentenceId) p.equals(q)', () => {
        p.sentenceId = 'p';
        q.sentenceId = 'q';

        expect(p.equals(q)).to.be.false;
    });

    it('Pointer (branchId) p.equals(q)', () => {
        p.branchId = 'p';
        q.branchId = 'p';

        expect(p.equals(q)).to.be.true;
    });

    it('Pointer (branchId) !p.equals(q)', () => {
        p.branchId = 'p';
        q.branchId = 'q';

        expect(p.equals(q)).to.be.false;
    });

    it('Pointer#toJSON() equals (blank)', () => {
        var str = JSON.stringify(p);
        var p2 = new tg.Pointer(JSON.parse(str));

        expect(p.equals(p2)).to.be.true;
    });

    it('Pointer#toJSON() equals (all)', () => {
        p.talkId = 'talkId';
        p.sentenceId = 'sentenceId';
        p.branchId = 'branchId';

        var str = JSON.stringify(p);
        var p2 = new tg.Pointer(JSON.parse(str));

        expect(p.equals(p2)).to.be.true;
    });

    it('Pointer#toJSON() !equals (talkId)', () => {
        p.talkId = 'p';

        var str = JSON.stringify(p);
        var p2 = new tg.Pointer(JSON.parse(str));

        p.talkId = 'q';

        expect(p.equals(p2)).to.be.false;
    });
});