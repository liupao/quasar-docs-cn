---
title: Quasar Vite 插件模式
desc: 将 Quasar 嵌入 Vite 应用。
components:
  - vite-plugin/VitePluginUsage
---

把 Quasar 嵌入现有的 [Vite](https://vitejs.dev) 项目，要根据下述指引安装并使用 `@quasar/vite-plugin`。Quasar 的 Vite 插件提供了开箱即用的摇树(Tree-Shaking)功能，并整合了 Quasar 的 Sass 变量。

::: warning 警告：请三思而后行
* 您确定要选择这种模式吗？本页面中介绍的只是 Vite 插件，该插件与我们完备的 [Quasar CLI + Vite 模式](/quasar-cli-vite)其实并不一样。
* Vite 插件不支持 SSR，且 SSR 只能通过 Quasar CLI + Vite 模式实现。
:::

> 社区里的插件为 Vite 提供了跨平台支持，但这些插件与 Quasar CLI 的整合程度不高，且存在一些问题。因此，建议大家使用 [Quasar CLI with Vite](/quasar-cli-vite)，这样才能获得最佳的开发体验。

## 创建 Vite 项目

``` bash
# yarn
$ yarn create vite my-vue-app --template vue

# 或 npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+，需要额外添加两条横线
npm init vite@latest my-vue-app -- --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

Vite 官方指南，详见 [Vite 官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)，了解如何搭建 Vite 项目。 **选择框架时，要选择 "Vue"。**

## 安装

进入 Vite 项目目录，安装所需的依赖包。

::: tip 提示
* 注意，`@quasar/extras` 是**可选的**。
* 此外，只有在使用 Quasar Sass/SCSS 时，才需要添加 `sass@1.32.0` (注意要指定版本)。
:::

``` bash
$ yarn add quasar @quasar/extras
$ yarn add -D @quasar/vite-plugin sass@1.32.0

# 或
$ npm install quasar @quasar/extras
$ npm install -D @quasar/vite-plugin sass@1.32.0

# 或
$ pnpm add quasar @quasar/extras
$ pnpm add -D @quasar/vite-plugin sass@1.32.0
```

## 使用 Quasar

我们创建了一个配置器，方便您尽快启动 Quasar 项目。

<vite-plugin-usage />

## RTL 支持

开启 RTL (右向左) 的排版方式，请参阅 [RTL 支持](/options/rtl-support)。

## 构建生产环境时的警告

构建生产环境时，您可能会看到如下警告。请放心忽略此警告信息，Vite 开发团队已经知道这个 [issue](https://github.com/vitejs/vite/issues/4625) 了。

```
warnings when minifying css:
 > <stdin>:32:0: warning: "@charset" must be the first rule in the file
    32 │ @charset "UTF-8";
       ╵ ~~~~~~~~
   <stdin>:9:0: note: This rule cannot come before a "@charset" rule
     9 │ .material-icons {
```
