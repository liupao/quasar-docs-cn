---
title: 命令列表
desc: (@quasar/app-vite) Quasar CLI 完整的命令列表。
---


请熟悉 Quasar 项目中可用命令的列表：

``` bash
$ quasar

  示例用法
    $ quasar <command> <options>

 查询一个命令的帮助信息
    $ quasar <command> --help
    $ quasar <command> -h

  Options
    --version, -v 打印 Quasar App CLI 的版本信息

  Commands
    dev, d        为您的项目启动一个开发服务
    build, b      打包构建生产环境下的代码
    clean, c      清除构建产物目录
    new, n        快捷创建一个 pages/layout/component 等模板文件
    mode, m       为您的项目添加/删除 Quasar 开发模式
    inspect       检查底层工具的配置项（vite/esbuild）
                    -可以用于调试您的 quasar.config.js 和安装的扩展
    ext, e        管理 Quasar 扩展
    run, r        运行指定的由 Quasar App 扩展提供的命令
    describe      查看 Quasar 组件的 API
    test, t       运行 @quasar/testing 扩展的命令
                    - 需要安装 @quasar/testing
                    - 这是一个为方便目的的别名命令
    info, i       显示有关您的机器和应用程序的信息
    help, h       显示帮助信息

  如果找不到指定的命令，则会利用输入的参数执行 "quasar run"。

  全局安装的 @quasar/cli 提供的命令：

    upgrade       需要在 quasar 项目目录中运行，检查当前项目可更新的 Quasar 包
    serve         为产物目录启动一个静态资源服务器
```

查看某个命令的帮助信息：
``` bash
$ quasar [command name] --help
```

## Upgrade

需要在 quasar 项目目录中运行，检查当前项目可更新的 Quasar 包。

```bash
# 查看所有选项：
$ quasar upgrade -h

# 检查没有破坏性更新的包并展示
# 但是不会自动安装
$ quasar upgrade

# 检查预发布版本的更新：
$ quasar upgrade -p

# 检查 major 版本的更新（包括破坏性的更新）
$ quasar upgrade -m

# 执行更新
# 可同时使用上述参数来指定更新何种版本
$ quasar upgrade -i
```

::: warning 使用编辑器自带终端时的注意事项
如果您在使用一个编辑器内置的终端运行 `quasar upgrade` 命令并得到报错: *Command not found* 或 *@quasar/cli* version appears to be *undefined* 时。您需要检查编辑器终端的相关设置： 取消勾选 *Add 'node_modules/.bin' from the project root to %PATH%* 然后重启编辑器。
:::

## Info
Quasar CLI 配备了多个 NPM 包（Vite，Vue 等）的稳定组合，这些软件包在经过大量测试后会频繁更新。

有时为了定位问题，需要查看您的项目中各个包的版本，请在项目根目录中运行以下命令：

``` bash
$ quasar info
```

## Dev

```bash
$ quasar dev -h

  描述
    以开发模式启动您的应用（具有热更新，错误报告等功能）

  用法
    $ quasar dev
    $ quasar dev -p <port number>

    $ quasar dev -m ssr

    # 是 "quasar dev -m cordova -T ios" 命令的别名
    $ quasar dev -m ios

    # 是 "quasar dev -m cordova -T android" 命令的别名
    $ quasar dev -m android

    # 传递更多的参数和选项给底层的 "cordova" 或 "electron"
    $ quasar dev -m ios -- some params --and options --here
    $ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
    # 当在 Windows 上使用 Powershell 时：
    $ quasar dev -m ios '--' some params --and options --here
    $ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox

  选项
    --mode, -m       应用模式 [spa|ssr|pwa|bex|cordova|capacitor|electron] (默认值: spa)
    --port, -p       将应用开发服务运行在哪个端口号上
    --hostname, -H   用于应用开发服务的主机名（hostname）
    --help, -h       显示帮助信息

    只在 Cordova 模式下可用的选项：
    --target, -T     (必填值) 应用平台
                        [android|ios]
    --emulator, -e   (可选值) 模拟器名称
                        例如：iPhone-7, iPhone-X
                        iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2
    --ide, -i        在 IDE 中打开 (Android Studio / XCode) Cordova 项目，这种情况下 "--emulator" 参数将会失效

    --devtools, -d   打开远程的 Vue Devtools

   只在 Capacitor 模式下可用的选项：
    --target, -T     (必填值) 应用平台
                        [android|ios]
```

Quasar 开发服务器允许您通过编译和维护内存中的代码来开发应用程序。web 服务器将为您的应用程序提供服务，同时提供开箱即用的热重新加载。在内存中运行可以在更改代码时更快地重建。

