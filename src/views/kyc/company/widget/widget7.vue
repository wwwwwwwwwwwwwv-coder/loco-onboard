<script lang="ts" setup>
import { RightOutlined, CheckCircleFilled, InfoCircleFilled } from '@ant-design/icons-vue'
import { companyKycApi, companyKycCommitApi } from '@/api'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'kycWidget7',
})

const { t } = useI18n()

const step = 'review_submit'

// const { t, locale } = useI18n()
const parentStep: any = inject('step')
const parentVerifyStep: any = inject('verifyStep')

const loading = ref(true)

const dataInfo = reactive({
  business_details: 1,
  kyc_verification: 1,
  business_operations: 1,
  company_profile: 1,
  ownership_details: 1,
  company_address: 1,
})

const loadData = async () => {
  const params = { step }
  loading.value = true
  try {
    const { data } = await companyKycApi(params)
    Object.assign(dataInfo, data)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

// 保存并下一步
const onSubmit = async () => {
  const params = { step }
  loading.value = true
  try {
    await companyKycCommitApi(params)
    await parentVerifyStep()
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
  <a-spin :spinning="loading">
    <h3 class="text-[26px] font-600">{{ t('company.review_your_info') }}</h3>
    <p class="text-[14px] text-[#000000]/65 mt-[10px]">{{ t('company.submit_final_check_tips') }}</p>
    <a-form class="mt-20px" ref="formRef" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <div class="flex flex-col gap-[24px]">
            <div
              class="flex justify-between items-center border-solid border-[#000000]/15 rounded-[8px] p-[16px] cursor-pointer"
              @click="parentStep = 1"
            >
              <div class="flex items-center gap-[24px]">
                <CheckCircleFilled
                  class="text-[21px] text-[#52C41A]"
                  v-if="dataInfo.company_profile"
                />
                <InfoCircleFilled class="text-[21px] text-[#FF545E]" v-else />
                <span class="text-[16px] text-[#000000]/88">{{ t('company.company_profile') }}</span>
              </div>
              <RightOutlined class="text-[10px] text-[#000000]/45" />
            </div>

            <div
              class="flex justify-between items-center border-solid border-[#000000]/15 rounded-[8px] p-[16px] cursor-pointer"
              @click="parentStep = 2"
            >
              <div class="flex items-center gap-[24px]">
                <CheckCircleFilled
                  class="text-[21px] text-[#52C41A]"
                  v-if="dataInfo.company_address"
                />
                <InfoCircleFilled class="text-[21px] text-[#FF545E]" v-else />
                <span class="text-[16px] text-[#000000]/88">{{ t('company.company_address') }}</span>
              </div>
              <RightOutlined class="text-[10px] text-[#000000]/45" />
            </div>

            <div
              class="flex justify-between items-center border-solid border-[#000000]/15 rounded-[8px] p-[16px] cursor-pointer"
              @click="parentStep = 3"
            >
              <div class="flex items-center gap-[24px]">
                <CheckCircleFilled
                  class="text-[21px] text-[#52C41A]"
                  v-if="dataInfo.business_details"
                />
                <InfoCircleFilled class="text-[21px] text-[#FF545E]" v-else />
                <span class="text-[16px] text-[#000000]/88">{{ t('company.business_details') }}</span>
              </div>
              <RightOutlined class="text-[10px] text-[#000000]/45" />
            </div>

            <div
              class="flex justify-between items-center border-solid border-[#000000]/15 rounded-[8px] p-[16px] cursor-pointer"
              @click="parentStep = 4"
            >
              <div class="flex items-center gap-[24px]">
                <CheckCircleFilled
                  class="text-[21px] text-[#52C41A]"
                  v-if="dataInfo.business_operations"
                />
                <InfoCircleFilled class="text-[21px] text-[#FF545E]" v-else />
                <span class="text-[16px] text-[#000000]/88">{{ t('company.business_operations') }}</span>
              </div>
              <RightOutlined class="text-[10px] text-[#000000]/45" />
            </div>

            <div
              class="flex justify-between items-center border-solid border-[#000000]/15 rounded-[8px] p-[16px] cursor-pointer"
              @click="parentStep = 5"
            >
              <div class="flex items-center gap-[24px]">
                <CheckCircleFilled
                  class="text-[21px] text-[#52C41A]"
                  v-if="dataInfo.ownership_details"
                />
                <InfoCircleFilled class="text-[21px] text-[#FF545E]" v-else />
                <span class="text-[16px] text-[#000000]/88">{{ t('company.review_your_info') }}</span>
              </div>
              <RightOutlined class="text-[10px] text-[#000000]/45" />
            </div>

            <div
              class="flex justify-between items-center border-solid border-[#000000]/15 rounded-[8px] p-[16px] cursor-pointer"
              @click="parentStep = 6"
            >
              <div class="flex items-center gap-[24px]">
                <CheckCircleFilled
                  class="text-[21px] text-[#52C41A]"
                  v-if="dataInfo.kyc_verification"
                />
                <InfoCircleFilled class="text-[21px] text-[#FF545E]" v-else />
                <span class="text-[16px] text-[#000000]/88">{{ t('company.kyc_verification') }}</span>
              </div>
              <RightOutlined class="text-[10px] text-[#000000]/45" />
            </div>
          </div>
        </a-col>

        <a-col :span="24">
          <a-form-item class="mt-32px">
            <a-button block type="primary" @click="onSubmit">{{ t('company.submit_application') }}</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<style scoped lang="scss"></style>
