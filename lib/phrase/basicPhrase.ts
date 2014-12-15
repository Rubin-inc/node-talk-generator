/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../../typings/node/node.d.ts" />

// フレーズの抽象クラスの実装

import args = require('./args');

export class BasicPhrase {
    public constructor(public id: string) {
    }

    /**
     * フレーズを生成し返すメソッド
     * 抽象メソッド、サブクラスで実装すること
     */
    public getText(args: args.PhraseArguments): string {
        throw new Error('Not Implemented');
    }

    /**
     * フレーズのデータを初期化するメソッド
     * ID データは初期化されない
     * 抽象メソッド、サブクラスで実装すること
     */
    public clear(): BasicPhrase {
        throw new Error('Not Implemented');
    }
}