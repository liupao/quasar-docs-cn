---
title: 什么是 PWA
desc: (@quasar/app-vite) 介绍什么是一个渐进式 Web 应用（PWA）以及如何在 Quasar 应用中使用它。
---
渐进式 Web 应用（PWA）是一个 web 应用，它通过现代 web 能力可以给用户提供类似应用程序的体验。这些应用程序满足某些要求（见下文），部署到 web 服务器，并可通过 URL（基于 HTTPS 协议）访问。

可以与 Cordova 配合来为用户提供多种渠道访问来您的应用。Quasar CLI 可以帮您的项目同时构建成 PWA 和手机应用来利用两个渠道的优势。

## 有哪些要求
如果考虑部署一个渐进式 Web 应用，您的应用必须满足以下要求：

* 渐进式 - 无论什么浏览器，都能为每个用户服务，这是渐进式增强的核心理念。
* 响应式 - 适配任何尺寸的设备，电脑，手机，车机等。
* 独立连接 - 以增强在弱网或无网环境下的体验。
* 贴近 APP - 提供类似应用的导航和交互方式。
* 最新的 - 得益于 service worker 的更新程序，总是会更新。
* 安全 - 通过 HTTPS 提供，以防止窥探和确保内容没有被篡改。
* 可被识别 - 由于 W3C 清单和 service worker 注册程序，搜索引擎可以找到它们，并将其标识为“应用程序”。
* 提升参与感 — 通过推送通知等特性很容易做到提升参与感。（译者批注：让那些安装了但不活跃的用户重新了解您的应用）。
* 易分享 - 可以通过简单的 URL 分享，而不用复杂的安装。

更多信息可参考 Addy Osmani 的[关于 PWA 的文章](https://addyosmani.com/blog/getting-started-with-progressive-web-apps/)。

## Manifest 文件
manifest 文件描述应用程序需要的资源，也包括应用程序的显示名称，图标，以及启动画面。您可以查看 `/src-pwa/manifest.json` 文件。更多信息：[Manifest 文件](https://developer.mozilla.org/en-US/docs/Web/Manifest)。

## Service Worker
Service Worker 提供了一种编程的方式来处理应用的缓存资源。开发者可以通过 Service Worker 提供的编程 API 来决定如何处理缓存，它提供了比别的选项更灵活的体验。

更多信息：[Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
