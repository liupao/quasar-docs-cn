---
title: 旋钮
desc: QKnob是一个用于通过鼠标/触摸平移从用户那里输入数字的Vue 组件.
keys: QKnob
related:
  - /vue-components/circular-progress
---

QKnob 组件用于通过鼠标/触摸平移从用户那里输入数字。它基于 [QCircularProgress](/vue-components/circular-progress) ，并继承了其所有属性和行为.

## QKnob API

<doc-api file="QKnob" />

## 用法

默认情况下，QKnob 继承当前的文本颜色（作为圆弧进度条颜色和内部标签颜色）和当前的字体大小（作为组件大小）。您可以使用 size 和 color 相关的属性来自定义。

### 基础

<doc-example title="基础" file="QKnob/Basic" />

### 展示值

在下面的示例中， `show-value` 属性还启用了默认插槽，因此您可以用自定义内容填充它，甚至 QAvatar 或 QTooltip。`font-size` 属性是指内部标签的字体大小。

<doc-example title="展示值" file="QKnob/ShowValue" />

### 最大/小值

<doc-example title="自定义最大/小值" file="QKnob/MinMax" />

### 内部的最大/最小值 <q-badge align="top" color="brand-primary" label="v2.5.4+" />

有时您需要将模型值限制为轨迹长度内的范围。您可以通过 `inner-min` 和 `inner-max` 属性来实现，前者需要大于等于 `min` 属性，后者需要小于等于 `max` 属性。

<doc-example title="内部的最大/最小值" file="QKnob/InnerMinMax" />

### 自定义步长

<doc-example title="自定义步长" file="QKnob/Step" />

### 偏移角度

<doc-example title="偏移角度" file="QKnob/Angle" />

### 禁用和只读

<doc-example title="禁用和只读" file="QKnob/DisableReadonly" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QKnob 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="Native form" file="QKnob/NativeForm" />
