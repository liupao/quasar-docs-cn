---
title: 时间工具
desc: Quasar 提供了一组有用的函数，不需要额外安装高昂成本的第三方库就可以在大多数使用情况下轻松地操作 JS 中的 Date。
keys: formatDate,buildDate,isValid,addToDate,subtractFromDate,adjustDate,getMinDate,getMaxDate,isBetweenDates,getBetweenDates,isSameDate,getDateDiff,getWeekOfYear,getDayOfYear,getDayOfWeek,daysInMonth,startOfDate,endOfDate,inferDateFormat,clone,extractDate
---

Quasar 提供了一组有用的函数，可以在大多数使用情况下轻松地操作 JS 中的 Date，而无需再额外安装像 Momentjs 这种专用的库。

大多数 的 Quasar 时间函数都需要传入一个可以被原生 JS [Date 构造函数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)解析的 Unix 时间戳或者字符串作为参数。例如： `1497159857411`, `Sun Jun 11 2017 08:44:42 GMT+0300`, `2017-06-16`.

返回值都是 JS  Date 对象。

熟悉 JS 原生 Date 类，它非常强大，请记住，您不需要诸如 Momentjs 之类的解决方案，这些解决方案会使您的构建产物增加数百 KB 的大小。

::: tip
除了 UMD 版本外，Quasar 的时间函数都是可以 tree shaking （树摇）的
:::

下面所有的示例都从 Quasar 中导入了 `date` 对象。然而，如果您只需要其中的一个函数，您可以使用 ES6 的解构来帮助更好的 Tree Shaking (树摇)，使其只留下一个函数，而不是全部的 `date`。

以 `addToDate()` 为例：

```js
// 我们先导入所有的 `date`
import { date } from 'quasar'
//  解构只保留一个所需要的函数
const { addToDate } = date

const newDate = addToDate(new Date(), { days: 7, months: 1 })
```

