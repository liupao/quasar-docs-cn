---
title: 交叉
desc: QIntersection是一个封装了Quasar的Intersection指令的vue组件。
keys: QIntersection
related:
  - /vue-directives/intersection
  - /options/transitions
---

QIntersection 组件本质上是 [Intersection 指令](/vue-directives/intersection)的封装，它的好处是可以自己处理状态（不需要您手动添加状态），并且可以有显示/隐藏的过渡效果。

但是，使用 QIntersection 的最主要的好处是，DOM 树释放了隐藏的节点，因此使用了尽可能少的内存，并使页面感觉非常流畅。此外，您还可以为包装器元素指定 `tag` 属性以满足自己的需要，从而消除另一个 DOM 节点。

它在底层使用了 [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)。

::: warning
并非所有浏览器都支持 Intersection Observer API。 大多数[现代浏览器](https://caniuse.com/#search=intersection)都可以，但是其他浏览器，如 IE 11 却没有支持。 如果需要支持较旧的浏览器，则可以安装和导入（在启动文件中）W3C官方的 [polyfill](https://github.com/w3c/IntersectionObserver)。

:::

## QIntersection API

<doc-api file="QIntersection" />

## 用法

::: warning
在大多数情况下，要求将 CSS 应用于 QIntersection 元素，以便在不渲染内部内容时将其用作必要的填充符。 这将提供平滑的滚动体验，因为不这样的话滚动将会不规律地跳跃。

需要的 CSS 属性示例，例如，固定高度或至少最小高度（甚至可能是固定宽度，如下面的示例所示，可以在同一行上显示多个 QIntersections）。
:::

::: danger
如果使用 `transition` 属性，则要求将内容包裹在一个且仅一个元素中。
:::

::: tip
在某些情况下，默认 viewport 不起作用。例如，当您的代码托管在 iframe（如 Codepen ）中时。这时您需要使用 `root` 属性。它允许您将 viewport 的替代项定义为根元素（通过其 DOM 元素）。记住根元素必须是被观察元素的祖先。
:::

### 基础

<doc-example title="Basic" file="QIntersection/Basic" scrollable no-edit />

### 过渡效果
在下面的示例中，我们使用了 Quasar 中的过渡效果。有关完整列表，请转到[过渡效果](/options/transitions)页面。

<doc-example title="过渡效果" file="QIntersection/Transition" scrollable no-edit />

<doc-example title="一个有过渡效果的列表" file="QIntersection/List" scrollable no-edit />

### 一次性

但是，仅触发一次就意味着您失去了释放 DOM 树的好处。无论可见性如何，内容都将保留在DOM中

<doc-example title="只触发一次" file="QIntersection/Once" scrollable no-edit />

下面的示例使用了 `root` 属性，因此可以在 Codepen 中使用（在 iframe 中）。

<doc-example title="Root viewport" file="QIntersection/Root" scrollable />
