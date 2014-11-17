import talk = require('./lib/talk');
import talkList = require('./lib/talk-list');
import sentence = require('./lib/sentence');
import pointer = require('./lib/pointer');

export class Talk extends talk.Talk { }
export class TalkList extends talkList.TalkList { }
export class Sentence extends sentence.Sentence { }
export class Pointer extends pointer.Pointer { }