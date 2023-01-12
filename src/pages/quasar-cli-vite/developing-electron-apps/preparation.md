---
title: 开发 Electron 的准备工作
desc: (@quasar/app-vite) 如何给 Quasar 项目添加 Electron 开发模式。
---
开始真正的开发前，我们需要进行一些准备工作。

## 1. 添加 Quasar Electron 开发模式
为了开发/构建一个 Quasar Electron 应用，我们需要为 Quasar 项目添加 Electron 模式。需要运行以下命令来安装相关依赖并创建 `/src-electron` 目录。

```bash
$ quasar mode add electron
```

每个 Electron 应用都有两个进程：一个是主进程（使用 `/src-electron` 目录中的代码处理应用窗口和初始化工作），另一个是渲染进程（基本上是您的 `/src` 目录下的 UI 代码）。


新创建的目录结构如下：

```bash
.
└── src-electron/
    ├── icons/                 # 不同平台下的应用图标
    |   ├── icon.icns             # Darwin（MacOS） 平台下的应用图标
    |   ├── icon.ico              # win32 (Windows) 平台下的应用图标
    |   └── icon.png              # 所有平台的托盘图标文件
    ├── electron-preload.js   # (or .ts) Electron 预加载（preload）脚本吗，用于注入 Node.js 能力到渲染进程
    └── electron-main.js      # (or .ts) 主进程代码
```

### Windows  用户的注意事项
如果您在安装 node-gyp 时遇到错误，您的电脑可能缺少必要的构建工具。例如 Python 和 Visual Studio 等。所幸，这里有一个简单的工具可以帮您处理问题。

第一步要做的是检查我们的 npm 版本，确保没有过时，可以通过[npm-windows-upgrade](https://github.com/felixrieseberg/npm-windows-upgrade)来完成。但如果您在使用 yarn，那么可以跳过这个检查。

然后我们可以使用 [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools) 继续安装上述的构建工具，他会为我们在全局依次安装 Visual C++，Python 等等。

::: warning 注意：2019 年 4 月
使用 Powershell.exe（管理员方式运行） `npm install --global windows-build-tools` 目前似乎失败，错误指向 python2 和 vctools。您可以使用  Chocolatey 来解决这个问题：

**Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))**

然后运行： `choco upgrade python2 visualstudio2017-workload-vctools`.
:::

这时应该安装成功了，但如果没有，那么您将需要全新安装 Visual Studio。请注意，这些不是 Quasar 的问题，而是与 NPM 和 Windows 有关。

## 2. 开始开发
如果您想直接进入开发过程，您可以跳过上面的 "quasar mode"  步骤，直接运行：

```bash
$ quasar dev -m electron

# 传递更多的参数和选项给底层的"electron"
$ quasar dev -m electron -- --no-sandbox --disable-setuid-sandbox
# 当在 Windows 上使用 Powershell 时：
$ quasar dev -m electron '--' --no-sandbox --disable-setuid-sandbox
```

如果缺少 Electron 模式，项目将自动添加。运行成功后会打开一个 Electron 窗口渲染您的应用并在右边打开一个开发者调试工具。
