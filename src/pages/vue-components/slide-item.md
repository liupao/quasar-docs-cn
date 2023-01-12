---
title: 滑动项
desc: QSlideItem 组件本质上是一个带有两个额外插槽的QItem，它允许用户通过鼠标或用手指将项目拖动到其中一侧，以便应用特定的操作。
keys: QSlideItem
related:
  - /vue-components/list-and-list-items
  - /vue-components/expansion-item
---

QSlideItem 组件本质上是一个带有两个额外插槽（`left` 和 `right`）的 [QItem](/vue-components/list-and-list-items)，它允许用户通过鼠标或用手指将项目拖动到其中一侧，以便应用特定的操作。

## QSlideItem API

<doc-api file="QSlideItem" />

## 用法

用鼠标或用手指左右滑动以查看 QSlideItem 的效果。

::: tip
如果您的内容带有图片，您可能需要给它们添加`draggable="false"`属性，否则浏览器的原生事件可能会起副作用。
:::

<doc-example title="基础" file="QSlideItem/Basic" />

<doc-example title="垂直的" file="QSlideItem/Vertical" />

<doc-example title="自定义颜色" file="QSlideItem/CustomColors" />

<doc-example title="滑动时自定义" file="QSlideItem/CustomizeSlide" />

<doc-example title="只有一边可滑或都不可滑" file="QSlideItem/OneSided" />
