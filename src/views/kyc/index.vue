<script setup lang="ts">
import { useConfigStore } from '@/store/modules/config.ts'

const useConfig = useConfigStore()

const loading = ref(true)

const loadData = async () => {
  await Promise.all([useConfig.getCountry(), useConfig.getCurrency()])
  loading.value = false
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <a-spin :spinning="loading">
    <router-view />
  </a-spin>
</template>

<style scoped lang="scss"></style>
