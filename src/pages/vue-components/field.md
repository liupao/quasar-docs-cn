---
title: Field
desc: The QField Vue component is used to provide common functionality and aspect to form components.
keys: QField
---

QField 组件提供了表单组件的通用方法，它可以使用 `:model-value` （或者 `v-model`，如果您要使用 `clearable` 的话）来绑定组件内的数据。还支持设置标签，提示信息，错误验证以及一系列的样式和颜色。

QField 允许您在其中展示任意的表单控件（实际上任何内容都可以），只需要将其放在 `control` 插槽中即可。

::: danger
不要再使用 QField 封装 QInput， QFile 或 QSelect，因为它们已经继承了 QField。
:::

## QField API

<doc-api file="QField" />

## Design

::: tip
下面的示例使用简单的文本内容只是为了向您展示 QField 可以使用的外观设计。要查看封装真实组件的示例，请参见“基本功能”部分。
:::

::: danger
QField 不会（也不应该）管理您的 `control` 插槽内容，所以如果您在使用 `label` 属性，那么最好也声明一下`stack-label` 属性，否则，当 QField 未聚焦时，它可能会与您的控件重叠。
:::

### 预览

您只能给 QField 使用一种主要的外观设计款式（`filled`, `outlined`, `standout`, `borderless`），不能使用多个，因为它们是互相排斥的。

<doc-example title="外观设计预览" file="QField/DesignOverview" />

### 着色

<doc-example title="着色" file="QField/Coloring" />

### Standard-标准
<doc-example title="Standard" file="QField/DesignStandard" />

### Filled-填充
<doc-example title="Filled" file="QField/DesignFilled" />

### Outlined-轮廓
<doc-example title="Outlined" file="QField/DesignOutlined" />

### Standout-突出
<doc-example title="Standout" file="QField/DesignStandout" />

其中一个很合适的的用例就是将 Standout 模式的 QField 用在 QToolbar 中：

<doc-example title="Standout in QToolbar" file="QField/StandoutToolbar" />

### Borderless-无边框
无边框（`borderless`）设计允许您无缝地将 QField 集成到其他组件中，而无需 QField 在其周围绘制边框或更改其背景颜色：

<doc-example title="Borderless" file="QField/Borderless" />

### 圆形边框

圆形（`rounded`）属性只能与填充，轮廓和突出的设计（Filled, Outlined 和 Standout ）一起工作，如下面的例子所示:

<doc-example title="Rounded" file="QField/Rounded" />

### 方形边框

方形（`square `）属性只能与填充，轮廓和突出的设计（Filled, Outlined 和 Standout ）一起工作，如下面的例子所示:

<doc-example title="Square borders" file="QField/SquareBorders" />

### 黑色背景

<doc-example title="Dark" file="QField/Dark" dark />

## 基础特性

### 可清除的
作为辅助，您可以使用 `clearable` 属性，这样用户可以通过附加的图标将数据重置为 `null`。下面第二个示例等价于使用 `clearable`

::: warning
如果使用 `clearable` 那么您必须使用 `v-model` 或者监听 `@update:model-value` 事件并更新其值。
:::

<doc-example title="Clearable" file="QField/Clearable" />

### 控件类型
任何您放置在 `control` 插槽中的内容，都会作为 QFiled 组件的内容展示。我们提供了一些示例：

<doc-example title="控件类型" file="QField/ControlTypes" />

::: tip
大部分的表单控件都是可见的，所以如果您在使用 `label` 属性，那么最好也声明一下`stack-label` 属性，否则，当 QField 未聚焦时，它可能会与您的控件重叠。
:::

### 前缀和后缀

<doc-example title="前缀和后缀" file="QField/PrefixSuffix" />

### 自定义标签

使用 `label` 插槽可以自定义标签或使用 `QTooltip` 添加特殊功能。

::: tip
不要忘记设置  `label-slot` 属性。

如果要与标签（QTooltip）的内容交互，请在插槽中的元素上添加`all-pointer-events` CSS 类。
:::

<doc-example title="Custom label" file="QField/CustomLabel" />

### 插槽中使用 "submit" 类型的 QBtn

::: warning
当将类型为 "submit" 的 QBtn 放置在 QField、QInput 或 QSelect 的 "before"、"after" 、"prepend"  或 "append"  插槽中时，您还应该在有问题的 QBtn 上添加 `@click` 事件。该事件应调用提交表单的方法。此类插槽中的所有点击事件均不会传播到其父元素。
:::

### 加载状态
<doc-example title="Loading state" file="QField/LoadingState" />

## 验证

### 内部验证

您可以使用 `:rules` 属性来对 QField 进行验证。声明一个规则数组或自定义的验证器。自定义的验证器应该是一个函数，当验证成功时返回 `true`，验证失败时返回 `String` 类型的错误信息。

::: tip
默认情况下，规则的改变不会触发一次新的验证，直到绑定的数据发生变化。为了在规则改变时触发一次验证，您可以使用 `reactive-rules` 布尔属性，缺点是会降低性能（所以当您真的需要时在使用它），通过使用计算属性作为规则的值（而不是在 vue 模板中内联指定它们），可以稍微减轻这种情况。
:::

一个规则的格式如下：

```js
value => condition || errorMessage
 ```
示例：
 ```js
value => value < 10 || 'Value should be lower'
```

您可以通过调用 QField 的 `resetValidation()` 方法来重置验证。

<doc-example title="基础" file="QField/ValidationRequired" />

<doc-example title="最大长度" file="QField/ValidationMaxValue" />

如果您设置了 `lazy-rules`，验证会在第一次失去焦点后才会开始。如果将 `lazy-rules` 设置为 `ondemand` 字符串，那么验证只有在手动调用了 QField 组件的 validate() 方法之后才会触发，或者是包裹它的 QForm 触发了提交事件。

<doc-example title="Lazy rules" file="QField/ValidationLazy" />

#### 异步规则
通过使用 async/await 或直接返回一个 Promise，规则也可以是异步的。

::: tip
考虑将异步规则与 `debounce` 属性相结合，以避免在每次按键时立即调用异步规则，这可能会影响性能。
:::

<doc-example title="异步规则" file="QField/ValidationAsync" />

### 外部验证

您还可以使用外部验证，并且只传递 `error`  和 `error-message`（启用 `bottom-slots` 插槽以显示此错误消息）。

::: tip
根据您的需求，您可能需要 [Vuelidate](https://vuelidate.netlify.com/)（我们推荐的方法）或者别的验证库连接到 QField。
:::


<doc-example title="External" file="QField/ValidationExternal" />

您还可以为错误消息自定义插槽：

<doc-example title="Slot for error message" file="QField/ValidationSlots" />
