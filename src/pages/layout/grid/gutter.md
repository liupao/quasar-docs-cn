---
title: Grid Gutter
desc: How to use the Quasar grid for gutter spaces.
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/row
  - /layout/grid/column
  - /layout/grid/flex-playground
---

希望您以前已经阅读过 [Flexbox 介绍](/layout/grid/introduction-to-flexbox) 理论，让我们更深入地了解网络系统中的**Flex 槽**(Gutters)。

Gutter Quasar CSS 类提供了一种将元素(尤其是在 [网格行中](/layout/grid/row))彼此等距隔开的简便方法。

## 类型
根据不同的使用情况，gutter 主要有两种类型：`q-gutter-{size}` 和  `q-col-gutter-{size}`。 第一种类型是在用在彼此隔开的元素未使用 `col-*` 或 `offset-*` 类指定宽度时，否则使用后一种类型。

::: tip
后缀（`-none`、 `-xs`、 `-sm`、 `-md`、 `-lg`、 `-xl`）不是指设备屏幕尺寸，而是指元素之间的 gutter（间隔） 尺寸。
:::

## "q-gutter-{size}" 类

::: warning
`q-gutter-*` 类会给父元素添加**负 top 左 margin**，给子元素添加**正 top 左 margin**。 在与其他[间距类](/style/spacing)一起使用时，请考虑到这一点，以免破坏 gutter 的 css。
:::

当直接子元素没有使用 `col-*` 或 `offset-*` 类指定宽度时，使用这些类来添加间隔。

<doc-example title="q-gutter 的大小" file="grid/GutterSize" />

还有上面示例中未包括的 `q-gutter-none` 类（等同于：未应用 gutter）。

<doc-example title="只添加水平方向的间隔" file="grid/GutterHorizontal" />

<doc-example title="只添加垂直方向的间隔" file="grid/GutterVertical" />

<doc-example title="添加水平方向和垂直方向大小不同的间隔" file="grid/GutterMixed" />

## "q-col-gutter-{size}" 类

::: warning
`q-col-gutter-*` 类会给父元素添加**负 top 左 margin**，给子元素添加**正 top 左 margin**。 在与其他[间距类](/style/spacing)一起使用时，请考虑到这一点，以免破坏 gutter 的 css。

:::
当直接子元素使用了 `col-*` 或者 `offset-*` 类指定宽度时，使用这些类来添加间隔。

<doc-example title="q-col-gutter 的大小" file="grid/ColGutterSize" />

<doc-example title="只添加水平方向的间隔" file="grid/ColGutterHorizontal" />

<doc-example title="只添加垂直方向的间隔" file="grid/ColGutterVertical" />

<doc-example title="添加水平方向和垂直方向大小不同的间隔" file="grid/ColGutterMixed" />

## 对比分析 "q-gutter-{size}" 和 "q-col-gutter-{size}"

这两套类各有利弊。

::: warning
由于 `q-gutter-*` 和 `q-col-gutter-*` 类都对父元素应用了**负 top 左 margin**，因此您不应在父元素上应用针对 background、margin 或 border 相关属性的样式。

相反，您需要将它们包裹在容器中，在容器上应用样式，然后**在容器上**添加`overflow-auto` or `row`类
:::

<doc-example title="设置父元素样式" file="grid/ParentStyling" />

::: tip
`q-gutter-*` 类**不会改变**子元素的内部尺寸，因此您可以直接在子元素上使用`background` 或 `border`

:::

::: warning

`q-gutter-*` 类**会改变**子元素的外部尺寸，因此您不能再使用 `col-*` 或 `offset-*` 类来指定子元素的宽度。
:::

<doc-example title="子元素大小对比" file="grid/ChildrenSizeCompare" />
::: warning

因为 `q-col-gutter-*` 类对子元素应用 **负 top 左 margin** ，所以不应在子元素上应用针对 background、padding 或 border 相关属性的样式。 相反，您需要将样式元素放置在子元素中，然后对该元素应用样式。
:::

<doc-example title="设置子元素的样式" file="grid/ChildrenStyling" />

## Flex 演示 （Playground）
要查看 Flex 的实际效果，您可以使用 Flex 演示（Playground）进行交互学习。

<q-btn push color="brand-primary" icon-right="launch" label="Flex Playground" to="/layout/grid/flex-playground" />
