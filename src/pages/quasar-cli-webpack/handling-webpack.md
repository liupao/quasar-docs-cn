---
title: 处理 Webpack
desc: (@quasar/app-webpack) 如果管理 Quasar 项目的 Webpack。
related:
  - /quasar-cli-webpack/quasar-config-js
---

@quasar/app-webpack 采用 Webpack 作为构建系统，即使您对 webpack 不熟悉也不用担心，因为一切都是开箱即用的，Quasar 已经为您做好了相关的配置。

## quasar.config.js 的用法

如果需要修改默认的 Webpack 配置，那么您可以编辑 `/quasar.config.js` 文件中的 `build > extendWebpack (cfg)` 方法，或者 `build > chainWebpack (chain)`。

下面是一个为 Webpack 添加 ESLint loader 的示例（假设您已经安装了它）:

```js
// quasar.config.js
build: {
  extendWebpack (cfg, { isServer, isClient }) {
    cfg.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|quasar)/
    })
  }
}
```
注意，您不需要在此函数中返回任何东西，`extendWebpack(cfg)` 函数中的参数就是 Quasar 为您的项目生成的 Webpack 配置对象，如果需要修改 Webpack 配置，只需要对这个对象做出修改即可。

quasar.conf 中的 `chainWebpack()` 与它是等价的：

```js
// quasar.config.js
build: {
  chainWebpack (chain, { isServer, isClient }) {
    chain.module.rule('eslint')
      .test(/\.(js|vue)$/)
      .enforce('pre')
      .exclude
        .add((/[\\/]node_modules[\\/]/))
        .end()
      .use('eslint-loader')
        .loader('eslint-loader')
  }
}
```

::: tip
`chainWebpack()` 方法提供了一个 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 对象，相关信息请参考其文档页面。
:::

::: warning
`chainWebpack()` 会在 `extendWebpack()` **之前**被执行。

上面两个示例是等价的，不要同时使用两个方法修改同样的东西。
:::

## 调试 Webpack 配置
Quasar CLI 提供了一个有用的命令用于查看生成的 Webpack 配置。

```bash
$ quasar inspect -h

  描述
    查看 Quasar CLI 生成的 Webpack 配置。

  用法
    $ quasar inspect
    $ quasar inspect -c build
    $ quasar inspect -m electron -p 'module.rules'

  Options
    --cmd, -c        Quasar command [dev|build] (默认: dev)
    --mode, -m       应用开发模式 [spa|ssr|pwa|bex|cordova|capacitor|electron] (默认: spa)
    --depth, -d      深度 (默认: 5)
    --path, -p       Path of config in dot notation
                        Examples:
                          -p module.rules
                          -p plugins
    --help, -h       显示帮助信息
```

## Webpack 路径别名
Quasar 预设了一些常用的 Webpack 别名。您可以在项目的任意地方使用它们，Webpack 会将其处理为正确的路径。

| 别名 | 解析到 |
| --- | --- |
| `src` | /src |
| `app` | / |
| `components` | /src/components |
| `layouts` | /src/layouts |
| `pages` | /src/pages |
| `assets` | /src/assets |
| `boot` | /src/boot |
| `stores` | /src/stores (Pinia stores) |

此外，如果您配置了使用 Vue compiler 版本来构建（quasar.config.js > build > vueCompiler: true），那么 `vue$` 会解析到 `vue/dist/vue.esm.js`。

### 添加 Webpack 路径别名

您可以通过扩展 Webpack 配置来添加自定义的路径别名，并将其合并到已有的别名中，使用 `path.resolve` 来帮助解析路径：

```js
// quasar.config.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      extendWebpack (cfg, { isServer, isClient }) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // 保存已有的别名

          // 添加自定义别名，示例：
          myalias: path.resolve(__dirname, './src/somefolder'),
        }
      }
    }
  }
}
```

使用 `chainWebpack()` 的等价方式:

```js
// quasar.config.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      chainWebpack (chain, { isServer, isClient }) {
        chain.resolve.alias
          .set('myalias', path.resolve(__dirname, './src/somefolder'))
      }
    }
  }
}
```

