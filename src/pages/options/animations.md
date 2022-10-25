---
title: 动画
desc:  为 Quasar 程序提供 Animate.css 支持
---
可以通过[Vue Transition Component](https://vuejs.org/api/built-in-components.html)来处理 CSS 过渡效果，为组件/DOM 加上一个出现或消失时的动画。

Quasars 提供一组可以直接使用的 CSS 动画。这些动画来自[Animate.css](https://animate.style/)，共有 80 多种动画开箱即用，打开 Animate.css 网站查看在线演示效果。

> 请前往 [Vue](https://vuejs.org/api/built-in-components.html#transition)页面学习更多关于如何使用`<transition>`组件。

## 安装
修改 `/quasar.config.js`.
```js
// 开启全部的动画
animations: 'all'

// 或者只开启部分动画
animations: [
  'bounceInLeft',
  'bounceOutRight'
]
```
如果你只是构建网站，那么你可以跳过配置 quasar.config.js 的步骤，通过 CDN 的方式引入 Animate.css，示例：

```html
<!-- src/index.template.html -->
<head>
  ...

  <!-- CDN example for Animate.css -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
  >
</head>
```

::: warning
注意，若你通过 link 标签引入 Animate.css，所有的 animation CSS 类都需要添加一个`animate__`前缀。这是 Animate.css  V3 到 V4 的破坏性更新。如果你想避免使用前缀，你可以选择导入兼容性版本：[compat version](https://animate.style/#migration)。但是，如果你在使用**Quasar CLI**，则不需要理会这些改动。

:::

## 用法
注意每个动画名前都有一个"animated"字段

```html
<!-- 单个元素/组件的示例 -->
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- Wrapping only one DOM element, defined by QBtn -->
  <q-btn
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition>
```

### 多个元素的动画
也可以为一组 DOM/组件添加过渡动画。

```html
<!-- 多个元素/组件的示例 -->
<transition-group
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <!-- We wrap a "p" tag and a QBtn -->
  <p key="text">
     Lorem Ipsum
  </p>
  <q-btn
    key="email-button"
    color="secondary"
    icon="mail"
    label="Email"
  />
</transition-group>
```

在上面的多元素示例中注意:

1. 注意使用 `<transition-group>` 代替了 `<transition>`.
2. DOM/组件都有 key 属性标记，例如`key="text"` 或者 `key="email-button"`
3. 上面的两个示例中都使用了`appear`属性，这使得动画在组件渲染后将立即执行一次。此属性是可选的。
