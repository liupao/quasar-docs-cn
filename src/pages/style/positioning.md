---
title: CSS 定位工具类
desc: Quasar 提供了下述 CSS 工具类帮你定位 DOM。
related:
  - /style/typography
  - /style/visibility
  - /style/spacing
---

你可以轻松的时候 Quasar 提供的 CSS 工具类帮你实现元素定位。

| CSS 类名 | 描述 |
| --- | --- |
| `fullscreen` | 固定位置并且覆盖全屏幕 |
| `fixed` | 设置 `position` 为 `fixed` |
| `fixed-center` | 设置 `position` 为 `fixed`并且将元素相对浏览器居中 |
| `absolute` | 设置 `position` 为 `absolute` |
| `absolute-center` | 设置 `position` 为 `absolute`并居中（需要父元素设置 position 为 relative） |
| `fixed-top`, `absolute-top` | 固定/绝对定位到屏幕顶部  |
| `fixed-right`, `absolute-right` |固定/绝对定位到屏幕右边 |
| `fixed-bottom`, `absolute-bottom` |固定/绝对定位到屏幕底部 |
| `fixed-left`, `absolute-left` |固定/绝对定位到屏幕左边 |
| `fixed-top-left`, `absolute-top-left` |固定/绝对定位到屏幕左上角  |
| `fixed-top-right`, `absolute-top-right` |固定/绝对定位到屏幕右上角  |
| `fixed-bottom-left`, `absolute-bottom-left` |固定/绝对定位到屏幕左下角 |
| `fixed-bottom-right`, `absolute-bottom-right` |固定/绝对定位到屏幕右下角  |
| `fixed-full`, `absolute-full` |固定/绝对定位到屏幕的所有边 Fixed or absolute position to all screen edges |
| `relative-position` | 设置 `position` 为 `relative` |

## 对其
| CSS 类名 | 描述 |
| --- | --- |
| `float-left` | 浮动到左边  |
| `float-right` | 浮动到右边 |
| `on-left` | 在右边设置一个小尺寸的外边距，通常会用在 icon 组件上|
| `on-right` | 在左边设置一个小尺寸的外边距，通常会用在 icon 组件上  |

::: tip
相对于使用`float-left` 或 `float-right`来实现布局或对其，更推荐你使用 Quasar 提供的网格系统
:::

垂直方向对其:

| CSS 类名 | 描述 |
| --- | --- |
| `vertical-top` | 设置 `vertical-align` 为 `top` |
| `vertical-middle` | 设置 `vertical-align` 为 `middle` |
| `vertical-bottom` | 设置 `vertical-align` 为 `bottom` |
