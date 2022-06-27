---
title: Touch Pan Directive
desc: Vue directive which triggers an event when the user drags the finger or mouse on a component or element.
keys: touch-pan
related:
  - /vue-directives/touch-swipe
  - /vue-directives/touch-repeat
  - /vue-directives/touch-hold
---

类星体提供了功能齐全的Vue指令，可以完全取代像`Hammerjs`这样的库:`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`，甚至`v-touch-repeat`。

> **这些指令不仅可以处理鼠标事件，还可以处理触摸事件**，所以你可以用它们在你的App中完成一些很酷的事情。

下面我们将讲述`v-touch-pan`指令

## TouchPan API

<doc-api file="TouchPan" />

## 用法
在下面的示例区域中，点击后往一个方向平移，然后查看页面的变化。在有触摸功能的设备上，上下平移时，页面滚动会被禁用。

::: tip
如果你的内容带有图片，你可能需要给它们添加`draggable="false"`属性，否则浏览器的原生事件可能会起副作用。
:::

<doc-example title="任意方向" file="TouchPan/Basic" />

平移可以运行于鼠标和触摸事件。也可以指定平移的方向。例如只捕获水平方向的平移。

注意，在有触摸功能的设备上，滚动不会被自动阻止，因为我们只是水平平移。


<doc-example title="水平方向" file="TouchPan/Horizontal" />

下面的示例只捕获垂直方向的平移，页面滚动会被禁用，但是你希望的话，也可以选择不禁用。

<doc-example title="垂直方向" file="TouchPan/Vertical" />
下面的示例演示如何使用`up`, `down`, `left`, `right`这四个修饰符来捕获自定义方向的平移。

页面滚动会被自动禁用，但是你希望的话，也可以选择不禁用。


<doc-example title="Custom directions" file="TouchPan/Custom" />

### 处理鼠标事件
当你想处理鼠标事件时，使用`mouse`修饰符：

```html
<!--
  指令也会被鼠标操作触发
-->
<div v-touch-pan.mouse="userHasPanned">...</div>
```

### 禁用页面滚动 (在有触摸功能的设备上)
默认情况请下，这个指令不会阻止页面的滚动，但是你希望阻止页面滚动的话，使用 `prevent`修饰符。

```html
<div v-touch-pan.prevent="userHasPanned">...</div>
```

### Inhibiting TouchPan
你可以通过阻止内部元素`touchstart`/`mousedown`事件的冒泡行为来抑制TouchPan事件：

```html
<div v-touch-pan.mouse="userHasHold">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop>
    <!--
      TouchPan事件不会应用到这里， 因为我们
      在touchstart 和 mousedown 事件上
      调用了stopPropagation()
    -->
  </div>
  <!-- ...content -->
</div>
```
然而，若你使用`capture` 或者 `mouseCapture`修饰符，则事件会先到达TouchPan指令，然后才是内部元素，所以TouchPan事件仍然会被触发。

## FAB示例

下面是一个使用QFab的优秀示例，你可以拖拽它穿出屏幕。

<doc-example title="Draggable" file="QFab/Draggable" />

## 注意热更新相关
由于性能的原因，不是所有的修饰符都是reactive的，有一些需要刷新页面才能更新，请在API卡片中检查的哪些修饰符不具备reactive
