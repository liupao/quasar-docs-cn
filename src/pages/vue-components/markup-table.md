---
title: markup 表格
desc: QMarkupTable是一个封装了原生表格，使其具有质感设计样式的Vue 组件。
keys: QMarkupTable
related:
  - /vue-components/table
---

QMarkupTable 组件封装了原生的 `<table>`，使其看起来像是 Material Design（质感设计）的组件。


::: tip
对于分页、排序、过滤等高级功能，您可能需要查阅 [QTable](/vue-components/table) 组件。
:::

## QMarkupTable API

<doc-api file="QMarkupTable" />

## 用法

::: warning
注意，`QMarkupTable` 的内容是由原生 HTML `<table>` 标签呈现的，使用一个 `<thead>` 和一个 `<tbody>` 来包裹标题和表主体。这是必需的。
:::

::: warning UMD 开发者
该组件将**不能**在 Quasar 的 UMD 版本中按原样工作。 浏览器在 Vue 插入并渲染之前先解析 HTML 模板，因此标记必须正确。 不能是`<q-markup-table> <thead>` 或 `<q-markup-table> <tbody>`。 解决方案是直接使用 QMarkupTable Vue 渲染的标签（`<table class="....`）。
:::

<doc-example title="基础" file="QMarkupTable/Basic" no-edit />

<doc-example title="分割线" file="QMarkupTable/Separators" no-edit />

<doc-example title="黑色" file="QMarkupTable/Dark" no-edit />

<doc-example title="自定义" file="QMarkupTable/Customization" no-edit />

::: tip
如果要删除某些行或单元格上的悬停效果，请向其添加 `q-tr--no-hover` 或 `q-td--no-hover` 类。
:::
