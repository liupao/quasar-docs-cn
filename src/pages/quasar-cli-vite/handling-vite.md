---
title: 配置 Vite
desc: (@quasar/app-vite) 如何在Quasar项目中管理Vite。
related:
  - /quasar-cli-vite/quasar-config-js
---

构建系统使用 [Vite](https://vitejs.dev) 来创建网站/应用的 UI （`/src` 目录）。如果您不熟悉 Vite，也不需要担心，所有的一切都是开箱即用的，因为我们已经为您做了适配。

## quasar.config.js 的用法

Quasar 已经为您做了开箱即用的默认 Vite 配置，但是如果您希望调整这些配置，你可以通过编辑 `/quasar.config.js` 文件中的 `build > extendViteConf (viteConf)` 函数来实现。

```js
// quasar.config.js
build: {
  extendViteConf (viteConf, { isServer, isClient }) {
    // 编辑 viteConf 即可修改 Vite 配置
  }
}
```
注意，您不需要在这个函数中返回任何内容，extendViteConf(viteConf) 其中的 viteConf 对象参数就是 Quasar 为您生成的 Vite 配置，您只需要修改这个对象就可以对 Vite 的配置进行修改，但前提是您确实知道自己在做什么。不要利用它修改 vite 的输入和输出相关的配置以及已经存在于 quasar.config.js > build 之中的其他配置。

## 查看 Vite 配置

Quasar CLI 提供了一个非常有用的命令可以输出当前的 Vite 配置：

```bash
$ quasar inspect -h

  说明
    查看 Quasar 生成的 Vite 配置

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

## 添加 Vite 插件

请先确保您使用 yarn/npm/pnpm 已经安装了您想用的 Vite 插件，然后编辑  `/quasar.config.js` 文件：

```js
build: {
  vitePlugins: [
    [ '<plugin-name>', { /* 插件配置项 */ } ]
  ]
}
```

There are multiple syntaxes supported:

```js
vitePlugins: [
  [ '<plugin1-name>', { /* 插件1的配置项 */ } ],
  [ '<plugin2-name>', { /* 插件2的配置项 */ } ],
  // ...
]

// 或：

vitePlugins: [
  [ require('<plugin1-name>'), { /* 插件1的配置项 */ } ],
  [ require('<plugin2-name>'), { /* 插件2的配置项 */ } ],
  // ...
]

// 最后，您可以指定使用下面这种特殊的格式，
// 但是这种方式有一个缺点：Quasar CLI 无法检查到您修改了配置项参数
// 所以需要您手动重启开发服务

vitePlugins: [
  require('<plugin1-name>')({ /* 插件1的配置项 */ }),
  require('<plugin2-name>')({ /* 插件2的配置项 */ })
  // ...
]
```

::: tip
实际上，您还可能会需要一些需要这样使用的插件：`require('<package-name>').default`，而不是 `require('<package-name>')`：

<br>

```js
vitePlugins: [
  [ require('<plugin1-name>').default, { /* 插件1的配置项 */ } ],
  // ...
]
```
:::

同时，也可以在 `/quasar.config.js` 文件的 `extendViteConf()` 函数中添加 Vite 插件。这在 SSR 模式中特别有用（当不局限于 SSR），可以指定某些插件只在服务端/客户端使用。

```js
build: {
  extendViteConf (viteConf, { isClient, isServer }) {
    viteConf.plugins.push(
      require('<plugin1-name>')({ /* 插件1的配置项 */ }),
      require('<plugin2-name>')({ /* 插件2的配置项 */ })
      // ...
    )
  }
}
```
此外，请不要忘记在 `/quasar.config.js` 文件中导出的函数中有一个 `ctx` 参数，您可以在整个配置文件中使用它来判断当前构建于何种 Quasar 开发模式，或者用它来判断当前环境是开发环境还是生产环境：

```js
module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf, { isClient, isServer }) {
        if (ctx.mode.pwa) {
          viteConf.plugins.push(/* ... */)
        }

        if (ctx.dev) {
          viteConf.plugins.push(/* ... */)
        }
      }
    }
  }
}
```

## 文件夹路径别名
Quasar 预设了一组常用的文件夹路径别名，您可以在项目的任何地方中使用它们，Vite 将会正确解析它们的路径。

| 别名 | 解析到 |
| --- | --- |
| `src` | /src |
| `app` | / |
| `components` | /src/components |
| `layouts` | /src/layouts |
| `pages` | /src/pages |
| `assets` | /src/assets |
| `boot` | /src/boot |
| `stores` | /src/stores (Pinia stores) |

#### 添加文件夹路径别名

添加自定义的别名，有两种方式：

1. 修改 `/quasar.config.js`：

```js
// quasar.config.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      alias: {
        myalias: path.join(__dirname, './src/somefolder')
      }
    }
  }
}
```

2. 或者，您可以直接扩展 Vite 配置并将其与现有别名列表合并。使用 `path.join` 以解析别名到您想要的的路径。


```js
// quasar.config.js
const path = require('path')

module.exports = function (ctx) {
  return {
    build: {
      extendViteConf (viteConf, { isServer, isClient }) {
        Object.assign(viteConf.resolve.alias, {
          myalias: path.join(__dirname, './src/somefolder')
        })
      }
    }
  }
}
```

## PostCSS

`*.vue` 文件中的样式（以及所有其他样式文件）默认通过 PostCSS 管道传输，因此您不需要为其使用特定的加载程序。

默认情况下，PostCSS 会使用 Autoprefixer。如果需要，可以在`/postcss.config.js` 文件中进行调整。
