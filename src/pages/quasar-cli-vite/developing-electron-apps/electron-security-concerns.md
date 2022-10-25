---
title: Electron 安全问题
desc: (@quasar/app-vite) 开发 Quasar 桌面应用时，您需要知道的安全问题。
---

如果您在开发 Electron 应用程序时没有保持警惕，您可能会将用户置于有形的数字危险中。像 XSS（跨站点脚本）和远程代码执行之类的东西可以让攻击者深入访问应用程序中的数据，甚至可能是底层操作系统。

特别是在“公开”（如开源项目）工作时，您肯定需要考虑使用代码签名和完整性检查来强化应用程序。（请参阅“提示”部分）

::: danger
在任何情况下都不应加载和执行远程代码。相反，只使用本地文件（与应用程序打包在一起）在主线程和/或预加载脚本中执行 Node.js 代码。
:::

## 安全建议清单
Electron 团队提出以下建议：

1.  确保将 `webPreferences` > `contextIsolation` 设置为 `true`。 使用 [preload script](/quasar-cli-vite/developing-electron-apps/electron-preload-script) 只注入必要的 Api 给渲染进程
2.  如果必须加载远程内容，并且无法绕过这个问题，那么[只加载安全内容](https://electronjs.org/docs/tutorial/security#1-only-load-secure-content)
3.  在所有远程加载的 sessions 中[使用 `ses.setPermissionRequestHandler()`](https://electronjs.org/docs/tutorial/security#4-handle-session-permission-requests-from-remote-content)
4.  [不要禁用  `webSecurity`](https://electronjs.org/docs/tutorial/security#5-do-not-disable-websecurity)
5.  [不要设置  `allowRunningInsecureContent`  为  `true`](https://electronjs.org/docs/tutorial/security#7-do-not-set-allowrunninginsecurecontent-to-true)
6.  [不要使用实验性的特性](https://electronjs.org/docs/tutorial/security#8-do-not-enable-experimental-features)
7.  [不要使用  `enableBlinkFeatures`](https://electronjs.org/docs/tutorial/security#9-do-not-use-enableblinkfeatures)
8.  [`<webview>`: 不要使用 `allowpopups`](https://electronjs.org/docs/tutorial/security#10-do-not-use-allowpopups)
9.  [`<webview>`: 验证选项和参数](https://electronjs.org/docs/tutorial/security#11-verify-webview-options-before-creation)
10.  [禁用或限制导航](https://electronjs.org/docs/tutorial/security#12-disable-or-limit-navigation)
11.  [禁用或限制创建新窗口](https://electronjs.org/docs/tutorial/security#13-disable-or-limit-creation-of-new-windows)

除了 3 和 4，Electron 都会在检测到相关行为时在控制台打印一个警告。

## 提示和技巧

#### 通信协议

您现在应该知道这一点，如果您没有使用 **https** / **sftp** / **wss**，那么应用程序与外界的通信很容易被篡改。无论您正在开发什么，请在任何地方都使用安全协议。

#### 文件系统权限
拥有对文件系统的读写权限是渗透测试人员的圣杯，如果您的应用程序支持这种类型的交互，请考虑使用 IPC 和具有不同的权限多个窗口，以最小化攻击面。

#### 加密
如果应用程序的用户有钱包地址、个人信息或其他商业机密等机密，请在静止时对这些信息进行加密，只有在需要时才在内存中取消加密，并确保在处理完对象后覆盖/销毁内存中的对象。但无论您如何做到这一点，都要遵循以下四条规则：

1. 使用高等级的加密 （collision resistant 而不是 md5）
2. 不要发明新型加密
3. 明确遵循实现说明
4. 考虑用户体验

#### 生产版本中关闭调试工具

您肯定不希望别人您的应用程序的控制台上执行类似的东西:

```js
window.location='https://evilsite.com/looks-just-like-your-app'
```

<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>I</kbd>  （Mac 上是 <kbd>ALT</kbd>+<kbd>CMD</kbd>+<kbd>I</kbd> ） 快捷键会打开调试工具，
您可以捕获这些快捷键并 `return false` 来防止简单的 `evil maid` 攻击。

#### 发布校验和

当您构建了二进制项目，并要将其发布时（例如发布到 GithHub 上），使用 `shasum` 生成一个校验码并将它放在显眼的地方（例如您项目的 GitHub 的 release 页面）。
```bash
$ shasum -a 256 myApp-v1.0.0_darwin-x64.dmg
40ed03e0fb3c422e554c7e75d41ba71405a4a49d560b1bf92a00ea6f5cbd8daa myApp-v1.0.0_darwin-x64.dmg
```

#### 将构建产物签名
尽管不是硬性要求，但是签名代码是一种最佳做法—— MacOS 和 Windows 商店都需要签名后才能发布，参考[ Electron 官方指南](https://electronjs.org/docs/tutorial/code-signing)


#### 使用 SNYK
[Snyk.io](https://snyk.io) 是一种服务，CLI 甚至 GitHub 的集成机器人，它通过比较软件包中的依赖项与其受损模块列表来跟踪漏洞。在许多情况下，他们的服务可以推荐可更新的最低安全版本，甚至提供他们自己修补过的模块。他们还进行研究和漏洞披露。举个例子，如果您正在使用压缩文件（zip、tar 等），查看它们的[文章](https://snyk.io/research/zip-slip-vulnerability)和[受影响的软件列表](https://github.com/snyk/zip-slip-vulnerability)，结果可能会吓到您。


#### 对于真正的偏执狂
为每个平台目标使用专用的物理桌面计算机。如果您必须保持此设备在线上，请确保始终更新操作系统，零允许从 Internet / Bluetooth（尤其是用于 Shell / SSH）的入站连接，并运行持续不断的病毒和 rootkit 检查。

只允许 GPG 签名的提交被合并，并要求至少两个团队成员（提交以外的成员）审查和批准提交。

重新考虑您的 node 包管理系统：
- 使用一个私有源（例如 [JFrog](https://jfrog.com/)）
- 将您的软件包修复为已知可以工作的特定版本
- 使用 pnpm
- 审核每个模块及其依赖项

#### 付费给黑客
某些聪明人可能已经黑进了你的项目（或者底层库）。如果你正在用这个应用赚钱，可以考虑注册一个 [Hacker One](https://hackerone.com) 账户，并在上面发布一个持续的赏金奖励。至少你能说服黑客遵守道德，不要把漏洞卖给你的竞争对手。

#### 获取帮助
您可能会感到不知所措，因为 Electron 伟大的同时也带来了很多您从未想过的头痛。如果是这样的话，可以考虑[联系](mailto:razvan.stoenescu@gmail.com)经验丰富的 Quasar 框架开发人员团队为您的应用程序进行审查、审核和强化，并获得专家支持。

<q-separator class="q-mt-xl" />

> 部分内容摘自 [Electron 安全指南](https://electronjs.org/docs/tutorial/security)。
