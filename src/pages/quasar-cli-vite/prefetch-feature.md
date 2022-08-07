---
title: 预取特性 PreFetch
desc: (@quasar/app-vite) 如何在Quasar中预取数据，初始化Store，验证路由或者重定向路由
related:
  - /quasar-cli-vite/quasar-config-js
---

预取（PreFetch）是 Quasar CLI 提供的一个特性，它可以让被vue router选中的组件（在`/src/router/routes.js`中定义的组件）拥有以下额外能力：

* 预取数据 pre-fetch data
* 验证路由 validate the route
* 当不满足验证条件时进行路由重定向（例如用户未登录时）
* 帮助初始化Store数据

上面这些工作都在组件渲染之前完成。

**这个特性在所有的开发模式中都可用** (SPA, PWA, SSR, Cordova, Electron)，但是它对SSR开发模式尤其有用。

## 安装

```js
// quasar.config.js
return {
  preFetch: true
}
```

::: warning 警告
当你想使用预取数据时，你需要使用Pinia或Vuex来存储数据，所以请确保你的项目中已经添加了其中一个，否则，请创建一个新的项目，复制其中的`/src/stores` (Pinia) **或** `/src/store` (Vuex)目录到你的项目。（或者直接使用`quasar new store`命令来为你添加状态管理工具）
:::

## 为什么PreFetch对SSR很有用
这个特性对SSR开发模式尤其有用（但并不是只能用于SSR模式中），因为开发SSR时，我们相当于渲染了我们应用的“快照”，所以，当应用需要一些异步的数据时，**为了使得最终渲染的页面中带有这些数据，我们需要在应用开始渲染之前将这些数据预处理好**。

另一个问题是，在客户端，同样的数据需要在我们挂载客户端应用程序之前可用——否则客户端应用程序将使用不同的数据状态渲染，这会导致水合作用（hydration）将失败。

为了解决这个问题，获取的数据需要存储在视图组件之外、一个专用的数据存储store（Pinia或Vuex）中。在服务器上，我们可以在渲染页面之前预取数据并将数据填充到store中。在客户端的store会在挂载app之前同步服务端的数据。

## PreFetch钩子何时被激活

预取`preFetch`钩子（将在下一节中介绍）由访问的路由确定，该路由还确定渲染哪些组件。事实上，给定路由所需的数据也是在该路由上渲染的组件所需的。**因此，只在路由组件内部放置`preFetch`钩子的逻辑是很自然的（也是必需的）**。 这也包括`/src/App.vue`，在这种情况下，在应用程序启动时只运行一次。

让我们通过一个例子来理解钩子何时被调用。假设我们有这些路由，并为这些组件都编写了`preFetch`钩子：

```js
// routes
[
  {
    path: '/',
    component: LandingPage
  },
  {
    path: '/shop',
    component: ShopLayout,
    children: [
      {
        path: 'all',
        component: ShopAll
      },
      {
        path: 'new',
        component: ShopNew
      },
      {
        path: 'product/:name',
        component: ShopProduct,
        children: [{
          path: 'overview',
          component: ShopProductOverview
        }]
      }
    ]
  }
]
```
现在，让我们看看当用户按照下面指定的顺序依次访问这些路由时，钩子是如何被调用的。

| 被访问的路由 | 钩子被调用的地方 | 观察分析结果 |
| --- | --- | --- |
| `/` | App.vue 然后是 LandingPage | 当app启动时，App.vue中的钩子会被调用 |
| `/shop/all` | ShopLayout 然后 ShopAll | - |
| `/shop/new` | ShopNew | ShopNew是 ShopLayout的一个子页面,并且ShopLayout已经渲染过了，所以ShopLayout中的钩子没有再次被调用 |
| `/shop/product/pyjamas` | ShopProduct | - |
| `/shop/product/shoes` | ShopProduct |Quaasr注意到相同的组件被渲染，但是路由和路由参数有更新，所以再次调用了组件中的钩子 |
| `/shop/product/shoes/overview` | ShopProduct 然后 ShopProductOverview | ShopProduct中有路由参数，所以其中的钩子再次被调用，尽管他之前已经被渲染过 |
| `/` | LandingPage | - |

##  用法

这个钩子在路由组件中定义为一个叫做`preFetch`的静态函数。注意，因为这个函数将在组件实例化之前调用，所以它没有访问权限`this`。

下面的例子是当使用Vuex时：

```html
<!-- 被路由使用的一些.vue组件 -->
<template>
  <div>{{ item.title }}</div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  // 我们的钩子在这里
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    // 在这里可以获取数据，验证路由，重定向路由等等...

    // ssrContext 只有在开发SSR模式时才能访问

    // 这里无法访问this

    // 如果你执行了异步的任务，请返回一个Promise
    // 示例:
    return store.dispatch('fetchItem', currentRoute.params.id)
  },

  setup () {
    const $store = useStore()

    // 展示store state中的items
    const item = computed(() => $store.state.items[this.$route.params.id])

    return { item }
  }
}
</script>
```

如果你在使用`<script setup>`，请再添加一个`<script>`单独用于处理preFetch，在其中返回一个带有preFetch函数的对象：

```html
<script>
export default {
  preFetch () {
    console.log('running preFetch')
  }
}
</script>


<script setup>....</script>
```

