---
title: 滑块
desc: QSlider 是用户指定最小值和最大值之间的数值的好方法。
keys: QSlider
related:
  - /vue-components/range
  - /vue-components/field
---

QSlider 是用户指定最小值和最大值之间的数值的好方法，滑块还有一个焦点指示器（突出显示的滑块按钮），可以通过键盘调整滑块。

也看看另一个相似的组件：[QRange](/vue-components/range)。

## QSlider API

<doc-api file="QSlider" />

## 用法

::: warning
您需要调整 QSlider 周围的空间，以便标签和标记标签不会与页面上的其他内容重叠。您可以为此使用 CSS 边距或填充。
:::

### 标准

<doc-example title="标准" file="QSlider/Standard" />

### 垂直

<doc-example title="垂直方向" file="QSlider/Vertical" />

### 内部的最大/最小值  <q-badge align="top" color="brand-primary" label="v2.4+" />

有时您需要将模型值限制为轨迹长度内的范围。您可以通过 `inner-min` 和 `inner-max` 属性来实现，前者需要大于等于 `min` 属性，后者需要小于等于 `max` 属性。

<doc-example title="Inner min/max" file="QSlider/InnerMinMax" />

### 离散值

<doc-example title="设置步长" file="QSlider/Step" />

`step` 属性也可以是一个浮点数（或者数字 0 如果您需要无效小的精度）。

<doc-example title="浮点数" file="QSlider/FloatingPoint" />

<doc-example title="Snap to steps" file="QSlider/Snap" />

### 带有标签

在下面的示例中，移动滑块以查看标签。

<doc-example title="带有标签" file="QSlider/Label" />

<doc-example title="始终显示标签" file="QSlider/LabelAlways" />

<doc-example title="自定义标签值" file="QSlider/LabelValue" />

下面的示例演示 QSlider 如何处理标签的定位，以使其始终水平地保持在 QSlide 的框内。

<doc-example title="长标签" file="QSlider/LabelLong" />

### 标记

<doc-example title="标记" file="QSlider/Markers" />

### 标记标签 <q-badge align="top" color="brand-primary" label="v2.4+" />

<doc-example title="标记标签" file="QSlider/MarkerLabels" />

::: tip TIP on slots
为了使用标记标签插槽(参见下面) ，您必须使用 `marker-labels` 来启用它们。
:::

<doc-example title="标记标签插槽" file="QSlider/MarkerLabelSlots" />

### 其他的自定义选项 <q-badge align="top" color="brand-primary" label="v2.4+" />

<doc-example title="自定义颜色" file="QSlider/SliderColoring" />

<doc-example title="隐藏选择栏" file="QSlider/NoSelection" />

<doc-example title="自定义轨道图像" file="QSlider/TrackImages" />

<doc-example title="轨道和滑块的大小" file="QSlider/SliderSizes" />

### 懒输入

<doc-example title="Lazy input" file="QSlider/Lazy" />

### Null 值

<doc-example title="Null value" file="QSlider/Null" />

### 反向

<doc-example title="反向" file="QSlider/Reverse" />

### 黑色, 只读, 禁用

<doc-example title="黑色" file="QSlider/Dark" dark />

<doc-example title="只读" file="QSlider/Readonly" />

<doc-example title="禁用" file="QSlider/Disable" />

### 搭配 QItem

<doc-example title="搭配 QItem" file="QSlider/List" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QSlider 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QSlider/NativeForm" />
