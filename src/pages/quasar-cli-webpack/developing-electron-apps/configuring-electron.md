---
title: Electron 配置项
desc: (@quasar/app-webpack) 如何在 Quasar 项目中对您的 Electron 进行配置。
related:
  - /quasar-cli-webpack/quasar-config-js
---
我们会使用 Quasar CLI 来开发和构建 Electron 应用。使用 Quasar CLI 来构建不同类型（SPA、PWA、手机应用、Electron 应用）的项目对我们来说只是运行 "quasar dev" 和 "quasar build" 命令时传入的 "mode" 参数不同而已。

首先，我们先来学习如何针对 Electron 进行配置。

## quasar.config.js
您可能注意到了 `/quasar.config.js`  中有一个 `electron` 对象。

```js
// should you wish to change default files
// (notice no extension, so it resolves to both .js and .ts)
//您可以修改默认的文件
//注意不需要文件扩展名，它会自动去解析 .js 和 .ts
sourceFiles: {
  electronMain: 'src-electron/electron-main',
  electronPreload: 'src-electron/electron-preload'
},

// electron 配置项
electron: {
  bundler: 'packager', // 或 'builder'

  // electron-packager 配置项
  // https://electron.github.io/electron-packager/master/
  packager: {
    //...
  },

  // electron-builder 配置项
  // https://www.electron.build/configuration/configuration
  builder: {
    //...
  },

  // 当 electron packager 或 electron builder 在打包之前，
  //在 UnPackaged 目录中运行安装依赖命令（yarn/npm installing）时传入的额外参数
  // 示例: [ '--ignore-optional', '--some-other-param' ]
  unPackagedInstallParams: [],

  // 可选; 对生成的生产环境下的  package.json 进行修改
  extendPackageJson (pkg) {
    // 直接对 pkg 中的属性进行修改
    // 无需返回任何内容
  },

  // 可选项
  // 只对主进程生效的 webpack 配置对象 
  // (/src-electron/main-process/electron-main.js)
  extendWebpackMain (cfg) {
    // 直接对 cfg 中的属性进行修改
    // 无需返回任何内容
  },

  // 可选项；等价于 extendWebpackMain() 但是使用了 webpack-chain
  // 只对主进程生效的 webpack 配置对象 
  // (/src-electron/main-process/electron-main.js)
  chainWebpackMain (chain) {
    // chain 是一个 webpack-chain 实例，表示 Webpack 配置

    // 例如：
    // chain.plugin('eslint-webpack-plugin')
    //   .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  },

  // 可选项
  // 只对渲染进程生效的 webpack 配置对象 
  // (/src-electron/main-process/electron-preload.js)
  extendWebpackPreload (cfg) {
    // 直接对 cfg 中的属性进行修改
    // 无需返回任何内容
  },

  // 可选项；等价于 extendWebpackPreload() 但是使用了 webpack-chain 
  // 只对渲染进程生效的 webpack 配置对象 
  // (/src-electron/main-process/electron-preload.js)
  chainWebpackPreload (chain) {
    // chain 是一个 webpack-chain 实例，表示 Webpack 配置

    // 例如：
    // chain.plugin('eslint-webpack-plugin')
    //   .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  }
}
```
"packager" 对象中的配置项参考：[electron-packager options](https://electron.github.io/electron-packager/main/)。
但是，其中的 `dir` 和 `out` 配置项会被  Quasar CLI 重写以确保更好的集成。

"builder" 对象中的配置项参考：[electron-builder options](https://www.electron.build/configuration/configuration).

## Packager vs. Builder
您可以选择 packager 或 builder 其中的一个作为 Electron 应用的打包工具。它们都是优秀的开源项目，但它们满足的需求略有不同。使用 packager，您将能够从一台机器上为所有主要平台构建未签名的项目（有一些限制）。如果您想要简单又直接的帮您的项目打包成各平台主流的安装包格式，那么请使用 builder，但是 builder 无法在一台电脑上进行交叉编译（或者也可能是我们没找对方式……）。
