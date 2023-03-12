---
title: Electron 访问文件
desc: (@quasar/app-webpack)在 Quasar 桌面项目中如何访问文件。
---

## 使用 __dirname & __filename

由于主进程打包时使用 Esbuild，所以使用 `__dirname` 和 `__filename` 可能会在生产环境中产生一些非预期的结果。参照下面的文件结构，您可以注意到在生产环境下 electron-main.js 和 electron-preload.js 文件会被放在 `dist/electron-*` 目录下，请基于此目录结构使用 `__dirname` & `__filename`。

```bash
app.asar
└─ dist
   └─ electron-*
      ├─ js/...
      ├─ icons/
      ├─ node_modules/
      ├─ index.html
      ├─ package.json
      ├─ electron-main.js
      ├─ electron-preload.js
      └─ ...contents of /public
```

## 读写本地文件
使用 Electron 的一大好处是能够访问用户的文件系统。这使您能够在本地系统上读写文件。为了解除 Chromium 的限制进行读写应用的内部文件，您可以使用 Electron 提供的 API，特别是 `app.getPath(name)` 函数，它可以帮助您获取系统目录，如用户的桌面，系统的临时目录等。

我们可以使用 userData 目录，它是专门为我们的应用程序保留的，因此我们可以确信其他程序或其他用户交互不会篡改这个文件空间。

```js
// electron-main or electron-preload

import path from 'path'
import { app } from '@electron/remote'

const filePath = path.join(app.getPath('userData'), '/some.file')
```

## 访问 Public 目录
如果出于某种原因，您将一些重要的文件存放在了 /public 目录下，那么您可以通过以下代码访问它。为了理解这段代码为什么可以访问到它，请阅读上述的“使用 __dirname & __filename”部分。

```js
// electron-main or electron-preload

import path from 'path'

const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER)
```
