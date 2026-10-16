import { defineStore } from 'pinia'
import { store } from '@/store'
import router from '@/router'
// import type { LocaleDropdownType } from '@/types/localeDropdown'
import { countryApi, currencyApi } from '@/api'

export const useConfigStore = defineStore('configStore', {
  state: (): any => ({
    loading: true,
    country: { all: [] }, // 国家
    currency: { all: [] }, // 货币
  }),
  getters: {
    tempToken: () => {
      return router.currentRoute.value.query?.t ?? ''
    },
  },
  actions: {
    async getCountry() {
      // 获取国家列表
      const { data } = await countryApi({})
      this.country = data
    },
    async getCurrency() {
      // 获取货币列表
      const { data } = await currencyApi({})
      this.currency = data
    },
  },
})
export const useConfigStoreWithOut = () => {
  return useConfigStore(store)
}
