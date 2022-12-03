---
title: 元素大小变化侦听器
desc: QResizeObserver是一个可以在监听到目标元素/组件的大小改变时触发一个事件的vue组件。
keys: QResizeObserver
related:
  - /vue-components/scroll-observer
---

QResizeObserver 是一个可以在目标元素/组件（QResizeObserver 的直接父元素）的大小改变时触发一个 `resize` 事件的 Quasar 组件。注意，虽然它的原理不是轮询，但是过度使用也会造成高性能开销。

## QResizeObserver API

<doc-api file="QResizeObserver" />

## 用法

<doc-example title="基础" file="QResizeObserver/Basic" />

请注意，QResizeObserver 被附加到 DOM 后会立即触发一次事件，因此您可以获得容器的初始大小。
