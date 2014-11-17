/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />

//  文章に対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../index');

var expect = chai.expect;

describe('Sentence class', () => {
    var TALK_ID = 'talk_id';
    var SENTENCE_ID = 'sentence_id';

    var talkList: tg.TalkList;
    var talk: tg.Talk;
    var s: tg.Sentence;

    before(() => {
        talkList = new tg.TalkList();
        talk = new tg.Talk(TALK_ID);
        talkList.add(talk);

        s = new tg.Sentence(SENTENCE_ID);
        talk.add(s);
    });

    afterEach(() => {
        s.clear();
    });

    it('TalkList isn\'t empty', () => {
        expect(talkList).to.not.be.empty;
    });

    it('Talk isn\'t empty', () => {
        expect(talk).to.not.be.empty;
    });

    it('Sentence isn\'t empty', () => {
        expect(s).to.not.be.empty;
    });

    it('Sentence#id equals', () => {
        expect(s.id).to.be.equal(SENTENCE_ID);
    });

    it('Sentence#length === 0', () => {
        expect(s.length).to.be.equal(0);
    });

    it('Sentence#length > 0', () => {
        var p = new tg.Phrase('phrase_id');
        s.add(p);

        expect(s.length).to.be.above(0); // > 0
    });
});