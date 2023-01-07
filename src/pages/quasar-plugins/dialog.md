---
title: Dialog 插件
desc:  Quasar 通过 Dialog 插件以非常简单的方式展示对话框，用于提示、选择、确认或警告。
related:
  - /vue-components/dialog
  - /quasar-plugins/bottom-sheet
  - /vue-composables/use-dialog-plugin-component
---

Quasar 的 Dialog(对话框)提供了一种很棒的交互方式，通过对话框向用户展示重要信息，或请求用户做出决策。

从 UI 角度来看，对话框更像是浮动的模态框，它只遮挡了部分屏幕。也就是说，对话框更适用于处理用户的快速操作。


::: tip 提示
对话框还可以用作 Vue 文件模板中的组件(用于复杂用例，如表单组件、可选选项等)。详见 [QDialog](/vue-components/dialog)。
:::

与 QDialog 组件相比，使用 Dialog 插件的优点是可以从 Vue 文件外部调用，并且不需要管理它们的模板。缺点是，它的自定义灵活度更低。

但是，**也可以提供一个组件供 Dialog 插件渲染**(参见“调用自定义组件”一节)，这样既可以避免使用内联对话框让 Vue 模板变得混乱，还可以更好地组织项目文件，并能更好地复用对话框。


使用 Dialog 插件，可以构建以下三种对话框：

1. Prompt 对话框 - 收集用户输入的字段。
2. Options 对话框 - 提供一组选项供用户选择，包括单选框(单选)、复选框(多选)，以及切换按钮。
3. 简单的确认对话框，用户可以取消或确认操作或输入。

创建第 1 种收集输入类型的对话框，需要将 `prompt` 填入到 `opts` 对象中。

创建第 2 种处理选择类型的对话框，需要将 `options` 填入到 `opts` 对象中。


## Dialog API
<doc-api file="Dialog" />

## 安装

<doc-installation plugins="Dialog" />

## 用法

```js
// Vue 文件之外
import { Dialog } from 'quasar'
(Object) Dialog.create({ ... })

// Vue 文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  $q.dialog({ ... }) // 返回对象
}
```
请查看 API 中列出的函数返回值对象。

### 内置用法

::: tip 提示
查看下列示例时，还应在浏览器的控制台中查看打印输出。
:::

::: warning 警告
下列 Dialog 插件的示例用法只覆盖了部分内容，更多用法详见 API 中的说明。
:::

<doc-example title="基础用法" file="Dialog/Basic" />

<doc-example title="暗色模式" file="Dialog/Dark" />

<doc-example title="单选、多选、切换按钮" file="Dialog/Pickers" />

<doc-example title="其他" file="Dialog/OtherOptions" />

### 基础验证

使用基础验证系统，以便用户在填写预期值之前无法提交对话框(单击/点击“确定”或按 <kbd>ENTER</kbd> 键)。

<doc-example title="带有验证的输入对话框" file="Dialog/ValidationPrompt" />

<doc-example title="带有验证的选择对话框" file="Dialog/ValidationOptions" />

### 进度条

<doc-example title="展示进度条" file="Dialog/Progress" />

### 使用 HTML

设置 `html:true` 属性后，就可以在对话框的标题和展示信息上使用自定义的 HTML，**注意，这种方式可能会遭受 XSS 攻击**，因此，一定要清理，并验证用户输入的所有信息。

<doc-example title="不安全的 HTML 信息" file="Dialog/UnsafeHtml" />

### 调用自定义组件

可以使用自定义组件取代 Dialog 插件的默认组件，将其作为对话框的内容，但这时需要自行处理所有的细节(包括自定义组件的 props)。

这个特性其实是 Dialog 插件的基本功能，通过分离和复用对话框的代码，可以使 Vue 组件中其他的模板代码更整洁。

```js
import { useQuasar } from 'quasar'
import CustomComponent from '..path.to.component..'

setup () {
  const $q = useQuasar()

  $q.dialog({
    component: CustomComponent,

    // 转发到自定义组件的 props
    componentProps: {
      text: 'something',
      // ...更多..props...
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

选项式 API 中，可直接使用 `this.$q.dialog({ ... })`，与上面组合式 API 代码是等价的。

::: warning 警告
自定义组件必须遵循下面描述的接口，以便完美地与 Dialog 插件挂钩。**注意，带有 REQUIRED 的注释**，并将其视为基本用法的示例。
:::

#### 单文件组件搭配 setup 语法糖示例(组合式 API)

组合式 API 中，可以使用 [useDialogPluginComponent](/vue-composables/use-dialog-plugin-component) 组合式函数。

```html
<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...内容
        ...使用 q-card-section？
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
  // ...自定义 props
})

