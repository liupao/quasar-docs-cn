---
title: 时间线
desc: QTimeline Vue 组件按时间顺序显示事件列表。它通常是一个图形设计，显示一个长条形图，在其旁边标注日期，通常是事件
keys: QTimeline,QTimelineEntry
---
QTimeline 组件按时间顺序显示事件列表。它通常是一个图形设计，显示一个长条形图，在其旁边标注日期，通常是事件。时间线可以使用任何时间尺度，具体取决于主题和数据。

QTimeline 有 3 种布局：

* `dense` (默认) 在时间线的**时间线指定侧**（默认是右侧）显示头部，标题，和内容。
* `comfortable` 在时间线的**时间线指定侧**（默认是右侧）显示头部，标题，副标题和内容，在另一侧显示副标题。
* `loose` 在中间显示头部，**在条目指定侧**（默认在右侧）显示标题和内容，在另一侧显示副标题。

## QTimeline API
<doc-api file="QTimeline" />

## QTimelineEntry API
<doc-api file="QTimelineEntry" />

## 用法

### 基础

<doc-example title="基础" file="QTimeline/Basic" scrollable />

### 仅使用 props

下面是一个同样的示例，但是仅使用了 QTimelineEntry 的属性代替了默认插槽。

<doc-example title="仅使用 props" file="QTimeline/PropsOnly" scrollable />

### 仅使用插槽

下面是一个同样的示例，但是仅使用了 QTimelineEntry 的插槽。

<doc-example title="仅使用插槽" file="QTimeline/SlotsOnly" scrollable />

### 在黑色的背景上

<doc-example title="在黑色的背景上" file="QTimeline/Dark" dark scrollable />

### 布局和侧面区域

::: warning
如果 QTimeline 使用了 `loose`，QTimelineEntry 的 `side` 属性不会生效。
:::

<doc-example title="布局和侧面区域" file="QTimeline/Layouts" scrollable />

### 响应式

::: tip
下面的示例使用了 `$q.screen` 来检测窗口的大小，改变窗口的大小以查看所有 3 个布局。
:::

<doc-example title="响应式布局" file="QTimeline/Responsive" scrollable />
