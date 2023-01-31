---
title: 上传器
desc: QUploader 是一个上传文件到服务端的 Vue 组件。
keys: QUploader
related:
  - /vue-components/file-picker
---

QUploader 是 Quasar 提供的文件上传组件。

::: tip
如果您只是想要一个输入文件的组件，那么您需要的可能是 [QFile](/vue-components/file-picker) 文件选择器组件。
:::

## QUploader API

<doc-api file="QUploader" />

## 用法

::: warning
QUploader 需要一个后端服务器来接收文件。下面的示例不会真正的上传。
:::

::: tip
QUploader 是兼容拖拽的。
:::

::: warning
当使用 vee-validate 时，您需要重命名  vee-validate 的 "fieldBagName" 配置以使 q-uploader 正常工作。
:::

### 设计

<doc-example title="基础" file="QUploader/Basic" />

<doc-example title="黑色模式" file="QUploader/Dark" />

### 上传多个文件

默认情况下，多个文件的上传时独立的，每个文件使用一个线程。如果您希望所有上传的文件都使用同一个线程，那么使用 `batch` 属性，见下面第二个示例。

<doc-example title="多个文件" file="QUploader/Multiple" />

### 限制上传条件

<doc-example title="基础限制" file="QUploader/RestrictionBasic" />

::: tip
在上面的示例中，我们使用的是 `accept` 属性。其值必须是以逗号分隔的唯一文件类型说明符列表。映射到原生input type=file 标签的 'accept' 属性。[更多信息](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)。
:::

::: warning
`accept` 属性的建议格式为 `<mediatype>/<extension>`。示例："image/png", "image/png"。 QUploader 在底层使用了一个 `<input type="file">`，它完全依赖于浏览器来触发文件选择器。如果 `accept` 属性（应用于 input）不正确，则不会在屏幕上显示文件选取器，或者它将出现，但它将接受所有文件类型。
:::

您还可以自定义过滤器（在用户选取文件后执行）：

<doc-example title="过滤" file="QUploader/RestrictionFilter" />

### 添加请求头

使用 `headers` 来设置上传请求的 XHR 请求头。如果您需要嵌入其他字段，那么请查看 API 部分的 `form-fields` 属性。

<doc-example title="Headers" file="QUploader/Headers" />

::: tip
`headers` 和 `form-fields` 属性都可以使用一个函数 (`(files) => Array`)，允许您根据要上传的文件动态的设置他们。
:::

使用 `with-credentials` 属性，可以将上传过程使用的 XHR 中的 `withCredentials` 设置为 `true`。

### 处理上传

<doc-example title="选择文件后自动上传" file="QUploader/UploadAuto" />

<doc-example title="自定义上传 URL" file="QUploader/UploadURL" />

::: tip
您还可以通过 `headers` 和 `method` 属性设置 HTTP 请求头和 HTTP 请求方式，请查看 API 部分。
:::

### 工厂函数

您还可以使用 `factory` 属性，它必须是一个函数，该函数需返回一个对象或者包裹对象的 Promise（如果该 Promise 失败，则  `@factory-failed` 事件会被触发）。

上述对象可以重写 QUploader 中的属性：`url`, `method`, `headers`, `formFields`, `fieldName`, `withCredentials`, `sendRaw`，对象中的字段也可以是一个 `(file[s]) => value` 格式的函数:

<doc-example title="Promise 版本的工厂函数" file="QUploader/FactoryPromise" />

您也可以使用 `factory` 立即返回相同的对象。如果您想同时设置多个属性（如上所述）时，这很有用：

<doc-example title="立即返回的工厂函数" file="QUploader/FactoryImmediate" />

### 插槽

下面的示例中，我们使用插槽实现了与默认头部等价的功能。也要注意一些可能对您有用的布尔类型的属性：`scope.canAddFiles`, `scope.canUpload`, `scope.isUploading`

::: warning
请注意，您必须安装并使用另一个组件 (QUploaderAddTrigger) 才能将文件添加到队列中。该组件需要放置在具有 `position: relative` 的 DOM 节点下：(提示：QBtn 已经具有它)，并且当用户单击其父时，将自动注入必要的事件(请勿手动添加 `@click="scope.pickFiles"`)。如果触发器不工作，请检查在它上面是否覆盖了其他元素，并相应地更改 QUploaderAddTrigger 的 zIndex。
:::

<doc-example title="自定义头部" file="QUploader/SlotHeader" />

