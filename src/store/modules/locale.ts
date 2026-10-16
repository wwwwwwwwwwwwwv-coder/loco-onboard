import { defineStore } from 'pinia'
import { store } from '@/store'
import { useCache } from '@/hooks/useCache'
import type { LocaleDropdownType } from '@/types/localeDropdown'

const { wsCache } = useCache()

interface LocaleState {
  locale: LocaleDropdownType
}

export const elLocaleDictionary: any = {
  'en_US': 'English',
  'zh_CN': '简体中文',
  'zh_TW': '繁体中文',
  'ja_JP': '日本語',
  'ko_KR': '한국어',
}

export const useLocaleStore = defineStore('locales', {
  state: (): LocaleState => {
    const params = new URLSearchParams(window.location.search)
    const lang: LocaleType = (params.get('lang') ||wsCache.get('lang') || 'en_US') as LocaleType
    return {
      locale: {
        lang: lang,
        name: elLocaleDictionary[lang],
      },
    }
  },
  getters: {
    getLocale(): LocaleDropdownType {
      return this.locale
    },
  },
  actions: {
    setLocale(langMap: LocaleDropdownType) {
      this.locale = langMap
      wsCache.set('lang', langMap?.lang)
      // window.location.reload()
    },
  },
})

export const useLocaleStoreWithOut = () => {
  return useLocaleStore(store)
}
