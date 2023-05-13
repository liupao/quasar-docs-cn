import { useQuasar } from 'quasar'
import { LocalStorage } from 'quasar'

export const prefix = '_q_dosc_cn_'
export const themeStoreKey = `${prefix}theme`

export function useDark () {
  const $q = useQuasar()

  function toggleDark () {
    $q.dark.toggle()
    LocalStorage.set(`${prefix}theme`, $q.dark.isActive)
  }

  function initDark () {
    $q.dark.set(LocalStorage.getItem(themeStoreKey) || false)
  }

  return {
    isDark: $q.dark.isActive,
    toggleDark,
    initDark
  }
}
