---
title: 加载器
desc: QSpinner 用于向用户显示当前正在进行的流程。这是一个重要的用户体验特性，它给用户一种系统在长期活动中继续工作的感觉，比如从服务器获取数据或进行一些繁重的计算。
keys: QSpinner,QSpinnerAudio,QSpinnerBall,QSpinnerBars,QSpinnerBox,QSpinnerClock,QSpinnerComment,QSpinnerCube,QSpinnerDots,QSpinnerFacebook,QSpinnerGears,QSpinnerGrid,QSpinnerHearts,QSpinnerHourglass,QSpinnerInfinity,QSpinnerIos,QSpinnerOrbit,QSpinnerOval,QSpinnerPie,QSpinnerPuff,QSpinnerRadio,QSpinnerRings,QSpinnerTail
related:
  - /vue-components/linear-progress
  - /vue-components/circular-progress
  - /vue-components/skeleton
  - /vue-components/inner-loading
  - /quasar-plugins/loading
  - /quasar-plugins/loading-bar
---

QSpinner 用于向用户显示当前正在进行的流程。这是一个重要的用户体验特性，它给用户一种系统正在加载一项长期活动的感觉，比如从服务器获取数据或进行一些繁重的计算。

## QSpinner API

<doc-api file="QSpinner" />

## Other Spinners API

::: tip
以下 API 也适用于除 QSpinner 之外的所有加载器。以 QSpinnerCube 为例。
:::

<doc-api file="QSpinnerCube" />

## 用法

<doc-example title="QSpinner" file="QSpinner/Default" />

在下面的示例中，将鼠标悬停在加载器上以查看其名称

<doc-example title="其他加载器" file="QSpinner/Others" />

<doc-example title="颜色" file="QSpinner/Color" />

请注意，默认情况下，QSpinner 和所有其他加载器继承父级的字体大小，并将其应用为其大小。

<doc-example title="大小" file="QSpinner/Size" />

<doc-example title="标准尺寸" file="QSpinner/StandardSizes" />
