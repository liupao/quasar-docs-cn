---
title: 无限滚动
desc: QInfiniteScroll是一个可以在用户滚动页面时加载新内容的Vue 组件。
keys: QInfiniteScroll
related:
  - /vue-components/spinners
  - /vue-components/pull-to-refresh
  - /vue-components/intersection
  - /vue-components/virtual-scroll
---

QInfiniteScroll 组件可以在用户滚动页面时加载新内容。

## QInfiniteScroll API

<doc-api file="QInfiniteScroll" />

## 用法

::: tip
当剩下的像素少于 `offset`（默认值 = 500）像素时，无限滚动会提前加载新内容。如果您获取的内容的高度小于滚动目标容器在屏幕上的高度，则无限滚动将继续加载更多内容。 因此，请确保您加载了足够的内容
:::

::: tip
在您的 `@load` 函数中，完成数据加载后，请不要忘记调用传入的 `done()` 函数。
:::

滚动到底部以查看 QInfiniteScroll 的功能。

<doc-example title="基础" file="QInfiniteScroll/Basic" scrollable />

<doc-example title="自定义滚动的目标元素" file="QInfiniteScroll/Container" />

<doc-example title="反向（消息风格）" file="QInfiniteScroll/Reverse" scrollable />

### 提示

::: tip 滚动容器
关于 Quasar 如何决定滚动事件附加的目标容器，请阅读[这里](/vue-components/scroll-observer#确定滚动的容器)。
:::

* 当作为渲染页面的 Vue 组件的直接子元素时效果最佳
* 如果更改了此组件的父元素，请不要忘记在 QInfiniteScroll 的 Vue 引用上调用 `updateScrollTarget()`。
* 如果您需要指定滚动目标内部的某个元素（因为自动检测到的不是所需的元素），请在 `scroll-target` 属性中传递目标的 CSS 选择器（作为字符串）或 DOM 元素

::: warning
如果您使用了 `scroll-target` 属性来自定义滚动目标容器，那么必须确保此元素存在且可以溢出（他必须具有最大高度允许滚动溢出）。

如果滚动目标容器无法溢出，则会出现永久加载的情况。
:::

<doc-example title="在 QMenu 中使用" file="QInfiniteScroll/Menu" />
