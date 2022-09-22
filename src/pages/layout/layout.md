---
title: 布局
desc: 如果使用 QLayout 组件管理 Quasar 应用程序的布局主窗口。
keys: QLayout
related:
  - /layout/header-and-footer
  - /layout/drawer
  - /layout/page
  - /layout/page-sticky
  - /layout/page-scroller
  - /vue-components/floating-action-button
components:
  - layout/ViewProp
  - layout/ViewPlay
---
QLayout 是一个用于管理整个窗口并使用导航栏或侧抽屉菜单等元素包装页面内容的组件。 多个页面可以共享同一个 QLayout，因此代码是可重用的，这是它们的关键点之一。

**QLayout 不是强制性的**，但它确实可以帮助您更好地构建网站/应用程序。 它具有许多开箱即用的功能，可极大的帮助您简化网站/应用的布局设计。

## QLayout API
<doc-api file="QLayout" />

## 布局生成器

通过点击下面的按钮来搭建您的布局。

::: warning
布局生成器可能会使用在quasar.conf.js中尚未启用的组件。

可能需要以下组件 - QLayout、QHeader、QToolbar、QToolbarTitle、QBtn、QAvatar、QTabs、QRouteTab、QDrawer、QPageContainer、QFooter。
:::

::: tip
密切关注您的开发人员控制台，以了解哪些组件正在使用，但没有在quasar.config.js中启用
:::

<q-btn push color="brand-primary" icon-right="launch" label="布局生成器" href="/layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法

::: warning 使用 margin CSS会破坏布局

QLayout 依赖于占据整个屏幕，因此     QPageContainer、QHeader、QFooter和QLayoutDrawer 的位置由它管理（通过`view`属性）。上面提到的任何 QLayout 组件上都**不能**使用 *CSS margins* 相关的样式。 但是，您可以安全地使用 *CSS padding*。
:::

::: tip
如果您的布局使用 Vue Router 子路由（推荐），则可以使用Vue的 `<router-view />` 组件，该组件只是注入子路由的占位符。 有关更多信息，请阅读[使用布局和页面进行路由](/layout/routing-with-layouts-and-pages)。
:::

### 了解 "view" 属性

Quasar引入了独特而出色的布局理念，使您可以通过简单地更改字符串符号就可以轻松地构造出指定的布局。

为了解释它是如何工作的，假设您的布局是一个3x3的容器矩阵（下面以蓝色表示）。 容器的第一行是页眉，最后一行是页脚。 容器的第一列为“左”，最后一列为“右”。 矩阵的中心即页眉下方和页脚上方，将是页面或主要内容容器。

这个容器矩阵或将其理解为 “QLayout View”，它可以由一个字符串表示，您应该将该字符串提供给 QLayout 的 `view` 属性，它必须是一个长度为11的字符串：

- 3个字符定义页眉行
- 然后一个空格
- 3个字符定义中间行
- 一个空格
- 然后3个字符定义页脚行

<view-prop />

上面显示的字母也区分大小写。 例如，使用至少一个“L”（大写字母而不是小写字母）将使布局左侧（左侧抽屉菜单）处于固定位置。 同样适用于“H”（页眉），“F”（页脚），最后是“R”（右侧/右侧抽屉菜单）

<view-play />

例如，如果要将布局的右侧/右侧抽屉菜单放在页眉、页面和页脚的右侧，则可以使用 `hhr lpr ffr`。 如果您也想将其固定，只需将一个r字符转换为大写即可，例如：`hhr lpR ffr` 或 `hhR lpr ffr` 或 `hhr lpr ffR`。

这些设置完全取决于您的使用。您甚至可以使用这样疯狂的设置：`lhh LpR ffr`。 试试看！

<q-btn push color="red" icon-right="launch" label="布局生成器" href="/layout-builder" target="_blank" rel="noopener noreferrer" />

::: warning
* 重要的是，即使不使用它们，也要指定 QLayout 的所有部分。 例如，即使您不使用页脚或右侧侧滑菜单，也请在 QLayout 的 `view` 属性中指定它们。
* 当 QDrawer 设置为覆盖(overlay)模式时，QDrawer 将**强制进入固定位置**，无论 QLayout 的“view” 属性是否配置为 “l/r” 或 “L/R”。 另外，如果**在 iOS 平台上并且 QLayout 已容器化**，由于无法克服的平台限制，固定位置也将被强制置于 QDrawer 上。
:::

### 容器化QLayout

默认情况下，QLayout管理整个窗口。 但是，您也可以将QLayout用作容器（具有特定的高度和宽度），以将其隔离在页面中的某个位置。

::: warning
请注意，**它需要显式设置CSS高度（或最小高度）**，否则不起作用。
:::

在下面的示例中，有一个容器化的 QLayout，每侧都有抽屉菜单（断点在左侧抽屉菜单为 700px，在右侧抽屉菜单为 500px）。 断点不是指窗口宽度，而是指 QLayout 容器的实际宽度。

<doc-example title="容器化 QLayout" file="QLayout/Container" />

<doc-example title="在一个QDialog中" file="QLayout/ContainerDialog" />
