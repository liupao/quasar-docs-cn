---
title: Color Palette
desc: How to use and customize the Quasar Color Palette.
components:
  - color-palette/BrandColors
  - color-palette/ColorList
related:
  - quasar-utils/color-utils
---
Quasar 提供了大量现成的颜色 css。您可以将它们用作 Sass/SCSS 变量，或者直接用作 HTML 模板中的 CSS 类。

## 主题颜色
Quasar 提供了一套默认的主题颜色如下，所有的 Quasar 组件都依赖这些颜色，选择主题颜色应该是在应用程序的设计阶段就定好的。

<brand-colors />

::: tip TIPS
在[主题构建器](/style/theme-builder)页面查看如何为您的网站/应用自定义主题颜色
:::

## 色彩列表
下面这些颜色都是 quasar 预设的，可以直接使用的，您可以在 `.vue`文件的模版中把他们当作 css 类来使用，也可以在`<style lang="...">`标签中当作 [Sass/SCSS 变量](/style/sass-scss-variables)来使用。

<color-list />

## 当作 CSS 类使用
使用`text-` 或者 `bg-` 当作前缀，然后加上一个预设的颜色的名称，就可以改变文本/背景的颜色，例如：

```html
<!-- changing text color -->
<p class="text-primary">....</p>

<!-- changing background color -->
<p class="bg-positive">...</p>
```

## 当作 Sass/SCSS 变量来使用

您可以通过`$`加上一个预设的颜色名称来当作一个 css 变量使用，例如：`$primary`, `$red-1`, 等等：

```html
<!-- Notice lang="sass" -->
<style lang="sass">
div
  color: $red-1
  background-color: $grey-5
</style>
```

```html
<!-- Notice lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```

## 添加您自己的颜色
您可以通过以下方式添加您自己的颜色，先在 css 中编写类似如下的代码：

```css
.text-brand {
  color: #a2aa33 !important;
}
.bg-brand {
  background: #a2aa33 !important;
}
```

然后在 Quasar 的组件中就可以这样使用刚才定义的颜色：
```html
<q-btn color="brand" ... />
```

您可以在 js 中通过[getPaletteColor](/quasar-utils/color-utils#helper-getpalettecolor)工具函数拿到颜色的值（16 进制字符）

## 动态切换主题颜色

### 工作原理

您可以在运行时修改上述主题色：`primary`, `secondary`, `accent`, `dark`, `positive`, `negative`, `info`, `warning`。也就是说，您可以为您的网站预设一个主题，然后在运行时切换不同的主题。

所有的主题颜色将会作为 css 变量存储在页面的根结点(`:root`)上，每个颜色属性都被命名为 `--q-${name}`，例如：`--q-primary`, `--q-secondary`，这些 css 颜色属性跟普通的 html 属性一样会被子节点继承，所以您可以在运行时修改/重置他们，并且在整个应用程序中生效。

推荐您也把自定义的颜色放在 `html` (`document.documentElement`) 或者 `body` (`document.body`)上，那么当您修改它的时候，所有的子元素都会继承这些修改。

更多的关于 css 变量的知识请看： [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables).

### 工具函数: setCssVar
Quasar 提供了一个实用的工具函数帮助您设置 css 变量，也可以修改上述主题颜色。

用法：`setCssVar(colorName, colorValue[, element])`

| 参数 | 类型 | 必填| Description |
| --- | --- | --- | --- |
| `colorName` | String | *是* | css 颜色名称，可以是主题色： `primary`, `secondary`, `accent`, `dark`, `positive`, `negative`, `info`, `warning` |
| `colorValue` | String | *是* | 16 进制色彩值 |
| `element` | Element | 否 | (默认值: `document.body`) 将 css 变量注入到哪个 dom 元素上。 |

示例：

```js
import { setCssVar } from 'quasar'

setCssVar('light', '#DDD')
setCssVar('primary', '#33F')
setCssVar('primary', '#F33', document.getElementById('rebranded-section-id'))
```

```js
//  setCssVar('primary'，'#0273d4') 在原生 js 中等于:
document.body.style.setProperty('--q-primary', '#0273d4')
```

### 工具函数: getCssVar

同上，quasar 也提供了一个获取 css 变量的工具函数

用法： `getCssVar(colorName[, element])`

| 参数 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `colorName` | String | *是* | css 颜色名称，可以是主题色： `primary`, `secondary`, `accent`, `dark`, `positive`, `negative`, `info`, `warning` |
| `element` | Element | 否 | (默认: `document.body`) 从那个 Dom 元素中读取 css 变量 |

示例：

```js
import { getCssVar } from 'quasar'

getCssVar('primary') // '#33F'
getCssVar('primary', document.getElementById('rebranded-section-id'))
```

这个函数是原始 js 中 getPropertyValue()的包装，等同于：

```js
//  getCssVar('primary') 等于原生 js 中的：
getComputedStyle(document.documentElement)
  .getPropertyValue('--q-primary') // #0273d4
```

### 更多的颜色工具

除了上面的 utils，quaasr 还有更多的处理颜色的工具函数:[Color utils](/quasar-utils/color-utils)

```js
import { colors, setCssVar } from 'quasar'

const { lighten } = colors

const newPrimaryColor = '#933'
setCssVar('primary', newPrimaryColor)
setCssVar('primary-darkened', lighten(newPrimaryColor, -10))
```

## 设置颜色默认值

如果不使用 sass/scss，您需要通过`quasar.config.js `来修改默认的主题颜色
```js
// Quasar CLI - quasar.config.js
return {
  framework: {
    config: {
      brand: {
        primary: '#ff0000',
        // ...
      }
    }
  }
}
```

或者使用一个 Boot 文件来处理， [@quasar/app-vite Boot File](/quasar-cli-vite/boot-files) or  [@quasar/app-webpack Boot File](/quasar-cli-webpack/boot-files):

```js
// For Quasar CLI
//不要在 SSR 模式中启用此 boot 文件

import { setCssVar } from 'quasar'

export default () => {
  setCssVar('primary', '#ff0000')
}
```

如果您使用 Quasar UMD 或者 Quasar Vite plugin 或者 Vue CLI 方式引入的 Quasar，则需要这么做：

```js
// UMD or Quasar Vite plugin or Vue CLI
app.use(Quasar, {
  config: {
    brand: {
      primary: '#ff0000',
      // ...
    }
  }
})
```
