---
title: 移动应用构建命令
desc: (@quasar/app-vite) Quasar CLI 开发 Cordova 混合应用的命令列表。
---

首先确保您已经安装了 Cordova CLI。

```bash
$ npm install -g cordova
```

## 开发
```bash
$ quasar dev -m [ios|android]

# ..或者更明确的格式:
$ quasar dev -m cordova -T [ios|android]

# ..或者更长的格式：
$ quasar dev --mode cordova --target [ios|android]

# 使用指定的模拟器 (--emulator, -e)
$ quasar dev -m ios -e iPhone-7
# 或者
$ quasar dev -m ios -e iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2

# 将额外的参数和/或选项传递给底层的“cordova”可执行文件：
$ quasar dev -m ios -- some params --and options --here
# 当在 Windows 上使用 Powershell 时：
$ quasar dev -m ios '--' some params --and options --here
```

但是，如果您希望打开 IDE（Android Studio / Xcode），然后从那里手动选择模拟器（或同时选择多个模拟器），以在其上运行开发的应用（或在真实的移动/平板设备上运行开发的应用）：

```bash
$ quasar dev -m [ios|android] --ide
```

::: warning
在 Android Studio 中，系统会提示您升级 Gradle 版本的消息。**请勿升级 GRADLE**，因为它会破坏 Cordova 项目。 其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 报错，请单击 File > Invalidate caches 并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

为了能够在设备模拟器上或直接在手机上进行开发（包括热更新），  Quasar CLI 遵循以下步骤：

1. 检测您的设备的外部 IP 地址。如果检测到多个此类 IP，则会要求您选择一个。如果您要使用手机进行开发，请选择可通过手机/平板电脑 ping 通的计算机的 IP 地址。
2. 在您的设备上启动一个开发服务器。
3. 暂时更改 `/src-cordova/config.xml` 中的 `<content/>` 标签指向之前检测到的 IP。这允许应用程序连接到开发服务器
3. 使用 Cordova CLI 临时更改 config.xml 构建一个原生 APP。
4. Cordova CLI 会检查手机/平板电脑是否连接到您的开发设备。如果是，它会在其上安装开发版应用程序。如果找不到，那么它启动一个模拟器并运行开发版应用程序。
5. 最后，它恢复对 `/src-cordova/config.xml` 所做的临时更改。

::: danger
如果使用手机/平板电脑进行真机开发，则必须保证手机/平板电脑能够访问构建机器的外部 IP 地址，这一点非常重要，否则您只会获得一个仅具有白色屏幕的开发版应用程序。同时检查您的机器的防火墙是否允许连接到选择的开发端口。
:::

### 启用 iOS modern build

默认情况下，由于 Cordova 问题，iOS 的 Xcode modern build 已禁用。如果您明确知道自己需要它，那么可以将其开启，请从 `/quasar.config.js` 执行此操作：

```js
cordova: {
  noIosLegacyBuildFlag: true
}
```
如果您想在您的  "build.json" 文件中明确构建的类型也可以执行上述操作。


## 构建生产版本
```bash
$ quasar build -m [android|ios]

# ..或者更明确的格式:
$ quasar build -m cordova -T [ios|android]

# ..或者更长的格式:
$ quasar build --mode cordova --target [ios|android]

# 这将跳过.app 或.apk 创建，仅在/src-cordova/www 目录生成文件
$ quasar build -m [ios|android] --skip-pkg

# 将额外的参数和/或选项传递给底层的“cordova”可执行文件
$ quasar build -m ios -- some params --and options --here
```

* 这些命令或编译 `/src` 目录下的源代码，并将产物覆盖输出到 `/src-cordova/www` 目录下，然后使用 Cordova CLI 开始构建一个原生 App。

* 除非修改配置，否则默认的构建的产物将会输出到 `/dist/cordova` 目录下。
* 如果您希望跳过 Cordova CLI 的构建过程，只生成 `/src-cordova/www` 的文件，则：

```bash
$ quasar build -m [ios|android] --skip-pkg
```

* 如果您希望使用 IDE（Android Studio/Xcode）手动构建最终资源，而不是在终端中进行构建，则：

```bash
$ quasar build -m [ios|android] --ide
```

::: warning
在 Android Studio 中，系统会提示您升级 Gradle 版本的消息。**请勿升级 GRADLE**，因为它会破坏 Cordova 项目。 其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 报错，请单击 File > Invalidate caches 并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

如果您希望在生产版本中也开启 UI 的调试：

```bash
$ quasar build -m [ios|android] -d

# ..更长的格式
$ quasar build -m [ios|android] --debug
```
