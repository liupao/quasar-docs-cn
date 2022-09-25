---
title: Layout QPageSticky
desc: How to use the QPageSticky component. Statically place components on the layout without overlapping with header/footer/sidebars.
keys: QPageSticky
related:
  - /layout/layout
  - /layout/page
---

QPageSticky 组件有助于将由它包裹的 DOM 元素/组件放置到 QPage 内容区域中的静态位置，无论用户在哪里滚动。

这样做的最大优点是，由该组件包装的元素永远不会与布局页眉、页脚或抽屉重叠，即使这些元素没有配置为固定。在后一种情况下，位置将偏移，因此不会发生重叠。例如，尝试使用非固定页脚。当用户到达屏幕底部并看到页脚时，组件将向上移动，这样它就不会与页脚重叠。

## QPageSticky API
<doc-api file="QPageSticky" />

## 用法
::: tip
由于 QPageSticky 需要布局，并且默认情况下 QLayout 会管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayouts。 但是请记住，这不代表您也需要将容器化的 QLayouts 用于 QPageSticky。
:::

::: warning
* 为了使 QPageSticky 工作，必须将其放置在 QLayout 组件中。
* QPageSticky 必须是其父级中的最后一个子元素，以便它可以显示在其他内容的顶部
:::

### 基础

在下面的示例中，单击菜单按钮以显示/隐藏抽屉菜单、滚动内页并调整浏览器窗口的大小，以使封闭的 QLayout 达到抽屉菜单的 700px 和 500px 断点。


<doc-example title="基础" file="QPageSticky/Basic" />

### 扩展

在下面的示例中，单击菜单按钮以显示/隐藏抽屉菜单、滚动内页并调整浏览器窗口的大小，以使封闭的 QLayout 达到抽屉菜单的 700px 和 500px 断点。


通过使用扩展的 QPageSticky，例如，您可以具有特定于页面的 QToolbar，如下所示。

<doc-example title="扩展" file="QPageSticky/Expanded" />
