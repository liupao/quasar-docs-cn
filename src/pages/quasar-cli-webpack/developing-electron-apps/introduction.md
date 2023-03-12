---
title: 什么是 Electron
desc: (@quasar/app-webpack) Introduction about the technology behind Quasar desktop apps.
---

[Electron](https://electronjs.org/) （前身是 Atom Shell）是由 Cheng Zhao 创建的开源框架，现在由 GitHub 开发。它使得原来用于开发 web 前端和后端的技术可用于开发桌面 GUI 应用：使用 Node 运行时作为后端，使用 Chromium 作为前端。以下著名开源项目都在使用 Electron,包括 GitHub 的 Atom、微软的 VS Code、Tidal 音乐流服务桌面应用、Light Table IDE 以及用 Discord 客户端。

每个 Electron 应用都有两个进程：一个是主进程（处理应用窗口和启动），另一个是渲染进程（基本上是您的 Web UI 代码）。还有一个预加载（preload）脚本可以连接连两个世界。

## 渲染进程
Electron 使用 Chromium 在一个隔离的进程中渲染 web 页面，叫做渲染进程。这个进程处理您的 `/src` 目录下的 UI 代码。您不能在此使用 Node.js 的能力，但是可以使用预加载（preload）脚本来桥接 UI
和 Node.js。

## 主进程
在 Electon 中，运行 package.json 中 main 脚本的进程叫做主进程。这个进程会处理 `/src-electron/electron-main.[js|ts]` 文件中的代码，通过初始化渲染进程来展示一个 GUI。

## 预加载（Preload）脚本

[预加载脚本](/quasar-cli-webpack/developing-electron-apps/electron-preload-script) (`/src-electron/electron-preload.[js|ts]`) 是一种将 Node.js 能力注入到渲染进程中的一种方式，您可以在此暴漏一些 API 供 UI 中的代码使用。
