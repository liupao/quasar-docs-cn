---
title: 弹出代理
desc: 当您需要在较大的屏幕上显示QMenu，在较小的屏幕上显示QDialog时，您可以使用 QPopupProxy。
keys: QPopupProxy
related:
  - /vue-components/menu
  - /vue-components/dialog
  - /vue-directives/close-popup
---

当您需要在较大的屏幕上显示 [QMenu](/vue-components/menu)，在较小的屏幕上显示 [QDialog](/vue-components/dialog) 时，您可以使用 QPopupProxy。它充当一个代理，可在两个组件中挑选一个使用。Qpopupproxy 还可以处理上下文菜单。

## QPopupProxy API

<doc-api file="QPopupProxy" />

## 用法
::: tip
使用浏览器开发工具在移动设备或桌面设备之间切换（每次更改后都会刷新浏览器），或者在点击 QPopupProxy 组件的容器之前，调整浏览器窗口的大小，以观察 QPopupProxy 组件在 QMenu 或 QDialog 之间切换。默认断点设置为 450px。
:::

### 标准

<doc-example title="标准" file="QPopupProxy/Standard" />

### 上下文菜单

<doc-example title="上下文菜单（右键或者长按）" file="QPopupProxy/ContextMenu" />

### 断点

下面的实例中，点击输入框中的图标以查看效果。

<doc-example title="断点 @600px" file="QPopupProxy/Breakpoint" />

### 透传属性

请注意，[QMenu](/vue-components/menu) 和 [QDialog](/vue-components/dialog) 所有的属性都可以通过这个组件传递。所以类似 `offset` 或 `transition-show` 等属性也可以在 QPopupProxy 中使用。

<doc-example title="使用 QMenu 或 QDialog 的属性" file="QPopupProxy/Passthrough" />

::: warning
QPopupProxy 会特殊处理一些组件 ([QDate](/vue-components/date), [QTime](/vue-components/time), [QCarousel](/vue-components/carousel) 和 [QColor](/vue-components/color-picker))，会强制设置 `cover: true` 和 `maxHeight: '99vh'`，如果您不希望如此，那么请使用一个 `div` 作为 QPopupProxy 的直接子组件，包裹住上述组件。
:::
