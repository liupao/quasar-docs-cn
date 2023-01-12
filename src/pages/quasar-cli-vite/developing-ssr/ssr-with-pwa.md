---
title: SSR with PWA Client Takeover
desc: (@quasar/app-vite) 如何给 Quasar 的服务端渲染应用的客户端使用 PWA。
---

使用 Quasar CLI 您可以构建 SSR + PWA 组合的应用。为了给 SSR 应用开启 PWA，首先您需要编辑 `/quasar.config.js` ：

```js
// quasar.config.js
return {
  // ...
  ssr: {
    pwa: true
  }
}
```

**新客户端**的第一个请求将从 webserver 获取（ SSR 提供初始页面内容）。PWA 安装完成后就接管了客户端。所有后续的请求都将从缓存中获取（除非有一些自定义配置修改了这一点）。

> 更多关于 PWA 的信息，请参考 [PWA Introduction](/quasar-cli-vite/developing-pwa/introduction) 部分。
