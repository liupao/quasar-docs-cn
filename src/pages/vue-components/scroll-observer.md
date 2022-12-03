---
title: 滚动监听器
desc: QScrollObserver是一个可以监听到用户滚动行为的Vue组件
keys: QScrollObserver
related:
  - /vue-components/resize-observer
---

QScrollObserver 是一个可以监听到用户滚动行为的 Quasar 组件。每当用户滚动页面，或者某个拥有 `.scroll` CSS 类名的元素溢出容器时它都会触发一个 `scroll` 事件。

## QScrollObserver API

<doc-api file="QScrollObserver" />

## 用法

滚动此页面以查看下面的示例。


<doc-example title="基础" file="QScrollObserver/Basic" />

## 确定滚动的容器

Quasar 的所有组件和指令都有一个简单的算法来确定它支持滚动的容器：
- 如果组件上有 `scroll-target` 属性，那么尝试使用其值作为滚动容器。
- 然后，它会查找一个拥有 `scroll`, `scroll-y` 或 `overflow-auto` 类名的父元素
- 如未找到，则考虑将滚动附加到 document 本身。

例如，[QScrollArea](/vue-components/scroll-area) 等组件都遵循这个设计，它们会嵌入一个 `scroll` 类，以便 QScrollObservable（或其他处理滚动的组件或指令）可以成功检测到它们并附加必要的事件。

请注意，如果元素没有产生溢出（例如：CSS `overflow: hidden`，或者高度不够），那么简单的附加 `scroll` 也不会有任何效果。

一个好的容器示例：

```html
<!--
  Quasar 的辅助 CSS  'overflow-hidden' 等于 style="overflow: hidden"
-->
<div class="scroll overflow-hidden" style="height: 100px">
  ... 内容高度需要大于容器高度的 100px ...
  <q-scroll-observer @scroll="scrollHandler" />

  <!-- 使用 `v-scroll` 指令的示例 -->
  <div v-scroll="scrollHandler">...</div>
</div>
```

QScrollArea 的另一个例子：

```html
<q-scroll-area style="width: 400px; height: 500px;" class="bg-yellow">
  ... 内容高度需要大于容器高度的 500px ...
  <q-scroll-observer @scroll="scrollHandler" />
</q-scroll-area>
```

## 水平
为了监听水平方向上的滚动，请使用 `axis="horizontal"` 属性：
```html
<q-scroll-observer axis="horizontal" @scroll="scrollHandler" />
```

## Layout 布局滚动
如果需要在布局页面上监听滚动，那么您可以考虑直接使用 [QLayout](/layout/layout)´ 组件的 `@scroll` 事件。
```html
<q-layout @scroll="scrollHandler">...</q-layout>
```
