---
title: 如何使用 Vue
desc: Quasar 关于 Vue 的教程
---

在学习 Quasar 之前，更好先学习一下 ES6 和 Vue 3。

[快速学习 ES6](https://github.com/lukehoban/es6features) 和 [完整的 ES6 特性列表](http://es6-features.org/#Constants) -- 不要担心，你也不需要将所有的 ES6 都掌握）

对于有响应式开发经验的开发者来说，只需要半天的时间就可以将 [Vue 3 文档](https://vuejs.org/) 从上到下阅读一遍，这对了解和使用 Quasar 的组件有非常大的帮助。


::: tip
如果你是 Vue 初学者，也没使用过其他的响应式框架，并且在寻找一个好的教程，我们推荐你看看 [Vue 和 Quasar 视频教程](/video-tutorials)
:::

在阅读 Vue 文档之后，让我们理清一些最常问的问题，比如“如何使用 Quasar 组件、 Vue 属性、方法和事件”。

## Vue 单文件组件 (SFC)
你将会使用 `*.vue` 文件来构建 Quasar app。每个 `*.vue` 文件包括 `template` (HTML), `script` (Javascript) 和 `style` (CSS/SASS/SCSS/Stylus/Less) 三部分

```html
<template>
  <!-- 在此定义 Vue 模板  -->
</template>

<script>
  // 这里是你的 Javascript 定义 Vue 组件的地方，
  // 它可以是一个 布局组件，一个页面或者一个可复用的组件

export default {
  //
}
</script>

<style>
/* 在此写 CSS 样式 */
</style>
```

### CSS 预处理器
关于 `<style>` 标签，你也可以在其中使用喜欢的预处理器，其中 [Sass/SCSS](https://sass-lang.com)  （推荐）是开箱即用的。

你可以通过 style 标签的 lang 属性来指定希望选择的预处理器来处理正在编写的 CSS 代码：

```html
<!-- 注意 lang="sass" -->
<style lang="sass">
.some-div
  font-size: 15px
</style>

<!-- 注意 lang="scss" -->
<style lang="scss">
.some-div {
  font-size: 15px;
}
</style>
```

## 使用 Quasr 指令

Quasar 提供了一些 [Vue 指令](https://vuejs.org/guide/reusability/custom-directives.html)。这些指令可以在所有的 DOM 和组件上使用。

示例：

```html
<div v-ripple>Click Me</div>
```
> 注意使用了`v-ripple` 指令的 HTML 在点击时会有一个涟漪水波特效。vue 指令都使用 `v-` 前缀。


```html
<div v-touch-pan="handler">...</div>
<div v-touch-swipe="handler">...</div>
<div v-ripple>Click me. I got ripples.</div>
```

## 使用 Quassa 组件
所有的 Quasar 组件的命名都以 Q 开头比如 "QBtn", "QElementResizeObserver"。为了使用它们，需要在`/quasar.config.js`中将其引入。

让我们以 QBtn 和 QIcon 为例，然后我们将看到如何在应用程序中嵌入这些组件：

```html
<div>
  <q-btn @click="doSomething" label="Do something" />
  <q-icon name="alarm" />
</div>
```

> 请注意，在模板中使用 QBtn 组件写法为`<q-btn>`。如果我们要导入 QelementResizeObserver 组件，则将`<q-element-resize-observer>`用于模板中。

## 使用 Quasar 插件

Quasar 插件是可以在 Vue 文件中和外部使用的功能，如 Notify、BottomSheet、AppVisibility 等。

::: warning
**使用插件之前**，需要在`/quasar.config.js`将其启用，示例：
:::

```js
framework: {
  plugins: [ 'Notify', 'BottomSheet' ]
}
```
让我们以 Notify 为例，看看如何使用它。在 Vue 文件中，你可以编写以下内容（组合式 API）：

```html
<template>
  <div>
    <q-btn
      @click="$q.notify('My message')"
      color="primary"
      label="Show a notification"
    />

    <q-btn
      @click="showNotification"
      color="primary"
      label="Show another notification"
    />
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    function showNotification () {
      $q.notify('Some other message')
    }

    return {
      showNotification
    }
  }
}
</script>
```

> 注意我们在模板中使用了 `$q.<plugin-name>`.

在选项式 API 中：
```js
export default {
  methods: {
    showNotification () {
      this.$q.notify('Some other message')
    }
  }
}
```

在 Vue 文件之外:

```js
import { Notify } from 'quasar'

// ...
Notify.create('My message')
```

### 自闭合的标签

::: danger
不要在 **Quasar UMD 版本**中使用自闭合的标签。 你的浏览器会在 Vue 解析 DOM 之前解释 HTML ，所以你的 HTML 必须书写正确。浏览器未知的标签（比如 Vue 组件）不能是自闭合的，因为浏览器会将她们解释成没有闭合标签的错误的语法。
:::

一些 Quasar 组件的内容不需要包含 HTML 元素，这种情况下你可以使用一个自闭合的标签，例如 QIcon 组件：

```html
<q-icon name="cloud" />
```

上面的自闭合模板代码等价于：

```html
<q-icon name="cloud"></q-icon>
```
两种格式的语法都是合法的，除了在 UMD 的版本中必须使用双闭合的标签外。针对常规的 DOM 元素也是可以使用的：

```html
<div class="col" />
<!-- 等价于： -->
<div class="col"></div>
```
一些 eslint-plugin-vue 中的代码格式规则会强制要求使用自闭合的语法。

## 处理 Vue Properties
我们假设有一个 Quasar 组件叫做 QBogus，它支持以下属性（properties），我们将会在下面讨论所有类型的属性。

| Vue 属性 | 类型 | 描述 |
| --- | --- | --- |
| `infinite` | Boolean | 无限滚动 |
| `size` | String | 加载条的厚度 |
| `speed` | Number | 加载条更新的速度（单位毫秒） |
| `columns` | Object | 定义列数据的对象，（见下方 "Columns Definition" 部分）。 |
| `offset` | Array | 两个数字的数组，分别定义水平和垂直方向的偏移量（单位像素）。 |

### 布尔（Boolean） 属性
布尔属性意味着它只接受严格的布尔值。赋值时不会发生自动布尔转换，因此必须确保使用的是真正的布尔值。

::: tip 提示
在 Quasar 中，所有的布尔类型的属性默认值都是 `false`，因此，您不必显式地为它们分配 `false`值。
:::

如果你想在运行时动态的更改其属性值，那么你可以将其绑定在一个变量上：

```html
<template>
  <q-bogus :infinite="myInfiniteVariable" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const myInfiniteVariable = ref(false)
    return {
      myInfiniteVariable
    }
  }
}
</script>
```

另一方面，如果你知道这个布尔值不会改变，你可以使用变量的速记版本，就像组件属性一样，只需生声明它。换句话说，如果你声明了一个属性而不将值绑定到组件范围内的变量，它的值永远都会被解析成`true`：

```html
<template>
  <q-bogus infinite />

  <!--
    等价于下面的版本，但是下面的代码更长
  -->
  <q-bogus :infinite="true" />
</template>
```

### 字符串（String） 属性

如你所想，这种类型的属性需要字符串作为值。

```html
<template>
  <!--
    直接赋值，不需要定义变量
  -->
  <q-bogus size="24px" />

  <!--
    也可以将其绑定到变量上，
    这样我们可以动态的更改它
  -->
  <q-bogus :size="mySize" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    //  注意需要 String 类型的变量
    const mySize = ref('16px')
    return {
      mySize
    }
  }
}
</script>
```

### 数字（Number）属性

```html
<template>
  <!--
    示例 1. 直接赋值
    注意属性前面的(":")符号
  -->
  <q-bogus :speed="50" />

  <!-- 示例 2.赋值一个变量 -->
  <q-bogus :speed="myNumber" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    //注意需要 Number 类型的变量
    const myNumber = ref(50)
    return {
      myNumber
    }
  }
}
</script>
```

### 对象（Object）属性

```html
<template>
  <!-- 示例 1. 直接赋值 -->
  <q-bogus :columns="{key: 'value', anotherKey: 'another value'}" />
  <!-- 示例 1 更优雅的方式 -->
  <q-bogus
    :columns="{
      key: 'value',
      anotherKey: 'another value'
    }"
  />

  <!-- 示例 2.赋值一个变量 -->
  <q-bogus :columns="myColumns" />
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const myColumns = ref({
      key: 'value',
      anotherKey: 'another value'
    })

    return { myColumns }
  }
}
</script>
```

### 数组（Array）属性

```html
<template>
  <!-- 示例 1. 直接赋值 -->
  <q-bogus :offset="[10, 20]" />

  <!-- 示例 2.赋值一个变量  -->
  <q-bogus :offset="myOffset" />
</template>

<script>
export default {
  setup () {
    return {
      myOffset: [10, 20]
    }
  }
}
</script>
```

## 处理 Vue 方法（Methods）

您会在整个文档中注意到，某些 Quasar 组件具有可以调用的方法。例如：

| Vue 方法 | 描述 |
| --- | --- |
| `next()` | 滑动到下一个幻灯片 |
| `previous(doneFn)` | 滑动到上一个幻灯片 |
| `toggleFullscreen()` | 切换全屏开关 |

为了访问这些变量，首先你需要在组件中设置一个 Vue DOM 引用，下面是一个组合式 API 中的示例：
```html
<template>
  <!--
    注意 ref="myRef"。 我们将会在下面的 script 部分中声明一个同名的 "ref"
    Vue 将会在组件被挂载后把引用的 DOM 赋值给同名的 "ref"。
  -->
  <q-bogus ref="myRef" />
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup () {
    const myRef = ref(null)

    // 等待组件被挂载到 DOM 之后：
    onMounted(() => {
      // 我们可以在此调用组件的 "next()" 方法
      myRef.value.next()
    })
    // 在挂载之前调用将会得到一个报错
    // 因为 Vue 还没有准备好 Vue 引用

    // 我们可以导出 myRef
    // 那么就可以在模板中使用它
    return { myRef }
  }
}
</script>
```
下面是组合式 API 的示例：

```html
<template>
  <!--
    注意 ref="myRef"。 我们将会在下面的 script 部分中声明一个同名的 "ref"
    Vue 将会在组件被挂载后把引用的 DOM 赋值给同名的 "ref"。
  -->
  <!--
    Notice ref="myRef". We will use the name
    assigned to "ref" in the script part below
  -->
  <q-bogus ref="myRef" />
</template>

<script>
export default {
  // 现在我们可以通过 `this.$refs.myRef` 来访问它
  // 一个在 mounted() Vue 生命周期中使用的示例：
  mounted () {
    // 我们可以在此调用组件的 "next()" 方法：
    this.$refs.myRef.next()
  }
  // 在挂载之前调用将会得到一个报错
  // 因为 Vue 还没有准备好 Vue 引用
}
</script>
```

## 处理 Vue 事件（Events）

在整个文档中，你会注意到一些 Quasasr 组件的 API 卡片中有一个称为 "Vue Events" 的部分，例如：

| 时间名 | 描述 |
| --- | --- |
| `@show` | 模态框显示后立即触发。 |
| `@hide` | 模态框关闭后立即触发。 |

当它们被触发时，为了捕获这些事件，你需要在组件的 HTML 模板中为它们绑定监听事件，示例：


```html
<template>
  <q-bogus @show="doSomething" @hide="doSomethingElse" />
</template>

<script>
export default {
  setup () {
    function doSomething () {
      // 由于 QBogus 组件的 @show 事件被触发了
      // 所以这个函数会被调用
    }

    function doSomethingElse () {
      // 由于 QBogus 组件的 @hide 事件被触发了
      // 所以这个函数会被调用
    }

    return {
      doSomething,
      doSomethingElse
    }
  }
}
</script>
```
