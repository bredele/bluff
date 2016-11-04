![bluff](http://s2.quickmeme.com/img/c7/c7f713588d90023b76daa9b748ad2156db3a23f195d1d680c985bf0622c6aa39.jpg)

A Promise object is used for asynchronous computations and represents a value which may be available now, or in the future, or never.

For more information about Promises, please read this excellent [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or the [bluff spec](/test)


## Asynchronous

A bluff promise accepts as argument a function (a.k.a executor) with the argument resolve and reject. This function is called immediately and can initialize some asynchronous work which calls either the resolve or reject function to resolve the promise or else reject it if an error occurred.

Here's a simple example that resolve a promise after one second with the value 'hello world'.

```js
var Promise = require('bluff')

function hello() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve('hello world')
    }, 1000)
  })
}

hello().then(function(value) {
  console.log(value)
  // => hello world
})
```

The `new` operator is totally optional and you can simply call the function bluff as following:

```js
var bluff = require('bluff')

function hello() {
  return bluff(function(resolve, reject) {
    setTimeout(function() {
      resolve('hello world')
    }, 1000)
  })
}
```

## Synchronous

Promises allow developers to write elegant asynchronous code. Too often though you'll notice differences of implementation according your code deals with IO bounds or not. Bluff allows you to wrap synchronous computations as if they were asynchronous.

Here's a simple example:

```js
var bluff = require('bluff')
var promise = bluff('hello world')

promise.then(function(value) {
  console.log(value)
  // => hello world
})
```

Bluff transforms any type of value into a promise and allow developers to treat synchronous and asynchronous computations the same way.

## Combination

Bluff allows you to flatten your code by combining multiple promises into a promise that is resolved when all of the input promises are resolved.

```js
var bluff = require('bluff')

var hello = bluff(function(resolve) {
  setTimeout(function() {
    resolve('hello')
  }, 1000)
})
var world = bluff(function(resolve) {
  setTimeout(function() {
    resolve('world')
  }, 200)
})

bluff(hello, world).then(function(value) {
  console.log(value)
  // => ['hello', 'world']
})
```

Combine any type of value with synchronous or asynchronous computations:

```js
var bluff = require('bluff')

var hello = bluff('hello')
var world = bluff(function(resolve) {
  setTimeout(function() {
    resolve('world')
  }, 200)
})

bluff(hello, function(resolve, reject) {
  setTimeout(function() {
    resolve('github')
  }, 4000)
}, world).then(function(value) {
  console.log(value)
  // => ['hello', 'github', 'world']
})
```
