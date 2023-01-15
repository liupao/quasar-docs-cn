---
title: SPA 应用图标
desc: (@quasar/app-vite) 如何配置 Quasar 单页应用（SPA）的图标。
---

为 SPA 模式生成用于各种浏览器和操作系统的特殊图标，构建出来的所有的图标都是有用的，如果您发现缺少了用于某个平台的图标，请 [提交一个 issue](https://github.com/quasarframework/quasar/issues)。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈推荐使用[Icon Genie CLI](/icongenie/introduction)，您可以提供一个资源图标，使用它帮您生成所有需要的图标，并将其放在对应的目录中。同时还可以配置缩放，压缩，裁剪等功能。需要时它还会提醒将哪些标签添加到您的/index.html 文件中。
:::

通过 Icon Genie CLI 快速生成所需的图标，关于完整的命令列表和配置参数请移步 [Icon Genie CLI](/icongenie/command-list) 页面。

```bash
$ icongenie generate -m spa -i /path/to/source/icon.png
```

## 说明

```
public/
   favicon.ico
   icons/
      favicon-128x128.png
      favicon-96x96.png
      favicon-32x32.png
      favicon-16x16.png
```

需要将以下代码添加到 `/index.html` 中来引用这些图标：

```html
<link rel="icon" type="image/ico" href="favicon.ico">
<link rel="icon" type="image/png" sizes="128x128" href="icons/favicon-128x128.png">
<link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
```
