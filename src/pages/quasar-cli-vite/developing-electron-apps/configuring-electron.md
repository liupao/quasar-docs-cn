---
title: Electron 配置项
desc: (@quasar/app-vite) 如何在Quasar项目中对您的Electron进行配置。
related:
  - /quasar-cli-vite/quasar-config-js
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

  inspectPort: 5858,

  extendElectronMainConf (cfg) {
    // 操作 Esbuild 打包 Electron 主进程的配置项
  },

  extendElectronPreloadConf (cfg) {
    // 操作 Esbuild 打包 Preload 主进程的配置项
  }
}
```
"packager" 对象中的配置项参考：[electron-packager options](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options)。
但是，其中的 `dir` 和 `out` 配置项会被  Quasar CLI 重写以确保更好的集成。

"builder" 对象中的配置项参考：[electron-builder options](https://www.electron.build/configuration/configuration).

如果您也想修改 渲染进程（/src 目录下的 UI 代码）的 Vite 配置项：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf) {
        if (ctx.mode.electron) {
          // 操作 ViteConf
        }
      }
    }
  }
}
```

## Packager vs. Builder
您可以选择 packager 或 builder 其中的一个作为 Electron 应用的打包工具。它们都是优秀的开源项目，但它们满足的需求略有不同。使用 packager，您将能够从一台机器上为所有主要平台构建未签名的项目（有一些限制）。如果您想要简单又直接的帮您的项目打包成各平台主流的安装包格式，那么请使用 builder，但是 builder 无法在一台电脑上进行交叉编译（或者也可能是我们没找对方式……）。
