---
title: 开发时进行 API 代理
desc: (@quasar/app-vite) Quasar开发服务如何开启API代理。
related:
  - /quasar-cli-vite/quasar-config-js
---

当开发时，我们常常需要访问后端提供的接口 API，我们可以让开发服务器将所有 API 请求代理到实际的后端。

例如，当您的 API 请求路径都是相对路径时，这就非常有用了，显然，这些相对路径的接口在开发环境下可能不存在。也就是说您可以使用代理 API 的方式创建与网站/应用部署时类似的环境。

为了配置代理规则，需要编辑 `/quasar.config.js` 文件中的 `devServer.proxy` 对象，在底层使用了 `http-proxy` 来实现代理，完整的配置项列表请[参考](https://github.com/http-party/node-http-proxy#options)。

```js
// quasar.config.js

devServer: {
  proxy: {
    // 字符串匹配
    '/foo': 'http://localhost:4567',
    // 加上配置项
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    },
    // 正则匹配
    '^/fallback/.*': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/fallback/, '')
    },
    //  使用代理实例
    '/api': {
      target: 'http://jsonplaceholder.typicode.com',
      changeOrigin: true,
      configure: (proxy, options) => {
        // proxy 对象是 'http-proxy' 的一个实例
      }
    },
    // 代理 socket：
    '/socket.io': {
      target: 'ws://localhost:3000',
      ws: true
    }
  }
}
```
