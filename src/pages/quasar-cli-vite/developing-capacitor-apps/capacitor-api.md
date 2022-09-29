---
title: Capacitor 接口
desc: (@quasar/app-vite) 如何在 Quasar 应用程序中使用 Capacitor 插件。
---

通过 [Capacitor 接口](https://capacitor.ionicframework.com/docs/apis) 调用原生设备接口。

## Capacitor 接口

此类接口的几个例子：

* Background Task
* Camera
* Console
* Device
* Filesystem
* Geolocation
* Motion
* Network
* Push Notifications
* Share
* Splash Screen
* Status Bar

## 使用 Capacitor 接口

让我们通过一些例子来学习，假设已经在 Quasar 项目中加入了 Capacitor 模式。

### 例子：地理位置

先阅读一下 [Geolocation 接口](https://capacitor.ionicframework.com/docs/apis/geolocation) 使用方法。

然后在 Quasar 项目 pages/layouts/components 下的一个 Vue 文件中，这样子写：

```html
// Vue 文件
// 请记住，这只是一个例子；
// 只看使用该插件的接口用法；
// 其余的事情在这里并不重要

<template>
  <div>
    GPS 定位: <strong>{{ position }}</strong>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Geolocation } from '@capacitor/geolocation'

export default {
  setup () {
    const position = ref('定位中...')

    function getCurrentPosition() {
      Geolocation.getCurrentPosition().then(newPosition => {
        console.log('当前：', newPosition)
        position.value = newPosition
      })
    }

    let geoId

    onMounted(() => {
      getCurrentPosition()

      // 开始监听
      geoId = Geolocation.watchPosition({}, (newPosition, err) => {
        console.log('新的 GPS 定位')
        position.value = newPosition
      })
    })

    onBeforeUnmount(() => {
      // 清除
      Geolocation.clearWatch(geoId)
    })

    return {
      position
    }
  }
}
</script>
```

### 例子：相机

先阅读一下 [Camera 接口](https://capacitor.ionicframework.com/docs/apis/camera) 使用方法。

然后在 Quasar 项目 pages/layouts/components 下的一个 Vue 文件中，这样子写：

```html
// Vue 文件
// 请记住，这只是一个例子；
// 只看使用该插件的接口用法；
// 其余的事情在这里并不重要

<template>
  <div>
    <q-btn color="primary" label="获取图片" @click="captureImage" />

    <img :src="imageSrc">
  </div>
</template>

<script>
import { ref } from 'vue'
import { Camera, CameraResultType } from '@capacitor/camera'

export default {
  setup () {
    const imageSrc = ref('')

    async function captureImage () {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      })

      // 其结果将根据 resultType 选项的值而变化。
      // CameraResultType.Uri - 从 image.webPath 获取
      // CameraResultType.Base64 - 从 image.base64String 获取
      // CameraResultType.DataUrl - 从 image.dataUrl 获取
      imageSrc.value = image.webPath
    }

    return {
      imageSrc,
      captureImage
    }
  }
}
</script>
```

一些 Capacitor 插件，如 Camera，有一个基于网络的用户界面，当不是原生运行而是在一个标准的网络浏览器中运行时，要使用就要启用这些控件，请在项目中添加 @ionic/pwa-elements。

```bash
$ npm install @ionic/pwa-elements
```

然后创建一个启动文件来初始化它们，比如说 `src/boot/capacitor.js`：

```js
import { defineCustomElements } from '@ionic/pwa-elements/loader'

export default () => {
  defineCustomElements(window)
}
```

不要忘了在 `quasar.config.js` 中调用启动脚本

```js
boot: ['capacitor']
```

现在，不仅可以在原生 Android 或 iOS 中使用相机接口，还可以在 SPA 或 PWA 等基于 Web 的项目中使用。

### 例子：设备

先阅读一下 [Device 接口](https://capacitor.ionicframework.com/docs/apis/device) 使用方法。

然后在 Quasar 项目 pages/layouts/components 下的一个 Vue 文件中，这样子写：

```html
// Vue 文件
// 请记住，这只是一个例子；
// 只看使用该插件的接口用法；
// 其余的事情在这里并不重要

<template>
  <div>
    <div>型号: {{ model }}</div>
    <div>制造商: {{ manufacturer }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Device } from '@capacitor/device'

export default {
  setup () {
    const model = ref('请等待...')
    const manufacturer = ref('请等待...')

    onMounted(() => {
      Device.getInfo().then(info => {
        model.value = info.model
        manufacturer.value = info.manufacturer
      })
    })

    return {
      model,
      manufacturer
    }
  }
}
</script>
```
