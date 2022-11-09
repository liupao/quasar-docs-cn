---
title: QDate
desc: QDate 组件提供了一种输入日期的方法。目前它支持公历（默认）和波斯历。
keys: QDate
related:
  - /vue-components/time
  - /quasar-utils/date-utils
  - /vue-components/field
---

QDate 组件提供了一种输入日期的方法。目前它支持公历（默认）和波斯历。

::: tip
有关处理日期和/或时间，也可以查看 [Quasar 日期实用程序](/quasar-utils/date-utils)。
:::

## QDate API

<doc-api file="QDate" />

## 用法

::: warning
请注意,实际的日期 model 全都是一个字符串。
:::

### 基础

<doc-example title="Basic" file="QDate/Basic" overflow />

::: tip
对于横向模式，您可以将其与 `$q.screen` 一起使用。以使 QDate 变成响应式的。示例：`:landscape="$q.screen.gt.xs"`。更多信息：[Quasar Screen Plugin](/options/screen-plugin)。
:::

<doc-example title="横屏" file="QDate/Landscape" overflow />

### 多选

请注意，下面的 model 是一个数组，我们指定了 "multiple" 属性。

点击一个已经选择的日期将会取消选择它。

<doc-example title="选择多个日期" file="QDate/SelectionMultiple" overflow />

### 范围选择

请注意，在下面的示例中，model 是对象（单选）或对象数组（多选）。

::: tip TIPS
* 点击一个已经选择的日期将会取消选择它。
* 还可以通过  `setEditingRange`  方法编程设置用户当前的编辑范围（见 API 部分）。
* 对于当前的编辑范围，有两个有用的事件: `range-start` 和 `range-end`（见 API 部分）。
:::

::: warning
`range` 属性仅与 `options` 属性部分兼容：选定的范围可能还包括 "unselectable" （不可选择）的日期。
:::

<doc-example title="单选范围" file="QDate/SelectionRange" overflow />

<doc-example title="多选范围" file="QDate/SelectionRangeMultiple" overflow />

### 自定义标题和副标题

当不处于 'minimal' 模式时，QDate 有一个标题和副标题。您可以覆盖它，如下面的示例所示。

单击标题时，QDate 的视图将更改为日历，单击副标题时，视图将切换为年份选择。

<doc-example title="自定义标题和副标题" file="QDate/CustomTitleSubtitle" overflow />

### 功能

当 model 模型数据为空时（如 `null`, `void 0`/`undefined`）时，QDate 仍然必须显示一年中某个月份的日历。您可以使用 `default-year-month` 属性来设置默认年月，否则当前的月份将显示:

<doc-example title="默认年月" file="QDate/DefaultYearMonth" overflow />

默认视图可以改变。

<doc-example title="默认视图" file="QDate/DefaultView" overflow />

每周第一天的设置取决于您设置的 [Quasar 语言包](/options/quasar-language-packs)，但您也可以强制指定它，如下面的示例所示。

<doc-example title="每周第一天" file="QDate/FirstDayOfWeek" overflow />
、
单击 "Today" 按钮将日期设置为当前用户日期。需要标头，因此不能将其与 "minimal" 模式一起使用：

<doc-example title="Today button" file="QDate/TodayBtn" overflow />

<doc-example title="禁用和只读" file="QDate/DisableReadonly" overflow />

### Model 掩码

默认的 model 数据掩码是 `YYYY/MM/DD`，然而您也可以使用自定义掩码。

