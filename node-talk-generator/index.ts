﻿import talk = require('./lib/talk');
import talkList = require('./lib/talk-list');
import sentence = require('./lib/sentence');
import pointer = require('./lib/pointer');
import switch_ = require('./lib/switch');

export class Talk extends talk.Talk { }
export class TalkList extends talkList.TalkList { }
export class Sentence extends sentence.Sentence { }
export class Pointer extends pointer.Pointer { }
export class Switch extends switch_.Switch { }
