---
title: BEX 应用图标
desc: (@quasar/app-vite) 如何管理 Quasar 的浏览器插件（BEX）的应用图标。
---

为 BEX 模式生成用于各种浏览器和操作系统的特殊图标，构建出来的所有的图标都是有用的，如果您发现缺少了用于某个平台的图标，请 [提交一个 issue](https://github.com/quasarframework/quasar/issues)。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈推荐使用 [Icon Genie CLI](/icongenie/introduction)，您可以提供一个资源图标，使用它帮您生成所有需要的图标，并将其放在对应的目录中。同时还可以配置缩放，压缩，裁剪等功能。需要时它还会提醒将哪些标签添加到您的/index.html 文件中。
:::

通过 Icon Genie CLI 快速生成所需的图标，关于完整的命令列表和配置参数请移步 [Icon Genie CLI](/icongenie/command-list) 页面。

```bash
$ icongenie generate -m bex -i /path/to/source/icon.png
```

## 说明

```
src-bex/
  icons/
     icon-16x16.png   # Favicon on extension pages
     icon-48x48.png   # Extension management page
     icon-128x128.png # Installation and web store
```
