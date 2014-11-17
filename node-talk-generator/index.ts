﻿import talk = require('./lib/talk');
import talkList = require('./lib/talk-list');
import sentence = require('./lib/sentence');
import pointer = require('./lib/pointer');
import branch = require('./lib/branch');

export declare class Talk extends talk.Talk { }
export declare class TalkList extends talkList.TalkList { }
export declare class Sentence extends sentence.Sentence { }
export declare class Pointer extends pointer.Pointer { }
export declare class Branch extends branch.Branch { }

module.exports = {
    Talk: talk.Talk,
    TalkList: talkList.TalkList,
    Sentence: sentence.Sentence,
    Pointer: pointer.Pointer,
    Branch: branch.Branch
};