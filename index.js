/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var talk = require('./lib/talk');
var talkList = require('./lib/talkList');
var sentence = require('./lib/sentence');
var pointer = require('./lib/pointer');
var branch = require('./lib/branch');
var phrase = require('./lib/phrase/index');
var input = require('./lib/input');
exports.InputType = input.InputType;
exports.Talk = talk.Talk;
exports.TalkList = talkList.TalkList;
exports.Sentence = sentence.Sentence;
exports.Pointer = pointer.Pointer;
exports.Branch = branch.Branch;
exports.Condition = phrase.Condition;
exports.Input = input.Input;
// Phrase
exports.BasicPhrase = phrase.BasicPhrase;
exports.Phrase = phrase.Phrase;
exports.VariablePhrase = phrase.VariablePhrase;
exports.BranchPhrase = phrase.BranchPhrase;
