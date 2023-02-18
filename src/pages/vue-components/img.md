---
title: QImg 图片组件
desc: QImg 组件可以很方便的处理响应式的图片（任何图片格式），并且还添加了一些很棒的新特性，例如加载效果、自定义长宽比等等。
keys: QImg
related:
  - /vue-components/spinners
  - /options/transitions
---

QImg 组件可以很方便的处理响应式的图片（任何图片格式），并且还添加了一些很棒的新特性，例如加载效果、自定义长宽比等等。

## QImg API

<doc-api file="QImg" />

## 用法

### 基础

<doc-example title="基础" file="QImg/Basic" />

### 定义长宽比

<doc-example title="自定义长宽比" file="QImg/Ratio" />

### 字幕

<doc-example title="字幕" file="QImg/Caption" />

### 图片样式

在下面的例子中，我们添加了和深褐色的模糊效果。此外，我们还使用了 `rounded-borders` CSS 辅助类。

<doc-example title="自定义图片样式" file="QImg/CustomImageStyle" />

### 图片适应模式

通过 `fit` 属性您可以有多种方式来设置图片的显示效果：'cover'，'fill' （默认），'contain'，'none'，'scale-down'。它基本上与 CSS 中的 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) 属性相同。

其中一些模式会导致图片周围出现一些空白。

您也可以通过 `position` 属性来设置图片的定位，它等价于 CSS 中的 [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) 属性，默认值为 "50% 50%"。

<doc-example title="图片适应模式" file="QImg/FitModes" />

### 加载状态

<doc-example title="加载状态" file="QImg/LoadingState" />

当您有大尺寸的图片时，可以先使用一个占位符图片（建议在 base64 编码中指定），等待图片完全加载完毕后再显示真正的图片，如下例所示。

<doc-example title="占位符资源" file="QImg/PlaceholderSrc" />

<doc-example title="加载错误状态" file="QImg/ErrorState" />

### 响应式

::: warning
为了更好的理解 `sizes` 和 `srcset` 属性，请参考[原生组件对响应式图片的支持](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Why_responsive_images)，**因为 QImg 完全依赖于它**。
:::

<doc-example title="响应式" file="QImg/Responsive" />

::: tip
基于 `sizes` 属性的分辨率切换方案，请参考：[设置不同的尺寸](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes)。
:::

::: tip
基于 `srcset` 属性的分辨率切换切换方案，请参考：[相同的尺寸，不同的分辨率](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions)。
:::

### 按需加载

在原生支持 [loading="lazy" DOM 属性](https://caniuse.com/loading-lazy-attr) 的浏览器上，只有当图像当前显示在屏幕上时（或当图像滚动到屏幕中时） Quasar 才会通知浏览器加载并渲染图片。

另一个方案是使用 [QIntersection](/vue-components/intersection) 组件封装图片，或者使用 [Intersection](/vue-directives/intersection) 指令。

<doc-example title="原生按需加载" file="QImg/LoadingLazy" />

### 禁用原生的上下文菜单

在下面的示例中，我们禁用图像上的本地上下文菜单。

::: warning
使用此选项时，请将 `default` 或 `error` 插槽的内容包裹在 `div` 元素中，或在元素上添加一个 `all-pointer-events` 类。
:::

<doc-example title="Native context menu" file="QImg/ContextMenu" />
