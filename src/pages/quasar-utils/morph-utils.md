---
title: Morph Utils
desc: Morph one DOM element into another (with animation) or between two states of the same element using Quasar's morph util.
keys: morph
related:
  - /vue-directives/morph
---

Quasar 提供了一个形变工具函数，可以将一个 DOM 元素变形为另一个元素(形变过程带有动画)，或者同一个 DOM 元素在两个不同的状态之间形变。

也可以去看看[Morph 指令](/vue-directives/morph)，它在底层使用了 Morph 函数，但它使用起来更简单。

## 用法

```js
import { morph } from 'quasar'

// 将一个 dom 变形成另外一个：
const cancelMorph = morph({
  from: '#from-el',
  to: '#to-el'
})

// 可以调用 cancelMorph() 来取消变形
```

这个函数需要一个必填的对象参数，这个对象中可以有以下属性：

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| from | DOM | - | (**必填**) 一个 DOM 或者 CSS 选择器或者是一个返回了 DOM 的函数 |
| to | DOM | - | 类型于"form",若"to"没有填，那么它将等于"from" |
| onToggle() | Function | - | 一个同步切换函数，在保存初始元素状态后立即执行。使用一个函数来切换组件的状态。 |
| waitFor | Number/'transitioned'/Promise | 0 | 一个数字，'transitionend'字符串或者一个 Promise，他会延迟动画指定的毫秒数，或者等待目标 DOM 的'transitionend'事件被触发之后再开始变形，或者等待 promise 完成之后再开始变形（如果这个 Promise 失败了，那么这个变形会被中止，但是`toggle`函数已经被调用了）。 |
| duration | Number | 300 | 动画的持续时间，单位毫秒。 |
| easing | String | 'ease-in-out' | 动画采用的加速度函数（CSS easing 格式） |
| delay | Number | 0 | 动画延迟的毫秒数 |
| fill | String | 'none' | 动画的 fill 模式 |
| style | String/Object | - | 会被应用在变形后的元素上的额外的样式。（字符串或者 CSS 样式对象） |
| classes | String | - | 会被应用在变形后的元素上的额外的 CSS 类名。（字符串或者 CSS 样式对象） |
| resize | Boolean | *false* | 强制调整大小而不是默认的缩放转换 |
| useCSS | Boolean | *false* | 强制使用 CSS 而不是动画 API |
| hideFromClone | Boolean | *false* | 默认情况下，初始元素的克隆体用于填充删除后的空间——如果初始元素未被删除或不希望调整初始元素占用的空间大小，则设置此标志。|
| keepToClone | Boolean | *false* | 默认情况下，final 元素会从动画的最终位置移除-设置此标志以在最终位置保留一个副本 |
| tween | Boolean | *false* | 默认情况下，final 元素从初始元素的位置和角度变形为 final 元素的位置和角度-设置此标志以在初始元素和 final 元素之间使用不透明度渐变 |
| tweenFromOpacity | Number | 0.6 | 如果使用 **tween** 为初始元素设置初始透明度 it is the initial opacity of the initial element (will be animated to 0) -初始元素放置在目标元素的顶部 |
| tweenToOpacity | Number | 0.5 | 如果使用 **tween** 为目标元素设置初始透明度 it is the initial opacity of the destination element (will be animated to 1) |
| onEnd(direction, aborted) | Function | - | 一个在变形完成后会被调用的函数，它接受两个参数："direction"是一个字符串（如果变形在最终状态完成，则为“to”；如果变形在初始状态完成，则为“from”），aborted 是一个布尔值（true 代表动画中止了） |

## 形变的生命周期

1. 获取初始元素的形状和位置（如果提供了用于获取初始元素的函数，则将调用该函数）
1. 计算初始元素容器的大小和位置
1. 如果另一个变形正在使用相同的元素，则变形将被中止
1. 执行`onToggle()`函数（如果存在）
1. 重新计算初始元素的容器的大小和位置，以检查它们是否发生了变化
1. 在下一个 tick（允许 Vue 处理状态更改）中，将标识变形的最终状态的元素（如果提供了获取最终元素的函数，则将调用该函数）
1. 如果另一个变形正在使用相同的元素，则变形将被中止）
1. 计算最终形态元素的容器的大小和位置
1. 如果提供了一个 waitFor，请等待该毫秒数，或等待“transitionend”事件，或直到 Promise 得到解决（如果 Promise 被拒绝，则变形将中止）
1. 重新计算最终元素的容器的大小和位置，以检查它们是否已更改
1. 得到最终形态元素的形状和位置
1. 启动动画

* 如果在步骤 1 到 11 期间调用了`cancel`函数，则变形将中止（如果在步骤 4 之后取消，则仍会调用`toggle`函数），返回值将为 false。
* 如果在动画的开始和结束之间调用`cancel`函数，则动画将反转，返回值将为 true。
* 如果在动画结束后调用 cancel 函数，则不会发生任何事情，返回值将为 false。


## 示例

<doc-example title="对同一个元素变形" file="MorphUtils/SameElement" />

<doc-example title="从 QFabAction 变形为 QCard" file="MorphUtils/FabCard" />

<doc-example title="画廊" file="MorphUtils/ImageGallery" />

<doc-example title="水平的图片查看器 " file="MorphUtils/ImageStripHorizontal" />

<doc-example title="垂直的图片查看器 " file="MorphUtils/ImageStripVertical" />
