<script lang="ts" setup>
import { message } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { CameraOutlined, SendOutlined, MailOutlined } from '@ant-design/icons-vue'
import { companyKycApi, companyKycCommitApi, sendLinkApi } from '@/api'
import VerifyID from '@/views/verify_id/index.vue'
import { filter } from '@/utils'
import { identificationTypeOptions } from '@/options'

defineOptions({
  name: 'kycWidget6',
})

const step = 'kyc_verification'

const { t } = useI18n()

const parentStep: any = inject('step')
const verifyStep: any = inject('verifyStep')

// 股东信息Dialog
const verifyIdDialogVisible = ref(false)

// 发送邮箱Dialog
const emailAddressDialogVisible = ref(false)
const verifyIdRef = ref()

const activeId = ref()

const loading = ref(true)
const formRef = ref()

const form = reactive<any>({
  emailAddress: undefined, // 邮件
})

const dataInfo = reactive<any>({
  companyKycRepresentatives: [], // 公司人务代表信息
  shareholderDocsList: [], // 股东文件
  applicantId: undefined, // 负责人
  agree: false, // 是否同意
})

const rules: Record<string, Rule[]> = {
  emailAddress: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  companyKycRepresentatives: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  shareholderDocsList: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
}

// 选择代表
const selectItem = (item: any) => {
  activeId.value = item.id
  form.emailAddress = item.emailAddress
}

// 被选中的对象
const activeModel = computed(() => {
  return dataInfo.companyKycRepresentatives.find((item: any) => item.id === activeId.value)
})

// 发送邮件
const sendEmailAddress = async () => {
  const params = {
    id: activeModel.value.id,
    email: form.emailAddress,
  }
  try {
    await sendLinkApi(params)
    emailAddressDialogVisible.value = false
    message.success(t('submission.success'))
  } catch (error) {
    console.log(error)
  }
}

