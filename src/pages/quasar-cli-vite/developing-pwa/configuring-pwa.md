---
title: 配置 PWA
desc: (@quasar/app-vite) 如何使用 Quaasr CLI 管理您的渐进式 Web（PWA）应用。
related:
  - /quasar-cli-vite/quasar-config-js
---

## Service Worker
给一个 Quasar 项目添加 PWA 模式后会自动创建一个 `/src-pwa` 目录，其中包含以下文件：

```bash
.
└── src-pwa/
    ├── register-service-worker.js  # （或 .ts） UI 代码管理 service worker
    ├── manifest.json               #  PWA 配置清单文件
    └── custom-service-worker.js    # （或 .ts）可选的自定义 service worker 文件
                                    # （仅在 injectManifest 模式中)
```

您可以随意修改这些文件，但要注意以下事情：

1. `register-service-worker.[js|ts]` 会被自动导入到应用中（就像 /src 中的文件一样）。它会注册 service worker（由 Workbox 创建，或者自定义，取决于 quasar.config.js > pwa > workboxPluginMode 配置），您可以在此监听 service worker 的事件。可以使用 ES6 的代码。
2. 如果 workbox 插件模式被设置为 "injectManifest"（quasar.config.js > pwa > workboxMode: 'injectManifest'），那么将会使用`custom-service-worker.[js|ts]` 作为 service-worker 文件，否则 Quasar 和 Workbox 会创建一个 service-worker 文件。
3. 仅在生产构建上运行 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 测试才会生效。

::: tip
阅读更多关于 `register-service-worker.[js|ts]` [的信息](/quasar-cli-vite/developing-pwa/handling-service-worker)。
:::

## quasar.config.js
在此可以配置 Workbox 的行为，也可以调整 manifest.json。

```js
pwa: {
  workboxMode: 'generateSW', // 或 'injectManifest'
  injectPwaMetaTags: true,
  swFilename: 'sw.js',
  manifestFilename: 'manifest.json',
  useCredentialsForManifestTag: false,
  extendGenerateSWOptions (cfg) {}
  extendInjectManifestOptions (cfg) {},
  extendManifestJson (json) {}
  extendPWACustomSWConf (esbuildConf) {}
}

sourceFiles: {
  pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
  pwaServiceWorker: 'src-pwa/custom-service-worker',
  pwaManifestFile: 'src-pwa/manifest.json',
}
```

您可能也希望修改 /src 中 UI 代码的 Vite 配置：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf) {
        if (ctx.mode.pwa) {
          // 对 ViteConf 进行操作
        }
      }
    }
  }
}
```

更多信息：[Workbox](https://developers.google.com/web/tools/workbox).

## 在 index.html 中添加 meta 标签

Quasar CLI 会动态的在 index.html 中添加 PWA 相关的 meta 标签，如果希望自定义这些标签，首先，需要在 `/quasar.config.js` 中禁用此行为：

```js
// quasar.config.js
pwa: {
  injectPwaMetaTags: false
}
```

然后，编辑 `/index.html` 文件。下面是 Quasra CLI 会注入的标签：

```html
<head>

  <% if (ctx.mode.pwa) { %>
    <meta name="theme-color" content="<%= pwaManifest.theme_color %>">
    <link rel="mask-icon" href="icons/safari-pinned-tab.svg" color="<%= pwaManifest.theme_color %>">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="msapplication-TileImage" content="icons/ms-icon-144x144.png">
    <meta name="msapplication-TileColor" content="#000000">
    <meta name="apple-mobile-web-app-title" content="<%= pwaManifest.name %>">
    <link rel="apple-touch-icon" href="icons/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="icons/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="icons/apple-icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-icon-180x180.png">
  <% } %>

</head>
```
注意，可以通过 `pwaManifest` 访问 PWA 的 manifest.json。

## 选择 Workbox 模式

Workbox 有两种选项：**generateSW** （默认）和 **injectManifest**。

通过 quasar.config.js 设置您想要的模式：

```js
// quasar.config.js

pwa: {
  workboxMode: 'generateSW',
  extendGenerateSWOptions (cfg) {
    // 调整 generateSW 模式下的配置
  }
}

pwa: {
  workboxMode: 'injectManifest',
  extendInjectManifestOptions (cfg) {
    // 调整 injectManifest 模式下的配置
  }
}
```

### generateSW

何时使用 generateSW：

* 您希望预缓存文件。
* 您有简单的运行时配置需求（例如：该配置允许您定义路由和策略）。

何时不使用 generateSW：

* 您希望使用其他的 Service Worker 特性（例如 web 推送）。
* 您希望导入其他脚本或添加其他逻辑。

::: tip
关于此模式有哪些可用 workboxOptions，请参考 [Workbox 网站](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)。
:::

### InjectManifest

何时使用 InjectManifest:

* 您希望对 service worker 有更多控制权。
* 您希望预缓存文件。
* 在路由方面，您有更复杂的需求。
* 您希望使用其他的 Service Worker 特性（例如 web 推送）。

何时不使用 InjectManifest:

* 您希望以最简单的方式将 service worker 添加到您的站点。


::: tip 提示
* 如果使用此模式，需要自行编写 service worker 文件（`/src-pwa/custom-service-worker.[js|ts]`）。
* 关于此模式有哪些可用 workboxOptions，请参考 [Workbox 网站](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.injectManifest)。
:::

下面的代码片段是自定义 service worker（`/src-pwa/custom-service-worker.[js|ts]`）的默认代码，它模仿 `generateSW` 模式的行为：


```js
/*
 * 此文件只有当
 * quasar.config.js > pwa > workboxMode 被设置为 "injectManifest"
 * 时才会被构建系统启用
 * （作为您的 service-worker）
 */

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'

self.skipWaiting()
clientsClaim()

// 与预缓存注入一起使用
precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

// 非 SSR 回退到 index.html
// 生产环境下 SSR 回退到 offline.html
if (process.env.MODE !== 'ssr' || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  )
}

```

## 配置 Manifest 文件
Manifest 文件位于 `/src-pwa/manifest.json`，您可以自由编辑它。

也可以通过 `/quasar.config.js` 实现在构建时动态的修改它：

```js
// quasar.config.js
pwa: {
  extendManifestJson (json) {
    // 修改 json 内容
  }
}
```

请在开始之前阅读 [manifest 配置](https://developer.mozilla.org/en-US/docs/Web/Manifest)。

::: warning
不需要编辑 `/index.html` 文件来链接 manifest 文件。 Quasar CLI 会帮您处理好这些事情。
::::

::: tip
如果您的 PWA 需要认证或者需要一个 Authorization 请求头，请将 quasar.config.js > pwa > useCredentialsForManifestTag 设置为 `true`，以便在 manifest.json 相关的 meta 标签中包括 `crossorigin="use-credentials"`。
::::

## PWA Checklist
更多信息： [PWA Checklist](https://web.dev/pwa-checklist/)

::: danger
不要在开发构建中运行 [Lighthouse](https://developers.google.com/web/tools/lighthouse/)，因为在这个阶段，代码没有进行优化，并嵌入了源代码映射（以及其他许多内容）。
更多信息请前往[集成测试](/quasar-cli-vite/testing-and-auditing)页面。
:::

## 重新加载 & 自动更新

**如果使用默认的 generateSW  模式**，Quasar CLI 已经配置了重新加载的逻辑，如果您不想在 service worker 更新时手动重新加载页面，那么您需要禁用此行为：

```js
// quasar.config.js
pwa: {
  extendGenerateSWOptions (cfg) {
    cfg.skipWaiting = false
    cfg.clientsClaim = false
  }
}
```
