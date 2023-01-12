---
title: 配置 Capacitor
desc: (@quasar/app-vite) 如何用 Quasar CLI 来管理您的 Capacitor 应用程序。
related:
  - /quasar-cli-vite/quasar-config-js
---

使用 Quasar CLI 来开发和构建一个移动应用程序。构建 SPA、PWA、Electron App 或移动 App 之间的区别只是由 "quasar dev" 和 "quasar build" 命令中的 "mode" 参数决定。

有两个配置文件对移动应用程序非常重要。接下来将逐一介绍。

## capacitor.config.json

对移动应用程序来说，最重要的配置文件是 `/src-capacitor/capacitor.config.json`。`/src-capacitor` 文件夹是一个 Capacitor 项目，所以请参考 [Capacitor 文档](https://capacitor.ionicframework.com) 来了解其中每个文件的作用。但现在，请花点时间阅读一下 [capacitor.config.json](https://capacitor.ionicframework.com/docs/basics/configuring-your-app/) 内容。

这个文件的一些属性将被覆盖，下面会有提到。

## quasar.config.js

在 `/quasar.config.js` 中，有两个地方可以为 Capacitor 配置 Quasar 的具体功能。

```js
return {
  capacitor: {
    // (可选!)
    hideSplashscreen: false, // 禁用 Quasar CLI 的自动隐藏闪屏功能

    // (可选!)
    capacitorCliPreparationParams: [ 'sync', ctx.targetName ],

    // (可选) 如果不存在，会使用 package.json 中的 name 字段
    appName: '...', // string
    // (可选) 如果不存在，会使用 package.json 中的 version 字段
    version: '...', // string
    // (可选) 如果不存在，会使用 package.json 中的 description 字段
    description: '...', // string
  }
}
```

还可以这样配置：

```js
return {
  framework: {
    config: {
      capacitor: {
        iosStatusBarPadding: true/false, // 在 iOS 移动设备上添加动态顶部填充物
      }
    }
  }
}
```

最后，还可以禁用或配置返回按钮 hook（用于对话框）：

```js
return {
  framework: {
    config: {
      capacitor: {
        // Quasar 处理应用退出的后退按钮。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 另一方面，以下是完全禁用 Quasar 的返回按钮管理。
        backButton: true/false
      }
    }
  }
}
```

如果想篡改 /src 中 UI 的 Vite 配置：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf) {
        if (ctx.mode.capacitor) {
          // 用 ViteConf 做一些事情
        }
      }
    }
  }
}
```
