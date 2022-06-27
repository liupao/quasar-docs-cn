---
title: Touch Repeat Directive
desc:  Vue指令，当用户触摸并按住一个组件或元素时，在指定的时间间隔内触发一个事件。
related:
  - /vue-directives/touch-swipe
  - /vue-directives/touch-pan
  - /vue-directives/touch-hold
keys: touch-repeat
---

类星体提供了功能齐全的Vue指令，可以完全取代像`Hammerjs`这样的库:`v-touch-pan`, `v-touch-swipe`, `v-touch-hold`，甚至`v-touch-repeat`。

> **这些指令不仅可以处理鼠标事件，还可以处理触摸事件**，所以你可以用它们在你的App中完成一些很酷的事情。

下面我们将讲述`v-touch-repeat`指令

Vue指令，当用户触摸并按住一个组件或元素时，在指定的时间间隔内触发一个事件。

## TouchRepeat API

<doc-api file="TouchRepeat" />

## 用法

在下面的区域中，点击鼠标/点击屏幕后按住，然后查看页面的变化，注意，在有触摸功能的设备上，页面滚动会被禁用。

> 默认的重复模式是0:600:300(毫秒)。

<doc-example title="基础" file="TouchRepeat/Basic" />

下面的示例中，配置了也对`SPACE`, `ENTER` 和 `h` 按键做出反应（请先关注此处），使用 0:300:200 (ms) 重复模式。热键，点击/触摸，然后保持住。

<doc-example title="自定义按键" file="TouchRepeat/Keys" />

下面的示例中，将TouchRepeat应用在了QBtn上，注意指令的参数是如何使得蓝色的按钮加速慢于红色按钮的。

<doc-example title="在QBtn上使用" file="TouchRepeat/Buttons" />

### 处理鼠标事件
当你想处理鼠标事件时，使用`mouse`修饰符：

```html
<div v-touch-repeat.mouse="myHandler">...</div>
```

### 处理按键事件
当你也想处理按键事件时，使用 [keycodes](https://keycode.info/) 作为修饰符:

```html
<div v-touch-repeat.65.70="myHandler">...</div>
```
对于按键，也有一些特殊的修饰符，可使用直观的字符串代替等效的keycode: `space`, `tab`, `enter`。

### Inhibiting TouchRepeat
你可以通过阻止内部元素`touchstart`/`mousedown`/`keydown`事件的冒泡行为来抑制TouchRepeat事件：

```html
<div v-touch-repeat.mouse.enter="userHasHold">
  <!-- ...content -->
  <div @touchstart.stop @mousedown.stop @keydown.stop>
    <!--
      TouchRepeat事件不会应用到这里， 因为我们
      在touchstart，keydomn 和 mousedown 事件上
      调用了stopPropagation()
    -->
  </div>
  <!-- ...content -->
</div>
```
然而，若你使用`capture`，`keyCapture` 或者 `mouseCapture`修饰符，则事件会先到达TouchRepeat指令，然后才是内部元素，所以TouchRepeat事件仍然会被触发。

## 注意热更新相关
由于性能的原因，不是所有的修饰符都是reactive的，有一些需要刷新页面才能更新，请在API卡片中检查的哪些修饰符不具备reactive。
