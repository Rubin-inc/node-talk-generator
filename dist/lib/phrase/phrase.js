/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var basicPhrase = require('./basicPhrase');
var Phrase = (function (_super) {
    __extends(Phrase, _super);
    function Phrase() {
        _super.apply(this, arguments);
    }
    Phrase.prototype.getText = function (args) {
        return null;
    };
    return Phrase;
})(basicPhrase.BasicPhrase);
exports.Phrase = Phrase;
var BranchPhrase = (function (_super) {
    __extends(BranchPhrase, _super);
    function BranchPhrase() {
        _super.apply(this, arguments);
    }
    BranchPhrase.prototype.getText = function () {
        return null;
    };
    return BranchPhrase;
})(basicPhrase.BasicPhrase);
exports.BranchPhrase = BranchPhrase;
