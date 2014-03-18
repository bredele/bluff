
# promise

  > It feelds good to reinvent the wheel

  Promises implementation based on [emitter](htp://github.com/component/emitter). It follows [A+ spec](http://promises-aplus.github.io/promises-spec/).

## Installation

  Install with [component](http://component.io):

    $ component install bredele/promise

  Install with [nodejs](http://nodejs.orh):

    $ npm install component-promise

## API

### .then(fulfilled, rejected)

 Register callbacks to receive either a promise’s eventual value or the reason why the promise cannot be fulfilled .

```js
promise.then(function() {
  //on fulfilled
}, function() {
  //on rejected
});
```

 `then` arguments are optionals

### .resolve(value)

 Resolve/Fulfill promise with optional value.

```js
promise.resolve();
```

### .reject(reason)

 Reject promise with optional reason.

```js
promise.reject();
```

### .state

 Promise state is `pending` by default and may transition to either the `fulfilled` or `rejected` state.
 A promise which is `fulfilled` or `rejected` can not transition to another state.

```js
promise.state;
```

 `state` is private and should not be changed outside of the [`resolve`](#resolve) or [`reject`](#reject) handlers.

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright holders>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.