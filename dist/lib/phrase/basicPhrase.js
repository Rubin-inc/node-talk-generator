/// <reference path="../../typings/node/node.d.ts" />
// フレーズの抽象クラスの実装
var BasicPhrase = (function () {
    function BasicPhrase() {
    }
    BasicPhrase.prototype.getText = function (args) {
        throw new Error('Not Implemented');
    };
    return BasicPhrase;
})();
exports.BasicPhrase = BasicPhrase;
