/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
var BasicPhrase = (function () {
    function BasicPhrase(id) {
        this.id = id;
    }
    /**
     * フレーズを生成し返すメソッド
     * 抽象メソッド、サブクラスで実装すること
     */
    BasicPhrase.prototype.getText = function (args) {
        throw new Error('Not Implemented');
    };
    /**
     * フレーズのデータを初期化するメソッド
     * ID データは初期化されない
     * 抽象メソッド、サブクラスで実装すること
     */
    BasicPhrase.prototype.clear = function () {
        throw new Error('Not Implemented');
    };
    return BasicPhrase;
})();
exports.BasicPhrase = BasicPhrase;
