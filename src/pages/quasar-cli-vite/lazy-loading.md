---
title: 按需加载/代码拆分
desc: (@quasar/app-vite)Vite版本的Quasar CLI怎么创建异步加载模块。
---

当您的网站/应用程序很小时，您可以将所有布局/页面/组件都放到一个初始加载包中，并在启动时提供所有内容。

但是，当您的代码变得复杂时，有大量的布局/页面/组件时，这样做并不是最理想的，因为它会影响加载时间。幸运的是，有一种方法可以解决这个问题。

我们将介绍如何通过动态导入来进行按需加载/拆分应用程序的部分代码，以便仅在需要时才自动请求它们。我们将举一个加载页面的例子，但是这种方法也同样适用于别的文件（静态资源，JSON 文件，……）：

## 在定义路由时按需加载页面

如下所示，使用 Vue 路由器调用静态组件是正常的

::: warning
Quasar 文档假设您已经熟悉了 [Vue Router](https://github.com/vuejs/vue-router)。
下面的内容描述了如何在 Quasar CLI 项目中使用路由。更多关于 Vue Router 本身的内容请参考： [Vue Router 文档](https://router.vuejs.org/)。
:::

```js
import SomePage from 'pages/SomePage'

const routes = [
  {
    path: '/some-page',
    component: SomePage
  }
]
```
现在，让我们使用动态导入来更改此内容，这样，浏览器将仅在需要时再加载此页面：

```js
const routes = [
  {
    path: '/some-page',
    component: () => import('pages/SomePage')
  }
]
```
简单吧？它所做的是为 `/src/pages/SomePage.vue` 创建一个单独的文件块，只有在需要时才加载它。在这个例子中，就是指当用户访问 '/some-page' 路由的时候。

## 按需加载组件

通常情况下，您会导入一个组件，然后将其注册到页面、布局或组件中。

```html
<script>
import SomeComponent from 'components/SomeComponent'

export default {
  components: {
    SomeComponent,
  }
}
</script>
```
现在让我们改变这种方式，使用动态导入使组件按需加载：
```html
<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    SomeComponent: defineAsyncComponent(() => import('components/SomeComponent')),
  }
}
</script>
```

## ES 的动态导入

正如你在上面注意到的那样，我们使用动态导入（`import('..resource..')`）代替（`import Resource from './path/to/resource'`）。动态导入会返回一个 Promise：

```js
import('./categories.json')
  .then(categories => {
    // 在此，我们已经按需加载了这个文件，可以访问 "categories" 中的内容
  })
  .catch(() => {
    // 出错了，加载资源失败
  })
```

## 使用 Vite 的 import

### 动态导入语法

```js
const importList = import.meta.glob('./pages/*.vue')
const startIndex = '/pages/'.length

const routes = Object.keys(importList).map(key => {
  return {
    path: key.substring(startIndex, key.length - 4),
    component: importList[ key ]
  }
})
```

### import 的其他选项

更多关于导入资源的知识请参考 [Vite](https://vitejs.dev/guide/assets.html)。
