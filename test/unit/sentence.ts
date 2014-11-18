/// <reference path="../test.d.ts" />

//  文章に対してのテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

/**
 * テスト用のフレーズモック
 */
class PhraseMock extends tg.BasicPhrase {
    public constructor(id: string, private text: string = "") {
        super(id);
    }

    public getText(args: tg.PhraseArguments): string {
        return this.text;
    }
}

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

    it('Sentence#clear()', () => {
        var p = new PhraseMock("id");
        s.add(p);
        s.clear();

        expect(s.length).to.be.equal(0);
    });

    it('Sentence#add()', () => {
        var p = new PhraseMock('phrase_id');
        s.add(p);

        expect(s.length).to.be.above(0); // > 0
    });

    it('Sentence#items() !== null', () => {
        expect(s.items()).to.not.be.null;
    });

    it('Sentence#items().length === 0', () => {
        expect(s.items().length).to.equal(0);
    });

    it('Sentence#items().length > 0', () => {
        var p = new PhraseMock('id');
        s.add(p);

        expect(s.items().length).to.be.above(0); // > 0
    });

    it('Sentence#items() include p', () => {
        var p = new PhraseMock('id');
        s.add(p);

        expect(s.items()).to.include(p);
    });

    describe('Sentence#getText()', () => {
        it('0 phrase', () => {
            expect(s.getText({})).to.equal('');
        });

        it('1 phrase', () => {
            var TEXT = 'foo';
            s.add(new PhraseMock('id', TEXT));
            expect(s.getText({})).to.equal(TEXT);
        });

        it('1 phrase (Japanese)', () => {
            var TEXT = '日本語てすと';
            s.add(new PhraseMock('id', TEXT));
            expect(s.getText({})).to.equal(TEXT);
        });

        it('2 phrases', () => {
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';

            s.add(new PhraseMock('id_1', TEXT_1));
            s.add(new PhraseMock('id_2', TEXT_2));

            expect(s.getText({})).to.equal(TEXT_1 + TEXT_2);
        });

        it('2 phrases (same)', () => {
            var TEXT = 'foo';

            var p = new PhraseMock('id_1', TEXT);
            s.add(p); s.add(p);

            expect(s.getText({})).to.equal(TEXT + TEXT);
        });

        it('2 phrases (Japanese)', () => {
            var TEXT_1 = '日本語てすと';
            var TEXT_2 = '坂本龍馬';

            s.add(new PhraseMock('id_1', TEXT_1));
            s.add(new PhraseMock('id_2', TEXT_2));

            expect(s.getText({})).to.equal(TEXT_1 + TEXT_2);
        });

        it('3 phrases', () => {
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';
            var TEXT_3 = 'baz';

            s.add(new PhraseMock('id_1', TEXT_1));
            s.add(new PhraseMock('id_2', TEXT_2));
            s.add(new PhraseMock('id_3', TEXT_3));

            expect(s.getText({})).to.equal(TEXT_1 + TEXT_2 + TEXT_3);
        });

        it('3 phrases (same)', () => {
            var TEXT_1 = 'foo';
            var TEXT_2 = 'bar';

            var p = new PhraseMock('id_1', TEXT_1);
            s.add(p);
            s.add(new PhraseMock('id_2', TEXT_2));
            s.add(p);

            expect(s.getText({})).to.equal(TEXT_1 + TEXT_2 + TEXT_1);
        });

        it('100 phrases', () => {
            var result = "";

            for (var i = 0; i < 100; ++i) {
                s.add(new PhraseMock("id_" + i, i.toString()));
                result += i;
            }

            expect(s.getText({})).to.equal(result);
        });
    });
});