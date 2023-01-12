---
title: Quasar Meta Plugin
desc: 可以轻松管理 meta 标签的 Quasar 插件，帮助改善应用的 SEO。它能管理 meta，style，script 标签，html 和 body 的属性以及页面的 title。
keys: Meta
related:
  - /vue-composables/use-meta
---

**改善网站的 SEO!** Meta 插件可以动态的改变页面的 title，管理页面的`meta`标签，管理`html`和`body`标签的 DOM 属性，管理页面 head 中的`style`，`script`和`noscript`标签(对 CDN 引入的样式表和 json-ld 标签很有用)。

::: tip 提示
使用 Quasar CLI 可以充分利用这一特性，特别时在构建 SSR（服务端渲染）应用时。当然构建 SPA（单页应用）时也可以使用，虽然在 SPA 中，meta 标签不是像 SSR 那样直接在服务端添加，而在运行时添加的，但是现代的网络爬虫，例如[Googlebot](https://developers.google.com/search/docs/guides/javascript-seo-basics)仍然可以抓取动态添加的 meta 信息。
:::

## 安装

<doc-installation plugins="Meta" />

## 用法

Meta 插件允许在您在 Vue 组件中使用一个叫做`meta`的特殊对象。看看下面的例子，它几乎包含了所有的特性。

::: warning 重要!
确保不要重复添加`/src/index.template.html`中已经存在的 meta 标签。如果您想使用 Meta 插件，推荐的方法是先在 html 模板中删除相同的 meta 标签。但是当您知道某个 meta 标签永远不会改变，并且总是会被渲染时，最好还是把它留在 html 模板中。
:::

### 组合式 (Composition API)

我们会使用 [useMeta](/vue-composables/use-meta) composable。

```js
// 在某些.vue 文件中
import { useMeta } from 'quasar'

const metaData = {
  // 设置页面 title
  title: 'Index Page',
  // 可选的；设置最终的 title 为“Index Page - My Website”,
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - My Website`
      }
    }
  },

  // CSS tags
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  },

  // JS tags
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ "@context": "http://schema.org" }`
    }
  },

  // <html> attributes
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#', // 生成 <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // 生成 <html empty>
  },

  // <body> attributes
  bodyAttr: {
    'action-scope': 'xyz', // 生成 <body action-scope="xyz">
    empty: undefined // 生成 <body empty>
  },

  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

export default {
  setup () {
    // 需要在 setup()中调用
    useMeta(metaData)
  }
}
```
如果您需要通过组件中的数据来计算出要设置的 meta 对象，请使用一个函数来代替对象，更多参考请见"Reactive"部分


### 选项式 (Options API)

```js
// 在某些.vue 文件中
import { createMetaMixin } from 'quasar'

const metaData = {
  // 设置页面 title
  title: 'Index Page',
  // 可选的；设置最终的 title 为“Index Page - My Website”,
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Page 1' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle:  {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template (ogTitle) {
        return `${ogTitle} - My Website`
      }
    }
  },

  // CSS tags
  link: {
    material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  },

  // JS tags
  script: {
    ldJson: {
      type: 'application/ld+json',
      innerHTML: `{ "@context": "http://schema.org" }`
    }
  },

  // <html> attributes
  htmlAttr: {
    'xmlns:cc': 'http://creativecommons.org/ns#' // 生成 <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined // 生成 <html empty>
  },

  // <body> attributes
  bodyAttr: {
    'action-scope': 'xyz', // 生成 <body action-scope="xyz">
    empty: undefined // 生成 <body empty>
  },

  // <noscript> tags
  noscript: {
    default: 'This is content for browsers with no JS (or disabled JS)'
  }
}

export default {
  mixins: [
    createMetaMixin(metaData)
  ]
}
```

对于选项式 api，如果您需要通过组件中的数据来计算出要设置的 meta 对象，请使用一个函数来代替对象:

```js
export default {
  mixins: [
    createMetaMixin(function () {
      // 通过 `this` 访问组件中的数据
      return {
        // 假设您的组件中有`this.myTitle`
        title: this.myTitle
      }
    })
  ]
}
```

## 工作原理

Meta 数据是根据 Vue Router 激活的 Vue 组件的顺序计算的。示例：App.vue > SomeLayout.vue > IndexPage.vue> ...?

当一个使用了 Meta 插件的组件被渲染或者被销毁时，这条路由链中的 meta 数据将会被更新。

### 处理 HTML attributes

当您需要给`meta`,`link`,`script`等 HTML 标签设置一个 boolean 类型的属性时，请讲其值设置为 true。


```js
script: {
  myScript: {
    src: 'https://...',
    defer: true
  }
}
// 上述代码将会生成:
// <script src="https://..."
//         defer
//         data-qmeta="myScript">
```
当您需要给一个属性设置为字符串类型的 "true" 时:

```js
someattribute: 'true'
// 将会输出: someattribute="true"

someattribute: true
// 将会输出: someattribute

someattribute: void 0
// 不会生成属性
// ( useful when you set it upstream
// and want to remove it downstream )

someattribute: ''
// 将会输出: someattribute=""
```

### Non-reactive

注意：除了 title 和 titleTemplate，所有的字段都是对象，您可以通过再次使用相同的键来重写被之前的 Vue 组件定义过的 meta 数据。例子：

```js
// 第一个被加载 Vue 组件：
setup () {
  useMeta({
    meta: {
      myKey: { name: 'description', content: 'My Website' }
    }
  })
}

// 路由链中处于后面的 Vue 组件
// 下面的代码会重写第一个组件定义的'myKey'
setup () {
  useMeta({
    meta: {
      myKey: { name: 'description', content: 'Page 1' }
    }
  })
}
```

### Reactive

在上面的列子中，您可能注意到了所有的属性都是静态的，但是它们也可以使用 vue 组件中的响应式数据：

```js
// 在某些.vue 文件中
import { useMeta } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const title = ref('Some title') // we define the "title" prop

    // 注意传入的参数是一个函数
    // 通过这种方式它会被转化为带有响应性的 Vue 计算属性
    useMeta(() => {
      return {
        // 当上面的 title 变化时，您的 meta 数据也会自动跟着变变
        title: title.value
      }
    })

    function setAnotherTitle () {
      title.value = 'Another title' //由于上面的绑定这里更新 title 会触发 Meta 的更新
    }

    return {
      setAnotherTitle
    }
  }
}
```

## 测试 Meta

在部署之前，您需要确认所设置的 meta 标签是否符合规范，可以复制您的链接到 Discord chat，一个 Facebook 帖子，或者 Tweet 中，, 我们推荐使用 [https://metatags.io/](https://metatags.io/)来验证。


::: warning 重要!
**这个测试只适用于 SSR 构建**，因为当访问 web 服务器时，SSR 直接提供呈现完整的 HTML(与 SPA 或 PWA 相反，后者提供一个空页面，然后加载代码，在客户端浏览器上呈现页面)。像上面这样的服务(metatags.io)期望页面在获取时已经完全呈现(它不会等待所有的 js 运行完毕)。
:::
