<script setup lang="ts">
import { CheckCircleFilled, ExclamationCircleFilled } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import { rfiCommitApi, rfiInfoApi } from '@/api'
// import { useConfigStore } from '@/store/modules/config.ts'

const { t } = useI18n()
// const useConfig = useConfigStore()

const loading = ref(true)
const formRef = ref()
// const step = ref(1)

const form = reactive<any>([])

const dataInfo = reactive<any>({ status: 'loading', rfiReason: null, rfiDesc: [] })

const loadData = async () => {
  const params = {}
  try {
    const { data } = await rfiInfoApi(params)
    // Object.assign(dataInfo, data)
    dataInfo.status = data.status
    if (dataInfo.status === 'incomplete' || dataInfo.status === 'rejected') {
      dataInfo.rfiReason = data.rfiReason
      dataInfo.rfiDesc = data.rfiDesc
      for (const item of dataInfo.rfiDesc) {
        form.push({ rfiId: item.rfiId, key: item.key, file: [], desc: item.desc })
      }
    }
  } catch (e) {
    console.log(e)
  }
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      const params: any = {
        rfiInfo: unref(form),
      }
      try {
        await rfiCommitApi(params)
        dataInfo.status = 'under_review';
        // step.value = 2
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = false
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="flex justify-center items-center min-h-[70vh]" v-if="dataInfo.status === 'loading'">
    <a-spin tip="Loading..." />
  </div>

  <div
    class="max-w-450px mx-auto py-30px px-16px flex flex-col"
    v-else-if="dataInfo.status === 'incomplete' || dataInfo.status === 'rejected'"
  >
    <div
      class="bg-[#FFFBE6] border-solid border-[#FFE58F] rounded-[8px] px-[10px] py-[17px] flex items-center gap-[10px]"
    >
      <ExclamationCircleFilled class="text-[#FAAD14]" />
      <div class="flex-1">
        <p class="text-[14px] text-black/88">{{ dataInfo.rfiReason ?? '-' }}</p>
      </div>
    </div>
    <a-form class="mt-20px" ref="formRef" :model="form" layout="vertical">
      <a-col :span="24" v-for="(v, index) in form" :key="v.key">
        <a-form-item
          :label="v.desc"
          :name="[index, 'file']"
          :rules="[
            {
              required: true,
              type: 'array',
              min: 1,
              message: t('personal_material.upload.dragText'),
              trigger: 'change',
            },
          ]"
        >
          <app-upload v-model="v.file" />
        </a-form-item>
      </a-col>
      <a-form-item class="mt-30px" v-show="dataInfo.rfiDesc.length > 0">
        <a-button block type="primary" @click="onSubmit"
          >{{ t('submit') }}
        </a-button>
      </a-form-item>
    </a-form>
  </div>

  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px]"
    v-else-if="dataInfo.status === 'under_review'"
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">
      {{ t('personal_material.kyc.status.state.underReview') }}
    </h3>
    <p>{{ t('personal_material.kyc.status.desc.info_under_review') }}</p>
  </div>

  <div
    class="flex flex-col items-center justify-center max-w-[658px] mx-auto px-[10px] md:px-[72px] md:pt-[48px] md:pb-[79px]"
    v-else-if="dataInfo.status === 'completed'"
  >
    <CheckCircleFilled class="text-[#52C41A] text-[63px]" />
    <h3 class="mt-[52px] font-600 text-[24px]">{{ t('company.approved') }}</h3>
    <p>
      {{ t('company.kyc_approved_notice') }}
    </p>
  </div>
</template>

<style scoped lang="scss"></style>
