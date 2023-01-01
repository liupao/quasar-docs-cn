---
title: DOM 工具函数
desc: Quasar 提供了一组用于 DOM 元素的工具函数，可帮助您检查屏幕视口上的偏移量，获取和设置样式，等待 DOM 就绪并变形 DOM 元素。
keys: offset,style,height,width,css,ready
---

### 帮助 Tree-Shake （树摇）
您会发现下面所有的示例都从 Quasar 中导入了不同的内容。然而，如果您只需要某个特殊的函数，您可以使用 ES6 的解构语法来帮助更好的 Tree-Shake （树摇），使最后的构建产物中只嵌入该函数，而不是全部内容。

以 `dom` 为例：

```js
import { dom } from 'quasar'
const { offset } = dom

// Offset on screen
console.log(offset(DomElement))
// { top: 10, left: 100 }
```
您也可以像下面这样导入所有的 dom 工具函数并随意使用（但是这样，您的构建产物中也会包含没有用到的函数）：
```js
import { dom } from 'quasar'

// Offset on screen
console.log(dom.offset(DomElement))
// { top: 10, left: 100 }
```

::: tip
有关构建 UMD 版本，请看[这里](/start/umd#quasar-global-object)。
:::

## 屏幕视口上的偏移量
```js
import { dom } from 'quasar'
const { offset } = dom

// Offset on screen
console.log(offset(DomElement))
// { top: 10, left: 100 }
```

## 获取计算后的样式
这仅在 DOM 元素可见时适用！它返回浏览器**计算出**的样式，所以您查询到的属性不一定是通过 `style` 属性设置的。

```js
import { dom } from 'quasar'
const { style } = dom

// 获取浏览器计算后的样式（当 DOM 元素可见时！）
// “计算后”意味着一个 DOM 元素可能没有被设置 "height" CSS 属性
// 但是但它被显示时还是存在一个高度
// 下面的示例获取浏览器提供的计算后的 CSS：
console.log(style(DomElement, 'height'))
// '10px' <<< 注意返回的字符串以 'px' 结尾
```

## 获取高/宽
```js
import { dom } from 'quasar'
const { height, width } = dom

// 此函数是上面函数的一个封装，以更方便的获取 "width" 和 "height"
// 返回数字代替字符串:
console.log(
  height(DomElement),
  width(DomElement)
)
// 10 100
```

## 批量引用 CSS 属性
```js
import { dom } from 'quasar'
const { css } = dom

// 给 DOM 元素应用一组 CSS 属性：
css(DomElement, {
  height: '10px',
  display: 'flex'
})
```

## 当 DOM 准备好时执行
```js
import { dom } from 'quasar'
const { ready } = dom

// 当 DOM 准备好时执行一个函数：
ready(function () {
  // ....
})
```
