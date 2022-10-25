---
title: 长按指令
desc: 当用户触摸或者长按一个元素/组件时触发一个事件的 Vue 指令。
keys: touch-hold
related:
  - /vue-directives/touch-swipe
  - /vue-directives/touch-repeat
  - /vue-directives/touch-pan
---
类星体提供了功能齐全的 Vue 指令，可以完全取代像`Hammerjs`这样的库:`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`，甚至`v-touch-repeat`。

> **这些指令不仅可以处理鼠标事件，还可以处理触摸事件**，所以你可以用它们在你的 App 中完成一些很酷的事情。

下面我们将讲述`v-touch-hold`指令

## TouchHold API

<doc-api file="TouchHold" />

## 用法

<doc-example title="Basic" file="TouchHold/Basic" />

默认的长按等待时间为 600ms，但是你可以配置它：

<doc-example title="自定义长按等待时间" file="TouchHold/CustomTimer" />

::: tip
TouchHold 对触摸事件的默认灵敏度为 5px，对鼠标事件的默认灵敏度为 7px，这意味着它允许手指或鼠标在不中断的情况下轻微移动，改善了用户体验。
:::
但是，你也可以改变这个灵敏度(注意下面示例中的指令参数- `600:12:15` - 600ms 等待时间，触摸事件 12px 灵敏度，鼠标事件 15px 灵敏度)

<doc-example title="自定义灵敏度" file="TouchHold/CustomSensitivity" />

### 处理鼠标事件
如果你也想处理鼠标事件，请使用鼠标修饰符：

```html
<div v-touch-hold.mouse="userHasHold">...</div>
```

### Inhibiting TouchHold

你可以通过阻止内部元素`touchstart`/`mousedown`事件的冒泡行为来抑制长按事件。

```html
<div v-touch-hold.mouse="userHasHold">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop>
    <!--
      长按事件不会应用到这里， 因为我们
      在 touchstart 和 mousedown 事件上
      调用了 stopPropagation()
    -->
  </div>
  <!-- ...content -->
</div>
```
然而，若你使用`capture` 或者 `mouseCapture`修饰符，则事件会先到达 TouchHold 指令，然后才是内部元素，所以 TouchHold 事件仍然会被触发。

## 注意热更新相关
由于性能的原因，不是所有的修饰符都是 reactive 的，有一些需要刷新页面才能更新，请在 API 卡片中检查的哪些修饰符不具备 reactive
