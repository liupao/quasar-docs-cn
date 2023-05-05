---
title: 图标精灵命令行
desc: Quasar 工具，支持 100 多种格式，一键给你的 app 生成所有图标和启动画面。
---

你喜欢默认的 Quasar logo，我们也是。精致的图标是一个 app 的门面，但制作它却是度日如年。如何用你自己的 logo 代替默认的？

图标会用在不同场合：浏览器选项卡、桌面、手机主屏幕、甚至在应用商店中。除此，各种尺寸的设备，有的横屏有的竖屏，都需要启动画面的图片。

这意味着你需要 100 多个不同大小的 logo，它们要有特定的文件名，复杂的格式，要放在正确的目录里。可能还需要为 Cordova 加些 `<xml>` 声明。即使懂了规矩，实际操作起来，也是乏味且容易出错的。为了让你轻松些，我们做了 Icon Genie CLI 工具，好让原本累人的过程 **非常简单**。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## 原理

:::tip
我们强烈建议 **为你的 Quasar CLI 生成的项目** 使用 Icon Genie CLI 。输入一个初始的图标，就能自动复制、缩放、压缩、并放置到合适的目录里。它还会在合适的时候提醒你，`/src/index.template.html` 文件要添加哪些标签。
:::

## 要求

这个工具是由 Quasar 团队制作的，专用于 **Quasar CLI 工程结构** 的项目。如果您使用另一个 CLI 构建项目的目录，您应该研究下 Icon Genie 的 [配置文件](/icongenie/profile-files)。