/// <reference path="../../typings/node/node.d.ts" />

// フレーズの抽象クラスの実装

export class BasicPhrase {
    public getText(args: { [key: string]: string }): string {
        throw new Error('Not Implemented');
    }
}