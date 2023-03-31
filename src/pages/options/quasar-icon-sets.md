---
title:  Quasar 默认图标库
desc: 如何配置 Quasar 组件使用的默认图标库
related:
  - /options/installing-icon-libraries
  - /vue-components/icon
---

Quasar 的组件中会用到一些默认的图标，您可以指定 Quasar 使用哪个图标库作为默认图标库，被指定的这个图标库称为 `Quasar Icon Set`。

您可以安装多个图标库，但是只能选择一个作为 Quasar 组件的默认图标库。

Quasar 目前支持 [Material Icons](https://material.io/icons/) , [Font Awesome](https://fontawesome.com/icons), [Ionicons](http://ionicons.com/), [MDI](https://materialdesignicons.com/), [Eva Icons](https://akveo.github.io/eva-icons), [Themify Icons](https://themify.me/themify-icons), [Line Awesome](https://icons8.com/line-awesome) 和 [Bootstrap Icons](https://icons.getbootstrap.com/).

当然，您也可以将自己的图标（自定义的 SVG 或者任意格式的图片）用在 Quasar 的组件中，请参阅 [QIcon](/vue-components/icon#image-icons) 页面了解更多信息。

::: tip
相关页面：[安装图标库](/options/installing-icon-libraries) 和 [QIcon 组件](/vue-components/icon)。
:::

## 配置默认的图标库
**Quasar 中有两种类型的图标库：webfont 类型和 svg 类型。**

如果没有特别的配置，Quasar 将会使用 webfont 类型的 Material Icons 作为默认的组件图标库。当然，您可以指定 Quasar 使用别的图标库，但是如果是一个 webfont 类型的图标，您需要确保提前将其安装，请参考[安装图标库](/options/installing-icon-libraries)。

### 硬编码
如果不需要动态切换 Quasar 默认图标库，那么您可以根据您的项目类型选择以下方式之一：

#### Quasar CLI 方式
编辑 `/quasar.config.js`：

```js
extras: [
  // 确保启用了图标库
  'mdi-v6'
],
framework: {
  // webfont 类型的图标库示例
  iconSet: 'mdi-v6'
}
```

```js
framework: {
  // svg 类型的图标库示例
  iconSet: 'svg-mdi-v6'
}
```

关于所有可用的选项，请参考：[GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set) 仓库

下面是一个完整的示例，启用 MDI 和 Fontawesome 并指定 Quasar 使用 Fontawesome 作为其组件的默认图标库。

```js
extras: [
  'mdi-v6',
  'fontawesome-v6'
],
framework: {
  iconSet: 'fontawesome-v6'
}
```

这样，您可以同时在您的项目中使用 MDI 和 Fontawesome 的字体图标，同时，所有的 Quasar 组件都会默认使用 Fontawesome 的图标。

#### UMD 方式
引入图标库，并指定 Quasar 使用它，示例：

```html
<!-- 在 Quasar 的 js 标签之后引入图标库 -->
<script src="https://cdn.jsdelivr.net/npm/quasar@v2/dist/icon-set/fontawesome-v6.umd.prod.js"></script>
<script>
  Quasar.iconSet.set(Quasar.iconSet.fontawesomeV6)
</script>
```

请参考 [UMD / Standalone](/start/umd) 页面查看您需要在 HTML 中引入的标签。

#### Quasar Vite 插件的方式
编辑 `main.js`：

```js
// ...
import { Quasar } from 'quasar'
// ...
import iconSet from 'quasar/icon-set/fontawesome-v6'
import '@quasar/extras/fontawesome-v5/fontawesome-v6.css'
// ...
app.use(Quasar, {
  // ...,
  iconSet: iconSet
})
```

#### Vue CLI 方式
编辑 `main.js`:

```js
import iconSet from 'quasar/icon-set/fontawesome-v6'
// ...
import { Quasar } from 'quasar'
// ...
app.use(Quasar, {
  // ...,
  iconSet: iconSet
})
```

### 动态切换 （适用于非 SSR 模式）

Quasar CLI: 如果您的项目中 Quasar 默认图标库需要动态的切换（例如：根据 cookie 来切换），那么您需要创建一个启动文件：`quasar new boot quasar-icon-set [--format ts]`，这个命令会创建一个 `/src/boot/quasar-icon-set.ts` 文件，编辑它如下：

```js
// -- 在 @quasar/app-vite 版本中 --

import { Quasar } from 'quasar'

// 修改路径为您的 node_modules/quasar/.. 的相对路径
const iconSetList = import.meta.glob('../../node_modules/quasar/icon-set/*.mjs')
// 或者只选择少数的几个图标库（如下面的示例只选择了 mdi-v6 和 fontawesome-v6）：
// import.meta.glob('../../node_modules/quasar/icon-set/(mdi-v6|fontawesome-v6).mjs')

export default async () => {
  const iconSetName = 'mdi-v6' // ... 在此您可以自定义选择图标库的逻辑（例如使用一个 Cookies 插件？）

  try {
    iconSetList[ `../../node_modules/quasar/icon-set/${ iconSetName }.mjs` ]().then(lang => {
      Quasar.iconSet.set(lang.default)
    })
  }
  catch (err) {
    // 请求的图标库不存在
    // 为了避免整个应用被破坏，所以捕获这个错误
  }
}
```

```js
// -- 在 @quasar/app-webpack 版本中 --

import { Quasar } from 'quasar'

export default async () => {
  const iconSetName = 'mdi-v6' // ... 在此您可以自定义选择图标库的逻辑（例如使用一个 Cookies 插件？）

  try {
    await import(
      /* webpackInclude: /(mdi-v6|fontawesome-v6)\.js$/ */
      'quasar/icon-set/' + iconSetName
    ).then(setDefinition => {
      Quasar.iconSet.set(setDefinition.default)
    })
  }
  catch (err) {
    // 请求的图标库不存在
    // 为了避免整个应用被破坏，所以捕获这个错误
  }
}
```

然后记得在 `/quasar.config.js` 中注册这个启动文件：

```js
boot: [
  'quasar-icon-set'
]
```

::: warning 始终限制动态导入
注意其中关于 [Webpack 魔法注册](https://webpack.js.org/api/module-methods/#magic-comments) - `webpackInclude` 的使用。否则所有的图标库都会被打包进构建产物中去，即使并没有使用它们，导致编译时间和产物体积增大。更多信息请参考[动态导入的注意事项](https://quasar.dev/quasar-cli/lazy-loading#Caveat-for-dynamic-imports)。
:::

### 动态切换 （适用于 SSR 模式）

在处理 SSR 模式时，我们不能使用单例对象，因为这会污染会话。因此，与上面的动态示例（先阅读它！）相反，您还必须从引导文件中指定 `ssrContext`：


```js
// -- With @quasar/app-vite --

import { Quasar } from 'quasar'

// 修改路径为您的 node_modules/quasar/.. 的相对路径
const iconSetList = import.meta.glob('../../node_modules/quasar/icon-set/*.mjs')
// 或者只选择少数的几个图标库（如下面的示例只选择了 mdi-v6 和 fontawesome-v6）：
// import.meta.glob('../../node_modules/quasar/icon-set/(mdi-v6|fontawesome-v6).mjs')

// ! 注意 ssrContext 参数：
export default async ({ ssrContext }) => {
  const iconSetName = 'mdi-v6' // ... 在此您可以自定义选择图标库的逻辑（例如使用一个 Cookies 插件？）

  try {
    iconSetList[ `../../node_modules/quasar/icon-set/${ iconSetName }.mjs` ]().then(lang => {
      Quasar.iconSet.set(lang.default, ssrContext)
    })
  }
  catch (err) {
    // 请求的图标库不存在
    // 为了避免整个应用被破坏，所以捕获这个错误
  }
}
```

```js
// -- With @quasar/app-webpack --

import { Quasar } from 'quasar'

// ! 注意 ssrContext 参数：
export default async ({ ssrContext }) => {
  const iconSetName = 'mdi-v6' // ... 在此您可以自定义选择图标库的逻辑（例如使用一个 Cookies 插件？）

  try {
    await import(
      /* webpackInclude: /(mdi-v6|fontawesome-v6)\.js$/ */
      'quasar/icon-set/' + iconSetName
    ).then(setDefinition => {
      Quasar.iconSet.set(setDefinition.default, ssrContext)
    })
  }
  catch (err) {
    // 请求的图标库不存在
    // 为了避免整个应用被破坏，所以捕获这个错误
  }
}
```

## 在运行时切换 Quasar 默认图标库
#### 动态切换默认图标库
Quasar Icon Set 是响应式的，所以，如果修改了 $q.iconSet 对象，所有的组件都会自动更新。示例：

```js
// 组合式 API 形式
import { useQuasar } from 'quasar'
import mdiIconSet from 'quasar/icon-set/mdi-v6.js'

setup () {
  const $q = useQuasar()

  function changeIconSetToMdiIconSet () {
    $q.iconSet.set(mdiIconSet)
  }

  return {
    changeIconSetToMdiIconSet
  }
}
```

```js
// 选项式 API 形式
import mdiIconSet from 'quasar/icon-set/mdi-v6.js'

methods: {
  changeIconSetToMdiIconSet () {
    this.$q.iconSet.set(mdiIconSet)
  }
}
```

#### 动态的切换一个指定的组件的图标
如果您想修改一个指定的图标：

```js
// 组合式 API 形式
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  function changeQEditorHeaderIcon () {
    $q.iconSet.editor.header1 = 'fas fa-font'
  }

  return { changeQEditorHeaderIcon }
}
```

```js
// 选项式 API 形式
methods: {
  changeQEditorHeaderIcon () {
    this.$q.iconSet.editor.header1 = 'fas fa-font'
  }
}
```
