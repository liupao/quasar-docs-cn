---
title: Cordova 插件
desc: (@quasar/app-vite) 如果在Quasar中使用Cordova 插件
---

您可以使用 [Cordova 插件](https://cordova.apache.org/docs/en/latest/#plugin-apis) 访问设备的原生 API。

## Cordova 插件
一些示例插件：

* 电池状态
* 相机
* 联系人
* 设备
* 设备运动
* 地理位置
* 媒体
* 媒体捕捉
* 网络信息
* 启动画面
* 振动
* 状态栏

## Deviceready 事件

你会注意到一些 Cordova 插件只有在 `deviceready` 事件被触发后才可用。我们不需要担心太多，Quasar 监听这个事件被触发**之后**才会挂载们的 Vue 根组件。但是如果你需要一些插件自己的变量并且在 `deviceready` 之后初始化你可以按照下面使用插件设备的例子


### 注意事项
使用一个 vue 文件来做示例：
```html
<template>
  ... 我们确信'deviceready'已经触发了 ...
</template>

<script>
// 在 export default 之外，我们需要为自己临听事件：
document.addEventListener('deviceready', () => {
   // 只有现在我们确信事件已触发
}, false)

export default {
  // ... 我们确信'deviceready'已经触发了 ...
}
</script>
```
原因很简单。Quasar 监听到 `deviceready` 事件之后挂载根 Vue组件。但在此之前，Vue 文件被导入到 `/src/router/routes.js` 文件中，因此 `export default` 之外的代码会被提前执行。


## 使用一个 Cordova 插件

让我们通过一些例子来学习，假设您已经为Quasar项目添加了Cordova模式并已经安装了一个平台（android，ios，…）。

### 示例：电池管理

第一步是阅读我们想要使用的 Cordova 插件的文档。 我们看 [Cordova插件列表](https://cordova.apache.org/docs/en/latest/#plugin-apis) 并点击 [Battery Status doc page](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-battery-status/index.html)。

我们看到有关如何安装此插件的说明。它总是一个 Cordova 的命令。**因此，我们将 "cd" 进入/src-cordova**（这是 Cordova 生成的文件夹）**并在那里运行安装命令**：

```bash
# 在/src-cordova中:
$ cordova plugin add cordova-plugin-battery-status
```

现在让我们把这个插件用起来。在您的 Quasar 项目中 `pages/layouts/components` 目录下的一个 Vue 文件中，我们编写：


```html
// 某个 Vue 文件
// 记住这只是一个例子;
// 仅查看我们如何使用插件页面中描述的 API;
// 这里其余的东西并不重要
<template>
  <div>
    Battery status is: <strong>{{ batteryStatus }}</strong>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'

export default {
  setup () {
    const batteryStatus = ref('determining...')

    function updateBatteryStatus (status) {
      batteryStatus.value = `Level: ${status.level}, plugged: ${status.isPlugged}`
    }

    // 我们需要注册事件, 参考插件的文档页面
    window.addEventListener('batterystatus', updateBatteryStatus, false)

    onBeforeUnmount(() => {
      // 我们做一些清理工作;
      // 我们需要删除事件监听器
      window.removeEventListener('batterystatus', updateBatteryStatus, false)
    })

    return {
      batteryStatus
    }
  }
}
</script>
```

### 示例：相机

第一步是阅读我们想要使用的 Cordova 插件的文档。 我们看 [Cordova插件列表](https://cordova.apache.org/docs/en/latest/#plugin-apis) 并点击 [Camera doc page](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-camera/index.html)。

有提及 `deviceready` 事件。 但是我们已经从前面的章节中知道如何处理它。

我们看到有关如何安装此插件的说明。它总是一个 Cordova 的命令。**因此，我们将 "cd" 进入/src-cordova**（这是 Cordova 生成的文件夹）**并在那里运行安装命令**：

```bash
# 在/src-cordova中:
$ cordova plugin add cordova-plugin-camera
```

现在让我们把这个插件用起来。在您的 Quasar 项目中 `pages/layouts/components` 目录下的一个 Vue 文件中，我们编写：

```html
// 某个 Vue 文件
// 记住这只是一个例子;
// 仅查看我们如何使用插件页面中描述的 API;
// 这里其余的东西并不重要
<template>
  <div>
    <q-btn color="primary" label="Get Picture" @click="captureImage" />

    <img :src="imageSrc">
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()
    const imageSrc = ref('')

    function captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          imageSrc.value = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          $q.notify('Could not access device camera.')
        },
        {
          // camera options
        }
      )
    }

    return {
      imageSrc,
      captureImage
    }
  }
}
</script>
```

### 示例：设备
第一步是阅读我们想要使用的 Cordova 插件的文档。 我们看 [Cordova插件列表](https://cordova.apache.org/docs/en/latest/#plugin-apis) 并点击 [Device doc page](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html)。

这个插件初始化了一个名为 `device` 的全局变量，它描述了设备的硬件和软件信息。因此可以使用 `window.device` 访问它。


我们看到有关如何安装此插件的说明。它总是一个 Cordova 的命令。**因此，我们将 "cd" 进入/src-cordova**（这是 Cordova 生成的文件夹）**并在那里运行安装命令**：

```bash
# 在/src-cordova中:
$ cordova plugin add cordova-plugin-device
```

现在让我们把这个插件用起来。在您的 Quasar 项目中 `pages/layouts/components` 目录下的一个 Vue 文件中，我们编写：

```html
// 某个 Vue 文件
// 记住这只是一个例子;
// 仅查看我们如何使用插件页面中描述的 API;
// 这里其余的东西并不重要
<template>
  <div>
    <q-page class="flex flex-center">
      <div>IMEI: {{ imei }}</div>
    </q-page>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const imei = ref(
      window.device === void 0
        ? 'Run this on a mobile/tablet device'
        : window.device
    )

    return {
      imei
    }
  }
}
</script>
```
