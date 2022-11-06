---
title: 输入框
desc:  QInput Vue 组件用于收集用户输入的文本或数字。
keys: QInput
---

QInput 组件用于收集用户输入的文本或数字。它可以像普通的 input 一样使用 `v-model`。还支持错误验证，并具有多种样式，颜色和类型。

## QInput API

<doc-api file="QInput" />

## 外观设计

::: warning
您只能给 QInput 使用一种主要的外观设计款式（`filled`, `outlined`, `standout`, `borderless`），不能使用多个，因为它们是互相排斥的。
:::

<doc-example title="外观设计预览" file="QInput/DesignOverview" />

### 着色

<doc-example title="着色" file="QInput/Coloring" />

### Standard-标准
<doc-example title="标准" file="QInput/DesignStandard" />

### Filled-填充
<doc-example title="填充" file="QInput/DesignFilled" />

### Outlined-轮廓
<doc-example title="轮廓" file="QInput/DesignOutlined" />

### Standout-突出
<doc-example title="突出" file="QInput/DesignStandout" />

其中一个很合适的的用例就是将 Standout 模式的 QInput 用在 QToolbar 中：

<doc-example title="Standout in QToolbar" file="QInput/StandoutToolbar" />

### Borderless-无边框

无边框（`borderless`）设计允许您无缝地将 QInput 集成到其他组件中，而无需 QInput 在其周围绘制边框或更改其背景颜色：

<doc-example title="无边框" file="QInput/Borderless" />

### 圆形边框

圆形（`rounded`）属性只能与填充，轮廓和突出的设计（Filled, Outlined 和 Standout ）一起工作，如下面的例子所示:

<doc-example title="圆形" file="QInput/Rounded" />

### 方形边框

方形（`square `）属性只能与填充，轮廓和突出的设计（Filled, Outlined 和 Standout ）一起工作，如下面的例子所示:

<doc-example title="方形边框" file="QInput/SquareBorders" />

### 黑色背景

<doc-example title="黑色背景" file="QInput/Dark" dark />

## 基础特性

### 原生属性

所有给 QInput 设置的属性，如果未在 **API** 卡片中的 `props` 部分列出，那么它将会被传递给底层的原生标签（`input` 或 `textarea`）。例如： autocomplete，placeholder。

有关更多原生属性的信息，请参考：

