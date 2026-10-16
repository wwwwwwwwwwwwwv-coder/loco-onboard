// plugins/vue-i18n.js

import { createI18n } from 'vue-i18n'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { setHtmlPageLang } from './helper'
import translations from './translations'

const localeStore = useLocaleStoreWithOut()
const locale = localeStore.getLocale

setHtmlPageLang(locale.lang)

const i18n = createI18n({
  locale: locale.lang,
  fallbackLocale: 'en_US',
  warnHtmlInMessage: 'off', // Disable HTML message warnings
  messages: translations
})

export default i18n
