---
title: quasar.config.js 配置详解
desc: (@quasar/app-vite) 在Quasar和vite的项目中如何进行配置。
---
注意，使用脚手架创建的项目的根目录下有一个 `/quasar.config.js` 文件，Quasra CLI 几乎所有的行为都通过这个文件进行配置：

* 配置您的网站/app 使用哪些 Quasar 组件，指令和插件；
* 设置默认的 [Quasar 语言包](/options/quasar-language-packs)；
* 选择您喜欢的[图标库](/options/installing-icon-libraries)；
* 配置 Quasar 组件使用的[默认图标集合](/options/quasar-icon-sets)；
* 配置开发服务器的端口、HTTPS模式、主机名等等；
* 配置您想用的 [CSS 动画](/options/animations)
* 配置启用哪些 [Boot 文件](/quasar-cli-vite/boot-files) 以及其执行顺序（位于 `src/boot` 目录下会在 Vue 根组件挂载之前被执行的文件）；
* 配置会被打包的全局 CSS/Sass... 文件；
* SPA, PWA, Electron, Capacitor, Cordova, SSR, BEX (浏览器插件) 配置项；
* 扩展底层工具的配置项，例如 Vite 的配置项；
* ……还有更多您在使用途中会发现的东西。

::: tip
您会发现，更改这些设置后并不需要手动重启开发服务器。Quasar CLI 会检测更改后的代码并重新加载必要的进程，您不会丢失您的开发流程，甚至可以保持当前状态，这样可以节省大量时间！
:::

