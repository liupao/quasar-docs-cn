---
title: 主题
desc: Quasar 主题构建器，帮助您的 app 构建主题颜色
components:
  - theming/ThemePicker
related:
  - /style/dark-mode
---

设置主题颜色是构建一个网站/app 重要的第一步，下面的工具可以帮助您设置合适的主题颜色。

## 主题构建器

在下面的主题构建器中，点击左边的彩色按钮选择合适的颜色，并在右边的布局中查看修改后的效果，选择完成后点击下方的`导出`按钮，并将导出的代码复制您的项目中对应的文件中去，针对不同方式创建的 quasar 应用，导出的格式不同，选择一种适合您的即可。推荐使用使用 Sass/SCSS 变量
::: tip
  primary 是主题的主色调，会在网站/app 中大量使用，也是 quasar 组件会默认采用的颜色

  secondary 是配色，使用程度仅次于 primary 的颜色

  accent 是强调色

  dark 是暗色模式/夜间模式的颜色

  positive,negative,info,waring 是辅助色，一般可以用在一些提示的地方（例如使用 negative/waring 来表示危险的操作）。
:::
<theme-picker class="q-py-lg" />

## 视频讲解
[B 站视频讲解](https://www.bilibili.com/video/BV1pA4y197Zc?p=11)
