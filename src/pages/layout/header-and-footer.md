---
title: 页头和页脚
desc: 如何使用 QHeader 和 QFooter组件。
keys: QHeader,QFooter
related:
  - /layout/layout
  - /layout/page
  - /vue-components/toolbar
  - /vue-components/breadcrumbs
  - /vue-components/tabs
  - /vue-components/bar
---

QLayout 允许您将视图配置为一个 3x3 矩阵，其中包含可选的页眉/页脚（主要用于导航栏，但也可以是别的任何东西）。如果尚未准备好，请先阅读  [QLayout](/layout/layout) 文档页面。

## QHeader API
<doc-api file="QHeader" />

## QFooter API
<doc-api file="QFooter" />

## 布局生成器
点击下面的按钮来搭建您的布局。

<q-btn push color="brand-primary" icon-right="launch" label="布局生成器" href="/layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法
::: tip
由于页眉和页脚需要布局，并且默认情况下 QLayout 会管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayouts。 但是请记住，这不代表您也需要将容器化的 QLayouts 用于 QHeader 或 QFooter。
:::

<doc-example title="基础" file="QHeader/Basic" />

您可以在页眉和页脚的工具栏中使用 `glossy` 类。

<doc-example title="Glossy" file="QHeader/Glossy" />

### 各种不同的内容

<doc-example title="搭配 QToolbar 使用" file="QHeader/Extended" />

<doc-example title="搭配 QBreadcrumb 使用" file="QHeader/Breadcrumbs" />

<doc-example title="搭配 QTabs 使用" file="QHeader/Tabs" />

### Reveal 属性

在下面的示例中，滚动页面以查看QHeader和QFooter行为。

<doc-example title="Reveal" file="QHeader/Reveal" />

### iOS 风格
在下面的示例中，您可以为 QTab 使用带有 `ion-ios-` 前缀的 Ionicons v4 图标，这将匹配 iOS 的外观风格。

<doc-example title="iOS 风格" file="QHeader/LookingIOS" />

### 桌面应用外观风格

如果您构建一个 Electron 应用并隐藏默认应用程序边框，则以下示例特别有用。

<doc-example title="桌面应用外观风格" file="QHeader/AppLike" />
