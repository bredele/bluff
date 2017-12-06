# Bluff

  > [![Build Status](https://travis-ci.org/bredele/bluff.svg?branch=master)](https://travis-ci.org/bredele/bluff)
  [![NPM](https://img.shields.io/npm/v/bluff.svg)](https://www.npmjs.com/package/bluff)
  [![Downloads](https://img.shields.io/npm/dm/bluff.svg)](http://npm-stat.com/charts.html?package=bluff)
  [![pledge](https://bredele.github.io/contributing-guide/community-pledge.svg)](https://github.com/bredele/contributing-guide/blob/master/guidelines.md)

Transform everything into a **promise**.

* **Standardization**: Bluff helps reducing difference of implementation in your code according you are dealing with synchronous or asynchronous computations. Any value passed to Bluff is transformed into a promise. Even streams!
* **Combination**: Bluff resolves when all of the promises in the iterable argument have resolved and when all or some of the the iterable argument contains no promises.


[Learn more](/docs) or [Try it online!](http://requirebin.com/?gist=820863755c8ce2664c5bf3ebfd17458a)

## Usage

```js
var promise = require('bluff')

function readJSON(filename){
  return promise(function (resolve, reject){
    readFile(filename, 'utf8').done(function (res){
      try {
        resolve(JSON.parse(res));
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}

// combination example

promise(
  readJSON('package.json'),
  'and dome other text'
).then(data => {
  // do something
})
```

Check out [examples](http://requirebin.com/?gist=820863755c8ce2664c5bf3ebfd17458a) and [tests](/test) for more information.

## Installation

```shell
npm install bluff --save
```

[![NPM](https://nodei.co/npm/bluff.png)](https://nodei.co/npm/bluff/)


## Question

For questions and feedback please use our [twitter account](https://twitter.com/bredeleca). For support, bug reports and or feature requests please make sure to read our
<a href="https://github.com/bredele/contributing-guide/blob/master/guidelines.md" target="_blank">community guideline</a> and use the issue list of this repo and make sure it's not present yet in our reporting checklist.

## Contribution

Bluff is an open source project and would not exist without its community. If you want to participate please make sure to read our <a href="https://github.com/bredele/contributing-guide/blob/master/guidelines.md" target="_blank">guideline</a> before making a pull request. If you have any bluff-related project, component or other let everyone know in our wiki.

## License

The MIT License (MIT)

Copyright (c) 2016 Olivier Wietrich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