* [input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
* [textarea](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)

### 可清除的

作为辅助，您可以使用 `clearable` 属性，这样用户可以通过附加的图标将数据重置为 `null`。下面第二个示例等价于使用 `clearable`

::: warning
如果 `v-model` 使用了修饰符，例如 `.trim`，那么 `clearable` 无法工作，因为 Vue 不会处理 `null` 值。
:::

<doc-example title="可清除的" file="QInput/Clearable" />

### 输入类型
下面示例中的 QInputs 都使用了 `type` 属性，以实现与原生等效的 `<input type="...">`。

::: warning
对某些输入类型的支持是浏览器提供的，而不在 Quasar 的核心代码中。
:::

<doc-example title="输入类型" file="QInput/InputTypes" />

::: tip
某些输入类型（如 `date` 或 `time`）总是呈现某些控件，因此如果使用 `label`，则可能需要将其与 `stack-label` 一起设置，否则标签将与原生浏览器控件重叠。
:::

#### 输入数字类型

您可以使用 `v-model.number` （注意 `number` 修饰符）以及 `type="number"` 属性：

<doc-example title="输入数字类型" file="QInput/InputTypeNumber" />

#### 输入文件类型

::: tip 替代选择
**推荐您使用 [QFile](/vue-components/file-picker)，甚至是 [QUploader](/vue-components/uploader) 来收集文件，而不是使用 `type="file"` 的 QInput**。但是，如果您仍希望使用QInput，请阅读以下警告
:::

::: warning
当设置 QInput 的 `type="file"`时，请勿使用 `v-model`。浏览器安全策略不允许将值设置为此类输入。因此，您只能读取它（附加一个 `@update:model-value` 事件），而不能写入它。
:::

<doc-example title="输入文件类型" file="QInput/InputTypeFile" />

### 文本域

<doc-example title="Textarea" file="QInput/Textarea" />

当您需要 QInput 与其内容一起增长时，请使用如下示例中的 `autogrow` 属性：

<doc-example title="自动增长" file="QInput/Autogrow" />

### 前缀和后缀

<doc-example title="前缀和后缀" file="QInput/PrefixSuffix" />

### 自定义标签

使用 `label` 插槽可以自定义标签或使用 `QTooltip` 添加特殊功能。

::: tip
不要忘记设置  `label-slot` 属性。

如果要与标签（QTooltip）的内容交互，请在插槽中的元素上添加`all-pointer-events` CSS 类。
:::

<doc-example title="自定义 label" file="QInput/CustomLabel" />

### 阴影文本

<doc-example title="阴影文本" file="QInput/ShadowText" />

### 插槽中使用 "submit" 类型的 QBtn

::: warning
当将类型为 "submit" 的 QBtn 放置在 QField、QInput 或 QSelect 的 "before"、"after" 、"prepend"  或 "append"  插槽中时，您还应该在有问题的 QBtn 上添加 `@click` 事件。该事件应调用提交表单的方法。此类插槽中的所有点击事件均不会传播到其父元素。
:::

### 防抖模式

当你监听被绑定的数据的变化并对其进行昂贵的操作时，防抖的作用就体现出来了。我们一般希望先让用户完成整个输入之后再触发数据更新，而不是在每次按键时都更新数据。

<doc-example title="防抖模式" file="QInput/Debouncing" />

### 加载状态

<doc-example title="加载状态" file="QInput/LoadingState" />

## 掩码

您可以通过 `mask` 属性强制/辅助用户输入一个特定格式的文本

::: warning
掩码只在  `type` 为 'text'（默认）、 'search'、 'url'、 'tel'、 或 'password' 其中之一时才能使用。'password'.
:::

下面是掩码符号：

| 符号 | 说明 |
| --- | --- |
| `#` | 数字 |
| `S` | 字母，a 到 z，不区分大小写 |
| `N` | 字母数字，字母不区分大小写 |
| `A` | 字母，转换为大写 |
| `a` | 字母，转换为小写 |
| `X` | 字母数字，字母转换为大写 |
| `x` | 字母数字，字母转换为小写 |

这里有一组可用在  QInput `mask` 属性中的[工具](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/input/use-mask.js#L6)。 为了方便起见，可以直接使用它们（例如：“phone”、“card”）或写出您的自定义需求的字符串。

<doc-example title="基础" file="QInput/MaskBasic" />

<doc-example title="填充掩码" file="QInput/MaskFill" />

如果要强制用户输入特定格式，但希望数据中又只包含原始值（不包含掩码符号和分隔符），则  `unmasked-value` 很有用：

<doc-example title="Unmasked model" file="QInput/MaskUnmaskedModel" />

如果要强制用户从末端填充掩码并允许非固定长度的输入，则 `reverse-fill-mask` 很有用：

<doc-example title="反向填充掩码" file="QInput/MaskFillReverse" />

### 使用第三方掩码处理器

通过对 QInput 进行一些小调整，您可以轻松使用任何第三方掩码处理器。

从这样的 QInput 开始：

```html
<q-input
  filled
  v-model="price"
  label="Price with 2 decimals"
  mask="#.##"
  fill-mask="#"
  reverse-fill-mask
  hint="Mask: #.00"
  input-class="text-right"
/>
```
您可以使用 v-money 指令：

```html
<q-field
  filled
  v-model="price"
  label="Price with v-money directive"
  hint="Mask: $ #,###.00 #"
>
  <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
    <input :id="id" class="q-field__input text-right" :value="modelValue" @change="e => emitValue(e.target.value)" v-money="moneyFormatForDirective" v-show="floatingLabel">
  </template>
</q-field>
```

```javascript
moneyFormatForDirective: {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  masked: false /* 不能与指令一起工作 */
}
```

或者您可以使用 money 组件：

```html
<q-field
  filled
  v-model="price"
  label="Price with v-money component"
  hint="Mask: $ #,###.00 #"
>
  <template v-slot:control="{ id, floatingLabel, modelValue, emitValue }">
    <money :id="id" class="q-field__input text-right" :model-value="modelValue" @update:model-value="emitValue" v-bind="moneyFormatForComponent" v-show="floatingLabel" />
  </template>
</q-field>
```

```javascript
moneyFormatForComponent: {
  decimal: '.',
  thousands: ',',
  prefix: '$ ',
  suffix: ' #',
  precision: 2,
  masked: true
}
```

## 验证

### 内部验证

你可以使用 `:rules` 属性来对 QInput 进行验证。声明一个规则数组或自定义的验证器。自定义的验证器应该是一个函数，当验证成功时返回 `true`，验证失败时返回 `String` 类型的错误信息。

::: tip
默认情况下，规则的改变不会触发一次新的验证，直到绑定的数据发生变化。为了在规则改变时触发一次验证，您可以使用 `reactive-rules` 布尔属性，缺点是会降低性能（所以当您真的需要时在使用它），通过使用计算属性作为规则的值（而不是在 vue 模板中内联指定它们），可以稍微减轻这种情况。
:::

一个规则的格式如下：

```js
value => condition || errorMessage
 ```
示例：
 ```js
value => value.includes('Hello') || 'Field must contain word Hello'
```

您可以通过调用 QInput 的 `resetValidation()` 方法来重置验证。

这里有一组可用在  QInput `rules` 属性中的[工具](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js)。 为了方便起见，可以直接使用它们（例如： "date", "time", "hexColor", "rgbOrRgbaColor", "anyColor"）或写出您的自定义需求的字符串。


<doc-example title="基础" file="QInput/ValidationRequired" />

<doc-example title="最大长度" file="QInput/ValidationMaxLength" />

如果您设置了 `lazy-rules`，验证会在第一次失去焦点后才会开始。如果将 `lazy-rules` 设置为 `ondemand` 字符串，那么验证只有在手动调用了 QInput 组件的 validate() 方法之后才会触发，或者是包裹它的 QForm 触发了提交事件。

<doc-example title="Lazy rules" file="QInput/ValidationLazy" />

<doc-example title="表单验证" file="QInput/ValidationForm" />

#### 异步规则
通过使用 async/await 或直接返回一个 Promise，规则也可以是异步的。

::: tip
考虑将异步规则与 `debounce` 属性相结合，以避免在每次按键时立即调用异步规则，这可能会影响性能。
:::

<doc-example title="异步规则" file="QInput/ValidationAsync" />

### 外部验证

您还可以使用外部验证，并且只传递 `error`  和 `error-message`（启用 `bottom-slots` 插槽以显示此错误消息）。

::: tip
根据您的需求，您可能需要 [Vuelidate](https://vuelidate.netlify.com/)（我们推荐的方法）或者别的验证库连接到 QInput。
:::

<doc-example title="外部" file="QInput/ValidationExternal" />

您还可以为错误消息自定义插槽：

<doc-example title="错误消息插槽" file="QInput/ValidationSlots" />

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QInput 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QInput/NativeForm" />
