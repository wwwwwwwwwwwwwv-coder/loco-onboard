<script lang="ts" setup>
import { RightOutlined } from '@ant-design/icons-vue'
import { getArticleListApi } from '@/api'

const route = useRoute()

const dataList = ref<any>([])

const loading = ref(true)

const loadData = async () => {
  const params = {
    type: 3,
    id: route.params.id,
    pageNum: 1,
    pageSize: 99,
  }

  try {
    const {
      data: { records },
    } = await getArticleListApi(params)
    dataList.value = records
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
  <div v-for="(item, index) in dataList" :key="index">
    <div class="pt-[20px] pb-[36px]">
      <h2 class="text-[24px] font-bold">
        {{ item.title }}
      </h2>
    </div>
    <div class="flex flex-col gap-[16px]">
      <router-link
        :to="{
          name: 'HelpArticle',
          params: { id: v.id },
          query: $route.query,
        }"
        class="flex justify-between py-[9px]"
        v-for="(v, i) in item.subArticleReqList"
        :key="i"
      >
        <div class="flex items-center gap-[26px]">
          <strong class="text-[15px] text-[#2E3034] font-bold">{{ v.title }}</strong>
        </div>
        <RightOutlined class="text-[#2E3034]/65" />
      </router-link>
    </div>
  </div>
  <AppLoadingComponent v-if="loading" />
</template>

<style lang="scss" scoped></style>