## Webpack v5 兼容性问题
Quasar CLI 目前正在使用 Webpack v5。如果您从 Webpack v4 的项目迁移到 Quasar，可能会遇到与第三方库的兼容性问题。Webpack v5 删除了用于构建 Web 客户端的 Node.js 补丁。如果您正在使用依赖于 Node.js API 的包，则会出现错误提示缺少某些包。例如：`Buffer`, `crypto`, `os`, `path`, `stream`, `assert`。

这些问题需要由 npm 包的发布者解决。但是，如果您不想等待，只想运行您的应用程序/网站（有点风险），那么您可以手动安装 `node-polyfill-webpack-plugin`，并在 `quasar.config.js > build > chainWebpack` 中引用它。示例：

```js
// quasar.config.js
build: {
  chainWebpack (chain) {
    const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
    chain.plugin('node-polyfill').use(nodePolyfillWebpackPlugin)
  }
}
```

## Webpack loader
构建系统使用 Webpack，所以它依赖于使用 Webpack loader 来处理各种类型的文件（js，css，styl，scss，json，等等），默认情况下，Quasar 已经帮您配置好了大部分常用的 loader。

### 安装 loader

举个例子，假如您想导入 `.json` 文件。**Quasar 默认提供了 JSON 支持，因此实际上您不需要按照这些步骤操作，但是为了演示如何添加一个加载器，我们假装 Quasar 没有提供该支持。**

因为，您需要安装一个 loader 来处理 `json` 文件，您可以搜索 Google 查找您需要的 loader，在本例子中，我们需要 "json-loader"，首先要安装它：

``` bash
$ yarn add --dev json-loader
```

安装完成后，我们需要告诉 Webpack 来使用它，编辑 `/quasar.config.js` 文件，修改 `build.extendWebpack()` 函数在 `module/rules` 中添加新 loader：

```js
// quasar.conf
build: {
  extendWebpack (cfg) {
    cfg.module.rules.push({
      test: /\.json$/,
      loader: 'json-loader'
    })
  }
}
```

使用 chainWebpack() 的等价方法：

```js
// quasar.conf
build: {
  chainWebpack (chain) {
    chain.module.rule('json')
      .test(/\.json$/)
      .use('json-loader')
        .loader('json-loader')
  }
}
```

完成。

### PostCSS

`*.vue` 文件中的样式（以及所有其他样式文件）默认情况下都经过 PostCSS 处理，因此您不需要使用特定的 loader。

默认情况下，PostCSS 配置开启 Autoprefixer。如果需要，可以查看 `/.postcssrc.js` 进行调整。

### Pug
如果需要使用 pug ，首先您需要安装一些依赖：

```bash
$ yarn add --dev pug pug-plain-loader
```
然后通过 quasar.config.js 扩展 Webpack 配置：

```js
// quasar.config.js
build: {
  extendWebpack (cfg) {
    cfg.module.rules.push({
      test: /\.pug$/,
      loader: 'pug-plain-loader'
    })
  }
}
```

使用 chainWebpack() 的等价方法：

```js
// quasar.config.js
build: {
  chainWebpack (chain) {
    chain.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
        .loader('pug-plain-loader')
  }
}
```

### Coffeescript

如果您正在使用 Coffeescript，则需要禁用 ESLint 或告诉 ESLint 哪些 Vue 组件正在使用 Coffeescript。

请注意，`vue-loader` 使用 `lang="coffee"` 来标识正在使用 Coffeescript 的组件，但是 `lang="coffee"` 对于 ESLint 不可识别。幸运的是，ESLint（遵循传统的 HTML 方式）使用 `type="xxx"` 来标识脚本类型。只要 `<script>` 标记具有任何 `type` 不是 `javascript`，ESLint 就会将该脚本标记为非 javascript 并跳过对其进行 Linting。 Coffeescript 的约定是使用 `type="text/coffeescript"` 来标识自己。因此，在使用 Coffeescript 的 Vue 组件中，应同时使用 `lang` 和 `type` 以避免 ESLint 警告：

```html
<template>
  ...
</template>
<script lang="coffee" type="text/coffeescript">
  ...
</script>
```