const loadData = async () => {
  const params = { step }
  loading.value = false
  try {
    const {
      data: { kyc_verification },
    } = await companyKycApi(params)
    const { companyKycRepresentatives } = kyc_verification
    if (companyKycRepresentatives.length > 0) {
      activeId.value = companyKycRepresentatives[0].id
      form.emailAddress = companyKycRepresentatives[0].emailAddress
    }
    Object.assign(dataInfo, kyc_verification)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// 保存并下一步
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      const params = { step, id: activeId.value }
      try {
        await verifyStep()
        await companyKycCommitApi(params)
        parentStep.value++
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

// 打开上传文档
const openVerifyId = async () => {
  verifyIdDialogVisible.value = true
  await nextTick()
  verifyIdRef.value.initData({ id: activeModel.value.id })
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <a-spin :spinning="loading">
    <h3 class="text-[26px] font-600">{{ t('company.kyc_verification') }}</h3>
    <p class="text-[14px] text-[#000000]/65 mt-[10px]">
      {{ t('company.kyc_verify_required_notice') }}
    </p>

    <div class="border-solid border-[#000000]/15 rounded-[8px] p-[16px] mt-[24px]">
      <h3 class="text-[14px] font-600">{{ t('company.select_a_representative') }}</h3>
      <div
        class="border-solid border-[#000000]/15 rounded-[8px] p-[16px] mt-[24px] flex items-center justify-between cursor-pointer"
        :class="{ 'border-[#1677FF]': activeId === v.id }"
        v-for="v in dataInfo.companyKycRepresentatives"
        :key="v.id"
        @click="selectItem(v)"
      >
        <div class="flex items-center">
          <div
            class="w-48px h-48px bg-[#000000]/2 rounded-full flex justify-center items-center font-bold text-[16px]"
          >
            {{ v.legalFirstNameEnglish[0] }}{{ v.legalLastNameEnglish[0] }}
          </div>
          <div class="flex flex-col gap-[4px]">
            <div class="flex gap-[10px]">
              <strong class="font-bold"
                >{{ v.legalFirstNameEnglish }} {{ v.legalLastNameEnglish }}</strong
              >
              <a-tag color="success">{{ t('company.completed') }}</a-tag>
            </div>
            <p class="text-[#000000]/45">{{t(`company.options.identification_type.${filter(identificationTypeOptions, v.identificationType).label}`)}} </p>
            <p class="text-[#000000]/45">{{ v.emailAddress }}</p>
          </div>
        </div>

        <div
          class="w-[16px] h-[16px] rounded-full border-solid border-[#000000]/15 flex justify-center items-center"
          :class="{ 'border-[#1677FF]': activeId === v.id }"
        >
          <i
            class="inline-block w-[8px] h-[8px] bg-[#1677FF] rounded-full"
            v-if="activeId === v.id"
          ></i>
        </div>
      </div>

      <h3 class="text-[14px] font-600 mb-[12px] mt-[12px]">
        {{ t('company.choose_verification_method') }}
      </h3>

      <div class="flex gap-[8px]">
        <div class="flex-1 border-solid border-[#000000]/15 rounded-[8px] py-[10px] px-[8px]">
          <div class="mb-[16px]">
            <div class="flex items-center gap-[4px]">
              <div
                class="bg-[#E6F4FF] rounded-full flex items-center justify-center w-[24px] h-[24px]"
              >
                <CameraOutlined class="text-[#1677FF] text-[10px]" />
              </div>
              <h3 class="text-[#000000]/88 text-[12px] font-600">{{ t('company.upload_now') }}</h3>
            </div>
            <p class="ml-[28px] text-[10px] text-[#000000]/45 min-h-[35px]">
              {{ t('company.id_document_selfie_tips') }}
            </p>
          </div>
          <a-button block type="primary" class="text-[12px]!" size="middle" @click="openVerifyId">
            {{ t('company.start_document_upload') }}
          </a-button>
        </div>

        <div class="flex-1 border-solid border-[#000000]/15 rounded-[8px] py-[10px] px-[8px]">
          <div class="mb-[16px]">
            <div class="flex items-center gap-[4px]">
              <div
                class="bg-[#E6F4FF] rounded-full flex items-center justify-center w-[24px] h-[24px]"
              >
                <MailOutlined class="text-[#1677FF] text-[10px]" />
              </div>
              <h3 class="text-[#000000]/88 text-[12px] font-600">
                {{ t('company.send_verification_link') }}
              </h3>
            </div>
            <p class="ml-[28px] text-[10px] text-[#000000]/45 min-h-[35px]">
              {{ t('company.send_secure_link_tips') }}
            </p>
          </div>
          <a-button
            block
            type="primary"
            class="text-[12px]!"
            size="middle"
            :disabled="!activeId"
            @click="emailAddressDialogVisible = true"
          >
            <template #icon>
              <SendOutlined />
            </template>
            Send Link
          </a-button>
        </div>
      </div>
    </div>

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item class="mt-30px">
            <a-button block @click="parentStep--">{{ t('company.back') }}</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item class="mt-30px">
            <a-button block type="primary" :disabled="!activeId" @click="onSubmit"
              >{{ t('company.save_and_next') }}
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>

  <a-modal v-model:open="verifyIdDialogVisible" :width="800" :title="t('company.document_upload')">
    <VerifyID ref="verifyIdRef" />
    <template #footer />
  </a-modal>

  <a-modal
    v-model:open="emailAddressDialogVisible"
    centered
    :title="t('company.send_verification_link')"
  >
    <a-form class="mt-20px mb-[20px]" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="t('company.email_address')" name="idNumber">
            <a-input v-model:value="form.emailAddress" :placeholder="t('pleaseEnter')" />
          </a-form-item>
          <p class="mt-[10px]">{{ t('company.send_verify_link_email_tips') }}</p>
        </a-col>
      </a-row>
    </a-form>

    <template #footer>
      <a-button @click="emailAddressDialogVisible = false">{{ t('company.cancel') }}</a-button>
      <a-button type="primary" @click="sendEmailAddress">{{ t('company.send') }}</a-button>
    </template>
  </a-modal>
</template>

<style scoped lang="scss"></style>
