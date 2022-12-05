---
title: 分栏
desc: QSplitter 是一个可以将容器通过一个可拖动的分割栏垂直或水平分开的 vue 组件。
keys: QSplitter
related:
  - /vue-components/expansion-item
  - /vue-components/slide-item
  - /vue-components/separator
---

QSplitter 组件可以将容器通过一个可拖动的分割栏垂直或水平分开。

## QSplitter API

<doc-api file="QSplitter" />

## 用法

::: warning
必须要使用 `before` 和 `after` 插槽。
:::

点击并拖拽分隔栏以查看效果。

### 基础

<doc-example title="基础" file="QSplitter/Basic" />

### 水平

<doc-example title="水平" file="QSplitter/Horizontal" />

### 自定义拖拽限制

<doc-example title="自定义拖拽限制 (50-100)" file="QSplitter/Limits" />

### 数据单位

默认的 CSS 单位是 '%' （百分比），但是您可以将其设置为 'px'（像素）,如下所示。

<doc-example title="像素单位" file="QSplitter/PixelModel" />

### 反向的 model 数据

默认情况下，model 数据表示 `before` 插槽的大小，但是您可以将其反转成 `after` 插槽的大小，如下所示。当您使用像素单位并且想控制 `after` 插槽的大小时很有用。

<doc-example title="反向的 model 数据" file="QSplitter/ReverseModel" />

### 给分割条添加内容

::: tip
如果您添加的内容中有用图像，那么最好为其添加 `draggable="false"` 否则浏览器的原生行为可能会产生负面影响。
:::

<doc-example title="给分割条添加内容" file="QSplitter/SeparatorSlot" />

### 黑色模式

<doc-example title="在黑色背景上自定义分割条" file="QSplitter/CustomizedSeparator" dark />

### 嵌套的

一个 QSplitter 也可以嵌套在另一个 QSplitter 的 `before` /`after` 插槽中，如下所示：

<doc-example title="嵌套的" file="QSplitter/Embedded" />

### 有趣的示例

<doc-example title="Image Fun" file="QSplitter/ImageFun" />

<doc-example title="响应式图片" file="QSplitter/ReactiveImages" />
