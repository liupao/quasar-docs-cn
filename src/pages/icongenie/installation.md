---
title: 安装 Icon Genie CLI 
desc: 如何在你的开发机器上安装 Icon Genie CLI？
---

确保你的机器上已经安装了 Node.js >=12.22.1 和 NPM >=6.14.12。

::: warning
**不要使用 Node.js 的奇数版本，例如 13、15 等。** 因为这些版本是实验性质的，常常导致问题，所以我们没有测试。我们强烈建议使用 LTS 版本的 Node.js。
:::

请全局安装 Icon Genie CLI。不需要安装到项目目录中。

```bash
# Node.js >=12.22.1

$ yarn global add @quasar/icongenie
# 或
$ npm install -g @quasar/icongenie
```

这样就安装了 `icongenie` 命令行工具。

::: tip Windows 上的开发人员请注意
如果你遇到类似“pngquant failed to build”的错误，那么你还需要全局安装 windows-build-tools（`yarn global add windows-build-tools` 或 `npm install ——global windows-build-tools`)。然后转到 `C:\Users\<windows_username>\.windows-build-tools`，运行 `vs_BuildTools.exe`。选择 npm/yarn 和 python 来安装。完成此步骤后，可能需要重启电脑，之后就可以安装 `@quasar/icongenie`。
:::

## 安装技巧

如果你使用的是 Yarn，请确保 Yarn 的 [全局安装位置](https://yarnpkg.com/lang/en/docs/cli/global/) 在你的 PATH 环境中：
```bash
# ~/.bashrc 或类似的文件里
export PATH="$(yarn global bin):$PATH"
```

在 Windows 操作系统下，修改用户环境变量 PATH。如果你使用的是 yarn，请添加`%LOCALAPPDATA%\yarn\bin`。如果你使用的是 npm，请添加 `%APPDATA%\npm`。

## 升级到 Icon Genie v2

本节适用于那些一直使用 Icon Genie v1，现在升级到 Icon Genie v2 的人。

### NPM 包名更改

版本 1 是一个 Quasar 的 [应用扩展](/app-extensions/introduction)，所以要装到你的项目目录里。新版本（v2）是全局安装的，不需要本地安装。你的 CI/CD 也不需要它，因为它是一次性的，输出文件（图像）直接添加到你的项目目录。

因此，请从您的项目文件夹中卸载 Icon Genie v1：

```bash
# 在你的 Quasar CLI 项目目录里：
$ quasar ext remove @quasar/icon-genie
```

### 输入文件

版本 v1 时，只要两张图片：一个 app-icon.png 和一个 app-splashscreen.png（固定宽度和高度）。但版本 v2 不是这样。现在只要一个 png 文件（文件名随意），它要有透明度并且最小 64x64 像素（越大越好！——建议最小尺寸：1024x1024）。启动画面的图片可以不设，它是 PNG 格式，文件名不限，最小 128x128 像素，不过建议最小为 1024x1024 像素。

启动画面的工作方式也完全不同。它们将与可选背景顶部的图标一起生成。图标与宽度或高度（哪个较低）的大小比可以用 CLI 参数 (`--splashscreen-icon-ratio`) 调整。你甚至可以告诉 Icon Genie 这个比例为 0，这样它就不会将图标添加到背景的顶部。

### 输出文件

我们已经改进了生成的图标和启动画面，以符合最新的标准，并避免重复文件。因此，你将注意到一些旧文件不再生成，而一些则是全新的。Icon Genie 现在会适时地提醒你，需要向 `/src/index.template.html` 添加什么标签，**你可以把提示复制粘贴到相应位置**——请留意标签列表。

你也可以删除当前项目里的所有图标或启动画面图片，并让运行 Icon Genie v2。这样可以确保项目里所有的图片都是实际要用的。

## Icon Genie v2 有什么新功能

Icon Genie v2 已经彻头彻尾地重写了。

* Icon Genie 现在是独立的 CLI，而不是一个 Quasar 的应用扩展。
* 输入文件（图标和背景）可以随意取名，随意放置，也不强求固定的宽度和高度。从 v2.1 开始，输入的图标文件不必是相同的宽高。此外，图标文件现在自动裁剪。
* 你现在可以为输入的图标文件配置 padding 了。(v2.1+)
* 我们改进了生成文件列表，以匹配最新标准，并避免文件重复。
* 启动画面以更好的方式创建，图标位于背景顶部。图标具有任何你想要的大小比例，包括 0（意味着：“背景图像的顶部没有图标”）
* 新命令：[generate](/icongenie/command-list#generate)、[verify](/icongenie/command-list#verify) 和 [profile](/icongenie/command-list#profile)，每个都有自己的用途。
* `generate` 命令现在还会显示 `/src/index.template.html` 文件中需要什么标签。
* `verify` 命令可以检查每个文件是否在正确的位置，以及它的宽度和高度是否正确。
* 大量新参数：quality、svg-color、png-color、splashscreen-color、splashscreen-icon-ratio……查看 [指令列表](/icongenie/command-list)。
* 你现在可以为每个 Quasar 模式单独地控制资产文件（ico、 png、splashscreen……），每个都有自己的设置或参数。请查看 `——filter`、`——quality` 和所有颜色参数。一个很好的用例是 `.ico`文件。
* 现在可以通过 Icon Genie [配置文件](/icongenie/profile-files) 实现自动化。
* 现在可以通过 [配置文件](/icongenie/profile-files) 使用 Icon Genie API **自定义图像文件**。

最后，我们需要再次强调 `quality` 参数，它将决定你的图像有多好看以及有多大（KB）。
