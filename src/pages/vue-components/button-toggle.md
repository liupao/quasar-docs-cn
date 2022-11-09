---
title: Button Toggle
desc: QBtnToggle vue组件也是一个基础的交互组件，有点相似于 QRadio，但是它是基于按钮的。
keys: QBtnToggle
related:
  - /vue-components/button
  - /vue-components/tabs
  - /vue-components/option-group
  - /vue-components/radio
  - /vue-components/checkbox
  - /vue-components/toggle
---

QBtnToggle 组件也是一个基础的交互组件，有点相似于 QRadio，但是它是基于按钮的。你可以使用这个组件来充当一个开关或者用于真假值的收集。

## QBtnToggle API

<doc-api file="QBtnToggle" />

## 用法

### 基础

<doc-example title="基础" file="QBtnToggle/Basic" />

### 外形设计

::: tip
因为 QBtnToggle 是 QBtn 的封装，所以您可以将 QBtn 中与样式设计相关的属性用在 QBtnToggle 中 。
:::

<doc-example title="一些外观设计示例" file="QBtnToggle/Design" />

<doc-example title="水平铺开" file="QBtnToggle/Spread" />

<doc-example title="黑色背景" file="QBtnToggle/Dark" dark />

### 自定义内容
下面的第一个 QBtnToggle 在每个按钮上都有鼠标悬浮提示。第二个 QBtnToggle 定制了内容。请注意 `options` 对象中的 `slot` 属性。当你使用这个插槽属性时，你不需要在 `options` 中使用 `label`/`icon` 属性。

<doc-example title="自定义按钮内容" file="QBtnToggle/CustomContent" />

### 禁用和只读

<doc-example title="禁用和只读" file="QBtnToggle/DisableReadonly" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QBtnToggle 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="Native form" file="QBtnToggle/NativeForm" />