<doc-example title="自定义文件列表" file="QUploader/SlotList" />

## 服务端示例

默认情况下，Quploader 使用 HTTP 协议上传文件（但它不限于此，您将在下面的章节中看到）。

::: tip
下面的例子只是示例，并不代表您一定要这样做，您可以以任何您想要的方式处理上传，一个 [PHP](https://secure.php.net/manual/en/features.file-upload.php)  的示例。
:::

### Nodejs
下面是一个在 Nodejs 编写的基本服务器示例。它只做接收文件的工作，所以把它当作一个起点。

```js
const
  express = require('express'),
  app = express(),
  formidable = require('formidable'),
  path = require('path'),
  fs = require('fs'),
  throttle = require('express-throttle-bandwidth')

const
  port = process.env.PORT || 4444,
  folder = path.join(__dirname, 'files')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

app.set('port', port)
app.use(throttle(1024 * 128)) // throttling bandwidth

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm()

  form.uploadDir = folder
  form.parse(req, (_, fields, files) => {
    console.log('\n-----------')
    console.log('Fields', fields)
    console.log('Received:', Object.keys(files))
    console.log()
    res.send('Thank you')
  })
})

app.listen(port, () => {
  console.log('\nUpload server running on http://localhost:' + port)
})
```

### ASP.NET MVC/Core

Quploader 与 Microsoft ASP.NET MVC/Core 2.x Web API 后端无缝集成。在 Vue 文件中，配置所需的 Web API 链接：

```html
<q-uploader
  url="http://localhost:4444/fileuploader/upload"
  label="Upload"
  style="max-width: 300px"
/>
```

如果您的服务器需要身份验证(如JWT令牌)，请使用 QUploader 的工厂函数指定 QUploadeer 将使用的 xhr 头。例如：

```html
<template>
  <q-uploader
    label="Upload"
    :factory="factoryFn"
    style="max-width: 300px"
  />
</template>

<script>
export default {
  methods: {
    factoryFn (file) {
      return new Promise((resolve, reject) => {
        // Retrieve JWT token from your store.
        const token = "myToken";
        resolve({
          url: 'http://localhost:4444/fileuploader/upload',
          method: 'POST',
          headers: [
            { name: 'Authorization', value: `Bearer ${token}` }
          ]
        })
      })
    }
  }
}
</script>
```
QUploader 的文件负载将是格式正确的 ```IFormFileCollection``` 对象，您可以通过 ASP.NET Web API 控制器的 ```.Request``` 属性读取该对象。
ASP.NET Core 2.2 Controller：

```
[Route("api/[controller]")]
[ApiController]
public class FileUploaderController : ControllerBase
{
    [HttpPost]
    public async Task upload()
    {
        // Request's .Form.Files property will
        // contain QUploader's files.
        var files = this.Request.Form.Files;
        foreach (var file in files)
        {
            if (file == null || file.Length == 0)
                continue;

            // Do something with the file.
            var fileName = file.FileName;
            var fileSize = file.Length;
            // save to server...
            // ...
        }
    }
}
```

### Spring

下面是一个 [Spring](https://spring.io/guides/gs/uploading-files/) 示例。属性 `fieldName="file"` 正在与 `@RequestPart(value = "file")` 进行映射。

```
// java
@RestController
public class UploadRest {
	@PostMapping("/upload")
	public void handleFileUpload(@RequestPart(value = "file") final MultipartFile uploadfile) throws IOException {
		saveUploadedFiles(uploadfile);
	}

	private String saveUploadedFiles(final MultipartFile file) throws IOException {
		final byte[] bytes = file.getBytes();
		final Path path = Paths.get("YOUR_ABSOLUTE_PATH" + file.getOriginalFilename());
		Files.write(path, bytes);
	}
}

// html
<q-uploader field-name="file" url="YOUR_URL_BACK/upload" with-credentials />
```

### Python/Flask

```
// python
from flask import Flask, request
from werkzeug import secure_filename
from flask_cors import CORS
import os

app = Flask(__name__)

# This is necessary because QUploader uses an AJAX request
# to send the file
cors = CORS()
cors.init_app(app, resource={r"/api/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload():
    for fname in request.files:
        f = request.files.get(fname)
        print(f)
        f.save('./uploads/%s' % secure_filename(fname))

    return 'Okay!'

if __name__ == '__main__':
    if not os.path.exists('./uploads'):
        os.mkdir('./uploads')
    app.run(debug=True)
```


### Julia/Genie

```
# Julia Genie

using Genie, Genie.Requests, Genie.Renderer

Genie.config.cors_headers["Access-Control-Allow-Origin"]  =  "*"
Genie.config.cors_headers["Access-Control-Allow-Headers"] = "Content-Type"
Genie.config.cors_headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
Genie.config.cors_allowed_origins = ["*"]

#== server ==#

route("/") do
  "File Upload"
end

route("/upload", method = POST) do
  if infilespayload(:img)                 # :img is file-name
    @info filename(filespayload(:img))    # file-name="img"
    @info filespayload(:img).data

    open("upload/file.jpg", "w") do io
      write(io, filespayload(:img).data)
    end
  else
    @info "No image uploaded"
  end

  Genie.Renderer.redirect(:get)
end

isrunning(:webserver) || up()
```

### Perl/Mojolicious

```
# Perl
use Mojolicious::Lite -signatures;
# CORS
app->hook(after_dispatch => sub {
    my $c = shift;
    $c->res->headers->header('Access-Control-Allow-Origin' => '*');
});
options '*' => sub ($c) {
   $c->res->headers->header('Access-Control-Allow-Methods' => 'GET, OPTIONS, POST, DELETE, PUT');
   $c->res->headers->header('Access-Control-Allow-Headers' => 'Content-Type');
   $c->render(text => '');
};
post '/upload' => sub ($c) {
   my $uploads = $c->req->uploads('files');
   foreach my $f (@{$uploads}) {
      $f->move_to('/tmp/' . $f->filename);
   }
   $c->render(text => 'Saved!');
};
app->start;
```

## 支持其他的服务器

QUploader 目前支持通过 HTTP(S) 协议上传。但您也可以扩展组件以支持其他服务。例如Firebase。下面是您可以做的。


::: warning 感谢您的帮助
我们很乐意接受支持其他上传服务的 PR，这样其他人也能从中受益。点击此页面顶部右上角的铅笔图标。
:::

下面是一个示例，其中包含需要提供给 `createUploaderComponent()` Quasar 工具函数 的 API。这将创建一个 Vue 组件，您可以在应用程序中导入它。

```js
// MyUploader.js
import { createUploaderComponent } from 'quasar'
import { computed } from 'vue'

// export a Vue component
export default createUploaderComponent({
  // defining the QUploader plugin here

  name: 'MyUploader', // your component's name

  props: {
    // ...your custom props
  },

  emits: [
    // ...your custom events name list
  ],

  injectPlugin ({ props, emit, helpers }) {
    // can call any other composables here
    // as this function will run in the component's setup()

    // [ REQUIRED! ]
    // We're working on uploading files
    const isUploading = computed(() => {
      // return <Boolean>
    })

    // [ optional ]
    // Shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    const isBusy = computed(() => {
      // return <Boolean>
    })

    // [ REQUIRED! ]
    // Abort and clean up any process
    // that is in progress
    function abort () {
      // ...
    }

    // [ REQUIRED! ]
    // Start the uploading process
    function upload () {
      // ...
    }

    return {
      isUploading,
      isBusy,

      abort,
      upload
    }
  }
})
```

::: tip TIPS
* 对于这种插件形式的默认 XHR 实现，请查看[源代码](https://github.com/quasarframework/quasar/blob/dev/ui/src/components/uploader/xhr-uploader-plugin.js).
* 对于UMD版本，请使用 `Quasar.createUploaderComponent({ ... })`.
:::

然后向 Vue 全局注册该组件，或者导入该组件并将其添加到 Vue 组件中的 "components: {}" 中。

```js
// globally registering your component in a boot file
import MyUploader from '../../path/to/MyUploader' // the file from above

export default ({ app }) {
  app.component('MyUploader', MyUploader)
}

// or declaring it in a .vue file
import MyUploader from '../../path/to/MyUploader' // the file from above
export default {
  // ...
  components: {
    // ...
    MyUploader
  }
}
```

如果您使用的是TypeScript，则需要注册新的组件类型，以允许 Volar 为您自动补全属性和插槽。

```js
import {
  GlobalComponentConstructor,
  QUploaderProps,
  QUploaderSlots,
} from 'quasar';

interface MyUploaderProps extends QUploaderProps {
  // .. add custom props
  freeze: boolean;
  // .. add custom events
  onFreeze: boolean;
}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    MyUploader: GlobalComponentConstructor<MyUploaderProps, QUploaderSlots>;
  }
}
```
