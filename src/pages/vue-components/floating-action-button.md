---
title: 悬浮操作按钮
desc: 使用 QFab 为来您的 Quasar 引用添加悬浮的操作按钮。
keys: QFab
related:
  - /layout/layout
  - /layout/page
---

一个悬浮操作按钮（FAB）通常代表着一个页面中的主要操作。但是，它不仅限于一个单一的行动。它也可以包含任意数量的子操作。更重要的是，它还可以在页面或布局中内联使用。

注意，不需要 QLayout 您也可以使用 FAB

## QFab API

<doc-api file="QFab" />

## QFabAction API

<doc-api file="QFabAction" />

## 用法
FAB 有两种类型：带有扩展项的和不带扩展项的。

::: tip
关于完整的选项列表，请参考 API 卡片部分。
:::

### 不带扩展项的

如果您想要在 QLayout 中使用一个不带扩展项的 FAB，那么您只需要一个圆形的按钮，并且使用 QPageSticky 包裹它。

<doc-example title="不带扩展项的" file="QFab/NonExpandable" />

### 带扩展项的

<doc-example title="带扩展项的" file="QFab/Expandable" />

### 内部标签

<doc-example title="内部标签" file="QFab/InternalLabel" />

<doc-example title="开关内部标签" file="QFab/InternalLabelToggling" />

当使用内部标签并且您的 QFAB 垂直打开（向上或向下）时，您还可以选择如何垂直对齐操作按钮：

<doc-example title="垂直对齐" file="QFab/VerticalActionsAlignment" />

### 外部标签
默认情况下，当标签位于主 QFab (而不是子操作)的外部时，只有在打开 QFab 时才显示它。但是，您可以通过 `hide-label` 属性来覆盖它。

<doc-example title="外部标签" file="QFab/ExternalLabel" />

<doc-example title="自定义外部标签的样式" file="QFab/ExternalLabelStyled" />

<doc-example title="开关外部标签" file="QFab/ExternalLabelToggling" />

### 隐藏图标

如果我们隐藏图标（通过特定的 props），我们至少应该使用一个内部标签：

<doc-example title="隐藏图标" file="QFab/HideIcon" />

### 内边距

QFab 的默认内边距是 "md"，QFabAction 的默认内边距为 "sm"。但是，您可以使用 padding prop 自定义它（也可接受 CSS 单位）：

<doc-example title="修改内边距" file="QFab/Padding" />

### 方形样式
<doc-example title="方形样式" file="QFab/SquareStyle" />

### 插槽 <q-badge align="top" color="brand-primary" label="v2.4+" />

请注意下面的 QFab 和 QFabAction 使用的插槽：

<doc-example title="插槽：icon, active-icon 和 label" file="QFab/FabSlots" />

### 搭配 QPageSticky

<doc-example title="搭配 QPageSticky" file="QFab/PageSticky" />

### 可拖拽的

下面是一个使用 [TouchPan](/vue-directives/touch-pan) 使 QFab 在屏幕上可拖动的例子。

<doc-example title="可拖拽的" file="QFab/Draggable" />
