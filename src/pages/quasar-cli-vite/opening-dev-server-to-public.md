---
title: 向公众开放开发服务器
desc: (@quasar/app-vite) 如何向因特网上的任何人提供对开发服务器的临时访问。
---

在某些时候，可能需要向其他人展示正在进行的项目。有几个很不错的工具可以做到这一点，[localhost.run](https://localhost.run/) 和 [Ngrok](https://ngrok.com/)。两者都为您的开发服务器创建连接，并且（默认情况下）在其各自的服务器上自动生成一个因特网地址，以提供给您的客户。

::: warning 警告
向公众开放开发服务器会带来安全风险。 使用这样的工具时要绝对小心。

完成演示或测试后，请确保停止 localhost.run 或 ngrok。防止别人通过它们对您的计算机进行任何不必要的访问
:::

## 使用 localhost.run （最简单）

1. 假设您有一个SSH shell，您只需要运行以下命令（替换您的详细信息）
``` bash
$ ssh -R 80:localhost:8080 ssh.localhost.run
# 如果您的开发服务器不在端口 8080 上运行，则需要将数字更改为正确的端口
```

2. 就这样，现在您将有一个基于当前系统用户名分配给您的随机子域，如下所示：
``` bash
$ ssh -R 80:localhost:8080 ssh.localhost.run
Connect to http://fakeusername-random4chars.localhost.run or https://fakeusername-random4chars.localhost.run
Press ctrl-c to quit.
```

当前无法请求自己的子域。

## 使用 Ngrok

1. 下载并安装 ngrok [here](https://ngrok.com/download)。（请注意，ngrok 可执行文件不需要放在 cordova 文件夹中或从中运行。在 mac 上，最好将 ngok 可执行文件放在 `/usr/local/bin` 中，以便能够全局运行它。）

2. 启动开发服务器
``` bash
$ quasar dev
```

3. 创建 ngrok 连接
``` bash
$ ngrok http 8080
# 如果您的开发服务器不在端口 8080 上运行，则需要将数字更改为正确的端口
```

4. 当启动成功后，ngrok 会在命令行中显示 url。
``` bash
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://92832de0.ngrok.io -> localhost:8080
Forwarding                    https://92832de0.ngrok.io -> localhost:8080

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```
请小心注意，在关闭此连接之前，任何人都可以访问或“转发” URL。

### 检查流量

当运行 ngrok 时，访问 `http://localhost:4040` 可检查访问流量。

该工具允许自定义域、密码保护等。如果您需要进一步的帮助，请参阅 [ngrok 文档](https://ngrok.com/docs)以获取更多信息。