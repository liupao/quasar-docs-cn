---
title: Electron 打包命令
desc: (@quasar/app-vite)Quasar CLI 提供的用于开发或打包桌面应用的命令。
---

## 开发
```bash
$ quasar dev -m electron

# 或更长的格式：
$ quasar dev --mode electron

# 传递更多的参数和选项给底层的 "electron"
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# 当在 Windows 上使用 Powershell 时：
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

运行成功后会打开一个 Electron 窗口渲染您的应用并在右边打开一个开发者调试工具。当您修改渲染进程的代码时，项目将会热更新，但是修改主进程的代码时窗口将会重启。

关于如何修改 Esbuild 打包主进程和 Preload 脚本的配置项，请参考：[Electron 配置项](/quasar-cli-vite/developing-electron-apps/configuring-electron)页面


### Chrome DevTools

当处于开发模式时，使用以下快捷键（当您的应用窗口聚焦时）：
- macOS: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> 或者 <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> 或者 <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> 或者 <kbd>F12</kbd>

### Vuejs Devtools
您可能也想使用 Vuejs Devtools 来调试渲染进程：

```bash
$ quasar dev -m electron --devtools
```

## 构建生产版本
```bash
$ quasar build -m electron

# 或者更长的格式：
$ quasar build --mode electron
```

这个命令会为您的应用构建生产版本，然后使用 electron-packager 将其打包成可执行文件。请参考 [Electron 配置项](/quasar-cli-vite/developing-electron-apps/configuring-electron)页面进行配置。

如果您想构建一个 UI 带调试功能的版本：

```bash
$ quasar build -m electron -d

# 或者更长的格式：
$ quasar build -m electron --debug
```

### 非 Windows 用户的注意
如果您想使用一个非 Windows 平台来构建一个 Windows 应用，并自定义其图标，您必须安装 [wine](https://www.winehq.org/)。[更多信息](https://github.com/electron-userland/electron-packager#building-windows-apps-from-non-windows-platforms)。

## 发布 （仅支持 electron-builder）
```bash
$ quasar build -m electron -P always

# 或者更长的格式：
$ quasar build --mode electron --publish always
```

您可以指定使用 `electron-builder` 来构建您的应用，直接在命令行的构建命令中加上 `--bundler builder`，或者修改 `quasar.config.js` 中的 `electron.bundler` 配置项。使用 `electron-packager` 时 --publish 参数不会生效。

目前（2019年6月）支持发布的平台包括： GitHub、Bintray、S3、Digital Ocean Spaces、或一个 generic HTTPS server。更多关于发布的信息，请[参考](https://www.electron.build/configuration/publish)。


`-P` 的有效选项包括 "onTag"、"onTagOrDraft"、"always" 和 "never"，这些选项在上面的链接中进行了解释。此外，您必须在 `quasar.config.js` 中的 `electron.builder` 中配置有效的 `publish` 字段。

下面是一个讲的示例，发布一个 Windows EXE 安装包到  Amazon S3 上：

```js
// quasar.config.js

electron: {
  bundler: 'builder', // 代替命令行中的  --bundler 参数
  builder: {
    appId: 'com.electron.myelectronapp',
    win: {
      target: 'nsis'
    },
    publish: {
      'provider': 's3',
      'bucket': 'myS3bucket'
    }
  }
```
