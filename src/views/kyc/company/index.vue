<script lang="ts" setup>
import AppLoadingComponent from '@/components/AppLoadingComponent.vue'
import { companyKycApi } from '@/api'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'kycPage',
})

const { t } = useI18n()

const componentRef = ref()
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
  3: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget3.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  4: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget4.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  5: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget5.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  6: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget6.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  7: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget7.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
})

const stepsItems = [
  {
    title: 'company.company_profile',
  },
  {
    title: 'company.company_address',
  },
  {
    title: 'company.business_details',
  },
  {
    title: 'company.business_operations',
  },
  {
    title: 'company.ownership_details',
  },
  {
    title: 'company.kyc_verification',
  },
  {
    title: 'company.submit_for_review',
  },
]

const dataInfo = reactive({
  company_profile: 0, // 1
  company_address: 0, // 2
  business_details: 0, // 3
  business_operations: 0, // 4
  ownership_details: 0, // 5
  kyc_verification: 0, // 6
  status: 'loading',
})

const loadData = async () => {
  const params = { step: 'review_submit' }
  const { data } = await companyKycApi(params)
  Object.assign(dataInfo, data)
}

const stepsChange = async (v: number) => {
  if (v === 2 && !dataInfo.company_profile) {
    return
  } else if (v === 3 && !dataInfo.company_address) {
    return
  } else if (v === 4 && !dataInfo.business_details) {
    return
  } else if (v === 5 && !dataInfo.business_operations) {
    return
  } else if (v === 6 && !dataInfo.ownership_details) {
    return
  } else if (v === 7 && !dataInfo.kyc_verification) {
    return
  }
  step.value = v
}

provide('step', step)
provide('verifyStep', loadData)
onMounted(() => {
  loadData()
})
</script>

<template>
  <!--  <div class="max-w-450px mx-auto py-30px px-16px flex flex-col">-->
  <!--    <component ref="componentRef" :is="currentComponent[step]" />-->
  <!--  </div>-->

  <!--  <div class="fixed top-[150px] left-[30px] hidden md:block z-1">-->
  <!--    <a-steps-->
  <!--      :progressDot="true"-->
  <!--      :current="step"-->
  <!--      @change="stepsChange"-->
  <!--      direction="vertical"-->
  <!--      :initial="1"-->
  <!--      :items="stepsItems"-->
  <!--    ></a-steps>-->
  <!--  </div>-->

  <div class="flex justify-center items-center min-h-[70vh]" v-if="dataInfo.status === 'loading'">
    <a-spin tip="Loading..." />
  </div>

  <template v-else-if="dataInfo.status === 'incomplete' || dataInfo.status === 'rejected'">
    <div class="max-w-450px mx-auto py-30px px-16px flex flex-col">
      <component ref="componentRef" :is="currentComponent[step]" />
    </div>

    <div class="fixed top-[150px] left-[30px] hidden md:block z-1">
      <a-steps
        :progressDot="true"
        :current="step"
        @change="stepsChange"
        direction="vertical"
        :initial="1"
      >
        <a-step v-for="(item, index) in stepsItems" :key="index">
          <template #title>
            {{ t(item.title) }}
          </template>
        </a-step>
      </a-steps>
    </div>
  </template>
  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px] min-h-[50vh] text-center"
    v-else-if="dataInfo.status === 'under_review'"
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">{{t('company.under_review')}}</h3>
    <p>
      {{t('company.info_under_review_notice')}}
    </p>
  </div>
  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px] min-h-[50vh] text-center"
    v-else
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">{{t('company.approved')}}</h3>
    <p>
      {{t('company.kyc_approved_notice')}}
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
