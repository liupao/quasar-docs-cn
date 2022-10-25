---
title: 开发手机应用
desc: (@quasar/app-vite) 使用 Quasar CLI 开发混合应用。
related:
  - /quasar-cli-vite/developing-capacitor-apps/introduction
  - /quasar-cli-vite/developing-cordova-apps/introduction
---

Quasar 提供了两种方式来创建手机应用：

* **Capacitor** 是由 Ionic Framework 创建的 Cordova 的替代品。它兼容大部分的 Cordova 插件。
* **Cordova** 是由 Nitobi 创建的手机应用开发框架。Adobe 公司在 2011 年收购了 Nitobi，将其重新命名为 PhoneGap，随后发布了名为 Apache Cordova 的开源软件版本。

## 更多信息
两个工具都使用原生应用的 WebView 来运行您的网站。它们暴露了一些设备原生 API 给您的 JavaScript 代码使用，也支持您通过编写原生代码来实现 JS 可以调用的插件。然而 Cordova 可以支持更多的平台，Capacitor 只支持 IOS 和 Android。
