---
title: PWA 打包命令
desc: (@quasar/app-vite) 开发或打包一个渐进式 Web 应用（PWA）的命令列表。
---

## 开发

```bash
$ quasar dev -m pwa

# 或更长的格式：
$ quasar dev --mode pwa
```

::: warning
开发服务器只为 public 目录提供最有限的 Service Worker 能力，无法离线工作。
:::

::: danger
不要在开发构建中运行 [Lighthouse](https://developers.google.com/web/tools/lighthouse/)，因为在这个阶段，代码没有进行优化，并嵌入了源代码映射（以及其他许多内容）。
:::

## 打包生产环境

```bash
$ quasar build -m pwa

# 或更长的格式：
$ quasar build --mode pwa
```

在生产环境的构建产物中开启调试：

```bash
$ quasar build -m pwa -d

# 或更长的格式：
$ quasar build -m pwa --debug
```
