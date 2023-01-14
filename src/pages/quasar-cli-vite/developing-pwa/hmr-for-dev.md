---
title: PWA 应用的热更新
desc: (@quasar/app-vite) 如何管理 Quasar PWA 应用的热更新（HMR）。
---

**当处于开发模式时**（不是生产环境），会安装一个 Service Worker 并且运行时无法正常使用 HMR（热更新）。但是，浏览器可以配置使用网络旁路来代替使用 Service Worker 的缓存。

![如何使 PWA 的热更新（HMR）生效](https://cdn.quasar.dev/img/pwa-hmr.png)

当您的开发内容不涉及到 Service Worker（例如修改 "/src-pwa/register-service-worker.js" 文件）时，其实可以直接使用 `$ quasar dev -m spa`（代替 `$ quasar dev -m pwa`）命令来开发以避免 Service Worker 带来的额外麻烦。

::: warning
开发服务器只为 public 目录提供最有限的 Service Worker 能力，无法离线工作。
:::
