---
title: 图标精灵命令行
desc: Quasar 图标工具（图标精灵命令行工具），支持 100 多种格式，一键给您的 app 生成所有图标和启动页图片。
---

您可能像我们一样喜欢默认的 Quasar logo，但精致的图标是一个 app 的门面，您需要自己的 logo。

图标会用在不同场合：浏览器选项卡、桌面、手机主屏幕、甚至在应用商店中。除此，各种尺寸的设备，有的横屏有的竖屏，都需要启动页图片的图片。

这意味着您需要 100 多个不同大小的 logo，它们要有特定的文件名，复杂的格式，要放在正确的目录里。可能还需要为 Cordova 加些 `<xml>` 声明。即使懂了规矩，实际操作起来，也是乏味且容易出错的。为了让您轻松些，我们做了 Icon Genie CLI 工具，好让原本累人的过程 **非常简单**。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## 原理

:::tip
我们强烈建议 **为您的 Quasar CLI 生成的项目** 使用 Icon Genie CLI 。提供一个初始的图标，就能自动复制、缩放、压缩、并放置到合适的目录里。它还会在合适的时候提醒您，`/src/index.template.html` 文件要添加哪些标签。
:::

## 要求

这个工具是由 Quasar 团队制作的，专用于 **Quasar CLI 工程结构** 的项目。如果您使用另一个 CLI 构建项目的目录，您应该研究下 Icon Genie 的 [配置文件](/icongenie/profile-files)。