---
title: Getting Started - Pick a Quasar Flavour
desc: 'Get started with Quasar by picking one of its flavours: Quasar CLI, Vue CLI or UMD'
---

使用 Quasar 有四种方法。选一个最适合你的：

<div class="q-mx-md row items-stretch q-gutter-xs">
  <q-btn no-caps color="purple" push stack padding="sm lg" to="/start/quasar-cli">
    <span class="text-bold">Quasar CLI (有 vite 和 webpack 两个版本)</span>
    <span style="font-size:0.8em">强烈推荐！</span>
  </q-btn>
  <q-btn label="UMD/Standalone" color="teal-6" no-caps push to="/start/umd" />
  <q-btn label="Vite plugin" color="teal-6" no-caps push to="/start/vite-plugin" />
  <q-btn label="Vue CLI plugin" color="teal-6" no-caps push to="/start/vue-cli-plugin" />
</div>

### Comparison

| 特性                                                                                    | Quasar UMD | Quasar CLI (with Vite or Webpack) | Quasar Vite Plugin                  | Vue CLI Plugin |
| ------------------------------------------------------------------------------------------ | -------    | ---------- | ---------------------------- | -------------- |
| 能够嵌入到现有项目中                                                 | **Yes**    | -          | **Yes, if it is Vite app**   | **Yes, if it is Vue CLI app** |
| 渐进式集成 Quasar                                                          | **Yes**    | -          | -                            | - |
| 从 CDN 引入 Quasar                                                            | **Yes**    | -          | -                            | - |
| 构建 SPA, PWA                                                                             | **Yes**    | **Yes**    | **Yes**                      | **Yes** |
| 构建 SSR (+ optional PWA client takeover)                                                 | -          | **Yes**    | -                            | Yes(*) |
| 构建手机 app 通过 Cordova 或者 Capacitor                                                 | **Yes**    | **Yes**    | Yes(*)                       | Yes(*) |
| 开发手机 app 时的热更新                                       | -          | **Yes**    | Yes(*)                       | Yes(*) |
| 构建桌面应用通过 Electron                                                            | -          | **Yes**    | Yes(*)                       | Yes(*) |
| 构建浏览器插件                                                                  | -          | **Yes**    | Yes(*)                       | Yes(*) |
| Quasar **应用扩展**                                                             | -          | **Yes**    | -                            | - |
| 轻松管理应用图标和启动动画通过[Icon Genie CLI](/icongenie/introduction) | -         | **Yes**    | -                            | - |
| 动态 RTL 支持                                                  | **Yes**    | **Yes**    | -                            | **Yes** |
| 生成自己的网站/应用 RTL 等价的 CSS           | -          | **Yes**    | -                            | **Yes** |
| **确保一切都是开箱即用**, 保证最新的 Quasar   | -      | **Yes**    | -                            | - |
| 构建模式之间的紧密集成，充分利用 Quasar 的所有功能。 | -      | **Yes**    | -                            | - |
| 一套代码构建 SPA, PWA, SSR,手机应用，桌面应用和浏览器插件        | -      | **Yes**    | -                            | - |
| Tree Shaking                                                                               | -          | **Yes**    | **Yes**                      | **Yes** |
| SFC (单页面组件)                                              | -          | **Yes**    | **Yes**                      | **Yes** |
| 通过动态 quasar.config.js 进行高级配置                                      | -          | **Yes**    | -                            | - |
|单元测试，端到端测试支持                                                          | -          | **Yes**    | **Yes**                      | **Yes** |
| TypeScript 支持                                                                         | -          | **Yes**    | **Yes**                      | **Yes** |
| **最佳和最受欢迎的选择!**                                                          |            | **YES!** |                             | |
|                                                                                            | Quasar UMD | Quasar CLI (with Vite or Webpack) | Quasar Vite Plugin                  | Vue CLI Plugin |


::: tip (*)注意⚠️!
虽然你可以直接通过`Vite`或`Vue CLI`和一些 Vue 社区构建的插件获得类似的多平台支持，但这些第三方的工具并没有与 Quasar 的组件紧密集成。因此，当你遇到这些第三方插件的问题时，你将不得不向每个插件的开发者的求助。有了 Quasar，你就有了一个一站式服务，以防出现任何问题。此外，Quasar CLI 确保应用程序在性能、项目规模和最佳实践方面都达到了最佳标准，这是别的工具无法提供的。
:::

### 推荐
让我们一起来尝试使用**Quasar's CLI**创建一个新的项目，你会得到极致的体验。

<q-btn push no-caps color="brand-primary" icon-right="launch" label="尝试 Quasar CLI" to="/start/quasar-cli" class="q-mt-sm q-mb-lg" />
