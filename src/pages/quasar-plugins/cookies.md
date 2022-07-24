---
title: Cookies
desc: Quasar插件封装了浏览器的cookie api，使得其在SSR中也可以使用。
keys: Cookies
---

这个插件是`document.cookie`的封装，除了标准的使用方式外，还可以 以JSON对象的方式对读写cookie，也可以管理SSR中的cookie。

## Cookies API

<doc-api file="Cookies" />

::: tip
当在Electron的版本大于等于v1.12.2时，这个插件的api不起作用。你需要参考 [Electron Cookies](https://www.electronjs.org/docs/api/cookies) 页面查看如何在其中使用cookie。
:::

## Installation

<doc-installation plugins="Cookies" />

## 构建SSR时需要注意
当构建SSR应用时我们只能用`$q.cookies` 的格式，如果你想使用`import { Cookies } from 'quasar'`的格式，需要做以下操作：


```js
import { Cookies } from 'quasar'

// you need access to `ssrContext`
function (ssrContext) {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  // "cookies" is equivalent to the global import as in non-SSR builds
}
```

这个 `ssrContext` 可以在boot文件的函数参数中获取到（[@quasar/app-vite Boot File](/quasar-cli-vite/boot-files) or [@quasar/app-webpack Boot File](/quasar-cli-webpack/boot-files)），也可以在[@quasar/app-vite preFetch](/quasar-cli-vite/prefetch-feature) or [@quasar/app-webpack preFetch](/quasar-cli-webpack/prefetch-feature) 特性中获取到。


这样做的原因是，在仅有客户端的应用程序中，每个用户都会在它们的浏览器中使用应用程序的一个新实例。对于服务器端渲染，我们也希望如此:每个请求都应该有一个新的、独立的应用实例，这样就不会有交叉请求的状态污染。因此cookie需要分别绑定到每个请求。

## 读取一个Cookie

```js
// 在Vue文件之外
import { Cookies } from 'quasar'
const value = Cookies.get('cookie_name')
```
当cookie未设置时，返回值为 `null`.

```js
// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const value = $q.cookies.get('cookie_name')
}
```

## 读取所有的Cookie

```js
// 在Vue文件之外
import { Cookies } from 'quasar'
const cookies = Cookies.getAll()
```

`cookies`变量会是一个(cookie_name : cookie_value)格式的对象。
```js
// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const allCookies = $q.cookies.getAll()
}
```

## 查询Cookie是否存在

```js
// 在Vue文件之外
import { Cookies } from 'quasar'
Cookies.has('cookie_name') // Boolean
```

```js
// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const hasIt = $q.cookies.has('cookie_name')
}
```

## 写入一个Cookie

```js
// 在Vue文件之外
import { Cookies } from 'quasar'

Cookies.set('cookie_name', cookie_value)

// 也可以传入一个options配置对象，详细参数见下方:
Cookies.set('cookie_name', cookie_value, options)
```

```js
// 在Vue文件之外
import { Cookies } from 'quasar'

Cookies.set('quasar', 'framework', {
  secure: true
})
```

```js
// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.cookies.set('cookie_name', cookie_value)
  // 也可以传入一个options配置对象，详细参数见下方:
  $q.cookies.set('cookie_name', cookie_value, options)
}
```
其中`options`参数是可选的，属性列表如下：

### Option: expires 过期时间

```js
expires: 10 // 10后过期
expires: -1 // 昨天
expires: 'Mon, 06 Jan 2020 12:52:55 GMT'
expires: new Date() // some JS Date Object
expires: '1d 3h 5m' // 1天3小时5分钟后过期
expires: '2d' // 2天后过期
expires: '15m 10s' // 15分钟10秒后过期
```
定义cookie的有效期，值可以被设置为数字、时间对象、字符串，若省略，则改cookie将会会成为seeion cookie，只在当前会话内有效。

### Option: path

```js
path: '/'
```
定义cookie有效的路径。默认情况下，cookie的路径是创建cookie的页面的路径（标准浏览器行为）。如果要使其在整个域中可用，请使用路径：“/”。默认值：创建cookie的页面路径。


### Option: domain

```js
domain: 'quasar.dev'
```

定义cookie有效的域名。默认为：创建cookie的页面域名。

### Option: sameSite

```js
sameSite: 'Strict'
// or
sameSite: 'Lax'
```
SameSite cookie允许服务器要求cookie不与跨站点(其中Site由可注册域定义)请求一起发送，这为防止跨站点请求伪造攻击(CSRF)提供了一些保护。


**Strict** - 如果同一站点的cookie具有此属性，浏览器将只在请求来自设置cookie的网站时才发送cookie。如果请求来自不同于当前位置的URL，则不会包含任何带有Strict属性标记的cookie。

**Lax** - 如果该属性设置为Lax，则在跨站点的子请求(如加载图像或帧的调用)中保留同站点cookie，但在用户从外部站点导航到URL时(如通过跟随链接)将发送此cookie。

更多关于`same-site`的设置请参考 [here](https://web.dev/samesite-cookies-explained/).

### Option: httpOnly

```js
httpOnly: true
```

为了帮助缓解跨站点脚本（XSS）攻击，JavaScript无法通过document.cookie api访问HttpOnly类型的 Cookie。它们只发送到服务器。例如，持久化服务器端会话的cookie不需要对JavaScript可用，并且应该设置HttpOnly标志。

### Option: secure

```js
secure: true
```

如果为`true`, cookie传输需要安全协议(HTTPS)，不会通过HTTP发送。默认值为`false`。

::: tip
如果使用Quasar CLI，并且在dev模式下，可以通过Quasar .config.js > devServer > https: true开启HTTPS

:::

### Option: other

```js
other: 'SomeNewProp'
```
在Quasar中还未实现的cookie原生配置项

## 移除一个 Cookie
```js
// 在Vue文件之外
import { Cookies } from 'quasar'

Cookies.remove('cookie_name')

// 如果待移除的cookie在写入时传入了特殊的配置项例如： path 或者 domain
//那么在删除时也得传入它们
Cookies.remove('cookie_name', options)
```

```js
// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.cookies.remove('cookie_name')

  // 如果待移除的cookie在写入时传入了特殊的配置项，例如： path 或者 domain
  //那么在删除时也得传入它们
  $q.cookies.remove('cookie_name', options)
}
```

::: warning
如果待移除的cookie在写入时传入了特殊的配置项，例如： path 或者 domain
那么在删除时也得将它们通过options传入remove()才能成功删除它们，这是遵循了RFC6265规定。
:::
