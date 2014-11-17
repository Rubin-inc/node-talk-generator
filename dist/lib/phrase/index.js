/// <reference path="../../typings/node/node.d.ts" />
// フレーズの実装
var basicPhrase = require('./basicPhrase');
var phrase = require('./phrase');
var variablePhrase = require('./variablePhrase');
module.exports = {
    BasicPhrase: basicPhrase.BasicPhrase,
    Phrase: phrase.Phrase,
    VariablePhrase: variablePhrase.VariablePhrase
};
