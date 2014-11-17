node-talk-generator
-------------------

## Development environment
* Node.js & NPM
* Visual Studio 2013
* [TypeScript](http://www.typescriptlang.org)
* [Grunt](http://gruntjs.com)
* [tsd](http://definitelytyped.org/tsd/)

## Build
First, you must install developer tools.

```
$ npm install -g grunt-cli
$ npm install -g tsd
```

Next, you must install dependency libraries for this project.

```
$ tsd reinstall
$ npm install
$ grunt build
```

## Test
You can test as following.

```
$ npm test
```