---
title: 滚动工具
desc: Quasar 提供的一组与滚动有关的工具函数，例如获取滚动容器或者和改变一个元素或者页面的滚动位置。
keys: getScrollTarget,getVerticalScrollPosition,setVerticalScrollPosition,getHorizontalScrollPosition,setHorizontalScrollPosition,getScrollHeight,getScrollWidth,getScrollbarWidth
---

::: tip
关于 UMD 版本的用法请看[这里](/start/umd#quasar-global-object)
:::

## 确定滚动容器

也许值得一读这是怎么做到的，请点击[这里](/vue-components/scroll-observer#determining-scrolling-container)。

```js
import { scroll } from 'quasar'
const { getScrollTarget } = scroll

// 获取处理页面滚动的父 DOM 节点
// 通常会是一个带有 ".layout-view" class 类的元素或 "window"
getScrollTarget(DomElement)
// 返回一个 DOM 元素或者 window 对象
```

此方法会查找一个带有 `scroll` 或 `overflow-auto` 类名的父节点。如果没有找到，则认为滚动附加在 document 本身。

请注意，如果元素没有产生溢出（例如：CSS `overflow: hidden`，或者高度不够），那么简单的附加 `scroll` 也不会有任何效果。

一个好的容器示例：

```html
<!--
  Quasar CSS helper 'overflow-hidden' is
  equivalent to style="overflow: hidden"
-->
<div class="scroll overflow-hidden" style="height: 100px">
  ...content expanding over the 100px height from container...
</div>
```

## 获取/设置滚动位置
垂直方向的：

```js
import { scroll } from 'quasar'
const { getVerticalScrollPosition, setVerticalScrollPosition } = scroll

// 获取一个元素/页面的滚动位置
// 将它与 `getScrollTarget()` 结合使用
getVerticalScrollPosition(scrollTargetDomElement)
// 返回一个数字（单位像素）

// 设置一个元素/页面的滚动位置：
setVerticalScrollPosition (scrollTargetElement, offset[, duration])
// 如果声明了 "duration"，则滚动时会带有动画效果
```

水平方向的:

```js
import { scroll } from 'quasar'
const { getHorizontalScrollPosition, setHorizontalScrollPosition } = scroll

// 获取一个元素/页面的滚动位置
// 将它与 `getScrollTarget()` 结合使用
getHorizontalScrollPosition(scrollTargetDomElement)
// 返回一个数字（单位像素）

// 设置一个元素/页面的滚动位置：
setHorizontalScrollPosition (scrollTargetElement, offset[, duration])
// 如果声明了 "duration"，则滚动时会带有动画效果
```

### 滚动到某个元素

下面是一个滚动到其容器中的某个元素的示例。它不考虑容器是否在屏幕上或更复杂的情况。

```js
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition } = scroll

// 获取一个元素对象
function scrollToElement (el) {
  const target = getScrollTarget(el)
  const offset = el.offsetTop
  const duration = 1000
  setVerticalScrollPosition(target, offset, duration)
}
```

## 确定滚动大小

垂直方向的：

```js
import { scroll } from 'quasar'
const { getScrollHeight } = scroll

// 获取滚动容器的内部高度 (inner height)
getScrollHeight(scrollTargetDomElement)
// 返回一个数字

console.log( getScrollHeight(el) )
// 824 (单位像素)
```

水平方向的:

```js
import { scroll } from 'quasar'
const { getScrollWidth } = scroll

// 获取滚动容器的内部高度 (inner height)
getScrollWidth(scrollTargetDomElement)
// 返回一个数字

console.log( getScrollWidth(el) )
// 824 (单位像素)
```

## 确定滚动条的宽度
计算滚动条的宽度，单位像素。

```js
import { scroll } from 'quasar'
const { getScrollbarWidth } = scroll

console.log(getScrollbarWidth())
// 16 (单位像素)
```
