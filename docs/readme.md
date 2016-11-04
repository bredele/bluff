A Promise object is used for asynchronous computations and represents a value which may be available now, or in the future, or never.

For more information about Promises, please read this excellent [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or the [bluff spec](/test)


## Executor

A bluff promise accept as argument a function (a.k.a executor) with the argument resolve and reject. This function is called immediately and can initialize some asynchronous work which calls either the resolve or reject function to resolve the promise or else reject it if an error occurred.

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
