---
title: 配置SSR
desc: (@quasar/app-vite) 如何使用Quasar CLI 管理你的SSR应用。
related:
  - /quasar-cli-vite/quasar-config-js
---

## quasar.config.js

这个文件是你配置SSR配置项的入口，例如，你可以指定客户端是使用SPA(Single Page Application -- 默认值)接管还是由PWA(Progressive Web App)接管。

```js
return {
  // ...
  ssr: {
    ssrPwaHtmlFilename: 'offline.html', // 不要使用index.html作为name!
                                        // 否则会使SSR混乱

    extendSSRWebserverConf (esbuildConf) {},

    // 增/删/改最终构建出来的生产环境下的package.json的字段
    extendPackageJson (pkg) {
      // 直接对pkg对象做出修改不需要返回任何值
    },

    pwa: false,

    /**
     * 自己提供手动处理store中state序列化的方法
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
     * 手动处理store的水化（hydration）过程而代替Quasar CLI的水化过程
     * For Pinia: store.state.value = window.__INITIAL_STATE__
     * For Vuex: store.replaceState(window.__INITIAL_STATE__)
     */
    manualStoreHydration: false,

    /**
     * 手动调用$q.onSSRHydrated()，代替Quasar CLI做的
     * 这宣布客户端代码应该接管。
     * This announces that client-side code should takeover.
     */
    manualPostHydrationTrigger: false,

    prodPort: 3000, // 生产环境下server默认使用的端口号
                    // (如果在运行时指定了process.env.PORT，则被取代)

    middlewares: [
      'render' // 添加自己的中间件时，保证'render'为最后一个
              // keep this as last one
    ]
  }
}
```

> 如果你配置了使用PWA接管客户端(这是一个杀手组合)，Quasar CLI的PWA模式也会被安装。你可能也想看看[Quasar PWA](/quasar-cli-vite/developing-pwa/introduction)页面。但最重要的是，确保你阅读了[SSR with PWA](/quasar-cli-vite/developing-ssr/ssr-with-pwa)页面。


你可能也想为`/src`下的UI修改Vite的配置：

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

### 手动触发store的水化 hydration

默认情况下，Quasar CLI 会在客户端帮你处理Pinia/Vuex store（如果你使用了store的话）的水化（hydrating）

然而，你可能也想自己手动来处理它的水化过程，你需要先设置quasar.config.js > ssr > manualStoreHydration: true，然后一个推荐的方式是，创建一个[boot 文件](/quasar-cli-vite/boot-files)来处理它，示例：

```js
// some_boot_file
// 确保配置这个boot文件只在客户端运行

export default ({ store }) => {
  // For Pinia
  store.state.value = window.__INITIAL_STATE__

  // For Vuex
  store.replaceState(window.__INITIAL_STATE__)
}
```

### 手动触发 post-hydration

默认情况下，Quasar CLI 会封装你的组件然后在这个组件被客户端挂载的时候调用`$q.onSSRHydrated()`方法。这时组件就被客户端接管，你不要为此做任何的配置。

然后，如果你想重写上述逻辑，你需要先修改quasar.config.js > ssr > manualPostHydrationTrigger: true。无论你想重写此处的原因是什么，请参考下面手动触发水化 (post hydration)的例子：

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

添加SSR模式时会为Quasar项目创建一个`/src-ssr`目录，其中包含专门用于处理SSR的文件。

```bash
.
└── src-ssr/
    ├── middlewares/  # SSR middleware files
    └── server.js     # SSR webserver
```

您可以自由编辑这些文件。这两个文件夹都有各自的文档页面(请检查左侧菜单)。

注意事项：

1. 这些文件会运行在node环境下（他们不会被babel转化），所以在使用ES6的语法时，要考虑是否被你使用的[node版本支持](https://node.green/)。

2. 当你从node_modules中引入一个库时，请确保它被你添加在了 package.json 中的 "dependencies" 下，而不是"devDependencies"。

3. `/src-ssr/middlewares`中的文件使用单独的Esbuild配置打包，你可以在quasar.config.js中通过下面的方法修改它的配置：

```js
return {
  // ...
  ssr: {
    // ...
    extendSSRWebserverConf (esbuildConf) {
      // 在这修改esbuild的配置
    },
  }
}
```

4. 关于`/src-ssr/server.js`文件的详细描述，请见 [SSR Webserver](/quasar-cli-vite/developing-ssr/ssr-webserver) 页面，如果你需要支持serverless functions请阅读该页面。

## 提升 SEO

你选择开发SSR而不是SPA的一个主要原因可能是关心网站的SEO。通过使用[Quasar Meta Plugin](/quasar-plugins/meta)插件来动态管理搜索引擎所需的html标签，可以大大提高SEO。

## Boot 文件
当运行在SSR模式时，你的app代码需要时同构（isomorphic）的或者通用（universal）的，意味它们必须可以同时运行在node环境下和浏览器中，你的[Boot 文件](/quasar-cli-vite/boot-files)也是如此。

然而，你可能希望有些boot文件只运行在指定的环境中，你可以通过下面的配置实现：

```js
// quasar.config.js
return {
  // ...
  boot: [
    'some-boot-file', // 同时运行在服务端和客户端
    { path: 'some-other', server: false } // 这个boot文件只会在客户端运行
    { path: 'third', client: false } // 这个boot文件只会在服务端运行
  ]
}
```
不过，要确保你的应用程序是一致的。

当一个boot文件运行在服务端时，你可以在默认导出的函数的参数中多拿到一个叫[ssrContext](/quasar-cli-vite/developing-ssr/ssr-context)的对象。

```js
// some boot file
export default ({ app, ..., ssrContext }) => {
  // 你可以给ssrContext添加一些字段，然后再/index.html中使用它们。
  // 例如 - 让我们添加一个someProp字段：
  // ssrContext.someProp = 'some
  // 然后在/index.html中可以通过下述方式使用它
  // {{ someProp }}
}
```
当你想上述方式将此类引用（在上面的示例中用括号括起来的`{{ someProp }}`）添加到`/index.html`中时。请确保告诉Quasar它只对SSR模式有效：


```html
<!-- /index.html -->
<% if (ctx.mode.ssr) { %>{{ someProp }} <% } %>
```
