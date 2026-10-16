<script lang="ts" setup>
import AppLoadingComponent from '@/components/AppLoadingComponent.vue'
import { ceeiirsstuInfoApi } from '@/api'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'kycPage',
})

const route = useRoute()

const loading = ref(true)
const loadFailed = ref(false)

const reviewStatus = ref(-1)
const bstInfo = ref<Record<string, any>>({})
const widget1FormData = ref<Record<string, any>>({})

const step = ref(1)
const currentComponent = reactive<any>({
  1: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget1.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  2: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget2.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
})

const componentListeners = computed(() => {
  if (step.value === 1) {
    return {
      next: (formData: Record<string, any>) => {
        widget1FormData.value = formData
        step.value++
      },
    }
  }

  return {
    previous: () => {
      step.value--
    },
    submitted: () => {
      reviewStatus.value = 0
    },
  }
})

const componentProps = computed(() => {
  if (step.value === 1) {
    return {
      initialData: bstInfo.value,
    }
  }

  return {
    initialData: bstInfo.value,
    widget1Data: widget1FormData.value,
  }
})

const getInfo = async () => {
  const params = {
    tempToken: route.query.t,
  }

  loading.value = true
  loadFailed.value = false
  try {
    const { data } = await ceeiirsstuInfoApi(params)
    // const data = {
    //   userId: '288fa75855ab4b1cbaea80c5d3c44be9',
    //   isIpo: false,
    //   issuingCountry: 'CN',
    //   documentType: 'national_id',
    //   documentNumber: '123123',
    //   frontSidePhotoDocument:
    //     'https://gat-money-local.s3.ap-east-1.amazonaws.com/local/upload/2026/6/30/20260630033717/%E4%B8%8B%E8%BD%BD.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260729T075959Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIASRR36NTEPNFW7NYB%2F20260729%2Fap-east-1%2Fs3%2Faws4_request&X-Amz-Signature=f235e0619ca2e181b026edfc6bb065fb0ea371382c1b94d288873132a655692f',
    //   backSidePhotoDocument:
    //     'https://gat-money-local.s3.ap-east-1.amazonaws.com/local/upload/2026/6/30/20260630033718/%E4%B8%8B%E8%BD%BD.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260729T075959Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIASRR36NTEPNFW7NYB%2F20260729%2Fap-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c9ec85a43d0fdfdbf10d32e1b6070786dfb66f3fc9d26f28789bfb2b24d759ed',
    //   validityPeriod: '2026-06-30',
    //   isPermanentlyValid: true,
    //   investmentAmount: 1.0,
    //   totalInvestmentValue: 1.0,
    //   reviewStatus: -1,
    //   reviewRemark: '不参与IPO 直接通过 或者 参与IPO且身份证注册',
    //   isAllCommit: true,
    //   createTime: '2026-06-30 03:36:21',
    //   reviewTime: '2026-06-30 06:08:52',
    //   id: 237,
    //   gatUserSurveys: [
    //     {
    //       userId: '288fa75855ab4b1cbaea80c5d3c44be9',
    //       moduleName: 'securities',
    //       investmentCategories: 'STK',
    //       bondKnowledgeLevel: 'Limited',
    //       tradesPerYear: 1,
    //       tradingExperienceYears: 1,
    //       id: 462,
    //       createTime: '2026-07-29 06:57:38',
    //     },
    //   ],
    //   gatId: null,
    //   email: null,
    //   userName: null,
    // }
    bstInfo.value = data || {}
    reviewStatus.value = data?.reviewStatus ?? -1
  } catch (e) {
    console.log(e)
    loadFailed.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getInfo()
})
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center min-h-[70vh]">
    <a-spin tip="Loading..." />
  </div>

  <div
    v-else-if="loadFailed"
    class="min-h-[70vh] px-16px flex flex-col justify-center items-center text-center"
  >
    <p>{{ $t('bst.loadFailed') }}</p>
    <a-button class="mt-20px" type="primary" @click="getInfo">{{ $t('bst.retry') }}</a-button>
  </div>

  <div v-else class="max-w-450px mx-auto py-30px px-16px flex flex-col">
    <template v-if="reviewStatus === -1 || reviewStatus === 2">
      <div class="flex justify-between items-center mb-50px">
        <h3 class="text-[26px] font-600">{{ $t('authentication') }}</h3>
        <a-progress
          :percent="step * 50"
          :showInfo="false"
          :size="30"
          :strokeWidth="14"
          type="circle"
        />
      </div>
      <KeepAlive>
        <component :is="currentComponent[step]" v-bind="componentProps" v-on="componentListeners" />
      </KeepAlive>
    </template>

    <div v-else class="flex flex-col justify-center items-center pt-[10vh] text-center">
      <img alt="" class="w-[160px]" src="@/assets/img/success.png" />
      <strong class="text-[20px] font-600 mt-[30px]">{{ $t('submission.success') }}</strong>
      <p class="pt-[10px]">{{ $t('submission.message') }}</p>
      <p class="pt-[15px]">{{ $t('submission.notification') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
