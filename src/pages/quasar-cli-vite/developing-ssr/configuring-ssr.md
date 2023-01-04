---
title: 配置 SSR
desc: (@quasar/app-vite) 如何使用 Quasar CLI 管理你的 SSR 应用。
related:
  - /quasar-cli-vite/quasar-config-js
---

## quasar.config.js

这个文件是你配置 SSR 配置项的入口，例如，你可以指定客户端是使用 SPA(Single Page Application -- 默认值)接管还是由 PWA(Progressive Web App)接管。

```js
return {
  // ...
  ssr: {
    ssrPwaHtmlFilename: 'offline.html', // 不要使用 index.html 作为 name!
                                        // 否则会使 SSR 混乱

    extendSSRWebserverConf (esbuildConf) {},

    // 增/删/改最终构建出来的生产环境下的 package.json 的字段
    extendPackageJson (pkg) {
      // 直接对 pkg 对象做出修改不需要返回任何值
    },

    pwa: false,

    /**
     * 自己提供手动处理 store 中 state 序列化的方法
     * as window.__INITIAL_STATE__ to the client-side (through a <script> tag)
     * 通过<script>标签注入到客户端的 window.__INITIAL_STATE__
     * (需要 @quasar/app-vite v1.0.0-beta.14+)
     */
    manualStoreSerialization: false,

    /**
     * 手动注入 store 的 state 到 ssrContext.state
     * (需要 @quasar/app-vite v1.0.0-beta.14+)
     */
    manualStoreSsrContextInjection: false,

    /**
     * 手动处理 store 的水化（hydration）过程而代替 Quasar CLI 的水化过程
     * For Pinia: store.state.value = window.__INITIAL_STATE__
     * For Vuex: store.replaceState(window.__INITIAL_STATE__)
     */
    manualStoreHydration: false,

    /**
     * 手动调用$q.onSSRHydrated()，代替 Quasar CLI 做的
     * 这宣布客户端代码应该接管。
     * This announces that client-side code should takeover.
     */
    manualPostHydrationTrigger: false,

    prodPort: 3000, // 生产环境下 server 默认使用的端口号
                    // (如果在运行时指定了 process.env.PORT，则被取代)

    middlewares: [
      'render' // 添加自己的中间件时，保证'render'为最后一个
              // keep this as last one
    ]
  }
}
```

> 如果你配置了使用 PWA 接管客户端(这是一个杀手组合)，Quasar CLI 的 PWA 模式也会被安装。你可能也想看看[Quasar PWA](/quasar-cli-vite/developing-pwa/introduction)页面。但最重要的是，确保你阅读了[SSR with PWA](/quasar-cli-vite/developing-ssr/ssr-with-pwa)页面。


你可能也想为`/src`下的 UI 修改 Vite 的配置：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf, { isClient, isServer }) {
        if (ctx.mode.ssr) {
          // do something with ViteConf
        }
      }
    }
  }
}
```

### 手动触发 store 的水化 hydration

默认情况下，Quasar CLI 会在客户端帮你处理 Pinia/Vuex store（如果你使用了 store 的话）的水化（hydrating）

然而，你可能也想自己手动来处理它的水化过程，你需要先设置 quasar.config.js > ssr > manualStoreHydration: true，然后一个推荐的方式是，创建一个[boot 文件](/quasar-cli-vite/boot-files)来处理它，示例：

```js
// some_boot_file
// 确保配置这个 boot 文件只在客户端运行

export default ({ store }) => {
  // For Pinia
  store.state.value = window.__INITIAL_STATE__

  // For Vuex
  store.replaceState(window.__INITIAL_STATE__)
}
```

### 手动触发 post-hydration

默认情况下，Quasar CLI 会封装你的组件然后在这个组件被客户端挂载的时候调用`$q.onSSRHydrated()`方法。这时组件就被客户端接管，你不要为此做任何的配置。

然后，如果你想重写上述逻辑，你需要先修改 quasar.config.js > ssr > manualPostHydrationTrigger: true。无论你想重写此处的原因是什么，请参考下面手动触发水化 (post hydration)的例子：

```js
// App.vue - Composition API

import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
export default {
  // ....
  setup () {
    // ...
    const $q = useQuasar()
    onMounted(() => {
      $q.onSSRHydrated()
    })
  }
}
```

```js
// App.vue - Options API
export default {
  mounted () {
    this.$q.onSSRHydrated()
  }
}
```

## Nodejs Server

添加 SSR 模式时会为 Quasar 项目创建一个`/src-ssr`目录，其中包含专门用于处理 SSR 的文件。

```bash
.
└── src-ssr/
    ├── middlewares/  # SSR middleware files
    └── server.js     # SSR webserver
```

您可以自由编辑这些文件。这两个文件夹都有各自的文档页面(请检查左侧菜单)。

注意事项：

1. 这些文件会运行在 node 环境下（他们不会被 babel 转化），所以在使用 ES6 的语法时，要考虑是否被你使用的[node 版本支持](https://node.green/)。

2. 当你从 node_modules 中引入一个库时，请确保它被你添加在了 package.json 中的 "dependencies" 下，而不是"devDependencies"。

3. `/src-ssr/middlewares`中的文件使用单独的 Esbuild 配置打包，你可以在 quasar.config.js 中通过下面的方法修改它的配置：

```js
return {
  // ...
  ssr: {
    // ...
    extendSSRWebserverConf (esbuildConf) {
      // 在这修改 esbuild 的配置
    },
  }
}
```

4. 关于`/src-ssr/server.js`文件的详细描述，请见 [SSR Webserver](/quasar-cli-vite/developing-ssr/ssr-webserver) 页面，如果你需要支持 serverless functions 请阅读该页面。

## 提升 SEO

你选择开发 SSR 而不是 SPA 的一个主要原因可能是关心网站的 SEO。通过使用[Quasar Meta Plugin](/quasar-plugins/meta)插件来动态管理搜索引擎所需的 html 标签，可以大大提高 SEO。

## Boot 文件
当运行在 SSR 模式时，你的 app 代码需要时同构（isomorphic）的或者通用（universal）的，意味它们必须可以同时运行在 node 环境下和浏览器中，你的[Boot 文件](/quasar-cli-vite/boot-files)也是如此。

然而，你可能希望有些 boot 文件只运行在指定的环境中，你可以通过下面的配置实现：

```js
// quasar.config.js
return {
  // ...
  boot: [
    'some-boot-file', // 同时运行在服务端和客户端
    { path: 'some-other', server: false }, // 这个 boot 文件只会在客户端运行
    { path: 'third', client: false } // 这个 boot 文件只会在服务端运行
  ]
}
```
不过，要确保你的应用程序是一致的。

当一个 boot 文件运行在服务端时，你可以在默认导出的函数的参数中多拿到一个叫[ssrContext](/quasar-cli-vite/developing-ssr/ssr-context)的对象。

```js
// some boot file
export default ({ app, ..., ssrContext }) => {
  // 你可以给 ssrContext 添加一些字段，然后再/index.html 中使用它们。
  // 例如 - 让我们添加一个 someProp 字段：
  // ssrContext.someProp = 'some
  // 然后在/index.html 中可以通过下述方式使用它
  // {{ someProp }}
}
```
当你想上述方式将此类引用（在上面的示例中用括号括起来的`{{ someProp }}`）添加到`/index.html`中时。请确保告诉 Quasar 它只对 SSR 模式有效：


```html
<!-- /index.html -->
<% if (ctx.mode.ssr) { %>{{ someProp }} <% } %>
```
