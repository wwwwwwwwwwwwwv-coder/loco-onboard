<script lang="ts" setup>
import AppLoadingComponent from '@/components/AppLoadingComponent.vue'
import { addressInfoApi, requestInfoApi } from '@/api'
import { useConfigStore } from '@/store/modules/config.ts'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { toArray } from '@/utils'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'PersonalMaterialPage',
})

const useConfig = useConfigStore()
const { t } = useI18n()

const componentRef = ref()
const step = ref(1)
const isProofUrl = ref(false)

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

const loading = ref(false)

const form = reactive({
  countryOrTerritory: undefined, // 居住国家
  streetAddress: undefined, // 街道地址
  apartmentSuiteOrFloor: undefined, // 公寓
  city: undefined, // 城市
  state: undefined, // 省份
  postalCode: undefined, // 邮政编码
  employmentStatus: undefined, // 雇员状态
  industry: undefined, // 行业
  jobTitle: undefined, // 职位
  companyName: undefined, // 公司名称
  accountPurpose: [], // 账号用户 多选英文逗号隔开 PURCHASE（购买） BILL_PAYMENT（账单支付） EDUCATIONAL_EXPENSES（教育费用） PERSONAL_REMITTANCE（个人汇款） CHARITABLE_DONATION（慈善捐赠）LOAN_REPAYMENT（贷款还款） INVESTMENT（投资） OTHERS（其他）
  otherPurpose: undefined, // 其他目的 多选英文逗号隔开
  bankingCountries: [], // 申请哪个国家的银行卡 多选英文逗号隔开
  bankingCurrencies: [], // 申请银行币种 多选英文逗号隔开
  internationally: true, // 是否涉及国际交易
  turnoverMonthly: undefined, // 本月预计的营业总收入（单位：美元） TM001 Less than 50,000 ;TM002 50,000 to 100,000 ;TM003 100,000 to 250,000 ;TM004 250,000 to 500,000; TM005 Over 500,000
  turnoverMonthlyCurrency: undefined, // 估算每月交易量的货币
  sourceOfFundsObject: [], // 资金来源证明
  proofOfAddressResp: [], // 地址证明
  auditStatus: 'loading',
})

const loadData = async () => {
  const params = { tempToken: useConfig.tempToken }
  const { data } = await requestInfoApi(params)
  if (data != null) {
    data.accountPurpose = toArray(data.accountPurpose)
    data.bankingCountries = toArray(data.bankingCountries)
    data.bankingCurrencies = toArray(data.bankingCurrencies)
    !data.sourceOfFundsObject && (data.sourceOfFundsObject = [])
    !data.proofOfAddressResp && (data.proofOfAddressResp = [])
    Object.assign(form, data)
  } else {
    form.auditStatus = 'incomplete'
  }
}

const loadAddressInfo = async () => {
  const params = { tempToken: useConfig.tempToken }
  const { data } = await addressInfoApi(params)
  isProofUrl.value = !!data
}

provide('step', step)
provide('form', form)
provide('isProofUrl', isProofUrl)

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([loadAddressInfo(), loadData()])
    loading.value = false
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <!--  <div class="max-w-450px mx-auto py-30px px-16px flex flex-col">-->
  <!--    <component ref="componentRef" :is="currentComponent[1]" />-->
  <!--    <component ref="componentRef" :is="currentComponent[2]" />-->
  <!--  </div>-->

  <div class="flex justify-center items-center min-h-[70vh]" v-if="form.auditStatus === 'loading'">
    <a-spin tip="Loading..." />
  </div>

  <div
    class="max-w-450px mx-auto py-30px px-16px flex flex-col"
    v-else-if="form.auditStatus === 'incomplete' || form.auditStatus === 'rejected'"
  >
    <component ref="componentRef" :is="currentComponent[step]" />
  </div>

  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px] min-h-[50vh] text-center"
    v-else-if="form.auditStatus === 'under_review'"
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">
      {{ t('personal_material.kyc.status.state.underReview') }}
    </h3>
    <p>{{ t('personal_material.kyc.status.desc.underReview') }}</p>
  </div>

  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px] min-h-[50vh] text-center"
    v-else-if="form.auditStatus === 'completed'"
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">{{ t('company.approved') }}</h3>
    <p>
      {{ t('company.kyc_approved_notice') }}
    </p>
  </div>

  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px] min-h-[50vh] text-center"
    v-else
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">{{ form.auditStatus }}</h3>
  </div>
</template>

<style lang="scss" scoped></style>
