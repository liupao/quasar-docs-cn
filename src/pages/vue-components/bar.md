---
title: Bar
desc: QBar Vue 组件是一个小的顶部栏组件，在不同的平台上有不同的表现。
keys: QBar
related:
  - /quasar-cli-vite/developing-electron-apps/frameless-electron-window
  - /quasar-cli-webpack/developing-electron-apps/frameless-electron-window
---

QBar 组件是一个小的顶部栏组件，在不同的平台上有不同的表现，例如，在桌面应用上，它会有关闭，最小化，最大化等按钮来控制您的应用程序。

QBar 组件在无边框的 electron 应用中尤其有用，您可以将它集成到 QHeader 中。

## QBar API

<doc-api file="QBar" />

## 用法

::: tip
对于响应性，使用[Visibility](/style/visibility#Window-Width-Related)  Quasar 内置的 CSS 类。为了更好地调整，您可以编写自己的 CSS 媒体断点，或者使用[QResizeObserver](/vue-components/resize-observer)。
:::

### 样式

<doc-example title="MacOS 风格" file="QBar/MacOS" no-edit />

<doc-example title="Windows 风格" file="QBar/Windows" />

<doc-example title="iOS 风格" file="QBar/iOS" no-edit />

<doc-example title="Android 风格" file="QBar/Android" />

### 搭配其他组件

<doc-example title="QMenu" file="QBar/Menu" />

<doc-example title="QDialog" file="QBar/Dialog" />

<doc-example title="QHeader 和 QToolbar" file="QBar/Header" />

### 无边框 Electron 窗口
QBar 组件在开发 Electron 应用程序时非常方便，特别是当您选择使用无框架（frameless）窗口时。

关于[无边框 Electron 窗口](/quasar-cli/developing-electron-apps/frameless-electron-window) 。
