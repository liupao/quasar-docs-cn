---
title: Capacitor 构建命令
desc: (@quasar/app-vite) 使用 Capacitor 开发或构建混合移动应用程序时，Quasar CLI 的命令列表。
---

## 开发

```bash
$ quasar dev -m capacitor -T [ios|android]

# ..或者完整的形式
$ quasar dev --mode capacitor --target [ios|android]
```

命令会自动启动 IDE (Android Studio / Xcode)，然后选择模拟器 (或者同时运行多个！)，并在上面安装开发应用程序。也可以在真正的移动/平板电脑设备上运行开发应用程序。

::: warning 注意
在 Android Studio 中，会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Capacitor 项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 错误，那么点击 File > Invalidate caches and restart。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

为了能够在设备模拟器上或直接在手机上开发（包括热模块重载），Quasar CLI 遵循以下步骤：

1. 检测机器的外部 IP 地址。如果检测到有多个这样的 IP，那么它会要求你选择一个。如果使用手机进行开发，那么选择机器的 IP 地址，该地址可以从手机/平板电脑上进行 ping。
2. 它启动了一个开发服务器。
3. 它告诉 Capacitor 使用之前检测到的 IP。这样，应用程序就可以连接到开发服务器。
4. 它使用 Capacitor CLI 来更新你所有的插件。
5. 最后，它打开本地 IDE。在这里运行应用程序，它将自动连接到开发服务器。

::: danger 重要
如果在手机/平板电脑上开发，非常重要的一点是，构建机器的外部 IP 地址可以从手机/平板电脑上访问，否则会得到一个只有白屏的开发应用。还要检查机器的防火墙是否允许连接到开发选择的端口。
:::

## 生产构建

```bash
$ quasar build -m capacitor -T [ios|android]

# ..或者完整的形式
$ quasar build --mode capacitor --target [ios|android]
```

* 这些命令解析并建立 `/src` 文件夹，然后覆盖 `/src-capacitor/www`，然后使用 Gradle/xcodebuild 来生成最终的资源，并将其放入手机/平板电脑。

* 除非另有配置，否则内置的软件包将位于 `/dist/capacitor` 中。

* 如果希望跳过 Gradle/xcodebuild 步骤，只填充 `/src-capacitor/www` 文件夹：

```bash
$ quasar build -m capacitor -T [ios|android] --skip-pkg
```

* 如果希望使用 IDE（Android Studio / Xcode）手动构建最终资源，而不是做终端构建，那么：

```bash
$ quasar build -m capacitor -T [ios|android] --ide
```

::: warning 注意
在 Android Studio 中，会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Capacitor 项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 错误，那么点击 File > Invalidate caches and restart。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::

如果你想在生产构建中启用 UI 代码的调试功能：

```bash
$ quasar build -m capacitor -T [ios|android] -d

# ..或者完整的形式
$ quasar build -m capacitor -T [ios|android] --debug
```
