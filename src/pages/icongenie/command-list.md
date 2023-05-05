---
title: Icon Genie CLI 命令列表
desc: Icon Genie CLI 的命令列表。
---

Quasar 项目目录里 Icon Genie CLI 可用的命令，请熟悉：

```
$ icongenie

  示例用法
    $ icongenie <command> <options>

  查询一个命令的帮助信息
    $ icongenie <command> --help
    $ icongenie <command> -h

  选项
    --version, -v Print Quasar Icon Genie CLI version

  命令
    generate, g   生成应用图标和启动屏幕背景
    verify, v     验证你的 Quasar 应用的图标和
                    启动画面的背景
    profile, p    创建 Icon Genie 的配置文件
    help, h       显示这样的帮助信息
```

查询特定命令的帮助：

```bash
$ icongenie [command_name] --help
```

## Generate

`generate` 命令用于生成应用程序图标和启动画面。它是 Icon Genie 的核心，承担了繁重的工作。

看下面的用法和一些例子。需要注意的参数是 `--icon`（或`-i`），它接受透明的 PNG 图片作为应用程序图标和启动画面。PNG 图片的最小尺寸是 64x64 像素，但强烈建议至少要超过 1024x1024 像素。

对于启动画面，如果你希望你的图标放置在背景顶部，则要再加上 `--background`（或`-b`）。

你可能还想使用 `--profile`（或`-p`）参数，它可以运行一个或多个 Icon Genie [配置文件](/icongenie/profile-files)。

```
$ icongenie generate -h

  描述
    生成应用图标或启动屏图片

  用法
    $ icongenie generate [options]

    # 给所有 Quasar 模式生成图标
    $ icongenie generate -i /path/to/icon.png
    $ icongenie g -i /path/to/icon.png

    # 举个例子：只为 PWA 模式生成
    $ icongenie generate -m pwa --icon /path/to/icon.png

    # 例子：只为 Cordova 和 Capacitor 模式生成
    $ icongenie g -m cordova,capacitor -i
         /path/to/icon.png -b /path/to/background.png

    # 通过配置文件生成
    $ icongenie generate -p ./icongenie-profile.json

    # 用多个配置文件生成
    $ icongenie generate -p ./含有配置文件的文件夹

  选项
    --icon, -i            必填；
                          图标源文件的路径；必须是：
                            - 一个 .png 文件
                            - 最小分辨率： 64x64 像素（越高越好！）
                            - 透明背景
                          最好的正方形的图片（宽高相等）
                          图片会自动裁剪：
                            （见 “skip-trim”和“padding”参数
                          路径可以是绝对路径，
                            也可以是相对于 Quasar 根目录的相对路径
                          推荐的最小尺寸：1024x1024 像素

    --background, -b      可选。背景源文件的路径（启动画面用的背景）；
                          必须是：
                            - 一个 .png 文件
                            - 最小分辨率：128x128 像素（越高越好！）
                            - 图片是透明背景的，这点不强求。
                             （但若设置了 splashscreen-color 参数，
                               推荐使用透明背景）
                          路径可以是绝对路径或相对Quasar工程根目录的路径。
                          推荐的最小尺寸：1024x1024 像素

    --mode, -m            在 Quasar 的哪些模式里要生成资源；
                          默认：全部
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          可以多选，用“,”分隔：
                            spa,cordova

    --filter, -f          过滤可用的生成器；
                          设置之后，只会生成一种资源类型，而非全部。
                            [png|ico|icns|splashscreen|svg]

    --quality             图片的压缩品质 [1 - 12] （默认： 5）
                            - 高品质 --> 体积大且创建慢
                            - 低品质 --> 体积小且创建快

    --skip-trim           不要裁剪图标源文件

    --padding             裁剪后，添加边距空白；
                          语法： <水平: number>,<竖直: number>
                          默认： 0,0
                          例子: "--padding 10,5" 指距离顶部和底部空出 10 像素 
                            距离左侧和右侧空出 5 像素。

    --theme-color         所有生成器使用的默认主题色；
                          如果某个具体的生成器单独设置了主题色，单独的颜色会覆盖这个主题色。；
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号
                          不允许透明。
                          例子：1976D2, eee

    --svg-color           单色 SVG 图片的颜色。
                          默认值（且没有设置 theme-color）：1976D2
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号
                          不允许透明。
                          例子： 1976D2, eee

    --png-color           当资源定义了“background: true”时，PNG 生成器用到的背景色。
                          
                            （像 cordova/capacitor iOS 图标）；
                          默认值（且没有设置 theme-color）： fff
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号
                          不允许透明。
                          例子： 1976D2, eee

    --splashscreen-color  启动画面生成器用的背景色；
                          默认值（且没有设置 theme-color）：fff
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号。
                          不允许透明。
                          例子： 1976D2, eee

    --splashscreen-icon-ratio  启动画面上的图标大小相比于
                                宽度与高度（取较小者）的比率。                               
                               值是百分数；有效数字：0 - 100
                               如果为0，则不添加背景顶部的图标
                               默认: 40

    --profile, -p         使用 JSON 配置文件：
                            - 含有配置文件（icongenie-*.json）的目录的路径
                              （绝对路径或相对当前目录的路径）                          
                            - 单个 *.json 配置文件的路径。 
                              （绝对路径或相对当前目录的路径）
                          JSON 配置文件的结构：
                            {
                              "params": {
                                "include": [ ... ], /* 可选 */
                                ...
                              },
                              "assets": [ /* 自定义资源的列表 */ ]
                            }

    --help, -h            显示这个帮助信息
```

## Verify

`verify` 命令核对所有必需的图片文件都在正确的位置，并且每个文件都具有正确的像素分辨率。

