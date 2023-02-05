require('./search/index')

const fs = require('fs/promises')
const path = require('path')

async function run () {
  const oldDir = path.resolve(__dirname, '..', 'public', 'quasar-api')
  const originDir = path.resolve(__dirname, '..', 'node_modules', 'quasar', 'dist', 'api')
  const originApisFile = await fs.readdir(originDir)

  for (const apiFile of originApisFile) {
    const originPath = path.resolve(originDir, apiFile)
    const oldFilePath = path.resolve(oldDir, apiFile)
    const tarPath = oldFilePath
    const origin = require(originPath)

    let oldApi
    try {
      oldApi = require(oldFilePath)
    } catch (error) {
      console.log('版本新增的 api 文件', apiFile)
      fs.writeFile(tarPath, JSON.stringify(origin, undefined, 2))
      continue
    }

    transformer(origin, oldApi, originPath)
    await fs.mkdir(path.dirname(tarPath), {
      recursive: true
    })
    fs.writeFile(tarPath, JSON.stringify(origin, undefined, 2))
  }
}

function transformer (origin, old, apiFile) {
  for (const key in origin) {
    if (Array.isArray(origin[ key ])) continue
    if (!old || !(key in old)) {
      if (key === 'desc' || (typeof origin[ key ] === 'object' && isObjNeedHanle(origin[ key ]))) {
        console.log(`${apiFile} 中，版本新增了 ${key} 字段`)
      }
      continue
    }
    if (typeof origin[ key ] === 'object') {
      transformer(origin[ key ], old[ key ], apiFile)
    } else if (key === 'desc') {
      if (origin[ key ] !== old[ key ]) {
        console.log(`${apiFile} 中,${key} 字段发生了变化，请处理`, `新：${origin[ key ]},旧：${old[ key ]}`)
        continue
      }
      if (!old.desc_cn) {
        console.log(`${apiFile} 中,${origin[ key ]} 语句还未翻译，请处理`)
      }
      origin.desc_cn = old.desc_cn
    }
  }
}

function isObjNeedHanle (val) {
  if (typeof val !== 'object') throw new Error('这个函数只能处理对象')
  let res = false
  for (const key in val) {
    if ('desc' in val) return true
    if (typeof val[ key ] === 'object' && !Array.isArray(val[ key ])) res = res || isObjNeedHanle(val[ key ])
  }
  return res
}

run()
