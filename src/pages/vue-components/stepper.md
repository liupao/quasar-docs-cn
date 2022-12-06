---
title: 步进器
desc: QStepper是一个步进器vue组件，它通过一系列逻辑和编号的步骤显示进度。它们也可用作导航。当用户需要按照步骤完成一个过程时，它很有用，例如一个向导。
keys: QStepper,QStep,QStepperNavigation
related:
  - /options/transitions
---

步进器通过一系列逻辑和编号的步骤显示进度。它们也可用作导航。当用户需要按照步骤完成一个过程时，它很有用，例如一个[向导](https://en.wikipedia.org/wiki/Wizard_(software))


## QStepper API

<doc-api file="QStepper" />

## QStep API

<doc-api file="QStep" />

## QStepperNavigation API

此组件允许您在 `QStepper` 或 `QStep` 中放置按钮，以在步骤中导航。您可以根据需要添加任何按钮。

::: tip
如果要使用全局导航，您需要将其添加到 `QStepper` 的 'navigation' 插槽中。
:::

<doc-api file="QStepperNavigation" />

## 用法

::: tip
QStep 的内容也可以是图像，如果您需要在图像上滑动导航，那么最好为它们添加 `draggable="false"`，否则浏览器的原生行为可能导致副作用。
:::

::: danger Keep Alive
*  请注意 QStepper 的 `keep-alive` 属性，如果您需要这个功能，请使用它，而不是 Vue 提供的 `<keep-alive>` 组件包裹 QStep。
* 如果您需要使用 `keep-alive-include` 或 `keep-alive-exclude` 属性，那么 QStep 的 `name` 属性必须是一个合法的 Vue 组件名称（不含空格、不以数字开头等）。
:::

### 水平的

<doc-example title="水平的" file="QStepper/TypeHorizontal" />

### 垂直的

<doc-example title="垂直的" file="QStepper/TypeVertical" />

### 头部导航

<doc-example title="非线性头部导航" file="QStepper/NonLinearNavigation" />

<doc-example title="线性头部导航" file="QStepper/LinearNavigation" />

### 头部选项
<doc-example title="步骤错误信号" file="QStepper/StepError" />

<doc-example title="替代标签" file="QStepper/AlternativeLabels" />

::: tip
您可以将 `contracted` 属性与 `$q.screen` 联系起来以实现响应式的行为，例如 `:contracted="$q.screen.lt.md"`。更多信息： [Quasar 屏幕插件](/options/screen-plugin).
:::

<doc-example title="Contracted" file="QStepper/Contracted" />

### 样式

在 QStepper 或者特定的 QStep 上使用 `*-icon` 和 `*-color` 属性进行着色。

<doc-example title="着色" file="QStepper/Coloring" />

您还可以为每个步骤的标题使用 `prefix` 属性（最多2个字符）来代替图标。如果步骤当前未被编辑，并且未标记为错误或“已完成”，则将显示此信息。

<doc-example title="步骤前缀" file="QStepper/Prefix" />

<doc-example title="黑色模式" file="QStepper/Dark" />

您可以使用 `header-class` 属性将任何 CSS 类应用于头部。在下面的示例中，我们使用了粗体文本：

<doc-example title="Header Class" file="QStepper/HeaderClass" />

### 消息插槽

<doc-example title="消息插槽 with fixed height steps" file="QStepper/MessageSlot" />
