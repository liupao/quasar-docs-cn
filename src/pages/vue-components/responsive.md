---
title: Responsive
desc: QResponsive是一个vue组件，它强制内容根据其宽度保持纵横比。
keys: QResponsive
---

QResponsive 组件会强制内容根据其宽度保持长宽比。

## QResponsive API

<doc-api file="QResponsive" />

## 用法

::: tip 提示
* 这个组件可以放置任何内容，只要**只指定一个直接子元素**即可。如果您有多个元素，可以使用一个 `<div>` 包裹起来。
* 您需要确保内容不会溢出容器。
:::

::: warning
不要将其用于已经具有 `ratio` 属性的 Quasar 组件，如 QImg 或 QVideo，或具有强制高度的组件。
:::

### 基础

<doc-example title="基础用法" file="QResponsive/Basic" />

### Flex row

注意，我们在下面的示例中使用了 `items-start` 来设置垂直对齐替换默认的 `stretch`，所以 flexbox 不会给 QResponsive 组件强制高度。

<doc-example title="基础用法" file="QResponsive/FlexRow" />

### 一些组件示例

下面只是一些例子。 QResponsive 不仅限于 QCard 和 QCarousel。

<doc-example title="QCard" file="QResponsive/Card" />

<doc-example title="QCardSection" file="QResponsive/CardSection" />

<doc-example title="QTable" file="QResponsive/Table" />

注意，当我们在 QCarousel 上使用 QResponsive 时，我们不会为它提供 `height` 属性，因为由 QResponsive 会负责。

<doc-example title="QCarousel" file="QResponsive/Carousel" />

### 最大高度

通过 CSS 类或内联样式设置的最大高度（或最大宽度等）将直接应用于 QResponsive 组件。请记住，您需要确保内容不会溢出容器。

<doc-example title="QCard" file="QResponsive/MaxHeight" />
