---
title: 单选框
desc: QRadio Vue组件是采集用户输入的一个基本元素。您可以使用它为用户提供一种从多个选项中选择选项的方法。
keys: QRadio
related:
  - /vue-components/option-group
  - /vue-components/button-toggle
  - /vue-components/checkbox
  - /vue-components/toggle
---

QRadio 组件是采集用户输入的一个基本元素。您可以使用它为用户提供一种从多个选项中选择选项的方法。

::: tip
关于创建一组单选框的其他可能性，请参阅 [QOptionGroup](/vue-components/option-group)。
:::

## QRadio API

<doc-api file="QRadio" />

## 用法

### 标准

<doc-example title="Standard" file="QRadio/Standard" />

### 自定义图标 <q-badge align="top" color="brand-primary" label="v2.5+" />

<doc-example title="With icons" file="QRadio/WithIcons" />

### 紧凑模式

<doc-example title="紧凑模式" file="QRadio/Dense" />

### 着色

在下面示例的第二行中，即使单选按钮未处于切换状态，设置了 `keep-color` 属性依然会进行着色。

<doc-example title="着色" file="QRadio/Coloring" />

### 黑色背景和禁用

<doc-example title="黑色背景" file="QRadio/OnDarkBackground" dark />

<doc-example title="禁用" file="QRadio/Disable" />

### 标签放在左边

<doc-example title="标签放在左边" file="QRadio/LabelPosition" />

### 大小

除了下面的标准尺寸，您可以通过 `size` 属性定义自己的尺寸（最后一个示例是自定义尺寸）。

<doc-example title="标准尺寸" file="QRadio/StandardSizes" />

### 搭配 QOptionGroup

::: tip
您还可以使用 [QOptionGroup](/vue-components/option-group)，当您有多组单选框时，它可以简化使用，如下面的示例所示。
:::

<doc-example title="与 QOptionGroup 一起使用" file="QRadio/OptionGroup" />

### 搭配 QItem

在下面的示例中，我们 渲染了一个 `<label>` 标签（注意 `tag="label"`），因此 QRadio 将响应 QItems 上的点击以更改切换状态。

<doc-example title="搭配 QItem" file="QRadio/InaList" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QRadio 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QRadio/NativeForm" />
