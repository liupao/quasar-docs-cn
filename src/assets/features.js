import menu from './menu.json'

function normalizeComps (list) {
  const acc = [
    {
      name: 'Layout',
      path: 'layout'
    },
    {
      name: 'Layout Header',
      path: 'header-and-footer'
    },
    {
      name: 'Layout Footer',
      path: 'header-and-footer'
    },
    {
      name: 'Layout Drawer',
      path: 'drawer'
    },
    {
      name: 'Layout Page',
      path: 'page'
    },
    {
      name: 'Page Sticky',
      path: 'page-sticky'
    },
    {
      name: 'Page Scroller',
      path: 'page-scroller'
    }
  ].map(entry => ({ ...entry, path: `/layout/${entry.path}` }))

  list.forEach(entry => {
    if (entry.children) {
      acc.push(
        ...(entry.children.map(entry => ({ ...entry, path: `/vue-components/${entry.path}` })))
      )
    }
    else {
      acc.push({ ...entry, path: `/vue-components/${entry.path}` })
    }
  })

  return acc.sort((a, b) => a.name.localeCompare(b.name))
}

export default {
  comps: normalizeComps(menu.find(entry => entry.name === 'Vue 组件').children),
  dirs: menu.find(entry => entry.name === 'Vue 指令').children.map(entry => ({ ...entry, path: `/vue-directives/${entry.path}` })),
  plugins: menu.find(entry => entry.name === 'Quasar 插件').children.map(entry => ({ ...entry, path: `/quasar-plugins/${entry.path}` }))
}
