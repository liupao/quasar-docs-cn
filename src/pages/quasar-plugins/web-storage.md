---
title: Local/Session Storage Plugins
desc: 一个封装了 LocalStorage 和 SessionStorage 的 Quasar 插件，可以存储原始的 JS 类型。
keys: LocalStorage,SessionStorage
---

Quasar 提供了[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)的封装。

::: tip
Web Storage API 只能以字符串的方式读写数据，**Quasar 封装的版本可以读写 JS 原始类型**，当您存入一个 Number 类型的数据时，通过 Quasar 封装的 Storage 插件读取出来的数据也是 Number 类型，而通过 Web Storage API 读取出来的数据会是 String 类型。JSON、正则表达式、日期、布尔值等也是如此。
:::

## LocalStorage API

<doc-api file="LocalStorage" />

## SessionStorage API

<doc-api file="SessionStorage" />

## 安装
<doc-installation :plugins="['LocalStorage', 'SessionStorage']" />

::: danger SSR 相关注意事项
此功能在 SSR 的服务端不可用，因为 Web Storage 只是浏览器上特有的 API，您需要确保只在客户端使用它。
:::

## 用法

```js
// 在 Vue 文件之外
import { LocalStorage, SessionStorage } from 'quasar'

LocalStorage.set(key, value)
let value = LocalStorage.getItem(key)

SessionStorage.set(key, value)
let value = SessionStorage.getItem(key)
```

```js
// 在 Vue 文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.localStorage.set(key, value)
  const value = $q.localStorage.getItem(key)

  $q.sessionStorage.set(key, value)
  const otherValue = $q.sessionStorage.getItem(key)
}
```
为了以防万一，在写入数据时最好是捕获一下使用 Local/Session Storage Web API 时可能引发的潜在错误，例如写入的数据超出内存大小限制之类的：

```js
try {
  $q.localStorage.set(key, value)
} catch (e) {
  // 由于 Web Storage API 报错数据未能写入成功
}
```

::: tip 提示
关于完整的方法列表，请查看 API 卡片部分。
:::

## 数据类型


Quasar 封装的 Storage 支持以下数据类型（但不局限于此），如果您写入了以下数据类型的数据，在读取时还会获得相同的数据类型数据。

* Dates
* Regular Expressions
* Numbers
* Booleans
* Strings
* Plain Javascript Objects

如果您存储了*别的*数据类型的数据，在读取时会得到 String 类型的数据。

所以您甚至可以存储函数，但是需要注意读取时会得到这个函数的 String 表达方式，需要使用 eval()来运行函数。
