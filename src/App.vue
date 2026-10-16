<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
// import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'

import { RouterView } from 'vue-router'
import { useLocaleStore } from '@/store/modules/locale.ts'

const useLocale = useLocaleStore()

const themeOverride: any = {
  token: {
    controlHeight: 40, // 通用高度
    fontSize: 16,      // 全局字体
  },
  // components: {
  //   Input: {
  //     controlHeight: 80,        // 确保 Input 单独也设
  //     paddingBlock: 24,         // 上下内边距
  //     fontSize: 24,              // Input 内字体大小
  //   },
  //   Select: {
  //     controlHeight: 80,
  //     fontSize: 24,
  //     optionHeight: 80,          // 下拉选项高度
  //   },
  // },
}
</script>

<template>
  <a-config-provider
    :theme="themeOverride"
    componentSize="large"
    :locale="useLocale.locale.lang === 'en_US' ? enUS : zhCN"
  >
    <app-header />
    <RouterView />
  </a-config-provider>
</template>

<style lang="scss" scoped></style>
