---
title: 其他工具
desc: Quasar 提供了一组工具函数，包括防抖、节流、深度克隆、跨平台打开 URL 以及处理 DOM 事件。
keys: openURL,copyToClipboard,exportFile,debounce,frameDebounce,throttle,extend,uid,event
---

::: tip
关于 UMD 版本的用法请看[这里](/start/umd#quasar-global-object)
:::

## 打开 URL

```js
import { openURL } from 'quasar'

openURL('http://...')

// 完整的语法
openURL(
  String url,
  Function rejectFn, // 可选参数；如果窗口未能打开时会调用的函数
  Object windowFeatures // 可选参数；为新窗口请求的特性
)
```
它将处理在 Cordova、 Electron 或浏览器上运行时出现的问题，包括通知用户确认弹出窗口。

当在 Cordova (或 Capacitor) 中使用时，最好 (但不是必须的)也安装 [InAppBrowser](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-inappbrowser/) Cordova 插件，这样 openURL 就可以连接到这个插件。

如果在 IOS 上运行，并且安装了 [cordova-plugin-safariviewcontroller](https://github.com/EddyVerbruggen/cordova-plugin-safariviewcontroller) 插件，那么 openURL 首先会连接到它。

其中可选参 `windowFeatures` 应该是一个对象，它的字段是 [window.open() windowFeatures](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) 中的字段加上一个布尔值（见下方介绍）。
请注意，当 openURL 不使用 `window.open()` 时，这些特性将不会被考虑在内。

```js
// 一个使用了 windowFeatures 的 openURL 示例：

openURL(
  'http://...',
  undefined, // 在下面的示例中，我们不关心 rejectFn()

  // 这里是 windowFeatures 中的对象参数：
  {
    noopener: true, // 出于安全的原因，默认开启
                    // 如果您想禁用它将其设置为 false
    menubar: true,
    toolbar: true,
    noreferrer: true,
    // .....其他的 window features
  }
)
```

::: tip
如果您现在 Cordova 应用中打开拨号应用，不要使用 `openURL()`，直接使用一个 `<a href="tel:123456789">` 标签或者 `<QBtn href="tel:123456789">`
:::

## 复制到剪切板

下面是一个复制一些文本内容到剪切板的工具，这个函数返回一个 Promise。

```js
import { copyToClipboard } from 'quasar'

copyToClipboard('some text')
  .then(() => {
    // 成功!
  })
  .catch(() => {
    // 失败
  })
```

## 导出文件

下面是一个触发浏览器下载指定内容文件的工具。

```js
/**
 * 强制浏览器下载指定内容的文件
 *
 * @param {*} fileName - String
 * @param {*} rawData - String | ArrayBuffer | ArrayBufferView | Blob
 * @param {*} opts - String (mimeType) or Object
 *                   Object form: { mimeType?: String, byteOrderMark?: String | Uint8Array, encoding?: String }
 * @returns Boolean | Error
 */
```

其中的可选参数 `opts` 可以是一个字符串（mimeType）或者一个以下格式的对象：

 * **mimeType** (可选的)

   例如: 'application/octect-stream' (default), 'text/plain', 'application/json', 'text/plain;charset=UTF-8', 'video/mp4', 'image/png', 'application/pdf'
   [https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

 * **byteOrderMark** (可选的)

   (BOM) 例如: '\uFEFF'
   [https://en.wikipedia.org/wiki/Byte_order_mark](https://en.wikipedia.org/wiki/Byte_order_mark)

 * **encoding** (可选的)

   给原始数据执行的 TextEncoder.encode()。例如：'windows-1252' (ANSI, a subset of ISO-8859-1)
   [https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder)

示例:

```js
import { exportFile } from 'quasar'

const status = exportFile('important.txt', 'some content')

if (status === true) {
  // 浏览器允许
}
else {
  // 浏览器不允许
  console.log('Error: ' + status)
}
```

```js
import { exportFile } from 'quasar'

const status = exportFile('file.csv', 'éà; ça; 12\nà@€; çï; 13', {
  encoding: 'windows-1252',
  mimeType: 'text/csv;charset=windows-1252;'
})

if (status === true) {
  // 浏览器允许
}
else {
  // 浏览器不允许
  console.error('Error: ' + status)
}
```

## 顺序运行一组 Promise <q-badge align="top" color="brand-primary" label="v2.8.4+" />

下面是一个可以顺序运行多个 Promises 的工具。**可选，使用多个线程**。

```js
/**
 * 按顺序运行一组 Promise，可选择使用多个线程
 *
 * @param {*} sequentialPromises - 一个函数数组或者一个对象，对象的值都是函数
 *                          函数数组格式: [ (resultAggregator: Array) => Promise<any>, ... ]
 *                          对象格式: { [key: string]: (resultAggregator: object) => Promise<any>, ... }
 * @param {*} opts - 可选对象参数
 *                   对象格式：{ threadsNumber?: number, abortOnFail?: boolean }
 *                   默认值：{ threadsNumber: 1, abortOnFail: true }
 *                   当配置了 threadsNumber 并使用了 http 请求，
 *                   此时最大可用线程数量取决于浏览器支持（通常为 5）；
 *                   上面的任何数字都不会产生额外增益
 * @returns Promise<Array<Object> | Object>
 *    With opts.abortOnFail set to true (which is default):
 *        When sequentialPromises param is Array:
 *          The Promise resolves with an Array of Objects of the following form:
 *             [ { key: number, status: 'fulfilled', value: any }, ... ]
 *          The Promise rejects with an Object of the following form:
 *             { key: number, status: 'rejected', reason: Error, resultAggregator: array }
 *        When sequentialPromises param is Object:
 *          The Promise resolves with an Object of the following form:
 *             { [key: string]: { key: string, status: 'fulfilled', value: any }, ... }
 *          The Promise rejects with an Object of the following form:
 *             { key: string, status: 'rejected', reason: Error, resultAggregator: object }
 *    With opts.abortOnFail set to false:
 *       The Promise is never rejected (no catch() needed)
 *       The Promise resolves with:
 *          An Array of Objects (when sequentialPromises param is also an Array) of the following form:
 *             [ { key: number, status: 'fulfilled', value: any } | { status: 'rejected', reason: Error }, ... ]
 *          An Object (when sequentialPromises param is also an Object) of the following form:
 *             { [key: string]: { key: string, status: 'fulfilled', value: any } | { key: string, status: 'rejected', reason: Error }, ... }
 */
```

注意：
* `sequentialPromises` 参数可以是一个函数数组（每个函数都返回一个 Promise）
* `sequentialPromises` 中的每个函数都可以接受一个 `resultAggregator` 参数，所以，您可以使用前面的 Promise 的结果来决定如何处理当前的 Promise；`resultAggregator` 中尚未完成的项目都会被标记为 `null`。
* `opts`  参数是可选的。

通用示例（使用数组作为 `sequentialPromises` 参数）：

```js
import { runSequentialPromises } from 'quasar'

runSequentialPromises([
  (resultAggregator) => new Promise((resolve, reject) => { /* do some work... */ }),
  (resultAggregator) => new Promise((resolve, reject) => { /* do some work... */ })
  // ...
]).then(resultAggregator => {
  // resultAggregator 的顺序与上方的 promises 相同
  console.log('第一个 Promise 的结果:', resultAggregator[0].value)
  console.log('第二个 Promise 的结果:', resultAggregator[1].value)
  // ...
}).catch(errResult => {
  console.error(`作业中遇到的错误 #${ errResult.key }:`)
  console.error(errResult.reason)
  console.log('获取此错误发生之前的结果:')
  console.log(errResult.resultAggregator)
})
```

通用示例（使用对象作为 `sequentialPromises` 参数）：

```js
import { runSequentialPromises } from 'quasar'

runSequentialPromises({
  phones: (resultAggregator) => new Promise((resolve, reject) => { /* do some work... */ }),
  laptops: (resultAggregator) => new Promise((resolve, reject) => { /* do some work... */ })
  // ...
}).then(resultAggregator => {
  console.log('第一个 Promise 的结果:', resultAggregator.phones.value)
  console.log('第二个 Promise 的结果:', resultAggregator.laptops.value)
  // ...
}).catch(errResult => {
  console.error(`作业中遇到的错误 (${ errResult.key}):`)
  console.error(errResult.reason)
  console.log('获取此错误发生之前的结果:')
  console.log(errResult.resultAggregator)
})
```

使用上一个结果的示例：

```js
import { runSequentialPromises } from 'quasar'

runSequentialPromises({
  phones: () => new Promise((resolve, reject) => { /* do some work... */ }),
  vendors: (resultAggregator) => {
    new Promise((resolve, reject) => {
      // 您可以在这里使用 resultAggregator.phones.value 做一些事情...
      // 由于默认设置了 abortOnFail，所以结果肯定是存在的
      // 所以您不需要考虑 resultAggregator.phones 为 "null" 的情况。
    })
  }
  // ...
})
```

使用 Axios 的示例：

```js
import { runSequentialPromises } from 'quasar'
import axios from 'axios'

const keyList = [ 'users', 'phones', 'laptops' ]

runSequentialPromises([
  () => axios.get('https://some-url.com/users'),
  () => axios.get('https://some-other-url.com/items/phones'),
  () => axios.get('https://some-other-url.com/items/laptops')
]).then(resultAggregator => {
  // resultAggregator 的顺序与上方的 promises 相同
  resultAggregator.forEach(result => {
    console.log(keyList[ result.key ], result.value) // example: users {...}
  })
}).catch(errResult => {
  console.error(`请求时发生了错误 ${ keyList[ errResult.key ] }:`)
  console.error(errResult.reason)
  console.log('获取此错误发生之前的结果:')
  console.log(errResult.resultAggregator)
})

// **等价于** 使用对象作为 sequentialPromises 参数：

runSequentialPromises({
  users: () => axios.get('https://some-url.com/users'),
  phones: () => axios.get('https://some-other-url.com/items/phones'),
  laptops: () => axios.get('https://some-other-url.com/items/laptops')
}).then(resultAggregator => {
  console.log('users:', resultAggregator.users.value)
  console.log('phones:', resultAggregator.phones.value)
  console.log('laptops:', resultAggregator.laptops.value)
}).catch(errResult => {
  console.error(`请求时发生了错误 ${ errResult.key }:`)
  console.error(errResult.reason)
  console.log('获取此错误发生之前的结果:')
  console.log(errResult.resultAggregator)
})
```

abortOnFail 设置为 `false` 的示例：
```js
import { runSequentialPromises } from 'quasar'
import axios from 'axios'

// 注意，没有 "catch()"，runSequentialPromises() 总是会 resolve
runSequentialPromises(
  {
    users: () => axios.get('https://some-url.com/users'),
    phones: () => axios.get('https://some-other-url.com/items/phones'),
    laptops: () => axios.get('https://some-other-url.com/items/laptops')
  },
  { abortOnFail: false }
).then(resultAggregator => {
  Object.values(resultAggregator).forEach(result => {
    if (result.status === 'rejected') {
      console.log(`请求失败${ result.key }:`, result.reason)
    }
    else {
      console.log(`请求成功 ${ result.key }:`, result.value)
    }
  })
})
```

 当配置了线程数量 (`opts > threadsNumber`) 并使用了 http 请求，此时最大可用线程数量取决于浏览器支持（通常为 5）；上面的任何数字都不会产生额外增益。

```js
import { runSequentialPromises } from 'quasar'

runSequentialPromises([ /* ... */ ], { threadsNumber: 3 })
  .then(resultAggregator => {
    resultAggregator.forEach(result => {
      console.log(result.value)
    })
  })
  .catch(errResult => {
    console.error(`发生错误:`)
    console.error(errResult.reason)
    console.log('获取此错误发生之前的结果:')
    console.log(errResult.resultAggregator)
  })
```

## 防抖

如果您的应用程序使用 JavaScript 来完成繁重的任务，那么防抖 (debounce) 函数是必不可少的，它可以确保给定的任务不会频繁地触发，从而影响浏览器性能。防抖函数会限制函数的触发速率。

防抖功能强制一个函数在经过一定时间后才再次被调用。例如: “执行一个函数前，确保此函数在过去的 100 毫秒内没有被调用过才会执行它”。

一个简单的示例：您有一个监听窗口大小变化的侦听器，他会重新计算一些元素的大小和位置。这本身并不是一个繁重的任务，但是在无数次调整大小之后重复触发您的侦听器会明显降低你的应用速度。那么为什么不限制函数的触发速率呢？


```js
// 返回一个函数，只要这个函数被连续调用，它就不会被执行
// 只有这个函数在停止调用的 N 毫秒后才可再次被执行
// 如果传入了 `immediate`，则在等待队列前沿触发函数，而不是在后面触发。
import { debounce } from 'quasar'

(Debounced Function) debounce(Function fn, Number milliseconds_to_wait, Boolean immediate)

// Example:
window.addEventListener(
  'resize',
  debounce(function() {
    // .... things to do ...
  }, 300 /*ms to wait*/)
)
```

或者在一个 .vue 中使用：

```js
methods: {
  myMethod () { .... }
},

created () {
  this.myMethod = debounce(this.myMethod, 500)
}
```

::: warning
通过类似 `myMethod: debounce(function () { // Code }, 500)` 这种方式来给一个方法（vue 中的 methods）添加防抖，意味着此组件中所有渲染实例访问此方法时获得的都是被防抖处理过的。此外，`this.myMethod.cancel()` 无法生效，因为 Vue 会给每个方法都再次封装一下，来确保 `this` 的正确绑定。应该避免使用上述风格的代码。
:::

Quasar 还提供了一个  `frameDebounce` 函数，可以延迟到下一个浏览器渲染帧时再调用您的函数（参考 `requestAnimationFrame`）。

```js
import { frameDebounce } from 'quasar'

(Debounced Function) frameDebounce(Function fn)

// 示例：
window.addEventListener(
  'resize',
  frameDebounce(function() {
    .... things to do ...
  })
)
```

## 节流
节流（throttle）会强制限制一段时间内可以调用函数的最大次数。如：“在 X 毫秒内最多只能执行此函数一次”。

```js
import { throttle } from 'quasar'

(Throttled Function) throttle(Function fn, Number limit_in_milliseconds)

// 示例：
window.addEventListener(
  'resize',
  throttle(function() {
    .... things to do ...
  }, 300 /* 每0.3s内最多只能执行一次 */)
)
```

或者在一个 .vue 文件中作为方法（vue 中的 methods）调用：

```js
methods: {
  myMethod () { .... }
},

created () {
  this.myMethod = throttle(this.myMethod, 500)
}
```

::: warning
通过类似 `myMethod: throttle(function () { // Code }, 500)` 这种方式来给一个方法（vue 中的 methods）添加节流，意味着此组件中所有渲染实例访问此方法时获得的都是被节流处理过的。应该避免使用上述风格的代码。
:::

## 继承 - 对象的深度克隆
`jQuery.extend()` 的一个基础复刻版本。接收以下参数：

```js
import { extend } from 'quasar'

let newObject = extend([Boolean deepCopy], targetObj, obj, ...)
```

当心对象中的方法。

## uid - 生成 UID
生成唯一标识符：

```js
import { uid } from 'quasar'

let uid = uid()
// 示例：501e7ae1-7e6f-b923-3e84-4e946bff31a8
```

## 在 DOM 事件处理器中处理事件
它是跨浏览器的。

```js
import { event } from 'quasar'

node.addEventListener('click', evt => {
  // 左键点击？
  (Boolean) event.leftClick(evt)

  // 中建点击？
  (Boolean) event.middleClick(evt)

  // 右键点击？
  (Boolean) event.rightClick(evt)

  // 数字格式的按键
  (Number) event.getEventKey(evt)

  // 鼠标滚动距离（单位像素）
  (Object {x, y}) event.getMouseWheelDistance(evt)

  // 视口中的位置
  // 兼容鼠标和触摸事件
  (Object {top, left}) event.position(evt)

  // 获取鼠标或触摸事件的触发对象
  (DOM Element) event.targetElement(evt)

  // 调用 stopPropagation 和 preventDefault
  event.stopAndPrevent(evt)
})
```
