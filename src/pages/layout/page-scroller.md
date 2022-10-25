---
title: Layout QPageScroller
desc: 如何使用 QPageScroller 组件。将用户滚动后屏幕上出现的组件放置在屏幕上。
keys: QPageScroller
related:
  - /layout/layout
  - /layout/page
---

QPageScroller 组件有助于将 DOM 元素/它包裹的组件放置在 QPage 内容区域内的静态位置，无论用户在何处滚动。

这样做的最大优点是，由该组件包装的元素永远不会与布局页眉、页脚或抽屉重叠，即使这些元素没有配置为固定。在后一种情况下，位置将偏移，因此不会发生重叠。例如，尝试使用非固定页脚。当用户到达屏幕底部并看到页脚时，组件将向上移动，这样它就不会与页脚重叠。

本质上，QPageScroller 与 QPageSticky 非常相似。 QPageSticky 组件始终可见，而 QPageScroller 组件仅在达到 `scroll-offset`（属性）之后出现。 一旦可见，用户可以单击它，通过 `duration` 属性快速返回页面顶部。

## QPageScroller API
<doc-api file="QPageScroller" />

## 用法
::: tip
由于 QPageScroller 需要布局，并且默认情况下 QLayout 会管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayouts。 但是请记住，这不代表您也需要将容器化的 QLayouts 用于 QPageScroller。
:::

::: warning
* 为了使 QPageScroller 起作用，必须将其放置在 QLayout 组件内。
* QPageScroller 必须是其父级中的最后一个子元素，以便它可以显示在其他内容的顶部
:::

### 基础

<doc-example title="基础" file="QPageScroller/Basic" />

### 扩展

<doc-example title="扩展" file="QPageScroller/Expanded" />

### Reverse

<doc-example title="Reverse" file="QPageScroller/Reverse" />
