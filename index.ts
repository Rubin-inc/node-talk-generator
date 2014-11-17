import talk = require('./lib/talk');
import talkList = require('./lib/talkList');
import sentence = require('./lib/sentence');
import pointer = require('./lib/pointer');
import branch = require('./lib/branch');
import phrase = require('./lib/phrase/index');

export interface TalkNext extends talk.TalkNext { }

export declare class Talk extends talk.Talk { }
export declare class TalkList extends talkList.TalkList { }
export declare class Sentence extends sentence.Sentence { }
export declare class Pointer extends pointer.Pointer { }
export declare class Branch extends branch.Branch { }
export declare class Phrase extends phrase.Phrase { }

module.exports = {
    Talk: talk.Talk,
    TalkList: talkList.TalkList,
    Sentence: sentence.Sentence,
    Pointer: pointer.Pointer,
    Branch: branch.Branch
};