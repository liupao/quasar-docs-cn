---
title: 类型检查工具 (<is>)
desc: Quasar 提供的一组用于检查类型的工具函数。
keys: is.deepEqual,is.object,is.date,is.regexp,is.number
badge: v2.8+
---

::: tip
关于 UMD 版本的用法请看[这里](/start/umd#quasar-global-object)
:::

## is.deepEqual

递归检查两个对象是否相等。也支持 Map，Set，ArrayBuffer，Regexp，Date 等等。

```js
import { is } from 'quasar'

const objA = { /* ... */ }
const objB = { /* ... */ }

console.log( is.deepEqual(objA，objB) ) // true or false
```

## is.object

```js
import { is } from 'quasar'

const obj = { some: 'value' }
console.log( is.object(obj) ) // true
```

## is.date

```js
import { is } from 'quasar'

const date = new Date()
console.log( is.date(date) ) // true

const now = Date.now()
console.log( is.date(now) ) // false
```

## is.regexp

```js
import { is } from 'quasar'

const pattern1 = /\w+/
console.log( is.regexp(pattern1) ) // true

const pattern2 = new RegExp('\\w+')
console.log( is.regexp(pattern2) ) // true
```

## is.number

```js
import { is } from 'quasar'

const myNumber = 80
console.log( is.number(myNumber) ) // true
```
