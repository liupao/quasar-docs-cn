---
title: 评分组件
desc: QRating是一个允许用户对项目进行评分的Vue 组件.
keys: QRating
---

QRating 是一个允许用户对项目进行评分的组件。

## QRating API

<doc-api file="QRating" />

## 用法

### 基础

<doc-example title="基础" file="QRating/Basic" />

<doc-example title="自定义数字" file="QRating/Max" />

### 图标

<doc-example title="图片图标" file="QRating/Images" />

在下面的示例中，我们使用了 `icon-selected` 属性，但是请注意我们仍然可以使用 `icon` 属性，此时 `icon` 属性会成为未被选中时的图标。

<doc-example title="选中时使用不同的图标" file="QRating/SelectedIcon" />

<doc-example title="每个评分使用不同的图标" file="QRating/ArrayIcon" />

### 颜色

在下面的示例中，我们使用了 `color-selected` 属性，但是请注意我们仍然可以使用 `color` 属性，此时 `color` 属性会成为未被选中时的颜色。

<doc-example title="每个评分使用不同的颜色" file="QRating/Colors" />

### 浮点数评分

<doc-example title="打半颗星时设置不同的图标" file="QRating/HalfSelected" />

### 没有调光

<doc-example title="No dimming" file="QRating/NoDimming" />

### 悬浮提示

我们可以为每个图标添加一个提示，如下所示:

<doc-example title="搭配 QTooltip" file="QRating/SlotTip" />

### 尺寸

除了下述标准尺寸，您还可以使用 `size` 属性设置自定义的尺寸。

<doc-example title="标准尺寸" file="QRating/StandardSizes" />

### 只读和禁用

<doc-example title="只读和禁用" file="QRating/ReadonlyDisable" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QRating 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QRating/NativeForm" />
