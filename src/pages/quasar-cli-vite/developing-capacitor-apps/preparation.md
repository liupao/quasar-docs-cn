---
title: 开发 Capacitor 应用前准备
desc: (@quasar/app-vite) 在你使用 Capacitor 开发 Quasar 混合移动应用程序之前需要做的工作。
---

在深入到实际开发之前，需要做一些准备工作。

## 1. 安装

### Android 设置

* 在电脑上安装 Android Studio 和 Android 平台 SDK。可以 [在这里下载 Android Studio](https://developer.android.com/studio/index.html) ，之后可以参照这些 [安装步骤](https://developer.android.com/studio/install.html)。

* 确保安装好了 Android SDK 后，接受它的许可证。打开终端，进入 SDK 所在目录，在 tools/bin 中调用 `sdkmanager --licenses`。

::: warning 注意
环境变量 `ANDROID_HOME` 已被废弃，取而代之的是 `ANDROID_SDK_ROOT`。根据 Android Studio 的版本，可能需要其中一个。两者都设置也无妨。
:::

* 添加 Android 环境变量：

#### Unix (macOS, linux) 设置

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
PATH=$PATH:$ANDROID_SDK_ROOT/tools; PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

> 请注意，有时 `/Android/Sdk` 文件夹会被添加到用户文件夹的 `/Library/` 内。检查用户文件夹，如果 `/Android/` 文件夹只在 `/Library/` 内，请执行：`export ANDROID_SDK_ROOT="$HOME/Library/Android/Sdk"` 或 `export ANDROID_HOME="$HOME/Library/Android/Sdk"` 来代替。

#### Windows 设置

```bash
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%USERPROFILE%\AppData\Local\Android\Sdk"
setx path "%path%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools"
```

- 启动 Android studio，然后安装各个 SDK：

- 打开窗口底部的 "Configure" 菜单：

  ![SDK manager](https://cdn.quasar.dev/img/Android-Studio-SDK-Menu.png 'SDK manager')

- 选择所需的 SDK 并点击 "Apply" 来安装SDK。

  ![SDK selection](https://cdn.quasar.dev/img/Android-Studio-SDK-selection.png 'SDK selection')

### iOS 设置

需要有一台安装了 [Xcode](https://developer.apple.com/xcode/) 的 macOS 电脑。安装完毕后，打开 Xcode，以获得许可证提示。接受许可证，然后就可以关闭它了。

## 2. 添加 Capacitor 模式

为了开发/构建一个移动应用程序，需要在 Quasar 项目中添加 Capacitor 模式。通过 Capacitor CLI 在 `/src-capacitor` 文件夹中生成一个 Capacitor 项目。

```bash
$ quasar mode add capacitor
```

## 3. 开始开发

要用 HMR 启动一个开发服务器，运行以下命令：

```bash
$ quasar dev -m capacitor -T [android|ios]
```

一旦开发服务器准备就绪，IDE 将打开（Android Studio 或 Xcode），在 IDE 中可以手动选择模拟器（或同时选择多个！）并安装开发应用程序。也可以在连接的移动/平板电脑设备上运行开发应用。

::: warning 注意
在 Android Studio 中，会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Capacitor 项目。任何其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 错误，那么点击 File > Invalidate caches and restart。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::
