---
title: Toggle
desc: QToggle Vue组件是采集用户输入的一个基本元素。您可以使用它为用户提供设置开关切换或者真假值输入功能。
keys: QToggle
related:
  - /vue-components/checkbox
  - /vue-components/option-group
  - /vue-components/radio
  - /vue-components/button-toggle
---

QToggle 组件是采集用户输入的一个基本元素。您可以使用它为用户提供设置开关切换或者真假值输入功能。

::: tip
关于创建一组选项框的其他可能性，请参阅 [QOptionGroup](/vue-components/option-group)。
:::

## QToggle API

<doc-api file="QToggle" />

## 用法

### 基础

使用 `color` 属性来控制开关的颜色

<doc-example title="基础" file="QToggle/Standard" />

### 带有标签

<doc-example title="带有标签" file="QToggle/Labels" />

### 保留颜色

<doc-example title="Keep color" file="QToggle/KeepColor" />

### 带有图标

<doc-example title="Icons" file="QToggle/Icons" />

### 自定义 model 值

您可以自定义 model 的值来替换默认的 `true`/`false`。

<doc-example title="自定义 model 值" file="QToggle/CustomValues" />

### 不定状态

在下面的示例中，只要单击第一个 QToggle，它就开始在真/假之间切换。然而，第二个 QToggle 通过设置`toggle-indeterminate` 属性可以在三种状态（不确定/真/假）之间切换。您可以选择设置 `indeterminate-value`，否则不确定的值将被视为 `null`

<doc-example title="不定状态" file="QToggle/IndeterminateState" />


### 切换顺序

默认情况下，QToggle 在点击时按照下述顺序切换值：indeterminate -> checked -> unchecked。但是您可以通过 `toggle-order` 属性来修改此行为。这个属性决定了切换状态的顺序是 `tf`（默认），或者 `ft`（`t` 表示 true/checked 状态，`f` 表示 false/unchecked 状态）

切换顺序：

* 如果 `toggle-indeterminate` 是 true，那么：indet -> first state -> second state -> indet （依次循环）
* 否则： indet -> first state -> second state -> first state -> second state -> ...

<doc-example title="Toggle order" file="QToggle/ToggleOrder" />

### 数组 model

如果有多个开关，则可以使用数组作为所有开关的 数据 model，并在每个开关上指定 `val` 属性。如果勾选该开关，其 `val` 将插入数组，反之亦然。

<doc-example title="Array model" file="QToggle/ArrayValue" />

### 黑色和禁用

<doc-example title="黑色背景" file="QToggle/DarkBackground" dark />

<doc-example title="禁用状态" file="QToggle/Disabled" />

### 大小

除了下面的标准尺寸，您可以通过 `size` 属性定义自己的尺寸（最后一个示例是自定义尺寸）。

<doc-example title="标准尺寸" file="QToggle/StandardSizes" />

### 搭配 QOptionGroup

::: tip
您还可以使用 [QOptionGroup](/vue-components/option-group)，当您有多组开关时，它可以简化使用，如下面的示例所示。
:::

<doc-example title="与 QOptionGroup 一起使用" file="QToggle/OptionGroup" />

### 搭配 QItem

<doc-example title="搭配 QItem" file="QToggle/List" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QToggle 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="Native form" file="QToggle/NativeForm" />
