---
title: 关闭弹层 Close Popup Directive
desc: Helper Vue directive when working with QDialog or QMenu.
keys: close-popup
related:
  - /vue-components/dialog
  - /vue-components/menu
---

这是一个与[QDialog（对话框/弹窗）](/vue-components/dialog) 和 [QMenu（菜单）](/vue-components/menu)组件搭配使用的指令。当一个 DOM/组件绑定了 v-close-popup 指令后，触发其点击/触摸事件时会关闭其父组件上弹出的 QDialog 或 QMenu。

## ClosePopup API

<doc-api file="ClosePopup" />

## 用法

### 基础

<doc-example title="与 QMenu 配合" file="ClosePopup/Menu" />

<doc-example title="与 QDialog 配合" file="ClosePopup/Dialog" />

### 设置关闭多层级

您也可以通过为指令绑定一个数字的方式设置所关闭的弹窗的层级：

```html
<... v-close-popup="3">
```

* 若绑定的值是 0 或  `false` 则表示禁用此指令
* 若绑定的值小于 0 则它会关闭此 DOM 链上的所有弹层
* 若绑定的值是 1 或 `true` 或 undefined 则它只会关闭父主组件上的弹层
* 若绑定的值是 大于 1，则表示它会精确的关闭此 DOM 链上对应层级的弹层 (注意链式的 QMenus 的层级始终被视为 1)

注意下方的链式 QMenus 示例，它不需要精确的指定层级，当`v-close-popup`作用到多层级链式的 QMenus 会将其全部关闭。

<doc-example title="Menu tree" file="ClosePopup/MenuTree" />

在下面的示例中，菜单上绑定的 v-close-popup="2"，其值为 2，所以点击关闭菜单时也会关闭 dialog

<doc-example title="Dialog with menu" file="ClosePopup/DialogMenu" />

注意一下示例中，可以打开一个多层级的 dialog，当 v-close-popup 指令的值设置为 2 的时候可以同时关闭两个 dialog

<doc-example title="Dialog in Dialog" file="ClosePopup/DialogInDialog" />

### 视频讲解
若仍有疑惑，请观看[视频讲解](https://www.bilibili.com/video/BV1vA4y1d7qr)
