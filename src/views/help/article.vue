<script lang="ts" setup>
import { getArticleDetailApi } from '@/api'
import { formatTimestamp } from '@/utils/time'

const route = useRoute()

const dataInfo = reactive({
  id: 0,
  title: '-',
  content: '',
  createTs: 0,
})

const loading = ref(true)

const loadData = async () => {
  const params = {
    id: route.params.id,
  }

  try {
    const { data } = await getArticleDetailApi(params)
    Object.assign(dataInfo, data)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="pt-[20px]">
    <h2 class="text-[24px] font-bold">{{ dataInfo.title }}</h2>
  </div>
  <div class="text-[12px] text-[#1D2023]/35">
    {{$t('updated_on')}} {{ formatTimestamp(dataInfo.createTs, 'YYYY-MM-DD') }}
  </div>
  <div class="mt-[35px]" v-html="dataInfo.content"></div>
  <AppLoadingComponent v-if="loading" />
</template>

<style lang="scss" scoped></style>
