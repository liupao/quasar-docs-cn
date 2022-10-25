---
title: 使用布局和页面进行路由
desc: 如何将 Vue router 和 Quasar 的布局相关联。
---
您可以将 Vue Router 与 Quasar 的布局关联起来。本页内容只是建议，不是强制性的。Quasar 给予您充分的使用自由，可以将下面的内容当作简单的参考案例。

[QLayout](/layout/layout) 是用于封装页面的组件，使得多个页面可以共享相同的页眉、侧滑抽屉菜单等。当然您也可以为每个页面配置不同的页眉/页脚/侧滑菜单，但它们都必须是 QLayout 组件的子项。 为了理解这是如何工作的，您需要阅读 [Vue Router 嵌套路由](https://router.vuejs.org/guide/essentials/nested-routes.html)。

为了更清楚一点，我们举个例子。假设我们有一个布局，（'user'），它包含两个页面（'user-feed'和'user-profile'）。 我们希望像这样配置网站/应用程序路由： `/user/feed` 和 `/user/profile`。

## 创建文件

**Quasar 不会强制特定的文件夹结构**。 以下仅是示例。 您可以将布局和页面一起放在一个文件夹中，或者将页面放到您选择的特定文件夹结构中，或者创建自己的布局和页面文件夹。 对于 Quasar 来说无关紧要。 重要的是您可以在 `/src/router/routes.js` 中正确引用它们。

让我们创建布局和页面文件。您可以使用 Quasar CLI 的帮助命令，也可以自己创建它们。

```bash
$ quasar new layout User
 app:new Generated layout: src/layouts/User.vue +0ms
 app:new Make sure to reference it in src/router/routes.js +2ms

$ quasar new page Profile Posts
 app:new Generated page: src/pages/Profile.vue +0ms
 app:new Make sure to reference it in src/router/routes.js +2ms

 app:new Generated page: src/pages/Posts.vue +1ms
 app:new Make sure to reference it in src/router/routes.js +0ms
```

上述命令会创建以下文件夹结构：

```bash
src/
├── layouts
│   └── User.vue         # 我们的 QLayout 定义文件
└── pages
    ├── Posts.vue        # /user/feed 路由页面
    └── Profile.vue       # /user/profile 路由页面
```

## 定义路由

您的页面 (`/src/pages`) 和布局(`/src/layouts`) 都通过 `/src/router/routes.js` 中的 Vue Router 注入到您的网站/应用程序中。每个页面和布局都需要在此引用。

`routes.js` 示例：
```js
// 我们在此文件中定义路由

import LandingPage from 'pages/Landing'

const routes = [
  {
    path: '/',
    component: LandingPage
  }
]

export default routes
```

使用懒加载/按需加载的 `routes.js` 示例：

```js
// 我们在此文件中定义路由

const routes = [
  {
    path: '/',
    component: () => import('pages/Landing')
  }
]

export default routes
```

::: tip
关于按需加载和代码拆分在[@quasar/app-vite](/quasar-cli-vite/lazy-loading) / [@quasar/app-webpack](/quasar-cli-webpack/lazy-loading)中有更深入的分析。
:::

::: tip
配置路由以使用 Layouts 和 Pages 基本上由正确的嵌套路由组成，我们将在下一节中看到。
:::

## 嵌套路由

真正的应用程序用户界面通常由嵌套在多个级别的组件组成。URL 的片段对应于嵌套组件中的特定结构也很常见，例如：

```
/user/profile                   /user/posts
+------------------+            +-----------------+
| User             |            | User            |
| +--------------+ |            | +-------------+ |
| | Profile      | |  +------>  | | Posts       | |
| |              | |            | |             | |
| +--------------+ |            | +-------------+ |
+------------------+            +-----------------+
```

使用 Vue Router 的嵌套路由配置表达这种关系非常简单。 我们注意到一些事情：两个页面都需要由用户组件包装。 所以，用户组件就可以看作是一个布局（Layout）！

因为用户布局会包装内部页面，可以使用 `<router-view>`来将内部页面注入：

```html
<!-- /src/layouts/User.vue -->
<template>
  <q-layout>
    ...

    <!-- 这是页面被注入的地方 -->
    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    ...
  </q-layout>
</template>
```

```html
<!-- /src/pages/Profile.vue or Posts.vue -->
<template>
  <q-page>
    ...page content...
  </q-page>
</template>
````

我们的示例中指定了一些路由（/user/profile 和/user/posts）。**那么我们现在如何将所有内容组织在一起？** 我们需要编辑路由文件，在这里，我们将配置路由，告诉哪些组件是布局，哪些是页面，并将它们引用/导入到我们的应用程序中：

```js
// src/router/routes.js

import User from 'layouts/User'
import Profile from 'pages/Profile'
import Posts from 'pages/Posts'

const routes = [
  {
    path: '/user',

    // 我们使用上面导入的/src/layouts/User 组件
    component: User,

    // 它有子路由，并且在它里面用户具有/  `<router-view>`；
    // 那它就是一个布局！
    children: [
      // Profile page
      {
        path: 'profile', // 这里是/user/profile 路由
        component: Profile // 我们参考上面导入的/src/pages/Profile.vue
      },

      // Posts page
      {
        path: 'posts', // 这里是/user/posts 路由
        component: Posts // 我们参考上面导入的/src/pages/Profile.vue
      }
    ]
  }
]

export default routes
```

::: warning
请注意，以 `/` 开头的嵌套路径将被视为根路径。 这使您可以实现组件嵌套，而不必使用嵌套的 URL。
:::

我们的路由配置 (`/src/router/routes.js`) 应如下所示：
```js
export default [
  {
    path: '/user',

    // 将组件指向 QLayout 定义文件的目录
    component: () => import('layouts/user'),

    // 现在我们定义子路由。
    // 通过使用`<router-view>`占位符
    //（需要在布局中指定它）,
    // 这些子路由正在自动注入（上面的）布局
    children: [
      {
        path: 'feed',
        component: () => import('pages/user-feed')
      },
      {
        path: 'profile',
        component: () => import('pages/user-profile')
      }
    ]
  }
]
```

注意事项：

* 我们使用了延迟加载的布局和页面 (`() => import(<path>)`)。如果你的网站/应用程序很小，那么你可以不使用延迟加载，因为使用它可能会增加比它的价值更多的开销：
  ```js
  import UserLayout from 'layouts/user'
  import UserFeed from 'pages/user-feed'
  import UserProfile from 'pages/user-profile'

  export default [
    path: '/user',
    component: UserLayout,
    children: [
      { path: 'feed', component: UserFeed },
      { path: 'profile', component: UserProfile }
    ]
  ]
  ```
* Quasar 提供了一些开箱即用的 Webpack 别名('layouts' 指向 '/src/layouts' and 'pages' 指向 '/src/pages')，已用在上面的例子中。
* 布局的页面需要在 Vue Router 配置中声明为布局的子元素，以便 `<router-view/>` 知道要注入哪个页面组件。请记住，只要您的布局附有页面，始终使用此 Vue 组件。

  ```html
  <q-layout>
    ...
    <q-page-container>
    <!--
      这里是你的页面注入到你的布局的地方
    -->
      <router-view />
    </q-page-container>
    ...
  </q-layout>
  ```

<q-separator class="q-mt-xl" />

::: tip
请查看[Vue Router](https://router.vuejs.org/)文档，以全面了解上述示例以及如何为您的应用配置路由管理器及其路由。
:::
