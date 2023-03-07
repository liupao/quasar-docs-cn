---
title: 处理静态资源
desc: (@quasar/app-webpack) Quasar 项目如何处理静态（assets 和 static）资源。
---
您会注意到在项目结构中我们有两个资源目录：`/public/` 和 `/src/assets/`。他们有什么区别？前者是纯静态资源，后者需要由构建工具打包处理后导入。

我们先讨论常规资源和静态资源的区别。

## 常规资源 - /src/assets
在 `*.vue` 组件中，所有的模板和 CSS 都会经过 `vue-html-loader` 和 `css-loader` 进行解析，在解析时会查找其中的资源链接。例如： 在`<img src="./logo.png">` 和 `background: url(./logo.png)`, `"./logo.png"` 中存在相对路径，它们会被 Webpack 解析成一个依赖模块。

因为 `logo.png` 不是一个 JavaScript，我们需要使用 `url-loader` 和 `file-loader` 来处理它，当将其转化为一个依赖模块。Quasar CLI 已经为您做好了相关的 Webpack  配置工作，所以您可以直接获得文件名哈希， base64 内联文件等功能，还可以直接使用相对路径，而不用担心部署问题。

由于这些资源可能在构建期间被内联/复制/重命名，因此它们可被看作是源代码的一部分。这也是为什么推荐您将其放在 `/src/assets` 目录下，与其他源码放在一起。实际上，甚至不需要将它们全部都放在 `/src/assets` 目录下，例如，您可以将每个组件需要用的资源跟组件放在一起。


### 资源解析规则

相对路径，例如：`./assets/logo.png`，会被解析为一个依赖模块。它们将根据您的 Webpack 输出配置将它们替换为自动生成的 URL。

前缀为 `~` 的 URL 会被视为模块请求，类似于导入 `require('some-module/image.png')`。如果要利用 Webpack 的模块解析，则需要使用此前缀。所以推荐您这样使用：`<img src="~assets/logo.png">`，注意其中的 `~` 前缀。


## 静态资源 - /public
绝对路径不会被构建工具处理（例如：`/logo.png` -- 其中 '/' 是您设置的 publicPath）这些资源应该放在 `public/` 目录中。这个目录中的内容不会被处理，在构建时会被简单的被复制到产物目录中。

Quasar 在内部有一些智能算法，可以确保无论您构建什么应用（SPA、PWA、Cordova、Electron），*只要它们不使用相对路径*，就可以正确引用静态数据。



```html
<!-- Good! -->
<img src="logo.png">

<!--
  BAD!
  不要这样做，如果修改了 vue router（hash/history）或 public 路径，就无法正常工作
-->
<img src="/logo.png">
```

::: tip Assets vs Statics
"assets" 目录中的文件，只有您在 vue 文件中引入并使用了的文件，才会被打包到构建产物中去。
而 "public" 目录中的文件在构建时全部都会被直接复制到构建产物中去。
:::

::: danger 警告
如果您不是构建 SPA/PWA/SSR 应用，那么 `/public/icons/*` 和 `/public/favicon.ico` 目录中的文件不会被构建到应用中，因为它们不会用于任何目的。例如，Electron 或 Cordova 应用程序不需要这些文件。
:::

## Vue 绑定动态资源

请注意，当您将资源的 "src" 属性绑定到 Vue 作用域中的变量时，它必须是一个来自 public 目录下的文件路径。原因很简单：URL 是动态的，Webpack 无法得知在您在运行时会引用什么资源，因此它不会处理这个 URL。

译者批注：这里只能引用 /public 下的文件，因为 /public 中的文件会在构建时无条件被复制到构建产物中去。

```html
<template>
  <!-- imageSrc 必须引用 /public 中的一个文件  -->
  <img :src="imageSrc">
</template>

<script>
export default {
  setup () {
    return {
      /*
        引用 /public 中的文件。
        注意，字符串不需要以斜杠开始（/）。
        译者批注：也不需要 /public
      */
      imageSrc: 'logo.png'
    }
  }
}
</script>
```

您可以在 Vue 中通过将 src 绑定到一个值来强制提供静态资源。而不是使用 `src="path/to/image"` ，请使用 `:src=" 'path/to/image' "` 或  `:src="imageSrc"` 。请注意，在第二个代码示例中在双引号内使用单引号的用法（已添加空格以在文档网站上突出显示 - 通常您不会需要这些空格）。

## 使用 javaScript 获取静态资源

为了使 Webpack 返回正确的资源路径，您需要使用 `require('./relative/path/to/file.jpg')`，它将由 `file-loader` 处理并返回已解析的URL。例如：

```js
computed: {
  background () {
    return require('./bgs/' + this.id + '.jpg')
  }
}
```

请注意，上面的示例将在最终构建中包括 `./bgs/` 下的每个图像。这是因为 Webpack 无法猜测哪些图像将在运行时使用，因此它会将它们全部包含进来。