> 热重新加载不仅仅是在代码更改时刷新浏览器。它跳过刷新并动态更新代码，同时保持应用程序的状态（如 Vue 的 model 数据）。请注意，在某些特殊情况下，这是不可能的，因此 dev Web 服务器将会刷新您的浏览器。（始终确保一次只运行一个 Quasar CLI 实例，否则热重新服务和其他服务将中断）

根据您想要开发的内容，您可以使用 `quasar dev` 命令启动开发服务器，如下所示：

``` bash
# 开发一个 SPA
$ quasar dev
# ...或者
$ quasar dev -m spa

# 开发一个 SSR
$ quasar dev -m ssr

# 开发一个 PWA
$ quasar dev -m pwa

# 开发一个手机应用 (通过 Cordova)
$ quasar dev -m cordova -T [android|ios]
# 或者更短的格式：
$ quasar dev -m [android|ios]

# 开发一个 Electron App
$ quasar dev -m electron

# 开发一个 BEX 浏览器插件
$ quasar dev -m bex

# 传递更多的参数和选项给底层的 "cordova" 或 "electron"
$ quasar dev -m ios -- some params --and options --here
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# 当在 Windows 上使用 Powershell 时：
$ quasar dev -m ios '--' some params --and options --here
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

如果要更改应用程序的主机名或端口，有 3 种方式：
* 编辑 '/quasar.config.js':
  ```js
  devServer: {
    host: '...',
    port: ...
  }
  ```
* 在命令中传入 '-H' (hostname) 和 '-p' (port) 选项。
* 如果只是一次性配置，还可以通过环境变量来修改：
  ``` bash
  $ PORT=3000 quasar dev
  $ HOSTNAME=1.1.1.14 quasar dev
  ```

如果热重新加载似乎有问题，可以尝试两种修复方法：
* 使用更改项目文件夹的权限

  ```bash
  sudo chown -R username: .
  ```
* 或使用 root 权限运行 dev 服务器

  ```bash
  sudo quasar dev
  ```

## Build

```bash
$ quasar build -h

  描述
    打包构建您的应用

  用法
    $ quasar build
    $ quasar build -p <port number>

    $ quasar build -m ssr

    # 是 "quasar build -m cordova -T ios" 命令的别名
    $ quasar build -m ios

    # 是 "quasar build -m cordova -T android" 命令的别名
    $ quasar build -m android

    # 传递更多的参数和选项给底层的 "cordova"
    $ quasar build -m ios -- some params --and options --here
    # 当在 Windows 上使用 Powershell 时：
    $ quasar build -m ios '--' some params --and options --here

  选项：
    --mode, -m     应用开发模式 [spa|ssr|pwa|bex|cordova|capacitor|electron] (默认值: spa)
    --target, -T    应用平台
                      - Cordova (默认值: all installed)
                        [android|ios]
                      - Capacitor
                        [android|ios]
                      - Electron 通过 "electron-packager"（默认） 构建
                        [darwin|win32|linux|mas|all](默认值: yours)
                      - Electron 通过 "electron-builder" 构建
                        [darwin|mac|win32|win|linux|all](默认值: yours)
    --publish, -P   构建后触发 publishing 钩子（如果指定了的话）
                      - 如果使用 electron-builder 构建 Electron 此参数还有特殊效果
    --debug, -d     构建一个可调试的版本
    --skip-pkg, -s  只构建 UI (跳过创建 Cordova/Capacitor/Electron 应用程序)
                      - Cordova (只生成 in /src/cordova/www 目录下的 UI 文件)
                      - Capacitor (只生成 in /src/capacitor/www 目录下的 UI 文件)
                      - Electron (只创建 /dist/electron/UnPackaged 目录下的文件)
    --help, -h      显示帮助信息

    只在 Cordova 和 Capacitor 模式下可用的选项：
    --ide, -i       打开并在 IDE(Android Studio / XCode) 中构建而不是在控制台中构建

    只在 Electron 模式下可用的选项：
    --bundler, -b   选择构建器 (electron-packager 或者 electron-builder)
                      [packager|builder]
    --arch, -A      应用构建产物格式 App architecture
                      - 通过 "electron-packager" （默认）打包构建：
                          [ia32|x64|armv7l|arm64|mips64el|all](默认值：yours)
                      - 通过 "electron-builder" 打包构建：
                          [ia32|x64|armv7l|arm64|all]

    使用 electron-builder 并传入 "publish" 参数时：
    --publish, -P  发布选项 [onTag|onTagOrDraft|always|never]
                     - 见 https://www.electron.build/configuration/publish 页面
