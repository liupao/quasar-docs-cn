---
title: SSR 处理404和500错误
desc: (@quasar/app-vite) 在Quaasr的服务端渲染中处理通用的404和500的HTTP错误
---

处理SSR模式的404和500错误的方式与其他的模式（SPA等）有些不同，如果你打开了`/src-ssr/middlewares/render.js`，你会发现以下代码：

```js
// src-ssr/middlewares/render.js

// 这个中间件需要在最后执行
// 因为他会捕获所有路由，并使用Vue渲染页面

export default ({ app, resolve, render, serve }) => {
  // 我们捕获所有的Express路由然后处理它
  // 通过Vue和Vue Router去渲染页面
  app.get(resolve.urlPath('*'), (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    render({ req, res })
      .then(html => {
        // 发送渲染好的html页面给客户端
        res.send(html)
      })
      .catch(err => {
        // 处理渲染页面时发生的异常

        // 重定向到另一个URL
        if (err.url) {
          if (err.code) {
            res.redirect(err.code, err.url)
          }
          else {
            res.redirect(err.url)
          }
        }
        // 处理404请求，Vue Router没有找到的路由
        else if (err.code === 404) {
          // 只有当/src/routes中没有定义"catch-all"路由时才会到达这里
          res.status(404).send('404 | Page Not Found')
        }
        // 我们也可以处理其他类型的错误
        // 如果处于开发模式，我们可以使用Quasar CLI
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

上面的部分是在捕获其他可能的请求（如/public目录、manifest.json和service worker等）之后编写的。这是我们使用Vue和Vue Router渲染页面的地方。


## 注意事项

我们将讨论一些你需要注意的架构决策。选择最适合你的应用程序的内容。

### 404错误

如果你在 Vue 路由 `/src/router/routes.js` 文件中定义了等效的404路由。（如下所示），则上述示例中的 `if (err.code === 404) {` 部分将永远不会触发，因为 Vue Router 已经处理了它。


```js
// Vue Router 捕获404的示例
{ path: '/:catchAll(.*)*', component: () => import('pages/Error404.vue') }
```

### 500错误

上述的`/src-ssr/middlewares/render.js`中可以看到，当服务端发生了渲染错误时，会返回一个简单的字符串给客户端('500 | Internal Server Error')，如果你想定制一个漂亮的错误页面代替：

1. 在 `/src/router/routes.js` 文件中添加一个特殊的路由，例如：
  ```js
  { path: 'error500', component: () => import('pages/Error500.vue') }
  ```
2. 编写一个Vue组件来处理这个页面，示例： `/src/pages/Error500.vue`
3. 然后修改 `/src-ssr/middlewares/render.js` ：
  ```js
  if (err.url) { ... }
  else if (err.code === 404) { ... }
  else {
    // 捕获到一个500错误;
    // 准备重定向到第一步中定义的"error500"路由
    res.redirect(resolve.urlPath('error500'))
    // 记得挂载在 publicPath 下
    // keep account of publicPath though!
  }
  ```

::: danger
你必须保证渲染'/error500'路由的时候不会发生500错误，否则，你的程序将进入无线循环。
:::

避免这种情况的完美方法是直接从 `/src-ssr/middlewares/render.js` 文件中返回500错误页的HTML（作为字符串）：


```js
res.status(500).send(`<html>....</html>`)
```
