---
title: 处理 process.env
desc: (@quasar/app-vite) 如何在Quasar项目中根不同的环境加载不同的环境变量。
---

使用 `process.env` 可以帮助您：
  * 根据 Quasar 模式 (SPA/PWA/Cordova/Electron) 区分运行时的程序
  * 根据开发或生产环境，区分运行时的程序
  * 在构建时根据终端中的环境变量添加标志

## Quasar CLI 提供的环境变量

| `process.env.<name>` | 类型 | 说明 |
| --- | --- | --- |
| `DEV` | Boolean | 代码运行在开发环境下 |
| `PROD` | Boolean | 代码运行在生产环境下 |
| `DEBUGGING` | Boolean | 代码运行在开发环境下，或者带 `--debug` 参数的生产模式下 |
| `CLIENT` | Boolean | 代码运行在客户端（而不是服务端） |
| `SERVER` | Boolean | 代码运行在服务端（而不是客户端） |
| `MODE` | String | Quasar 开发模式 (`spa`, `pwa`, ...) |
| `NODE_ENV` | String | 有两种取值：`production` 或 `development`  |

## Vite 内置的 `.env`

更多信息参考[这里](https://cn.vitejs.dev/guide/env-and-mode.html)。

## 示例

```js
if (process.env.DEV) {
  console.log(`I'm on a development build`)
}

// process.env. MODE 来自 "quasar dev/build -m <mode>" 命令中的 <mode> 参数，默认为 spa
if (process.env.MODE === 'electron') {
  const { BrowserWindow } = require('@electron/remote')
  const win = BrowserWindow.getFocusedWindow()

  if (win.isMaximized()) {
    win.unmaximize()
  }
  else {
    win.maximize()
  }
}
```

## 剥离代码
当构建您的网站/应用时，会根据 proces.env 判断 `if ()` 分支。如果表达式为
"false"，则该分支中的代码会被删除，不会进入到最后的构建产物中去。示例：

```js
if (process.env.DEV) {
  console.log('dev')
}
else {
  console.log('build')
}

// 运行 "quasar dev" 会构建出：
console.log('dev')
// 运行 "quasar build" 会构建出：
console.log('build')
```

注意上面提到的 `if` 在计算过后，编译时也完全被去掉了，减少构建包的体积。

## 基于 process.env 的导入


您可以将上一节中学习的内容与动态导入结合起来：

```js
if (process.env.MODE === 'electron') {
  import('my-fancy-npm-package').then(package => {
    // 注意下面的 "default"，您可以通过它来访问 npm 包导出的内容
    package.default.doSomething()
  })
}
```

## 添加变量到 process.env

您可以通过 `/quasar.config.js` 文件添加自定义的变量到 `process.env` 中。

了解不同类型的环境变量很重要：

* `/quasar.config.js` 中定义的来自终端中的变量。
* 传入您的 UI 代码中的环境变量。
```js
// quasar.config.js

// 访问终端中的变量
console.log(process.env)

module.exports = function (ctx) {
  return {
    // ...

    build: {
      // 传入到 UI 代码中的环境变量
      env: {
        API: ctx.dev
          ? 'https://dev.api.com'
          : 'https://prod.api.com'
      }
    }
  }
}
```

然后，在您的网站/应用中，您可以访问  `process.env.API`，它会指向上述设置的两个链接中的一个，到底是哪个取决于时开发环境还是生产环境。

您甚至可以将其与 `quasar dev/build` 命令中的变量的值结合在一起：

```bash
# 我们先在终端中设置一个变量
$ MY_API=api.com quasar build
```

```js
// 然后我们可以将其运用在 /quasar.config.js 中：
build: {
  env: {
    API: ctx.dev
      ? 'https://dev.' + process.env.MY_API
      : 'https://prod.' + process.env.MY_API
  }
}
```

#### 使用 dotenv

如果您想使用 `.env` 文件来定义环境变量，您可以使用 [dotenv](https://www.npmjs.com/package/dotenv)包。下面是一个示例：

```bash
$ yarn add --dev dotenv
```

然后，在您的`/quasar.config.js` 文件中：

```
build: {
  env: require('dotenv').config().parsed
}
```

请参考 [dotenv 文档](https://www.npmjs.com/package/dotenv)然后在项目根目录下创建必要的 `.env` 文件。

## 警告

1. 不要使用 `console.log(process)` 或 `console.log(process.env)`，出于安全的原因，这段代码将会报错。
2. 只有完整的对象路径会被正确解析，并在构建时正确替换。

    例如，使用下面的代码时，`console.log(process.env .my)` 会报错，但是  `console.log(process.env .my.prop)`会正常工作。

    ```js
    env: {
      my: { prop: 'value' }
    }
    ```
## 视频讲解
[quasar入门教程-quasar处理env](https://www.bilibili.com/video/BV1N3411N7Bd?share_source=copy_web&vd_source=c91bd9c1eab4dae95f036e5d67a76dcd)
