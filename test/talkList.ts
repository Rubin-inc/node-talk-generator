/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

// 会話一覧に対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../index');

var expect = chai.expect;

describe('TalkList class', () => {
    var talkList: tg.TalkList;

    before(() => {
        talkList = new tg.TalkList();
    });

    afterEach(() => {
        talkList.clear();
    });

    it('TalkList !== null', () => {
        expect(talkList).to.not.be.null;
    });

    it('TalkList#length == 0', () => {
        expect(talkList.length).to.equal(0);
    });

    it('TalkList#length > 0', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);

        expect(talkList.length).to.be.above(0); // > 0
    });

    it('TalkList#add() returns', () => {
        var talk = new tg.Talk('id');
        expect(talkList.add(talk)).to.equal(talkList);
    });

    it('TalkList#clear()', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);
        talkList.clear();

        expect(talkList.length).to.equal(0);
    });

    it('TalkList#clear() returns', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);

        expect(talkList.clear()).to.equal(talkList);
    });

    it('TalkList#remove()', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);
        talkList.remove(talk);

        expect(talkList).to.have.length(0);
    });

    it('TalkList#remove() returns', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);

        expect(talkList.remove(talk)).to.equal(talkList);
    });

    it('TalkList#items() !== null', () => {
        expect(talkList.items()).to.not.be.null;
    });

    it('TalkList#items().length == 0', () => {
        expect(talkList.items().length).to.equal(0);
    });

    it('TalkList#items should include talk', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);

        expect(talkList.items()).to.include(talk);
    });

    it('TalkList#start shouldn\'t start', () => {
        expect(talkList.start('nothing_talk_id')).to.be.null;
    });

    it('TalkList#start should start', () => {
        var talk = new tg.Talk('talk_id');
        talkList.add(talk);

        expect(talkList.start('talk_id')).to.not.be.null;
    });

    it('TalkList#start should start (Japanese)', () => {
        var ID = 'トーク ID';
        var talk = new tg.Talk(ID);
        talkList.add(talk);

        expect(talkList.start(ID)).to.not.be.null;
    });

    it('TalkList#resume()', () => {
        var ID = 'talk_id';

        var talk = new tg.Talk(ID);
        talkList.add(talk);

        var staredTalk = talkList.start(ID);
        staredTalk.next();

        var p = staredTalk.getPointerClone();

        var resumeTalk = talkList.resume(p);

        expect(talk).to.be.equal(staredTalk)
            .and.to.be.equal(resumeTalk);
    });
});