::: tip
有关 UMD 构建的用法，请参阅[此处](/start/umd#quasar-global-object)。
:::

## 显示格式化日期

它接受一个格式字符串，并将传入的日期转化成对应的格式：

```js
import { date } from 'quasar'

const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
```

当使用 i18n 时，您还可以使用第三个参数：

```js
const formattedString = date.formatDate(timeStamp, 'MMMM - dddd', {
  days: ['Duminica', 'Luni', /* 以及剩下的所有的天，请记住从周日开始 */],
  daysShort: ['Dum', 'Lun', /* 以及剩下的所有的天，请记住从周日开始 */],
  months: ['Ianuarie', 'Februarie', /* 以及剩下的所有的月份 */],
  monthsShort: ['Ian', 'Feb', /* 以及剩下的所有的月份 */]
})
```

可用的格式：

| 单位 | 可用的格式： |
| --- | --- |
| Year | <ul><li>**YY**: 70 71 ... 29 30</li><li>**YYYY**: 1970 1971 ... 2029 2030</li></ul> |
| Month | <ul><li>**M**: 1 2 ... 11 12</li><li>**MM**: 01 02 ... 11 12</li><li>**MMM**: Jan Feb ... Nov Dec</li><li>**MMMM**: January February ... November December</li></ul> |
| Quarter | <ul><li>**Q**: Quarter number 1 2 3 4</li><li>**Qo**: Quarter number 1st 2nd 3rd 4th</li></ul> |
| Day of Month | <ul><li>**D**: 1 2 ... 30 31</li><li>**Do**: 1st 2nd ... 30th 31st</li><li>**DD**: 01 02 ... 30 31</li></ul> |
| Day of Year | <ul><li>**DDD**: 1 2 ... 364 365</li><li>**DDDD**: 001 002 ... 364 365</li></ul> |
| Day of Week | <ul><li>**d**: 0 1 ... 5 6</li><li>**dd**: Su Mo ... Fr Sa</li><li>**ddd**: Sun Mon ... Fri Sat</li><li>**dddd**: Sunday Monday ... Friday Saturday</li></ul> |
| Day of Week (ISO) | <ul><li>**E**: 1 2 ... 6 7</li></ul> |
| Week of Year | <ul><li>**w**: 1 2 ... 52 53</li><li>**ww**: 01 02 ... 52 53</li></ul> |
| Hour | <ul><li>**H**: 0 1 ... 22 23</li><li>**HH**: 00 01 ... 22 23</li><li>**h**: 0 ... 11 12</li><li>**hh**: 01 02 ... 11 12</li></ul> |
| Minute | <ul><li>**m**: 0 1 ... 58 59</li><li>**mm**: 00 01 ... 58 59</li></ul> |
| Second | <ul><li>**s**: 0 1 ... 58 59</li><li>**ss**: 00 01 ... 58 59</li></ul> |
| Fractional Second | <ul><li>**S**: 0 1 ... 8 9</li><li>**SS**: 00 01 ... 98 99</li><li>**SSS**: 000 001 ... 998 999</li></ul> |
| Timezone offset | <ul><li>**Z**: -07:00 -06:00 ... +06:00 +07:00</li><li>**ZZ**: -0700 -0600 ... +0600 +0700</li></ul> |
| AM/PM | <ul><li>**A**: AM, PM</li><li>**a**: am, pm</li><li>**aa**: a.m, p.m</li></ul> |
| Unix Timestamp | <ul><li>**X**: 1360013296</li><li>**x** (ms): 1360013296123</li></ul> |

如果您希望在掩码之中插入一些字符串(包括 `[` 和 `]` 字符)，请确保使用 `[` and `]` 包裹它们来转译，否则它们会被解析成格式编码中的一部分。

## 操作日期

### 创建

**尝试使用原生的 JS Date 类创建日期**，例如：

```js
const date = new Date();
```
下面的方法只是一个封装，可以帮助您构建一个基于当前时间日期，但是可以修改其中的年，月，或者秒等等。

```js
import { date } from 'quasar'

const newDate = date.buildDate({ year: 2010, date: 5, hours: 15, milliseconds: 123 })
```

您还可以传入第二个参数(一个布尔值)来设置是否使用 UTC 时间 (`true`) 代替本地时间。

其中的对象可以包含以下字段（都是可选的）：

| 字段 | 描述 |
| --- | --- |
| `millisecond(s)` | 日期/时间中的 **豪秒** 部分  |
| `second(s)` | 日期/时间中的 **秒** 部分 |
| `minute(s)` | 日期/时间中的 **分** 部分 |
| `hour(s)` | 日期/时间中的 **时** 部分 |
| `day(s)`/`date` | 日期/时间中的 **天** 部分 |
| `month(s)` | 日期/时间中的 **月** 部分 |
| `year(s)` | 日期/时间中的 **年** 部分 |

### 验证

检查一个日期是否合法：

```js
import { date } from 'quasar'

const dateString = 'Wed, 09 Aug 1995 00:00:00 GMT'

if (date.isValid(dateString)) {
  // Do something with date string
}
```

### 加/减
在日期使用中加/减一段时间:

```js
import { date } from 'quasar'

let newDate = new Date(2017, 2, 7)

newDate = date.addToDate(newDate, { days: 7, months: 1 })
// `newDate` 现在为 2017-3-14 00:00:00

newDate = date.subtractFromDate(newDate, { hours: 24, milliseconds: 10000 })
// `newDate` 现在为 2017-3-12 23:59:50
```

其中的对象可以包含一下字段（都是可选的）：

| 字段 | 描述 |
| --- | --- |
| `millisecond(s)` | 以**毫秒**为单位的一段时间 |
| `second(s)` | 以**秒**为单位的一段时间 |
| `minute(s)` | 以**分**为单位的一段时间 |
| `hour(s)` | 以**时**为单位的一段时间 |
| `day(s)`/`date` | 以**天**为单位的一段时间 |
| `month(s)` | 以**月**为单位的一段时间 |
| `year(s)` | 以**年**为单位的一段时间 |

### 设置日期/时间

使用指定单位设置日期/时间

```js
import { date } from 'quasar'

const newDate = new Date(2017, 10, 2)
const adjustedDate = date.adjustDate(newDate, { year: 2010, month: 2 })
// `adjustedDate` 变成 2010-2-2
```

您还可以传入第三个参数(一个布尔值)来设置是否使用 UTC 时间 (`true`) 代替本地时间。

其中的对象可以包含以下字段（都是可选的）：

| 字段 | 描述 |
| --- | --- |
| `millisecond(s)` | 日期/时间中的 **豪秒** 部分  |
| `second(s)` | 日期/时间中的 **秒** 部分 |
| `minute(s)` | 日期/时间中的 **分** 部分 |
| `hour(s)` | 日期/时间中的 **时** 部分 |
| `day(s)`/`date` | 日期/时间中的 **天** 部分 |
| `month(s)` | 日期/时间中的 **月** 部分 |
| `year(s)` | 日期/时间中的 **年** 部分 |、

## 查询日期

### 最大/小值
从一组日期中获取最大/小的日期：

```js
import { date } from 'quasar'

let min = date.getMinDate(new Date(2017, 6, 24), new Date(2017, 5, 20), new Date(2017, 6, 26))
// `min` 为 2017-5-20
let max = date.getMaxDate(new Date(2017, 6, 24), new Date(2017, 5, 20), new Date(2017, 6, 26))
// `max` 为 2017-6-26

// 或者使用一个数组：
const dates = [ new Date(2017, 6, 24), new Date(2017, 5, 20), new Date(2017, 6, 26) ]
let min = date.getMinDate(...dates) // `min` 为 2017-5-20
let max = date.getMaxDate(...dates) // `max` 为 2017-6-26
```

注意返回值是一个时间戳。

```js
console.log(max) // 1497906000000
console.log(new Date(max)) // Wed Jul 26 2017 00:00:00 GMT+0300 (Eastern European Summer Time)
```

### 时间范围

查询日期是否在指定的日期/时间范围内：

```js
import { date } from 'quasar'

const dateTarget = new Date()
const dateFrom = new Date()
const dateTo = new Date()

// **严格地** (即唯一范围)
if (date.isBetweenDates(dateTarget, dateFrom, dateTo)) {
  // Do something with dateTarget
}

// 包含您想要的边界
if (date.isBetweenDates(dateTarget, dateFrom, dateTo, { inclusiveFrom: true, inclusiveTo: true })) {
  // Do something with dateTarget
}

// 如果您在比较时只关心日期中的年月日，不关心时间
// 那么您可以使用 onlyDate: true
if (date.isBetweenDates(dateTarget, dateFrom, dateTo, { onlyDate: true })) {
  // Do something with dateTarget
}
```
使用指定的日期/时间范围规范化一个日期：

```js
import { date } from 'quasar'

const newDate = new Date()
const dateMin = new Date(2010, 2, 23)
const dateMax = new Date(2012, 4, 12)
const dateNormalized = date.getDateBetween(newDate, dateMin, dateMax)
// 如果 newDate 在 2010-2-23 和 2012-4-12 范围内，则返回 newDate
// 如果 newDate 小于 dateMin，则返回 dateMin
// 如果 newDate 大于 dateMax，则返回 dateMax
```

### 判断相等

使用指定单位判断两个日期是否**相等**：

```js
import { date } from 'quasar'

const date1 = new Date(2017, 2, 5)
const date2 = new Date(2017, 3, 8)
const unit = 'year'

if (date.isSameDate(date1, date2, /* 可选的 */ unit)) {
  // true 因为传入的单位是年，而两个日期的年份相等
}
```
单位参数可以省略，此时将进行完整的日期/时间比较，否则执行部分比较：

| 单位 | 描述 |
| --- | --- |
| `second(s)` | 只比较**秒**是否相等  |
| `minute(s)` | 只比较**分**是否相等  |
| `hour(s)` | 只比较**时**是否相等  |
| `day(s)`/`date` | 只比较**天**是否相等  |
| `month(s)` | 只比较**月**是否相等  |
| `year(s)` | 只比较**年**是否相等  |

### 查询时间差

计算两个日期之间的时间差：

```js
import { date } from 'quasar'

const date1 = new Date(2017, 4, 12)
const date2 = new Date(2017, 3, 8)
const unit = 'days'

const diff = date.getDateDiff(date1, date2, unit)
// `diff` 是 34 (days)
```

单位参数表示计量单位，如果没有指定，则默认为 `days`:


| 单位 | 描述 |
| --- | --- |
| `second(s)` | 相差多少秒（忽略毫秒部分） |
| `minute(s)` | 相差多少分钟（忽略秒，...部分） |
| `hour(s)` | 相差多少小时（忽略分，秒，...部分） |
| `day(s)`/`date` | 相差多少天 |
| `month(s)` | 相差多少月 |
| `year(s)` | 相差多少年 |

### 日历

从指定的日期中获取 [ISO 标准下一年中的第几周](https://en.wikipedia.org/wiki/ISO_week_date):

```js
import { date } from 'quasar'

const newDate = new Date(2017, 0, 4)
const week = date.getWeekOfYear(newDate) // `week` 为 1
```
从给定的日期中获取一年之中的第几天：

```js
import { date } from 'quasar'

const newDate = new Date(2017, 1, 4)
const day = date.getDayOfYear(newDate) // `day` 为 35
```

从给定的日期中获取一周之中的第几天：

```js
import { date } from 'quasar'

const newDate = new Date(2017, 1, 9)
const day = date.getDayOfWeek(newDate) // `day` 为 4
```

从给定的日期中获取一月之中的第几天：

```js
import { date } from 'quasar'

const newDate = new Date()
const days = date.daysInMonth(newDate) // e.g. 30
```

### 日期的开始/结束

将原始日期设置为某个单位时间的开始/结束：

```js
import { date } from 'quasar'

let newDate = new Date(2000)
// 设置为 2000 年的开始时间  (January 1st, 2000, 00:00:00.000)
newDate = date.startOfDate(newDate, 'year')
// 设置为 2000 年的结束时间 (December 31st, 2000, 23:59:59.999)
newDate = date.endOfDate(newDate, 'year')
```

第二个参数表示要重置的单位（它的开始/结束）：

| 单位 | 描述 |
| --- | --- |
| `second(s)` | 重置秒 |
| `minute(s)` | 重置分钟 |
| `hour(s)` | 重置小时 |
| `day(s)`/`date` | 重置天 |
| `month(s)` | 重置月 |
| `year(s)` | 重置年 |

## 其他

### 获取格式

```js
import { date } from 'quasar'

date.inferDateFormat(new Date()) // 'date'
date.inferDateFormat(35346363) // 'number'
date.inferDateFormat('Mon Feb 05 2018 23:05:29') // string
```

### 克隆日期

```js
import { date } from 'quasar'

const newDate = new Date()
const clonedDate = date.clone(newDate)

date.addToDate(newDate, { days: 1 })

console.log(newDate.getDate() === clonedDate.getDate()) // false
```

### 提取日期

根据当前 Quasar 语言包设置的语言环境，您可以根据传递的格式将任何字符串解析为日期对象：

```js
import { date } from 'quasar'

// Example 1
const date = date.extractDate('2019-10-29 --- 23:12', 'YYYY-MM-DD --- HH:mm')
// date is a new Date() object

// Example 2
const date = date.extractDate('21/03/1985', 'DD/MM/YYYY')
// date is a new Date() object
```

使用自定义语言环境：

```js
import { date } from 'quasar'

const obj = date.extractDate('Month: Feb, Day: 11th, Year: 2018', '[Month: ]MMM[, Day: ]Do[, Year: ]YYYY', {
  days: ['Duminica', 'Luni', /* 以及剩下的所有的天，记得从周日开始 */],
  daysShort: ['Dum', 'Lun', /* 以及剩下的所有的天，记得从周日开始 */],
  months: ['Ianuarie', 'Februarie', /* 以及剩下所有的月份 */],
  monthsShort: ['Ian', 'Feb', /* 以及剩下所有的月份 */]
})
// date is a new Date() object
```
