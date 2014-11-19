/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// 条件フレーズの実装

import _ = require('lodash');

import basicPhrase = require('./basicPhrase');
import condition = require('./condition');
import args = require('./args');

interface ConditionItem {
    cond: condition.Condition;
    text: string;
}

/**
 * 条件フレーズ
 */
export class BranchPhrase extends basicPhrase.BasicPhrase {
    private conditions: ConditionItem[] = [];

    public constructor(id: string) {
        super(id);
    }

    /**
     * 条件とテキストを追加する
     * 条件が無い場合、常に成立しているとして扱う
     */
    public add(text: string, cond: condition.Condition = null): BranchPhrase {
        this.conditions.push({
            cond: cond,
            text: text
        });

        return this;
    }

    /**
     * 条件が成立した項目からランダムに選ぶ
     */
    public getText(args_: args.PhraseArguments): string {
        // 条件に合う項目を抽出する
        // 条件が無い場合は、成立しているとみなす
        var items = _.filter(this.conditions, cond => {
            if (cond && cond.cond) {
                return cond.cond.getResult(args_);
            }

            return true;
        });

        // 条件が成立した項目からランダムに選ぶ
        var sample = _.sample(items);

        // 文字列に変換
        return sample ? sample.text || '' : '';
    }

    /**
     * 条件とテキストをクリアする
     */
    public clear(): BranchPhrase {
        this.conditions.length = 0;
        return this;
    }

    /**
     * 条件とテキストのペアの個数を返す
     */
    public get length(): number {
        return this.conditions.length;
    }
} 