`mask` 可以在 [Quasar Utils > Date utils](/quasar-utils/date-utils#format-for-display) 页面中找到。

::: warning SSR 的注意事项
在掩码中使用 `x` 或 `X`（时间戳）可能会在客户端上造成水合错误，因为解码 model 字符串必须使用考虑到本地时区的 `new Date()` 完成。因此，如果服务器与客户端处于不同的时区，则服务器的渲染输出将与客户端的不同，因此水合将失败。
:::

::: danger 波斯日历的注意事项
使用波斯日历时，QTime 的掩码强制为 `YYYY/MM/DD`。
:::


<doc-example title="简单的掩码" file="QDate/MaskSimple" overflow />

如果您想在掩码中插入字符串（包括`[`和 `]` 字符），请确保用`[` 和 `]`将其转义，否则这些字符可能会被解释为格式标记。

<doc-example title="带有转义字符的掩码" file="QDate/MaskEscape" overflow />

使用掩码将 QDate 和 [QTime](/vue-components/time) 连接到同一模型：

<doc-example title="QDate 和 QTime 使用同一个 model" file="QDate/MaskDateTime" overflow />

::: tip
如果希望以编程方式设置  QDate 的值，只需重新分配传递的值即可。但是，更新的值需要是一个与您的掩码格式相同的字符串。如，如果您的掩码为 `'dddd, MMM D, YYYY'`，那么设置值为 `'2019/04/28'` 不会生效，需要使用 `'Sunday, Apr 28, 2019'` 代替。
:::

### 自定义特殊语言环境

如果出于某种原因，您需要使用自定义的特殊语言环境，而不是已设置的当前 Quasar 语言包，您可以使用 `locale` 属性：

<doc-example title="自定义特殊语言环境" file="QDate/CustomLocale" overflow />

### 着色

<doc-example title="着色" file="QDate/Color" overflow />

<doc-example title="黑色" file="QDate/Dark" overflow dark />

### 高亮突出某些日期事件

第一个示例使用数组，第二个示例使用函数。

<doc-example title="事件" file="QDate/Events" overflow />

<doc-example title="事件颜色" file="QDate/EventColor" overflow />

### 限制选项

* 您可以使用 `options` 属性将用户选择限制在特定时间。
* 或者，为了更深入地限制选项，您还可以为使用 `options-fn` 提供一个函数（下面的第二个示例）。

::: warning
`options` 属性仅与 `range` 属性部分兼容：选定的范围可能还包括 "unselectable" （不可选择）的日期。
:::

<doc-example title="Options" file="QDate/Options" overflow />

### 设置导航界限

在下面的示例中，导航限制在 2020/07 和 2020/09 之间。

<doc-example title="导航界限" file="QDate/NavigationBoundaries" overflow />

### 附加在按钮上

您可以使用默认插槽附加在按钮上：

<doc-example title="附加在按钮上" file="QDate/AdditionalButtons" overflow />

### 搭配 QSplitter 和 QTabPanels

<doc-example title="搭配 QSplitter 和 QTabPanels" file="QDate/Splitter" />

更多信息： [QSplitter](/vue-components/splitter), [QTabPanels](/vue-components/tab-panels).

### 搭配 QInput

<doc-example title="With QInput" file="QDate/Input" />

在 QInput 上用相同的模型连接 QDate 和 QTime:

<doc-example title="QDate and QTime with QInput" file="QDate/InputFull" overflow />

这里有一些可以用在 QInput 的 `mask` 和 `rules` 中的工具。为了方便起见，您可以使用它们，也可以编写指定[自定义需求的字符串](/vue-components/input#mask)。

* `mask`  属性：[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6).
* `rules` 属性： [完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js).

例如： "date", "time", "fulltime".

更多信息： [QInput](/vue-components/input).

### 波斯日历
::: tip
您可以将其与诸如波斯语（波斯语，fair）之类的[Quasar 语言包](/options/quasar-language-packs)相结合，以便将 QDate 的字符串翻译，提供完整的体验。
:::

::: warning
当使用波斯日历时，掩码会被强制设置为：`YYYY/MM/DD`。
:::

<q-btn href="https://codepen.io/rstoenescu/pen/MWKpbNa" target="_blank" label="查看示例" icon-right="launch" color="brand-primary" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QDate 声明 `name` 属性，否则表单数据中不会包含它：


<doc-example title="Native form" file="QDate/NativeForm" />
