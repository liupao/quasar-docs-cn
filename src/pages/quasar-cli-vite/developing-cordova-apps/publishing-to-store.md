---
title: 发布应用到商店
desc: (@quasar/app-vite) 如果发布一个使用 Quasar 和 Cordova 开发的混合应用到 google 和 apple 商店。
---

所以你已经完成了你的移动 APP 的工作。 现在是部署它的时候了。 让我们学习如何部署。

## Android 发布
要为 Android 生成发布版本，我们可以使用以下 Quasar CLI 命令：

```bash
$ quasar build -m cordova -T android
# 或者更短的格式
$ quasar build -m android
```

这将根据你的 `/src-cordova/config.xml` 中的设置生成一个发布版本。

接下来，我们可以在 "/src-cordova/platforms/android/app/build/outputs/apk/release" 或等效路径（写在终端输出中）中找到我们未签名的 APK 文件。文件名通常以 "-release-unsigned.apk" 结尾。 现在，我们需要签名未签名的 APK 并在其上运行 align 工具来对其进行优化，并为应用商店做好准备。 如果您已经有签名密钥，请跳过这些步骤并改为使用该密钥。

让我们使用 JDK 附带的 keytool 命令生成我们的私钥。 如果找不到该工具，请参阅安装指南：

```bash
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 20000
```

您将首先被提示为密钥库创建密码。 然后，回答剩下的关于好工具的问题。完成之后，应该在当前目录中有一个名为 my-release-key. keystore 的文件。

::: danger
确保将这个文件保存在安全的地方，如果你失去了它，你将无法提交更新到你的 APP！
:::

要签名未签名的 APK，请运行 JDK 内置的 jarsigner 工具：

```bash
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore <path-to-unsigned-apk-file> alias_name
```

完成 apk 签名后，我们需要运行 zipalign 工具来优化 APK。zipalign 工具可以在 `/path/to/Android/sdk/build-tools/VERSION/zipalign` 中找到。例如，在安装了 Android Studio 的 OS X 上，zipalign 位于 `~/Library/Android/sdk/build-tools/VERSION/zipalign` 中:


```bash
$ zipalign -v 4 <path-to-same-apk-file> HelloWorld.apk
```
现在我们有了我们的最终版本二进制文件 HelloWorld.apk，我们可以在 Google Play 商店上发布这个二进制文件，供全世界享用！

（还有其他一些签名 APK 的方法，请参阅官方的 Android 应用签名文档以获取更多信息。）

### Google Play 商店
现在我们已经为 Google Play 商店准备好了我们的 APK 版本，我们可以创建 Play 商店列表并上传 APK。

首先，您需要访问 [Google Play 商店开发者控制台](https://play.google.com/apps/publish)并创建一个新的开发者帐户。不幸的是，这不是免费的。但是，与苹果的 99 美元相比，成本仅为 25 美元。

拥有开发者帐户后，您可以继续并点击“在 Google Play 上发布 Android 应用”。

然后，您可以继续并点击该按钮来编辑商品详情（我们稍后会上传 APK）。您需要填写该应用的说明。

准备就绪后，请上传适用于发布版本的 APK，并发布商品详情。要有耐心，你的辛勤工作将会有回报！

### 更新您的应用
在开发 APP 时，您需要定期更新它。

为了使谷歌 Play 商店接受更新的 APK，您需要更改 APP 版本（在 `/package.json` 或 `/quasar.config.js > cordova > version` 中)，然后重新发布该 APP。

