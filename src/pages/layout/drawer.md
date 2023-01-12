---
title: 布局抽屉
desc: 如何使用 QDrawer 组件。Quasar 的侧边栏。
keys: QDrawer
related:
  - /layout/layout
  - /vue-components/list-and-list-items
---

QLayout 允许您将视图配置为一个 3x3 矩阵，其中包含可选的页眉/页脚（主要用于导航栏，但也可以是别的任何东西）。如果尚未准备好，请先阅读  [QLayout](/layout/layout) 文档页面。

QDrawer 是 QLayout 的侧边栏部分。

## QDrawer API
<doc-api file="QDrawer" />

## 布局生成器
点击下面的按钮来搭建您的布局。

<q-btn push color="brand-primary" icon-right="launch" label="布局生成器" href="/layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法
::: tip
* 由于 QDrawer 需要布局，并且默认情况下 QLayout 会管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayouts。 但是请记住，这不代表您也需要将容器化的 QLayouts 用于 QDrawer。
* 如果 QDrawer 内容也包含图像，并且您想使用触摸操作将其关闭，则可能要向其添加`draggable="false"`，否则本地浏览器的默认行为可能会产生负面影响。
:::

::: danger
默认情况下，QDrawer 附带有触摸操作。 如果这干扰了您的侧滑菜单内容组件，请通过指定布尔值       `no-swipe-close` 属性来禁用它。
:::

::: warning
当 QDrawer 设置为覆盖(overlay)模式时，QDrawer 将**强制进入固定位置**，无论 QLayout 的“view” 属性是否配置为 “l/r” 或 “L/R”。 另外，如果**在 iOS 平台上并且 QLayout 已容器化**，由于无法克服的平台限制，固定位置也将被强制置于 QDrawer 上。
:::

### 基础

<doc-example title="基础" file="QDrawer/Basic" />

考虑将 QItems 与下面的路由属性（如 `to` ）一起使用。 出于演示目的，未添加这些属性，因为它将破坏 UMD 版本。

<doc-example title="搭配导航菜单" file="QDrawer/Menu" />

<doc-example title="无边框菜单" file="QDrawer/MenuSeamless" />

<doc-example title="顶部图片" file="QDrawer/HeaderPicture" />

### mini（迷您）模式

侧滑菜单可以在两种模式下运行：“正常” 和 “迷您”，您可以使用 QDrawer 上的布尔 `mini` 属性在它们之间进行切换。

::: warning
请注意，**mini 模式在 mobile 行为(behavior)下不适用**。
:::

在处理 "mini" 模式时，有一些 CSS 类可以帮助您自定义侧滑菜单。尤其是在处理  "click" 触发器时，非常有用：

| CSS 类名 | 描述 |
| --- | --- |
| `q-mini-drawer-hide` | 侧滑菜单处于 "mini" 或者 "mobile" 模式时隐藏。 |
| `q-mini-drawer-only` | 仅在侧滑菜单处于   "mini" 模式时显示。 |

您还可以利用以下特性根据实际情况编写自己的 CSS 类：QLayoutDrawer 在 "normal" 模式下具有`q-drawer--standard` CSS 类，在 "mini" 模式下具有 `q-drawer--mini`。此外，当侧滑菜单处于"mobile" 行为时，它会获得 `q-drawer--mobile` CSS 类。

#### 鼠标移入/移出触发

考虑将 QItems 与下面的路由属性（如 `to` ）一起使用。 出于演示目的，未添加这些属性，因为它将破坏 UMD 版本。

<doc-example title="鼠标移入移出触发迷您模式 " file="QDrawer/MiniMouseEvents" />

#### 迷您覆盖

不管您是否使用 `view` 属性进行配置，`mini-to-overlay` 布尔属性始终将您的侧滑菜单设置为固定位置，但仅在迷您模式下会占用布局上的空间。

<doc-example title="Mini to overlay" file="QDrawer/MiniToOverlay" />

#### 点击触发迷您模式

在下面的示例中，当处于 "mini" 模式时，如果用户单击侧滑菜单，则我们将切换到普通模式。

考虑将 QItems 与下面的路由属性（如 to）一起使用。 出于演示目的，未添加这些属性，因为它将破坏 UMD 版本。

<doc-example title="点击触发迷您模式" file="QDrawer/MiniClickEvent" />

#### Slots
默认情况下，在 "mini" 模式下，Quasar CSS 隐藏一些 DOM 元素以提供整洁的狭窄侧滑菜单。 但是，肯定有一些用例需要您进行深度调整。您可以为此使用 QLayoutDrawe r 的 "mini" Vue 插槽。 在  "mini" 模式下，此插槽的内容将替换侧滑菜单的默认内容。

<doc-example title="使用插槽自定义迷您模式的内容" file="QDrawer/MiniSlot" />

### Overlay（覆盖）模式

overlay（覆盖）模式可防止侧滑菜单占用布局上的空间，而是将鼠标悬停在页面上。无论使用  `view` 属性的配置如何，这都将侧滑菜单始终固定在固定位置。

在下面的示例中，单击菜单图标以查看运行中的侧滑菜单。 最好在至少宽度为 500px 的窗口的桌面上查看（这是此演示中设置的断点）。

<doc-example title="Overlay mode" file="QDrawer/OverlayMode" />
