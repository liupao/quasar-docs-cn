---
title: Vue SSR 指令
desc: (@quasar/app-vite) Managing the Vue directives for SSR in a Quasar app.
---

::: warning 警告
此页文档针对于 Quasar v2.6 及其以上的版本。
:::

由于Vue3的架构调整，普通的Vue指令需要做一些额外的工作后才能在SSR模式中正常运行。

SSR构建服务端时需要所有的Vue指令都额外提供一个`getSSRProps()`方法。

::: tip 提示
*  你不需要担心Quasar提供的指令，因为它们都为SSR模式做了兼容，可以直接运行在SSR模式中。
* 然而，当你使用第三方库提供的Vue指令并且报错时，需要考虑作者是否考虑了vue3的SSR的兼容性（是否在指令的定义中添加了getSSRProps()方法）
:::

## 如何声明一个指令


下面的内容来自[Vue.js 文档](https://vuejs.org/guide/scaling-up/ssr.html#custom-directives)：

> 因为大多数的自定义指令都包含了对 DOM 的直接操作，所以它们会在 SSR 时被忽略。但如果你想要自己控制一个自定义指令在 SSR 时应该如何被渲染 (即应该在渲染的元素上添加哪些 attribute)，你可以使用 getSSRProps 指令钩子：

```js
const myDirective = {
  mounted (el, binding) {
    // 客户端实现：
    // 直接更新 DOM
    el.id = binding.value
  },

  getSSRProps (binding) {
   // 服务端实现：
    // 返回需要渲染的 prop
    // getSSRProps 只接收一个 binding 参数
    return {
      id: binding.value
    }
  }
}
```
