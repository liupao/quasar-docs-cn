---
title: Boot 启动文件
desc: (@quasar/app-vite) Quasar Boot 启动文件详解。
related:
  - /quasar-cli-vite/quasar-config-js
---

Quasar 的 boot （启动）文件会**在 Vue 根实例创建之前被执行**，通常可以用 boot 文件来注入一些依赖项（例如：注册全局组件，引入第三方库等）或者处理一些初始化工作。

由于 Quasar CLI 需要构建 SPA/PWA/SSR/Cordova/Electron 全平台兼容的代码，所以取消了传统 Vue 项目中的 `/main.js` 文件，为了解决这个问题，Quasar 提供了一种更优雅的方式让开发者可以定义一些启动文件来弥补缺少 `/main.js` 文件带来的影响。

在早期的 Quasar 版本中，要在实例化根 Vue 实例之前执行一些代码，可以将其添加到 `/src/main.js` 文件中。

这种方法存在一个主要问题。 随着项目的不断发展，你的 `main.js` 文件非常容易混乱，变得难以维护，这与 Quasar 者鼓励开发者编写易维护且优雅的跨平台应用程序的理念相违背。

然而使用启动文件，可以将每个依赖项分解为单独的、易于维护的文件。 还可以轻易禁用/启动某个启动文件，甚至可以通过 `quasar.config.js` 配置来确定哪些启动文件可以进入构建。

## boot 文件解析

一个 boot 文件就是一个简单 JavaScript 文件，可以选择在其中导出一个函数。Quasar 会在应用启动时调用这个函数并传入一个**对象参数**，其对象参数如下：

| 属性名 | 描述 |
| --- | --- |
| `app` | Vue 应用实例 |
| `router` | 来自 'src/router/index.js' 的 Vue Router 实例  |
| `store` | Pinia 或 Vuex 实例，**只有您的项目中使用了 Pinia（带有 src/stores 目录） 或 Vuex（带有 src/stores 目录） 时才可访问这个参数**  |
| `ssrContext` | 只能在 SSR 的服务端能访问，[请参考](/quasar-cli-vite/developing-ssr/ssr-context) |
| `urlPath` |  URL 的路径名（路径+搜索）部分；在客户端（仅在客户端），它也包含哈希值。 |
| `publicPath` | 配置的公共路径。 |
| `redirect` | 重定向到另一个 URL 的函数。可接受一个字符串（URL 路径）或 Vue 路由位置对象参数。 |

```js
export default ({ app, router, store }) => {
  // something to do
}
```

boot 文件也可以是异步函数：

```js
export default async ({ app, router, store }) => {
  // something to do
  await something()
}
```

您可以使用 `boot` 函数包裹要返回的函数，以获得更好的 IDE 自动补全和代码提示体验（通过 Typescript 实现）：

```js
import { boot } from 'quasar/wrappers'

export default boot(async ({ app, router, store }) => {
  // something to do
  await something()
})
```

注意在示例中使用了 [ES6 的解构语法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment),这不是必须的，请自行斟酌是否使用。

您可能疑惑为什么需要导出一个函数，其实这是可选的，您也可以选择不导出任何内容，但是前提是您了解自己是否需要它：

```js
// default export 之外：
//  - 这里的代码会被立即执行:
//  - 这里很适合导入一些内容
//  - 这里无法访问 router, Vuex store, ...

export default async ({ app, router, store }) => {
  // export default 之内：
  //  - 这里的代码才能访问对象参数的内容，与您的 app 进行连接

  //  - 这里的代码可以进行异步工作 （使用 async/await 语法或者返回一个 Promise）

  //  - 这里的代码会被 Quasar CLI 在一个 app 的生命周期中的正确时间执行
  //  - 这里可以访问到已经完成初始化的路由实例 （对象参数中的 router 属性）
  //  - 这里可以访问到已经完成实例化的 Vuex 或 Pinia （对象参数中的 store 属性）
  //  - 这里可以访问到 Quasar 将会实例化的 Vue app（对象参数中的 app 属性）
  //  - **千万不要自己调用 "new Vue(app)"**
  //  - ……
}
```

## 什么时候使用 boot 文件
::: warning
请确保您已经了解了 boot 文件解决了什么问题，以及何时需要使用它们，以避免在不需要它们的情况下使用它们。
:::

Boot 文件实现了一个特殊的目的：它们的代码会在应用的根组件实例化**之前**运行，使得您可以访问某些变量，来初始化第三方的库、干预 Vue 路由、修改 Vue 原型或应用的根实例……

### boot 文件使用示例：

