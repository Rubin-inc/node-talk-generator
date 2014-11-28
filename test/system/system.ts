/// <reference path="../test.d.ts" />

//  システムテスト

import _ = require('lodash');
import chai = require('chai');

import tg = require('../../index');

var expect = chai.expect;

describe('System Test', () => {
    var TEXT = ['text_1', 'text_2', 'text_3', 'text_4'];
    var INT = [1, 2, 3];

    var talkList: tg.TalkList;
    var talks: tg.Talk[];
    var sentences: tg.Sentence[];
    var phrases: tg.BasicPhrase[];
    var phraseArgs: tg.PhraseArguments;

    beforeEach(() => {
        var p1 = new tg.Phrase('p_1');
        p1.add(TEXT[0]);

        var p2 = new tg.Phrase('p_2');
        p2.add(TEXT[0]);
        p2.add(TEXT[1]);
        p2.add(TEXT[2]);

        var vp1 = new tg.VariablePhrase('vp_1', 'text_1');
        var vp2 = new tg.VariablePhrase('vp_2', 'text_2', 'p', 's');
        var vp3 = new tg.VariablePhrase('vp_3', 'int_1');
        var vp4 = new tg.VariablePhrase('vp_4', 'int_2', 'p', 's');

        var bp1 = new tg.BranchPhrase('bp_1');
        bp1.add(TEXT[0], new tg.Condition('c_1').add('text_1', '=', TEXT[0])); // true
        bp1.add(TEXT[1], new tg.Condition('c_2').add('text_2', '=', TEXT[0])); // false

        var bp2 = new tg.BranchPhrase('bp_2');
        bp2.add(INT[0].toString(), new tg.Condition('c_3').add('int_1', '<', INT[1].toString())); // true
        bp2.add(INT[1].toString(), new tg.Condition('c_4').add('int_2', '>=', INT[2].toString())); // false

        phrases = [
            p1, p2, /* 0-1 */
            vp1, vp2, vp3, vp4, /* 2-5 */
            bp1, bp2 /* 6-7 */
        ];
        
        sentences = [];
        sentences[0] = new tg.Sentence('s_1');
        sentences[1] = new tg.Sentence('s_1');
        sentences[2] = new tg.Sentence('s_2');
        sentences[3] = new tg.Sentence('s_3');
        sentences[4] = new tg.Sentence('s_4');

        sentences[0].add(phrases[0]);

        sentences[1].add(phrases[0]);
        sentences[1].add(phrases[1]);

        sentences[2].add(phrases[0]);
        sentences[2].add(phrases[2]);
        sentences[2].add(phrases[3]);

        sentences[3].add(phrases[4]);
        sentences[3].add(phrases[6]);

        sentences[4].add(phrases[5]);
        sentences[4].add(phrases[7]);

        talks = [];
        talks[0] = new tg.Talk('talk_1', true);
        talks[1] = new tg.Talk('talk_2');
        talks[2] = new tg.Talk('talk_3');

        talks[0].add(sentences[0]);
        talks[0].add(sentences[1]);
        talks[0].add(sentences[2]);
        //talks[0].


        phraseArgs = {
            text_1: TEXT[0],
            text_2: TEXT[1],
            int_1: INT[0].toString(),
            int_2: INT[1].toString(),
            int_3: INT[2].toString()
        };

        talkList = new tg.TalkList();
        _.each(talks, t => talkList.add(t));
    });

    it('TODO');
});