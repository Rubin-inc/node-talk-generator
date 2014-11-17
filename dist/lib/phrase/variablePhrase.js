/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var basicPhrase = require('./basicPhrase');
var VariablePhrase = (function (_super) {
    __extends(VariablePhrase, _super);
    function VariablePhrase() {
        _super.apply(this, arguments);
    }
    VariablePhrase.prototype.getText = function (args) {
        return null;
    };
    return VariablePhrase;
})(basicPhrase.BasicPhrase);
exports.VariablePhrase = VariablePhrase;
