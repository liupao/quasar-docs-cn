---
title: Quasar CLI
desc: How to use the Quasar CLI, the premium developer experience for free.
---

Quasar CLI 是我们引以为傲的脚手架，您可以通过它构建:

* SPA (Single Page App，单页应用)
* SSR (Server-side Rendered App，服务端渲染) (可与 PWA 同时存在)
* PWA (渐进式 web 应用程序)
* BEX (Browser Extension，浏览器插件)
* 手机 App (Android, iOS, …) 通过 Cordova 或者 Capacitor 构建
* 跨平台的桌面应用 (使用 Electron 构建)

## 在线体验 Quasar CLI

您可以直接在浏览器中在线体验 Quasar CLI，而无需安装任何东西！
您还可以在其中使用命令行，因此它几乎与在本地创建项目完全相同。

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.quasar.dev)

## 安装

::: tip 环境要求:
* Webpack 版本的 Quasar CLI 需要 Node 12+ , vite 版本的 Quasar CLI 需要 Node 14+。.
* Yarn v1 (推荐) 或者 NPM.
:::

```bash
$ yarn global add @quasar/cli

# 或者使用:

$ npm i -g @quasar/cli
```

如果您想有以下特性，请选择 `Quasar CLI with Vite`：
* 更快的开发项目启动速度
* 更快的热更新
* 更快的打包
* 更优越的 PWA、SSR 和 BEX 模式（更多特性支持）

<q-btn color="brand-primary" no-caps no-wrap push label="Go to User Interface Components" to="/vue-components" />

## 创建项目/目录结构

1. 让我们通过下面的命令创建项目:

    ```bash
    $ yarn create quasar
    # 或者使用:
    $ npm init quasar
    ```
    <br>

2. 输入命令后会进入命令行界面选择 `App with Quasar CLI` 选项，然后选择 `Quasar v2`.

3. 接下来会询问您要选择 vite 还是 webpack 版本?

    ::: tip 如果您想有以下特性，请选择 `Quasar CLI with Vite`：
    * 更快的开发项目启动速度
    * 更快的热更新
    * 更快的打包
    * 更优越的 PWA、SSR 和 BEX 模式（更多特性支持）
    :::

4. 接下来命令行会继续提问您需要使用哪些模块，包括 ts，eslint，axios 等，跟随提示回答剩下的问题，就差不多完成了。

5. 创建完成，并确保成功安装项目依赖后，您可以使用 Quasar CLI 提供的`quasar dev`命令来运行项目，使用`quasar build`来打包项目。也可以使用 yarn 或 npx 来启动/打包项目(`yarn quasar dev/build` / `npx quasar dev/build`)，但是更推荐使用第一种方式。

    ::: tip
    如果您使用 yarn，请确保已经添加了 yarn 到您电脑的环境变量的 PATH 中 [global install location](https://yarnpkg.com/lang/en/docs/cli/global/):
    <br><br>

    ```bash
    # in ~/.bashrc or equivalent
    export PATH="$(yarn global bin):$PATH"

    # for fish-shell:
    set -U fish_user_paths (yarn global bin) $fish_user_paths
    ```
    <br>
     在 Windows 下，修改用户的 PATH 环境变量。如果您使用 yarn，则添加 `%LOCALAPPDATA%\yarn\bin`, 若使用 npm 则添加 `%APPDATA%\npm`.
    :::

    ::: tip WSL2
    微软推荐的 [WSL2 中的 Nodejs 开发环境设置](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-wsl2)。当使用 WSL2（Windows 的 Linux 子系统）时，微软建议将文件保存在 Linux 文件系统中，以实现性能最大化。如果项目文件在 Windows 上而不是在本地 Linux 文件系统上，项目的构建速度会慢 3 倍左右，而且 HMR（热模块重载）在没有 hack 的情况下将无法工作。这在基于 Windows 的开发环境的 Docker 中也是如此。
    :::

## Quasar CLI 是如何工作的

Quasar CLI（`@quasar/cli`）与 `@quasar/app-vite` 或 `@quasar/app-webpack` 协同工作。第一个包是可选的（但强烈建议全局安装），它允许您直接运行 Quasar CLI 的命令，如`quasar upgrade`（无缝升级 Quasar 的依赖）或 `quasar serve`（帮助启动一个 webserver 服务）。第二个包是它的核心（包含重要的命令：dev、build、inspect、info、descripe 等），它会被本地安装到每个 Quasar 项目文件夹中。

#### 在没有全局安装`@quasar/cli` 的情况下怎么运行

虽然您没有全局安装 `@quasar/cli`，但是 `@quasar/app-vite` 或者 `@quasar/app-webpack` 其中的一个会被安装到您的项目本地依赖中去，所以您可以通过下面两种方式来运行 CLI 的命令：

1. 在您项目的 `package.json` 中添加启动脚本，例如:
    ```js
    // package.json
    "scripts": {
      "dev": "quasar dev",
      "build": "quasar build",
      "build:pwa": "quasar build -m pwa"
    }
    ```

    这样,您就可以通过 `yarn dev` 或者 `yarn build` 或者 `npm run dev`,`npm run build` 来启动/打包您的项目，没有全局安装 `@quasar/cli` 也没有关系。

2. 或者，您可以直接通过 Yarn 运行 Quasar CLI 命令，例如:

    ```bash
    yarn quasar dev
    yarn quasar inspect
    # ..etc
    ```
    <br>

3. 或者使用 [npx](https://github.com/npm/npx):

    ```bash
    npx quasar dev
    npx quasar inspect
    # ..etc
    ```

## What next?

<q-btn color="brand-primary" no-caps no-wrap push label="去看看 vue 组件" to="/vue-components" />
