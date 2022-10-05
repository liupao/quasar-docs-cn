---
title: 开发 Cordova App 的准备工作
desc: (@quasar/app-vite) 使用 Quasar 和 Cordova 开发混合应用需要的准备工作。
---

在我们深入实际开发之前，我们需要做一些准备工作。

## 1. 安装
第一步是确保安装了 Cordova 的脚手架和必要的 SDK。

```bash
$ npm install -g cordova
```

::: warning
根据您的 Android Studio 版本，您可能需要重新启用 "Android SDK Tools"。您可以通过转到 "Tools > SDK Manager > SDK Tools”，然后取消勾选 "Hide Obsolete Packages" 并勾选 "Android SDK Tools (Obsolete)" 来完成此操作。

**下面的文档假设这已经完成**
:::

::: warning
环境变量  `ANDROID_HOME`  已被弃用，并被替换为  `ANDROID_SDK_ROOT`。根据您的 Android Studio 版本，您可能需要其中一个，或者干脆直接将两个都设置，也没有什么坏处。
:::

### Android 安装

* 后续的步骤，需要您在您的计算机上安装 Android 平台 SDK。 你可以[在这里下载 Android Studio](https://developer.android.com/studio/index.html)然后按照这些[安装步骤](https://developer.android.com/studio/install.html) 进行安装。

* 确保在安装完成 Android SDK 之后，接受其许可证。打开终端并转到安装 SDK 的文件夹，在 tools/bin 目录中调用 `sdkmanager --licenses`。

* 将 Android 添加到您的 PATH 环境变量中：

#### Unix 系统(macOS, linux)

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export PATH=$PATH:$ANDROID_SDK_ROOT/tools; PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

> 请注意，有时 `/Android/Sdk` 文件夹会被添加到用户文件夹下的 `/Library/` 中。检查你的用户文件夹，如果 `/Android/` 文件夹只存在于 `/Library/` 中，那么用 `export ANDROID_SDK_ROOT="$HOME/Library/Android/Sdk"` 或者 `export ANDROID_HOME="$HOME/Library/Android/Sdk"` 替换。

#### Windows

安装 Android Studio 后，您需要再安装两个软件：
* 来自 Oracle 的 JDK。可以在[此处找到](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Gradle. 曾经可以在 Android Studio 中使用，但是现在您必须单独安装它。Cordova 需要一个非常特定的版本（4.10.3）。您可以在[此处下载它](https://downloads.gradle-dn.com/distributions/gradle-4.10.3-all.zip)。

然后，您需要设置以下环境变量。Cordova 已经有很好的指南。可以在[此处中找到](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#setting-environment-variables)。你需要：

* 添加 ANDROID_SDK_ROOT. 它可以被安全的设置为: `%USERPROFILE%\AppData\Local\Android\Sdk`
* 将 ANDROID_SDK_ROOT 下的两个目录添加到 path 中:   `%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools`
* 将 Gradle 添加到 path 中。注意 gradle 没有安装程序，将其下载完成后得到一个压缩包，只需要将其解压，将其中的 bin 目录的路径添加到 path 中。

如果您有用于命令提示符或 Powershell 的初始化脚本，则可以尝试以下操作：
```bash
setx ANDROID_HOME "%USERPROFILE%\AppData\Local\Android\Sdk"
setx ANDROID_SDK_ROOT "%USERPROFILE%\AppData\Local\Android\Sdk"
setx path "%path%;%ANDROID_SDK_ROOT%\tools;%ANDROID_SDK_ROOT%\platform-tools;<gradle_path>\bin;"
```

安装工具后，在 Android Studio 中设置正确的 SDK 并创建一个模拟器。

* 启动 Android Studio（双击安装它的文件夹中的可执行文件）。下一步是安装各个SDK：

* 打开窗口底部的 "Configure" 菜单：

  ![SDK manager](https://cdn.quasar.dev/img/Android-Studio-SDK-Menu.png "SDK manager")

* 选择所需的 SDK。 根据 2019 年 12 月的数据，Cordova 需要android-28（Android 9.0-Pie），因此请确保将其包括在内。 点击 "Apply" 安装 SDK。

  ![SDK selection](https://cdn.quasar.dev/img/Android-Studio-SDK-selection.png "SDK selection")

### iOS 安装

你需要一个安装了 [Xcode](https://developer.apple.com/xcode/) 的 macOS 系统。安装后，请打开 Xcode 以获取许可证提示。接受许可证，然后可以将其关闭。

## 2. 为 Quasar 项目添加 Cordova 模式

为了开发/构建移动 APP，我们需要将 Cordova 模式添加到我们的 Quasar 项目中。 它所做的是使用 Cordova 脚手架 在 `/src-cordova` 文件夹中生成一个 Cordova 项目。每次构建时会覆盖 `/src-cordova/www` 文件夹

```bash
$ quasar mode add cordova
```

## 3. 添加平台
要在控制台中切换到 cordova 项目，请键入：

```bash
$ cd src-cordova
```

Quasar CLI 按需安装目标平台。但是，如果要手动添加平台，请键入：

```bash
$ cordova platform add [android|ios]
```
要验证所有准备工作是否正常，请键入：

```bash
$ cordova requirements
```

> 在一些较新的基于 Debian 的操作系统上，运行 cordova requiremets 时可能会遇到一个长期存在的问题的问题。 请参阅[安装完成后仍然报错："Android SDK not found"](/quasar-cli-vite/developing-cordova-apps/troubleshooting-and-tips#Android-SDK-not-found-after-installation-of-the-SDK)以获得帮助。


### 切换到 iOS WkWebView

强烈建议切换到 WKWebView（但可选！），因为在 iOS 12.0 中已弃用 UIWebView，如 Cordova 博客文章中所述：
 [https://cordova.apache.org/news/2018/08/01/future-cordova-ios-webview.html](https://cordova.apache.org/news/2018/08/01/future-cordova-ios-webview.html)

**但是，如果要替换默认的webview，请明智地选择。 每个都有自己的注意事项。**确保您访问上面的链接。

**然而, 是否要替换掉默认的 webview，需要仔细斟酌，因为每种方式都有自己的优缺点和注意事项。** 确保您仔细地阅读了上面的文章。

#### 选项 1: Ionic Webview 插件

1. 安装 Ionic Webview 插件

```bash
# from /src-cordova
$ cordova plugin add cordova-plugin-ionic-webview
```

2. 将 ScrollEnabled 首选项添加到 Config.xml

```xml
<platform name="ios">
  <preference name="ScrollEnabled" value="true" />
</platform>
```

3. 有关 WkWebViewPlugin 的注意事项，请参阅 Ionic 文档
  * [https://beta.ionicframework.com/docs/building/webview](https://beta.ionicframework.com/docs/building/webview)
  * [https://github.com/ionic-team/cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview)

#### 选项 2: Cordova WkWebviewEngine 插件

1. 安装 Cordova WkWebviewEngine 插件

```bash
# from /src-cordova
$ cordova plugin add cordova-plugin-wkwebview-engine
```

2. 有关注意事项和更多信息，请访问：[https://github.com/apache/cordova-plugin-wkwebview-engine](https://github.com/apache/cordova-plugin-wkwebview-engine)

## 4. 开始开发
如果您想直接开始开发，则可以跳过第2步和第3步，并运行以下命令之一。如果您的计算机连接了手机/平板电脑设备，则还可以在其真机上运行所开发的应用，而不是在模拟器中运行。

```bash
# android 和 ios 二选一
$ quasar dev -m cordova -T [android|ios]

# 传递额外的参数和/或选项给底层的“cordova”可执行文件：
$ quasar dev -m ios -- some params --and options --here
# Windows 下使用 Powershell：
$ quasar dev -m ios '--' some params --and options --here
```
如果缺少 Cordova 模式，项目将自动添加。

但是，如果您想打开 IDE（Android Studio / Xcode），然后从那里手动选择模拟器（或同时选择多个模拟器），以在其上运行开发的应用：

```bash
$ quasar dev -m [ios|android] --ide
```

::: warning
在 Android Studio 中，系统会提示您升级 Gradle 版本的消息。**请勿升级 GRADLE**，因为它会破坏 Cordova 项目。 其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 报错，请单击 File > Invalidate caches 并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

:::
