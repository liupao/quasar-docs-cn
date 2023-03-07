---
title: 处理静态资源
desc: (@quasar/app-vite) Quasar 项目如何处理静态（assets 和 static）资源。
---
您会注意到在项目结构中我们有两个资源目录：`/public/` 和 `/src/assets/`。他们有什么区别？前者是纯静态资源，后者需要由构建工具打包处理后导入。

我们先讨论常规资源和静态资源的区别。

## 常规资源 - /src/assets
在 `*.vue` 组件中，所有的模板和 CSS 都会经过 `vue-html-loader` 和 `css-loader` 进行解析，在解析时会查找其中的资源链接。例如： 在`<img src="./logo.png">` 和 `background: url(./logo.png)`, `"./logo.png"` 中存在相对路径，它们会被 Vite 解析成一个依赖模块。

由于这些资源可能在构建期间被内联/复制/重命名，因此它们可被看作是源代码的一部分。这也是为什么推荐您将其放在 `/src/assets` 目录下，与其他源码放在一起。实际上，甚至不需要将它们全部都放在 `/src/assets` 目录下，例如，您可以将每个组件需要用的资源跟组件放在一起。

### 资源解析规则

相对路径，例如：`./assets/logo.png`，会被解析为一个依赖模块。它们将根据您的 vite 输出配置将它们替换为自动生成的 URL。


前缀为 `~` 的 URL 会被视为模块请求，类似于导入 `import 'some-module/image.png'`。如果要利用 Vite 的模块解析，则需要使用此前缀。所以推荐您这样使用：`<img src="~assets/logo.png">`，注意其中的 `~` 前缀。

## 静态资源 - /public
绝对路径不会被构建工具处理（例如：`/logo.png` -- 其中 '/' 是您设置的 publicPath）这些资源应该放在 `public/` 目录中。这个目录中的内容不会被处理，在构建时会被简单的被复制到产物目录中。

::: tip Assets vs Statics
"assets" 目录中的文件，只有您在 vue 文件中引入并使用了的文件，才会被打包到构建产物中去。
而 "public" 目录中的文件在构建时全部都会被直接复制到构建产物中去。
:::

::: danger
如果您不是构建 SPA/PWA/SSR 应用，那么 `/public/icons/*` 和 `/public/favicon.ico` 目录中的文件不会被构建到应用中，因为它们不会用于任何目的。例如，Electron 或 Cordova 应用程序不需要这些文件。
:::

## 更多关于 Vite

请阅读 [Vite 文档](https://vitejs.dev/guide/assets.html).
