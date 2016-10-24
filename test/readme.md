# Bluff tests

Type the following command to run tests.
```shell
$ npm test
```

## Overview

A *promise* represents the eventual result of an asynchronous operation. The primary way of interacting with a promise is through its `then` method, which registers callbacks to receive either a promise's eventual value or the reason why the promise cannot be fulfilled.

Our tests details the behavior of the `then` method, providing an interoperable base which all Promises/A+ conformant promise implementations can be depended on to provide.

## The `then` Method

A promise must provide a `then` method to access its current or eventual value or reason.

A promise's `then` method accepts two arguments:

```js
promise.then(onFulfilled, onRejected)
```

1. Both `onFulfilled` and `onRejected` are optional arguments:
    1. If `onFulfilled` is not a function, it must be ignored.
    1. If `onRejected` is not a function, it must be ignored.
1. If `onFulfilled` is a function:
    1. it must be called after `promise` is fulfilled, with `promise`'s value as its first argument.
    1. it must not be called before `promise` is fulfilled.
    1. it must not be called more than once.
1. If `onRejected` is a function,
    1. it must be called after `promise` is rejected, with `promise`'s reason as its first argument.
    1. it must not be called before `promise` is rejected.
    1. it must not be called more than once.
1. `onFulfilled` or `onRejected` must not be called until the [execution context](https://es5.github.io/#x10.3) stack contains only platform code. [[3.1](#notes)].
1. `onFulfilled` and `onRejected` must be called as functions (i.e. with no `this` value). [[3.2](#notes)]
1. `then` may be called multiple times on the same promise.
    1. If/when `promise` is fulfilled, all respective `onFulfilled` callbacks must execute in the order of their originating calls to `then`.
    1. If/when `promise` is rejected, all respective `onRejected` callbacks must execute in the order of their originating calls to `then`.
1. `then` must return a promise [[3.3](#notes)].

    1. If either `onFulfilled` or `onRejected` returns a value `x`, run the Promise Resolution Procedure `[[Resolve]](promise2, x)`.
    1. If either `onFulfilled` or `onRejected` throws an exception `e`, `promise2` must be rejected with `e` as the reason.
    1. If `onFulfilled` is not a function and `promise1` is fulfilled, `promise2` must be fulfilled with the same value as `promise1`.
    1. If `onRejected` is not a function and `promise1` is rejected, `promise2` must be rejected with the same reason as `promise1`.
