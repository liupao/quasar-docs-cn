---
title: quasar.config.js 配置详解
desc: (@quasar/app-webpack) 在Quasar和webpack的项目中如何进行配置。
---
Quasar 在底层使用了一些很优秀的工具，例如 [Webpack](https://webpack.js.org/)。
Quasar 的一大优点是它能够帮您处理底层工具所需的大部分复杂配置。因此，您甚至不需要了解 Webpack 或任何其他开发工具就可以使用 Quasar。


注意，使用脚手架创建的项目的根目录下有一个 `/quasar.config.js` 文件，Quasra CLI 几乎所有的行为都通过这个文件进行配置：

* 配置您的网站/app 使用哪些 Quasar 组件，指令和插件；
* 设置默认的 [Quasar 语言包](/options/quasar-language-packs)；
* 选择您喜欢的[图标库](/options/installing-icon-libraries)；
* 配置 Quasar 组件使用的[默认图标集合](/options/quasar-icon-sets)；
* 配置开发服务器的端口、HTTPS模式、主机名等等；
* 配置您想用的 [CSS 动画](/options/animations)
* 配置启用哪些 [Boot 文件](/quasar-cli-vite/boot-files) 以及其执行顺序（位于 `src/boot` 目录下会在 Vue 根组件挂载之前被执行的文件）；
* 配置会被打包的全局 CSS/Sass... 文件；bundle
* SPA, PWA, Electron, Capacitor, Cordova, SSR, BEX (浏览器插件) 配置项；
* [Electron Packager](/quasar-cli-webpack/developing-electron-apps/configuring-electron#quasar.config.js) 和/或 [Electron Builder](/quasar-cli-webpack/developing-electron-apps/configuring-electron#quasar.config.js)
* 扩展底层工具的配置项，例如 Webpack 的配置项；

::: tip
您会发现，更改这些设置后并不需要手动重启开发服务器。Quasar CLI 会检测更改后的代码并重新加载必要的进程，您不会丢失您的开发流程，甚至可以保持当前状态，这样可以节省大量时间！
:::

::: warning
`/quasar.config.js` 由 Quasar CLI 的构建系统运行，因此这段代码直接在 Node.js 环境下运行，而不是运行在您的项目应用的上下文环境中。这代表您可以直接在其中导入一些 'fs','path','webpack'等模块。但是要确保您在其中使用的 ES 特性已经被您使用的 [Node 版本支持](https://node.green/)（Node 版本需要  >= 12）。
:::


## 结构

### 基础

您会注意到 `/quasar.config.js` 导出一个带有一个 `ctx` （上下文 context）参数的函数，并返回一个对象。您可以通过这个上下文（context）动态的改变您的网站/app 的配置：

```js
module.exports = function (ctx) { // 也可是一个异步的函数
  console.log(ctx)

  // 打印 ctx 的输出示例:
  {
    dev: true,
    prod: false,
    mode: { spa: true },
    modeName: 'spa',
    target: {},
    targetName: undefined,
    arch: {},
    archName: undefined,
    debug: undefined
  }
  // 上下文会根据您运行 "quasar dev" 或 "quasar build" 时传入的参数生成
}
```

例如，您可以在为特定模式（如PWA）构建时加载一种字体，并为其他模式加载另一种字体：

```js
module.exports = function (ctx) {
  extras: [
    ctx.mode.pwa // 我们只在 PWA 模式下加载此字体
      ? 'roboto-font'
      : null
  ]
}
```

或者您可以为 SPA 模式使用一个全局 CSS 文件，为 Cordova 模式使用另一个全局 CSS 文件，同时避免为其他模式加载任何这样的文件

```js
module.exports = function (ctx) {
  css: [
    ctx.mode.spa ? 'app-spa.sass' : null, // 加载 /src/css/app-spa.sass
    ctx.mode.cordova ? 'app-cordova.sass' : null  // 加载 /src/css/app-cordova.sass
  ]
}
```

或者您可以将开发服务器的端口配置为：SPA 模式下为8000，在 PWA 模式下为9000，其他模式下为9090

```js
module.exports = function (ctx) {
  devServer: {
    port: ctx.mode.spa
      ? 8000
      : (ctx.mode.pwa ? 9000 : 9090)
  }
}
```

您也可以在返回 Quasar 配置之前进行异步工作:

```js
module.exports = async function (ctx) {
  const data = await someAsyncFunction()
  return {
    // ... use "data"
  }
}

// 或者:
module.exports = function (ctx) {
  return new Promise(resolve => {
    // 在此进行异步工作:
    // 将 Quasar 配置传入 resolve() 函数返回
    resolve({
      //
    })
  })
}
```

可能性是无限的。

### IDE 自动补全

您可以将导出的函数使用 `configure()` 包裹起来，则在配置时可获得 IDE 的自动补全提示 （通过 Typescript）：

```js
const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  /* 配置项 */
})
```

## 配置项详解

我们来逐个看一下每个配置项：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| css | Array | 配置全局加载的来自 `/src/css/` 目录下的 CSS/Stylus/SCSS/SASS/... 文件，除了会被默认加载的 theme （主题）文件 |
| preFetch | Boolean | 开启 [PreFetch 预取特性](/quasar-cli-webpack/prefetch-feature)。 |
| extras | Array |想要从 [@quasar/extras](https://github.com/quasarframework/quasar/tree/dev/extras) 包中导入哪些功能。 例如: _['material-icons', 'roboto-font', 'ionicons-v4']_ |
| vendor | Object | 添加/删除 文件/第三方库 到/去 vendor 块  chunk: { add: [...], remove: [...] }. |
| supportTS | Boolean/Object | 添加 TypeScript 支持吗， [更多信息](/quasar-cli-webpack/supporting-ts) |
| htmlVariables | Object | 添加您可以在 index.template.html. 文件中使用的变量。 |
| framework | Object/String | 配置导入哪些 Quasar 组件/指令/插件，使用哪个语言包，哪些图标库等 |
| animations | Object/String | 导入哪些 [CSS 动画](/options/animations)。 示例: _['bounceInLeft', 'bounceOutRight']_ |
| devServer | Object | Webpack 开发服务器配置项。为了确保正确的配置，一些属性会根据您使用的 Quasar 模式进行覆盖。  注意：如果您正在代理开发服务器（如使用云 IDE） ，请将 `public` 设置设置为您的公共应用程序 URL。 |
| build | Object | Build 配置项。 |
| sourceFiles | Object | 如果需要，可以使用此属性更改网站/应用程序的某些文件的默认名称。 |
| cordova | Object | Cordova 模式专属[配置项](/quasar-cli-webpack/developing-cordova-apps/configuring-cordova). |
| capacitor | Object | Quasar CLI Capacitor 模式专属[配置项](/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor). |
| pwa | Object | PWA 模式专属[配置项](/quasar-cli-webpack/developing-pwa/configuring-pwa). |
| ssr | Object | SSR 模式专属[配置项](/quasar-cli-webpack/developing-ssr/configuring-ssr). |
| electron | Object | Electron 模式专属[配置项](/quasar-cli-webpack/developing-electron-apps/configuring-electron). |

### Property: css
配置全局加载的来自 `/src/css/` 目录下的 CSS/Stylus/SCSS/SASS/... 文件，除了会被默认加载的 theme （主题）文件

```js
// quasar.config.js
return {
  css: [
    'app.sass', // 加载 /src/css/app.sass
    '~some-library/style.css' // 加载 node_modules/some-library/style.css
  ]
}
```

### Property: vendor
默认情况下，由于性能和缓存的原因，任何来自 `node_modules` 的内容都会在打包时被注入到 vendor 块，然而，如果你想为这个特定的块添加/删除内容，那么您可以：

```js
// quasar.config.js
return {
  vendor: {
    /* 可选的;
       禁用 vendor chunk: */ disable: true,

    add: [ 'src/plugins/my-special-plugin' ],
    remove: ['axios', 'vue$']
  }
}
```

### Property: framework
告诉 CLI 导入哪些 Quasar 组件/指令/插件，使用哪个语言包，使用哪些图标库等。

只有当 "all" 被设置为 `false` 时，才需要填入 "components" 和 "directives"。

```js
// quasar.config.js
return {
  // a list with all options (all are optional)
  framework: {
    // 自动导入策略，您可以配置：
    autoImportComponentCase: 'pascal', // or 'kebab' (default) or 'combined'

    /**
     * 在 Vue 文件中的 Quasar 组件可以被自动导入，但是还有一些特殊情况需要手动处理
     * （例如在 .js 或 .ts 文件中）
     * 您可以手动声明哪些 Quasar 组件/指令可以在任何地方都可以被使用。
     * @example [ 'QAvatar', 'QChip' ]
     */
    // components: [],
    // directives: [],

    // 启动的 Quasar 插件
    plugins: ['Notify' /* ... */],

    // Quasar 配置
    // 您会在需要使用时在文档中见到它
    config: { /* ... */ },

    iconSet: 'fontawesome-v6', // 选择 Quasar 图标库中的一个作为 Quasar 组件的默认图标库，也需要在  "extras" 配置项中指明
    lang: 'de', // 告诉 Quasar 为它自带的组件使用哪个语言包

    cssAddon: true // 添加 flex 响应式 CSS 类 是否开启 CSS 断点功能（注意代码体积会明显增大）
  }
}
```

更多关于 cssAddon [参考这里](/layout/grid/introduction-to-flexbox#flex-addons).

### Property: devServer
**Webpack 开发服务器配置项**。看一下 [完整的配置列表](https://webpack.js.org/configuration/dev-server/)。为了确保正确的配置，一些属性会根据您使用的 Quasar 模式进行覆盖。注意：如果您正在代理开发服务器（如使用云 IDE），将请将 `client` 中的 `webSocketURL` 设置为您的应用程序的 public URL 以开启热更新之类的特性，请[参考这里](https://webpack.js.org/configuration/dev-server/#websocketurl)。

下面时一些常用的配置项：

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| port | Number | 开发服务器的端口好 |
| host | String | 开发服务器使用的本机 IP/主机名 |
| open | Boolean/String | 除非设置为 `false`，否则 Quasar 会在开发服务器启动后自动在浏览器中打开开发服务器的地址。应用于 SPA, PWA 和 SSR 模式。使用 [open](https://github.com/sindresorhus/open#usage) 包的参数。更多细节，请见下方。 |
| proxy | Object/Array | 但您有一个单独的后端 API，并想要使用同样的域名向其发送请求时，代理一些 URL 会很有用。 |
| devMiddleware | Object | 应用于 webpack-dev-middleware v4 的配置项。 |
| server | Object | 这里您可以配置 HTTPS 代替 HTTP（见下方） |
| onBeforeSetupMiddleware | Function | webpack-dev-server 启动之前的开发中间件。 |
| onAfterSetupMiddleware | Function |  webpack-dev-server 启动之后的开发中间件。 |

使用 `open` 属性可以配置打开一个特定的浏览器而不是使用系统默认浏览器，在[浏览器支持列表](https://github.com/sindresorhus/open#options) 页面查看可配置内容，其中的 `options` 字段就是您可以填入 quasar.config.js > devSever > open 中的内容。例如：

```js
// quasar.config.js
// （下面的语法需要 @quasar/app-webpack v3.3+）

// 打开 Google Chrome
devServer: {
  open: {
    app: { name: 'google chrome' }
  }
}

// 打开 Firefox
devServer: {
  open: {
    app: { name: 'firefox' }
  }
}

// 打开 Google Chrome 并自动处理跨平台问题
const open = require('open')

devServer: {
  open: {
    app: { name: open.apps.chrome }
  }
}
```

当您设置 `devServer > https: true` 时，Quasar 会自动为您生成一个 SSL 证书，然而，如果您想使用自己的证书，那么可以参考这个博客：[Filippo](https://blog.filippo.io/mkcert-valid-https-certificates-for-localhost/)，然后您的 `quasar.config.js > devServer > https` 配置应该类似这样：

```js
// quasar.config.js

devServer: {
  server: {
    type: 'https', // NECESSARY (alternative is type 'http')

    options: {
      // Use ABSOLUTE paths or path.join(__dirname, 'root/relative/path')
      key: "/path/to/server.key",
      pfx: "/path/to/server.pfx",
      cert: "/path/to/server.crt",
      ca: "/path/to/ca.pem",
      passphrase: 'webpack-dev-server' // do you need it?
    }
  }
}
```

您还可以配置自动打开远程 Vue Devtools：

```js
// quasar.config.js

devServer: {
  vueDevtools: true
}
```
#### Docker 和 WSL 上的热更新问题

如果您使用的是 Docker 容器，则可能会发现 HMR（热更新）停止工作。HMR（热更新）依靠操作系统来提供有关监听更改文件的通知，这些可能对您的 Docker 容器不起作用。

通过使用轮询模式检查文件系统更改，可以实现一种权宜之计的解决方案。这可以通过以下方式实现：

```js
// quasar.config.js

build: {
  // ...
  extendWebpack(cfg) {
    cfg.watchOptions = {
      aggregateTimeout: 200,
      poll: 1000,
    };
  },
// ...
```

### Property: build
| 属性 | 类型 | 说明 |
| --- | --- | --- |
| transpile | Boolean | 开启或禁用 Babel 转译。 |
| transpileDependencies | Array of Regex | Does not applies if "transpile" is set to "false". Add dependencies for transpiling with Babel (from node_modules, which are by default not transpiled). Example: `[ /my-dependency/, ...]` |
| showProgress | Boolean | 编译时显示进度条 |
| transformAssetUrls | Object | Add support for also referencing assets for custom tags props. Example: `{ 'my-img-comp': 'src', 'my-avatar': [ 'src', 'placeholder-src' ]}` |
| extendWebpack(cfg) | Function | Extend Webpack config generated by Quasar CLI. Equivalent to chainWebpack(), but you have direct access to the Webpack config object. |
| chainWebpack(chain) | Function | Extend Webpack config generated by Quasar CLI. Equivalent to extendWebpack(), but using [webpack-chain](https://github.com/neutrinojs/webpack-chain) instead. |
| beforeDev({ quasarConf }) | Function | Prepare external services before `$ quasar dev` command runs, like starting some backend or any other service that the app relies on. Can use async/await or directly return a Promise. |
| afterDev({ quasarConf }) | Function | Run hook after Quasar dev server is started (`$ quasar dev`). At this point, the dev server has been started and is available should you wish to do something with it. Can use async/await or directly return a Promise. |
| beforeBuild({ quasarConf }) | Function | Run hook before Quasar builds app for production (`$ quasar build`). At this point, the distributables folder hasn’t been created yet. Can use async/await or directly return a Promise. |
| afterBuild({ quasarConf }) | Function | Run hook after Quasar built app for production (`$ quasar build`). At this point, the distributables folder has been created and is available should you wish to do something with it. Can use async/await or directly return a Promise. |
| onPublish(opts) | Function | Run hook if publishing was requested (`$ quasar build -P`), after Quasar built app for production and the afterBuild hook (if specified) was executed. Can use async/await or directly return a Promise. `opts` is Object of form `{arg, distDir}`, where "arg" is the argument supplied (if any) to -P parameter. |
| publicPath | String | Public path of your app. By default, it uses the root. Use it when your public path is something else, like "&lt;protocol&gt;://&lt;domain&gt;/some/nested/folder" -- in this case, it means the distributables are in "some/nested/folder" on your webserver. |
| appBase | String | Force app base tag with your custom value; configure only if you **really** know what you are doing, otherwise you can easily break your app. Highly recommended is to leave this computed by @quasar/app-webpack. |
| vueRouterBase | String | Force vue router base with your custom value; configure only if you **really** know what you are doing, otherwise you can easily break your app. Highly recommended is to leave this computed by @quasar/app-webpack. |
| vueRouterMode | String | Sets [Vue Router mode](https://router.vuejs.org/en/essentials/history-mode.html): 'hash' or 'history'. Pick wisely. History mode requires configuration on your deployment web server too. |
| htmlFilename | String | Default is 'index.html'. |
| ssrPwaHtmlFilename | String | Used for SSR+PWA mode. Default is 'offline.html'. |
| productName | String | Default value is taken from package.json > productName field. |
| distDir | String | Folder where Quasar CLI should generate the distributables. Relative path to project root directory. Default is 'dist/{ctx.modeName}'. Applies to all Modes except for Cordova (which is forced to `src-cordova/www`). |
| ignorePublicFolder | Boolean | Ignores the /public folder. If you depend on a statics folder then you will need to configure it yourself (outside of Quasar or through the extendWebpack/chainWebpack), so make sure that you know what you are doing. |
| devtool | String | Source map [strategy](https://webpack.js.org/configuration/devtool/) to use. |
| env | Object | Add properties to `process.env` that you can use in your website/app JS code. |
| gzip | Boolean/Object | Gzip the distributables. Useful when the web server with which you are serving the content does not have gzip. If using as Object, it represents the compression-webpack-plugin config Object. |
| analyze | Boolean/Object | Show analysis of build bundle with webpack-bundle-analyzer. If using as Object, it represents the webpack-bundle-analyzer config Object. |
| vueCompiler | Boolean | Include vue runtime + compiler version, instead of default Vue runtime-only |
| uglifyOptions | Object | Minification options. [Full list](https://github.com/webpack-contrib/terser-webpack-plugin/#minify). |
| vueLoaderOptions | Object | Options (compilerOptions, compiler, transformAssetUrls, etc) for [vue-loader](https://vue-loader.vuejs.org/options.html). |
| scssLoaderOptions | Object | Options to supply to `sass-loader` for `.scss` files. Example: scssLoaderOptions: { additionalData: '@import "src/css/abstracts/_mixins.scss";'} |
| sassLoaderOptions | Object | Options to supply to `sass-loader` for `.sass` files. |
| stylusLoaderOptions | Object | Options to supply to `stylus-loader`. |
| lessLoaderOptions | Object | Options to supply to `less-loader`. |

The following properties of `build` are automatically configured by Quasar CLI depending on dev/build commands and Quasar mode. But if you like to override some (make sure you know what you are doing), you can do so:

| Property | Type | Description |
| --- | --- | --- |
| extractCSS | Boolean | Extract CSS from Vue files |
| sourceMap | Boolean | Use source maps |
| minify | Boolean | Minify code (html, js, css) |

If, for example, you run "quasar build --debug", sourceMap and extractCSS will be set to "true" regardless of what you configure.

### Property: htmlVariables

You can define and then reference variables in `src/index.template.html`, like this:
```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    htmlVariables: {
      title: 'test name',
      some: {
        prop: 'my-prop'
      }
    }
```
Then (just an example showing you how to reference a variable defined above, in this case `title`):
```html
<!-- src/index.template.html -->
<%= title %>
<%= some.prop %>
```

### Property: sourceFiles
Use this property to change the default names of some files of your website/app if you have to. All paths must be relative to the root folder of your project.

```js
// default values:
sourceFiles: {
  rootComponent: 'src/App.vue',
  router: 'src/router',
  store: 'src/store',
  indexHtmlTemplate: 'src/index.template.html',
  registerServiceWorker: 'src-pwa/register-service-worker.js',
  serviceWorker: 'src-pwa/custom-service-worker.js',
  electronMain: 'src-electron/electron-main.js',
  electronPreload: 'src-electron/electron-preload.js'
}
```

### Example setting env for dev/build

Please refer to [Adding to process.env](/quasar-cli-webpack/handling-process-env#adding-to-process-env) section in our docs.

### Handling Webpack configuration
In depth analysis on [Handling Webpack](/quasar-cli-webpack/handling-webpack) documentation page.
