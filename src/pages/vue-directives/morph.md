---
title: Morph Directive
desc: Quasar 中可以实现 dom 在两种状态间动画形变的 Vue 指令。
keys: morph
related:
  - /quasar-utils/morph-utils
---

"v-morph"是 Quasar 提供的指令，它可以使 DOM 在两种状态间变换。

底层原理使用了 [Morph 函数工具](/quasar-utils/morph-utils).

## Morph API

<doc-api file="Morph" />

## 用法

请先阅读 [Morph 工具函数](/quasar-utils/morph-utils)页面，有利于理解这个指令的工作原理。

这个指令将组中的一个元素变形为另一个元素（变形过程带有动画）。变形是通过改变指令的值(model)来匹配变形元素的名称来激活的。

::: warning
* "name"和"group"字段是必传的（可以作为指令参数或者值传入）
* 若指令的值为对象格式，那么"model"字段也是必传的。
:::

<doc-example title="一组内多个元素形变" file="Morph/BasicGroup" />

<doc-example title="从一个按钮行形变为卡片" file="Morph/Card" />
