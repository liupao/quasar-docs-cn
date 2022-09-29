---
title: 发布到应用商店
desc: (@quasar/app-vite) 如何用 Capacitor 发布 Quasar 混合移动应用程序到谷歌商店和苹果商店。
---

所以，已经完成了移动应用程序的工作。现在是时候部署它了。来学习一下。

## Android 发布

为了生成 Android 的发布版本，可以使用以下 Quasar CLI 命令：

```bash
$ quasar build -m capacitor -T android
```

这将编译 web 资源（如果 "--ide" 参数也被指定，它将打开 Android Studio IDE，在那里可以手动触发发布构建）。

接下来，找到由 Android Studio 生成的未签名 APK 文件。现在，需要签署未签署的 APK，并对其运行一个对齐工具，以优化它并为应用商店做准备。如果已经有了一个签名密钥，请跳过这些步骤，用这个密钥代替。

使用 JDK 附带的 keytool 命令来生成私钥。如果没有找到这个工具，请参考安装指南：

```bash
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 20000
```

首先会被提示为钥匙库创建一个密码。然后，回答好其他问题，当它全部完成后，应该会在当前目录下创建一个名为 my-release-key.keystore 的文件。

::: danger 重要
确保将此文件保存在安全的地方，如果丢失了它，将无法提交应用程序的更新！
:::

要签署未签署的 APK，运行 JDK 中包含的 jarsigner 工具：

```bash
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore <path-to-unsigned-apk-file> alias_name
```

这样就把 apk 签署好了。最后，需要运行 zip 对齐工具来优化 APK。zipalign 工具可以在 `/path/to/Android/sdk/build-tools/VERSION/zipalign` 找到。例如，在安装了 Android Studio 的 OS X 系统上，zipalign 是在 `~/Library/Android/sdk/build-tools/VERSION/zipalign`：

```bash
$ zipalign -v 4 <path-to-same-apk-file> HelloWorld.apk
```

现在有了名为 HelloWorld.apk 的最终发布二进制文件，可以在谷歌商店上发布，让全世界的人都能享受到这一成果！

（还有一些其他方法来签署 APK。更多信息请参考官方的安卓应用签名文档）。

### 谷歌商店

现在已经为谷歌商店准备好了要发布 APK，创建商店清单并上传 APK。

