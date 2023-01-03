---
title: DOM 变形工具
desc: Quasar 提供了一组 DOM 变形工具，可以将一个 DOM 元素变形成另一个（带有动画效果），或者同一个 DOM 元素在两个状态之间变形。
keys: morph
related:
  - /vue-directives/morph
---
Quasar 提供了一组 DOM 变形工具，可以将一个 DOM 元素变形成另一个（带有动画效果），或者同一个 DOM 元素在两个状态之间变形。

您还可以看看 Quasar 基于此工具封装的[变形指令](/vue-directives/morph)，它使用起来更加简单。

## 基础用法

```js
import { morph } from 'quasar'

// 将一个 DOM 元素变形成另一个：
const cancelMorph = morph({
  from: '#from-el',
  to: '#to-el'
})

// 调用 cancelMorph() 可以取消变形
```

该函数接受一个必传的对象参数，它有以下字段：

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| from | DOM | - | (**必填项**) 一个 DOM 或者 CSS 选择器或者一个返回 DOM 的函数 |
| to | DOM | - |  与 "from" 一样；如果缺少 "to"，则假设它与 "from" 相同。 |
| onToggle() | Function | - | 保存初始元素状态后立即执行的同步切换函数。使用一个函数来切换组件的状态，以便目标元素可用。 |
| waitFor | Number/'transitioned'/Promise | 0 | 一个数字，'transitionend' 或者一个 Promise - 它将会延迟动画的开始，指定的数字毫秒，或者等到一个 'transitionend' 事件被触发，或者等待一个 Promise 成功结束，如果 Promise 失败了，则变形过程会被中断，但此时 `toggle function` 已经被调用了。 |
| duration | Number | 300 | 动画的持续时间，单位毫秒。 |
| easing | String | 'ease-in-out' | 动画的加速度函数（CSS easing 格式）|
| delay | Number | 0 | 动画的延时时间，单位毫秒。 |
| fill | String | 'none' | 动画的填充模式。 |
| style | String/Object | - | 给动画时的变形 DOM 元素额外添加的样式（一个字符串，或者 CSS 样式定义对象）。|
| classes | String | - | 给动画时的变形 DOM 元素额外添加的 CSS 类名（一个字符串） |
| resize | Boolean | *false* | 强制改变大小代替默认的缩放变换。 |
| useCSS | Boolean | *false* | 强制使用 CSS 代替   Animation API。 |
| hideFromClone | Boolean | *false* | 默认情况下，会使用初始元素的克隆体来填充元素被删除的地方 - 如果未删除初始元素或不希望调整初始元素占用的空间大小，请设置此标志。 |
| keepToClone | Boolean | *false* | 默认情况下，最终元素将从其最终位置中删除以进行动画 - 设置此标志会使一个副本保持在最终位置上。|
| tween | Boolen | *false* | 默认情况下，由初始元素的形状和位置变形成最终元素的形状和位置 - 设置此标志会在初始元素和最终元素之间使用一个不透明度。 |
| tweenFromOpacity | Number | 0.6 | 如果设置了 **tween**，这将会是初始元素的初始不透明度(会随着动画变成 0) - 初始元素放在目标元素的顶部。 |
| tweenToOpacity | Number | 0.5 | 如果设置了 **tween**，这将会是目标元素的初始不透明度(会随着动画变成 1)。 |
| onEnd(direction, aborted) | Function | - | 变形完成后将调用的函数 - 接受两个参数： "direction" 是一个字符串(如果值为 'to' 则表示变形结束在最终状态，'from' 表示变形结束在初始状态)，"aborted" 是一个布尔值 (true 表示动画已经被中断了)。 |

## 变形的生命周期

1. 获取初始元素的形状和位置（如果提供了获取初始元素的函数，那么它将被调用）。
2. 计算初始元素的容器的大小和位置
3. 如果另一个变形也使用同一个元素，则变形将会被中止。
4. 执行 onToggle() 函数（如果有的话）。
5. 重新计算初始元素的容器的大小和位置来检查它是否发生了变化。
6. 在下一次 DOM 更新后（让 Vue 处理状态变化），最终元素将会被确认（如果提供了获取最终元素的函数，那么它将会调用）。
7. 如果另一个变形也使用同一个元素，则变形将会被中止。
8. 计算最终元素的容器的大小和位置。
9. 如果提供了 **waitFor**，那么将等待指定的毫秒数，或者等待一个 'transitionend' 事件被触发，或者等待一个 Primose 成功结束（如果 Promise 失败，则变形中止）。
10. 重新计算最终元素的容器的大小和位置来检查它是否发生了变
11. 获取最终元素的形状和位置。
12. 开始动画。

关于 `cancel()` 函数（调用 `morph()` 函数的返回值）：
* 如果在步骤 1 至 11 期间调用了 `cancel` 函数，则变形将被中止（如果在步骤 4 之后取消，则仍会调用 `toggle function`），并且返回的值将为 **false**。
* 如果在动画的开始和结束之间调用 `cancel` 函数，则动画将反转，返回的值将为 **true**。
* 如果在动画结束后调用 `cancel` 函数，则不会发生任何事情，返回的值将为 **false**。

## 示例

<doc-example title="同一个元素的变形" file="MorphUtils/SameElement" />

<doc-example title="从 QCard 变形为 QFabAction" file="MorphUtils/FabCard" />

<doc-example title="图片查看器" file="MorphUtils/ImageGallery" />

<doc-example title="水平的图片查看器" file="MorphUtils/ImageStripHorizontal" />

<doc-example title="垂直的图片查看器" file="MorphUtils/ImageStripVertical" />
