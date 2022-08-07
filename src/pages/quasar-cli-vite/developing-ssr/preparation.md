---
title: 开发SSR的准备
desc: (@quasar/app-vite) 如何使用Quasar添加SSR模式
related:
  - /quasar-cli-vite/quasar-config-js
---

我们将利用Quasar CLI开发和构建SSR网站。构建SPA、Mobile App、Electron App、PWA或SSR之间的区别仅仅是由`quasar dev`和`quasar build` 命令中的`mode`参数决定的。

为了开发或建立一个SSR网站，我们首先需要将SSR模式添加到我们的Quasar项目中:

```bash
$ quasar mode add ssr
```
如果你想直接开始开发，也可以跳过"quasar mode"命令直接使用:

```bash
$ quasar dev -m ssr
```
这样，如果项目缺少 SSR 模式，则会自动添加后启动。

项目中会被新建一个目录，详情请参考[Configuring SSR](/quasar-cli-vite/developing-ssr/configuring-ssr)页面。

```bash
.
└── src-ssr/
    ├── middlewares/  # SSR middleware files
    └── server.js     # SSR webserver
```
