---
title: 地址栏颜色插件
desc: 可以再移动端浏览器上自定义地址栏颜色的 Quasar 插件
keys: AddressbarColor
---
较新的移动端浏览器上能够为地址栏指定颜色，如下图所示。

::: warning 警告
* 目前还没有相应的 web 标准，所以还不能适用于所有的移动浏览器。
* 这只适用于一个网站上。手机 app 上实现地址栏着色(Cordova 模式)，请参考[cordova-plugin-statusbar](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-statusbar/).
:::

![Mobile Addressbar Coloring](https://cdn.quasar.dev/img/mobile-address-bar-colors.jpg "Mobile Addressbar Coloring")

## AddressbarColor API

<doc-api file="AddressbarColor" />

## 安装

<doc-installation plugins="AddressbarColor" />

##  用法
我们需要创建一个 boot 文件来进行初始化工作，运行`$ quasar new boot addressbar-color [--format ts]`后会帮您自动创建一个启动文件(`/src/boot/addressbar-color.js`)，然后编辑它，将下面的内容复制进去：

```js
// file: /src/boot/addressbar-color.js
import { AddressbarColor } from 'quasar'

export default () => {
  AddressbarColor.set('#a2e3fa')
}
```
我们每创建一个 boot 文件后，都得将这个 boot 文件的文件名加到 quasar.config.js 中的 boot 数组中，来告诉 quasar 需要启用它:

```js
// file: /quasar.config.js
return {
  boot: [
    'addressbar-color'
  ]
}
```
这个插件做的事情只是在运行的时候为您的`index.html`注入一些`<meta>`标签。

由于这些 meta 标签直到运行时才会被注入，所以您可以在页面的 `created()`生命周期中使用`set`函数多次动态的修改它的颜色。


```js
// a .vue file representing a page

import { useQuasar } from 'quasar'

export default {
  setup () {
    // 在 setup 中调用等同于组件的`created()`生命周期中调用
    const $q = useQuasar()
    $q.addressbarColor.set('#a2e3fa')
  }
}
```

::: tip 提示
若调用`set()`时没有传入参数，则会使用默认的颜色
:::