```

Quasar CLI 可以将所有内容打包在一起，并优化您的应用程序构建生产环境下的代码。它会利用压缩代码，提取三方组件，利用浏览器缓存等手动进行优化。

``` bash
# 构建一个 SPA  用于生产环境
$ quasar build
# ...or
$ quasar build -m spa

# 构建一个 SSR  用于生产环境
$ quasar build -m ssr

# 构建一个 PWA  用于生产环境
$ quasar build -m pwa

# 构建一个 BEX  用于生产环境
$ quasar build -m bex

# 构建一个手机应用，用于生产环境 (通过 Cordova)
$ quasar build -m cordova -T [android|ios]
# 或者更短的格式：
$ quasar build -m [android|ios]

# 构建一个 electron 桌面应用，用于生产环境
$ quasar build -m electron

# 传递更多的参数和选项给底层的 "cordova"
$ quasar build -m ios -- some params --and options --here
# 当在 Windows 上使用 Powershell 时：
$ quasar build -m ios '--' some params --and options --here

# 构建一个可调试的版本
# (带有 source-maps 并且不会压缩代码)
$ quasar build -d [-m <mode>]
```

## Clean
清除所有构建产物：

``` bash
$ quasar clean
```

## New
生成 Components, Pages, Layouts, Vuex Store.

::: tip
这个命令只是一个辅助，用于快速创建一个页面/布局/组件/vuex store 的模板文件。您可以不需要使用它，但当您不知道如何开始时可以帮助您。
:::

```bash
$ quasar new -h

  描述
    快速创建一个页面/布局/组件/store 的模板文件.

  用法
    $ quasar new <p|page> [-f <option>] <page_file_name>
    $ quasar new <l|layout> [-f <option>] <layout_file_name>
    $ quasar new <c|component> [-f <option>] <component_file_name>
    $ quasar new <b|boot> [-f ts] <boot_name>
    $ quasar new <s|store> [-f ts] <store_module_name>

    # 示例:

    # 创建 src/pages/MyNewPage.vue:
    $ quasar new p MyNewPage

    # 创建 src/pages/MyNewPage.vue and src/pages/OtherPage.vue:
    $ quasar new p MyNewPage OtherPage

    # 创建 src/layouts/shop/Checkout.vue
    $ quasar new layout shop/Checkout.vue

    # 创建 src/layouts/shop/Checkout.vue （使用 TypeScript 和 选项式 API 的格式）
    $ quasar new layout -f ts-options shop/Checkout.vue

    # 创建一个 TypeScript 格式的 store
    $ quasar new store -f ts myStore

  选项：
    --help, -h            显示帮助信息

    --format -f <option>  (可选的) 为模选择一个支持的格式
                          Option can be:
                             * ts-options - TS 选项式 API
                             * ts-composition - TS 组合式 API
                             * ts-class - [被废弃的] TS class 风格语法
                             * ts - 创建 TS 格式的 boot 和 store 文件时可用
```

## Mode

```bash
$ quasar mode -h

  描述
    添加或删除 PWA / BEX / Cordova / Capacitor / Electron 模式。

  用法
    $ quasar mode [add|remove] [pwa|ssr|bex|cordova|capacitor|electron] [--yes]

    # 检查当前项目安装了哪些开发模式：
    $ quasar mode

  Options
    --yes, -y     当删除一个 Quasar 模式时，跳过 "Are you sure?" 的询问
    --help, -h    显示帮助信息
