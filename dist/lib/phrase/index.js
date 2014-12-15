/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/// <reference path="../../typings/node/node.d.ts" />
// フレーズの実装
var basicPhrase = require('./basicPhrase');
var phrase = require('./phrase');
var variablePhrase = require('./variablePhrase');
var branchPhrase = require('./branchPhrase');
var condition = require('./condition');
module.exports = {
    BasicPhrase: basicPhrase.BasicPhrase,
    Phrase: phrase.Phrase,
    VariablePhrase: variablePhrase.VariablePhrase,
    BranchPhrase: branchPhrase.BranchPhrase,
    Condition: condition.Condition
};
