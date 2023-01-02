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
| duration | Number | 300 | The duration in milliseconds for the animation |
| easing | String | 'ease-in-out' | The timing function for the animation (CSS easing format) |
| delay | Number | 0 | The delay in milliseconds for the animation |
| fill | String | 'none' | The fill mode for the animation |
| style | String/Object | - | The extra style to be applied to the morphing element while it is animated (either as string or a CSSStyleDeclaration object) |
| classes | String | - | The extra classes to be applied to the morphing element while it is animated (as string) |
| resize | Boolean | *false* | Force resizing instead of the default scaling transformation |
| useCSS | Boolean | *false* | Force use of CSS instead of the Animation API |
| hideFromClone | Boolean | *false* | By default a clone of the initial element is used to fill the space after the element is removed - set this flag if the initial element is not removed or resizing of the space occupied by the initial element is not desired |
| keepToClone | Boolean | *false* | By default the final element is removed from it's final position to be animated - set this flag to keep a copy in the final position |
| tween | Boolean | *false* | By default the final element is morphed from the position and aspect of the initial element to the ones of the final element - set this flag to use an opacity tween between the initial and final elements |
| tweenFromOpacity | Number | 0.6 | If using **tween** it is the initial opacity of the initial element (will be animated to 0) - the initial element is placed on top of the destination element |
| tweenToOpacity | Number | 0.5 | If using **tween** it is the initial opacity of the destination element (will be animated to 1) |
| onEnd(direction, aborted) | Function | - | A function that will be called once the morphing is finalized - receives two params: "direction" is a string ('to' if the morphing was finished in the final state or 'from' if it was finished in the initial state) and "aborted" is a boolean (true means that the animation was aborted) |

## Morphing lifecycle

1. Get the aspect and position of the initial element (if a function is provided for getting the initial element it will be called)
2. Calculate the size and position of the container of the initial element
3. If another morphing was using the same element that morphing will be aborted
4. Execute the onToggle() function (if present)
5. Recalculate the size and position of the container of the initial element to check if they are changed
6. In the next tick (to allow Vue to process the state changes) the final element will be identified (if a function is provided for getting the final element it will be called)
7. If another morphing was using the same element that morphing will be aborted
8. Calculate the size and position of the container of the final element
9. If a **waitFor** is provided, wait that number of milliseconds, for a 'transitionend' event or until the promise is resolved (if the promise is rejected then the morphing is aborted)
10. Recalculate the size and position of the container of the final element to check if they are changed
11. Get the aspect and position of the final element
12. Start the animation

Regarding the cancel() function (the return value of a call to morph()):
* If the `cancel` function that was returned is called during steps 1 to 11 then the morphing will be aborted (the `toggle function` will still be called if the cancel comes after step 4) and the returned value will be **false**.
* If the `cancel` function is called between the start and end of the animation then the animation will be reversed and the returned value will be **true**.
* If the `cancel` function is called after the end of the animation nothing will happen and the returned value will be **false**.

## Examples

<doc-example title="Morphing the same element" file="MorphUtils/SameElement" />

<doc-example title="Morphing a QCard from a QFabAction" file="MorphUtils/FabCard" />

<doc-example title="Image gallery " file="MorphUtils/ImageGallery" />

<doc-example title="Horizontal image strip " file="MorphUtils/ImageStripHorizontal" />

<doc-example title="Vertical image strip " file="MorphUtils/ImageStripVertical" />
