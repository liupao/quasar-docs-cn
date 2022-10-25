---
title: Electron 和 Typescript
desc: (@quasar/app-vite) 如何在 Quasar 项目的 Electron 中使用 Typescript。
---

为了给 Electron 支持 TypeScript，您需要将 /src-electron 目录下的 `.js` 文件改为 `.ts` 文件，并做一些必要的 TS 代码修改。

::: tip
`electron-packager` 和 `electron-builder` 都导出了它们各自的类型文件。由于 `quasar.config.js` 文件代码提示和补全依赖于这些类型，所以当您安装了相应的包之后，`electron.packager` 和 `electron.builder` 属性才会得到相关的代码提示和补全。
运行 `quasar build -m electron` 命令时，它会先帮您安装 `electron.bundler` 指定的包。
:::
