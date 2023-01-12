---
title: 内部加载
desc: QInnerLoading组件是一个可以在组件内添加进度动画的vue组件。
keys: QInnerLoading
related:
  - /vue-components/linear-progress
  - /vue-components/circular-progress
  - /vue-components/spinners
  - /vue-components/skeleton
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QInnerLoading 组件可以给一个组件内部添加进度动画。与[加载插件](/quasar-plugins/loading)类似，它们的目的都是给用户传递信息：某个工作在后台运行，需要等待。QInnerLoading 会给目标元素添加一个不透明的覆盖层和一个[Spinner](/vue-components/spinners)组件。

## QInnerLoading API

<doc-api file="QInnerLoading" />

## 用法

::: warning
为了将加载器正确放置在要显示加载的元素的中央，该元素必须将 CSS 定位设置为 `relative`（或使用 `relative-position` CSS 类）。
:::

::: warning
QInnerLoading 必须是其父元素内部的最后一个元素，以便它可以显示在其他内容的顶部。
:::

### 基础

<doc-example title="基础" file="QInnerLoading/Basic" />

### 标签 <q-badge align="top" color="brand-primary" label="v2.2+" />

在使用默认槽时，您可以添加一个标签，但您也可以使用 "label" 属性代替：

<doc-example title="Label 属性" file="QInnerLoading/LabelProp" />
