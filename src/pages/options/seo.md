---
title: SEO with Quasar
desc: 如何在 Quasar 中进行搜索引擎优化。
---

术语 SEO 指的是搜索引擎优化（Search Engine Optimization）。Quasar 也涵盖了这方面，通过[Quasar Meta Plugin](/quasar-plugins/meta)来帮助你进行搜索引擎优化

## Quasar Meta Plugin

[Quasar Meta Plugin](/quasar-plugins/meta)可以动态的改变页面的 title，`<meta>`标签，`<html>`和`<body>`标签的属性。添加/删除/修改 head 标签中的`<style>` ， `<script>`和`<noscript>`。

充分利用此功能并与**Quasar CLI**结合起来，可以对 **SSR（服务器端渲染）** 应用的 SEO 有非常好的效果。但是将其用于 SPA（单页应用程序）中没有太大意义，因为 SPA 的页面是运行时动态构建的，而不是由 Web 服务器直接提供。

::: tip 提示
Quasar 插件与 Quasar 有最紧密的集成，所以它与任何其他类似的解决方案相比都是最优的。
:::
