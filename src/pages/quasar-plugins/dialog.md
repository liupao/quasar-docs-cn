---
title: Dialog Plugin
desc:  Quasar通过Dialog插件提供了非常简单的方式展示一个对话框，用于提示、选择、确认或警告。
related:
  - /vue-components/dialog
  - /quasar-plugins/bottom-sheet
  - /vue-composables/use-dialog-plugin-component
---

Quasar的Doalog（对话框）提供了很棒的方法与用户交互，你可以通过对话框来向用户展示重要信息，或者请求用户做出决策。

从UI的角度老看，你可以把对话框看作一种浮动的模态框，它只覆盖屏幕的一部分，也代表着对话框应该只被用于处理用户的快速操作。


::: tip
对话框还可以展示任意的Vue组件(对于复杂的用例，比如特定的表单组件、可选择的选项等)。对此，请转到[QDialog](/vue-components/dialog) 页面。
:::

与QDialog组件相比，使用dialog插件的优点是可以从Vue文件外部调用，并且不需要你管理它们的模板。缺点是，它的灵活度更低。

然而，**你也可以为Dialog插件提供一个组件来渲染**(参见调用自定义组件一节)，这是一个避免内联对话框使Vue模板混乱的好方法(它还会帮助你更好地组织项目文件和复用对话框)。


使用Dialog插件，您可以通过编程方式构建三种类型的对话框，内容如下所示：

1. 一个prompt对话框 - 收集用户输入的字段
2. 一个options对话框 - 提供一组选项供用户选择，可以是一组单选框（单选），或者一个复选框（多选），或者一组切换按钮。
3. 一个简单的确认对话框，用户可以取消或确认特定的操作或输入。

为了创建第1种收集输入类型的对话框，需要将`prompt`填入到`opts`对象中

为了创建第2种处理选择类型的对话框，需要将`options`填入到`opts`对象中。


## Dialog API
<doc-api file="Dialog" />

## Installation

<doc-installation plugins="Dialog" />

##  用法

```js
// 在Vue文件之外
import { Dialog } from 'quasar'
(Object) Dialog.create({ ... })

// 在Vue文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  $q.dialog({ ... }) // returns Object
}
```
请在API卡片中查看函数的返回值对象。

### Predefined

::: tip 提示
对于下面的所有示例，请在查看它们时查看浏览器控制台的打印输出。
:::

::: warning 警告
这是一个不详尽的列表。要进一步了解，请查看API部分。
:::

<doc-example title="基础用法" file="Dialog/Basic" />

<doc-example title="暗色模式" file="Dialog/Dark" />

<doc-example title="单选，多选，切换按钮" file="Dialog/Pickers" />

<doc-example title="其他" file="Dialog/OtherOptions" />

### 基础验证

你可以使用一个基础的验证系统，以便用户在填写预期值之前无法提交对话框（单击/点击“确定”或按<kbd>ENTER</kbd>键）。

<doc-example title="带有验证的输入对话框" file="Dialog/ValidationPrompt" />

<doc-example title="带有验证的选择对话框" file="Dialog/ValidationOptions" />

### 进度条

<doc-example title="展示进度条" file="Dialog/Progress" />

### 使用 HTML

如果设置了`html:true`属性，你可以在对话框的标题和展示信息上使用自定义的HTML，**请注意这可能导致XSS攻击**，因此，一定要自己清理、验证一遍所有由用户输入的信息。

<doc-example title="不安全的HTML信息" file="Dialog/UnsafeHtml" />

### 调用自定义的组件

你也可以调用自定义的组件来充当对话框的内容，而不是由Dialog插件提供的默认组件，但这时候需要你自己处理所有的细节（包括自定义组件的props）。

这个特性实际上是Dialog插件的基本功能。它可以帮助你分离和复用对话框相关的代码，使得Vue组件中其他的模板代码更加的整洁。

```js
import { useQuasar } from 'quasar'
import CustomComponent from '..path.to.component..'

setup () {
  const $q = useQuasar()

  $q.dialog({
    component: CustomComponent,

    // 转发到自定义组件的props
    componentProps: {
      text: 'something',
      // ...more..props...
    }
  }).onOk(() => {
    console.log('OK')
  }).onCancel(() => {
    console.log('Cancel')
  }).onDismiss(() => {
    console.log('Called on OK or Cancel')
  })
}
```

在选项式 API中可以直接使用`this.$q.dialog({ ... })`，与上面组合式 API代码是等价的

::: warning 警告
然而，你的自定义组件必须遵循下面描述的接口，以便完美地与Dialog插件挂钩。**注意带有REQUIRED的注释**，并将其视为一个基本用法的示例。
:::

#### 单文件组件搭配setup语法糖示例（组合式API）

我们可以在组合式API中使用[useDialogPluginComponent](/vue-composables/use-dialog-plugin-component) composable。

