var talk = require('./lib/talk');
var talkList = require('./lib/talkList');
var sentence = require('./lib/sentence');
var pointer = require('./lib/pointer');
var branch = require('./lib/branch');
var phrase = require('./lib/phrase/index');
module.exports = {
    Talk: talk.Talk,
    TalkList: talkList.TalkList,
    Sentence: sentence.Sentence,
    Pointer: pointer.Pointer,
    Branch: branch.Branch
};
