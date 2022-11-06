---
title: 复选框
desc: QCheckbox是一个Vue复选框组件，带有着色，涟漪特效等特性。
keys: QCheckbox
related:
  - /vue-components/toggle
  - /vue-components/option-group
  - /vue-components/radio
  - /vue-components/button-toggle
---

QCheckbox 组件是收集用户输入的一个基本元素。您可以使用此选项为用户提供切换选项的方式。

::: tip
关于创建一组复选框组的其他可能性，请参阅 [QOptionGroup](/vue-components/option-group)。
:::


## QCheckbox API

<doc-api file="QCheckbox" />

## 用法

### 标准

<doc-example title="标准" file="QCheckbox/Standard" />

### 自定义图标 <q-badge align="top" color="brand-primary" label="v2.5+" />

<doc-example title="自定义图标" file="QCheckbox/WithIcons" />

### 标签

<doc-example title="标签" file="QCheckbox/Label" />

### 着色

在下面示例的第二行中，即使复选按钮未处于切换状态，设置了 `keep-color` 属性依然会进行着色。

<doc-example title="着色" file="QCheckbox/Coloring" />

### 紧凑模式和黑色模式

<doc-example title="紧凑模式" file="QCheckbox/Dense" />

<doc-example title="黑色模式" file="QCheckbox/OnDarkBackground" dark />

### 大小

除了下面的标准尺寸，您可以通过 `size` 属性定义自己的尺寸（最后一个示例是自定义尺寸）。

<doc-example title="标准尺寸" file="QCheckbox/StandardSizes" />

### 不定状态

在下面的示例中，只要单击第一个复选框，它就开始在真/假之间切换。然而，第二个复选框通过设置`toggle-indeterminate` 属性可以在三种状态（不确定/真/假）之间切换。您可以选择设置 `indeterminate-value`，否则不确定的值将被视为 `null`

<doc-example title="不定状态" file="QCheckbox/IndeterminateState" />

### 切换顺序

默认情况下，QCheckbox 在点击时按照下述顺序切换值：indeterminate -> checked -> unchecked。但是您可以通过 `toggle-order` 属性来修改此行为。这个属性决定了切换状态的顺序是 `tf`（默认），或者 `ft`（`t` 表示 true/checked 状态，`f` 表示 false/unchecked 状态）

切换顺序：

* 如果 `toggle-indeterminate` 是 true，那么：indet -> first state -> second state -> indet （依次循环）
* 否则： indet -> first state -> second state -> first state -> second state -> ...

<doc-example title="切换顺序" file="QCheckbox/ToggleOrder" />

### 数组 model

<doc-example title="数组作为 model" file="QCheckbox/ArrayAsModel" />

### 自定义 model 值

<doc-example title="自定义 model 值" file="QCheckbox/CustomModel" />

### 搭配 QOptionGroup

::: tip
您还可以使用 [QOptionGroup](/vue-components/option-group)，当您有多组复选框时，它可以简化使用，如下面的示例所示。
:::

<doc-example title="与 QOptionGroup 一起使用" file="QCheckbox/OptionGroup" />

### 搭配 QItem

在下面的示例中，我们 渲染了一个 `<label>` 标签（注意 `tag="label"`），因此 QCheckbox 将响应 QItems 上的点击以更改切换状态。
<doc-example title="搭配 QItem" file="QCheckbox/InaList" />

### 禁用

<doc-example title="禁用" file="QCheckbox/Disable" />


## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QCheckbox 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QCheckbox/NativeForm" />
