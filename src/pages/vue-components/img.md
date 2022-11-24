---
title: QImg 图像组件
desc: QImg 组件可以很方便的处理响应式的图像（任何图片格式），并且还为其添加了很棒的加载效果以及许多其他特性，例如自定义长宽比等等。
keys: QImg
related:
  - /vue-components/spinners
  - /options/transitions
---

QImg 组件可以很方便的处理响应式的图像（任何图片格式），并且还为其添加了很棒的加载效果以及许多其他特性，例如自定义长宽比等等。

## QImg API

<doc-api file="QImg" />

## 用法

### Basic 基础

<doc-example title="基础" file="QImg/Basic" />

### 定义长宽比

<doc-example title="自定义长宽比" file="QImg/Ratio" />

### 字幕

<doc-example title="字幕" file="QImg/Caption" />

### 图片样式

在下面的例子中，我们添加了和深褐色的模糊效果。此外，我们还使用了 `rounded-borders` CSS 辅助类。

<doc-example title="自定义图片样式" file="QImg/CustomImageStyle" />

### Fit mode

There are multiple ways in which the image can be displayed through the `fit` property: 'cover', 'fill' (default), 'contain', 'none', 'scale-down'. It is basically the same thing as the CSS prop called [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

Some modes lead to empty space (horizontally or vertically) besides the image.

You can also configure the position through `position` property, which is equivalent to the CSS [object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) one. Its default value is "50% 50%".

<doc-example title="Fit modes" file="QImg/FitModes" />

### Loading states

<doc-example title="Loading state" file="QImg/LoadingState" />

When you have big-sized images, you can use a placeholder image (recommended to be specified in base64 encoding) like in the example below. The placeholder will be displayed until the target image gets loaded. We're toggling the QImg tag so you can see the placeholder image in action.

<doc-example title="Placeholder source" file="QImg/PlaceholderSrc" />

<doc-example title="Error state" file="QImg/ErrorState" />

### Responsive

::: warning
To grasp the `sizes` and `srcset` properties, please read about native support on [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Why_responsive_images) because **QImg relies on that entirely**.
:::

<doc-example title="Responsive" file="QImg/Responsive" />

::: tip
For `sizes` property, please read about Resolution Switching: [Different Sizes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes).
:::

::: tip
For `srcset` property, please read about Resolution Switching: [Same size, different resolutions](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions).
:::

### Render on demand

For browsers that natively support the [loading="lazy" DOM attribute](https://caniuse.com/loading-lazy-attr) you can take advantage of it. Quasar will use it and tell the browser to request the image and render it only if the image is currently being displayed on screen (or when it is scrolled into the screen).

One alternative is to use the [QIntersection](/vue-components/intersection) component as a wrapper or [Intersection](/vue-directives/intersection) directive.

<doc-example title="Native lazy loading" file="QImg/LoadingLazy" />

### No native context menu

In the example below we disable the native context menu on the images.

::: warning
When you are using this option always take care to have the content of the `default` or `error` slots wrapped in a `div` element, or add a `all-pointer-events` class on the element.
:::

<doc-example title="Native context menu" file="QImg/ContextMenu" />
