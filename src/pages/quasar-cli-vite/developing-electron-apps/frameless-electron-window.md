---
title: 无边框 Electron 窗口
desc: (@quasar/app-vite) 如何给Quasar桌面应用隐藏边框。
related:
  - /vue-components/bar
---
将 Electron 无边框窗口与  [QBar](/vue-components/bar) 一起使用是一个不错的组合：

## 主进程
### 设置无边框窗口
首先，安装 `@electron/remote` 依赖。

```bash
$ yarn add @electron/remote
// or:
$ npm install @electron/remote
```
然后，在您的 `src-electron/main-process/electron-main.js` 文件中添加以下代码：

```js
// src-electron/main-process/electron-main.js

import { app, BrowserWindow, nativeTheme } from 'electron'
import { initialize, enable } from '@electron/remote/main' // <-- 添加这里
import path from 'path'

initialize() // <-- 添加这里

// ...

mainWindow = new BrowserWindow({
  width: 1000,
  height: 600,
  useContentSize: true,
  frame: false // <-- 添加这里
  webPreferences: {
    // ...
  }
})

enable(mainWindow.webContents) // <-- 添加这里

mainWindow.loadURL(process.env.APP_URL)

// ...
```

注意，我们还需要手动地启用 remote 模块。我们将在预加载脚本中使用它来为渲染线程提供窗口最小化/最大化/关闭功能。

### 预加载脚本
由于我们不能在渲染进程中直接访问 Electron 的能力，我们需要通过预加载脚本（`src-electron/main-process/electron-preload.js`）来提供必要的功能，我们需要编辑它：

```js
// src-electron/main-process/electron-preload.js

import { contextBridge } from 'electron'
import { BrowserWindow } from '@electron/remote'

contextBridge.exposeInMainWorld('myWindowAPI', {
  minimize () {
    BrowserWindow.getFocusedWindow().minimize()
  },

  toggleMaximize () {
    const win = BrowserWindow.getFocusedWindow()

    if (win.isMaximized()) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  },

  close () {
    BrowserWindow.getFocusedWindow().close()
  }
})
```

## 渲染进程
### 处理窗口拖拽
我们使用一个无边框窗口时，我们还需要为用户提供在桌面上任意移动应用程序的能力（只有在使用无边框窗口时才需要）。您可以使用 `q-electron-drag` 和 `q-electron-drag--exception` Quasar CSS 类来帮您。

```html
<q-bar class="q-electron-drag">
  ...
</q-bar>
```

它允许用户在点击、按住鼠标来拖动应用程序窗口。

虽然这是一个很好的功能，但您还必须考虑到一些例外情况。自定义状态栏中可能有您不希望它触发窗口拖动的元素。[QBtn](/vue-components/button) **组件默认不会触发此拖拽行为**。您可以给 `q-electron-drag` 的子元素添加 `q-electron-drag--exception` CSS 类来排除它的拖拽行为。

下面是给一个图标排除拖拽行为的示例：

```html
<q-bar class="q-electron-drag">
  <q-icon name="map" class="q-electron-drag--exception" />

  <div>My title</div>
</q-bar>
```

### 最小化/最大化/关闭应用

<doc-example title="Full example" file="frameless-electron-window/StatusBar" />

在上面的示例中，我们给自定义边框添加了 `q-electron-drag`，同时通过预加载脚本注入了 `window.myWindowAPI` 对象。

```js
// 在一个 .vue 文件中

// 我们在调用  Electron API 时做了判断，
// 这是为了我们构建其他模式时也能正常工作 (SPA/PWA/Cordova/SSR...)

export default {
  setup () {
    // we rely upon
    function minimize () {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.minimize()
      }
    }

    function toggleMaximize () {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.toggleMaximize()
      }
    }

    function closeApp () {
      if (process.env.MODE === 'electron') {
        window.myWindowAPI.close()
      }
    }

    return { minimize, toggleMaximize, closeApp }
  }
}
```
