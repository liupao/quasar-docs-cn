---
title: SSR 生产环境导出
desc: (@quasar/app-webpack) 配置 Quasar SSR Web 服务器以适用于不同的平台，包括 serverless 架构。
---

::: danger 警告
* 您需要升级到 "@quasar/app-webpack" v3.2+ 才能使用此功能
* 此文件仅用于生产构建，而不是在开发过程中使用。
:::

请注意，生成的 `/src-ssr` 目录下包含一个名为 `production-export.js` 的文件。此文件定义了如何提供 SSR Web 服务器。您可以选择开始监听一个端口或为 serverless 基础架构提供处理程序。

> 此函数返回的任何内容（如果有）都将从构建产物中的 `dist/ssr/index.js` 文件中导出。

## 解析

`/src-ssr/production-export.[js|ts]` 文件是一个简单的 JavaScript 文件，它启动了您的 SSR Web 服务器，并定义了您的 Web 服务器导出的内容（如果有）。

``` js
// 可以导入一些东西（例如一些 serverless 的包）

export default ({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
  // 在此可以操作服务器的 app 对象
  // 将您想要导出的东西，return 出去（例如 serverless 的处理函数）
}
```

::: tip 提示
此函数返回的任何内容（如果有）都将从构建产物中的 `dist/ssr/index.js` 文件中导出。
:::

您可以使用 `ssrProductionExport` 将返回的函数包装起来，以获得更好的 IDE 自动补全和类型推导（需要 Quasar v2.3.1+）:

``` js
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
  // 在此可以操作服务器的 app 对象
  // 将您想要导出的东西，return 出去（例如 serverless 的处理函数）
})
```

## 参数

这里提到的是 ` production-export.js|ts` 文件中默认导出的函数接收的参数对象。

``` js
export default ({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
```

该对象的详细信息：

``` js
{
  app,     // Expressjs 的 app 实例（取决于您在 create()函数中的返回值）

  port,    // 在生产环境下，它等于
           //  process.env.PORT || quasar.config.js > ssr > prodPort
           // 在开发环境下，它等于 quasar.config.js > devServer > port

  isReady, // 调用时返回一个 Promise，当 app 准备好为客户端服务时 resolve

  ssrHandler,  // 预构建处理程序（如果 serverless 服务不需要特定方法来提供它）。
              // Prebuilt app handler if your serverless service
              // doesn't require a specific way to provide it.
              // 语法格式: ssrHandler (req, res, next)
              // 提示: 在在底层使用了 isReady()

  // 下面的内容都于 SSR middleware（中间件）中的参数一样
  // （请查看 ssr-middleware 文档页面）
  // 一般来说，您不需要使用这些
  // 如果需要的话，直接使用一个中间件代替即可
  resolve: {
    urlPath(path)
    root(arg1, arg2),
    public(arg1, arg2)
  },
  publicPath, // String
  folders: {
    root,     // String
    public    // String
  },
  render(ssrContext),
  serve: {
    static(path, opts),
    error({ err, req, res })
  }
}
```

## 默认内容

下面是 Quasar CLI 创建的项目中 `/src-ssr/production-export.js` 文件的默认内容：

```js
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ app, port, isReady }) => {
  return isReady().then(() => {
    app.listen(port, () => {
      console.log('Server listening at port ' + port)
    })
  })
})
```

## 用法

::: warning
* 如果您需要从`node_modules`中导入一个包，请确保将它安装在了"dependencies"依赖中，而不是"devDependencies"中。
* 一般不需要在此文件中调用中间件（但是也可以这样做），启用一个中间件更推荐使用[SSR Middlewares](/quasar-cli-webpack/developing-ssr/ssr-middleware) 方法代替，这样可以配置某些中间件只在开发或者生产环境下运行。
:::

### 监听一个端口

这是使用 Quasar CLI 在项目中添加 SSR 模式时获得的默认选项。它启动后会监听配置的端口号（process.env.PORT 或者 quasar.config.js > ssr > prodPort）。

``` js
// src-ssr/production-export.[js|ts]

import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ app, port, isReady }) => {
  // 等待 app 就绪（包括运行所有的 SSR 中间件）
  return isReady().then(() => {
    //  然后开始监听端口号
    app.listen(port, () => {
      // 准备就绪，开始为客户端提供服务
      console.log('Server listening at port ' + port)
    })
  })
})
```

### Serverless

如果您有一个 serverless 架构的基础设施，那么需要导出一个 handler 处理程序，而不是开始监听一个端口。

一般 serverless 服务需要我们提供：
``` js
module.exports.handler = __your_handler__
```
那么您需要做：

``` js
// src-ssr/production-export.[js|ts]

import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ ssrHandler }) => {
  // "ssrHandler" 是一个内置的 SSR serverless 处理函数 
  // 它会等待所有的中间件运行后再为客户端提供服务

  // 在此返回任何东西，都等于 module.exports.<key> = <value>
  return { handler: ssrHandler }
})
```

请注意，提供的 `ssrHandler` 是一个形式为 `(req, res, next) => void` 的函数。如果您需要导出形式为 `(event, context, callback) => void` 的处理程序，则很可能需要使用 `serverless-http` 包（请参见下面）。

#### 示例：serverless-http

``` js
// src-ssr/production-export.[js|ts]

import serverless from 'serverless-http'
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ ssrHandler }) => {
  return { handler: serverless(ssrHandler) }
})
```

#### 示例：Firebase function

``` js
// src-ssr/production-export.[js|ts]

import * as functions from 'firebase-functions'
import { ssrProductionExport } from 'quasar/wrappers'

export default ssrProductionExport(({ ssrHandler }) => {
  return {
    handler: functions.https.onRequest(ssrHandler)
  }
})
```