## iOS 发布
首先，您需要注册 [Apple Developer Program](https://developer.apple.com/programs/)。与 Google 一样，如果您有 Apple 个人帐户，则可以为您的 APP 创建一个额外的帐户。

### 在 Xcode 中连接您的账户
得到开发者身份后，在 Mac 上打开 Xcode 并转至 Preferences > Accounts。通过单击左下角的 `+` 按钮将您的帐户添加到 Xcode 中，然后按照说明进行操作。

### 签名

现在，您已将 Xcode 与开发者帐户相关联，然后转至 Preferences > Accounts，在左侧选择您的 Apple ID，然后单击上一张图片中显示的 View Details 按钮。

点击 iOS Distribution 选项旁边的 Create 按钮。

您可以从官方文档了解更多有关维护签名身份和证书的信息。

### 设置 APP 标识符
接下来，通过 Apple Developer Member Center，我们将设置 APP ID 标识符的详细信息。标识符用于允许 APP 访问某些 APP 服务，例如 Apple Pay。您可以使用 Apple ID 和密码登录 Apple Developer Member Center。

登录后，应选择 “Certificates, Identifiers, and Profiles” 选项。另请选择 iOS APP 下的 Identifiers 选项。然后选择 `+` 按钮以添加新的 iOS App ID。

然后，您必须设置 APP 的名称，然后使用 “Explicit App ID” 选项并将 Bundle ID 设置为 Cordova config.xml 标记中 id 的值。

另外，您必须选择任何需要启用的服务。例如，如果您在 APP 中使用 Apple Pay 或电子钱包，则需要选择这些选项。

您可以从[官方文档](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingProfiles/MaintainingProfiles.html)了解更多关于注册 APP 标识符的信息。

### 创建 APP 列表

Apple 使用 iTunes Connect 管理 APP 提交。登录后，您应该选择 My Apps 按钮，然后在下一个屏幕上选择 iTunes Connect My Apps 标题下方的 `+` 按钮。

这将在下拉菜单中显示三个选项，您应该选择 New App。在此之后，出现弹出窗口，您必须选择 APP 的名称、平台、主要语言、软件包 ID 和 SKU。

一旦你完成了，点击 Create 按钮，你会看到一个屏幕，你必须设置一些基本的选项，如隐私政策的 URL、类别和子类别。

现在，在我们填写列表中的所有内容之前，我们将构建我们的 APP 并使用 Xcode 上传。然后你会回来完成列表。

您可以从[官方文档](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/UsingiTunesConnect/UsingiTunesConnect.html)了解有关在 iTunes Connect 中管理 APP 的更多信息。

### 构建生产版本的 APP

```bash
$ quasar build -m cordova -T ios
# 或更短的形式：
$ quasar build -m ios

# 将额外的参数和/或选项传递给底层的“cordova”可执行文件：
$ quasar build -m ios -- some params --and options --here
```

如果一切顺利，您将在控制台中看到 `BUILD SUCCEEDED` 输出。

### 在 Xcode 中打开项目

现在，使用 Xcode 打开 `/src-cordova/platforms/ios/<name>.xcodeproj` 文件。

一旦 Xcode 打开该项目，您应该在常规视图中看到有关您的 APP 的详细信息。

您应该检查 bundle 标识符是否设置正确，以便它与您在前面指定的值相同。另外，请确保版本和内部版本号是正确的。Team 选项应设置为您的 Apple 开发者帐户。在部署目标下，您可以选择 APP 将支持的设备。

### 创建 App 的压缩包
在 Xcode 中，选择 Product> Scheme> Edit Scheme 打开 Scheme 编辑器。接下来，从左侧列表中选择 Archive。确保 Build 配置设置为 Release。

要创建一个 archive，请从项目编辑器的 Scheme 工具栏菜单中选择一个 Generic iOS 设备，或者您的连接到 Mac 的设备（如果选择了模拟器，则无法创建 archive）。

接下来，选择 Product > Archive， archive 管理器出现并显示新的 archive。（如果出现报错，返回上一步并打开 `<name>.xcworkspace`。）

此时您可以点击 `Upload to App Store …` 按钮，如果一切顺利，您将拥有一个上传的 APP，唯一需要做的就是完成 iTunes Connect 列表并将其提交以供审核！

此时，您应在上传带有内容的档案后不久收到来自 iTunes Connect 的电子邮件。

### 完成 APP 列表程序
现在您应该回到 iTunes Connect 门户并登录。接下来，点击 APP STORE INFORMATION 下左侧的 Pricing and Availability。

您不必担心忘记插入关于您的 APP 的任何关键和必需的信息，因为如果您在提交 APP 以供审查之前，您会收到关于缺少的内容和需要添加/更改的内容的通知。

接下来，点击左侧的 1.0 Prepare for Submission 按钮，如下图所示。当我们上传我们的存档时，iTunes Connect 会自动确定支持哪种设备尺寸。您需要至少上传 iTunes  Connect 检测到的各种应用尺寸的每个截图。

接下来，您需要插入说明，关键字，支持网址和营销网址（可选）。

在 Build 部分中，你必须点击 `+` 按钮并选择在前面的步骤中通过 Xcode 上传的版本。

接下来，您必须上传图标，修改评分，并设置一些其他信息，例如版权和您的信息。请注意，在此上传的图标大小必须为 1024 x 1024 像素。谢天谢地，你可以使用第二个教程中的 splash.png。如果您是唯一的开发者，那么 App Review 信息中的数据应该是您自己的。最后，作为最后一个选项，您可以保留默认选中的选项，一旦您的 APP 获得批准，它将自动发布到 App Store。

现在我们将所有细节添加到了 APP 列表中，我们可以先按 Save 按钮,然后按 Submit 按钮以供审核。最后，你会看到你必须填写的最后一张表格。

将您的 APP 提交审核后，您会在我的 My Apps as Waiting for review 中看到它的状态，如下图所示。此外，在您提交 APP 以供审核后不久，您将收到来自 iTunes Connect 的确认电子邮件，表示您的 APP 正在审核中。

苹果公司以人工审核程序引以为傲，这基本上意味着您的应用程序可能需要几天时间才能被审核。您会收到关于您的 APP 状态的任何问题或更新的通知。

### 更新您的应用
由于您可能需要在某个时候更新您的 APP，因此您首先需要对 APP 版本进行更新（在 `/package.json` 或 `/quasar.config.js > cordova > version` 中），然后重新构建 APP 以便发布。最后，您必须从 Xcode 中打开它，然后再次执行相同的步骤。

一旦你提交审核，你将不得不再次等待审核过程。
