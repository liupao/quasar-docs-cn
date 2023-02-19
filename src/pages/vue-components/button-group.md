---
title: 组合按钮
desc:  QBtnGroup Vue 组件可以很方便的把 QBtn 和 QBtnDropdown 组合起来。
keys: QBtnGroup
related:
  - /vue-components/button
  - /vue-components/button-dropdown
  - /vue-components/button-toggle
---

您可以使用 QBtnGroup 组件很方便的把 [QBtn](/vue-components/button) 和 [QBtnDropdown](/vue-components/button-dropdown) 组合起来，如果您还不了解 QBtn 和 QBtnDropdown 组件的话，请先转到相应的页面去了解他们的属性和方法。

## QBtnGroup API

<doc-api file="QBtnGroup" />

## 用法
<doc-example title="示例" file="QBtnGroup/Group" />

::: warning
您必须在 QBtnGroup 父组件和 QBtn/QBtnDropdown 上使用相同的外形设计模式（相同的 design 属性）(flat, outline, push, ...)
:::

<doc-example title="在水平方向上扩展" file="QBtnGroup/GroupSpread" />

<doc-example title="搭配 QBtnDropdown" file="QBtnGroup/WithDropdown" />
