---
title: 按需加载/代码拆分
desc: (@quasar/app-webpack) Webpack 版本的 Quasar CLI 怎么创建异步加载模块。
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

## ESM 的动态导入

正如您在上面注意到的那样，我们使用动态导入（`import('..resource..')`）代替（`import Resource from './path/to/resource'`）。动态导入会返回一个 Promise：

```js
import('./categories.json')
  .then(categories => {
    // 在此，我们已经按需加载了这个文件，可以访问 "categories" 中的内容
  })
  .catch(() => {
    // 出错了，加载资源失败
  })
```

与常规导入相比，使用动态导入的一个优点是可以在运行时确定导入路径：

```js
import('pages/' + pageName + '/' + 'id')
```

## 关于代码块导入的说明 

默认情况下，Quasar 会将 `node_modules` 中的包打包在一个 vendor 块中，即使您的代码是动态导入的。这会增加 vendor 区块的大小，但由于依赖关系不会被频繁更改，因此浏览器可以利用该区块的缓存版本，并在后续访问时加快加载应用程序的速度。

例如，如果您安装了一个包（假设它名为 `my-package`），那么，您可以像这样动态导入它：

````js
import('my-package')
  .then(myPackage => {
    // use the package
  })
````

然而，如果您想将 `my-package` 打包在一个单独的代码块中，需要修改 `quasar.config.js`，如下：

````js
// quasar.config.js
return {
  vendor: {
    remove: [ 'my-package' ]
  }
}
````

更多详细信息，参考 `quasar.config.js` 的 [vendors 部分](/quasar-cli-webpack/quasar-config-js#property-vendor)。

## 关于动态导入的路径中存在变量的说明

如果动态导入的路径中存在变量，由于在编译时无法得知确切的导入路径，我们只能将所有可能与此动态路径匹配的模块都打包进来，因此，您可能会在构建日志中看到不必要的文件。

所以，这种情况下，如何限制生成的代码块的数量及大小呢？思路是限制动态路径，使其能匹配的模块尽可能的少。

1. 添加文件扩展名，当目录下有多种类型的同名文件时很有用。
  ```js
  // 不好
  import('./folder/' + pageName)

  // 好一些
  import('./folder/' + pageName + '.vue')
  ```
2. 使动态路径尽可能的明确。
  ```js
  // 不好 -- 将所有的 JSON 模块都放在 ./folder 中，然后递归查找
  const asset = 'my/jsons/categories.json'
  import('./folder/' + asset)

  // 好 --  只查找 ./folder/my/jsons 目录下的 JSON 模块
  const asset = 'categories.json'
  import('./folder/my/jsons/' + asset)
  ```
3. 尝试从只包含文件的目录中导入，在上一个示例中，如果 `./folder/my/jsons` 中仍然有子文件夹，那么我们通过明确动态路径的方式仍然不是最优解，最好是调整目录结构，确保导入的终端路径中只存在文件。

4. 使用 [Webpack 魔法注释](https://webpack.js.org/api/module-methods/#magic-comments)中的 `webpackInclude` 和 `webpackExclude` 通过一个正则表达式来声明可能会被导入的代码块，示例：
  ```js
  await import(
    /* webpackInclude: /(ar|en-US|ro)\.js$/ */
    'quasar/lang/' + langIso
  )
    .then(lang => {
      Quasar.lang.set(lang.default)
    })
  ```
  这样，在打包的时候只会将所需要的语言包（ar|en-US|ro）打包进构建产物中，而不是将 `quasar/lang/` 目录下的所有语言包都打包（超过 40 个,可能会影响 `quasar dev` 和 `quasar build` 命令的性能）。

注意，动态路径匹配的模块数量等于构建产物生产块的数量。