```html
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... 考虑使用 q-card-section?
      -->

      <!-- 按钮示例 -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'

const props = defineProps({
  // ...你的自定义 props
})

defineEmits([
  // REQUIRED; 需要明确指出
  // 你的组件会通过useDialogPluginComponent()暴露哪些事件。
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef - 用在QDialog上的Vue ref 模板引用
// onDialogHide   - 处理QDialog上@hide事件的函数
// onDialogOK     -  对话框结果为"ok"时会调用的函数
//                   示例: onDialogOK() - 不带参数
//                    示例: onDialogOK({ /*.../* }) - 带参数
// onDialogCancel - 对话框结果为"cancel" 时会调用的函数

// 这是我们示例的一部分(所以不是必需的)
function onOKClick () {
  // REQUIRED！ 对话框的结果为ok时必须要调用onDialogOK()  （参数是可选的）
  onDialogOK()
  // 带有参数的版本: onDialogOK({ ... })
  // ...它也会自动关闭对话框
}
</script>
```

如果你想通过对象的格式定义`emits`(需要 Quasar v2.2.5+):

```
defineEmits({
  // REQUIRED; 需要明确指出
  // 你的组件会通过useDialogPluginComponent()暴露哪些事件。
  ...useDialogPluginComponent.emitsObject,

  // ...你自己定义的emits
})
```

#### 组合式API示例

我们可以在组合式API中使用[useDialogPluginComponent](/vue-composables/use-dialog-plugin-component) composable。

```html
<template>
  <!-- 注意这里的 dialogRef  -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar'

export default {
  props: {
    // ...你的自定义props
  },

  emits: [
  // REQUIRED; 需要明确指出
  // 你的组件会通过useDialogPluginComponent()暴露哪些事件。
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // REQUIRED; 必须在 setup()函数中调用
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef - 用在QDialog上的Vue ref 模板引用
    // onDialogHide   - 处理QDialog上@hide事件的函数
    // onDialogOK     -  对话框结果为"ok"时会调用的函数
    //                   示例: onDialogOK() - 不带参数
    //                    示例: onDialogOK({ /*.../* }) - 带参数
    // onDialogCancel - 对话框结果为"cancel" 时会调用的函数

    return {
      // 这里是 REQUIRED ！;
      // 需要将这些(来自useDialogPluginComponent())注入到vue模板中
      dialogRef,
      onDialogHide,

      // 一些别的需要在vue模板中使用的方法
      onOKClick () {
        // REQUIRED！ 对话框的结果为ok时必须要调用onDialogOK()  （参数是可选的）
        onDialogOK()
        // 带有参数的版本: onDialogOK({ ... })
        // ...它也会自动关闭对话框
      }

      //我们可以直接将 onDialogCancel 透传
      onCancelClick: onDialogCancel
    }
  }
}
</script>
```

如果你想通过对象的格式定义`emits`(需要 Quasar v2.2.5+):

```
emits: {
  // REQUIRED; 需要明确指出
  // 你的组件会通过useDialogPluginComponent()暴露哪些事件。
  ...useDialogPluginComponent.emitsObject,

  // ...你自己定义的emits
]
```

#### 选项式API版本示例

```html
<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...content
        ... use q-card-section for it?
      -->

      <!-- buttons example -->
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    // ...你的自定义props
  },

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],

  methods: {
    //  REQUIRED 下的函数都是必须的
    // (不要修改这个函数名 --> "show")
    show () {
      this.$refs.dialog.show()
    },

    //  REQUIRED 下的函数都是必须的
    // (不要修改这个函数名 --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // 需要在QDialog触发“hide”事件时触发
      this.$emit('hide')
    },

    onOKClick () {
      // REQUIRED
      // 当对话框结果为ok时，必须触发 "ok" 事件 (参数是可选的)
      // 在关闭对话框之前
      this.$emit('ok')
      // 或者带有参数的版本: this.$emit('ok', { ... })

      // 然后关闭对话框
      this.hide()
    },

    onCancelClick () {
      // 操作取消时我们只需要关闭对话框
      this.hide()
    }
  }
}
</script>
```
## 处理Cordova/Capacitor 返回按钮
Quasar默认为你处理返回按钮，所以它会关闭任何打开的对话框，而不是默认返回到前一页(这不是一个很好的用户体验)。

但是，如果你希望禁用此行为，请编辑/quasar.config。js文件：

```js
// quasar.config.js;
// for Cordova (only!):
return {
  framework: {
    config: {
      cordova: {
        // quasar处理手机返回键使应用程序退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 下面这个配置开启会完全禁用quasar管理手机的返回按钮。
        backButton: true/false
      }
    }
  }
}

// quasar.config.js;
// for Capacitor (only!)
return {
  framework: {
    config: {
      capacitor: {
        // quasar处理手机返回键使应用程序退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 下面这个配置开启会完全禁用quasar管理手机的返回按钮。
        backButton: true/false
      }
    }
  }
}
```
