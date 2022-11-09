---
title: 选项组
desc: The QOptionGroup Vue component allows you better control for grouping binary form input components like checkboxes, radios or toggles.
keys: QOptionGroup
related:
  - /vue-components/radio
  - /vue-components/checkbox
  - /vue-components/toggle
  - /vue-components/button-toggle
---

QOptionGroup 组件是一个辅助组件，它帮助您更好地对二进制（开或关、真或假、1 或 0）形式的输入组件（如复选框、单选或开关）进行分组。该组件的一个很好的用途是提供一组打开和关闭的选项或设置。

## QOptionGroup API

<doc-api file="QOptionGroup" />

## 用法

### 标准

<doc-example title="标准" file="QOptionGroup/Standard" />

### 搭配 QCheckbox 或 QToggle

<doc-example title="搭配复选框" file="QOptionGroup/Checkbox" />

::: warning
复选框/开关的 model 必须是一个数组。
:::

<doc-example title="搭配开关" file="QOptionGroup/Toggle" />

### 使用标签插槽 <q-badge align="top" color="brand-primary" label="v2.2+" />

这里有两种类型的插槽。一个是通用的用于所有的选项，除非它额外声明了一个带索引的标签（`label-N` ,N 是从 0 开始的选项的索引）。两种类型的插槽都可以接受响应式的选项作为参数。

请注意，我们为第一个选项（索引 0 处的选项）使用特定的标签槽，我们还添加了一个 QTooltip。

<doc-example title="Label 插槽" file="QOptionGroup/LabelSlots" />

### 标签放在左边

<doc-example title="标签放在左边" file="QOptionGroup/Label" />

### 行内的

<doc-example title="行内的" file="QOptionGroup/Inline" />

### 紧凑的

<doc-example title="紧凑并且行内" file="QOptionGroup/DenseInline" />

### 禁用

<doc-example title="禁用" file="QOptionGroup/Disable" />

::: tip
`options` 数组中的对象，可以容纳 QToggle， QCheckbox 或 QRadio 的所有属性，列如：`disable` 或 `leftLabel`。如下例所示：
:::

### 禁用特定的选项

<doc-example title="禁用特定的选项" file="QOptionGroup/DisableCertainOptions" />

### 黑色

<doc-example title="黑色背景" file="QOptionGroup/Dark" dark />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QOptionGroup 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QOptionGroup/NativeForm" />