::: warning
`/quasar.config.js` 由 Quasar CLI 的构建系统运行，因此这段代码直接在 Node.js 环境下运行，而不是运行在您的项目应用的上下文环境中。这代表您可以直接在其中导入一些 'fs','path',vite 插件等模块。但是要确保您在其中使用的 ES 特性已经被您使用的 [Node 版本支持](https://node.green/)（Node 版本需要  >= 14.19.0）。
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

### css

```js
/**
 * 配置全局加载的来自 `/src/css/` 目录下的 CSS/Stylus/SCSS/SASS/... 文件
 * 除了会被默认加载的 theme （主题）文件
 */
css?: string[];
```

示例：

```js
// quasar.config.js
return {
  css: [
    'app.sass', // 加载 /src/css/app.sass
    '~some-library/style.css' // 加载 node_modules/some-library/style.css
  ]
}
```

### boot

```js
/** 配置启动哪些 Boot 文件，顺序很重要 */
boot?: QuasarBootConfiguration;

interface BootConfigurationItem {
  path: string;
  server?: false;
  client?: false;
}

type QuasarBootConfiguration = (string | BootConfigurationItem)[];
```

### preFetch

更多信息请参考 [PreFetch 预取特性](/quasar-cli-vite/prefetch-feature).

```js
/** 开启 preFetch 预取特性 */
preFetch?: boolean;
```

### eslint

您的项目中需要已经安装 lint 工具，如果您不知道这是什么，请使用脚手架重新创建一个新项目 (`yarn create quasar` 或者 `npm init quasar`)，并在提问时勾选 "Linting" 选项。

```js
/** Quasar CLI 对 ESLint 的配置项 */
eslint?: QuasarEslintConfiguration;

interface QuasarEslintConfiguration {
  /**
   * 它应该报告警告吗？
   * @default true
   */
  warnings?: boolean;

  /**
   * 它应该报告错误吗？
   * @default true
   */
  errors?: boolean;

  /**
   * 保存时修复
   */
  fix?: boolean;

  /**
   * 传递给 ESLint 的原始选项
   */
  rawOptions?: object;

  /**
   * 要包含的文件（可以是glob格式）
   */
  include?: string[];

  /**
   * 要排除的文件（可以是glob格式）。
   * 推荐使用 .eslintignore 文件代替
   */
  exclude?: string[];
}
```

### extras

```js
/**
 * 想要从 [@quasar/extras](https://github.com/quasarframework/quasar/tree/dev/extras) 包中导入哪些功能。
 * @example ['material-icons', 'roboto-font', 'ionicons-v4']
 */
extras?: (QuasarIconSets | QuasarFonts)[];
```

### framework

```js
/**
 * 配置导入哪些 Quasar 组件/指令/插件，
 * 使用哪个语言包，哪些图标库等
 */
framework?: QuasarFrameworkConfiguration;

interface QuasarFrameworkConfiguration {
  config?: /* Quasar UI 的配置项 -- 您会在需要使用时在文档中见到它  */;

  /**
   * 选择 Quasar 图标库中的一个作为 Quasar 组件的默认图标库
   * @example 'material-icons'
   */
  iconSet?: QuasarIconSets;

  /**
   * 选择一个语言包作为 Quasar 的默认语言包，字符串格式（更多内容见详细文档页面）
   * @example 'en-US' / 'es' / 'he' / ...
   */
  lang?: QuasarLanguageCodes;

  /* 是否开启 CSS 断点功能 （更多内容见详细文档页面） */
  cssAddon?: boolean;

  /**
   * 在 Vue 模板中使用 Quasar 组件的格式
   * @default 'kebab'
   */
  autoImportComponentCase?: "kebab" | "pascal" | "combined";

  /**
   * 在 Vue 文件中的 Quasar 组件可以被自动导入，但是还有一些特殊情况需要手动处理
   * （例如在 .js 或 .ts 文件中）
   * 您可以手动声明哪些 Quasar 组件/指令可以在任何地方都可以被使用。
   * @example [ 'QAvatar', 'QChip' ]
   */
  components?: (keyof QuasarPluginOptions["components"])[];
  directives?: (keyof QuasarPluginOptions["directives"])[];

  /**
   * 启动的 Quasar 插件
   * @example [ 'Notify', 'Loading', 'Meta', 'AppFullscreen' ]
   */
  plugins?: (keyof QuasarPluginOptions["plugins"])[];
}
```

更多关于 CSS  断点的信息请[参考](/layout/grid/introduction-to-flexbox#flex-addons).

### animations

更多关于 [CSS 动画的信息请参考](/options/animations).

```js
/**
 * 导入哪些 Quasar CSS 动画
 * @example [ 'bounceInLeft', 'bounceOutRight' ]
 * */
animations?: QuasarAnimationsConfiguration | 'all';
```

### devServer

更多信息参考: [Vite server options](https://vitejs.dev/config/#server-options)

```js
import { ServerOptions } from "vite";

/**
 * Vite 的 "server" 配置项。
 * 为了确保正确的配置，一些属性会根据您使用的 Quasar 模式进行覆盖
 * 注意：如果您正在代理开发服务器（如使用云 IDE） ，请将 "public" 设置设置为您的公共应用程序 URL。
 */
devServer?: ServerOptions;
```

除了这些 Vite 配置外，Quasar CLI 还增加了一些特色的配置项：

使用 `open` 属性可以配置打开一个特定的浏览器而不是使用系统默认浏览器，在[浏览器支持列表](https://github.com/sindresorhus/open#options) 页面查看可配置内容，其中的 `options` 字段就是您可以填入 quasar.config.js > devSever > open 中的内容。例如：

```js
// quasar.config.js

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

您还可以配置自动打开远程 Vue Devtools：

```js
// quasar.config.js

devServer: {
  vueDevtools: true
}
```

### build

```js
/** Build 配置项。 */
build?: QuasarBuildConfiguration;

import { UserConfig as ViteUserConfig } from "vite";
import { Options as VuePluginOptions } from "@vitejs/plugin-vue"

interface BuildTargetOptions {
  /**
   * @default ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1']
   */
  browser?: string[];
  /**
   * @example 'node16'
   */
  node: string;
}

interface QuasarStaticBuildConfiguration {
  /**
   * @example
   *    {
   *      browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
   *      node: 'node16'
   *    }
   */
  target?: BuildTargetOptions;

  /**
   * 扩展 Quasar CLI 生成的Vite配置
   */
  extendViteConf?: (
    config: ViteUserConfig,
    invokeParams: InvokeParams
  ) => void;

  /**
   * 提供给 @vitejs/plugin-vue 的配置项
   */
  viteVuePluginOptions?: VuePluginOptions;

  /**
   * Vite 插件
   *
   * @example
   *   [
   *     [ 'package-name', { ..options.. } ],
   *     [ require('some-plugin'), { ...options... } ]
   *   ]
   */
  vitePlugins?: object[];

  /**
   * @example 为自定义文件夹设置别名
   *    {
   *       locales: path.join(__dirname, 'src/locales')
   *    }
   */
  alias?: object[];

  /**
   * 配置您的app 的 Public 路径。
   * 当您的 public 路径需要设置成特殊值的时候才需要它
   * 例如： _“<protocol>://<domain>/some/nested/folder”_
   * 这代表着您的应用部署在服务器的 _“some/nested/folder”_ 下
   *
   * @default '/'
   */
  publicPath?: string;

  /**
   * 设置 [Vue Router 模式](https://router.vuejs.org/guide/essentials/history-mode.html).
   * History 也需要在部署Web服务器上进行配置
   *
   * @default 'hash'
   */
  vueRouterMode?: "hash" | "history";

  /**
   * 设置 Vue Router base 基路由
   * 除非绝对需要，否则不需要配置此项。
   */
  vueRouterBase?: string;

  /**
   * 配置 Vue 选项式 API 是否还可用
   * @default true
   */
  vueOptionsAPI?: boolean;

  /**
   * 我们应该在启动时使 Vite 和 ESLint 缓存无效吗？
   * @default false
   */
  rebuildCache?: boolean;

  /**
   * 是否开启构建产物依赖分析
   * 将会生成并打开一个 html 报告
   * @default false
   */
  analyze?: boolean;

  /**
   * Quasar CLI 构建时的产物目录
   * 需设置为相对于项目根目录的相对路径
   *
   * @default 'dist/{ctx.modeName}' 除 Cordova 模式外的默认值。
   * @default 'src-cordova/www' Cordova 模式的默认值。
   */
  distDir?: string;

  /**
   * 将属性添加到 `process.env` 中，您可以在网站/应用程序的 JS 代码中使用这些属性。
   *
   * @example { SOMETHING: 'someValue' }
   */
  env?: { [index: string]: string };

  /**
   * 定义在应用程序中被替换的常量
   *
   * @example { SOMETHING: JSON.stringify('someValue') } -> console.log(SOMETHING) // console.log('someValue')
   */
  rawDefine?: { [index: string]: string };

  /**
   * (需要 @quasar/app-vite v1.1+)
   *
   * 设置产物文件名是否带有 hash 值
   * 例如: "454d87bd" 在 "assets/index.454d87bd.js" 中
   *
   * 如果开启，请注意您的服务器的缓存策略，否则容易获得一个304错误
   *
   * 如果您的vite配置中已经设置了 build.rollupOptions.output.entryFileNames/chunkFileNames/assetFileNames 属性，则此设置不会生效
   *
   * 只在构建生产环境时生效
   *
   * 对于（但不限于）PWA 特别有用。如果设置为 false，则更新 PWA 将强制重新下载所有资源，无论它们是否已更改（源自于 Roolup 在 vite 中的工作模式）。
   *
   * @default true
   */
  useFilenameHashes?: boolean;

  /**
   * 是否注入模块预加载 polyfill
   * @default false
   */
  polyfillModulePreload?: boolean;

  /**
   * 忽略 public 目录。
   * @default false
   */
  ignorePublicFolder?: boolean;

  /**
   * 设置为 `false` 可禁用代码压缩，或指定要使用的代码压缩程序。
   * 可用的代码压缩程序有 'terser' 或 'esbuild'
   * 如果被设置为 false 以外的值，那么对 CSS 也有效
   * 只在构建生产环境时有效
   * @default 'esbuild'
   */
  minify?: boolean | 'terser' | 'esbuild';

  /**
   * 设置为 `true` 则会额外创建一个 sourcemap 文件。
   * 设置为 'inline' 则会将 sourcemap 以 data URI 的形式内联到产物代码中，不会额外生成文件。
   * 设置为 'hidden' 与设置为 `true` 时行为一样，只是会忽略代码中的注释信息。
   * @default false
   */
  sourcemap?: boolean | 'inline' | 'hidden';

  /**
   * (requires @quasar/app-vite v1.1.1+)
   *
   * 是否在开发模式下也开启树摇（Treeshake）
   * 出于性能原因，建议将其保留为false。
   * @default false
   */
  devQuasarTreeshaking?: boolean;

  /**
   * 在运行 `$ quasar dev` 之前会被执行的钩子函数，可以在此进行一些准备工作
   * 例如，启动 app 之前启动后端或者别的什么服务
   * 也可以被改写成 async/await 格式的异步函数
   */
  beforeDev?: (params: QuasarHookParams) => void;

  /**
   *
   * 在运行 `$ quasar dev` 成功之后会被执行的钩子函数
   * 此时，开发服务器已经被启动，如果您想对其做些事情，就可以使用。
   * 也可以被改写成 async/await 格式的异步函数
   */
  afterDev?: (params: QuasarHookParams) => void;

  /**
   * 在 Quasar 构建生产代码开始之前会运行的钩子函数 (`$ quasar build`)
   * 这时产物文件夹还未创建
   * 也可以被改写成 async/await 格式的异步函数
   */
  beforeBuild?: (params: QuasarHookParams) => void;

  /**
   * 在 Quasar 构建生产代码完成之后会运行的钩子函数 (`$ quasar build`)
   * 这时产物文件都已经被创建完成，可对其进行操作
   * 也可以被改写成 async/await 格式的异步函数
   */
  afterBuild?: (params: QuasarHookParams) => void;

  /**
   * 当 publish 被触发时会运行的钩子函数  (`$ quasar build -P`),
   * 运行时机是在 Quasar 构建完成之后，如果存在 afterBuild 钩子，此时 afterBuild 已经被执行。
   * 也可以被改写成 async/await 格式的异步函数
   * `opts` 是一个 `{arg, distDir}` 格式的对象，来自 -P 参数。
   */
  onPublish?: (ops: { arg: string; distDir: string }) => void;
}
```

### sourceFiles

```js
sourceFiles?: QuasarSourceFilesConfiguration;

/**
 * 如果需要，可以使用此属性更改网站/应用程序的某些文件的默认名称。
 * 所有的路径都必须是一个相对于项目根目录的一个相对路径。
 *
 * @default
 * {
 *  rootComponent: 'src/App.vue',
 *  router: 'src/router/index',
 *  store: 'src/stores/index', // for Pinia
 *  // store: 'src/store/index' // for Vuex
 *  pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
 *  pwaServiceWorker: 'src-pwa/custom-service-worker',
 *  pwaManifestFile: 'src-pwa/manifest.json',
 *  electronMain: 'src-electron/electron-main',
 *  electronPreload: 'src-electron/electron-preload'
 * }
 */
interface QuasarSourceFilesConfiguration {
  rootComponent?: string;
  router?: string;
  store?: string;
  pwaRegisterServiceWorker?: string;
  pwaServiceWorker?: string;
  pwaManifestFile?: string;
  electronMain?: string;
  electronPreload?: string;
}
```

### htmlVariables

```js
/** 添加您可以在 /index.html 文件中使用的变量。 */
htmlVariables?: { [index: string]: string };
```
您可以向下述方式一样引用在此定义的变量：

```js
htmlVariables: {
  myVar: 'some-content'
}

// 然后在 /index.html 文件中
<%= myVar %>
<% if (myVar) { %>something<% } %>
```

更多示例：

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
然后（只是向您展示如何引用上述的变量）：

```html
<!-- /index.html -->
<%= title %>
<%= some.prop %>
```

### Quasar 不同开发模式的专属配置项

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| cordova | Object | Cordova 模式专属[配置项](/quasar-cli-vite/developing-cordova-apps/configuring-cordova). |
| capacitor | Object | Quasar CLI Capacitor 模式专属[配置项](/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor). |
| pwa | Object | PWA 模式专属[配置项](/quasar-cli-vite/developing-pwa/configuring-pwa). |
| ssr | Object | SSR 模式专属[配置项](/quasar-cli-vite/developing-ssr/configuring-ssr). |
| electron | Object | Electron 模式专属[配置项](/quasar-cli-vite/developing-electron-apps/configuring-electron). |
| bex | Object | BEX 模式专属[配置项](/quasar-cli-vite/developing-browser-extensions/configuring-bex). |


## 案例

### 为开发/生产设置不同的环境变量 env

请参考[添加 process.env](/quasar-cli-vite/handling-process-env#adding-to-process-env) 页面。

### 添加 vite 插件

请参考 [处理 Vite](/quasar-cli-vite/handling-vite#adding-vite-plugins) 页面。
