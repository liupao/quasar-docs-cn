---
title: 配置 Cordova
desc: (@quasar/app-vite) 如何使用 Quasar ClI 管理您的 Cordova 应用。
related:
  - /quasar-cli-vite/quasar-config-js
---

我们将使用 Quasar CLI（和 Cordova CLI）开发和构建移动 APP。构建 SPA，PWA，Electron 应用与移动 APP 之间的区别仅由 "quasar dev" 和 "quasar build" 命令中的 "mode" 参数决定。

有两个配置文件对您的移动 APP 非常重要。我们会逐一介绍。

## config.xml
您的移动 APP 最重要的配置文件是 `/src-cordova/config.xml`。`/src-cordova` 文件夹是 Cordova 项目的源代码，所以请参考 [Cordova 文档](https://cordova.apache.org/docs/en/latest/) 以了解每个文件的作用。但现在，请花一些时间阅读 [config.xml](https://cordova.apache.org/docs/en/latest/config_ref/).

我们将在下一节中看到该文件的一些属性将被覆盖。

## quasar.config.js
Quasar CLI 可帮助您自动设置移动 APP 的某些属性（从 config.xml 文件获取）：Cordova "id"、APP 版本(version)、说明(description）和 Android 系统的 versionCode。为了方便，我们只使用一个数据源。例如，要改变您的 APP 版本，您不需要同时修改的多个文件，这是容易出错的。

Quasar CLI 为了确定上面提到的每个属性的值：
1. 在 `/quasar.config.js` 中查找 "cordova" 对象。它有 "version", "description" 和/或 "androidVersionCode"吗？如果是的话，它会使用它们。
2. 如果没有，那么它会查看 `/package.json` 中的 "cordovaId", "version" 和 "description"字段。

```js
return {
  capacitor: {
    // 若未设置，将会查找 package.json > version
    version: '..', // string
    // 若未设置，将会查找 package.json > description
    description: '...', // string
    androidVersionCode: '..', // string

    /**
     * 即使考虑到 iOS-Cordova 问题，也启用 Xcode modern build，
     * 如果您明确知道自己需要它，那么可以将其开启，
     * 例如，如果您想在您的“build.json”文件中明确构建的类型。
     *
     * 默认值: false
     */
    noIosLegacyBuildFlag: true/false
  }
}
```

您可以配置的其他选项：

```js
return {
  framework: {
    config: {
      cordova: {
        // 在 iOS 移动设备上添加动态的顶部填充(top padding)
        iosStatusBarPadding: true/false,

        // Quasar 处理手机的返回按钮是否退出应用
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 相反，下面的配置会完全禁用 Quasar 对返回按钮的管理
        backButton: true/false
      }
    }
  }
}
```
如果您想修改 `/src` 中 UI 的 vite 配置：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf) {
        if (ctx.mode.cordova) {
          // 访问 ViteConf 来修改 vite 的配置
        }
      }
    }
  }
}
```