defineEmits([
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
// dialogRef      - 用在 QDialog 上的 Vue ref 模板引用
// onDialogHide   - 处理 QDialog 上 @hide 事件的函数
// onDialogOK     - 对话框结果为 ok 时会调用的函数
//                    示例: onDialogOK() - 不带参数
//                    示例: onDialogOK({ /*.../* }) - 带参数
// onDialogCancel - 对话框结果为 cancel 时调用的函数

// 这是示例的内容，不是必需的
function onOKClick () {
  // REQUIRED！ 对话框的结果为 ok 时，必须调用 onDialogOK()  (参数是可选的)
  onDialogOK()
  // 带参数的版本: onDialogOK({ ... })
  // ...会自动关闭对话框
}
</script>
```

如需以对象的格式定义 `emits`，可使用以下方式。(需要 Quasar v2.2.5+)：

```
defineEmits({
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent()暴露哪些事件
  ...useDialogPluginComponent.emitsObject,

  // ...自定义的 emits
})
```

#### 组合式 API 示例

组合式 API 中，可以使用 [useDialogPluginComponent](/vue-composables/use-dialog-plugin-component) 组合式函数。

```html
<template>
  <!-- 注意这里的 dialogRef  -->
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...内容
        ...使用 q-card-section？
      -->

      <!-- 按钮示例 -->
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
    // ...自定义的 props
  },

  emits: [
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
    ...useDialogPluginComponent.emits
  ],

  setup () {
    // REQUIRED; 必须在 setup()函数中调用
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
    // dialogRef      - 用在 QDialog 上的 Vue ref 模板引用
    // onDialogHide   - 处理 QDialog 上 @hide 事件的函数
    // onDialogOK     - 对话框结果为 ok 时调用的函数
    //                    示例: onDialogOK() - 不带参数
    //                    示例: onDialogOK({ /*.../* }) - 带参数
    // onDialogCancel - 对话框结果为 cancel 时会调用的函数

    return {
      // 这里是 REQUIRED ！
      // 需要将来自 useDialogPluginComponent()注入到 Vue 模板中
      dialogRef,
      onDialogHide,

      // 一些别的需要在 Vue 模板中使用的方法
      onOKClick () {
        // REQUIRED！对话框的结果为 ok 时必须调用 onDialogOK() ，(参数是可选的)
        onDialogOK()
        // 带参数的版本: onDialogOK({ ... })
        // ...它也会自动关闭对话框
      }

      // 可直接透传 onDialogCancel
      onCancelClick: onDialogCancel
    }
  }
}
</script>
```

如需通过对象的格式定义 `emits` (需要 Quasar v2.2.5+):

```
emits: {
  // REQUIRED; 需要明确指出
  // 组件通过 useDialogPluginComponent() 暴露哪些事件
  ...useDialogPluginComponent.emitsObject,

  // ...自定义的 emits
]
```

#### 选项式 API 示例

```html
<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <!--
        ...内容
        ...使用 q-card-section？
      -->

      <!-- 按钮示例 -->
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
    // ...自定义的 props
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
      // 需要在 QDialog 触发 “hide” 事件时触发
      this.$emit('hide')
    },

    onOKClick () {
      // REQUIRED
      // 对话框结果为 ok 时，必须触发 ok 事件 (参数是可选的)
      // 在关闭对话框之前
      this.$emit('ok')
      // 或带参数的版本: this.$emit('ok', { ... })

      // 然后关闭对话框
      this.hide()
    },

    onCancelClick () {
      // 操作取消时，只需关闭对话框
      this.hide()
    }
  }
}
</script>
```
## 处理 Cordova/Capacitor 返回按钮
Quasar 默认处理返回按钮，所以它会关闭打开的对话框，而不是默认返回到前一页(这样的用户体验并不好)。

如需禁用此行为，需编辑 /quasar.config.js：

```js
// quasar.config.js;
// 仅用于 Cordova！
return {
  framework: {
    config: {
      cordova: {
        // quasar 处理手机返回键使应用程序退出
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 下面这个配置开启会完全禁用 quasar 管理手机的返回按钮
        backButton: true/false
      }
    }
  }
}

// quasar.config.js;
// 仅用于 Capacitor！
return {
  framework: {
    config: {
      capacitor: {
        // quasar 处理手机返回键使应用程序退出
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 开启下面这个配置会完全禁用 quasar 管理手机的返回按钮
        backButton: true/false
      }
    }
  }
}
```
