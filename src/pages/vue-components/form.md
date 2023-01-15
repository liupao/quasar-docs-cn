---
title: 表单
desc: QForm Vue 组件渲染一个表单元素，并提供简单的表单验证方式
keys: QForm
related:
  - /vue-components/input
  - /vue-components/select
  - /vue-components/field
  - /vue-composables/use-form-child
---

QForm 组件渲染一个 `<form>` DOM 元素，并提供简单的表单验证方式，表单中的子元素（例如 [QInput](/vue-components/input#Internal-validation), [QSelect](/vue-components/select) 或者 [QField](/vue-components/field)）这些组件都可以通过它们的 `rules` 属性实现**内部验证**。

## QForm API

<doc-api file="QForm" />

## 用法

::: warning
请注意以下几点：
* QForm 可以配合 QInput, QSelect 或 QField 组件使用。
* QInput, QSelect 或 QField 组件必须使用内部验证器（而不是外部验证器）。
* 如果您要使用 `reset` 功能，请监听 QForm 的 `@reset` 事件并重置所有表单元素的数据。
:::

<doc-example title="基础" file="QForm/Basic" />

为了使用户能够激活表单上的 `@submit` 或 `@reset`事件，请创建一个 QBtn，将 `type` 设置为 `submit` 或 `reset`：
```html
<div>
  <q-btn label="Submit" type="提交" color="primary"/>
  <q-btn label="Reset" type="重置" color="primary" flat class="q-ml-sm" />
</div>
```
另外，您可以给 QForm 设置一个 Vue 引用（ref）名称，并直接调用其 `validate` 和 `resetValidation` 函数：

```js
// 组合式 API 格式

// <q-form ref="myForm">

setup () {
  const myForm = ref(null)

  function validate () {
    myForm.value.validate().then(success => {
      if (success) {
        // model 数据验证通过
      }
      else {
        // 数据验证失败
        // 用户至少输入了一个无效值
      }
    })
  }

  // 重置表单
  function reset () {
    myForm.value.resetValidation()
  }

  return {
    myForm,
    // ...
  }
}
```

```js
//  选项式 API 格式

// <q-form ref="myForm">

this.$refs.myForm.validate().then(success => {
  if (success) {
    // model 数据验证通过
  }
  else {
    // 数据验证失败
    // 用户至少输入了一个无效值
  }
})

    // 重置表单：
this.$refs.myForm.resetValidation()
```

## 关闭自动补全
在某些情况下，您可能想关闭许多现代浏览器提供的自动纠错、自动补全、自动大写和拼写纠错“功能”。您可以给 QForm 组件设置以下元素 HTML 属性：

```html
autocorrect="off"
autocapitalize="off"
autocomplete="off"
spellcheck="false"
```

## 提交到 URL（原生表单提交）
当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为每一个  Quasar 表单组件声明 `name` 属性，否则表单数据中不会包含它：

```html
<q-form action="https://some-url.com" method="post">
  <q-input name="firstname" ...>
  <!-- ... -->
</q-form>
```

* Control the way the form is submitted by setting `action`, `method`, `enctype` and `target` attributes of QForm
* If a listener on `@submit` IS NOT present on the QForm then the form will be submitted if the validation is successful
* If a listener on `@submit` IS present on the QForm then the listener will be called if the validation is successful. In order to do a native submit in this case:

```html
<q-form action="https://some-url.com" method="post" @submit.prevent="onSubmit">
  <q-input name="firstname" ...>
  <!-- ... -->
</q-form>
```

```js
methods: {
  onSubmit (evt) {
    console.log('@submit - do something here', evt)
    evt.target.submit()
  }
}
```

## 子元素通信

默认情况下，所有的 Quasar 表单组件都与父级的 QForm 实例通信。如果由于某种原因，您正在创建您自己的表单组件（**不是一个 Quasar 表单组件的封装**），那么您可以通过使用以下方法使 QForm 联系到它:

```js
// 组合式 API
import { useFormChild } from 'quasar'

setup () {
  // function validate () { ... }

  useFormChild({
    validate, // 函数；可以是异步的；
              // 应该返回一个布尔值（或一个 resolve 布尔值的 Promise）
    resetValidation,    // 可选的函数，可重置验证
    requiresQForm: true // 如果没有找到父级 QForm，它是否应该报错？
  })
}
```

```js
// 选项式 API

import { QFormChildMixin } from 'quasar'

// 某些组件
export default {
  mixins: [ QFormChildMixin ],

  methods: {
    // 必需！应该返回一个布尔值
    // 或一个 resolve 布尔值的 Promise
    validate () {
      console.log('called my-comp.validate()')
      return true
    },

    // 可选函数
    resetValidation () {
      // ...
    }
  },

  // ...
}
```