* 使用 `app.use()` 来安装第三方的 Vue 插件。
* 某些 Vue 插件使用时可能需要访问根实例上的数据来进行初始化，例如： [vue-i18n](https://github.com/kazupon/vue-i18n/).
* 通过 `app.mixin()` 添加一个全局的混合 （mixin）。
* 在 Vue app 实例上注入一些全局属性，例如，在使用选项式 API 时，您可以方便的使用 `this.$axios` 避免在每个文件中都导入 Axios。
* 扩展路由，例如，使用 `router.beforeEach` 来验证是否登录认证。
* 扩展 Pinia 或者 Vuex，例如使用 `vuex-router-sync` 包。
* 引入并配置第三方库，例如：为 Axios 创建一个带基础请求路径的实例，然后将其注入到 vue 原型上或者将其导出。

### 一些不适合使用 boot 文件的案例
* 对于像 Lodash 这样的纯 JavaScript 库，在使用之前不需要任何初始化操作。那么除非您想将 Lodash 注入到 Vue 的原型上，然后在 Vue 文件中可以通过类似 `this.$_` 的方式来访问它，不然不需要使用一个 boot 文件来导入它。

## boot 文件的用法
第一布是生成一个新的 boot 文件，您可以通过 Quasar CLI 快捷帮您生成：

```bash
$ quasar new boot <name> [--format ts]
```

其中的 `<name>` 需要替换成合适的 boot 文件名称：

这个命令会创建一个带有如下内容的名为：`/src/boot/<name>.js` 的新文件：

```js
// 可以在这里导入一些东西

// "async" 是可选的，不需要的话可以删除它
export default async ({ /* app, router, store */ }) => {
  // something to do
}
```

您也可以在其中返回一个 Promise：

```js
// 可以在这里导入一些东西

export default ({ /* app, router, store */ }) => {
  return new Promise((resolve, reject) => {
    // do something
  })
}
```

::: tip
如果不需要访问 "app", "router", "store"…… 的情况下，默认导出是不必要的，可以将默认导出从 boot 文件中删除。
:::

现在可以根据启动文件的预期用途向该文件添加内容。

> 不要忘记默认导出的内容需要是一个函数。
> 然而，您也可以导出多个命名导出，供后续使用。您可以在您的项目中任意导入这些命名导出。

下一步是需要在 `/quasar.config.js` 文件中配置启用这个 boot 文件。

```js
boot: [
  // 引用 /src/boot/<name>.js
  '<name>'
]
```

当构建一个 SSR 应用时，您可能希望某些 boot 文件只运行在服务端，或者某些 boot 文件只运行在客户端，那么您可以这样做：

```js
boot: [
  {
    server: false, // 只在客户端运行
    path: '<name>' // 引用 /src/boot/<name>.js
  },
  {
    client: false, // 只在服务端运行
    path: '<name>' // 引用 /src/boot/<name>.js
  }
]
```
如果您想启用一个来自 node_modules 中的 boot 文件，您可以通过在路径前面加上  `~`（波浪号）字符来实现：

```js
boot: [
  // 来自 npm 中的 boot 文件
  '~my-npm-package/some/file'
]
```

如果你希望某个 boot 文件只在构建特定的开发模式时启用：

```js
boot: [
  ctx.mode.electron ? 'some-file' : ''
]
```

### 重定向到另一个页面

::: warning
重定向时请注意，因为您可能会将应用程序配置为无限重定向循环。
:::

```js
export default ({ urlPath, redirect }) => {
  // ...
  const isAuthorized = // ...
  if (!isAuthorized && !urlPath.startsWith('/login')) {
    redirect({ path: '/login' })
    return
  }
  // ...
}
```

`redirect()` 函数可接受一个字符串（URL 路径）或 Vue 路由位置对象参数。在 SSR 模式下，还能传递第二个参数来指定浏览器重定向的状态码（推荐使用 3xx）。

```js
// 示例传入一个 vue Router 路径：
redirect('/1') // 字符串
redirect({ path: '/1' }) // Vue Router 路由对象

// 重定向到一个 URL:
redirect('https://quasar.dev')
```

::: warning 重要！
传入的 Vue 路由信息（字符串或对象形式）不是指 URL 路径（和哈希），而是指您实际定义 Vue 路由。所以**不要添加 publicPath,如果您在使用 Vue Router 的哈希模式，也不要添加哈希值。

<br>假设我们定义了这个 Vue 路由：<br><br>

```js
{
  path: '/one',
  component: PageOne
}
```

<br>然后，**不管我们的 publicPath 是什么**，我们都可以这样调用 `redirect()`：<br><br>

```js
// publicPath: /wiki; vueRouterMode: history
redirect('/one') //正确方式
redirect({ path: '/one' }) //正确方式
redirect('/wiki/one') // 错误!

// publicPath: /wiki; vueRouterMode: hash
redirect('/one') //正确方式
redirect({ path: '/one' }) //正确方式
redirect('/wiki/#/one') // 错误!

// no publicPath; vueRouterMode: hash
redirect('/one') //正确方式
redirect({ path: '/one' }) //正确方式
redirect('/#/one') // 错误!
```
:::


如前几节所述，boot 文件的默认导出可以返回 Promise。如果此 Promise reject 了一个带 "url" 属性的对象,则 Quasar 会将用户重定向到该 url 上：

```js
export default ({ urlPath }) => {
  return new Promise((resolve, reject) => {
    // ...
    const isAuthorized = // ...
    if (!isAuthorized && !urlPath.startsWith('/login')) {
      // 这里的 url 参数，相当于上述的 "redirect" 的参数
      reject({ url: '/login' })
      return
    }
    // ...
  })
}
```

或者使用更简单的方式：

```js
export default () => {
  // ...
  const isAuthorized = // ...
  if (!isAuthorized && !urlPath.startsWith('/login')) {
    return Promise.reject({ url: '/login' })
  }
  // ...
}
```

### Quasar 项目的工作流程
为了更好的理解一个 boot 文件是什么以及它如何工作的，您需要了解您的项目的启动流程：

1. Quasar 初始化完毕（组件，指令，插件，Quasar i18n，Quasar 图标集）
2. 导入 Quasar 扩展包（Roboto 字体 -- 如果使用的话, 图标, 动画, ...）
3. 导入 Quasar CSS & global CSS
4. 加载 App.vue is （但是现在还不使用）
5. 导入状态管理 Store （如果使用了 Pinia 或 Vuex 的话）
6. Pinia （如果使用了的话）会被注入到 Vue app 实例中
6. 导入路由（在 src/router 目录下）
7. 导入 boot 文件
8. 路由的默认导出函数会被执行
9. boot 文件的默认导出函数会被执行
10. 导入 Electron 并注入到 Vue 原型上（如果是 Electron 模式）
11. 监听 "deviceready" 事件后在继续下一步 （如果是 Cordova 模式）
12. 使用根组件实例化 Vue 并挂载 DOM

## 一些 boot 文件示例

### Axios

```js
import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {

  // 在 Vue 文件中（选项式 API），我们可访问 this.$axios and this.$api
  app.config.globalProperties.$axios = axios
  // ^ ^ ^ 这样允许我们使用 this.$axios (Vue 选项式 API 格式)
  //       所以我们不需要要在每个 vue 文件中导入 axios

  app.config.globalProperties.$api = api
  // ^ ^ ^ 这样允许我们使用 this.$api (Vue 选项式 API 格式)
  //       我们可以更简单的请求数据
})

export { axios, api }
```

### vue-i18n

```js
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'
import messages from 'src/i18n'

export default boot(({ app }) => {
  // 创建 I18n 实例
  const i18n = createI18n({
    locale: 'en-US',
    messages
  })

  // 告诉 app 使用 I18n 实例
  app.use(i18n)
})
```

### 路由守卫认证
一些 boot 文件需要扩展 Vue Router 的配置：

```js
import { boot } from 'quasar/wrappers'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // 现在，您需要在此添加您的认证逻辑，例如去调用后端的 API
  })
})
```

## 访问 boot 文件中的数据
有时，您希望访问启动文件中配置的数据，这些数据位于您无权访问的 Vue 根实例中。

幸运的是，因为 boot 文件本质上只是普通的 JavaScript 文件，所以您可以向 boot 文件中添加任意多的命名导出。

让我们以 Axios 为例。有时您希望访问 J avaScript 文件中的 Axios 实例，但无法访问根 Vue 实例。要解决此问题，可以将 Axios 实例也在 boot 文件中导出，然后将其导入其他位置。

参考以下 axios 的 boot 文件：

```js
// axios boot file (src/boot/axios.js)

import axios from 'axios'

// 我们创建了一个 axios 实例，并设置了基础请求路径。
// 注意：我们不修改 axios 的配置，那么也不需要一个命令导出。只需要简单的导入 `import axios from 'axios'` 即可。
const api = axios.create({
  baseURL: 'https://api.example.com'
})

// 我们在 Vue 文件中可以通过 this.$axios and this.$api 来使用
// （仅限于使用选项式 API 时）
export default ({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
}

// 我们将 axios 和 api 命令导出，以供后续在其他的 .js 文件中使用：
export { axios, api }
```

在任意的 JavaScript 文件中，我们可以通过这样的方式导入上述 axios 实例：

```js
// 我们从  src/boot/axios.js 导入
import { api } from 'boot/axios'
```

进一步阅读语法：： [ES6 import](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import), [ES6 export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export).
