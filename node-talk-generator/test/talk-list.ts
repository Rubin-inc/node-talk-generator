/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

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
        expect(talkList).not.to.be.null;
    });

    it('TalkList#length == 0', () => {
        expect(talkList.length).to.equal(0);
    });

    it('TalkList#length > 0', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);

        expect(talkList.length).to.be.above(0); // > 0
    });

    it('TalkList#items() !== null', () => {
        expect(talkList.items()).not.to.be.null;
    });

    it('TalkList#items().length == 0', () => {
        expect(talkList.items().length).to.equal(0);
    });

    it('TalkList#items should include talk', () => {
        var talk = new tg.Talk('id');
        talkList.add(talk);

        expect(talkList.items()).to.include(talk);
    });

    it('TalkList#startTalk shouldn\'t start', () => {
        expect(talkList.startTalk('nothing_talk_id')).to.be.null;
    });

    it('TalkList#startTalk should start', () => {
        var talk = new tg.Talk('talk_id');
        talkList.add(talk);

        expect(talkList.startTalk('talk_id')).not.to.be.null;
    });
});