---
title: SSR Webserver
desc: (@quasar/app-vite) Configuring the Quasar SSR webserver for different platforms, including a serverless architecture.
---

生成的文件中有一个`/src-ssr/server.js`文件。这个文件决定了您的 SSR 服务端是如何创建并运转的。您可以选择监听一个端口启动服务，或者为 serverless 提供一个 handler。

## 解析

`/src-ssr/server.[js|ts]`是一个简单的 JavaScript/TypeScript 文件，它可以启动您的 SSR 服务器，决定如何处理来自客户端的请求。


::: danger
`/src-ssr/server.[js|ts]`在开发环境和生产环境中都会运行，所以您要小心配置它。对于不同情况下做出不同的处理，可以使用 `process.env.DEV` 和 `process.env.PROD`来区分不同的环境。
:::

``` js
/**
 * 更多信息请参考：
 * https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-webserver
 *
 * 运行在 Node 环境上下文中
 */

/**
 * 确保在项目根目录下已经安装了依赖
 * 任何包都可以在此导入使用，并不局限于 express 和 compression。
 */
import express from 'express'
import compression from 'compression'

/**
 * 创建 web 服务并返回实例。
 *
 * If needed, prepare your webserver to receive
 * connect-like middlewares.
 *
 * 不能是异步的
 * Should NOT be async!
 */
export function create (/* { ... } */) {
  const app = express()

  // 在函数返回之前，将所有需要运行的中间件放在这里
  if (process.env.PROD) {
    app.use(compression())
  }

  return app
}

/**
 * 需要让 server 监听独立的端口，然后返回监听的实例
 *
 * 下反的"close()"函数中的"listenResult"参数来自于您在此返回的内容
 *
 * 对于生产环境下，您也可以将导出替换为一个为 serverless 准备的 handler
 */
export async function listen ({ app, port, isReady, ssrHandler }) {
  await isReady()
  return await app.listen(port, () => {
    if (process.env.PROD) {
      console.log('Server listening at port ' + port)
    }
  })
}

/**
 * 关闭 serve 然后释放资源
 * 在开发环境下只有在服务重启时才会被使用
 *
 * 若您需要使用上面的"listen()"函数返回的结果，可以使用"listenResult"参数
 *
 * 可以是异步的函数
 */
export function close ({ listenResult }) {
  return listenResult.close()
}

const maxAge = process.env.DEV
  ? 0
  : 1000 * 60 * 60 * 24 * 30

/**
 * 应返回一个为指定路径提供静态资源服务的中间件。
 */
export function serveStaticContent (path, opts) {
  return express.static(path, {
    maxAge,
    ...opts
  })
}

const jsRE = /\.js$/
const cssRE = /\.css$/
const woffRE = /\.woff$/
const woff2RE = /\.woff2$/
const gifRE = /\.gif$/
const jpgRE = /\.jpe?g$/
const pngRE = /\.png$/

/**
 * 为预加载的文件返回一个 HTML 格式的字符串（如果有的话）
 */
export function renderPreloadTag (file) {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`
  }

  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}">`
  }

  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  }

  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  }

  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`
  }

  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  }

  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  }

  return ''
}
```

::: tip
无论`listen()`返回什么，它都会作为最终打包出来的`dist/ssr/index.js`文件的导出值。所以，如果需要的话，您也可以返回一个为 serverless 架构准备的**ssrHandler**。
:::

## 参数解析

``` js
export function <functionName> ({
  app, port, isReady, ssrHandler,
  resolve, publicPath, folders, render, serve
}) => {
```

对象参数详细解析:

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

## 用法

::: warning
* 如果您需要从`node_modules`中导入一个包，请确保将它安装在了"dependencies"依赖中，而不是"devDependencies"中。
* 一般不需要在此文件中调用中间件（但是也可以这样做），启用一个中间件更推荐使用[SSR Middlewares](/quasar-cli-vite/developing-ssr/ssr-middleware) 方法代替，这样可以配置某些中间件只在开发或者生产环境下运行。
:::

### 替换 express.js

默认使用的 Nodejs 服务框框架是 Express.js，您可以使用任何连接 API 兼容的 Nodejs 服务端框架/库来替换它。只需要确保使用 yarn/npm 将它安装到项目中即可。

```js
// src-ssr/server.[js|ts]

import connect from 'connect'

export function create (/* { ... } */) {
  const app = connect()

  // place here any middlewares that
  // absolutely need to run before anything else
  if (process.env.PROD) {
    app.use(compression())
  }

  return app
}
```

### 监听一个端口

这是使用 Quasar CLI 在项目中添加 SSR 模式时获得的默认选项。它启动后会监听配置的端口号（process.env.PORT 或者 quasar.config.js > ssr > prodPort）。

``` js
// src-ssr/server.[js|ts]

export async function listen ({ app, port, isReady }) {
  await isReady()
  return await app.listen(port, () => {
    if (process.env.PROD) {
      console.log('Server listening at port ' + port)
    }
  })
}
```

### Serverless

如果您有一个 serverless 架构的基础设施，那么需要导出一个 handler 处理程序，而不是开始监听一个端口。

一般 serverless 服务需要我们提供：
``` js
module.exports.handler = __your_handler__
```
那么您需要做：

``` js
// src-ssr/server.[js|ts]

export async function listen ({ app, port, ssrHandler }) {
  if (process.env.DEV) {
    await isReady()
    return await app.listen(port, () => {
      if (process.env.PROD) {
        console.log('Server listening at port ' + port)
      }
    })
  }
  else {
    // 在开发模式下：
    // "ssrHandler"是一个预构建程序，他会等待所有的中间件在服务客户端之前运行。
    // "ssrHandler" is a prebuilt handler which already
    // waits for all the middlewares to run before serving clients


    // 您在这里返回的内容等价于 module.exports.<key> = <value>
    return { handler: ssrHandler }
  }
}
```
请注意：需要提供的`ssrHandler`是一个`(req, res, next) => void`格式的函数。

当您需要导出导出一个`(event, context, callback) => void`格式的函数时，可以看看`serverless-http`这个包，如下：

#### 示例: serverless-http

您需要手动安装`serverless-http`到项目中。

``` js
// src-ssr/server.[js|ts]

import serverless from 'serverless-http'
import { ssrProductionExport } from 'quasar/wrappers'

export async function listen (({ app, port, ssrHandler }) => {
  if (process.env.DEV) {
    await isReady()
    return await app.listen(port, () => {
      if (process.env.PROD) {
        console.log('Server listening at port ' + port)
      }
    })
  }
  else { // 生产环境下：
    return { handler: serverless(ssrHandler) }
  }
})
```

#### 示例： Firebase function

``` js
// src-ssr/server.[js|ts]

import * as functions from 'firebase-functions'

export async function listen (({ app, port, ssrHandler }) => {
  if (process.env.DEV) {
    await isReady()
    return await app.listen(port, () => {
      if (process.env.PROD) {
        console.log('Server listening at port ' + port)
      }
    })
  }
  else { // 生产环境下：
    return {
      handler: functions.https.onRequest(ssrHandler)
    }
  }
})
```
