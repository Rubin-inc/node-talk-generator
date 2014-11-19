var talk = require('./lib/talk');
var talkList = require('./lib/talkList');
var sentence = require('./lib/sentence');
var pointer = require('./lib/pointer');
var branch = require('./lib/branch');
var phrase = require('./lib/phrase/index');
exports.InputType = talk.InputType;
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
