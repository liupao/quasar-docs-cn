---
title: 开发 BEX 的准备
desc: (@quasar/app-vite) 如何在一个 Quasar 应用中添加浏览器扩展模式（BEX）。
---

构建 SPA、Mobile App、Electron App、PWA、BEX 或 SSR 之间的区别仅仅是由 `quasar dev` 和 `quasar build` 命令中的 `mode` 参数决定的。

## 1. 添加 Quasar BEX 模式
为了构建一个 BEX，首先要在项目中添加 BEX 模式：

```bash
$ quasar mode add bex
```

如果您想直接开始开发，也可以跳过 "quasar mode" 命令，直接使用:

```bash
$ quasar dev -m bex
```

这样，如果项目缺少 BEX 模式，则会自动添加，项目中会新建一个 `src-bex` 目录。

::: tip 提示
`src-bex` 文件夹只是一个标准的浏览器插件项目文件夹，因此您可以像使用任何其他浏览器插件项目文件夹一样自由使用它。请参阅支持的浏览器插件文档以了解更多信息。

* [Firefox 浏览器插件文档](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
* [Google Chrome 浏览器插件文档](https://developer.chrome.com/extensions)
* **其他基于 Chromium 的浏览器** - 参考他们各自的文档。
:::

## 2. `src-bex` 解析

新文件夹具有以下结构:
```bash
.
└── src-bex
    ├── assets
    │   └── content.css       # CSS 文件，该文件通过 manifest.json 自动注入到目标网页中 
    ├── background.js         # 标准的 BEX 后台脚本文件，通过 manifest.json 自动注入
    ├── dom.js                # JS 文件，该文件被注入到 DOM 中，并提供一个与 BEX 通信的钩子
    ├── icons                 # 适用于所有平台的应用程序图标
    │   ├── icon-128x128.png  # 128px x 128px 的图标文件
    │   ├── icon-16x16.png    # 16px x 16px 的图标文件
    │   └── icon-48x48.png    # 48px x 48px 的图标文件
    ├── _locales              # 可选的，可以在 manifest 中定义的 BEX 区域文件
    ├── manifest.json         # 浏览器插件的 manifest 文件
    └── my-content-script.js  # 标准的 BEX 内容脚本，通过 manifest.json 自动注入
                              # 可以有多个内容脚本
```

下一节将更详细地讨论这些内容。
