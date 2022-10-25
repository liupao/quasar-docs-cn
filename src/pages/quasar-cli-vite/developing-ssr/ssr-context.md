---
title: The ssrContext Object
desc: (@quasar/app-vite) The ssrContext Object in Quasar SSR
---

`ssrContext` 是 SSR 的上下文对象，所有的 Vue 组件都使用它渲染。

## 用法

::: warning
`ssrContext`对象只在构建 SSR 时在服务端可用， (当 `process.env.SERVER === true`时)。
:::

可以在以下几个地方访问到它：[boot 文件](/quasar-cli-vite/boot-files)的函数参数中，[Vuex store](/quasar-cli-vite/state-management-pinia-vuex)和[Vue Router](/quasar-cli-vite/routing)初始化的函数中，[preFetch](/quasar-cli-vite/prefetch-feature)的函数参数中：

```js
// a boot file
export default ({ ..., ssrContext }) => { /* ... */ }

// src/router/index.[js|ts]
export default ({ ..., ssrContext }) { /* ... */ }

// src/store/index.[js|ts]
export default ({ ..., ssrContext }) { /* ... */ }

// with preFetch:
preFetch ({ ..., ssrContext }) { /* ... */ }
```

也可以在 Vue 组件中访问到 ssrContext 对象，下面分别有组合式 API，选项式 API 两个示例：

```js
// Composition API
import { useSSRContext } from 'vue'

export default {
  // ...
  setup () {
    // 只能在 SSR 的服务端调用它
    const ssrContext = process.env.SERVER ? useSSRContext() : null
    // ...do something with it
  }
}
```

```js
// Options API
export default {
  // ...
  created () { // 在其他的生命周期函数中也可以
    this.ssrContext
  }
}
```

## ssrContext 解析

```js
ssrContext: {
  req,        // Express.js 中的对象
  res,        // Express.js 中的对象
  $q,         // Quasar 的$q 对象
  state,      // Vuex 中的 state（只有当你使用了 Vuex store 时才有）

  nonce,      // 可选的 (optional to set it yourself)
              // 全局的 nonce"属性
              // The global "nonce" attribute to use

  onRendered, // 注册一个回调函数，将会在服务端渲染结束后调用
              //  app has been rendered with Vue. You might need this
              // to access ssrContext again after it has been fully processed.
              // Example: ssrContext.onRendered(() => { /* ... */ })

  rendered    // 可选的(optional to set it yourself)
              // Set this to a function which will be executed server-side
              // after the app has been rendered with Vue.
              // We recommend using the "onRendered" instead.
              //
              // Purpose: backward compatibility with Vue ecosystem packages
              // (like @vue/apollo-ssr)
              // Example: ssrContext.rendered = () => { /* ... */ }
}
```
关于"nonce"的更多信息可参考：[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce)。


`req` 和 `res` 是 Express.js 中的对象，例如，可以通过`req.url`拿到当前客户端请求的 URL。


::: tip 提示
可以自由的给 ssrContext 注入任何自定义的属性，但是不要篡改**以_(下划线)开头**的私有变量，例如：`_someProp`。
:::
