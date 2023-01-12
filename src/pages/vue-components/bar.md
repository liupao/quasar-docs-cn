---
title: Bar
desc: The QBar Vue component is used to create the top bar on different platforms.
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

### Styling

<doc-example title="MacOS style" file="QBar/MacOS" no-edit />

<doc-example title="Windows style" file="QBar/Windows" />

<doc-example title="iOS style" file="QBar/iOS" no-edit />

<doc-example title="Android style" file="QBar/Android" />

### With other components

<doc-example title="QMenu" file="QBar/Menu" />

<doc-example title="QDialog" file="QBar/Dialog" />

<doc-example title="QHeader with QToolbar" file="QBar/Header" />

### Frameless Electron Window
QBar 组件在开发 Electron 应用程序时非常方便，特别是当您选择使用无框架（frameless）窗口时。

关于 [Frameless Electron Window](/quasar-cli/developing-electron-apps/frameless-electron-window) 。
