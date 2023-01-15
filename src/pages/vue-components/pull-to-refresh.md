---
title: 下拉刷新
desc: QPullToRefresh是一个可以让用户下拉屏幕以刷新页面或检索最新内容的Vue 组件。
keys: QPullToRefresh
related:
  - /vue-components/infinite-scroll
  - /vue-components/intersection
  - /vue-components/icon
---

QPullToRefresh 组件可以让用户下拉屏幕以刷新页面（或检索最新内容）。

## QPullToRefresh API

<doc-api file="QPullToRefresh" />

## 用法

### 基础

::: warning
当您在 `@refresh` 函数中完成更多数据的加载后，请不要忘记调用参数中的 `done()`。
:::

在下面的示例窗口中下拉（当滚动的内容处于最顶部时）以查看效果。

<doc-example title="基础" file="QPullToRefresh/Basic" />

### 自定义图标

<doc-example title="自定义图标" file="QPullToRefresh/Icon" />

### 自定义颜色

<doc-example title="自定义颜色" file="QPullToRefresh/CustomColoring" />

## 提示

::: tip 滚动容器
关于 Quasar 如何决定滚动事件附加的目标容器，请阅读[这里](/vue-components/scroll-observer#/vue-components/scroll-observer#确定滚动的容器)。
:::

* 如果在使用一个 QLayout，那么推荐您将 QPullToRefresh 作为 QPage 的直接子元素，并将页面内容包裹在其中。
* 如果您修改了此组件的父元素，请不要忘记通过 Vue 引用调用 QPullToRefresh 的 `updateScrollTarget()` 函数。
* QPullToRefresh 也支持文本选择，如果您的内容也包括图像，那么您最好为它们添加 `draggable="false"` 属性，否则，浏览器的原生行为可能产生负面影响。
