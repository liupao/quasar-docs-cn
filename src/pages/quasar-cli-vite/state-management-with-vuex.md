---
title: 应用 Vuex Store
desc: (@quasar/app-vite) 如何在 Quasar 项目中使用 Vuex 管理状态数据。
---

::: danger
Vue 团队已经废弃了 Vuex 并使用 [Pinia](/quasar-cli-vite/state-management-with-pinia) 作为替代品。
:::

在大型应用程序中，由于多个组件都有自己的状态并且相互依赖，使得状态管理变得很复杂。

如果组件之间想要共享同一个状态，我们推荐您使用 Vuex。开始之前我们希望您已经了解了 [Vuex 的文档](https://vuex.vuejs.org/)。[Vue dev-tools](https://github.com/vuejs/vue-devtools) 还对 vuex 作了特性支持。

我们不会详细讨论如何配置或使用 Vuex，因为它有很棒的文档。相反，我们将向您展示在 Quasar 项目中使用它时，目录结构是什么样子的：

```bash
.
└── src/
    └── store/               # Vuex Store
        ├── index.js         # Vuex Store definition
        ├── <folder>         # Vuex Store Module...
        └── <folder>         # Vuex Store Module...
```

当您使用 Quasar CLI 创建项目时，它会询问是否要添加 Vuex 并为您准备好所有必要的配置，包括帮您创建好上述的 `src/stores` 目录结构，在其中包括了与 Vuex 相关的必要的代码。

如果您在创建项目时未选择添加 Vuex，但想要为已有项目添加 Vuex 支持，那么您需要做的只是参考下一节中的步骤并创建 `src/stores/index.[js|ts]` 文件。

::: tip
如果 Vuex 模块对您的网站应用程序来说太重，您可以更改 `/src/store/index.js` 并避免导入任何模块。
:::

## 添加一个 Vuex 模块

您可以使用 Quasar CLI 提供的 `$ quasar new` 命令快捷的添加一个 Vuex 模块：

```bash
$ quasar new store <store_name> [--format ts]
```
上面的命令将会在 `/src/stores` 目录下创建一个名为  "store_name" 的文件，它将包含您需要的所有模板文件。

我们来示例如何创建一个名为 "showcase" 的 Vuex 模块。您需要运行 `quasar new store showcase` 命令。它会帮您创建 `/src/stores/showcase` 目录并拥有以下文件：

```bash
.
└── src/
    └── store/
        ├── index.js         # Vuex Store definition
        └── showcase         # Module "showcase"
            ├── index.js     # Gluing the module together
            ├── actions.js   # Module actions
            ├── getters.js   # Module getters
            ├── mutations.js # Module mutations
            └── state.js     # Module state
```

我们创建了一个新的 Vuex 模块，但是我们还未在项目中使用它，我们需要编辑  `/src/store/index.js` 文件并并添加对 showcase 模块的引用：

```js
import { createStore } from 'vuex'
import showcase from './showcase'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      showcase
    },

    // 为开发环境和带 --debug 参数的生产环境开启严格模式
    strict: process.env.DEBUGGING
  })

  return Store
}
```

::: tip
如果您在开发一个 SSR 应用，那么您可以在服务端使用  [ssrContext](/quasar-cli-vite/developing-ssr/ssr-context) 对象。
:::

现在我们已经可以在 Vue 文件中使用这个 Vuex 模块了。下面是一个简单的示例：假设我们在 state 中定义了 `drawerState` 并有一个 `updateDrawerState` mutation。

```js
// src/store/showcase/mutations.js
export const updateDrawerState = (state, opened) => {
  state.drawerState = opened
}

// src/store/showcase/state.js
// Always use a function to return state if you use SSR
export default function () {
  return {
    drawerState: true
  }
}
```

In a Vue file:

```html
<template>
  <div>
    <q-toggle v-model="drawerState" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const $store = useStore()

    const drawerState = computed({
      get: () => $store.state.showcase.drawerState,
      set: val => {
        $store.commit('showcase/updateDrawerState', val)
      }
    })

    return {
      drawerState
    }
  }
}
</script>
```

## TypeScript support

If you choose to use Vuex and TypeScript when you create a project folder with Quasar CLI, it will add some typing code in `src/store/index.ts`.
To get a typed Vuex store in your component you will need to modify your Vue file like this:

```html
<template>
  <!-- ... -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  setup () {
    const $store = useStore()
    // You can use the $store, example: $store.state.someStoreModule.someData
  }
})
</script>
```

::: warning
With Vuex, currently, only the state is strongly typed. If you want to use typed getters/mutations/actions, you will need to use either an extra package on top of Vuex or a replacement of Vuex.
:::

### Using Vuex Smart Module
One of the options for a fully typed store is a package called `vuex-smart-module`. You can add this package by running the following command:

```bash
yarn add vuex-smart-module
```

Once installed, you need to edit your `src/store/index.ts` file to use this package to create the store. Edit your store index file to resemble the following:

```js
import { store } from 'quasar/wrappers';
import {
  createStore,
  Module,
  createComposable,
  Getters,
  Mutations,
} from 'vuex-smart-module';

class RootState {
  count = 1;
}

class RootGetters extends Getters<RootState> {
  get count() {
    return this.state.count;
  }

  multiply(multiplier: number) {
    return this.state.count * multiplier;
  }
}

class RootMutations extends Mutations<RootState> {
  add(payload: number) {
    this.state.count += payload;
  }
}

// This is the config of the root module
// You can define a root state/getters/mutations/actions here
// Or do everything in separate modules
const rootConfig = {
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  modules: {
    //
  },
};

export const root = new Module(rootConfig);

export default store(function (/* { ssrContext } */) {
  const rootStore = createStore(root, {
    strict: !!process.env.DEBUGGING,
    // plugins: []
    // and other options, normally passed to Vuex `createStore`
  });

  return rootStore;
});

export const useStore = createComposable(root);
```

You can use modules just as with normal Vuex, and in that module you can choose to put everything in one file or use separate files for state, getters, mutations and actions. Or, of course, a combination of those two.

Just import the module in `src/store/index.ts` and add it to your `rootConfig`. For an example, look [here](https://github.com/ktsn/vuex-smart-module#usage)

Using the typed store inside Vue files is pretty straightforward, here is an example:

```vue
<template>
    <q-page class="column items-center justify-center">
        <q-btn @click="store.mutations.add(3)">Add count</q-btn>
        <div>Count: {{ store.getters.count }}</div>
        <div>Multiply(5): {{ store.getters.multiply(5) }}</div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore, root } from 'src/store';

export default defineComponent({
    name: 'PageIndex',
    setup() {
        const store = useStore()

        return { store };
    }
});
</script>
```

#### Using a typed store in Boot Files
When using the store in Boot files, it is also possible to use a typed store. Here is an example of a very simple boot file:

```js
import { boot } from 'quasar/wrappers'
import { root } from 'src/store'

export default boot(({store}) => {
    root.context(store).mutations.add(5)
})
```

#### Using a typed store in Prefetch
Similarly, you can also use a typed store when using the [Prefetch feature](https://quasar.dev/quasar-cli-vite/prefetch-feature). Here is an example:

```html
<script lang="ts">
import { defineComponent } from 'vue';
import { root } from 'src/store';

export default defineComponent({
    name: 'PageIndex',
    preFetch({ store }) {
        root.context(store).mutations.add(5)
    },
    setup() {
       //
    }
});
</script>
```

## Store Code Splitting
You can take advantage of the [PreFetch Feature](/quasar-cli-vite/prefetch-feature#store-code-splitting) to code-split Vuex modules.

### Code splitting Vuex Smart Module
Code splitting with Vuex Smart Module works slightly different compared to regular Vuex.

Suppose we have the following module example:

```js
// store/modules/index.ts
// simple module example, with everything in one file
import { Getters, Mutations, Actions, Module, createComposable } from 'vuex-smart-module'

class ModuleState { greeting = 'Hello'}

class ModuleGetters extends Getters<ModuleState> {
  get greeting() {
    return this.state.greeting
  }
}

class ModuleMutations extends Mutations<ModuleState> {
  morning() {
    this.state.greeting = 'Good morning!'
  }
}

class ModuleActions extends Actions<ModuleState, ModuleGetters, ModuleMutations, ModuleActions> {
    waitForIt(payload: number) {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                this.commit('morning')
                resolve()
            }, payload)
        })
    }
}

export const admin = new Module({
  state: ModuleState,
  getters: ModuleGetters,
  mutations: ModuleMutations,
  actions: ModuleActions
})

export const useAdmin = createComposable(admin)
```

We then want to only load this module, when a certain route component is visited. We can do that in (at least) two different ways.

The first method is using the [PreFetch Feature](/quasar-cli-vite/prefetch-feature#store-code-splitting) that Quasar offers, similar to the example for regular Vuex, found [here](/quasar-cli-vite/prefetch-feature#store-code-splitting). To do this, we have a route defined in our `router/routes.ts` file. For this example, we have a /admin route which is a child of our MainLayout:

```
{ path: 'admin', component: () => import('pages/Admin.vue') }
```

Our `Admin.vue` file then looks like this:

```html
<template>
    <q-page class="column items-center justify-center">
        {{ greeting }}
        <q-btn to="/">Home</q-btn>
    </q-page>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import { registerModule, unregisterModule } from 'vuex-smart-module'
import { admin, useAdmin } from 'src/store/module';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'PageIndex',
    preFetch({ store }) {
        if (!store.hasModule('admin'))
            registerModule(store, 'admin', 'admin/', admin)
    },
    setup() {
        const $store = useStore()
        // eslint-disable-next-line
        if (!process.env.SERVER && !$store.hasModule('admin') && (window as any).__INITIAL_STATE__) {
            // This works both for SSR and SPA
            registerModule($store, ['admin'], 'admin/', admin, {
                preserveState: true
            })
        }
        const adminStore = useAdmin()

        const greeting = adminStore.getters.greeting

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // eslint-disable-next-line
        if (module.hot) module.hot.accept(['src/store/module'], () => {
            // This is necessary to prevent errors when this module is hot reloaded
            unregisterModule($store, admin)
            registerModule($store, ['admin'], 'admin/', admin, {
                preserveState: true
            })
        })

        onUnmounted(() => {
            unregisterModule($store, admin)
        })

        return { greeting };
    }
});
</script>
```

The second method is by using a `router.beforeEach` hook to register/ungregister our dynamic store modules. This makes sense, if you have a section of you app, which is only used by a small percentage of visitors. For example an `/admin` section of your site under which you have multiple sub routes. You can then check if the route starts with `/admin` upon route navigation and load the store module based on that for every route that starts with `/admin/...`.

To do this, you can use a [Boot File](/quasar-cli-vite/boot-files) in Quasar that looks like this:

:::tip
The example below is designed to work with both SSR and SPA. If you only use SPA, this can be simplified by removing the last argument of `registerModule` entirely.
:::

```js
import { boot } from 'quasar/wrappers'
import { admin } from 'src/store/module'
import { registerModule, unregisterModule } from 'vuex-smart-module'

// If you have never run your app in SSR mode, the ssrContext parameter will be untyped,
// Either remove the argument or run the project in SSR mode once to generate the SSR store flag
export default boot(({store, router, ssrContext}) => {
    router.beforeEach((to, from, next) => {
        if (to.fullPath.startsWith('/admin')) {
            if (!store.hasModule('admin')) {
                registerModule(store, ['admin'], 'admin/', admin, {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    preserveState: !ssrContext && !from.matched.length && Boolean(window.__INITIAL_STATE__),
                })
            }
        } else {
            if (store.hasModule('admin'))
                unregisterModule(store, admin)
        }
        next()
    })
})
```

In your components, you can then just use the dynamic module, without having to worry about registering it. For example:

```html
<template>
    <q-page class="column items-center justify-center">
        {{ greeting }}
        <q-btn to="/">Home</q-btn>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAdmin } from 'src/store/module';

export default defineComponent({
    name: 'PageIndex',
    setup() {
        const adminStore = useAdmin()
        const greeting = adminStore.getters.greeting

        return { greeting };
    }
});
</script>
```
