---
title: Card
desc: QCard 是一个很棒的用于展示重要信息的 Vue 组件，它可以将信息聚合在卡片容器中展示，帮助用户更直观的获取信息。
keys: QCard
related:
  - /vue-components/separator
---

使用 QCard 组件来把重要的信息分组展示，这种模式已经成为各种网站和应用程序的主流设计，不仅能把信息展示得清晰条理，而且还很美观，不会让您的页面看上去很死板。

为了在有限的屏幕尺寸上展示足够多的信息，卡片式的设计风格已经成为谷歌，推特等各大公司的首选设计模式。

Qcard 组件很轻巧，它实际上是一个容器元素，您可以使用 QCard 组件来包裹任何元素，使其具有卡片式的设计感。

## QCard API
<doc-api file="QCard" />

## QCardSection API
<doc-api file="QCardSection" />

## QCardActions API
<doc-api file="QCardActions" />

## 用法

::: tip
您可以在卡片中使用[排版](/style/typography)来创造精美的卡片。
:::

### 基础
<doc-example title="基础卡片" file="QCard/Basic" />

### 带有操作控件
<doc-example title="带有操作控件的卡片" file="QCard/Actions" />

可以通过 `align` 属性来自定义操作控件的对齐方式

<doc-example title="对齐操作控件" file="QCard/ActionsAlignment" />

### 媒体内容
<doc-example title="展示媒体内容的卡片" file="QCard/Media" />

<doc-example title="展示视频的卡片" file="QCard/Video" />

<doc-example title="展示视差的卡片" file="QCard/Parallax" />

### 水平

在下面的示例中，注意一个外层的带 `horizontal` 属性的 QCardSection 组件包裹了另外的 QCardSection。另外您可以直接把 `col-*` css 类添加到子 QCardSection 组件的 class 中来控制大小。

如果需要在带有 horizontal 属性的 QCardSections 组件中展示图片，更推荐您使用 QImg 组件而不是原生的 `<img>` 标签

<doc-example title="基础水平卡片" file="QCard/HorizontalBasic" />

<doc-example title="更复杂的示例" file="QCard/HorizontalMoreInvolved" />

### 多样的内容
<doc-example title="多样的内容" file="QCard/VariousContent" />

<doc-example title="表格" file="QCard/Table" />

<doc-example title="选项卡" file="QCard/Tabs" />

### 可展开的

下面的示例可以点击最右边的按钮来展开操作面板
<doc-example title="Expandable" file="QCard/Expandable" />