::: tip 提示
如果你在开发SSR应用，你可以查看服务端提供的[ssrContext](/quasar-cli-vite/developing-ssr/ssr-context)对象。
:::

```js
// 执行异步任务相关的示例
// ...

actions: {
  fetchItem ({ commit }, id) {
    return axiosInstance.get(url, id).then(({ data }) => {
      commit('mutation', data)
    })
  }
}

// ...
```

### 重定向示例
下面是在某些情况下重定向页面的示例，比如当未登录的用户试图访问只有经过身份验证的用户才能看到的页面时。


```js
// 这里假设我们已经编写了身份验证逻辑
// 在Vuex store中
preFetch ({ store, redirect }) {
  if (!store.state.authenticated) {
    redirect({ path: '/login' })
  }
}
```

如果调用了 `redirect(false)`（仅在客户端支持！），则将中止当前的路由跳转。请注意，如果在`src/app.vue`中这样的使用，vue将停止应用程序启动，这是不可取的。

 `redirect()`函数可以接受一个Vue Router的 location对象作为参数。

### 使用预取 preFetch 来初始化Pinia或Vuex

当app启动时`preFetch`钩子只会运行一次，所以你可以借助这个机会来初始化Pinia或者Vuex Store。

```js
// -- Pinia on Non SSR --

// App.vue - handling Pinia stores
// example with a store named "myStore"
// placed in /src/stores/myStore.js|ts

import { useMyStore } from 'stores/myStore'

export default {
  // ...
  preFetch () {
    const myStore = useMyStore()
    // do something with myStore
  }
}
```

```js
// -- Pinia on SSR --

// App.vue - handling Pinia stores
// example with a store named "myStore"
// placed in /src/stores/myStore.js|ts

import { useMyStore } from 'stores/myStore'

export default {
  // ...
  preFetch ({ store }) {
    const myStore = useMyStore(store)
    // do something with myStore
  }
}
```

```js
// App.vue - handling Vuex store

export default {
  // ...
  preFetch ({ store }) {
    // initialize something in store here
  }
}
```

### Vuex Store代码拆分

在大型应用程序中，Vuex Store可能会被拆分为多个模块。当然，也可以将这些模块编码为相应的路由组件块。假设我们有以下store模块：

```js
// src/store/foo.js
// we've merged everything into one file here;
// an initialized Quasar project splits every component of a Vuex module
// into separate files, but for the sake of the example
// here in the docs, we show this module as a single file

export default {
  namespaced: true,
  // IMPORTANT: state must be a function so the module can be
  // instantiated multiple times
  state: () => ({
    count: 0
  }),
  actions: {
    inc: ({ commit }) => commit('inc')
  },
  mutations: {
    inc: state => state.count++
  }
}
```

Now, we can use `store.registerModule()` to lazy-register this module in a route component's `preFetch()` hook:

```html
// inside a route component
<template>
  <div>{{ fooCount }}</div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted, onUnmounted } from 'vue'

// import the module here instead of in `src/store/index.js`
import fooStoreModule from 'store/foo'

export default {
  preFetch ({ store }) {
    store.registerModule('foo', fooStoreModule)
    return store.dispatch('foo/inc')
  },

  setup () {
    const $store = useStore()

    onMounted(() => {
      // Preserve the previous state if it was injected from the server
      $store.registerModule('foo', fooStoreModule, { preserveState: true })
    })

    onUnmounted(() => {
      // IMPORTANT: avoid duplicate module registration on the client
      // when the route is visited multiple times.
      $store.unregisterModule('foo')
    })

    const fooCount = computed(() => {
      return $store.state.foo.count
    })

    return {
      fooCount
    }
  }
}
</script>
```

还要注意的是，由于该模块现在是路由组件的一个依赖项，它将被Vite移到路由组件的异步块中。

::: warning 警告
不要忘记为`registerModule`设置`preserveState: true`选项，这样我们就可以保持由服务端注入的数据。
:::

### Vuex搭配Typescript
你可以使用`preFetch`的类型工具来标注`store`参数的类型（否则为any）：

```js
import { preFetch } from 'quasar/wrappers'
import { Store } from 'vuex'

interface StateInterface {
  // ...
}

export default {
  preFetch: preFetch<StateInterface>(({ store }) => {
    // Do something with your newly-typed store parameter
  }),
}
```

::: tip 提示
这只对`store`参数有效，其他的参数类型会被自动推断
:::

## 加载状态
一个好的用户体验包括提示用户有一些运行在后台的工作在页面准备就绪之前需要等待。针对于此，Quasar提供了两种开箱即用的选项。

### LoadingBar
当你为你的app添加了Quasar的[LoadingBar](/quasar-plugins/loading-bar)插件时，Quasar默认会自动在preFetch钩子运行时调用loadingBar。

### Loading
也可以使用Quasar的[Loading](/quasar-plugins/loading)插件。
示例：

```js
// a route .vue component
import { Loading } from 'quasar'

export default {
  // ...
  preFetch ({ /* ... */ }) {
    Loading.show()

    return new Promise(resolve => {
      // do something async here
      // then call "resolve()"
    }).then(() => {
      Loading.hide()
    })
  }
}
```
