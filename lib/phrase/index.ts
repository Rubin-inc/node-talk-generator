/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../../typings/node/node.d.ts" />

// フレーズの実装

import basicPhrase = require('./basicPhrase');
import phrase = require('./phrase');
import variablePhrase = require('./variablePhrase');
import branchPhrase = require('./branchPhrase');
import args = require('./args');
import condition = require('./condition');

export interface PhraseArguments extends args.PhraseArguments { }

export declare class BasicPhrase extends basicPhrase.BasicPhrase { }
export declare class Phrase extends phrase.Phrase { }
export declare class VariablePhrase extends variablePhrase.VariablePhrase { }
export declare class BranchPhrase extends branchPhrase.BranchPhrase { }
export declare class Condition extends condition.Condition { }

module.exports = {
    BasicPhrase: basicPhrase.BasicPhrase,
    Phrase: phrase.Phrase,
    VariablePhrase: variablePhrase.VariablePhrase,
    BranchPhrase: branchPhrase.BranchPhrase,
    Condition: condition.Condition
}; 