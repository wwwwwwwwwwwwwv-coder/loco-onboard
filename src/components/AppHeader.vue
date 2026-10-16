<script setup lang="ts">
import { useLocaleStore, elLocaleDictionary } from '@/store/modules/locale.ts'
import { DownOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const router = useRouter()
const route = useRoute()
const useLocale = useLocaleStore()

const onClick: MenuProps['onClick'] = ({ key }) => {
  const lang = key as LocaleType
  locale.value = lang
  useLocale.setLocale({ lang: lang, name: elLocaleDictionary[key] })

  router
    .replace({
      ...route,
      query: {
        ...route.query,
        lang: lang,
      },
    })
    .then((_) => location.reload())
}
</script>

<template>
  <div
    class="justify-end md:justify-between items-center h-60px md:h-80px px-10px md:px-16px mb-[10px] md:mb-30px flex border-b-1 border-b-solid border-b-#E9E9E9 relative z-10 bg-white"
  >
    <div class="hidden md:flex items-center">
      <img src="/logo.png" style="width: 76px" alt="" />
    </div>

    <div class="flex items-center gap-[13px]">
      <a-dropdown>
        <div class="flex items-center cursor-pointer">
          <img src="@/assets/svg/language.svg" style="width: 26px; height: 26px" alt="" />
          <span class="pl-6px pr-6px">
            {{ useLocale.locale.name }}
          </span>
          <DownOutlined />
        </div>
        <template #overlay>
          <a-menu @click="onClick">
            <a-menu-item :key="i" v-for="(v, i) in elLocaleDictionary">
              {{ v }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <div class="hidden md:flex items-center">
        <img src="@/assets/svg/User.svg" style="width: 26px; height: 26px" alt="" />
        <span class="pl-10px">
          {{ route.query.nikeName ?? 'LOCO User' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
