---
title: CSS 预处理器
desc: (@quasar/app-webpack) Quasar 中提供开箱即用的 Sass/SCSS CSS 预处理器。
related:
  - /style/sass-scss-variables
---

Quasar CLI 中提供了开箱即用的 **Sass** 或 **SCSS** 支持,不需要额外安装库或扩展 Webpack 配置。


## 用法
您的 Vue 文件可以通过 `<style>` 标签来包含 Sass/SCSS 代码。

```html
<!-- 注意 lang="sass" -->
<style lang="sass">
div
  color: #444
  background-color: #dadada
</style>
```

```html
<!-- 注意 lang="scss" -->
<style lang="scss">
div {
  color: #444;
  background-color: #dadada;
}
</style>
```

当然标准的 CSS 也是支持的：

```html
<style>
div {
  color: #444;
  background-color: #dadada;
}
</style>
```

## 变量
Quasar 也提供了一些可以直接使用的变量（如: `$primary`, `$grey-3`, ...）,关于更多信息，请参考：[Sass/SCSS 变量](/style/sass-scss-variables)。
