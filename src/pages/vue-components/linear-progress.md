---
title: 线性进度
desc: QLinearProgress Vue 组件显示一个彩色加载进度条。进度条可以有一个确定的进度，也可以有一个不确定的动画。它应该用于通知用户在后台正在进行某个操作。
keys: QLinearProgress
related:
  - /vue-components/circular-progress
  - /vue-components/inner-loading
  - /vue-components/spinners
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QLinearProgress 组件显示一个彩色加载进度条。进度条可以有一个确定的进度，也可以有一个不确定的动画。它应该用于通知用户在后台正在进行某个操作。

## QLinearProgress API

<doc-api file="QLinearProgress" />

## 用法

### 确定的数据状态
<doc-example title="确定的数据状态" file="QLinearProgress/Determinate" />

### 不确定的数据状态
<doc-example title="不确定的数据状态" file="QLinearProgress/Indeterminate" />

::: tip
对于不确定状态（上方）或查询状态（下方），您无需指定 value 属性。
:::

<doc-example title="查询状态" file="QLinearProgress/Query" />

### 反向

<doc-example title="反转进度条方向" file="QLinearProgress/Reverse" />

### 样式

<doc-example title="自定义高度" file="QLinearProgress/CustomHeight" />

<doc-example title="标准尺寸" file="QLinearProgress/StandardSizes" />

<doc-example title="条纹" file="QLinearProgress/Stripe" />

<doc-example title="黑色背景" file="QLinearProgress/OnDarkBackground" dark />

### 缓冲

<doc-example title="缓冲" file="QLinearProgress/Buffering" />

### 添加标签
要将标签添加到进度条，可以使用默认插槽。 请注意：
  - 用足够大的  `size` 以显示标签
  - 设置标签的文本颜色，以使其在填充和未填充区域均可见，或使用 `text-shadow` CSS，或使用 QBadge，以下示例所示:

<doc-example title="With a label" file="QLinearProgress/Label" />
