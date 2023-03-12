---
title: 配置 BEX
desc: (@quasar/app-webpack) 如何使用 Quasar CLI 管理浏览器插件应用。
---

在配置任何内容之前，我们需要了解 BEX 的结构。BEX 可以是以下一项（或更多）：

1. 在浏览器中运行在自己的选项卡
2. 运行在 [开发者工具](https://developer.chrome.com/extensions/devtools) 窗口中。
3. 运行在一个[弹窗](https://developer.chrome.com/extensions/user_interface#popup) 中。
4. 作为[选项窗口](https://developer.chrome.com/extensions/options) 运行。
5. 在网页的上下文中运行（注入到网站中）。

不需要为每个类型都创建一个新的 Quasar 应用，因为一个  Quasar 应用可以运行在上述**所有**实例中。更多信息参考：[类型部分](/quasar-cli-webpack/developing-browser-extensions/types-of-bex)。

## Manifest.json

BEX 最重要的配置文件是 `/src-bex/manifest.json`。建议在开始项目之前阅读该文件的[说明文档](https://developer.chrome.com/extensions/manifest)。

创建 Quasar BEX 时，manifest 文件中已经为您添加了运行 BEX 所需的基本配置。这包括默认的后台脚本、内容脚本和一个 CSS 文件，该文件被注入到运行 BEX 的网页上下文中。

:::tip
请注意，`manifest.json` 文件在构建时会被修改，以便自动注入所需的 JavaScript 文件。
:::

## 后台和内容脚本

每个 BEX 的背后都有[内容脚本](https://developer.chrome.com/extensions/content_scripts)和后台脚本或 service-worker。最好在编写第一个 BEX 之前了解它们是什么。

概述：

* **后台脚本** - 运行在 BEX 自身的上下文中，可以监听所有可用的浏览器插件事件。*每个* BEX 只有一个背景脚本的实例。 
* **内容脚本** - 在网页的上下文中运行。每个选项卡都会有一个新的内容脚本实例。

::: tip 提示
给定在网页上下文中运行的内容脚本，这意味着只有与网页交互的 BEX 才能使用内容脚本。弹窗、选项和开发者工具中的 BEX **不会**有内容脚本。不过，它们都会有一个*后台脚本*。
:::

:::warning
如果你想要使用 [Manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/)，那么您需要使用 vite 版本的 Quasar CLI 代替 webpack 版本的 Quasar CLI。更多信息请参考：[这里](https://github.com/quasarframework/quasar/discussions/8844)
:::

## CSS
您希望在网页（而不是 Quasar 应用程序）中使用的任何样式都应包含在 `src-bex/assets/content.css` 中，因为该文件会自动注入 `manifest.json` 文件中。

::: warning 警告
它必须是原生的 CSS，因为它不会通过 Sass 进行预处理。
:::

## Hook 文件

在 Quasar BEX 中，您提供了 `background-hook.js`、`content-hook.js` 和 `dom-hook.js`。这些文件旨在为您提供访问桥梁，以弥合与 BEX 的每个层之间通信的差距。我们将在[下一节](/quasar-cli-webpack/developing-browser-extensions/bex-communication)中详细探讨它们。