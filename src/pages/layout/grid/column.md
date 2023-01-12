---
title: 网格列
desc: 如何在 Quasar 中使用网格列。
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/row
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

希望您以前已经阅读过 [Flexbox 介绍](/layout/grid/introduction-to-flexbox) 理论，让我们更深入地了解网络系统中的 **Flex 列**(column)。

为父容器添加 `.column` 类后开启一个 Flex 列，为每个子元素添加一个 `.col-*` 类来瓜分父容器的高度，若每个子元素都使用不带数字的 `.col` 类则所有子元素都等高，它们会平分父容器的高度。（此段不属于官方文档，下面是英文原文）

Utilize breakpoint-specific row classes for equal-height rows. Add any number of unit-less classes for each breakpoint you need and every row will be the same height.（翻译不通）

## 等高 (Equal-height)

例如，以下是两个网格布局，它们适用于屏幕宽度在 xs 到 xl 之间的设备上。

<doc-example title="Equal Height Example" file="grid/ColumnEqualWidth" />

## 设置一行高度
Flexbox 网格行的自动布局还意味着您可以设置其中一行的高度，其他行的高度将自动调整。 您可以使用预定义的网格类（如下所示）或内联高度。 请注意，无论中间行的高度如何改变，其他行都会跟着调整大小。

<doc-example title="设置一行高度" file="grid/ColumnRowWidth" />

## 可变高度内容
使用 `col-{breakpoint}-auto` 类，行可以根据其内容的自然宽度调整自身大小。 这对于单行内容（如输入、数字等）非常方便（请参阅此页面上的最后一个示例）。 结合水平对齐类，这对于在视口宽度变化时行大小不均匀的居中布局非常有用。

<doc-example title="可变高度内容" file="grid/ColumnVariableWidth" />

## 响应式类

网格系统拥有五个预定义的断点类，用于构建复杂的响应式布局。它们分别对应超小型、小型、中型、大型和超大型屏幕设备。您可以使用它们在不同的设备上适配合适的列大小。

### 断点列表
对于从最小的设备到最大的设备都相同的网格，请使用 `.col` 和 `.col-*` 类。 需要特别大的列时，请为 col 类指定数字；否则，请坚持使用 `.col`。

<doc-example title="All breakpoints" file="grid/ColumnAllBreakpoints" />

### 混合匹配

不想让您的列简单地堆叠在某些网格层中吗？ 根据需要为每个层使用不同类的组合。 请参阅下面的示例，以更好地了解所有工作原理。

<doc-example title="Mix and match" file="grid/ColumnMixAndMatch" />

### 对齐

使用 flexbox 对齐工具可控制垂直和水平方向的对齐方式。

<doc-example title="水平对齐" file="grid/ColumnHorizontalAlignment" />

<doc-example title="垂直对齐" file="grid/ColumnVerticalAlignment" />

::: tip 提示
有一个更方便的 CSS 类： `flex-center` 。它等于`items-center` + `justify-center`。使用时需要搭配 `flex`， `row` 或者 `column`使用。
:::

### 换行
如果在一行中放置超过 12 列，则每组额外的列将作为一个单元换行到新行上。

<doc-example title="Wrapping" file="grid/ColumnRowWrapping" />

### 排序

<doc-example title="Reverse" file="grid/ColumnReverse" />

<doc-example title="Flex order" file="grid/ColumnFlexOrder" />

### 嵌套

要使用默认网格嵌套您的内容，请在现有的 `.col-sm-*` 列中添加一个新的 `.row` 和一组 `.col-sm-*` 列。 嵌套行应包括一组总计不超过 12 个或更少的列（不需要全部使用 12 个可用列）。

<doc-example title="Nesting" file="grid/ColumnNesting" />

## Flex 演示 （Playground）
要查看 Flex 的实际效果，您可以使用 Flex 演示（Playground）进行交互学习。


<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
