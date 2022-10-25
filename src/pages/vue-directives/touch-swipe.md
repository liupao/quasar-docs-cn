---
title: Touch Swipe Directive
desc: 当用户用手指或鼠标在组件或元素上滑动时触发一个事件的 Vue 指令。
keys: touch-swipe
related:
  - /vue-directives/touch-repeat
  - /vue-directives/touch-pan
  - /vue-directives/touch-hold
---


类星体提供了功能齐全的 Vue 指令，可以完全取代像`Hammerjs`这样的库:`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`，甚至`v-touch-repeat`。

> **这些指令不仅可以处理鼠标事件，还可以处理触摸事件**，所以你可以用它们在你的 App 中完成一些很酷的事情。

下面我们将讲述`v-touch-swipe`指令

当用户用手指或鼠标在组件或元素上滑动时触发一个事件的 Vue 指令。

## TouchSwipe API

<doc-api file="TouchSwipe" />

## 用法
在下面的示例区域中，滑动鼠标/滑动手指以查看页面变化，如果使用鼠标，则需要快速操作。

::: tip
如果你的内容带有图片，你可能需要给它们添加`draggable="false"`属性，否则浏览器的原生事件可能会起副作用。
:::

<doc-example title="任意方向" file="TouchSwipe/Basic" />

<doc-example title="只有一个方向" file="TouchSwipe/Right" />

<doc-example title="多个方向" file="TouchSwipe/UpOrLeft" />

### 处理鼠标事件
当你想处理鼠标事件时，使用`mouse`修饰符：

```html
<div v-touch-swipe.mouse="userHasSwiped">...</div>
```

### Inhibiting TouchSwipe
你可以通过阻止内部元素`touchstart`/`mousedown`事件的冒泡行为来抑制 TouchSwipe 事件：

```html
<div v-touch-swipe.mouse="userSwiped">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop>
    <!--
      TouchSwipe 事件不会应用到这里， 因为我们
      在 touchstart 和 mousedown 事件上
      调用了 stopPropagation()
    -->
  </div>
  <!-- ...content -->
</div>
```

然而，若你使用`capture` 或者 `mouseCapture`修饰符，则事件会先到达 TouchPan 指令，然后才是内部元素，所以 TouchPan 事件仍然会被触发。

## 注意热更新相关
由于性能的原因，不是所有的修饰符都是 reactive 的，有一些需要刷新页面才能更新，请在 API 卡片中检查的哪些修饰符不具备 reactive

