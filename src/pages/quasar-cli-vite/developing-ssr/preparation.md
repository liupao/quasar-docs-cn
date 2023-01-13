---
title: 开发 SSR 的准备
desc: (@quasar/app-vite) 如何使用 Quasar 添加 SSR 模式
related:
  - /quasar-cli-vite/quasar-config-js
---

我们将利用 Quasar CLI 开发和构建 SSR 网站。构建 SPA、Mobile App、Electron App、PWA 或 SSR 之间的区别仅仅是由`quasar dev`和`quasar build` 命令中的`mode`参数决定的。

为了开发或建立一个 SSR 网站，我们首先需要将 SSR 模式添加到我们的 Quasar 项目中:

```bash
$ quasar mode add ssr
```
如果您想直接开始开发，也可以跳过 "quasar mode" 命令，直接使用:

```bash
$ quasar dev -m ssr
```
这样，如果项目缺少 SSR 模式，则会自动添加后启动。

项目中会新建一个目录，详情请参考[配置 SSR](/quasar-cli-vite/developing-ssr/configuring-ssr)页面。

```bash
.
└── src-ssr/
    ├── middlewares/  # SSR middleware files
    └── server.js     # SSR webserver
```
