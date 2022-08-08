---
title: Local/Session Storage Plugins
desc: 一个封装了LocalStorage和SessionStorage的Quasar插件，可以存储原始的JS类型。
keys: LocalStorage,SessionStorage
---

Quasar提供了[Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)的封装。

::: tip
Web Storage API只能以字符串的方式读写数据，**Quasar封装的版本可以读写JS原始类型**，当你存入一个Number类型的数据时，通过Quasar封装的Storage插件读取出来的数据也是Number类型，而通过Web Storage API读取出来的数据会是String类型。JSON、正则表达式、日期、布尔值等也是如此。
:::

## LocalStorage API

<doc-api file="LocalStorage" />

## SessionStorage API

<doc-api file="SessionStorage" />

## 安装
<doc-installation :plugins="['LocalStorage', 'SessionStorage']" />

::: danger SSR相关注意事项
此功能在SSR的服务端不可用，因为Web Storage只是浏览器上特有的API，你需要确保只在客户端使用它。
:::

## 用法

```js
// 在Vue文件之外
import { LocalStorage, SessionStorage } from 'quasar'

LocalStorage.set(key, value)
let value = LocalStorage.getItem(key)

SessionStorage.set(key, value)
let value = SessionStorage.getItem(key)
```

```js
// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.localStorage.set(key, value)
  const value = $q.localStorage.getItem(key)

  $q.sessionStorage.set(key, value)
  const otherValue = $q.sessionStorage.getItem(key)
}
```
为了以防万一，在写入数据时最好是捕获一下使用Local/Session Storage Web API时可能引发的潜在错误，例如写入的数据超出内存大小限制之类的：

```js
try {
  $q.localStorage.set(key, value)
} catch (e) {
  // 由于Web Storage API报错数据未能写入成功
}
```

::: tip 提示
关于完整的方法列表，请查看API卡片部分。
:::

## 数据类型


Quasar封装的Storage支持以下数据类型（但不局限于此），如果你写入了以下数据类型的数据，在读取时还会获得相同的数据类型数据。

* Dates
* Regular Expressions
* Numbers
* Booleans
* Strings
* Plain Javascript Objects

如果你存储了*别的*数据类型的数据，在读取时会得到String类型的数据。

所以你甚至可以存储函数，但是需要注意读取时会得到这个函数的String表达方式，需要使用eval()来运行函数。