```

只有当您的项目是使用 Quasar CLI 创建的时，您才能构建 SPA (单页面应用), SSR (服务端渲染应用), PWA (渐进式 Web 应用), 手机 App (通过 Cordova), 或/和 Electron 应用。当您开发时，您可以直接运行 "quasar dev" 或 "quasar build"，相关的模式会被自动安装。

添加开发模式会在项目的根目录下添加一个 "src-*" 目录，其中是被添加模式的专属源代码：

| 目录 | Mode | 描述 |
| --- | --- | --- |
| src-ssr | ssr | 包括生产环境下的 Node 服务代码。 |
| src-pwa | pwa | 包括 Service Worker 文件供您调整。 |
| src-cordova | cordova | 其中是一个 Cordova 项目，它会使用 src 目录下的代码作为视图内容。调整您的 Cordova 配置，可以添加/删除平台、启动画面、Cordova 插件等。不要修改 "src-cordova/www" 目录下的文件，因为它们是使用 src 下的文件构建出来的，每次构建都会被重新覆盖。 |
| src-electron | electron | 包括 Electron 主进程的代码，渲染进程会采用 src 目录下的代码。 |
| src-bex | bex | 包括适用于开发浏览器插件的专属文件。 |

如果您发现您不需要某个开发模式时，您可以删除它，**这将永久删除**相应的 "src-*"文件夹。

```bash
$ quasar mode remove pwa
```

## Describe
这个命令可以查看您项目中使用的任意一个 Quasar 组件/指令/插件的 API。
**它查询的是您项目中安装的特性的 Quasar 版本**

例如: `$ quasar describe QIcon`, `$ quasar describe TouchPan`, `$ quasar describe Cookies`.

```bash
$ quasar describe -h

  描述
    查询项目中使用的 Quasar 的组件 API。

  用法
    $ quasar describe <component/directive/Quasar plugin>

    # 展示所有信息：
    $ quasar describe QIcon

    # 只展示 props 相关的信息：
    $ quasar describe QIcon -p
    # 只展示 props 和 methods 相关的信息：
    $ quasar describe QIcon -p -m
    # 使用 "si" 过滤信息
    $ quasar describe QIcon -f si
    # 只展示 props 相关的信息并使用 "co" 过滤：
    $ quasar describe QIcon -p -f co

    # 打开文档链接：
    $ quasar describe QIcon -d

  选项
    --filter, -f <filter> 过滤 API 信息
    --props, -p           展示 props 相关 API 信息
    --slots, -s           展示 slots 相关 API 信息
    --methods, -m         展示 methods 相关 API 信息
    --events, -e          展示 events 相关 API 信息
    --value, -v           展示 value 相关 API 信息
    --arg, -a             展示 arg 相关 API 信息
    --modifiers, -M       展示 modifiers 相关 API 信息
    --injection, -i       展示 injection 相关 API 信息
    --quasar, -q          展示 quasar conf options 相关 API 信息
    --help, -h            显示帮助信息
```
示例：
```bash
$ quasar describe QIcon

 Describing QIcon component API
 describe is based on your project's Quasar version

 Properties

   name (String)
     describe: Name of the icon, following Quasar convention
     Examples:
       map
       ion-add

   color (String)
     describe: Color name for component from the Quasar Color Palette
     Examples:
       primary
       teal-10

   size (String)
     describe: Size in CSS units, including unit name
     Examples:
       16px
       2rem

   left (Boolean)
     describe: Apply a standard margin on the left side. Useful if icon is on the right side of something.

   right (Boolean)
     describe: Apply a standard margin on the right side. Useful if icon is on the left side of something.

 Slots

   default
     Suggestions: QTooltip or QMenu

 Scoped Slots

   *No scoped slots*

 Events

   *No events*

 Methods

   *No methods*
```

## Inspect
这个命令用于查看 Quasar CLI 生成的 Vite 配置。

```bash
$ quasar inspect -h

  描述
    查看 Quasar CLI 生成的 Vite 配置。

  用法
    $ quasar inspect
    $ quasar inspect -c build
    $ quasar inspect -m electron -p 'build.outDir'

  Options
    --cmd, -c        Quasar 命令 [dev|build] (默认: dev)
    --mode, -m       应用开发模式 [spa|ssr|pwa|bex|cordova|capacitor|electron] (默认: spa)
    --depth, -d      深度 (默认: 2)
    --path, -p       Path of config in dot notation
                        Examples:
                          -p module.rules
                          -p plugins
    --thread, -t     只展示某个特定的开发模式信息
    --help, -h       显示帮助信息
```

## Ext
这个命令用于管理 [App 扩展](/app-extensions/introduction).

```bash
$ quasar ext -h

  描述
    管理 Quasar App 扩展

  用法
    # 展示所有安装的扩展
    $ quasar ext

    # 添加一个 Quasar App 扩展
    $ quasar ext add <ext-id>

    # 删除 Quasar App 扩展
    $ quasar ext remove <ext-id>

    # 添加一个 Quasar App 扩展，但是跳过 npm 安装过程
    # （假设已经安装了）
    $ quasar ext invoke <ext-id>

    # 删除一个 Quasar App 扩展，但是跳过卸载 npm 包的过程
    $ quasar ext uninvoke <ext-id>

  Options
    --help, -h       显示帮助信息
