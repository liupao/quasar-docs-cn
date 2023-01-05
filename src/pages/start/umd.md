---
title: Quasar UMD - CDN 安装
desc: 如何使用 Quasar 的统一模块定义形式
components:
  - umd/UmdTags
---

如需渐进式地把 Quasar 嵌入到已有网站项目中，可使用 UMD（统一模块定义，Unified Module Definition）/ Standalone 版本的 Quasar。

## 安装

UMD 主要是通过添加 Quasar 样式与 Javascript 标签实现对 Quasar 的支持。请选择要使用的功能，并查看下面输出的内容。

<umd-tags />

::: warning 警告
* 注意，不要忘记在文档开头添加 `<!DOCTYPE html>` 标签，否则，某些浏览器（尤其是 Safari）使用的兼容模式会影响 flex 布局。
* 如需使用希伯来等 Quasar 的 RTL（右至左，right-to-left）语言包，请打开上面的 “RTL CSS support” 开关。
* 不要使用 `<q-icon ... />` 等自闭合形式的标签，要使用 `<q-icon ...></q-icon>` 这样的完整标签。
* 建议指定所有在开发时测试可用的包的版本。有时需要回溯使用旧版本，例如，Vue 3.2.32 可能会破坏页面结构，此时，可在 script 标签中，使用 https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js，把 Vue 的版本指定为 3.2.31。
:::

::: tip 提示
所有组件、指令及 Quasar 插件都可以开箱即用，无须单独安装。只要确保**不要使用自闭合标签**即可。
:::

## JsFiddle 与 Codepen
在 Github 上提交 Issue 时，还可以 Fork 或使用以下链接。

| 服务商 | URL |
| --- | --- |
| jsFiddle | [https://jsfiddle.quasar.dev](https://jsfiddle.quasar.dev) |
| Codepen | [https://codepen.quasar.dev](https://codepen.quasar.dev) |

这些链接使用的都是 UMD 版本的 Quasar。

## Quasar 全局对象
把 Quasar UMD 嵌入到网页后，就可以获取注入的 `Quasar` 全局对象：

```js
Quasar = {
  version, // Quasar 版本

  ...components,
  ...directives,
  ...plugins, // Quasar 插件
  ...utils, // Quasar 工具

  // 如需更改当前图标库或 Quasar 语言包，
  // 必须先引入 CDN 链接，才能生效
  lang,
  iconSet
}
```

使用示例：

```js
Quasar.QBtn
Quasar.getCssVar('primary')
Quasar.debounce(fn, 200)
Quasar.Notify.create('Hi and welcome!')
Quasar.utils.is.deepEqual(objA, objB)
```

## Quasar 配置对象
以下是 Quasar 与 Quasar 插件的配置选项：
```js
app.use(Quasar, {
  config: {
    brand: {
      primary: '#e46262',
      // ... 其他主题颜色
    },
    notify: {...}, // Quasar 通知插件的默认选项
    loading: {...}, // Quasar 加载插件的默认选项
    loadingBar: { ... }, // Quasar 加载条的设置
    // ……等等
  }
})
```

## 用法
把所需的 CDN 链接嵌入网页后，就可以使用 Quasar 了。

::: tip 提示
您可能会注意到所有 Quasar 组件、指令及插件在页面顶部都有安装的内容。
:::

使用 UMD 版本的 Quasar 时，可以使用所有已安装的组件、指令及插件，您所要做的只是使用这些功能。

**使用 UMD 版本的 Quasar 时，一定不要使用自闭合标签：**
此时，不能使用组件的自闭合标签形式，必须使用完整的组件标签。

```html
<!-- 错误的用法：文档中有此方式，但这是 Quasar CLI 的用法 -->
<q-btn label="My Button" />
<!-- ^^^ 不能在 UMD 版本中使用这种形式 -->

<!-- 正确的用法：不能使用自闭合形式的标签 -->
<q-btn label="My Button"></q-btn>
```

### Quasar 组件
示例如下，在 UMD 版本中，无须安装组件，即可直接使用。
```html
<q-btn label="My Button"></q-btn>
```

### Quasar 指令
示例如下，在 UMD 版本中，无须安装指令，即可直接使用。
```html
<div v-ripple>...</div>
```

### Quasar 插件
示例如下，在 UMD 版本中，无须安装插件，即可直接使用。

```js
Quasar.BottomSheet.create({...})
```

### Quasar 工具
示例如下。
```js
Quasar.openURL('https://quasar.dev')
```

### 更换 Quasar 图标库
如果已在页面中已经加入了某个 Quasar 图标库的 CDN 链接（默认的 Material 图标库除外），即可在 Quasar 中使用该图标库：

```js
Quasar.iconSet.set(Quasar.iconSet.fontawesomeV6)
```

可用的 [Quasar 图标库](/options/quasar-icon-sets) 详见 [GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set) 相关页面。

### 更换 Quasar 语言包
如果已在页面中已经加入了某个 Quasar I18n 语言包的 CDN 链接（默认的 en-US 语言包除外），即可在 Quasar 中使用该图标库。

```js
// 设置为中文
Quasar.lang.set(Quasar.lang.zhCN)

// 设置为德语
// 使用两位的 ISO 字符代码：
Quasar.lang.set(Quasar.lang.de)

// 设置葡萄牙语（巴西）：
Quasar.lang.set(Quasar.lang.ptBR)
```

可用的语言包详见 [GitHub](https://github.com/quasarframework/quasar/tree/dev/ui/lang)。**如果我们尚未支持您所需要的语言，您可以提交 PR，以助我们一臂之力**。 我们欢迎所有的语言！
