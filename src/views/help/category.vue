<script lang="ts" setup>
import { RightOutlined } from '@ant-design/icons-vue'
import { getArticleListApi } from '@/api'

const dataList = ref<any>([])

const loading = ref(true)

const loadData = async () => {
  const params = {
    type: 3,
    id: 0,
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
  <div class="pt-[20px] pb-[36px]">
    <h2 class="text-[24px] font-bold">{{$t('help_center')}}</h2>
  </div>
  <div v-for="(item, index) in dataList" :key="index">
    <div class="text-[#1D2023]/45 py-[16px]">
      {{ item.title }}
    </div>
    <div class="flex flex-col gap-[16px]">
      <router-link
        :to="{ name: v.subArticleReqList.length === 0 ? 'HelpArticle' : 'HelpSubcategory', params: { id: v.id }, query: $route.query }"
        class="flex justify-between py-[9px]"
        v-for="(v, i) in item.subArticleReqList"
        :key="i"
      >
        <div class="flex items-center gap-[26px]">
          <div class="bg-[#1D2023]/3 w-[36px] h-[36px] rounded-full flex justify-center items-center" v-if="v.icon">
            <img :src="v.icon" style="width: 17px; height: 17px" alt="" />
          </div>
          <strong class="text-[15px] text-[#2E3034] font-bold">{{ v.title }}</strong>
        </div>
        <RightOutlined class="text-[#2E3034]/65" />
      </router-link>
    </div>
  </div>
  <AppLoadingComponent v-if="loading" />
</template>

<style lang="scss" scoped></style>
