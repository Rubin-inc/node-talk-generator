/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import talk = require('./lib/talk');
import talkList = require('./lib/talkList');
import sentence = require('./lib/sentence');
import pointer = require('./lib/pointer');
import branch = require('./lib/branch');
import phrase = require('./lib/phrase/index');

// 宣言のみ
export interface TalkNext extends talk.TalkNext { }
export interface BranchAnswer extends branch.BranchAnswer { }
export interface PhraseArguments extends phrase.PhraseArguments{ }

export declare class Talk extends talk.Talk { }
export declare class TalkList extends talkList.TalkList { }
export declare class Sentence extends sentence.Sentence { }
export declare class Pointer extends pointer.Pointer { }
export declare class Branch extends branch.Branch { }
export declare class Condition extends phrase.Condition { }

export declare class BasicPhrase extends phrase.BasicPhrase { }
export declare class Phrase extends phrase.Phrase { }
export declare class VariablePhrase extends phrase.VariablePhrase { }
export declare class BranchPhrase extends phrase.BranchPhrase { }

export var InputType = talk.InputType;

exports.Talk = talk.Talk;
exports.TalkList = talkList.TalkList;
exports.Sentence = sentence.Sentence;
exports.Pointer = pointer.Pointer;
exports.Branch = branch.Branch;
exports.Condition = phrase.Condition;

// Phrase
exports.BasicPhrase = phrase.BasicPhrase;
exports.Phrase = phrase.Phrase;
exports.VariablePhrase = phrase.VariablePhrase;
exports.BranchPhrase = phrase.BranchPhrase;