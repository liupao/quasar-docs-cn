---
title: PWA 应用图标
desc: (@quasar/app-vite) 如何配置 Quasar 渐进式 Web 应用（PWA）的图标。
---

为 PWA 模式生成用于各种浏览器和操作系统的特殊图标，构建出来的所有的图标都是有用的，如果您发现缺少了用于某个平台的图标，请 [提交一个 issue](https://github.com/quasarframework/quasar/issues)。

<img src="https://cdn.quasar.dev/img/iconfactory.png" style="float:right;max-width:15%;min-width:240px;padding-top:40px" />

## Icon Genie CLI

::: tip
我们强烈推荐使用[Icon Genie CLI](/icongenie/introduction)，您可以提供一个资源图标，使用它帮您生成所有需要的图标，并将其放在对应的目录中。同时还可以配置缩放，压缩，裁剪等功能。需要时它还会提醒将哪些标签添加到您的/index.html 文件中。
:::

通过 Icon Genie CLI 快速生成所需的图标，关于完整的命令列表和配置参数请移步 [Icon Genie CLI](/icongenie/command-list) 页面。

```bash
$ icongenie generate -m pwa -i /path/to/source/icon.png [-b /path/to/background.png]
```

## 说明

```
public/
   favicon.ico
   icons/
      favicon-128x128.png
      favicon-96x96.png
      favicon-32x32.png
      favicon-16x16.png
      icon-128x128.png # for the PWA manifest
      icon-192x192.png # for the PWA manifest
      icon-256x256.png # for the PWA manifest
      icon-384x384.png # for the PWA manifest
      icon-512x512.png # for the PWA manifest
      ms-icon-144x144.png
      safari-pinned-tab.svg
      apple-icon-120x120.png
      apple-icon-152x152.png
      apple-icon-167x167.png
      apple-icon-180x180.png
      apple-launch-828x1792.png
      apple-launch-1125x2436.png
      apple-launch-1242x2688.png
      apple-launch-750x1334.png
      apple-launch-1242x2208.png
      apple-launch-640x1136.png
      apple-launch-1536x2048.png
      apple-launch-1668x2224.png
      apple-launch-1668x2388.png
      apple-launch-2048x2732.png
```

需要将以下代码添加到 `/index.html` 中来引用这些图标（注意，不是所有的文件都需要引用，因为 Quasar CLI 会自动注入其他 PWA 文件）：

```html
<link rel="icon" type="image/ico" href="icons/favicon.ico">
<link rel="icon" type="image/png" sizes="128x128" href="icons/favicon-128x128.png">
<link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
<!-- iPhone XR -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-828x1792.png">
<!-- iPhone X, XS -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1125x2436.png">
<!-- iPhone XS Max -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1242x2688.png">
<!-- iPhone 8, 7, 6s, 6 -->
<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-750x1334.png">
<!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus -->
<link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" href="icons/apple-launch-1242x2208.png">
<!-- iPhone 5 -->
<link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-640x1136.png">
<!-- iPad Mini, Air, 9.7" -->
<link rel="apple-touch-startup-image" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1536x2048.png">
<!-- iPad Pro 10.5" -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1668x2224.png">
<!-- iPad Pro 11" -->
<link rel="apple-touch-startup-image" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-1668x2388.png">
<!-- iPad Pro 12.9" -->
<link rel="apple-touch-startup-image" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" href="icons/apple-launch-2048x2732.png">
```
