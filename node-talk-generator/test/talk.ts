/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

// 会話に対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../index');

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

        talk1 = talkList.startTalk(TALK_ID_1);
        talk2 = talkList.startTalk(TALK_ID_2);
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

        expect(p).not.to.equal(q); // 別インスタンス
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

    it('Talk#items() !== null', () => {
        expect(talk1.items()).not.to.be.null;
    });

    it('Talk#items().length == 0', () => {
        expect(talk1.items().length).to.equal(0);
    });

    it('Talk#items() should include sentence', () => {
        var s= new tg.Sentence('id');
        talk1.add(s);

        expect(talk1.items()).to.include(s);
    });


});