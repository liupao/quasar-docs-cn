---
title: 应用路由
desc: (@quasar/app-vite) 如何在Quasar中使用Vue Router路由。
---
您会注意到您的 Quasar 项目中包含一个 `/src/router` 目录。这里包含您的网站/应用程序的路由配置：

* "/src/router/index.js" 文件中处理 Vue Router 的初始化工作
* "/src/router/routes.js" 文件中定义了您的网站/应用的路由表。

::: warning
Quasar 文档假设您已经熟悉了 [Vue Router](https://github.com/vuejs/vue-router)。
下面的内容描述了如何在 Quasar CLI 项目中使用路由。更多关于 Vue Router 本身的内容请参考： [Vue Router 文档](https://router.vuejs.org/)。
:::

您需要在 `/src/router/routes.js` 文件中导入您的网站/应用的页面和布局文件。更多信息参考 [使用页面和布局进行路由](/layout/routing-with-layouts-and-pages) 页面。

在使用 Vuex 时，不能直接从别的脚本中导入 store。但是在 `/src/router/index.js` 中的函数中，可以通过 store 参数访问它。例如，您可以利用 `Router.beforeEach` 来做登录验证。

```js
export default function ({ store /*, ssrContext */ }) {
  // ...
  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth) && !store.getters['auth/isSignedIn']) {
      next({ name: 'account-signin', query: { next: to.fullPath } })
    } else {
      next()
    }
  })
  // ...
}
```

::: tip
如果您在开发 SSR 应用，您还可以在此访问 [ssrContext](/quasar-cli-vite/developing-ssr/ssr-context) 对象（服务端）。
:::