首先，需要访问 [谷歌商店开发者控制台](https://play.google.com/apps/publish) 创建一个开发者账号。不幸的是，这并不是免费的。然而，与苹果的 99 美元相比，费用只有 25 美元。

一旦有一个开发者账户，就可以继续点击 "Publish an Android App on Google Play"。

然后，可以继续点击按钮，编辑商店列表（稍后将上传APK）。填写该应用程序的描述。

当准备好后，上传发布构建的 APK。耐心等待，辛勤工作会使得世界变得与众不同！

### 更新应用

当开发应用程序时，会有定期的更新。

为了让谷歌商店接受更新的 APK，需要提升应用程序的版本（修改 `/package.json` 或 `/quasar.config.js > capacitor > version`，然后重建应用程序进行发布。

## iOS 发布

首先，需要加入 [苹果开发者计划](https://developer.apple.com/programs/)。与谷歌一样，如果在苹果有一个个人账户，就可以创建应用程序。

### 将 Xcode 与开发者账户连接起来

在收到开发者身份后，在 Mac 上打开 Xcode 并进入 首选项 > 账户。点击左下角的 "+" 按钮，将账户添加到 Xcode，并按照说明操作。

### 签名

现在已经把 Xcode 和开发者账户联系起来了，进入 偏好设置 > 账户，在左边选择 Apple Id，然后点击查看细节按钮。

点击 iOS 分布选项旁边的创建按钮。

可以从官方文件中了解更多关于维护签名身份和证书的信息。

### 设置应用程序的标识符

接下来，通过苹果开发者会员中心，设置应用程序 ID 标识符的详细信息。标识符用于允许一个应用程序访问某些应用程序服务，例如，Apple Pay。可以用苹果 ID 和密码登录到苹果开发者会员中心。

一旦登录了，应该选择证书、识别码和配置文件选项。同时选择 iOS 应用程序下的识别器选项。然后选择 "+" 按钮，以添加一个新的 iOS 应用程序 ID。

然后要设置应用程序的名称，使用 Explicit App ID 选项，并将 Bundle ID 设置为 capacitor.config.json 中的 id 值。

此外，要选择任何需要启用的服务。例如，如果在应用程序中使用苹果支付或钱包，需要选择这些选项。

可以从 [官方文档](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html) 了解更多关于注册应用程序标识符的信息。

### 创建应用程序清单

苹果使用 iTunes Connect 来管理应用程序的提交。登录后，应该选择 "我的应用程序" 按钮，并在下一个屏幕上选择 "+" 按钮，就在 iTunes Connect 应用程序标题的下方。

这将在一个下拉菜单中显示三个选项，应该选择新的应用程序。之后会出现弹出窗口，必须选择应用程序的名称、平台、主要语言、捆绑 ID 和 SKU。

完成后，点击 "创建" 按钮，会看到一个屏幕，必须设置一些基本选项，如隐私政策网址、类别和子类别。

现在，在填写清单中的所有内容之前，将构建应用程序并通过 Xcode 上传。然后再回来完成清单。

可以从 [官方文档](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/UsingiTunesConnect/UsingiTunesConnect.html) 了解更多关于在 iTunes Connect 中管理应用程序的信息。

### 为生产构建应用程序

```bash
$ quasar build -m capacitor -T ios
```

这将编译 web 资源（如果 "--ide" 参数也被指定，它将打开 Xcode，在那里需要手动触发一个发布构建）。

### 在 Xcode 中配置项目

一旦 Xcode 打开项目（需要 "--ide" 参数），应该在总视图中看到关于应用程序的细节。

只需检查捆绑标识符的设置是否正确，以便它与先前在应用程序 ID 中指定的值相同。另外，确保版本和构建号是正确的。团队选项应该被设置为苹果开发者账户。在部署目标下，可以选择应用程序将支持哪些设备。

### 创建应用程序的存档

在 Xcode 中，选择 Product > Scheme > Edit Scheme 来打开方案编辑器。接下来，从左手边的列表中选择 Archive。确保 Build 配置被设置为 Release。

要创建一个存档，从项目编辑器的 Scheme 工具栏菜单中选择一个通用的 iOS 设备，或者个人设备，如果它连接到 Mac（如果选择模拟器，就不能创建一个存档）。

下一步，选择 Product > Archive，会出现 "归档" 组织者，并显示新的归档。

在这一点上，可以点击 "Upload to App Store..." 按钮，如果一切顺利，将有一个上传的应用程序，唯一要做的是完成 iTunes 连接列表并提交审查！

在这一点上，应该在上传了带有内容的档案后不久收到 iTunes Connect 的电子邮件。

### 完成应用程序列表流程

现在应该回到 iTunes Connect 门户网站并登录。接下来，点击左侧 APP STORE 信息下的定价和可用性。

不必担心忘记插入关于申请的任何关键和必要的信息，因为如果试图在所有细节填写之前提交申请进行审查，会被通知缺少什么和需要添加/修改什么。

接下来，点击左侧的 1.0 准备提交按钮，如下图所示。当上传时，iTunes Connect 自动确定哪些设备尺寸是支持的。需要为 iTunes Connect 检测到的各种应用尺寸上传至少一张截图图片。

接下来，将不得不插入描述、关键词、支持网址和营销网址（可选）。

在构建部分，必须点击 "+" 按钮并选择在前面的步骤中通过 Xcode 上传的构建。

接下来，将不得不上传图标，编辑评级，并设置一些额外的信息，如版权和个人信息。请注意，在这里要上传的图标的尺寸必须是 1024×1024 像素。幸好，可以使用第二个教程中的 splash.png。如果是唯一的开发者，那么应用程序评论信息中的数据应该是自己的。最后，作为最后一个选项，可以保留默认勾选的选项，一旦应用程序被批准，它就会自动发布到 App Store。

现在，已经完成了对应用程序清单的所有细节的添加，可以按 "保存"，然后提交审查。最后，将会看到必须填写的最后一个表格。

在提交应用程序进行审查后，会在我的应用程序中看到它的状态为等待审查，如下图所示。此外，在提交应用程序进行审查后不久，会从 iTunes Connect 收到一封确认电子邮件，说明应用程序正在审查中。

苹果为自己的人工审查过程感到自豪，这基本上意味着应用程序可能需要几天的时间才能得到审查。会被通知任何问题或应用程序状态的更新。

### 更新应用程序

想在某些时候更新应用程序，首先需要提升应用程序的版本（修改 `/package.json`），然后重建应用程序以便发布。一旦 Xcode 打开，重新按照同样的步骤进行操作。

一旦提交审查，将不得不再次等待审查过程。
