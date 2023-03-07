---
title: 开发时进行 API 代理
desc: (@quasar/app-webpack) Quasar 开发服务如何开启 API 代理。
related:
  - /quasar-cli-webpack/quasar-config-js
---

当开发时，我们常常需要访问后端提供的接口 API，我们可以让开发服务器将所有 API 请求代理到实际的后端。

例如，当您的 API 请求路径都是相对路径时，这就非常有用了，显然，这些相对路径的接口在开发环境下可能不存在。也就是说您可以使用代理 API 的方式创建与网站/应用部署时类似的环境。

为了配置代理规则，需要编辑 `/quasar.config.js` 文件中的 `devServer.proxy` 对象。您应该参考 [Webpack Dev Server Proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) 页面参考详细的用法，但是这里有一个简单的示例：

```js
// quasar.config.js

devServer: {
  proxy: {
    // 代理所有以 /api 开头的请求
    '/api': {
      target: 'http://some.api.target.com:7070',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```
上面的示例会将 `/api/posts/1` 请求代理到 `http://some.api.target.com:7070/posts/1`。