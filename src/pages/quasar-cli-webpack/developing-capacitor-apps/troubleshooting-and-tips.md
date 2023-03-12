---
title: Capacitor 故障与技巧
desc: (@quasar/app-webpack) 使用 Capacitor 的 Quasar 混合移动应用程序的技巧和窍门。
---

## $q.capacitor

当使用 Capacitor 模式开发移动应用程序时，可以在 Vue 文件中访问 `$q.capacitor`。这是对全局的 `Capacitor` 对象的别名。

## Android 技巧

### Android 远程调试

通过 USB 连接安卓手机/平板电脑，使用谷歌浏览器 [远程调试](https://developers.google.com/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging?hl=en)，也可以用于模拟器。

这样就可以直接使用 Chrome 开发工具在 模拟器/手机/桌面 上运行应用程序。检查元素，检查控制台输出，等等。

![Android Remote Debugging](https://cdn.quasar.dev/img/remote-debug.png 'Android Remote Debugging')
![Android Remote Debugging](https://cdn.quasar.dev/img/remote-debug-2.png 'Android Remote Debugging')

### 接受许可证

如果在使安卓系统构建完成时遇到问题，并且看到类似的信息：

```
> Failed to install the following Android SDK packages as some licenses have not been accepted.
```

如果是这种情况，需要接受所有的许可证。值得庆幸的是，有一个工具可以做到这一点：

- Linux: `sdkmanager --licenses`
- macOS: `~/Library/Android/sdk/tools/bin/sdkmanager --licenses`
- Windows: `%ANDROID_SDK_ROOT%/tools/bin/sdkmanager --licenses`

### 安装 SDK 后未找到 Android SDK

::: warning 注意
环境变量 `ANDROID_HOME` 已被废弃，取而代之的是 `ANDROID_SDK_ROOT`。根据 Android Studio 的版本，可能需要其中一个。两者都设置也无妨。
:::

一些较新的基于 Debian 的操作系统（如 ubuntu，elementary OS）在安装并（正确）配置了环境后，可能会留下 "Android SDK not found."。

这可能有两个不同的原因。通常情况下，路径没有配置正确。第一步是验证路径是否设置正确。这可以通过运行以下命令来完成：

```bash
$ echo $ANDROID_HOME

# 或者

$ echo $ANDROID_SDK_ROOT

```

预期的输出应该是一个类似于这个 `$HOME/Android/Sdk` 的路径。然后运行：

```bash
$ ls -la $ANDROID_HOME

# 或者

$ ls -la $ANDROID_SDK_ROOT
```

要确保该文件夹包含 SDK。预期的输出应该包含像 "tools"、"sources"、"platform-tools" 等文件夹。

```bash
$ echo $PATH
```

输出应该包含 Android SDK 的 "tools" 文件夹和 "platform-tools" 的每一个条目。这可能看起来像这样：

```bash
/home/your_user/bin:/home/your_user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/home/your_user/Android/Sdk/tools:/home/your_user/Android/Sdk/platform-tools
```

> 如果确保路径设置正确，但仍然得到错误，可以尝试以下修复：[手动替换 Android Studio "tools" 文件夹](https://github.com/meteor/meteor/issues/8464#issuecomment-288112504)

### Android Studio

在 Android Studio 中（如果在 `/src-capacitor/android` 上打开它），会看到一条信息，建议升级 Gradle 版本。**不要升级 Gradle**，因为这将破坏 Capacitor 项目。其他要求的升级也是如此。

<img src="https://cdn.quasar.dev/img/gradle-upgrade-notice.png" alt="Gradle upgrade" class="q-mb-md fit rounded-borders" style="max-width: 350px">

如果遇到任何 IDE 错误，那么点击 File > Invalidate caches and restart。

<img src="https://cdn.quasar.dev/img/gradle-invalidate-cache.png" alt="Gradle upgrade" class="fit rounded-borders" style="max-width: 350px">

### 在 Linux 上设置设备

当试图在安卓手机/平板电脑上直接运行应用程序时，可能会遇到 `?????? no permissions` 的问题。

以下是如何解决这个问题：

```bash
# 创建 .rules 文件并插入内容
# 在下面的例子中
sudo vim /etc/udev/rules.d/51-android.rules
sudo chmod 644   /etc/udev/rules.d/51-android.rules
sudo chown root. /etc/udev/rules.d/51-android.rules
sudo service udev restart
sudo killall adb
```

`51-android.rules` 内容如下：

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

现在运行 `adb devices` 应该可以发现设备了。

## iOS 技巧

### iOS 远程调试

如果正在调试 iOS 应用程序，可以使用 Safari 开发者工具，通过连接到 iOS 手机/平板电脑的 USB 线进行远程调试。它也可以用于模拟器。

这样，就有 Safari 开发工具直接用于应用程序在 模拟器/手机/桌面 上运行。检查元素，检查控制台输出，等等。

首先在 Safari 的设置中启用 "开发者" 菜单选项。然后，如果导航到 "开发者" 菜单选项，会在靠近顶部的位置看到模拟器或连接的设备列表。从这里可以打开开发者工具。

### 状态栏和凹槽安全区

由于手机有状态栏和凹槽，在 Capacitor 上开发时，应用程序的风格可能需要一些调整。为了防止应用程序的部分内容进入状态栏后面，有一个全局 CSS 变量可以用来创建一个 "安全区域"。这个变量可以应用于应用程序的顶部和底部填充或边缘。

Quasar 在 QHeader/QFooter 和 Notify 中默认支持这些 CSS 安全区域。然而，重要的是要经常检查 Capacitor 建立在几个模型上，看看应用程序的所有情况是否都能正确处理安全区域。

在需要手动调整 CSS 的情况下，可以这样做：

```
// 应用顶部
padding-top: constant(safe-area-inset-top) // iOS 11.0
padding-top: env(safe-area-inset-top) // iOS 11.2 +
// 应用底部
padding-bottom: constant(safe-area-inset-bottom)
padding-bottom: env(safe-area-inset-bottom)
```

当然，也可以根据应用，用 `margin` 代替 `padding` 来使用上述例子。
