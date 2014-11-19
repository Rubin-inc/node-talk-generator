/// <reference path="../../typings/node/node.d.ts" />

// 演算子の定義

/**
 * 演算子の処理関数の定義
 */
export interface OperatorFunction {
    (lhs: string, rhs: string): boolean;
}

/**
 * 数値演算子を文字列引数に対応させるラッパー
 */
function wrapNumber(func: (lhs: number, rhs: number) => boolean) {
    return (lhs: string, rhs: string) => {
        return func(Number(lhs), Number(rhs));
    };
}

var equal = (lhs: string, rhs: string) => lhs == rhs;
var notEqual = (lhs: string, rhs: string) => lhs != rhs;

var greater = (lhs: number, rhs: number) => lhs > rhs;
var greaterOrEqual = (lhs: number, rhs: number) => lhs >= rhs;
var less = (lhs: number, rhs: number) => lhs < rhs;
var lessThanEqual = (lhs: number, rhs: number) => lhs <= rhs;

/**
 * 演算子の文字列と、処理関数の連想配列
 */
export var OPERATORS: { [key: string]: OperatorFunction } = {
    "=": equal,
    "==": equal,
    "!=": notEqual,
    "<>": notEqual,
    "≠": notEqual,
    ">": wrapNumber(greater),
    "≧": wrapNumber(greaterOrEqual),
    ">=": wrapNumber(greaterOrEqual),
    "<": wrapNumber(less),
    "≦": wrapNumber(lessThanEqual),
    "<=": wrapNumber(lessThanEqual),
};