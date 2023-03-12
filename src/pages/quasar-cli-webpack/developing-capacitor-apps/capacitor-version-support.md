---
title: Capacitor 版本
desc: (@quasar/app-webpack) Quasar 中支持的 Capacitor 版本。如何升级到较新的 Capacitor 版本。
---

官方支持的 Capacitor 版本是 v1、v2 和 v3。

## 升级 Capacitor

如果以前使用的是低版本的 Capacitor，而现在想升级到较新的版本，那么：

1. 删除 /src-capacitor/ios 和 /src-capacitor/android 文件夹，但要确保在这些文件夹中所做的任何改动，因为在第 4 步之后将不得不重做这些改动。
2. 修改 /src-capacitor/package.json 文件中 Capacitor 依赖版本（可以适当在下一个与所需的 Capacitor 版本有关的章节中阅读它们）。
3. 删除 yarn.lock/package-lock.json 文件后在 /src-capacitor 目录中运行 `yarn`/`npm install` 命令。
4. 在这一步中，将会安装好 Capacitor。现在可以运行 `quasar dev -m capacitor -T [ios|android]` 或者 `quasar build -m capacitor -T [ios|android]` 命令，这将在 iOS/Android 平台添加 Capacitor 相对应的升级版。

检查 Capacitor 本身的更新日志，看看它有哪些突破性的变化，也是明智之举。

## Capacitor v3

::: warning 已知问题
目前还不支持 HTTPS 开发服务器（通过 quasar.config.js > devServer > https: true 开启）。如果正在使用依赖于它的 Capacitor 插件，最好暂时保持使用 Capacitor v2。
:::

假设已经安装了 Capacitor 模式，在 /src-capacitor/package.json 文件中的依赖项应该是这样的：

```
dependencies: {
  "@capacitor/app": "^1.0.0",
  "@capacitor/cli": "^3.0.0",
  "@capacitor/core": "^3.0.0",
  "@capacitor/splash-screen": "^1.0.0"
}
```

`@capacitor/app` 和 `@capacitor/splash-screen` 是可选的，但如果安装了它们，就可以帮助 Quasar 实现一些 UI 功能。

## Capacitor v2

假设已经安装了 Capacitor 模式，在 /src-capacitor/package.json 文件中的依赖项应该是这样的：

```
dependencies: {
  "@capacitor/cli": "^2.0.0",
  "@capacitor/core": "^2.0.0"
}
```

## Capacitor v1

假设已经安装了 Capacitor 模式，在 /src-capacitor/package.json 文件中的依赖项应该是这样的：

```
dependencies: {
  "@capacitor/cli": "^1.0.0",
  "@capacitor/core": "^1.0.0"
}
```
