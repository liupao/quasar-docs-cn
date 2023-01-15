---
title: 菜单
desc: QMenu是一个方便展示菜单的Vue 组件。
keys: QMenu
related:
  - /vue-directives/close-popup
  - /options/transitions
  - /vue-components/popup-proxy
components:
  - menu/MenuPositioning
---

QMenu 组件可以很方便的展示一个菜单。它可以很好的与 [QList](/vue-components/list-and-list-items) 搭配使用，但不局限于此。

## QMenu API

<doc-api file="QMenu" />

## 用法

直接将 QMenu 放置在目标 DOM 元素/组件的直接子元素中。不用担心 QMenu 会从容器继承 CSS，因为 Quasar 会将 QMenu 直接注入到 `<body>` 下。

::: tip
如果您希望菜单可以自动关闭，不要忘记给可点击的菜单项加上 `v-close-popup` 指令。另外，也可以使用 QMenu 的 `auto-close` 属性，或者自行通过 v-model 来处理关闭操作。
:::

### 基础

<doc-example title="基础" file="QMenu/Basic" />

<doc-example title="自定义内容" file="QMenu/VariousContent" />

<doc-example title="通过 v-model 开关" file="QMenu/VModel" />

### Submenus

<doc-example title="嵌套菜单" file="QMenu/MenuInMenu" />

### 尺寸和样式

<doc-example title="尺寸" file="QMenu/Sizing" />

<doc-example title="样式" file="QMenu/Style" />

### 上下文菜单

您还可以将 QMenu 作为上下文菜单。在桌面设备上，您需要在父容器上单击鼠标右键来触发它，而在移动设备上，长按即可。

<doc-example title="上下文菜单" file="QMenu/ContextMenu" />

### 保持

如果您希望按下 ESCAPE 或点击 QMenu 外部时不要关闭菜单，那么请使用 `persistent` 属性。

<doc-example title="保持" file="QMenu/Persistent" />

### 过渡

在下面的示例中，展示了一些过渡效果。有关可用过渡的完整列表，请转到 [过渡效果](/options/transitions) 页面。

<doc-example title="过渡效果示例" file="QMenu/Transitions" />

### 可复用的

下面的示例展示了如何创建一个可在不同目标容器中复用的菜单。

<doc-example title="可复用的" file="QMenu/Target" />

### 定位

<doc-example title="定位示例" file="QMenu/Positions" />

通过 `anchor` 和 `self` 属性可以自定义 QMenu 弹出的位置。QMenu 最终的弹出位置是依据上述属性计算得来的，以便使其显示在可用的屏幕空间上，并在必要时切换到右侧或顶部。

对于水平定位，您可以使用 `start` 和 `end` 来自动适应 RTL 或 非 RTL。`start` 和 `end` 表示非 RTL 的 "left" ，表示 RTL 的 "right"。

<menu-positioning />