```
$ icongenie -h

  描述
    核对你的 Quasar 应用的图标和启动画面
    （所有模式）

  用法
    $ icongenie verify [options]

    # 核对所有的 Quasar 模式
    $ icongenie verify

    # 核对指定的模式
    $ icongenie verify -m spa

    # 通过过滤器核对
    $ icongenie verify -f ico

    # 用配置文件核对
    $ icongenie verify -p ./icongenie-profile.json

    # 用含有配置文件的文件夹核对
    $ icongenie verify -p ./folder-containing-profile-files

  选项
    --mode, -m      哪个 Quasar 模式需要核对；
                    默认: all
                      [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                    可以多选，用“,”分隔：
                      spa,cordova,capacitor

    --filter, -f    在可用的生成器里过滤；
                    设置后，只核对一种资源，而非全部
                      [png|ico|icns|splashscreen|svg]

    --profile       用 JSON 配置文件指定核对的资源列表：
                    - 含有配置文件（icongenie-*.json）的目录的路径
                        （绝对路径或相对当前目录的路径）                          
                    - 单个 *.json 配置文件的路径。 
                        （绝对路径或相对当前目录的路径）
                    JSON 配置文件的结构：
                      {
                        "params": {
                          "include": [ ... ], /* optional */
                          ...
                        },
                        "assets": [ /* list of custom assets */ ]
                      }

    --help, -h      显示这个帮助信息
```

## 配置文件

Icon Genie 也支持配置文件。它是 JSON 格式，告诉 Icon Genie 要生成哪些图像以及如何生成它们。`profile` 命令是一个辅助性的脚手架工具，可以简单、自动地制作配置文件。

JSON 配置文件的一般形式是：

```json
{
  "params": { },
  "assets": [ ]
}
```

您还可以生成多个配置文件（有不同的参数或设置）。更多信息请访问 [配置文件](/icongenie/profile-files) 页面。

```bash
$ icongenie profile -h

  描述
    一个辅助命令，方便地制作 Icon Genie 配置文件。

  用法
    $ icongenie profile -o <filename> [options]

    # 提供参数列表
    $ icongenie profile -o <filename> --include pwa,spa --quality 7

    # 根据 Icon Genie 的内部列表提供资源
    $ icongenie profile -o <filename> --assets spa,bex

  选项
    --output, -o          新的 Icon Genie 配置文件的名称。

    --assets, -a          根据指定的 Quasar 模式，预填充 Icon Genie 内部的资源列表。
                          可选：
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          可以多选，用“,”分隔：
                            spa,cordova

    --icon, -i            图标源文件的路径；必须是：
                            - 一个 .png 文件
                            - 最小分辨率： 64x64 像素（越高越好！）
                            - 透明背景
                          最好的正方形的图片（宽高相等）
                          图片会自动裁剪：
                            （见 “skip-trim”和“padding”参数）
                          路径可以是绝对路径，
                            也可以是相对于 Quasar 根目录的相对路径
                          推荐的最小尺寸：1024x1024 像素

    --background, -b      可选。背景源文件的路径（启动画面用的背景）；
                          必须是：
                            - 一个 .png 文件
                            - 最小分辨率：128x128 像素（越高越好！）
                            - 图片是透明背景的，这点不强求。
                             （但若设置了 splashscreen-color 参数，
                               推荐使用透明背景）
                          路径可以是绝对路径或相对Quasar工程根目录的路径。
                          推荐的最小尺寸：1024x1024 像素

    --include             预填充 params.include 参数；
                            [all|spa|pwa|ssr|bex|cordova|capacitor|electron]
                          可以多选，用“,”分隔：
                            spa,cordova

    --filter, -f          预填充 params.filter 参数；
                            [png|ico|icns|splashscreen|svg]

    --quality             预填充 params.quality 参数；
                          图片的压缩品质 [1 - 12] （默认： 5）
                            - 高品质 --> 体积大且创建慢
                            - 低品质 --> 体积小且创建快

    --skip-trim           不要裁剪图标源文件。

    --padding             裁剪后，添加边距空白；
                          语法： <水平: number>,<竖直: number>
                          默认： 0,0
                          例子: "--padding 10,5" 指距离顶部和底部空出 10 像素 
                            距离左侧和右侧空出 5 像素。

    --theme-color         预填充 params.themeColor 参数；
                          如果某个具体的生成器单独设置了主题色，单独的颜色会覆盖这个主题色。；
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号
                          不允许透明。
                          例子：1976D2, eee

    --svg-color           预填充 params.svgColor 参数；
                          单色 SVG 图片的颜色。
                          默认值（且没有设置 theme-color）：1976D2
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号
                          不允许透明。
                          例子： 1976D2, eee

    --png-color           预填充 params.pngColor 参数；
                          当资源定义了“background: true”时，PNG 生成器用到的背景色。
                          
                            （像 cordova/capacitor iOS 图标）；
                          默认值（且没有设置 theme-color）： fff
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号
                          不允许透明。
                          例子： 1976D2, eee

    --splashscreen-color  预填充 params.splashscreenColor 参数；
                          启动画面生成器用的背景色；
                          默认值（且没有设置 theme-color）：fff
                          必须是 hex 格式（不是 hexa），不需要前缀的 # 符号。
                          不允许透明。
                          例子： 1976D2, eee

    --splashscreen-icon-ratio  预填充 params.splashscreenIconRatio 参数；
                               启动画面上的图标大小相比于
                                 宽度与高度的比率（取较小者）。
                               
                               值是百分数；有效数字：0 - 100
                               如果为0，则不添加背景顶部的图标
                               默认: 40
```
