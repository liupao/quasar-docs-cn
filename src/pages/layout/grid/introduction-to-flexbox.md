---
title: Flexbox 介绍
desc: 什么是 flexbox CSS，如何将其应用到 Quasar 中
related:
  - /style/spacing
  - /style/visibility
  - /layout/grid/column
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---
在 [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 的帮助下，Quasasr 提供了大量的 CSS 辅助类来帮您构建页面。可以将其想象成在页面中使用行和列的方式来布局。

Quasar 提供的 Flex CSS 类基于 CSS 的 Flexbox 模块，此模块旨在提供一种更方便的方式来对一个容器中的元素进行布局，对齐以及分配各个元素之间的空间，即使不指定它们的大小，或者大小是动态的。（这也是 flex 这个名字的来源）

::: tip
本页只涵盖了 Quasar Flex CSS 类的基本理论，并为您准备了更深入学习的页面:[Grid Row](/layout/grid/row)、[Grid Column](/layout/grid/column) 和 [Grid Gutter](/layout/grid/gutter)。
:::

## 核心概念

Quasar Flex CSS 类可以用在父容器和子元素中，父容器叫做 container，子元素叫做 items。如下图父容器是外层背景为黑色的部分，子元素是内部三个蓝色的部分。

![Flexbox Container](https://cdn.quasar.dev/img/flexbox-container.svg)
![Flexbox Items](https://cdn.quasar.dev/img/flexbox-items.svg)

## 管理父元素
### 设置方向

父容器必须选择下列 CSS 类之一，以便开启 Flex 布局，后续部分中 CSS 才能在子元素上生效。

![Flexbox Direction](https://cdn.quasar.dev/img/flexbox-direction.svg)

| CSS 类名 | 描述 |
| --- | --- |
| `row` |  开启 Flex 并将主轴方向设置为水平方向 Flex row |
| `row inline` | 内联的 Flex 行 Inline Flex row |
| `column` | 开启 Flex 并将主轴方向设置为垂直方向 Flex column |
| `column inline` | 内联的 Flex 列 Inline Flex column |
| `row reverse` | 开启 Flex 并将 `flex-direction` 设置为 `row-reverse` |
| `column reverse` | 开启 Flex 并将 `flex-direction` 设置为 `column-reverse` |

示例:
```html
<div class="row">
  <div>First column</div>
  <div>Second column</div>
  <div>Third column</div>
</div>
```

### 默认换行
默认情况下，所有的行和列都会在内容超出大小后将其折行：

![Flexbox Direction](https://cdn.quasar.dev/img/flexbox-wrap.svg)

然而如果您不希望这个换行行为，您想所有的内容在一行内自适应大小，那么您可以使用 `no-wrap` CSS 类。

当然还有一个 `reverse-wrap` 类可以使得内容的顺序反转。

| 类名 | 描述 |
| --- | --- |
| `wrap` | 必要时换行（默认值，不必显示声明） |
| `no-wrap` | 任何情况下都不换行 |
| `reverse-wrap` | 必要情况下换行并反转 |

### 对齐

使用下面的 CSS 类来设置**主轴上对齐**方式（下图是主轴为横轴时的示例）。
当一行中的子元素都不是 flex 元素或是 flex 元素但已达到其最大尺寸时，它有助于分配剩下的自由空间。当子元素溢出时，它也对元素的排列起到一定的控制作用。

![Flexbox Justify Content](https://cdn.quasar.dev/img/flexbox-main-axis-align---2.svg)

使用下面的 CSS 类来设置**垂直于主轴的方向上的对齐**方式（下图是主轴为横轴时的示例）。
它们定义了 flex 容器中的子元素在垂直于主轴的方向上如何对齐。可以将其视为横轴（垂直于主轴）的水平版本

![Flexbox Items Align](https://cdn.quasar.dev/img/flexbox-cross-axis-align.svg)

::: tip 提示
有一个更方便的 CSS 类： `flex-center` 。它等于`items-center` + `justify-center`。使用时需要搭配 `flex`， `row` 或者 `column`使用。
:::

接下来的类在横轴上有额外的空间时对齐 flex 容器的线，类似于单个元素在水平方向上在主轴上的对齐方式。

![Flexbox Content Align](https://cdn.quasar.dev/img/flexbox-content-align.svg)

## 管理子元素

### 分配大小
Quasar 使用的栅格系统将一行分为 12 份，以此来分配子元素的大小，以下是可用的 CSS 辅助类的一些示例：

```html
<div class="row">
  <div class="col-8">two thirds</div>
  <div class="col-2">one sixth</div>
  <div class="col-auto">auto size based on content and available space</div>
  <div class="col">fills remaining available space</div>
</div>
```
在上面的例子中，由于 8/12 = 2/3 = 66％，`col-8` 占据了行宽的三分之二（2/3），而 `col-2` 占据了六分之一（2/12 = 1 / 6〜16.67％）。

使用 `col-auto` 会使单元格只填充需要渲染的空间。相反的，`col` 会试图填充所有可用的空间，同时如果需要也可以缩小。


`col-grow` 使单元格至少填充需要渲染的空间，并有可能在有更多空间可用时增长。

`col-shrink` 使单元格最多填充需要呈现的空间，并且当没有足够的可用空间时有可能收缩。

示例：

```html
<div class="row">
  <div class="col">1</div>
  <div class="col">1</div>
  <div class="col">1</div>
    <!--
     我们有 3 个子元素，所以以上示例相当于
     对每个每个子元素使用`col-4`
  -->
</div>

<div class="row">
  <div class="col-3">1</div>
  <div class="col-6">2</div>
  <div class="col-3">1</div>
</div>
```
![Flexbox Grow](https://cdn.quasar.dev/img/flexbox-grow.svg)

也有 CSS 辅助类可以实现偏移一个单元格。 例如：`offset-4` 表示偏移三分之一空间（4/12 = 1/3 = 33％）。

### 折行
折行是理解 Flexx CSS 类的关键特性。不一定要每行都精确的使用 12 份，可以使用更少或更多。

这使得您可以在较小的屏幕上垂直动态堆叠行，并在大屏幕上的单行上显示它们。 阅读“响应式设计”部分。


```html
<div class="row">
  <div class="col-2">...</div>

    <!-- 2 + 6 < 12, 所以下一个元素放在同一行上 -->
  <div class="col-6">...</div>

   <!-- 2 + 6 + 10 > 12, 所以下一个元素换行到下一行 -->
  <div class="col-10">...</div>

  <!--
    10 + 3 > 12, 所以下一个元素换行到下一行。
     请注意，我们只考虑当前行
     （只有 col-10，因为它被包裹到自己的行）。
  -->
  <div class="col-3">...</div>
</div>
```

> 请注意，felx 元素默认是可换行的。 如果您想禁用这个特性，使用 `no-wrap`CSS 辅助类。

### 自对齐

**子元素可以覆写父元素设置的对齐方式**。允许对单个 Flex 子元素进行对齐。 请参阅“管理父元素”中的“对齐”说明以了解可用值(`self-start`, `self-center`, `self-baseline`, `self-end`, `self-stretch`)。

![Flexbox Self](https://cdn.quasar.dev/img/flexbox-self.svg)

### 顺序

您可以使用 `order-first` 和 `order-last` CSS 辅助类来**设置子元素的顺序**。

默认情况下，Flex 项按源(source)顺序排列。 但是，order 属性可以控制它们在 Flex 容器中的显示顺序。 如果您需要更细粒度的控制，请使用 `order` CSS 属性并分配所需的值。

示例：

```html
<div class="row">
  <div style="order: 2">Second column</div>
  <div class="order-last">Third column</div>
  <div class="order-first">First column</div>
</div>
```
以下是 CSS `order` 属性的工作原理：

![Flexbox Order](https://cdn.quasar.dev/img/flexbox-order.svg)

## 响应式设计

Quasar Flex CSS 辅助类可以根据屏幕宽度进行响应式应用，以帮助您制作响应式用户界面。 12 分网格系统受 Bootstrap 的启发，因此有很多相似之处。

我们到目前为止学到的是，例如，我们可以调整列的大小，而不管窗口的宽度。 如果我们要创建一个响应 UI，我们需要动态改变大小，同时考虑窗口的宽度。首先，让我们学习一些可以在 `col-*`, `offset-*` 和 `col-auto`  辅助类中注入的断点标记（查看下表中的标记）。


| 断点 | 最大宽口宽度 | 描述/何时会应用 |
| --- | --- | --- |
| `xs` | 599px | 特小尺寸窗口 |
| `sm` | 1023px | 小尺寸窗口 |
| `md` | 1439px | 中尺寸窗口 |
| `lg` | 1919px | 大尺寸窗口 |
| `xl` | Infinite | 特大尺寸窗口 |

例如: `col-md-7`, `offset-lg-3`, `col-xs-auto`.

一个完整的例子：假设我们有三个子元素的行。在特小窗口中，我们需要垂直叠放子元素。在小窗口中我们需要并排显示它们的（每个子元素都有相同的宽度），并且从中等窗口开始，我们将它们全部显示在同一行上：

```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
</div>
```

在上面的例子中请注意我们使用了 `col-xs-12`（12/12 = 100％的行，所以每个子元素都会占用容器的全部宽度，使得所有的子元素垂直堆叠，因为行默认是会换行内容）、`col-sm-6` （6/12 = 50％的行）和 `col-md-4`（4/12 = 33％的行）。

像前面提到的那样，行默认会换行内容，因此当一行使用 12 个（或更多）网格点时，内容将被会换行到下一行。 如果我们有两个`<div>`并且我们都使用 `col-8`，它们也会堆叠，因为 8 + 8 = 16，我们只能在一行上显示 12 个份。

```html
<div class="row">
 <!--
     加一起超过 12 个网格点，
     所以第二个<div>将换行到下一行
  -->
  <div class="col-8">col</div>
  <div class="col-8">col</div>
</div>
```

另外查阅[可见性](/style/visibility#window-width-related)风格页面查看窗口宽度和这些标记（xs、sm、md、lg、xl）的阈值以隐藏或显示 DOM 元素。

## Flex 插件（Addons）

启用后（通过`quasar.config.js > framework > cssAddon: true`），它将为所有与 Flex（和显示）相关的 CSS 类提供断点感知版本。

::: warning
请注意，启用后，CSS 占用的代码体积将明显增加。 因此，只有在请确保您确实需要时才这样做。
:::

```
.flex-<bp>-(block|inline)
.(row|column|flex)-<bp>(|-inline-<bp>)
.reverse-<bp>
.(wrap|no-wrap|reverse-wrap)-<bp>
.order-<bp>-(first|last|none)
.justify-<bp>-(start|end|center|between|around|evenly)
.items-<bp>-(start|end|center|baseline|stretch)
.content-<bp>-(start|end|center|between|around)
.self-<bp>-(start|end|center|baseline|stretch)
.flex-<bp>-center
.q-gutter-<bp>(|-x|-y)-(xs|sm|md|lg|xl)
.(col|offset)-<bp>-(|0..12)
```

还有间距的响应类，包括内边距(padding)和外边距(margin)：

```
.q-(p|m)(t|r|b|l|a|x|y)-<bp>-(none|auto|xs|sm|md|lg|xl)
```

例如：`row-md`, `items-lg-end`, `q-pa-xs q-pa-sm-sm q-px-md-lg q-py-md-md`

## Flex 演示（Playground）
要查看 Flex 的实际效果，您可以使用 Flex 演示(Playground)进行交互了解更多信息。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
