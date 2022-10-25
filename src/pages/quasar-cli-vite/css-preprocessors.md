---
title: CSS 预处理器
desc: (@quasar/app-vite) Quasar 中提供开箱即用的 Sass/SCSS CSS 预处理器。
related:
  - /style/sass-scss-variables
---

Quasar CLI 中提供了开箱即用的 **Sass** 或 **SCSS** 支持。

## 配置

您可以通过 `/postcss.config.js` 文件和扩展 Vite 配置的方式来配置如何处理您的 CSS。
```js
// quasar.config.js

build: {
  extendViteConf (viteConf, { isClient, isServer }) {
    viteConf.css.modules = ...
    viteConf.css.postcss = ...
    viteConf.css.preprocessorOptions
  }
}
```

更多信息请参考：[css.modules](https://vitejs.dev/config/#css-modules), [css.postcss](https://vitejs.dev/config/#css-postcss), [css.preprocessorOptions](https://vitejs.dev/config/#css-preprocessoroptions).

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
