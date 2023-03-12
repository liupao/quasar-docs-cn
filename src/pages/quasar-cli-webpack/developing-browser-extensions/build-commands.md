---
title: BEX 打包命令
desc: (@quasar/app-webpack) 通过 Quasar CLI 开发或打包一个浏览器插件（BEX）的命令列表。
---

## 开发

开发开发一个浏览器插件只需要以下命令：

```bash
$ quasar dev -m bex

# 或更长的格式：
$ quasar dev --mode bex
```

之前您可能已经有了 `src-bex` 文件夹，也可能还没有，但是运行上述命令之后肯定会有一个。现在我们已经创建了一个开发环境，我们需要将生成的浏览器插件加载到浏览器中。

当您开发 BEX 时，您会注意到 Quasar CLI 将打包的产物输出在 dist 目录下（默认在  `/dist/bex/`）：

```bash
.
└── dist/
    ├── ...files  # 从 /src-bex 中打包的代码
    └── www/      # 从 /src 中打包的代码
```

### Chrome

![在 Chrome 中安装一个 Quasar 浏览器插件](https://cdn.quasar.dev/img/adding-bex-to-chrome-with-debug.png)

根据上面的截图，步骤如下：

1. 在 Chrome 中，导航到 `chrome://extensions`。
2. 打开 "Developer Mode"。
3. 点击 "Load unpacked"，将会打开文件夹选择对话框，选择上述 `/dist/bex/` 目录。
4. 您将会看到您的 BEX 挂载在了 Chrome 上。

有关调试 Chrome 浏览器扩展的更多信息，请参阅[官方文档](https://developer.chrome.com/extensions/tut_debugging)。

### 其他基于 Chromium 的浏览器

虽然我们还没有测试所有基于 Chromium 的浏览器，但 BEX 模式应该与它们兼容。有关如何向特定浏览器添加浏览器扩展，请参阅相应的浏览器文档。

### Firefox

![在 Firefox 中安装一个 Quasar 浏览器插件](https://cdn.quasar.dev/img/adding-bex-to-firefox.png)

根据上面的截图，步骤如下：

1. 在 Firefox 中，导航到 `about:debugging`
2. 点击 "This Firefox"
3. 点击 "Load Temporary Add-on..."，将会打开文件选择对话框，选择 `dist/bex/manifest.json` 目录。**注意**，Firefox 需要的是 manifest 文件，而不是 `/dist/bex/` 目录。
4. 您将会看到您的 BEX 挂载在了 Firefox 上。

有关调试 Firefox 临时插件的更多信息，请参见 [Firefox Extension Workshop](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

### 热更新（HMR）

HMR 可用于浏览器插件开发，但工作方式略有不同，具体取决于您正在开发的浏览器。您需要等待浏览器插件在每次更改后重新打包生成，然后手动刷新浏览器选项卡页面或使用浏览器刷新开发的浏览器插件。

::: tip
**Chrome 与 Firefox 的差别** - 在开发浏览器插件时，您会经常修改 `src-bex` 文件夹下的文件。Firefox 将监听到这些更改并自动重新加载浏览器插件。但 Chrome 不会，当您在 Chrome 中进行了这些更改后，您需要导航到扩展（请参阅上面的 Chrome 部分），然后单击开发浏览器扩展中的刷新图标。
:::

## 调试

浏览器扩展在三种不同的环境中运行（更多内容将在后面的页面中介绍），它需要各种环境进行调试。


### 使用 Chrome

您可以在开发者工具的控制台中找到以下位置来调查错误和输出：

1. 弹窗 - 在页面或插件图标上右键并选择 `Inspect pop-up`。
2. 后台脚本（如：background-hooks.js）从 `Manage extensions - background page` 中打开开发者工具。
3. 内容脚本 - 注入脚本的页面。
4. 插件错误 - 与扩展相关的错误列表可以在中找到 `Manage extension - Errors`（如：manifest 配置错误）。

![Popup](https://cdn.quasar.dev/img/bex-debug-popup.png)

![Background scripts, Content scripts and Extension Errors](https://cdn.quasar.dev/img/bex-debug-bg.png)

如果您的代码更改没有应用到浏览器，您可以尝试:
- 从插件列表更新或重新加载扩展插件
- 重启浏览器
- 重启开发进程

有关更多信息,请访问[调试插件](https://developer.chrome.com/docs/extensions/mv2/tut_debugging/)。

## 打包生产环境

```bash
$ quasar build -m bex

# 或更长的格式：
$ quasar build --mode bex
```

Quasar CLI 将打包的产物输出在 dist 目录下（默认在  `/dist/bex/`）：

```bash
.
└── dist/
    ├── ...files                        # 从 /src-bex 中打包的代码
		├── www/                            # 从 /src 中打包的代码
    └── Packaged.your-project-name.zip  # 用于提交到插件市场的压缩包
```

::: tip
如需测试 `your-project-name.zip` 文件，将他们拖动到开发时加载插件的位置即可，Chrome 在 `chrome://extensions` 中，Firefox 在 `about:debugging` 中。
:::

### 关于压缩代码的注意事项

Chrome 和 Firefox 浏览器插件的部分审查过程检查插件实时部署的代码，考虑到这一点，不允许压缩代码。因此，为了便于审查，Quasar 不会混淆和压缩浏览器插件的内置代码。

考虑到任何插件都将直接在用户的计算机上运行，上传速度在这里不是一个需要担心的因素，因此不需要压缩代码。

## 发布到插件市场

Quasar 已经消除了构建和打包浏览器插件的负担，一旦您完成了扩展的开发，就可以发布它了。不同浏览器的发布过程不同，但官方文档将指导您完成整个过程。

**Chrome** - [发布一个 Chrome 浏览器插件](https://developer.chrome.com/webstore/publish)

**Firefox** - [发布一个 Firefox 浏览器插件](https://extensionworkshop.com/documentation/publish/)

::: tip 提示
BEX 模式应该与所有基于 chromium 的浏览器兼容。请参考它们关于发布插件的相关文档。
:::
