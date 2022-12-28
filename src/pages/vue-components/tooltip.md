---
title: 悬浮提示
desc: QTooltip Vue 组件用于向用户提供有关应用程序中某个区域的更多信息。当鼠标悬停在目标元素上时(或者在移动平台上快速点击并保持) ，工具提示就会出现。
keys: QTooltip
related:
  - /vue-components/menu
components:
  - tooltip/TooltipPositioning
---

QTooltip 组件用于向用户提供有关应用程序中某个区域的更多信息。当鼠标悬停在目标元素上时(或者在移动平台上快速点击并保持) ，工具提示就会出现。

## QTooltip API

<doc-api file="QTooltip" />

## 用法
直接将 QTooltip 放置在目标 DOM 元素/组件中，作为其直接子级。不要担心 QTooltip 内容从容器继承 CSS，因为 QTooltips 将会通过 Quasar Portal 被注入为 `<body>` 的直接子级。

<doc-example title="基础" file="QTooltip/Basic" />

<doc-example title="通过 v-model 切换" file="QTooltip/VModel" />

### 自定义

<doc-example title="自定义" file="QTooltip/Coloring" />

<doc-example title="自定义延时 (1 秒)" file="QTooltip/OneSecond" />

<doc-example title="带偏移" file="QTooltip/Offset" />

### 过渡效果

下面的示例只显示了部分的过渡效果，完整的列表请参考[过渡效果](/options/transitions)页面。

<doc-example title="自定义过渡效果" file="QTooltip/CustomTransition" />

### 可复用的

下面的例子展示了如何创建可以与不同目标共享的可复用的菜单。

<doc-example title="使用 target 属性" file="QTooltip/Target" />

### 定位

通过 `anchor` 和 `self` 属性可自定义 QTooltip 出现的位置。 QTooltip 弹出窗口的最终位置是通过计算得出的，以便它将显示在可用的屏幕上，必要时会切换到右侧和/或顶部。

关于水平方向上的定位，如果您希望其自动适应 RTL 或 non-RTL，您可以使用 `start` 和 `end`。`start` 和 `end` 在 non-RTL 中表示“左”，在 RTL 中表示“右”。

<tooltip-positioning />
