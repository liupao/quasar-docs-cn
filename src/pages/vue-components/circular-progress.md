---
title: 圆形进度
desc: QCircularProgress Vue 组件显示一个彩色的圆形进度条。工具条可以有一个确定的进度值，也可以有一个不确定的动画。它可以用于通知用户在后台正在进行某个操作。
keys: QCircularProgress
related:
  - /vue-components/linear-progress
  - /vue-components/inner-loading
  - /vue-components/spinners
  - /vue-components/skeleton
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QCircularProgress 组件显示一个彩色的圆形进度条。工具条可以有一个确定的进度值，也可以有一个不确定的动画。它可以用于通知用户在后台正在进行某个操作。


## QCircularProgress API

<doc-api file="QCircularProgress" />

## 用法
默认情况下，QCircularProgress 会继承当前的文字颜色（作为进度条和标签的颜色）和当前的字体大小（作为组件的大小）。您也可以使用 props 来自定义他们。

<doc-example title="确定的值" file="QCircularProgress/Determined" />

<doc-example title="确定的值并反向" file="QCircularProgress/Reverse" />

<doc-example title="偏置角度" file="QCircularProgress/Angle" />

<doc-example title="自定义最大/最小值" file="QCircularProgress/CustomMinMax" />

下面的示例中，`show-value` 属性也会开启默认的插槽，所以您可以在其中放置自定义的内容，例如 QAvatar 或 QTooltip。`font-size` 属性会影响内部标签的字体。

<doc-example title="展示值" file="QCircularProgress/ShowValue" />

<doc-example title="不确定的状态" file="QCircularProgress/Indeterminate" />

<doc-example title="标准大小" file="QCircularProgress/StandardSizes" />
