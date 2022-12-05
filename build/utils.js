// eslint-disable-next-line
const specialRE = /[\s·/_\\,:;\.\(\)\[\]]+/g
const andRE = /&/g
const nonWordRE = /[^\u4e00-\u9fa5\w-]+/g
const multipleDashRE = /--+/g

module.exports.slugify = str => {
  return String(str)
    .toLowerCase()
    .replace(specialRE, '-')
    .replace(andRE, '-and-')
    .replace(nonWordRE, '')
    .replace(multipleDashRE, '-')
}
