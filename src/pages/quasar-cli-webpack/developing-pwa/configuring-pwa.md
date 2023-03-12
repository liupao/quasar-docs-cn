---
title: 配置 PWA
desc: (@quasar/app-webpack) 如何使用 Quasar CLI 管理您的渐进式 Web（PWA）应用。
related:
  - /quasar-cli-webpack/quasar-config-js
---

## Service Worker
给一个 Quasar 项目添加 PWA 模式后会自动创建一个 `/src-pwa` 目录，其中包含以下文件：

```bash
.
└── src-pwa/
    ├── register-service-worker.js  # （或 .ts） UI 代码管理 service worker
    └── custom-service-worker.js    # （或 .ts）可选的自定义 service worker 文件
                                    # （仅在 injectManifest 模式中)
```

您可以随意修改这些文件，但要注意以下事情：

1. `register-service-worker.[js|ts]` 会被自动导入到应用中（就像 /src 中的文件一样）。它会注册 service worker（由 Workbox 创建，或者自定义，取决于 quasar.config.js > pwa > workboxPluginMode 配置），您可以在此监听 service worker 的事件。可以使用 ES6 的代码。
2. 如果 workbox 插件模式被设置为 "injectManifest"（quasar.config.js > pwa > workboxMode: 'injectManifest'），那么将会使用`custom-service-worker.[js|ts]` 作为 service-worker 文件，否则 Quasar 和 Workbox 会创建一个 service-worker 文件。
3. 仅在生产构建上运行 [Lighthouse](https://developers.google.com/web/tools/lighthouse/) 测试才会生效。

::: tip
阅读更多关于 `register-service-worker.[js|ts]` [的信息](/quasar-cli-webpack/developing-pwa/handling-service-worker)。
:::

## quasar.config.js
在此可以配置 Workbox 的行为，也可以调整 manifest.json。

```js
pwa: {
  // workboxPluginMode: 'InjectManifest',
  // workboxOptions: {},
  manifest: {
    // ...
  },

  // 此属性与 metaVariablesFn 选择其一即可，不要同时使用
  // 注入到 PWA meta 标签的变量（下面是一些默认值）
  metaVariables: {
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'default',
    appleTouchIcon120: 'icons/apple-icon-120x120.png',
    appleTouchIcon180: 'icons/apple-icon-180x180.png',
    appleTouchIcon152: 'icons/apple-icon-152x152.png',
    appleTouchIcon167: 'icons/apple-icon-167x167.png',
    appleSafariPinnedTab: 'icons/safari-pinned-tab.svg',
    msapplicationTileImage: 'icons/ms-icon-144x144.png',
    msapplicationTileColor: '#000000'
  },

  // 可选项，重写上面的 metaVariables
  // 此属性与 metaVariables 选择其一即可，不要同时使用
  metaVariablesFn (manifest) {
    // ...
    return [
      {
        // 将会生成：
        // <meta name="theme-color" content="ff0">

        tagName: 'meta',
        attributes: {
          name: 'theme-color',
          content: '#ff0'
        }
      },

      {
        // 将会生成：
        // <link rel="apple-touch-icon" sizes="180x180" href="icons/icon-180.png">
        // 引用 /public/icons/icon-180.png

        tagName: 'link',
        attributes: {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'icons/icon-180.png'
        },
        closeTag: false // 可选项
                        // 声明一个标签也需要闭合标签
                        // 默认值为 false
      }
    ]
  },

  // 可选项；
  // 只对自定义的 service worker 生效的 webpack 配置
  // (/src-pwa/custom-service-worker.[js|ts])
  // 如果使用 InjectManifest 模式的 workbox
  extendWebpackCustomSW (cfg) {
    // 直接对 pkg 对象做出修改不需要返回任何值
  },

  // 可选项；等价于 extendWebpackCustomSW() 但是使用了 webpack-chain；
  // 只对自定义的 service worker 生效的 webpack 配置
  // (/src-pwa/custom-service-worker.[js|ts])
  // 如果使用 InjectManifest 模式的 workbox
  chainWebpackCustomSW (chain) {
    // chain 是一个 webpack-chain 实例，表示 Webpack 配置

    // 例如：
    // chain.plugin('eslint-webpack-plugin')
    //   .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
  }
}
```

更多信息：[Workbox Webpack Plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin), [Workbox](https://developers.google.com/web/tools/workbox/).

`metaVariables` 对象仅由 Quasar 自身使用（对于 Workbox 没有意义），用于将特定的值属性注入到一些 PWA meta 标签中，以便渲染 HTML 页面。例如，`<meta name="apple-mobile-web-app-status-bar-style">` 将具有 value 属性，该属性为 `metaVariables.appleMobileWebAppStatusBarStyle` 的内容。

您可以使用 `metaVariablesFn(manifest)` 作为替代 `metaVariables` 的方法，该方法可以返回对象数组（请参见上面的代码中的格式）。如果要配置此函数不返回数组或返回空数组，则 Quasar App CLI 将不会添加任何标签 - 因此，您可以直接在 `/src/index.template.html` 中手动添加自定义标签。

## 选择 Workbox 模式

Workbox 有两种操作模式：**GenerateSW**（默认）和 **InjectManifest**。第一种模式基于 `quasar.config.js` > `pwa` > `workboxOptions`（如果有的话）自动生成一个 service worker；而第二种模式允许您编写自己的 service worker 文件。

可以通过 `quasar.config.js` 来设置要使用的模式：

```js
// quasar.config.js
pwa: {
  // workboxPluginMode: 'InjectManifest',
  // workboxOptions: { ... }
}
```

::: danger
请确保您的 `workboxOptions` 与您选择的 Workbox 模式匹配，否则 workbox webpack 插件可能会[阻止应用程序编译](https://github.com/quasarframework/quasar/issues/4998)）。
:::

### generateSW

何时使用 generateSW：

* 您希望预缓存文件。
* 您有简单的运行时配置需求（例如：该配置允许您定义路由和策略）。

何时不使用 generateSW：

* 您希望使用其他的 Service Worker 特性（例如 web 推送）。
* 您希望导入其他脚本或添加其他逻辑。

::: tip
关于此模式有哪些可用 workboxOptions，请参考 [Workbox 网站](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)。
:::

### InjectManifest

何时使用 InjectManifest:

* 您希望对 service worker 有更多控制权。
* 您希望预缓存文件。
* 在路由方面，您有更复杂的需求。
* 您希望使用其他的 Service Worker 特性（例如 web 推送）。

何时不使用 InjectManifest:

* 您希望以最简单的方式将 service worker 添加到您的站点。


::: tip 提示
* 如果使用此模式，需要自行编写 service worker 文件（`/src-pwa/custom-service-worker.[js|ts]`）。
* 关于此模式有哪些可用 workboxOptions，请参考 [Workbox 网站](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.injectManifest)。
:::

下面的代码片段是自定义 service worker（`/src-pwa/custom-service-worker.[js|ts]`）的默认代码：

```js
import { precacheAndRoute } from 'workbox-precaching'

// 预缓存注入使用方法：
precacheAndRoute(self.__WB_MANIFEST)
```



## 配置 Manifest 文件
Manifest 文件由 Quasar CLI 使用默认配置生成。您可以通过 `/quasar.config.js` 对其进行调整。

```js
// quasar.config.js
pwa: {
  // workboxPluginMode: 'InjectManifest',
  // workboxOptions: {},
  manifest: {
    name: 'Quasar Play',
    short_name: 'Quasar-Play',
    description: 'Quasar Framework Showcase',
    icons: [
      {
        'src': 'icons/icon-128x128.png',
        'sizes': '128x128',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-192x192.png',
        'sizes': '192x192',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-256x256.png',
        'sizes': '256x256',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-384x384.png',
        'sizes': '384x384',
        'type': 'image/png'
      },
      {
        'src': 'icons/icon-512x512.png',
        'sizes': '512x512',
        'type': 'image/png'
      }
    ],
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#027be3'
  }
}
```

请在开始之前阅读 [manifest 配置](https://developer.mozilla.org/en-US/docs/Web/Manifest)。

::: warning
不需要编辑 `/src/index.template.html` 文件来链接 manifest 文件。 Quasar CLI 会帮您处理好这些事情。
::::

::: tip
如果您的 PWA 需要认证或者需要一个 Authorization 请求头，请将 quasar.config.js > pwa > useCredentialsForManifestTag 设置为 `true`，以便在 manifest.json 相关的 meta 标签中包括 `crossorigin="use-credentials"`。
::::

## PWA Checklist
更多信息： [PWA Checklist](https://web.dev/pwa-checklist/)

::: danger
不要在开发构建中运行 [Lighthouse](https://developers.google.com/web/tools/lighthouse/)，因为在这个阶段，代码没有进行优化，并嵌入了源代码映射（以及其他许多内容）。
更多信息请前往[集成测试](/quasar-cli-vite/testing-and-auditing)页面。
:::

## 重新加载 & 自动更新

**如果使用默认的 generateSW  模式**，Quasar CLI 已经配置了重新加载的逻辑，如果您不想在 service worker 更新时手动重新加载页面，请按以下方式更新 `quasar.config.js` 中的 workboxOptions 配置：

```js
// quasar.config.js
pwa: {
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true
  }
}
```

[Source](https://developers.google.com/web/tools/workbox/guides/codelabs/webpack)