```

## Run
这个命令用于运行某个 [App 扩展](/app-extensions/introduction)中的命令

```bash
$ quasar run -h

  描述
    运行某个 Quasar App 扩展中的命令

  用法
    $ quasar run <extension-id> <cmd> [args, params]
    $ quasar <extension-id> <cmd> [args, params]

    $ quasar run iconify create pic -s --mark some_file
    $ quasar iconify create pic -s --mark some_file
        # 注意："iconify" 只是一个举例，并一定真实存在。
        # 在项目中查找某个叫做 "iconify" 的扩展
        # (quasar-app-extension-iconify extension package)
        # 然后运行它提供的 "create" 命令，并传入 "pic" 和 "-s --mark some_file" 参数

  Options
    --help, -h       显示帮助信息
```

## Serve

这个命令也可以在生产环境中使用，它由全局安装的 `@quasar/cli` 包提供。
```bash
$ quasar serve -h

  描述
    Start a HTTP(S) server on a folder.

  用法
    $ quasar serve [path]
    $ quasar serve . # 服务当前的目录

    如果您想服务启动一个使用 CLI 构建的 SSR 目录，那么服务控制权将会交给  /index.js 文件，并且传入的参数无效。

  Options
    --port, -p              服务使用的端口号 (默认: 4000)
    --hostname, -H          使用的地址 (默认: 0.0.0.0)
    --gzip, -g              压缩内容 (默认: true)
    --silent, -s            隐藏日志消息
    --colors                打印带高亮的日志消息 (默认: true)
    --open, -o              启动后在浏览器中打开
    --cache, -c <number>    最大缓存时间，单位秒(max-age)
                            不对 /service-worker.js 文件生效
                            (默认: 86400 = 24 小时)
    --micro, -m <seconds>   Use micro-cache (默认: 1 second)

    --history               使用 history 回退 API；
                              所有的请求都会回退到 /index.html，除非设置了 "--index" 参数
    --index, -i <file>      History 模式中的 index url
                              (默认: index.html)

    --https                 开启 HTTPS
    --cert, -C [path]       SSL cert 文件 (可选) 的路径
    --key, -K [path]        SSL key 文件 (可选) 的路径
    --proxy <file.js>       定义代理特殊请求的文件；
                            文件必须导出一个数组 ({ path, rule })
                            见下方示例：
                            https://github.com/chimurai/http-proxy-middleware
    --cors                  为所有的请求开启跨域 （CORS）
    --help, -h              显示帮助信息

  代理文件示例：
    module.exports = [
      {
        path: '/api',
        rule: { target: 'http://www.example.org' }
      }
    ]
    --> 将会被转化成 app.use(path, httpProxyMiddleware(rule))
```

### 自定义 Node server
当构建一个 SPA 或 PWA 时，产物目录可以使用任意的静态服务器提供服务。为了测试它（假设您没有特定的 publicPath 或者没有使用 Vue 路由的 "history" 模式），您可以使用 "http-server" npm 包。

或者您可以建立您自己的服务器。 这里有些例子：

```js
// 当使用默认的 "hash" 路由模式时
const
  express = require('express'),
  serveStatic = require('serve-static'),
  port = process.env.PORT || 5000

const app = express()

app.use(serveStatic(...path-to-dist...))
app.listen(port)
```

```js
// 当使用 "history" 路由模式时
const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(...path-to-dist...))
app.listen(port)
```

如果您需要重写 API 的 URL，或者需要代理您的 API 请求，那么您可以使用 "http-proxy-middleware" 软件包：

```js
// 在前面的两个例子中加上这一点:
const { createProxyMiddleware } = require('http-proxy-middleware')

// ...
app.use('/api', createProxyMiddleware({
  target: `http://my-api.com:5050`,
  pathRewrite: {"^/api" : ""}
}))

// then app.listen(...)
```

最后，运行文件：

```bash
$ node my-server.js
```

## Create
创建一个 Quasar 项目 （app，App 扩展或 UI kit），**可自定义**开始模板。

```bash
$ quasar create <folder_name> --kit <address> [--branch <branch_name>]
```
您可以通过提供**本地**文件夹路径来使用计算机上存储的开始模板 （例如： `quasar create --kit ./my-custom-starter-kit`）。

您也可以使用存储在公开的 Git 仓库中的开始模板：
- GitHub - `github:owner/name` or simply `owner/name`
- GitLab - `gitlab:owner/name`
- Bitbucket - `bitbucket:owner/name`

默认会拉取仓库中的 `master` 分支，但是您也可以手动指定分支，通过 `--branch <branch name>` 参数，（例如：`quasar create --kit owner/name --branch my-branch`）。

::: warning
在 Quasar 生态系统中构建可重用代码和 UI 组件的首选方法是应用程序扩展。只有当您真正知道自己在做什么，并且意识到 Quasar 团队为您提供帮助不足应对时，再考虑使用自定义入门套件。
:::
