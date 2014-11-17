﻿/// <reference path="../../typings/node/node.d.ts" />

// フレーズの実装

import basicPhrase = require('./basicPhrase');
import phrase = require('./phrase');
import variablePhrase = require('./variablePhrase');
import branchPhrase = require('./branchPhrase');

export declare class BasicPhrase extends basicPhrase.BasicPhrase { }
export declare class Phrase extends phrase.Phrase { }
export declare class VariablePhrase extends variablePhrase.VariablePhrase { }
export declare class BranchPhrase extends branchPhrase.BranchPhrase { }

module.exports = {
    BasicPhrase: basicPhrase.BasicPhrase,
    Phrase: phrase.Phrase,
    VariablePhrase: variablePhrase.VariablePhrase,
    BranchPhrase: branchPhrase.BranchPhrase
}; 