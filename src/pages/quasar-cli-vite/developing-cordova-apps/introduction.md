---
title: 什么是 Cordova
desc: (@quasar/app-vite) 介绍 Quasar 混合移动应用程序背后的一项技术。
---

Apache Cordova 是一个最初由 Nitobi 创建的移动应用程序开发框架。Adobe Systems 于 2011 年收购了 Nitobi，并将其更名为   PhoneGap，随后发布了一个名为 Apache Cordova 的开源版本。

[Apache Cordova](https://cordova.apache.org/) 使开发者能够使用 CSS3，HTML5 和 JavaScript 为移动设备构建应用程序，而不是依赖特定平台的 API，如 Android，iOS 或 Windows Phone 中的 API。它可以根据设备的平台来封装 CSS，HTML 和 JavaScript 代码，并且扩展了 HTML 和 JavaScript 的功能以与设备一起工作。由此产生的 APP 属于混合应用，这意味着它们既不是真正的原生移动 APP（因为所有的布局视图渲染都是通过 Web 视图而不是平台的本地 UI 框架完成的），也不是纯粹的基于 Web 的 APP（它们不仅仅是 Web APP，因为可以打包成可分发的 APP, 并可访问本机设备 API）。

您可以使用 [Cordova 插件](/quasar-cli-vite/developing-cordova-apps/cordova-plugins)来访问设备的原生 API。
