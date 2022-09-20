---
title: 网格行
desc: 如何在Quasar中使用网格行。
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/column
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

希望您以前已经阅读过 [Flexbox介绍](/layout/grid/introduction-to-flexbox) 理论，让我们更深入地了解网络系统中的**Flex行**(Rows)。


将特定于断点的列类用于等宽列。为所需的每个断点添加任意数量的无单元类，每列的宽度将相同。

Utilize breakpoint-specific column classes for equal-width columns. Add any number of unit-less classes for each breakpoint you need and every column will be the same width.（翻译不出来）

## 等宽

例如，以下是两个网格布局，它们适用于屏幕宽度在 xs 到 xl 之间的设备上。

<doc-example title="等宽示例" file="grid/RowEqualWidth" />

## 设置一列的宽度

Flexbox网格列的自动布局还意味着您可以设置其中一列的宽度，其他列的宽度将自动调整。 您可以使用预定义的网格类（如下所示）或内联宽度。 请注意，无论中间列的宽度如何改变，其他列都会跟着调整大小。

<doc-example title="设置一列的宽度" file="grid/RowColumnWidth" />

## 可变的宽度内容

使用 `col-{breakpoint}-auto` 类，列可以根据其内容的自然宽度调整自身大小。 这对于单行内容（如输入、数字等）非常方便（请参阅此页面上的最后一个示例）。 结合水平对齐类，这对于在视口宽度变化时列大小不均匀的居中布局非常有用。

<doc-example title="可变的宽度内容" file="grid/RowVariableWidth" />

## 响应式类

网格系统拥有五个预定义的断点类，用于构建复杂的响应式布局。它们分别对应超小型、小型、中型、大型和超大型屏幕设备。你可以使用它们在不同的设备上适配合适的列大小。

### 断点列表

对于从最小的设备到最大的设备都相同的网格，请使用 `.col` 和 `.col-*` 类。 需要特别大的列时，请为 col 类指定数字；否则，请坚持使用 `.col`。

<doc-example title="断点列表" file="grid/RowAllBreakpoints" />

### 堆叠到水平
将 `.col-12` 和 `.col-md-*` 搭配结合使用，可以创建一个基础的网格系统，该系统在小型设备上会垂直堆叠布局，在桌面（中型）设备上变为水平布局。

<doc-example title="Stacked to horizontal" file="grid/RowStackedToHorizontal" />

### 混合匹配

不想让您的列简单地堆叠在某些网格层中吗？ 根据需要为每个层使用不同类的组合。 请参阅下面的示例，以更好地了解所有工作原理。

<doc-example title="Mix and match" file="grid/RowMixAndMatch" />

### 对齐

使用 flexbox 对齐工具可控制垂直和水平方向的对齐方式。

<doc-example title="垂直对齐" file="grid/RowVerticalAlignment" />

<doc-example title="水平对齐" file="grid/RowHorizontalAlignment" />

::: tip 提示
有一个更方便的 CSS 类： `flex-center` 。它等于`items-center` + `justify-center`。使用时需要搭配 `flex`， `row` 或者 `column`使用。
:::

### 列换行
如果在一行中放置超过12列，则每组额外的列将作为一个单元换行到新行上。

<doc-example title="列换行" file="grid/RowColumnWrapping" />

### 排序

<doc-example title="Reverse" file="grid/RowReverse" />

<doc-example title="Flex order" file="grid/RowFlexOrder" />

### 列偏移
使用`.offset-md-*` 类将列向右移动。 这些类通过 `*` 列增加一列的左边距。 例如， `.offset-md-4`  将 `.col-md-4` 移到四列后。

<doc-example title="Offsetting columns" file="grid/RowOffsettingColumns" />

### 嵌套

要使用默认网格嵌套您的内容，请在现有的 `.col-sm-*` 列中添加一个新的 `.row` 和一组 `.col-sm-*` 列。 嵌套行应包括一组总计不超过12个或更少的列（不需要全部使用12个可用列）。

<doc-example title="Nesting" file="grid/RowNesting" />

## Flex 演示 （Playground）
要查看Flex的实际效果，您可以使用Flex演示（Playground）进行交互学习。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
