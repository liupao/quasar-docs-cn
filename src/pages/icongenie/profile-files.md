---
title: Icon Genie 配置文件
desc: 怎样使用 Icon Genie CLI 的配置文件？
---

如果你需要自动创建应用程序的图标和启动画面，Icon Genie 提供了用于批量运行的配置文件。

这些配置文件被称为“profile files”。它们是 JSON 格式的，告诉 Icon Genie 要生成哪些图像以及如何生成它们。你就可以不用记忆 Icon Genie CLI 的命令和参数了。

## 文件结构

JSON 配置文件的一般形式是：

```json
{
  "params": { },
  "assets": [ ]
}
```

我们将在下一节中逐一讨论。

### 参数

JSON 配置文件中的 `params` 对象与 [generate](/icongenie/command-list#generate) 命令参数使用相同的名称（但使用驼峰式大小写，而不是 CLI 的 kebab-case）。有一个关键的区别：不是使用 `mode`（例如 “spa,pwa”，“all”），而是使用 `include`（例如 [“spa”，“pwa”]，[“all”]）。

`params` 对象的选项列表：

| 选项名称 | 数据类型 | 说明 | 举例 |
| --- | --- | --- | --- |
| include | Array | Icon Genie 给哪些 Quasar 模式生成图标？ | `[ "spa", "pwa" ]` / `[ "all" ]` |
| icon | String | 图标的源文件路径；可以是绝对路径，也可以相对于 Quasar 项目的根文件夹 | `my-icon.png` |
| background | String | 可选，背景源文件的路径（用于启动画面）; 可以是绝对路径，或相对于类星体项目的根文件夹的路径 | `my-bg.png` |
| filter | String | 可选，过滤资源文件；在使用时，它只能生成一种类型的资源文件，而不是所有类型 | `ico` |
| quality | Number [1-12] | 生成文件的质量；质量越高，文件越大，速度越慢；较低的质量意味着更小的文件，更快的速度 | `12` |
| padding | Array [Number] | (v2.1+) 裁剪完图标图片后，添加内边距；语法： [ <水平像素>, <竖直像素> ]；默认是： [0, 0] | `[10, 0]` / `[5,5]` |
| skipTrim | Boolean | (v2.2+) 不要裁剪图片。 | |
| themeColor | String [hex] | 为所有需要颜色的生成器使用的默认主题颜色；如果生成器指定了颜色，就会覆盖这个默认值。 | `ccc` / `e2b399` |
| pngColor | String [hex] | 当资源文件定义了 “Background: true”时，png 生成器使用的背景颜色（类似于 cordova/capacitor iOS 图标） | `ccc` / `e2b399` |
| splashscreenColor | String [hex] | 启动画面的背景颜色。 | `ccc` / `e2b399` |
| svgColor | String [hex] | 单色 SVG 图片的颜色。 | `ccc` / `e2b399` |
| splashscreenIconRatio | Number [0-100] | 图标大小相对于生成的启动画面的宽度或高度（以较小的那个为准）的比率；数字是百分比；0 表示不会添加背景顶部的图标 | `40` |

### Assets

如果你需要，`assets` 数组可以包含自定义的 **额外资源** 。当 Icon Genie 的每个模式的默认列表不足以满足您的需要时，可以使用此方法。如果你没有在 `params` 中指定 `include` 属性，你只能生成自定义资源文件。

在 99% 的情况下，你不需要指定 `assets` 数组，但是 Icon Genie 被设计得非常灵活，所以它也包含了这个功能。

一些示例，示范了每种 assets 类型的语法：

```json
"assets": [
  {
    "generator": "png",
    "name": "icon-{size}x{size}.png",
    "folder": "src-bex/icons",
    "sizes": [ 16, 48, 128 ]
  },

  {
    "generator": "svg",
    "name": "safari-pinned-tab.svg",
    "folder": "public/icons"
  },

  {
    "generator": "splashscreen",
    "name": "apple-launch-{size}.png",
    "folder": "public/icons",
    "sizes": [
      [ 1668, 2388 ]
    ],
    "tag": "<link rel=\"apple-touch-startup-image\" media=\"(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)\" href=\"icons/{name}\">"
  },

  {
    "generator": "icns",
    "name": "icon.icns",
    "folder": "src-electron/icons"
  },

  {
    "generator": "ico",
    "name": "icon.ico",
    "folder": "src-electron/icons"
  },

  {
    "generator": "splashscreen",
    "name": "Default-Landscape-2436h.png",
    "folder": "src-cordova/res/screen/ios",
    "sizes": [
      [ 2436, 1125 ]
    ]
  },

  {
    "generator": "png",
    "name": "icon-29@2x.png",
    "folder": "src-cordova/res/ios",
    "sizes": [ 58 ],
    "platform": "cordova-ios",
    "background": true
  },

  {
    "generator": "png",
    "name": "icon-29@2x.png",
    "folder": "src-cordova/res/ios",
    "sizes": [ 58 ],
    "platform": "cordova-ios",
    "background": true
  },

  {
    "generator": "png",
    "name": "xxxhdpi.png",
    "folder": "src-cordova/res/android",
    "sizes": [ 192 ],
    "platform": "cordova-android",
    "density": "xxxhdpi"
  },

  {
    "generator": "splashscreen",
    "name": "Default@2x~ipad~comany.png",
    "folder": "src-cordova/res/screen/ios",
    "sizes": [
      [ 1278, 2732 ]
    ],
    "platform": "cordova-ios"
  },

  {
    "generator": "splashscreen",
    "name": "splash-land-xxxhdpi.png",
    "folder": "src-cordova/res/screen/android",
    "sizes": [
      [ 1920, 1280 ]
    ],
    "platform": "cordova-android",
    "density": "land-xxxhdpi"
  }
]
```
## 自动制作配置文件

Icon Genie 还提供了 [profile 命令](/icongenie/command-list#profile)，它可以为你生成 JSON 配置文件。它可以帮助您创建一个或多个这样的文件，然后您可以通过带有 `--profile` 参数（或简短的 `-p`）的 [generate 命令](/icongenie/command-list#generate) 批量运行这些文件。

最方便的例子是在一个特定的文件夹中生成多个配置文件，每个文件都有自己的参数，然后通过 `$ icongenie generate -p /path/to/folder` 运行所有文件。