---
title: Vue CLI 的 Quasar 插件
desc: 将 Quasar 嵌入 Vue CLI 应用。
---

::: warning 警告
Quasar 社区中有一些 Vue CLI 提供跨平台支持的插件。与 Quasar CLI 开箱即用的方式相比，使用这些社区插件需要花费更多的时间与精力，并且不能保证最佳的开发体验，还不能使用 Quasar CLI 提供的全部功能。Quasar 没有专门测试这些插件，因此，使用这些插件时可能会遇到一些问题，除非这些组件库特别声明它们通过了测试。

在使用这种方式开发 Quasar 项目前，我们希望您能理解以下内容。为保证您在使用 Quasar 时获得最佳的开发体验，我们强烈建议您使用 Quasar CLI 模式开发项目，这样才不会错过 Vue CLI 的各项功能，才能使用 Quasar 的全部功能，如跨平台构建支持等。这还只是 Quasar CLI 优势的冰山一角，除此之外，您还能更好地使用 Vue，如，通过 Quasar 的 [Boot Files](/quasar-cli/boot-files#Anatomy-of-an-boot-file) 使用 Vue 的插件。

:::

利用 Vue CLI 插件使用 Quasar，需要全局安装 @vue/cli，确认版本是否正确时，请使用下述命令：

```bash
$ vue --version
```

如果之前安装过 Vue CLI 2.x.x，需使用以下命令卸载：

```bash
$ npm uninstall -g vue-cli
# 或使用 yarn，取决于之前的安装方式
$ yarn global remove vue-cli
```

使用下述命令安装 Vue CLI (v4.5.11+)：

```bash
$ npm install -g @vue/cli
```

使用下述命令创建 @vue/cli 项目。**注意，要在屏幕上显示的 Vue CLI 功能列表中选择 Babel**。

```bash
# 注意，要选择 Vue 3
$ vue create my-app
```

## 添加 Vue CLI 的 Quasar 插件
进入新建项目的目录，添加 CLI 插件。如果后期想反转这些操作，则应在安装插件前，预先 Commit 当前的修改。

::: warning 警告
Quasar 社区中的插件也为 Vue CLI 提供了跨平台支持，但与 Quasar CLI 相比，这些插件与 Quasar 的集成度不高，且会出现问题。
:::

```bash
$ cd my-app
$ vue add quasar
```

CLI 工具会询问是否需要让该插件替换一些已有的文件。如果希望查看插件提供的示例，以便于快速部署应用，则建议同意 CLI 插件已有的文件。

存于 package.json 或 vue.config.js（是哪个文件取决于创建 Vue 应用时的选择）中的 Vue 配置将包含 `quasar` 对象及一些基本的 Quasar 配置。
