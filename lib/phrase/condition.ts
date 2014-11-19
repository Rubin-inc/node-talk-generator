/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

// 条件に関するクラス

import _ = require('lodash');

import args = require('./args');
import operator = require('./operator');

/**
 * 条件のデータ
 */
interface ConditionItem {
    variableName: string;
    operator: string;
    rightValue: string;
}

/**
 * 条件を表すクラス
 */
export class Condition {
    private conditions: ConditionItem[] = [];

    public constructor(public id: string) {
    }

    /**
     * 条件を追加する
     * すべての条件は & で結ばれる
     */
    public add(variableName: string, operator: string, rightValue: string): Condition {
        this.conditions.push({
            variableName: variableName,
            operator: operator,
            rightValue: rightValue
        });

        return this;
    }

    /*
     * 条件をクリアする
     */
    public clear(): Condition {
        this.conditions.length = 0;
        return this;
    }

    /**
     * 条件の結果を返す
     */
    public getResult(args_: args.PhraseArguments): boolean {
        return _.every(this.conditions, cond => {
            var opFunc = operator.OPERATORS[cond.operator];

            if (opFunc) {
                return opFunc(args.getArgumentsValue(args_, cond.variableName), cond.rightValue);
            }

            return false;
        });
    }

    /**
     * 条件の個数
     */
    public get length(): number {
        return this.conditions.length;
    }
}