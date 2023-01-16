---
title: 开发 PWA 的准备工作
desc: (@quasar/app-vite) 如何使用 Quasar CLI 添加 PWA 模式。
related:
  - /quasar-cli-vite/quasar-config-js
---


我们将利用 Quasar CLI 开发和构建 PWA 网站。构建 SPA、Mobile App、Electron App、PWA 或 SSR 之间的区别仅仅是由 `quasar dev` 和`quasar build` 命令中的 `mode` 参数决定的。

为了开发或建立一个 PWA 网站，我们首先需要将 PWA 模式添加到我们的 Quasar 项目中:

```bash
$ quasar mode add pwa
```

如果您想直接开始开发，也可以跳过 "quasar mode" 命令，直接使用:

```bash
$ quasar dev -m pwa
```

这样，如果项目缺少 PWA 模式，则会自动添加后启动。

项目中会新建一个目录，详情请参考[配置 PWA](/quasar-cli-vite/developing-pwa/configuring-pwa) page)页面。

```bash
.
└── src-pwa/
    ├── register-service-worker.js  # （或 .ts） UI 代码管理 service worker
    ├── manifest.json               #  PWA 配置清单文件
    └── custom-service-worker.js    # （或 .ts）可选的自定义 service worker 文件
                                    # （仅在 injectManifest 模式中)
```

以上所有文件将在下一页中详细介绍，但主要概述如下：

* `register-service-worker.[js|ts]` 文件是 UI 代码的一部分，用于与 service worker 通信。
* `manifest.json` 是 PWA 的配置清单文件。
* 当使用 InjectManifest 模式时，您可以自定义 service worker (`custom-service-worker.[js|ts]`)。


可以通过 `/quasar.config.js` 文件来修改上述文件名称：

```js
// quasar.config.js

sourceFiles: {
  pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
  pwaServiceWorker: 'src-pwa/custom-service-worker',
  pwaManifestFile: 'src-pwa/manifest.json',
}
```
