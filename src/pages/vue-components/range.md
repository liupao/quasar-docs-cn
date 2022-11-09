---
title: Range
desc: The QRange Vue component offers a way for the user to select from a sub-range of values between a maximum and maximum value, with optional steps.
keys: QRange
related:
  - /vue-components/slider
  - /vue-components/field
---

QRange 组件可以让用户在最小值和最大值之间选择一个子范围的值，还可以通过可选的步骤来选择这些值。Range 组件的一个示例用例是提供价格范围选择。

也看看另一个相似的组件：[QSlider](/vue-components/slider) 。

## QRange API

<doc-api file="QRange" />

## 用法

请注意，我们为每一个组件使用一个对象，该对象包含选定范围的最小值 `rangeValues.min` 和最大值 `rangeValues.max`。

### 标准

::: warning
您需要调整 QRange 周围的空间，以便标签和标记标签不会与页面上的其他内容重叠。您可以为此使用 CSS 边距或填充。
:::

<doc-example title="标准" file="QRange/Standard" />

### 垂直

<doc-example title="垂直方向" file="QRange/Vertical" />

### 内部的最大/最小值 <q-badge align="top" color="brand-primary" label="v2.4+" />

有时您需要将模型值限制为轨迹长度内的范围。您可以通过 `inner-min` 和 `inner-max` 属性来实现，前者需要大于等于 `min` 属性，后者需要小于等于 `max` 属性。

<doc-example title="Inner min/max" file="QRange/InnerMinMax" />

### 离散值

<doc-example title="设置步长" file="QRange/Step" />

`step` 属性也可以是一个浮点数（或者数字 0 如果您需要无效小的精度）。

<doc-example title="浮点数" file="QRange/FloatingPoint" />

<doc-example title="Snaps to steps" file="QRange/Snap" />

### 带有标签

在下面的示例中，移动滑块以查看标签。

<doc-example title="带有标签" file="QRange/Label" />

<doc-example title="始终显示标签" file="QRange/LabelAlways" />

<doc-example title="自定义标签值" file="QRange/LabelValue" />

下面的示例演示如何处理标签的定位，以使其始终水平地保持在 QRange 的框内。

<doc-example title="长标签" file="QRange/LabelLong" />

### 标记

<doc-example title="标记" file="QRange/Markers" />

### 标记标签 <q-badge align="top" color="brand-primary" label="v2.4+" />

<doc-example title="标记标签" file="QRange/MarkerLabels" />

::: tip TIP on slots
为了使用标记标签插槽(参见下面) ，您必须使用 `marker-labels` 来启用它们。
:::

<doc-example title="标记标签插槽" file="QRange/MarkerLabelSlots" />

### 其他的自定义选项 <q-badge align="top" color="brand-primary" label="v2.4+" />

<doc-example title="自定义颜色" file="QRange/RangeColoring" />

<doc-example title="隐藏选择栏" file="QRange/NoSelection" />

<doc-example title="自定义轨道图像" file="QRange/TrackImages" />

<doc-example title="轨道和滑块的大小" file="QRange/RangeSizes" />

### 可拖拽的范围

使用 `drag-range` 或 `drag-only-range` 属性允许用户移动所选范围或仅移动预定的范围。

<doc-example title="Drag range" file="QRange/Drag" />

<doc-example title="Drag range + snap to step" file="QRange/DragSnap" />

<doc-example title="Drag only range (fixed interval)" file="QRange/DragOnly" />

### 懒输入

<doc-example title="Lazy input" file="QRange/Lazy" />

### 懒输入

<doc-example title="Null values" file="QRange/Null" />

### 反向

<doc-example title="In reverse" file="QRange/Reverse" />

### 黑色, 只读, 禁用

<doc-example title="黑色" file="QRange/Dark" dark />

<doc-example title="只读" file="QRange/Readonly" />

<doc-example title="禁用" file="QRange/Disable" />

### 搭配 QItem

<doc-example title="搭配 QItem" file="QRange/List" />


## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QRange 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="Native form" file="QRange/NativeForm" />
