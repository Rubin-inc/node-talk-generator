/// <reference path="../../typings/node/node.d.ts" />

// フレーズの実装

import basicPhrase = require('./basicPhrase');
import phrase = require('./phrase');
import variablePhrase = require('./variablePhrase');

export declare class BasicPhrase extends basicPhrase.BasicPhrase { }
export declare class Phrase extends phrase.Phrase { }
export declare class VariablePhrase extends variablePhrase.VariablePhrase { }

module.exports = {
    BasicPhrase: basicPhrase.BasicPhrase,
    Phrase: phrase.Phrase,
    VariablePhrase: variablePhrase.VariablePhrase
}; 