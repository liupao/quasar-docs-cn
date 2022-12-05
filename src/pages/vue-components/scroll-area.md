---
title: 滚动区域
desc: QScrollArea是一个提供了定制滚动条的简便方法的vue组件。
keys: QScrollArea
related:
  - /layout/drawer
---

QScrollArea 组件提供了一种通过封装内容来定制滚动条的简便方法。可以将它视为一个设置了 `overflow: auto` 的 DOM 元素，并且定制了滚动条样式以及还拥有一些其他的很棒的特性。

## QScrollArea API

<doc-api file="QScrollArea" />

## 用法

最好在桌面设备上查看以下示例，因为它们在移动设备上意义不大。

::: tip
您还可以查看[布局抽屉菜单](/layout/drawer)页面以了解更多的实用示例。
:::

### 基础

<doc-example title="垂直内容" file="QScrollArea/Vertical" />

<doc-example title="水平内容" file="QScrollArea/Horizontal" />

<doc-example title="垂直和水平" file="QScrollArea/VertHoriz" />

### 样式

<doc-example title="自定义滚动条" file="QScrollArea/StyledBar" />

<doc-example title="自定义滚动条" file="QScrollArea/Styled" />

### 黑色模式

<doc-example title="黑色模式" file="QScrollArea/Dark" />

###  控制滚动条的可见性

当使用 `visible` 属性时，默认的鼠标悬浮行为会被禁用，您可以完全控制滚动条的可见性。

<doc-example title="控制滚动条的可见性" file="QScrollArea/ScrollbarVisibility" />

### 延迟

当内容发生变化时，滚动条会出现，然后再次消失。您可以在滚动条再次消失之前设置一定的延迟（以毫秒为单位的时间量）（如果组件没有悬停）：

<doc-example title="延迟" file="QScrollArea/Delay" />

### 滚动位置

<doc-example title="滚动位置" file="QScrollArea/ScrollPosition" />

### 滚动事件

下面示例使用 `@scroll` 事件来同步两边内容的滚动。

<doc-example title="同步滚动" file="QScrollArea/Synchronized" />
