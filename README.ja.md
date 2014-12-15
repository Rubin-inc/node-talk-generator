node-talk-generator
-------------------
[![Build Status](https://travis-ci.org/Rubin-inc/node-talk-generator.svg?branch=master)](https://travis-ci.org/Rubin-inc/node-talk-generator)
[![Coverage Status](https://img.shields.io/coveralls/Rubin-inc/node-talk-generator.svg)](https://coveralls.io/r/Rubin-inc/node-talk-generator?branch=master)
[![Dependency Status](https://david-dm.org/Rubin-inc/node-talk-generator.svg)](https://david-dm.org/Rubin-inc/node-talk-generator)
[![devDependency Status](https://david-dm.org/Rubin-inc/node-talk-generator/dev-status.svg)](https://david-dm.org/Rubin-inc/node-talk-generator#info=devDependencies)

[English](README.md) | [日本語](README.ja.md)

## 開発環境
* Node.js & NPM
* Visual Studio 2013
* [TypeScript](http://www.typescriptlang.org)
* [Grunt](http://gruntjs.com)
* [tsd](http://definitelytyped.org/tsd/)

## 利用方法
TODO

## ビルド
プロジェクトに依存しているライブラリをインストールする必要があります。

```
$ npm install
$ npm run tsd
$ npm run build
```

## テスト
[Mocha](http://mochajs.org) と [Chai](http://chaijs.com) を使ってテストが書かれています。テストは以下のコマンドで実行できます。

```
$ npm test
```

## 開発者向け情報
このプロジェクトは、以下のコマンドにより Grunt による自動ビルドが行えます。

```
$ npm run watch
```

## ライセンス
MPL-2.0<br />
Copyright (C) 2014 Rubin, inc.