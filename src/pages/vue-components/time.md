---
title: QTime
desc: QTime 组件提供了输入时间的方法。
keys: QTime
related:
  - /vue-components/date
  - /quasar-utils/date-utils
  - /vue-components/field
---

QTime 组件提供了输入时间的方法。

::: tip
有关处理日期和/或时间，也可以查看 [Quasar 日期实用程序](/quasar-utils/date-utils)。
:::

## QTime API

<doc-api file="QTime" />

## 用法

请注意,该 model 是一个字符串。

### 基础

<doc-example title="基础" file="QTime/Basic" overflow />

<doc-example title="横屏" file="QTime/Landscape" overflow />

::: tip
对于横向模式，您可以将其与 `$q.screen` 一起使用。以使 QTime 变成响应式的。示例：`:landscape="$q.screen.gt.xs"`。更多信息：[Quasar Screen Plugin](/options/screen-plugin)。
:::

### 功能

24 小时格式的应用取决于您设置的 [Quasar 语言包](/options/quasar-language-packs)，但您也可以强制使用，如下面的示例所示。

<doc-example title="24小时格式" file="QTime/Format24h" overflow />

单击 "Now" 按钮将时间设置为当前用户时间：

<doc-example title="Now button" file="QTime/NowBtn" overflow />

<doc-example title="禁用和只读" file="QTime/DisableReadonly" overflow />

### Model 掩码
默认的 model 数据掩码是 `HH:mm`（设置了`with-seconds` 的话为 `HH:mm:ss`），然而您也可以使用自定义掩码。

`mask` 可以在 [Quasar Utils > Date utils](/quasar-utils/date-utils#format-for-display) 页面中找到。

::: warning SSR 的注意事项
在掩码中使用 `x` 或 `X`（时间戳）可能会在客户端上造成水合错误，因为解码 model 字符串必须使用考虑到本地时区的 `new Date()` 完成。因此，如果服务器与客户端处于不同的时区，则服务器的渲染输出将与客户端的不同，因此水合将失败。
:::

::: danger 波斯日历的注意事项
使用波斯日历时，QTime 的掩码强制为 `HH:mm` 或 `HH:mm:ss`（如果指定了 `with-seconds`）。
:::

<doc-example title="简单的掩码" file="QTime/MaskSimple" overflow />

如果您想在掩码中插入字符串（包括`[`和 `]` 字符），请确保用`[` 和 `]`将其转义，否则这些字符可能会被解释为格式标记。

<doc-example title="带有转义字符的掩码" file="QTime/MaskEscape" overflow />

使用掩码将 [QDate](/vue-components/date) 和 QTime 连接到同一模型：

<doc-example title="QDate 和 QTime 使用同一个 model" file="QTime/MaskDateTime" overflow />

### 自定义特殊语言环境

如果出于某种原因，您需要使用自定义的特殊语言环境，而不是已设置的当前 Quasar 语言包，您可以使用 `locale` 属性：


<doc-example title="自定义特殊语言环境" file="QTime/CustomLocale" overflow />

### 着色

<doc-example title="着色" file="QTime/Color" overflow />

<doc-example title="黑色" file="QTime/Dark" overflow dark />

### 限制选项

* 您可以使用 `hour-options`，`minute-options` 和 `second-options` 属性将用户选择限制在特定时间。
* 或者，为了更深入地限制选项，您还可以为使用 `options-fn` 提供一个函数（下面的第二个示例）。

<doc-example title="选项" file="QTime/Options" overflow />

### 搭配 QInput

<doc-example title="Input" file="QTime/Input" overflow />

在 QInput 上用相同的模型连接 QDate 和 QTime:

<doc-example title="QDate and QTime with QInput" file="QTime/InputFull" overflow />

这里有一些可以用在 QInput 的 `mask` 和 `rules` 中的工具。为了方便起见，您可以使用它们，也可以编写指定[自定义需求的字符串](/vue-components/input#mask)。

* `mask`  属性：[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6).
* `rules` 属性： [完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js).

例如： "date", "time", "fulltime".

更多信息： [QInput](/vue-components/input).

### 附加在按钮上

您可以使用默认插槽附加在按钮上：

<doc-example title="附加在按钮上" file="QTime/AdditionalButtons" overflow />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QTime 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="Native form" file="QTime/NativeForm" />
