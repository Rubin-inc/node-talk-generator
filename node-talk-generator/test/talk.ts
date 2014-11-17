/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

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

    it('Talk#id', () => {
        expect(talk1.id).to.equal(TALK_ID_1);
    });

    it('Talk#id entryPoint === false', () => {
        expect(talk1.entryPoint).to.be.false;
    });

    it('Talk#id entryPoint === true', () => {
        expect(talk2.entryPoint).to.be.true;
    });
});