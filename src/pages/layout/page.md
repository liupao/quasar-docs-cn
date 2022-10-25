---
title: Layout Page
desc: How to use QPageContainer and QPage components. They define the contents of your Quasar app pages.
keys: QPage
related:
  - /layout/layout
---
我们将讨论在 QLayout 中封装页面。 如果尚未准备好，请先阅读  [QLayout](/layout/layout) 文档页面。

## QPageContainer API
<doc-api file="QPageContainer" />

## QPage API
<doc-api file="QPage" />

## 布局生成器
点击下面的按钮来搭建您的布局。

<q-btn push color="brand-primary" icon-right="launch" label="布局生成器" href="/layout-builder" target="_blank" rel="noopener noreferrer" />

## 用法

QPage 必须由 QPageContainer 封装，而 QPageContainer 又必须是 QLayout 的子节点。

```html
<q-layout>
  ...
  <q-page-container>
    <q-page>
      <!-- 页面内容 -->
    </q-page>
  </q-page-container>
  ...
</q-layout>
```
通常情况下，QPageContainer 是 Layout 模板的一部分（它只包含一个`<router-view/>`子元素），其内容进入/src/pages 下的单独 vue 文件中。 如果尚未了解，请阅读[使用布局和页面进行路由]](/layout/routing-with-layouts-and-pages)。

```html
<!-- 布局 vue 文件: -->
<q-layout>
  ...
  <q-page-container>
    <router-view />
  </q-page-container>
  ...
</q-layout>

<!-- 页面 vue 文件: -->
<q-page padding>
  <!-- 页面内容 -->
</q-page>
```

### 示例
::: tip
由于 QPageContainer 和 QPage 需要布局，并且默认情况下 QLayout 会管理整个窗口，因此出于演示目的，我们将使用容器化的 QLayouts。 但是请记住，这不代表您也需要将容器化的 QLayouts 用于 QPageContainer 和 QPage
:::

<doc-example title="基础" file="QPage/Basic" />

### Style-

QPage 需要 QLayout，因为 QLayout 控制页面的所有偏移量，并根据其 `view` 属性配置计算页眉/页脚/抽屉使用的空间。默认情况下，您的 QPage 组件上将设置一个 `min-height` CSS 属性，以确保内容始终填充屏幕，即使内容只有几行也是如此。

如果您想调整甚至删除此属性，可以使用 `style-fn` 属性来实现：

```html
<template>
  <q-page :style-fn="myTweak">...</q-page>
</template>

<script>
export default {
  // ...
  methods: {
    myTweak (offset) {
      // "offset" 是一个数字（像素），
      //它表示基于 QLayout "view" 属性配置的
      //屏幕上页眉+页脚的总高度

      // 这实际上是 Quasar 中默认的 style-fn 的功能如下
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    }
  }
}
</script>
```
