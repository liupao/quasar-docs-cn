---
title: 集成测试
desc: (@quasar/app-vite) Quasar 应用如何进行单元测试和端到端测试。
---

您可以为 Quasar 项目添加单元测试和端到端测试。本文不会详细介绍如何编写测试，对此请参考 [GitHub 上介绍测试的仓库](https://github.com/quasarframework/quasar-testing/tree/dev)。如果您是一个初学者，请考虑阅读下面
<a class='doc-link' href='#扩展阅读'>扩展阅读</a>
部分中推荐的书籍。

## 概述

通过运行一个简单的命令，您可以为现有的 Quasar 项目安装多个预先装配好的测试套件。该命令会安装预先准备好的 node 模块并保存在 `package.json` 中，如果您选择了相关的配置，他还会生成合适的配置文件和命令脚本。您可以添加多个合适的测试套件，甚至将它们添加到持续集成流水线中。

测试本身并不难，最复杂的部分是配置测试套件。技巧在于知道要测试什么。如果您是测试的新手，那么熟悉一些概念和模式是绝对必要的。在本文档页面的末尾有一些可以进一步阅读的
<a class='doc-link' href='#扩展阅读'>链接</a>。


## 测试文档

可以在
<a class='doc-link' href='https://testing.quasar.dev'>https://testing.quasar.dev</a>
或 [quasar-testing 仓库的 `dev` 分支](https://github.com/quasarframework/quasar-testing/tree/dev) 中找到 AE 测试文档。

可以在 [quasar-testing 仓库的 `qv1` 分支](https://github.com/quasarframework/quasar-testing/tree/qv1)
中找到兼容 Quasar v1 版本的 AE 测试文档。

<q-btn color="brand-primary" label="AE 测试文档" icon-right="launch" no-caps href="https://testing.quasar.dev" target="_blank" />

## 安装

```bash
$ cd your-quasar-project
$ quasar ext add @quasar/testing
```

轻量级扩展安装程序将询问您要安装哪些测试套件。然后，它将为这些工具安装各自的扩展，您可以根据自己的喜好对它们进行配置。这就是如何在 Quasar 项目中理想地管理多个测试套件的方法。

它将为您提供一个新的 `quasar run` 命令，您可以使用它来执行测试运行程序，甚至可以与 HMR 开发环境同时运行。例如，如果您需要将 quasar.ctx 传递给测试程序，这种方法会非常有用…


```bash
# 示例：在 pwa 模式下同时运行 jest && dev server
$ quasar test --unit jest --dev="-m pwa"
```

如果需要回顾一下安装时的选项，可以查看 `quasar.extsions.json` 文件。

如果您不想安装 @quasar/testing，那么也可以直接手动安装每个测试套件，它们是完全相互独立的，但是这样就不会拥有 `quasar test` 命令了。

## 扩展阅读

### 书籍
- [测试 Vue.js 应用](https://www.manning.com/books/testing-vue-js-applications)，作者 Yerburgh，也是 `@vue/test-utils` 仓库的作者。
- [免费 Vue 测试手册](https://lmiller1990.github.io/vue-testing-handbook/)

### 教程
- [使用 Jest 对 Vue Router 进行单元测试](https://medium.com/js-dojo/unit-testing-vue-router-1d091241312)
- ... 在此添加您的推荐

### 文档
- [@vue/test-utils](https://test-utils.vuejs.org)
- [jest 24](https://facebook.github.io/jest/)
- [cypress](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple)
- [lighthouse](https://developers.google.com/web/tools/lighthouse/#cli)
- [snyk](https://snyk.io/test)
- [nlf](https://www.npmjs.com/package/nlf)
- [chai](http://www.chaijs.com/)
- [istanbul](https://istanbul.js.org/)
