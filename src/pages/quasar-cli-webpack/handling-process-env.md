---
title: 处理 process.env
desc: (@quasar/app-webpack) 如何在 Quasar 项目中根不同的环境加载不同的环境变量。
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
`false`，则该分支中的代码会被删除，不会进入到最后的构建产物中去。示例：

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

但首先，这里需要理解两个概念。一个是在 `/quasar.config.js` 文件本身中可用的来自终端的环境变量，另一个是您传递给 UI 代码的环境变量。

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

请注意，上述方法将仅传递在 `.env` 文件中定义的内容，而不会传递终端中定义的内容（例如 `MY_API=api.com quasar build`），也不会覆盖 `.env` 文件。

如果您想要覆盖 `.env` 文件中的内容，或者想要使 `.env` 文件完全可选，则必须遵循另一种方法。如果您正在使用 CI/CD、Docker 等，您可能不想仅限于 `.env` 文件。这是一个示例：

```js
// quasar.config.js

// 如果存在 `.env` 文件，则从中加载，但不会覆盖现有的 `process.env.*` 值
require('dotenv').config()

// process.env 现在包含终端变量和来自 .env 文件的变量
// 优先级：
//   1. 终端变量（API_URL=https://api.com quasar build）
//   2. `.env` 文件
// 如果您希望 .env 文件覆盖终端变量，
// 使用 `require('dotenv').config({ override: true })` 代替

return {
// ...
  build: {
    env: {
      // 您必须手动定义要传递的所有变量
      API_URL: process.env.API_URL,
      // ...
    }
  }
// ...
```

## 故障排除

如果您错误地访问变量或者配置不正确，可能会在浏览器控制台中收到 `process is not defined` 的错误提示。

### 错误的使用

```js
// quasar.config.js > build
env: {
  FOO: 'hello',
}
```
```js
const { FOO } = process.env // ❌ 它不允许解构或类似操作
process.env.FOO             // ✅ 它只能替换直接使用的方式，如此

function getEnv(name) {
  return process.env[name] // ❌ 它无法分析动态使用情况
}

console.log(process)     // ❌
console.log(process.env) // ❌
// 如果您想查看可用的环境变量列表，
// 您可以在`quasar.config.js`中的“build > env”内部记录您要传递的对象。

console.log(process.env.FOO) // ✅
console.log(process.env.foo) // ❌ 大小写敏感
console.log(process.env.F0O) // ❌ 变量名存在拼写错误（中间o应为0）
```

### 配置错误

#### 手动定义

```js
// quasar.config.js > build
env: {
  FOO: 'hello',
}
```

```js
console.log(process.env.FOO) // ✅
console.log(process.env.BAR) // ❌ 它未在 `build > env` 中定义
```

#### dotenv

```js
// quasar.config.js > build
env: require('dotenv').config(/* ... */).parsed
```

如果 `.env` 文件不存在或文件名存在拼写错误：

```js
console.log(process.env.FOO) // ❌ `.env` 文件未加载，此操作将失败
```

如果 `.env` 文件以正确的名称存在，并且具有以下内容：

```bash
FOO=hello
```

```js
console.log(process.env.FOO) // ✅ 它已从`.env`文件中正确加载
console.log(process.env.BAR) // ❌ 它未在`.env`文件中定义
```

## 视频讲解
[quasar 入门教程-quasar 处理 env](https://www.bilibili.com/video/BV1N3411N7Bd?share_source=copy_web&vd_source=c91bd9c1eab4dae95f036e5d67a76dcd)