---
title: Electron Preload 预加载脚本
desc: (@quasar/app-vite)Quasar 项目中如何使用 Electron Preload 脚本处理 Node 集成。
---

处于安全的原因，渲染进程（`/src` 目录中的 UI 代码）无法访问 Nodejs 的能力。然而，您可以通过 Electron Preload 预加载脚本将 Node.js 与渲染进程桥接。Preload 脚本位于 `/src-electron/electron-preload.[js|ts]`。使用 `contextBridge` 将 UI 中需要的能力注入。

由于 preload 脚本运行在 Node.js 环境中，请小心使用它的能力！

## 如何使用它
在 `/src-electron/` 目录中，有一个 `electron-preload.js` 文件，在此书写您的 preload 脚本代码。

请确保您的 `/src-electron/electron-main.[js|ts]` 中有以下内容（在 "webPreferences" 附件的部分）：

```js
// file: /src-electron/electron-main.[js|ts]

// Add this at the top:
import path from 'path'

// ...

function createWindow () {
  // ...
  mainWindow = new BrowserWindow({
    // ...
    webPreferences: {
      // HERE IS THE MAGIC:
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
    }
  })
```

`/src-electron/electron-preload.[js|ts]` 示例：

```js
// 注入 window.myAPI.doAThing() 到渲染进程的示例

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

::: warning

1. 请注意，此文件在 Node.js 环境中运行
2. 如果您导入了一些来自 node_modules 中的内容，请确保您将其安装在了 /package.json > "dependencies" 中，而不是 "devDependencies"。
:::

## 安全注意事项
仅仅使用 `contextBridge` 并不意味着你所做的一切都是安全的。
例如，下面的代码是不安全的：


```js
// BAD code; DON'T!!
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

它直接暴露了强大的 API，没有进行任何类型的参数过滤。这将允许任何网站发送您不希望的任意 IPC 消息。公开基于 IPC 的 API 的正确方法是为每条 IPC 消息提供一个方法。

```js
// Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

现在， `loadPreferences` 可以在您的 javascript 中全局访问（如：`window.myAPI.loadPreferences`）。

::: warning
确保使用与现有 `Window` 中的属性不冲突的名称。
:::

上述代码会触发主进程中的如下代码：

```js
ipcMain.handle('load-prefs', () => {
  return {
    // 包含 preferences 的对象
  }
})
```

## 自定义 preload 脚本路径

您可能希望修改 preload 脚本的位置（或者主进程代码文件），那么需要修改 `/quasar.config.js`：

```
// should you wish to change default files
sourceFiles: {
  electronMain: 'src-electron/electron-main.js',
  electronPreload: 'src-electron/electron-preload.js'
}
```
