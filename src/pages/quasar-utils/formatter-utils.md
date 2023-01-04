---
title: 格式化工具
desc: Quasar 提供的一组用于格式化数据方法，大写转换、填充、标准化等。
keys: capitalize,humanStorageSize,between,normalizeToInterval,pad
---

### 帮助 Tree-Shake （树摇）
下面所有的示例都从 Quasar 中导入了 `format` 对象。然而，如果您只需要其中的一个函数，您可以使用 ES6 的解构来帮助更好的 Tree Shaking (树摇)，使其只留下一个函数，而不是全部的 `format`。

示例：
```js
// 我们先导入所有的 `format`
import { format } from 'quasar'
// 解构只留下我们需要的
const { capitalize, humanStorageSize } = format

console.log( capitalize('some text') )
// Some text
console.log( humanStorageSize(13087) )
// 12.8kB
```

您也可以像下面这样导入所有的格式化相关工具函数并随意使用（但是这样，您的构建产物中也会包含没有用到的函数）：
```js
import { format } from 'quasar'

console.log( format.capitalize('some text') )
console.log( format.humanStorageSize(13087) )
```

::: tip
有关构建 UMD 版本，请看[这里](/start/umd#quasar-global-object)。
:::

## 首字母大写
```js
import { format } from 'quasar'
const { capitalize } = format

console.log( capitalize('some text') )
// Some text
```

## 格式化为易读的单位
```js
import { format } from 'quasar'
const { humanStorageSize } = format

console.log( humanStorageSize(13087) )
// 12.8kB
```

## 标准化数字间隔

```js
import { format } from 'quasar'
const { between } = format

// (Number) between(Number, Number min, Number max)
console.log( between(50, 10, 20) )
// 20
```

```js
import { format } from 'quasar'
const { normalizeToInterval } = format

// (Number) normalizeToInterval(Number, Number lower_margin, Number upper_margin)

console.log( normalizeToInterval(21, 10, 20) ) // 10
console.log( normalizeToInterval(33, 10, 20) ) // 11
console.log( normalizeToInterval(52, 10, 20) ) // 19
console.log( normalizeToInterval(5, 10, 16) ) // 12
```

## 填充字符串
```js
import { format } from 'quasar'
const { pad } = format

// (String) pad(String toPad, Number length, String paddingCharacter)
// length 填充长度默认为 2
// paddingCharacter 填充的字符默认为 '0'
console.log( pad('2', 4) )
// '0002'
```
