---
title: 浏览器兼容性
desc: (@quasar/app-vite) 如果利用 Quasar CLI 处理浏览器兼容性。
related:
  - /quasar-cli-vite/quasar-config-js
---

为了配置应用程序的浏览器兼容性，您需要编辑 `/quasar.config.js` 文件：

```js
// quasar.config.js
build: {
  target: {
    browser: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
    node: 'node16'
  }
}
```
根据您的 Quasar 开发模式（SPA/SSR/PWA/Electron/... 等等），不仅有客户端文件（运行在浏览器中），还会有运行在 node.js 环境中的文件，这就是上述 `target` 配置项的用途。

此外，独立于此配置，您还可决定是否要开启 [模块预加载补丁 polyfill](https://guybedford.com/es-module-preloading-integrity#modulepreload-polyfill)，开启后为所有脚本都注入模块补丁。默认情况下，不开启 polyfill：

```js
// quasar.config.js
build: {
  polyfillModulePreload: false
}
```

此外，基于您的  `/postcss.config.js` 文件内容，您的 CSS 还将通过 autorefixer 来进行浏览器兼容，您可以为其配置为您感兴趣的浏览器级别：

```js
// postcss.config.js

require('autoprefixer')({
  overrideBrowserslist: [
    'last 4 Chrome versions',
    'last 4 Firefox versions',
    'last 4 Edge versions',
    'last 4 Safari versions',
    'last 4 Android versions',
    'last 4 ChromeAndroid versions',
    'last 4 FirefoxAndroid versions',
    'last 4 iOS versions'
  ]
})
```

更多关于 `autoprefixer` 的设置范围[请参考 browserslist](https://github.com/browserslist/browserslist)。
