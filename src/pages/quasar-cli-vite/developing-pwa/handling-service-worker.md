---
title: 处理 Service Worker
desc: (@quasar/app-vite) 如何在 Quasar 渐进式 Web 应用（应用）中配置 service worker 。
---

在这里，您将学习如何从网站/应用程序中与 Service Worker 进行交互。**请记住，必须通过 HTTPS 提供 service worker 服务**。

第一点很重要，您需要知道 Service Worker 运行在一个单独的线程中，但是您可以通过 `/src-pwa/register-service-worker.js` 使其与应用程序空间进行交互。

## 与 Service Worker 交互
注意，Quasar CLI 已经集成了 [register-service-worker](https://github.com/yyx990803/register-service-worker) npm 包，所以您不需要再手动安装它。

```js
// src-pwa/register-service-worker.js file

import { register } from 'register-service-worker'

register(process.env.SERVICE_WORKER_FILE, {
  ready (registration) {
    console.log('Service worker is active.')
  },

  registered (registration) {
    console.log('Service worker has been registered.')
  },

  cached (registration) {
    console.log('Content has been cached for offline use.')
  },

  updatefound (registration) {
    console.log('New content is downloading.')
  },

  updated (registration) {
    console.log('New content is available; please refresh.')
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (error) {
    console.error('Error during service worker registration:', error)
  }
})
```

::: tip
构建时 Quasar CLI 会将此文件与 `/src` 一起作为应用的一部分打包到构建产物中。所以您可以在其中使用 ES6，导入其他文件……
:::

## SSL 证书

您可能会注意到，在某些开发环境中，如果您不使用 HTTPS 服务，即使在本地主机上，Workbox 也不会在 `quasar dev` 期间加载 service worker，您会发现有两个脚本无法加载，Chrome 浏览器的控制台可能不会打印相关信息，但是 Firefox 浏览器的控制台会打印它们。有以下三种解决办法：
 - 设置 quasar.config.js > devServer > `https: true`
 - 设置从 localhost 到 127.0.0.1 的回环地址（但这不是没有安全隐患）。

当在 quasar.config.js 文件中设置  `devServer > https: true` 时，Quasar 会利用 vite 自动生成一个 SSL 证书。如果您希望使用自己的证书，请参考：[Filippo 的博客](https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/)。然后您的 `quasar.config.js > devServer > https` 应该像这样：

```js
// quasar.config.js

devServer: {
    htpps: {
      // Use ABSOLUTE paths or path.join(__dirname, 'root/relative/path')
      key: "/path/to/server.key",
      pfx: "/path/to/server.pfx",
      cert: "/path/to/server.crt",
      ca: "/path/to/ca.pem",
      passphrase: 'vite-dev-server' // do you need it?
    }
}
```

更多关于 Vite 和 Https 的信息参考[这里](https://vitejs.dev/config/#server-https).

## 重要的部署主机配置

不允许浏览器缓存 Service Worker 文件（默认为 `sw.js` ），这一点很重要。否则，应用的更新可能因为浏览器从缓存中加载 service-worker 而被忽略。

所以在部署的主机上，必须为 `sw.js` 文件添加 `"Cache-Control": "no-cache"` 响应头。

例如，使用 Google Firebase 部署时，需要在 `firebase.json` 中添加如下配置：

```json
{
  "hosting": {
    "headers": [
      { "source":"/sw.js", "headers": [{"key": "Cache-Control", "value": "no-cache"}] }
    ]
  }
}
```
