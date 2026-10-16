<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import AppUpload from '@/components/AppUpload.vue'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import { identificationTypeOptions } from '@/options'
import { companyCheckFileApi, verificationApi } from '@/api'

defineOptions({
  name: 'VerifyID',
})

const route = useRoute()

const { t } = useI18n()

const formRef = ref()

const identificationType = ref()

const loading = ref(true)
const submitLoading = ref(false)

const form = reactive({
  id: 0,
  identificationType: undefined,
  status: false,
  handheldIdPhoto: [],
})

// URL 写入ID
route.query.r && (form.id = Number(route.query.r))

const rules: Record<string, Rule[]> = {
  handheldIdPhoto: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
}

// 调用组件写入数据
const initData = (values: any) => {
  form.id = values['id']
  loadData()
}

const loadData = async () => {
  const params = {
    id: form.id,
  }
  loading.value = true
  try {
    const { data } = await companyCheckFileApi(params)
    form.status = data.status
    identificationType.value = data.identificationType
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      const params = {
        id: form.id,
        handheldIdPhoto: form.handheldIdPhoto,
      }
      submitLoading.value = true
      try {
        await verificationApi(params)
        form.status = true
      } catch (error) {
        console.log(error)
      } finally {
        submitLoading.value = false
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

defineExpose({ initData })

onMounted(() => {
  if (form.id) loadData()
})
</script>
<template>
  <div
    class="flex flex-col items-center max-w-[658px] mx-auto px-[10px] py-[20px] md:px-[72px] md:pt-[48px] md:pb-[79px] border-solid border-[#000000]/15 rounded-[8px] min-h-[50vh]"
    v-if="!form.status"
  >
    <h2 class="text-[24px] font-600">{{ t('company.upload_your_document') }}</h2>
    <p>{{ t('company.photo_details_visible_tips') }}</p>

    <a-spin :spinning="loading">
      <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item :label="t('company.document_type')">
              <a-select
                v-model:value="identificationType"
                :placeholder="t('company.document_type')"
                disabled
                optionLabelProp="label"
              >
                <a-select-option
                  v-for="item in identificationTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="t(`company.options.identification_type.${item.label}`)"
                >
                  {{ t(`company.options.identification_type.${item.label}`) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item name="handheldIdPhoto">
              <app-upload v-model="form.handheldIdPhoto" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item class="mt-30px">
              <a-button block type="primary" @click="onSubmit" :loading="submitLoading"
                >{{ t('submit') }}
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </div>

  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px] border-solid border-[#000000]/15 rounded-[8px] min-h-[50vh]"
    v-else
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">{{ t('company.profile_verified') }}</h3>
    <p>{{ t('company.close_page_tips') }}</p>
    <a-button type="primary" size="middle" class="mt-[30px]" @click="form.status = false"
      >{{t('company.edit_document')}}
    </a-button>
  </div>
</template>

<style scoped lang="scss"></style>
