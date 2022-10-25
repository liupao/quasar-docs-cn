---
title: SSR Middleware
desc: (@quasar/app-vite) Managing the SSR middleware in a Quasar app.
related:
  - /quasar-cli-vite/quasar-config-js
---

SSR middleware（中间件）文件用于：它们为运行 SSR 应用程序的 Nodejs 服务器添加额外的附加功能（Express.js 兼容的中间件）

利用 SSR 的 middleware 文件可以将中间件的逻辑拆分到独立的文件中，易于维护。可以通过`quasar.config.js` 来配置禁用某些中间件，或者根据上下文环境来判断启用哪些中间件。


::: tip 提示
关于更高级的用法，你需要熟悉[Expressjs API](https://expressjs.com/en/4x/api.html)。
:::

::: warning 警告
至少需要一个处理 Vue 页面渲染的 SSR 中间件（这个中间件应该始终位于中间件数组的最后一个位置上）。当使用 Quasar CLI 添加 SSR 模式时，这个中间件会自动被创建到 `src-ssr/middlewares/render.js`中。
:::

## middleware 文件解析

一个 SSR middleware 文件是一个导出了一个函数的 javascipt 文件。Quasar 会在准备 Nodejs 服务器 (Expressjs)的时候调用这个被导出的函数，并额外传递一个对象作为参数（会在下一节详细介绍）

```js
// 在这里可以导入一些包

export default ({ app, port, resolve, publicPath, folders, render, serve }) => {
  // something to do with the server "app"
}
```

SSR middleware 文件中导出的函数也可以是异步的：

```js
// 在这里可以导入一些包

export default async ({ app, port, resolve, publicPath, folders, render, serve }) => {
  // something to do with the server "app"
  await something()
}
```
你可以使用`ssrMiddleware`函数将需要导出的函数包裹起来，这样你可以在 IDE 中获得 typescript 提供的类型推导以及代码补全等功能：


```js
import { ssrMiddleware } from 'quasar/wrappers'

export default ssrMiddleware(async ({ app, port, resolve, publicPath, folders, render, serve }) => {
  // something to do
  await something()
})
```

请注意我们在示例中使用了[ES6 的参数解构语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)，请自行斟酌是否需要解构这个对象参数。

## Middleware 对象参数解析

上面多次提到了 SSR middleware 的默认导出函数中，有一个对象参数，我们来解析一下它：

```js
export default ({ app, port, resolve, publicPath, folders, render, serve }) => {
```

Detailing the Object:

```js
{
  app, // Node.js app 实例
  port, // Nodej.js 服务器的端口号配置
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

#### app

他是 Node.js 的 app 实例，是所有中间件的基础设施，通过它来配置 Node.js 的 web 服务

#### port

为 Node.js webserver 配置的端口。

#### resolve

| 属性名 | 描述 |
| --- | --- |
| `urlPath(path)` | 当你定义一个路由时（通过 app.use(), app.get(), app.post()等），你需要使用`resolve.urlPath()`方法来设置路由的路径。这样才能将路由添加到配置的 pulicPath 中 (quasar.config.js > build > publicPath)。 |
| `root(path1[, path2, ...pathN])` | 解析 root 目录到指定目录的路径，低层使用了`path.join()`方法。 |
| `public(path1[, path2, ...pathN])` | 解析 public 目录到指定目录的路径，低层使用了`path.join()`方法。 |

#### publicPath

在 quasar.config.js > build > publicPath 中配置的 publicPath

#### folders

由于在开发环境下和生产环境下的 root 目录和 public 目录不同，你需要使用 folders 来帮你消除这些差异。

| 属性名 | 描述 |
| --- | --- |
| `root` | root 目录的绝对路径 (of the project in dev and of the distributables in production). |
| `public` | public 目录的绝对路径 |

#### render

* 语法： `<Promise(String)> render(ssrContext)`。
* 描述: 根据客户端请求的 URL 路径，使用 Vue 和 Vue Router 来渲染页面，并返回一个 html 字符串给客户端。


#### serve

serve.static():


* 语法: `<middlewareFn> serve.static(pathFromPublicFolder, opts)`
* 描述: 本质上，它是`express.static()`的一个封装，添加了一些方便了的调整：
  * 其中`pathFromPublicFolder`是可以直接使用的，从 public 目录解析的路径。
  * `opts`对象与的 `express.static()`配置对象相同。
  * `opts.maxAge`：在默认情况下，它是从 quasar.config.js > ssr > maxAge 中读取的配置，它定义请求返回的文件可以在浏览器的缓存中存活多久。

  ```js
  serve.static('my-file.json')

  // 等同于：

  express.static(resolve.public('my-file.json'), {
    maxAge: ... // quasar.config.js > ssr > maxAge
  })
  ```

serve.error():

* 语法: `<void> serve.error({ err, req, res })`
* 描述: 显示一组有用的调试信息（包括函数调用栈）。
* 只在开发环境下可用，**在生产环境下不可用**。

## SSR middleware 的用法

第一步是使用 Quasar CLI 生成一个新的 SSR  middleware 文件：

```bash
$ quasar new ssrmiddleware <name>
```

`<name>` 需要替换为任意的，合适的 SSR middleware 文件名称。

这个命令会出创建一个新的 `/src-ssr/middlewares/<name>.js`文件，并且其中带有一下内容：


```js
// 在这里可以导入一些包

// "async" 是可选的！
// 如果不需要的话可以移除它
export default async ({ app, port, resolveUrlPath, publicPath, folders, render, serve }) => {
  // 在这里可以使用"app"做一些事情
}
```

也可以返回一个`Promise`：

```js
// 在这里可以导入一些包

export default ({ app, port, resolve, publicPath, folders, render, serve }) => {
  return new Promise((resolve, reject) => {
    // 在这里可以使用"app"做一些事情
  })
}
```

现在可以根据 SSR 中间件文件的预期用途向该文件添加内容。

最后一步是告诉 Quasar 启用你创建的新的中间件文件，你需要将其文件名添加到`/quasar.config.js`配置文件的 ssr -> middlewares 数组中：

```js
// quasar.config.js

ssr: {
  middlewares: [
    // references /src-ssr/middlewares/<name>.js
    '<name>'
  ]
}
```

当构建一个 SSR 应用时，你可能希望某些中间件文件只运行在开发模式或者生产环境中，示例：
```js
// quasar.config.js

ssr: {
  middlewares: [
    ctx.prod ? '<name>' : '', // 只运行在生产模式下
    ctx.dev ? '<name>' : '' // 只运行在开发模式下
  ]
}
```
如果你想启用来自 node_modules 中的某个 SSR 中间件文件，可以在路径前加上 `~`：

```js
// quasar.config.js

ssr: {
  middlewares: [
    // 启用某个 npm 包中的中间件文件
    '~my-npm-package/some/file'
  ]
}
```

::: warning  警告

指定 SSR 中间件的顺序很重要，因为它决定了将中间件被 Nodejs 服务器调用的方式。因此，中间件的调用顺序会影响客户端得到的响应结果。
:::

## SSR 渲染中间件

::: danger 重要！
在所有的 SSR 中间中，只有这个 SSR 渲染中间件是必须的，因为它是 SSR 中实际使用 Vue 的渲染页面的中间件。
:::

下面的示例中，我们强调了这个中间必须位于中间件数组中的最后一个位置上。因为它会给客户端返回页面的 HTML（下面第二个示例），所以后续的中间件无法再修改请求的 headers（res.setHeader）。

```js
// quasar.config.js

ssr: {
  middlewares: [
    // ..... 其他的中间件

    'render' // 引用自 /src-ssr/middlewares/render.js;
             // 你可以将其名称修改为任何你喜欢的,
             // 只需确保他是此数组中的最后一个即可
  ]
}
```

现在，我们一起来看看它的内容：

```js
// src-ssr/middlewares/render.js

// 这个中间件需要在最后执行
// 因为他会捕获所有路由，并使用 Vue 渲染页面

export default ({ app, resolve, render, serve }) => {
  // 我们捕获所有的 Express 路由然后处理它
  // 通过 Vue 和 Vue Router 去渲染页面
  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    render({ req, res })
      .then(html => {
        // 发送渲染好的 html 页面给客户端
        res.send(html)
      })
      .catch(err => {
        // 处理渲染页面时发生的异常

        // 重定向到另一个 URL
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url)
          }
          else {
            res.redirect(err.url)
          }
        }
        // 处理 404 请求，Vue Router 没有找到的路由
        else if (err.code === 404) {
          // 只有当/src/routes 中没有定义"catch-all"路由时才会到达这里
          res.status(404).send('404 | Page Not Found')
        }
        // 我们也可以处理其他类型的错误
        // 如果处于开发模式，我们可以使用 Quasar CLI
        // 来显示一个带调用栈的漂亮的错误页面
        // 以及其他的提示信息
        else if (process.env.DEV) {
          // serve.error 只在开发模式下可用
          serve.error({ err, req, res })
        }
        // 当处于生产环境下时
        // 我们需要使用另一种方法通知客户端发生了错误
        // （出于安全的考虑，不能在生产模式下
        // 展示开发模式下同样的报错信息）
        else {
          // 渲染一个错误页面
          // 或者重定向到一个提前准备好的错误页面中
          // （提前定义在(/src/routes)中的错误页面）
          res.status(500).send('500 | Internal Server Error')
          // console.error(err.stack)
        }
      })
  })
}
```
注意在导出的函数中调用了`render`参数，那就是 SSR 中渲染的实现。

## Hot Module Reload

当开发时，只要你在 SSR 中间件文件中做出任何的修改，Quasar CLI 都会自动触发客户端资源的重新编译然后在 Node.js 的服务端 （Expressjs）应用中间件的修改。

## SSR 中间件示例

::: tip 提示
你可以使用任何连接 API 兼容的中间件。

You can use any connect API compatible middleware.
:::

### 日志/拦截器

所有的 SSR 中间件都是按照指定的顺序执行的（在 quasar.config.js > ssr > middlewares 中指定顺序），所以，第一个中间件很适合充当一个拦截器，它可以拦截所有的客户端请求：

```js
export default ({ app, resolve }) => {
  app.all(resolve.urlPath('*'), (req, _, next) => {
    console.log('someone requested:', req.url)
    next()
  })
}
```
