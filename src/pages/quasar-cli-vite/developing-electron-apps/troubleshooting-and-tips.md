---
title: 常见问题
desc: (@quasar/app-vite) 使用Quasar开发Electron桌面应用时的常见问题和技巧。
---

## 浏览器调试工具

您可能希望您的应用程序只允许在开发模式下访问浏览器 devtools。在生产版本（未启用调试）上禁用此行为。

当我们处于开发模式时，为什么不在默认情况下打开devtools呢。

```js
// electron-main.[js|ts]

function createWindow () {
  mainWindow = new BrowserWindow({ ... })

  if (process.env.DEBUGGING) {
    // 开发模式，或者开启了 debug 的生产版本
    mainWindow.webContents.openDevTools()
  }
  else {
    // 生产环境下关闭浏览器调试工具
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow.webContents.closeDevTools()
    })
  }
}
```

## 调试主进程
在开发中运行应用程序时，您可能已经注意到来自主进程的调试器消息中提到了一个远程调试器。自从 electron@^1.7.2 发布时，就引入了通过 Inspect API 进行远程调试，可以通过使用 Google Chrome 打开提供的链接或通过另一个调试器轻松访问，该调试器可以使用默认端口 5858（例如 Visual Studio Code）远程连接到主进程。

```bash
Debugger listening on ws://127.0.0.1:5858/b285586a-6091-4c41-b6ea-0d389e6f9c93
For help, see: https://nodejs.org/en/docs/inspector
```

## 应用在 Windows 的暗色模式下没有打开

一些 Chrome DevTools 扩展不能在 Windows 暗色主题下很好地与 electron 6+ 配合使用。Quasar 提供了一种在 `electron-main.js` 文件中的变通方法：在启动应用程序之前删除 `DevTools Extensions`。

```javascript
import { app, BrowserWindow, nativeTheme } from 'electron'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }
```

更新信息请参考 [electron bug report](https://github.com/electron/electron/issues/19468)。
