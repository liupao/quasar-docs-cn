---
title: Cordova 的常见问题和技巧
desc: (@quasar/app-vite) 使用 Quasar 和 Cordova 开发混合应用时的常见问题和技巧。
---

## $q.cordova
在使用 Cordova 模式开发移动应用程序时，您可以在 Vue 文件中访问 `$q.cordova`。 这是全局 `cordova` 对象的别名。

## Android 技巧

### Android 远程调试

如果您正在调试 Android 应用，则可以通过 USB 连接 Android 手机/平板电脑并使用 Google Chrome 远程调试[Remote Debugging](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging?hl=en)。 它也可以用于模拟器。

通过这种方式，您可以直接使用 Chrome 开发工具调试您运行的应用。检查元素、检查控制台输出等等。

![Android Remote Debugging](https://cdn.quasar.dev/img/remote-debug.png "Android Remote Debugging")
![Android Remote Debugging](https://cdn.quasar.dev/img/remote-debug-2.png "Android Remote Debugging")

### 接受许可
如果您在完成 Android 构建时遇到问题，则会看到如下消息：

```
> Failed to install the following Android SDK packages as some licenses have not been accepted.
```

如果是这种情况，您需要接受所有许可证。 值得庆幸的是，有一个工具可以解决它：

- Linux: `sdkmanager --licenses`
- macOS: `~/Library/Android/sdk/tools/bin/sdkmanager --licenses`
- Windows: `%ANDROID_SDK_ROOT%/tools/bin/sdkmanager --licenses`

### 安装完成后报错找不到 Android SDK

::: warning
环境变量  `ANDROID_HOME`  已被弃用，并被替换为  `ANDROID_SDK_ROOT`。根据您的 Android Studio 版本，您可能需要其中一个，或者干脆直接将两个都设置，也没有什么坏处。
:::

在安装完成并配置环境之后，一些较新的基于 Debian 的操作系统（例如 ubuntu，elementary OS）可能会报错：`Android SDK not found.`。 输出结果可能与此类似：

``` bash
$ cordova requirements

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: not installed
Android SDK not found. Make sure that it is installed. If it is not at the default location, set the ANDROID_HOME (or ANDROID_SDK_ROOT) environment variable.
Gradle: not installed
Could not find gradle wrapper within Android SDK. Might need to update your Android SDK.
Looked here: /home/your_user/Android/Sdk/tools/templates/gradle/wrapper
Error: Some of requirements check failed
```
这可能有两个不同的原因：通常环境变量 path 配置不正确。 第一步是验证您的 path 是否设置正确。 这可以通过运行以下命令来完成：

``` bash
$ echo $ANDROID_HOME

# or

$ echo $ANDROID_SDK_ROOT
```
预期的输出应该是一个类似于这个 `$HOME/Android/Sdk` 的路径。 然后运行：

``` bash
$ ls -la $ANDROID_HOME

# or

$ ls -la $ANDROID_SDK_ROOT
```
确保文件夹包含 SDK。预期的输出应该包含 'tools',  'sources',  'platform-tools' 等文件夹。

``` bash
$ echo $PATH
```

输出应包含 Android SDK 中的 'tools' 文件夹和 'platform-tools' 文件夹。这可能看起来像这样：

``` bash
/home/your_user/bin:/home/your_user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/your_user/Android/Sdk/tools:/home/your_user/Android/Sdk/platform-tools
```

> 如果您确定环境变量设置正确，但仍然遇到 cordova requirements 错误，则可以尝试以下修复：[手动替换 Android Studio 'tools'文件夹](https://github.com/meteor/meteor/issues/8464#issuecomment-288112504)

### Android Studio

在 Android Studio 中，系统会提示您升级 Gradle 版本的消息。**请勿升级 GRADLE**，因为它会破坏 Cordova 项目。 其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-my-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 报错，请单击 File > Invalidate caches 并重新启动。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="q-mt-md fit rounded-borders" style="max-width: 350px">

### 在 Linux 上连接设备

当尝试在 Android 手机/平板电脑上直接运行您的应用时, 您可能碰到 `?????? no permissions` 问题。

以下告诉您如何解决这个问题：

```bash
# 创建.rules 文件并写入下方的内容
sudo vim /etc/udev/rules.d/51-android.rules
sudo chmod 644   /etc/udev/rules.d/51-android.rules
sudo chown root. /etc/udev/rules.d/51-android.rules
sudo service udev restart
sudo killall adb
```

`51-android.rules`的内容：:
```
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0e79", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0502", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0b05", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="413c", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0489", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="091e", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="18d1", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0bb4", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="12d1", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="24e3", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2116", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0482", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="17ef", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1004", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="22b8", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0409", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2080", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0955", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="2257", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="10a9", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1d4d", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0471", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04da", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="05c6", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1f53", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04e8", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="04dd", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0fce", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="0930", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="19d2", MODE="0666"
SUBSYSTEM=="usb", ATTRS{idVendor}=="1bbb", MODE="0666"
```
现在运行 `adb devices` 应该会发现您的设备。


### 构建后调试

在 `quasar dev` 和分发一个完成的应用之间有一些中间状态可以帮助调试。如果您的应用程序在 `quasar dev` 上正常工作但在 `quasar build` 之后运行不正常，您有两个选择：

* 转到您的 `src-cordova` 目录然后运行 `cordova run [platform]`.
  * 您将运行最终构建版本，但您仍然可以通过有线连接（参见上文）使用 Chrome DevTools 远程调试来检查网页内部。运行.apk 文件时无法执行此操作。
  * 更多有关信息，请参考： Cordova [平台指南](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#using-buildjson) 和 [CLI reference](https://cordova.apache.org/docs/en/latest/reference/cordova-cli/index.html)
* 打开 Android Studio 并查看 Logcat
  * 在这里，您可以查看与应用程序及其与底层 Android 操作系统的交互相关的所有日志。在 Android Studio 中打开 Cordova 项目后，从顶部菜单转到 `Run`...`Debug`。Android Studio 会询问您确认设备或模拟器，然后将部署该应用程序。在底部窗口中，选择 `Logcat`。您可能希望使用过滤器来减少消息量。您应该看到 `[your app id].MainActivity.onCreate()`, 这表示应用启动，然后是与您的应用功能相关的各种消息。
  * 注意：这应该仅适用于有经验的 Android 开发人员。如果您的应用程序运行不正常，那么 `quasar dev` or `cordova run` 就更有可能提示这个问题。

::: danger 重要!
如果您使用上述方法之一发现错误，请不要直接编辑输出文件（可能是 `www` 文件夹），因为它们很快就会被覆盖。 回到您的 quasar 源文件，修复 bug，然后重新运行 quasar build。
:::

## iOS 技巧

### Device type not found
如果在运行 `$ quasar dev -m cordova -T ios` 时出现此错误：

```
No target specified for emulator. Deploying to undefined simulator
Device type "com.apple.CoreSimulator.SimDeviceType.undefined" could not be found.
```
那么这意味着您需要指定一个模拟器。 根据您的 Cordova CLI 版本，以下是一些示例：

```bash
$ quasar dev -m cordova -T ios -e iPhone-X,12.2
# 或者在您的设备上安装旧版本的 Cordova CLI：
$ quasar dev -m cordova -T ios -e iPhone-X,com.apple.CoreSimulator.SimRuntime.iOS-12-2
```

### 启用 iOS modern build

默认情况下，由于 Cordova 问题，iOS 的 Xcode modern build 已禁用。如果您明确知道自己需要它，那么可以将其开启，请从 `/quasar.config.js` 执行此操作：

```js
cordova: {
  noIosLegacyBuildFlag: true
}
```
如果您想在您的  "build.json" 文件中明确构建的类型也可以执行上述操作。

### iOS 远程调试
如果您正在调试 iOS 应用程序，则可以通过 USB 连接 iOS 手机/平板电脑并使用 Safari 开发人员工具进行远程调试。它也可以用于模拟器。

这样，您可以直接为在模拟器/手机/桌面上运行的应用程序使用 Safari 开发人员工具。检查元素、检查控制台输出等等。

首先启用 Safari 设置中的  "developer"  菜单选项。 然后，如果您导航到  "developer"  菜单选项，您将看到顶部附近列出了您的模拟器或连接设备。从这里您可以打开开发人员工具。

### 状态栏和异形屏

由于移动手机具有状态栏和或异形屏，因此在 Cordova 上构建时，应用程序的样式可能需要进行一些调整。为了防止应用程序的某些部分进入状态栏，有一个全局 CSS 变量可用于创建 “安全区域”。 然后，可以在应用程序的顶部和底部填充或边距中应用此变量。

Quasar 默认在 QHeader/QFooter 和 Notify 中支持这些 CSS 安全区域。但是，一定要检查几种型号的移动设备，看看应用程序的所有案例是否都正确处理了安全区域，这一点很重要。

如果您需要手动调整您的 CSS，您可以这样做：

```css
/* 处理应用的 header */
padding-top: constant(safe-area-inset-top); // for iOS 11.0
padding-top: env(safe-area-inset-top); // for iOS 11.2 +
/* 处理应用的 footer */
padding-bottom: constant(safe-area-inset-bottom);
padding-bottom: env(safe-area-inset-bottom);
```
当然你也可以在上面的例子中使用 `margin` 而不是 `padding` 取决于你的应用程序。

通过 Cordova 构建后，为了确保仅在在移动设备上打开时添加这些内容，您可使用由 Quasar 提供的 在 body 上的 CSS 类 `.cordova`。 例：

```css
body.cordova .my-selector {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
```

### 禁用 iOS 的橡皮筋效果
使用 Cordova 构建 IOS 应用时若想[禁用橡皮筋效果](https://www.youtube.com/watch?v=UjuNGpU29Mk)，添加下述代码到您的`/src-cordova/config.xml`

```xml
<preference name="DisallowOverscroll" value="true" />
```
