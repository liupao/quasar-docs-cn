---
title: Electron 应用图标
desc: (@quasar/app-webpack) 如何管理 Quasar 桌面应用的图标。
---

这些图像用于在操作系统的托盘，桌面，文件浏览器和相关应用商店中显示应用程序的图标。`icon.ico` 文件用于 Windows 中，`icon.icns` 文件用于 MacOS 中。如果您发现缺少了任何东西，可以向我们[报告](https://github.com/quasarframework/quasar/issues)。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## Icon Genie CLI

::: tip
我们强力推荐您去使用我们的 [Icon Genie CLI](/icongenie/introduction),因为它只需要一份资源图标，就能自动生成克隆、缩放、缩小图标，然后生成不同平台上需要的图标格式，并将其放置在合适的目录中。必要时，它还会告诉您需要向 `/src/index.template.html` 中添加哪些标签。
:::

使用 Icon Genie CLI 快速添加必要的图标。有关选项的完整列表，请访问[Icon Genie CLI 命令列表页面](/icongenie/command-list)。

```bash
$ icongenie generate -m electron -i /path/to/source/icon.png
```

## 手动说明

```
src-electron/
  icons/
    icon.ico
    icon.icns
    icon.png
```
