---
title: Icon
desc: The QIcon Vue component allows you to insert icons within other components or any other area of your pages.
keys: QIcon
related:
  - /options/installing-icon-libraries
  - /options/quasar-icon-sets
---

QIcon 组件允许您轻松地将图标插入其他组件或页面的任何区域中。

Quasar 对以下图标库的支持是开箱即用的：
- [Material Icons](https://material.io/icons/)
- [Font Awesome](https://fontawesome.com/icons)
- [Ionicons](http://ionicons.com/)
- [MDI](https://materialdesignicons.com/)
- [Eva Icons](https://akveo.github.io/eva-icons)
- [Themify Icons](https://themify.me/themify-icons)
- [Line Awesome](https://icons8.com/line-awesome)
- [Bootstrap Icons](https://icons.getbootstrap.com/).

除此之外，您还可以[添加自己的图标库](/vue-components/icon#custom-mapping)

Quasar 中有多种类型的图标：基于 web 字体、基于 svg 和基于图像。您不必在网站/应用程序中仅使用一种类型。

::: tip
相关页面：[安装图标库](/options/installing-icon-libraries) 和 [Quasar 图标集合](/options/quasar-icon-sets).
:::

## QIcon API

<doc-api file="QIcon" />

## 尺寸 & 颜色
QIcon 的尺寸由 `font-size` CSS 属性决定，它还会继承当前字体的 `color` 属性。
更简单的方式是使用 QIcon 的 `size` 和 `color` 属性来设置尺寸和颜色。

<doc-example title="基础" file="QIcon/Basic" />

你可以通过以下方式来实现在不同的平台上使用不同的图标：

```html
<q-btn
  :icon="$q.platform.is.ios ? 'settings' : 'ion-ios-gear-outline'"
/>
```

<doc-example title="标准尺寸" file="QIcon/StandardSizes" />

## Webfont 图标

::: warning
如果您要使用基于 webfont 的图标，请确保您[安装](/options/installing-icon-libraries)了您正在使用的图标库，否则它将不会显示！
:::

### Webfont 图标用法

```html
<q-icon name="..." />
```

| Quasar 图标库名称 | 命名前缀 | 示例 | 注意事项 |
| --- | --- | --- | --- |
| material-icons | *None* | thumb_up | 注意下划线字符而不是破折号或空格 |
| material-icons-outlined | o_ | o_thumb_up | 注意下划线字符而不是破折号或空格 |
| material-icons-round | r_ | r_thumb_up | 注意下划线字符而不是破折号或空格 |
| material-icons-sharp | s_ | s_thumb_up | 注意下划线字符而不是破折号或空格 |
| ionicons-v4 | ion-, ion-md-, ion-ios-, ion-logo- | ion-heart, ion-logo-npm, ion-md-airplane | 使用 QIcon 代替 `<ion-icon>` 组件; Logo 图标需要 'ion-logo-' 前缀 |
| ionicons-v5/v6 | ion- | ion-heart, ion-logo-npm, ion-airplane | 使用 QIcon 代替 `<ion-icon>` 组件; Logo 图标需要 'ion-logo-' 前缀 |
| fontawesome-v6 | fa-[solid,regular,brands] fa- | "fa-solid fa-ambulance" | QIcon 的 "name" 属性等价于 Fontawesome 文档中示例的 `<i>` 标签的 class 属性。 |
| fontawesome-v6 Pro| fa-[solid,regular,brands,thin,light,duotone] fa- | "fa-solid fa-ambulance" | 注意: 这项功能必须从 Fontawesome 购买许可证 |
| fontawesome-v5 | fa[s,r,l,d,b] fa- | "fas fa-ambulance" | QIcon 的 "name" 属性等价于 Fontawesome 文档中示例的 `<i>` 标签的 class 属性。 |
| mdi-v6/v5/v4/v3 | mdi- | mdi-alert-circle-outline | 注意破折号的使用；仅使用mdi-v6、mdi-v5、mdi-v4或mdi-v3中的一个 |
| eva-icons | eva- | eva-shield-outline, eva-activity-outline | 注意破折号的使用 |
| themify | ti- | ti-hand-point-up | 注意破折号的使用 |
| line-awesome | la[s,r,l,d,b] la- | "las la-atom" | QIcon 的 "name" 属性等价于 Awesome 文档中示例的 `<i>` 标签的 class 属性。**@quasar/extras v1.5+** |
| bootstrap-icons | bi- | bi-bug-fill | 注意破折号的使用; **@quasar/extras v1.10+** |

### 命名约定

#### Material Icons (Google)

* 图标名称总是以下划线连接。
* 请前往 [Material Icons](https://material.io/icons/)，找到您想要的图标，然后记住他的名字（例如：all_inbox），将其填入 QIcon 的 name 属性中即可。

#### MDI (Material Design Icons)

* 图标名称总是以中划线划线连接并且带有 "mdi-" 前缀。
* 请前往 [MDI](https://materialdesignicons.com/)，找到您想要的图标，然后点击它，将会弹出一个对话框，记住它的标题（例如："account-key"），将其加上 "mdi-" 前缀后填入 QIcon 的 name 属性中即可（例如："mdi-account-key"）。


#### Fontawesome

* 图标名称总是以中划线划线连接并且带有  "fas fa-"， "fab fa-"， "fal fa-" 或 "far fa-" 的前缀。
* 新的版本中还有有 `fa-solid`, `fa-brands`, `fa-light` 或 `fa-regular` （pro 版本还有 `fa-thin`, `fa-duotone`）
* 请前往 [FontAwesome](https://fontawesome.com/icons)，找到您想要的图标，然后点击它，然后跳转到图标详情页面。在图标名称的下方，您会看到类似 `<i class="fa-solid fa-flag"></i>` 的代码，其中 `fa-solid fa-flag` 就是我们需要的结果（您也可以使用 `fas fa-flag`）。
* 注意：`fas`, `far`, `fab`, `fal`, `fat` 和 `fad` 已经被废弃了，并且可能在将来的版本中不可用。

#### Ionicons

* 图标名称总是以中划线划线连接并且带有 "ion-", "ion-md-", "ion-ios-" 或 "ion-logo-" 前缀。
* 请前往 [Ionicons (v6)](https://ionicons.com/) or [Ionicons (v4)](https://ionicons.com/v4)，找到您想要的图标，点击它，在页面的底部将会弹出一个对话框，注意其中类似 `<ion-icon name="square-outline"></ion-icon>` 的代码，记住它的名字（例如："square-outline"）。 根据您想要的变体（自动检测平台、材料或iOS），您将得到以下结果：`ion-square-outline` 或`ion-md-square-outline` or `ion-ios-square-outline`。
* **注意：**从 v5 开始，Ionicons 不在使用 Ionicons，也不再提供 Material or IOS 变种。

#### Eva Icons

* 图标名称总是以中划线划线连接并且带有 "eva-" 前缀。
* 请前往 [Eva Icons](https://akveo.github.io/eva-icons)，找到您想要的图标，点击它，将会弹出一个对话框，记住它的名称（例如："attach-outline"），将其加上 "eva-"  前缀后填入 QIcon 的 name 属性中即可（例如："eva-attach-outline"）。

#### Themify

* 图标名称总是以中划线划线连接并且带有 "ti-" 前缀。
* 请前往 [Themify](https://themify.me/themify-icons)，找到您想要的图标，然后记住它的名称（例如："ti-arrow-top-right"），将其填入 QIcon 的 name 属性中即可。

#### Line Awesome

* 图标名称总是以中划线划线连接并且带有 "la-" 前缀。
* 请前往 [Line Awesome](https://icons8.com/line-awesome)，找到您想要的图标，点击它将会弹出一个对话框。您会看到类似 `<i class="lab la-behance-square"></i>` 的代码，记住它的名称（例如："ti-arrow-top-right"），将其填入 QIcon 的 name 属性中即可（示例："lab la-behance-square"）。

#### Bootstrap Icons

* 图标名称总是以中划线划线连接并且带有 "bi-" 前缀。
* 请前往 [Bootstrap Icons](https://icons.getbootstrap.com/)，找到您想要的图标，然后记住它的名称，将其加上 "bi-" 前缀后填入 QIcon 的 name 属性中即可（例如："bi-bug-fill"）。

## Svg 图标

在您的网站/应用程序中仅使用 SVG 图标有许多优点：

* 应用程序占用更小的空间–最终构建中将只包含使用过的图标（使用树摇）
* 质量更好的图标
* 无需引入 `@quasar/extras` 或 CDN 中的 Web 字体资源。

目前的缺点是，使用这些图标比使用 webfont 图标的代码更冗长。

### Svg 用法

注意，在下面的示例中，我们希望避免 Vue 将这些数据包装成响应式数据，因此我们通过 create () 生命周期在实例中注入图标。如果在 data() 中声明这些数据也可以正常工作，但是...会造成额外的开销。

```html
<template>
  <div>
    <q-icon :name="matMenu" />
    <q-icon :name="fasFont" />
    <q-btn :icon="mdiAbTesting" />
  </div>
</template>

<script>
import { matMenu } from '@quasar/extras/material-icons'
import { mdiAbTesting } from '@quasar/extras/mdi-v6'
import { fasFont } from '@quasar/extras/fontawesome-v5'

export default {
  // ...
  created () {
    this.matMenu = matMenu
    this.mdiAbTesting = mdiAbTesting
    this.fasFont = fasFont
  }
}
```

::: tip
如果你只使用svg图标（并且配置了 [Quasar图标集](/options/quasar-icon-sets)），那么你的应用程序中根本不需要 webfont。
:::

| 图标库 | Quasar 图标集名称 | 从此导入  | 版本要求 |
| --- | --- | --- | --- |
| Material Icons (Google) | svg-material-icons | @quasar/extras/material-icons | |
| Material Icons Outlined (Google) | svg-material-icons-outlined | @quasar/extras/material-icons-outlined | @quasar/extras v1.9+; |
| Material Icons Sharp (Google) | svg-material-icons-sharp | @quasar/extras/material-icons-sharp | @quasar/extras v1.9+ |
| Material Icons Round (Google) | svg-material-icons-round | @quasar/extras/material-icons-round | @quasar/extras v1.9+ |
| MDI (Material Design Icons) (v3-v5) | svg-mdi-v5 | @quasar/extras/mdi-v5 | |
| MDI (Material Design Icons) v6 | svg-mdi-v6 | @quasar/extras/mdi-v6 | @quasar/extras v1.11+ |
| Font Awesome | svg-fontawesome-v5 | @quasar/extras/fontawesome-v5 | |
| Ionicons v6 | svg-ionicons-v6 | @quasar/extras/ionicons-v6 | @quasar/extras v1.12+ |
| Ionicons v5 | svg-ionicons-v5 | @quasar/extras/ionicons-v5 | @quasar/extras v1.7+ |
| Ionicons v4 | svg-ionicons-v4 | @quasar/extras/ionicons-v4 | |
| Eva Icons | svg-eva-icons | @quasar/extras/eva-icons | |
| Themify Icons | svg-themify | @quasar/extras/themify | |
| Line Awesome | svg-line-awesome | @quasar/extras/line-awesome | @quasar/extras v1.5+ |
| Bootstrap Icons | svg-bootstrap-icons | @quasar/extras/bootstrap-icons | @quasar/extras v1.10+ |

### 导入指南

Svg 图标由 `@quasar/extras` 提供（您也可以提供自己的Svg图标！）。以下是导入语法：

#### SVG Material Icons (Google)

* 图标名称总是驼峰命名并且带有 "mat" 前缀。
* 请前往 [Material Icons](https://material.io/icons/)，找到您想要的图标，点击它，然后记住它的名字（例如："all_inbox"），加上 前缀后变成驼峰命名 "mat" 就是我们需要的结果（示例："matAllInbox"）。
* 导入示例：`import { matAllInbox } from '@quasar/extras/material-icons'`.

#### SVG Material Icons Outlined (Google)

* 图标名称总是驼峰命名并且带有 "outlined" 前缀。
* 请前往 [Material Icons](https://material.io/icons/)，找到您想要的图标，点击它，然后记住它的名字（例如："all_inbox"），加上 "outlined" 前缀后变成驼峰命名就是我们需要的结果（示例： "outlinedAllInbox"）。
* 导入示例：`import { outlinedAllInbox } from '@quasar/extras/material-icons-outlined'`.

#### SVG Material Icons Sharp (Google)

* 图标名称总是驼峰命名并且带有 "sharp" 前缀。
* 请前往 [Material Icons](https://material.io/icons/)，找到您想要的图标，点击它，然后记住它的名字（例如："all_inbox"），加上 "sharp" 前缀后变成驼峰命名就是我们需要的结果（示例："sharpAllInbox"）。
* 导入示例：`import { sharpAllInbox } from '@quasar/extras/material-icons-sharp'`.

#### SVG Material Icons Round (Google)

* 图标名称总是驼峰命名并且带有 "round" 前缀。
* 请前往 [Material Icons](https://material.io/icons/)，找到您想要的图标，点击它，然后记住它的名字（例如："all_inbox"），加上 "round" 前缀后变成驼峰命名就是我们需要的结果（示例："roundAllInbox"）。
* 导入示例： `import { roundAllInbox } from '@quasar/extras/material-icons-round'`.

#### SVG MDI (Material Design Icons)

* 图标名称总是驼峰命名并且带有 "mdi" 前缀。
* 请前往 [MDI](https://materialdesignicons.com/)，找到您想要的图标，点击它将会出现一个对话框，获得标题（例如："account-key"），加上 "mdi" 前缀后变成驼峰命名就是我们需要的结果（示例： "mdiAccountKey"）。
* 导入示例： `import { mdiAccountKey } from '@quasar/extras/mdi-v6'`.

#### SVG Fontawesome

* 图标名称总是驼峰命名并且带有 "fas", "fab", "fal" 或 "far" 前缀。
* 请前往 [FontAwesome](https://fontawesome.com/icons)，找到您想要的图标，点击它，您将会跳转到图标详情页。在图标名称的下方，您会看到类似 `<i class="fas fa-flag"></i>` 的代码，它应该转换成 `fasFlag`。标签中的前缀是很重要的。
* 注意，由于许可证的原因在 Pro 版本中我们无法使用 svg 格式的图标。
* 导入示例： `import { fasFlag } from '@quasar/extras/fontawesome-v6'`.
* Quasar 的 SVG 格式依然使用 `fas`, `far` 和 `fab`，而不是较新的 `fa-solid`, `fa-regular` 和 `fa-brands`.

#### SVG Ionicons

* Ionicons v4: 图标名称总是驼峰命名并且带有 "ionMd" or "ionIos" 前缀。
* Ionicons v5/v6: 图标名称总是驼峰命名并且带有 "ion" 前缀。
* Ionicons v4: 请前往 [Ionicons v4](https://ionicons.com/v4/)，找到您想要的图标，点击它，页面底部会出现一个弹窗，请注意其中类似 `<ion-icon name="square-outline"></ion-icon>` 的代码。记住这个名字（例如："square-outline"）。将其加上 "ionMd" 或 "ionIos"（前者是 material 风格，后者是 IOS 风格） 前缀后变成驼峰命名就是我们需要的结果。
* Ionicons v5/v6: 请前往 [Ionicons v6](https://ionicons.com/)，找到您想要的图标，点击它 页面底部会出现一个弹窗，请注意其中类似 `<ion-icon name="square-outline"></ion-icon>`. 记住这个名字（例如："square-outline"）。加上 "ion" 前缀后变成驼峰命名就是我们需要的结果（示例："ionSquareOutline"）。
* Ionicons v4: 导入示例：`import { ionMdSquareOutline } from '@quasar/extras/ionicons-v4'`.
* Ionicons v5/v6: 导入示例：`import { ionSquareOutline } from '@quasar/extras/ionicons-v5'`.

#### SVG Eva Icons

* 图标名称总是驼峰命名并且带有 "eva" 前缀。
* 请前往 [Eva Icons](https://akveo.github.io/eva-icons)，找到您想要的图标，获得图标的名称（例如："attach-outline"），加上 "eva" 前缀后变成驼峰命名就是我们需要的结果（示例："evaAttachOutline"）。
* 导入示例：`import { evaAttachOutline } from '@quasar/extras/eva-icons'`.

#### SVG Themify

* 图标名称总是驼峰命名并且带有 "ti" 前缀。 "ti" prefix.
* 请前往 [Themify](https://themify.me/themify-icons)，找到您想要的图标，点击它获得图标的名称（例如："arrow-top-right"），加上 "ti" 前缀后变成驼峰命名就是我们需要的结果（示例："evaAttachOutline"）。
* 导入示例：`import { tiArrowTopRight } from '@quasar/extras/themify'`.

#### SVG Line Awesome

* 图标名称总是驼峰命名并且带有 "la" 前缀。
* 请前往 [Line Awesome](https://icons8.com/line-awesome)，找到您想要的图标，点击它将会出现一个对话框。您会看见类似：`<i class="lab la-behance-square"></i>` 的代码。它应该被转换成 `laBehanceSquare`。这里有一个特例（只针对 solid 图标），如果 "la-" 前缀之前有 "las"，那么我们需要再加上一个 "-solid" 后缀，例如：`<i class="las la-atom"></i>` 需要转换成 `laAtomSolid`。
* 导入示例：`import { laBehanceSquare } from '@quasar/extras/line-awesome'`.

#### SVG Bootstrap Icons

* 图标名称总是驼峰命名并且带有 "bi" 前缀。
* 请前往 [Bootstrap Icons](https://icons.getbootstrap.com/)，找到您想要的图标，点击它记住它的名字（例如："bi-bug-fill"），加上 "bi-" 前缀后变成驼峰命名就是我们需要的结果（示例："biBugFill"）。
* 导入示例：`import { biBugFill } from '@quasar/extras/bootstrap-icons'`.

### Svg 图标格式

您还可以提供自己的 svg 图标。svg 图标本质上是具有以下语法的字符串：

```
语法： "<path>&&<path>&&...|<viewBox>"
           P       P             V
                (可选的)   (可选的)
                             (默认: 0 0 24 24)
P 是符合以下语法的 path（每个都是属性）：
        "<d>@@<style>@@<transform>"
        (必须的)
            (可选的)
                     (可选的)
```

示例：

```
// 最简单的 ("<path>"):
  M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z

// 等于：
<svg viewBox="0 0 24 24">
  <path d="M9 3L5 6.99h3V....."/>
</svg>
```

```
// 自定义 viewBox ("<path>|<viewBox>"):
  M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z|0 0 104 104

// 等于：
<svg viewBox="0 0 104 104">
  <path d="M9 3L5 6.99h3V....."/>
</svg>
```

```
// Path 自定义 style ("<path>@@<style>|<viewBox>"):
  M48,96L464,96 464,416 48,416z@@fill:none;stroke:currentColor.....|0 0 512 512

// 等于：
<svg viewBox="0 0 512 512">
  <path d="M416,480,256,357....." style="fill:none;stroke:curren..." />
</svg>
```

```
// Path 自定义 style 和 transform ("<path>@@<style>@@transform"):
  M9 3L5 6.99h3V...@@fill:none;stroke:cu.....@@translate(10 1) rotate(180)

// 等于：
<svg viewBox="0 0 24 24">
  <path
    d="M9 3L5 6.99h3V....."
    style="fill:none;stroke:curren..."
    transform="translate(10 1) rotate(180)"
  />
</svg>
```

```
// Path 自定义 transform ("<path>@@@@transform"):
// (Notice style separator is still specified)

  M9 3L5 6.99h3V...@@@@translate(2 4) rotate(180)

// 等于：
<svg viewBox="0 0 24 24">
  <path
    d="M9 3L5 6.99h3V....."
    transform="translate(2 4) rotate(180)"
  />
</svg>
```

```
// Multi-paths -- any number of paths are possible ("<path>&&<path>|<viewBox>"):
  M416,480,256,357.41,96,480V32H416Z&&M368,64L144 256 368 448 368 64z|0 0 512 512

// 等于：
<svg viewBox="0 0 512 512">
  <path d="M416,480,256,357....." />
  <path d="M368,64L144 256 368...." />
</svg>
```

```
// Multi-paths, each with style and transform ("<path>&&<path>|<viewBox>"):
  M9 3L5 6.99h3V...@@stroke-width:5px@@rotate(45)&&M416,480,256,...@@stroke-width:2px@@rotate(15)&&M368,64L144 2...@@stroke-width:12px@@rotate(5)|0 0 512 512

// 等于：
<svg viewBox="0 0 512 512">
  <path
    d="M9 3L5 6.99h3V....."
    style="stroke-width:5px"
    transform="rotate(45)"
  />
  <path
    d="M416,480,256,..."
    style="stroke-width:2px"
    transform="rotate(15)"
  />
  <path
    d="M368,64L144 2..."
    style="stroke-width:12px"
    transform="rotate(5)"
  />
</svg>
```

## SVG-use way

This svg method allows you to store the SVG files as static assets and reference them.

```html
// File: /public/icons.svg

<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-1" viewBox="0 0 24 24">
    <path d="..."></path>
  </symbol>
  <symbol id="icon-2" viewBox="0 0 24 24">
     <path d="..."></path>
  </symbol>
</svg>
```

The standard HTML way is to include the file and specify the icon with the `svg use` tag.

```html
<svg>
  <use xlink:href="icons.svg#icon-1"></use>
</svg>
```

To use this with Quasar through QIcon (make sure that you are referencing the correct file from your public folder):

```html
<q-icon name="svguse:icons.svg#icon-1">
<!-- or -->
<q-btn-dropdown label="Custom Content" dropdown-icon="svguse:icons.svg#icon-2" />
```

By default, the parent svg's viewBox is "0 0 24 24". However, you can also specify a custom one:

```html
<q-icon name="svguse:icons.svg#icon-1|10 15 40 40" />
```

## Inlined svg

If you don't want to use the webfont or svg variants from above, note that QIcon also supports one inlined `<svg>` tag (the content of the svg can be anything, not only a path).

Reasoning on why to use an `<svg>` in a QIcon is that the svg will respect the size and color as any QIcon through its props. Without these features, you're better off inlining the svg in your templates without wrapping with QIcon.

```html
<q-icon color="accent" size="5rem">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>
  </svg>
</q-icon>
```

Some limitations:
* do not use "height"/"width" attributes on the `<svg>` tag (it will break QIcon's way of handling the size)
* all `<path>`s will have "fill: currentColor" CSS applied by default; if you don't want that, then add `fill="none"` to the `<path>` tag

## Image icons
You can also make an icon point to an image URL instead of relying on any webfont, by using the `img:` prefix.

**All icon related props of Quasar components can make use of this.**

```html
<q-icon name="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
<q-btn icon="img:https://cdn.quasar.dev/logo-v2/svg/logo.svg" ... />

<!-- reference from /public: -->
<q-icon name="img:my/path/to/some.svg" />
```

::: tip
Remember that you can place images in your `/public` folder too and point to them. You don't always need a full URL.
:::

This is not restricted to SVG only. You can use whatever image type you want (png, jpg, ...):

```html
<q-icon name="img:bla/bla/my.png" />
<q-btn icon="img:bla/bla/my.jpg" ... />
<q-input clearable clear-icon="img:bla/bla/my.gif" ... />
```

It is also possible to inline the image (svg, png, jpeg, gif...) and dynamically change its style (svg):

```html
<q-icon name="img:data:image/svg+xml;charset=utf8,<svg xmlns='http://www.w3.org/2000/svg' height='140' width='500'><ellipse cx='200' cy='80' rx='100' ry='50' style='fill:yellow;stroke:purple;stroke-width:2' /></svg>" />
```

<doc-example title="Dynamic SVG" file="QIcon/DynamicSvg" />

You can also base64 encode an image and supply it. The example below is with a QBtn, but the same principle is involved when dealing with any icon prop or with QIcon:

```html
<q-btn icon="
img:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" ... />
```

## Custom mapping

Should you want, you can customize the mapping of icon names. This can be done by overriding `$q.iconMapFn`. The recommended place to do it is in the `created()` hook of your `/src/App.vue` component.

The syntax for `$q.iconMapFn` is as follows:

```js
/* Syntax */
iconMapFn (String: iconName) => Object / void 0 (undefined)

/*
 The returned Object (if any) must be one of the following forms:

 1. Defines how to interpret icon
 {
   cls: String // class name(s)
   content: String // 可选的, in case you are using a ligature font
                   // and you need it as content of the QIcon
  }

  2. Acts essentially as a map to another icon
  {
    icon: String // the mapped icon String, which will be handled
                 // by Quasar as if the original QIcon name was this value
  }
*/
```

Let's take both cases now.

#### 1. Support for custom icon library

This is especially useful when you are using a custom icon library (that doesn't come with Quasar and its `@quasar/extras` package).

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  // Example of adding support for
  // <q-icon name="app:...." />
  // This includes support for all "icon" props
  // of Quasar components

  $q.iconMapFn = (iconName) => {
    // iconName is the content of QIcon "name" prop

    // your custom approach, the following
    // is just an example:
    if (iconName.startsWith('app:') === true) {
      // we strip the "app:" part
      const name = iconName.substring(4)

      return {
        cls: 'my-app-icon ' + name
      }
    }

    // when we don't return anything from our
    // iconMapFn, the default Quasar icon mapping
    // takes over
  }
}
```

Notice in the examples above that we are returning a `my-app-icon` class that gets applied to QIcon if our icon starts with `app:` prefix. We can use it to define how QIcon should react to it, from a CSS point of view.

Let's assume we have our own webfont called "My App Icon".

```css
/*
  For this example, we are creating:
  /src/css/my-app-icon.css
*/

.my-app-icon {
  font-family: 'My App Icon';
  font-weight: 400;
}

@font-face {
  font-family: 'My App Icon';
  font-style: normal; /* whatever is required for your */
  font-weight: 400;   /* webfont.... */
  src: url("./my-app-icon.woff2") format("woff2"), url("./my-app-icon.woff") format("woff");
}
```

We should then edit our `quasar.config.js` (if using Quasar CLI) to add the newly created CSS file into our app:

```js
css: [
  // ....
  'my-app-icon.css'
]
```

And also add "my-app-icon.woff2" and "my-app-icon.woff" files into the same folder as "my-app-icon.css" (or somewhere else, but edit the relative paths (see "src:" above) to the woff/woff2 files).

#### 2. Simply mapping a few icons

```js
import { useQuasar } from 'quasar'

const myIcons = {
  'app:icon1': 'img:/path/to/icon1.svg',
  'app:icon2': 'img:/path/to/icon2.svg',
  'app:copy': 'fas fa-copy',
}

// ...
setup () {
  const $q = useQuasar()

  $q.iconMapFn = (iconName) => {
    const icon = myIcons[iconName]
    if (icon !== void 0) {
      return { icon: icon }
    }
  }
}
```

Now we can use `<q-icon name="app:copy" />` or `<q-icon name="app:icon1" />` and QIcon will treat "app:copy" and "app:icon1" as if they were written as "fas fa-copy" and "img:/path/to/icon1.svg".
