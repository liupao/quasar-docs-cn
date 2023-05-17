---
title: 颜色工具
desc: Quasar 提供的一组用于修改主题颜色和操作颜色字符串的工具函数。
keys: rgbToHex,rgbToHsv,hexToRgb,textToRgb,hsvToRgb,lighten,luminosity,brightness,blend,changeAlpha,getPaletteColor
related:
  - style/color-palette
---

Quasar 提供了一组有用的函数，可以在大多数使用情况下轻松地操纵颜色，而无需再安装高昂额外成本的专用库。

::: tip
关于 UMD 版本的构建请看[这里](/start/umd#quasar-global-object)
:::

## 颜色转换

这些函数可以接受字符串或对象格式的颜色，并将其转换为另一种格式。

| 函数 | 源格式 | 目标格式 | 描述 |
| --- | --- | --- | --- |
| `rgbToHex` | Object | String | 将 RGB/A 对象格式 (`{ r: [0-255], g: [0-255], b: [0-255}<,  a: [0-100]>}`) 的颜色转化为 HEX/A 十六进制字符串格式 (`#RRGGBB<AA>`)。如果 Alpha 通道出现在原始对象中，那么它也会出现在输出中。 |
| `rgbToHsv` | Object | Object | 将 RGB/A 对象格式 (`{ r: [0-255], g: [0-255], b: [0-255}<,  a: [0-100]>}`) 的颜色转化为 HSV/A 对象格式 (`{ h: [0-360], s: [0-100], v: [0-100},  a: [0-100]}`)。如果 Alpha 通道出现在原始对象中，那么它也会出现在输出中。 |
| `hexToRgb` | String | Object | 将 HEX/A 十六进制字符串格式 (`#RRGGBB<AA>`) 的颜色转化为 RGB/A 格式的对象 (`{ r: [0-255], g: [0-255], b: [0-255}<,  a: [0-100]>}`)。如果 Alpha 通道出现在原始对象中，那么它也会出现在输出中。 |
| `textToRgb` | String | Object | 将 HEX/A 十六进制字符串格式 (`#RRGGBB<AA>`) 或者 RGB/A 字符串格式(`rgb(R, G, B<, A>)`)的颜色转化为 RGB/A 对象格式 (`{ r: [0-255], g: [0-255], b: [0-255}<,  a: [0-100]>}`)。如果 Alpha 通道出现在原始对象中，那么它也会出现在输出中。 |
| `hsvToRgb` | String | Object | 将 HSV/A 对象格式的颜色 (`{ h: [0-360], s: [0-100], v: [0-100},  a: [0-100]}`) 转化为 RGB/A 对象格式 (`{ r: [0-255], g: [0-255], b: [0-255}<,  a: [0-100]>}`)。如果 Alpha 通道出现在原始对象中，那么它也会出现在输出中。 |

## 处理颜色

这些函数可以对颜色进行更改或提取特定信息。

:::tip 译者批注
下面的小标题就是函数签名
:::

### lighten (color, percent)
调亮颜色（如果 `percent` 为正数）或者调暗颜色（如果 `percent` 为负数）。

接受一个 HEX/A 或 RGB/A 格式的字符串作为 `color` 参数，加上一个 `percent` (0 到 100 或 -100 到 0)参数表示要做作用于 `color` 高/暗的百分比。返回一个十六进制的字符串作为 `color` 的计算结果。

### luminosity (color)
计算颜色的[相对亮度](http://www.w3.org/TR/WCAG20/#relativeluminancedef)。

可接受一个 HEX/A 或 RGB/A 格式的字符串，或 RGB/A 格式的对象作为  `color`。

返回一个 0 到 1 之间的数字。

### brightness (color)
计算颜色的[色彩对比度](https://www.w3.org/TR/AERT/#color-contrast)。

可接受一个 HEX/A 或 RGB/A 格式的字符串，或 RGB/A 格式的对象作为  `color`。

返回一个 0 到 255 之间的数字。如果值小于 128 可以被认为是一个暗色系的颜色。

### blend (fgColor, bgColor)

计算两个颜色的[混合色](https://www.w3.org/TR/compositing-1/#simplealphacompositing)。


`fgColor`/`bgColor` 都可接受一个 HEX/A 格式的字符串，或 RGB/A 格式的对象。

如果 `fgColor` ，则结果直接等于 `fgColor`。如果 `bgColor` 的 alpha 通道完全不透明，则计算结果的 alpha 通道也完全不透明。

返回与 `fgColor` 类型一样的颜色。


### changeAlpha (color, offset)

增加或减少字符串格式颜色中的 alpha 值。

接受一个 HEX/A 格式的字符串作为 `color`，加上一个 -1 到 1 之间的数字作为  `offset`。
使用一个负值来减少，一个正值来增加（例如：`changeAlpha('#ff0000', -0.1)` 表示减少 alpha 10%）。

返回 HEX/A 格式的字符串。

## Helper - getPaletteColor

您可以在 JS 上下文中查询任何主题中的颜色、调色板中的颜色或自定义的颜色，以获取其十六进制字符串。请注意，下面的方法运行时起来性能开销并不小，因此请谨慎使用：


```js
import { colors } from 'quasar'

const { getPaletteColor } = colors

console.log(getPaletteColor('primary')) // '#1976d2'
console.log(getPaletteColor('red-2')) // '#ffcdd2'
```

假设您创建了一个[自定义颜色](/style/color-palette#adding-your-own-colors)并将其命名为 "my-color"，那么您可以在 JS 中获取它：

```js
console.log(getPaletteColor('my-color')) // '#...'
```
