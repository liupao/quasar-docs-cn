---
title: 为SSR编写通用的代码
desc: (@quasar/app-vite) 如何为Quasar的SSR服务端渲染编写通用的代码。
---

编写通用（`universal`）或者叫同构(`isomorphic`)的代码是指编写的代码可以同时运行在服务端和客户端。但是由于用例和平台API的差异，我们的代码在不同的环境中运行时的行为不会完全相同。因此，下面我们将讨论你需要注意的关键事项。

![Quasar SSR Build System](https://cdn.quasar.dev/img/ssr-build.png "Quasar SSR Build System")

## 服务端的响应性
在客户端渲染的应用中，每个用户都在自己的浏览器上有一个单独的、新的应用实例，在服务端渲染时，我们也希望如此：每个请求可以得到一个新的，独立的应用实例，从而不会发生跨请求状态污染。（如果我们用单个用户特定的数据对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个用户的请求。我们把这种情况称为跨请求状态污染。）。

由于实际的渲染过程中需要明确指出渲染所需要使用的数据，因此我们还将在服务端进行“预先提取”数据(pre-fetching) - 这意味着当开始渲染时，我们的应用程序状态已经确定下来了，所以响应式数据在服务端是不必要的，默认情况下它是被禁用的。同时，在服务端禁用响应式数据也避免了性能消耗。


## 组件生命周期钩子

因为没有任何动态更新，所以在所有的Vue生命周钩子中，只有`beforeCreate` 和 `created` 会在SSR的服务端被调用，也就是说，写在其他的生命周期（比如`beforeMount` 或 `mounted`）中的代码只会在客户端被执行。

另外需要注意的是，你应该避免在`beforeCreate` 和 `created`生命周期中使用会产生全局副作用的代码，这类副作用的常见例子是使用 `setInterval` 设置定时器。
我们可能会在客户端特有的代码中设置定时器，然后在 `onBeforeUnmount` 或 `onUnmounted` 中清除。然而，由于 `unmount` 钩子不会在 SSR 期间被调用，所以定时器会永远存在。为了避免这种情况，请将含有副作用的代码放到 `onMounted` 或`beforeMount` 中。

## 避免使用有状态的单例 Avoid Stateful Singletons
当我们写只在客户端的代码时，我们习惯了我们的代码总是在一个崭新的上下文环境中运行，然而一个nodejs服务是一个长时间运行的进程，当我们的代码生效后它会被驻留在内存中，这意味着如果你创建了一个单例对象，它会被分享到每个请求中。

所以Quasar CLI会为每个请求创建一个新的根Vue实例、它带有新的Router和新的Store实例。这类似于每个用户在自己的浏览器中使用应用程序的新实例。如果我们跨多个请求使用一个共享实例，就很容易导致跨请求状态污染。

与直接创建Router和Store实例不同，你可以公开一个工厂函数，它可以重复执行，为每个请求创建新的应用程序实例：

```js
// src/router/index.js
export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({...})
  return Router
}
```

```js
// src/store/index.js
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({...})
  return Store
}
```

如果你在使用 [Vuex modules](https://vuex.vuejs.org/guide/modules.html) 不要忘记将state作为一个函数导出，否则将会创建一个单例对象。
```js
// src/store/myModule/state.js
export default () => ({
  ...
})

```

## 访问平台特有 API

通用代码不能访问平台特有的 API，如果你的代码直接使用了浏览器特有的全局变量，比如 `window` 或 `document`，他们会在 Node.js 运行时报错，反过来也一样。

对于在服务器和客户端之间共享，但使用了不同的平台 API 的任务，建议将平台特定的实现封装在一个通用的 API 中，或者使用能为你做这件事的库。例如你可以使用  [Axios](https://github.com/axios/axios) 在服务端和客户端使用相同的API。
对于浏览器特有的 API，通常的方法是在仅客户端特有的生命周期钩子中惰性地访问它们，例如 onMounted。


## Boot 文件

请注意，如果一个第三方库编写时没有考虑到通用性，那么要将它集成到一个 SSR 应用中可能会很棘手。你*或许*可以通过模拟一些全局变量来让它工作，但这只是一种 *hack* 手段并且可能会影响到其他库的环境检测代码。

当你通过boot文件添加一个第三方的库到你的项目中时，请考虑它是否可以同时在服务器和客户端上运行。如果它需要只在服务器上运行或只在客户端运行，那么请在`quasar.config.js`中指定它：

```js
// quasar.config.js
return {
  // ...
  boot: [
    'some-boot-file', // 同时运行在服务端和客户端
    { path: 'some-other', server: false } // 只运行在客户端
    { path: 'third', client: false } //只运行在服务端
  ]
}
```

## 数据预取 Data Pre-Fetching and State

在SSR期间，我们实际上是在渲染应用程序的一个“快照”，所以如果应用程序依赖于一些异步数据，这些数据需要在我们开始渲染过程之前预取和解析。

Quasar CLI提供了 [PreFetch 特性](/quasar-cli-vite/prefetch-feature)可以帮你解决这个问题，请花费一些时间阅读此页面。

<q-separator class="q-mt-xl" />


> 此页面中的部分内容引用自：[vue官文档SSR开发指南](https://vuejs.org/guide/scaling-up/ssr.html#component-lifecycle-hooks)。

