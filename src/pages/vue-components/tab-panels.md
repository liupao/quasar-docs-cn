---
title: 选项面板
desc: QTabPanel 是一个可以用较小的窗口展示更多的信息的 Vue 组件。
keys: QTabPanel,QTabPanels
related:
  - /vue-components/tabs
---

选项卡面板是一种使用较少的窗口显示更多信息的方法。

::: tip
可以很好的与 [QTabs](/vue-components/tabs) 组件配合使用，但不是必须的。
:::

## QTabPanels API

<doc-api file="QTabPanels" />

## QTabPanel API

<doc-api file="QTabPanel" />

## 用法

::: tip
* 可以很好的与 [QTabs](/vue-components/tabs) 组件配合使用，QTabs 提供了一种很棒的方法来选择展示哪个面板。
* 如果 QTabpanel 的内容包括图像，而且您还希望使用滑动操作去导航，那么您需要为其添加 `draggable="false"` 否则浏览器的原生行为可能会导致负面影响。
:::

::: warning 重要
不要被 "QTabPanels" 的名称带偏了，QTabPanels 和 QTabs 不是绑定的，他们都可以独立使用。
:::

::: danger Keep Alive
* 请注意 QTabPanels 中 Boolean 类型的 `keep-alive` 属性，如果您需要这个特性，不要使用 Vue 原生的 `<keep-alive>` 组件包裹 QTabPanel。
* 如果您需要使用 `keep-alive-include` 或 `keep-alive-exclude` 属性，那么 QTabPanel 的 `name` 属性必须是一个合法的 vue 组件名（没有空格，且不以数字开头）。
:::

### 基础

<doc-example title="基础" file="QTabPanels/Basic" />

### 搭配 QTabs

::: tip
QTabPanels 可以独立使用，他们不互相依赖，他们也可以放在页面的任何地方，不局限于 QTabs 附近。
:::

<doc-example title="搭配 QTabs" file="QTabPanels/WithQTabs" />

<doc-example title="一个更复杂的示例" file="QTabPanels/WithNestedQTabs" />

### 颜色

<doc-example title="颜色" file="QTabPanels/Coloring" />

### 使用垂直的 QTabs 和 QSplitter

<doc-example title="使用垂直的 QTabs 和 QSplitter" file="QTabs/Vertical" />


### 自定义过渡效果
关于完整的 transitions 列表，请 参考 [过渡效果](/options/transitions) 页面。

<doc-example title="自定义过渡效果示例" file="QTabPanels/Transition" />

### 可无限滑动的

在下面的示例中，使用您的鼠标来滑动面板，如果是在一个可触屏的设备上，请滑动您的手指。

<doc-example title="可无限滑动的" file="QTabPanels/Swipeable" />

### 可无限垂直滑动的

<doc-example title="可无限垂直滑动的" file="QTabPanels/VerticalSwipeable" />
