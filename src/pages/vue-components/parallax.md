---
title: Parallax 视差
desc: QParallax是一个可以在页面中轻松实现视差滚动效果的Vue 组件。
keys: QParallax
related:
  - /vue-components/video
---

视差滚动是计算机图形学和网页设计中的一种技术，背景图像通过摄像机移动的速度比前景图像慢，在二维场景中创建一种深度错觉，并增加沉浸感。

QParallax 解决了很多问题，包括图像/视频的大小实际上可以小于窗口的宽度/高度。

## QParallax API

<doc-api file="QParallax" />

## 用法

::: tip 滚动的容器
请阅读[这里](/vue-components/scroll-observer#确定滚动的容器)来了解 Quasar 如何确定要附加滚动事件的容器。
:::

### 图像背景

<doc-example title="图像背景" file="QParallax/Image" />

### 视频背景

::: warning
在某些 iOS 平台上，原生 `<video>` 标签的自动播放功能可能存在问题。[参考](https://webkit.org/blog/6784/new-video-policies-for-ios/)。 QParallax 和 Quasar 不会以任何方式干扰客户端浏览器对 `<video>` 标签的能力/限制。
:::

::: warning
当在 QParallax 中使用 `video` 标签时，您**必须**提供 `width` 和 `height` 属性，以使 QParallax 正常工作，因为这种媒体具有固有的调整大小功能。 另外，请注意，只有在加载视频的元数据后，实际的视频宽度和高度才可用。
:::

<doc-example title="自定义视频背景高度" file="QParallax/Video" />

### 自定义速度

<doc-example title="自定义速度" file="QParallax/Speed" />

### 使用插槽

<doc-example title="使用插槽" file="QParallax/ScopedSlot" />
