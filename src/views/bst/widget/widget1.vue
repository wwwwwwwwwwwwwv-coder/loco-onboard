<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { securitiesSubmitApi } from '@/api'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'kycWidget1',
})

const { t } = useI18n()

const route = useRoute()

interface FormState {
  isIpo: boolean | null
  issuingCountry: string | undefined
  documentType: string | undefined
  documentNumber: string
  frontSidePhotoDocument: string
  backSidePhotoDocument: string
  validityPeriod: string | undefined
  isPermanentlyValid: boolean
}

const props = defineProps<{
  initialData: Record<string, any>
}>()
const emit = defineEmits<{
  next: [formData: Record<string, any>]
}>()

const requiresNationalIdReplacement =
  props.initialData.issuingCountry === 'CN' && props.initialData.documentType !== 'national_id'

const form: UnwrapRef<FormState> = reactive({
  isIpo: props.initialData.isIpo ?? null,
  issuingCountry: props.initialData.issuingCountry ?? undefined,
  documentType: requiresNationalIdReplacement
    ? 'national_id'
    : (props.initialData.documentType ?? undefined),
  documentNumber: requiresNationalIdReplacement ? '' : (props.initialData.documentNumber ?? ''),
  frontSidePhotoDocument: requiresNationalIdReplacement
    ? ''
    : (props.initialData.frontSidePhotoDocument ?? ''),
  backSidePhotoDocument: requiresNationalIdReplacement
    ? ''
    : (props.initialData.backSidePhotoDocument ?? ''),
  validityPeriod: requiresNationalIdReplacement
    ? undefined
    : (props.initialData.validityPeriod ?? undefined),
  isPermanentlyValid: requiresNationalIdReplacement
    ? false
    : (props.initialData.isPermanentlyValid ?? false),
})

const isPostCardInfo = computed(() => {
  return Boolean(form.isIpo && requiresNationalIdReplacement)
})

const radioStyle = reactive({
  display: 'flex',
  height: '30px',
  lineHeight: '30px',
})

const formRef = ref()
const submitting = ref(false)
const rules: Record<string, Rule[]> = {
  isIpo: [{ required: true, message: t('bst.ipoSelectionRequired'), trigger: 'change' }],
  issuingCountry: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  documentType: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  documentNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  frontSidePhotoDocument: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  backSidePhotoDocument: [{ required: true, message: t('requiredField'), trigger: 'change' }],
}

const disabledDate = (current: any) => {
  // 证件有效期不能早于今天
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 设置最小可选年份（示例：允许选择1900年之后的日期）
  // const minYear = 1900
  // const minDate = new Date(minYear, 0, 1)
  // || current > minDate
  return current < today
}

const newUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    const path = decodeURIComponent(urlObj.pathname)
    return path.startsWith('/') ? path.substring(1) : path
  } catch (e) {
    return url
  }
}

const onSubmit = async () => {
  if (submitting.value) return

  submitting.value = true
  try {
    await formRef.value.validate()
    const params: any = {
      tempToken: route.query.t,
      isAllCommit: false,
      isIpo: form.isIpo,
      issuingCountry: form.issuingCountry,
      documentType: form.documentType,
      documentNumber: form.documentNumber,
      frontSidePhotoDocument: newUrl(form.frontSidePhotoDocument),
      backSidePhotoDocument: newUrl(form.backSidePhotoDocument),
      validityPeriod: form.validityPeriod,
      isPermanentlyValid: form.isPermanentlyValid,
    }
    // if (isPostCardInfo.value) {
    //   Object.assign(params, {
    //     issuingCountry: form.issuingCountry,
    //     documentType: form.documentType,
    //     documentNumber: form.documentNumber,
    //     frontSidePhotoDocument: newUrl(form.frontSidePhotoDocument),
    //     backSidePhotoDocument: newUrl(form.backSidePhotoDocument),
    //     validityPeriod: form.validityPeriod,
    //     isPermanentlyValid: form.isPermanentlyValid,
    //   })
    // }
    await securitiesSubmitApi(params)
    emit('next', params)
  } catch (error) {
    console.log('error', error)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical" size="large">
    <div class="mb-24px">
      <h3 class="text-[18px] font-600">{{ t('bst.ipoParticipation') }}</h3>
      <p class="mt-6px text-13px">
        {{ t('bst.ipoDescription') }}
      </p>
    </div>

    <a-form-item name="isIpo">
      <a-radio-group v-model:value="form.isIpo">
        <a-radio :style="radioStyle" :value="true">{{ t('yes') }}</a-radio>
        <a-radio :style="radioStyle" :value="false">{{ t('no') }}</a-radio>
      </a-radio-group>
    </a-form-item>

    <template v-if="isPostCardInfo">
      <a-col :span="24">
        <div class="mb-24px mt-24px">
          <h3 class="text-[18px] font-600">{{ t('bst.identityInformation') }}</h3>
        </div>
      </a-col>

      <a-form-item :label="t('documentType')" name="documentType">
        <a-select v-model:value="form.documentType" :placeholder="t('selectDocumentType')">
          <a-select-option value="national_id">{{ t('idCard') }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :label="t('documentNumber')" name="documentNumber">
        <a-input v-model:value="form.documentNumber" :placeholder="t('pleaseEnter')" />
      </a-form-item>

      <a-form-item :label="t('frontSidePhoto')" name="frontSidePhotoDocument">
        <app-uploader v-model="form.frontSidePhotoDocument" :text="t('upload')">
          <template #img>
            <img alt="" src="@/assets/img/front.png" style="height: 100%" />
          </template>
        </app-uploader>
      </a-form-item>

      <a-form-item :label="t('backSidePhoto')" name="backSidePhotoDocument">
        <app-uploader v-model="form.backSidePhotoDocument" :text="t('upload')">
          <template #img>
            <img alt="" src="@/assets/img/back.png" style="height: 100%" />
          </template>
        </app-uploader>
      </a-form-item>

      <a-form-item
        :label="t('validityPeriod')"
        :rules="[
          {
            required: !form.isPermanentlyValid,
            message: t('requiredField'),
            trigger: 'change',
          },
        ]"
        name="validityPeriod"
      >
        <a-date-picker
          v-model:value="form.validityPeriod"
          :disabled="form.isPermanentlyValid"
          :disabledDate="disabledDate"
          :placeholder="t('selectDate')"
          :showToday="false"
          class="w-full"
          type="date"
          valueFormat="YYYY-MM-DD"
        />
        <div class="mt-10px">
          <a-form-item-rest>
            <a-checkbox
              v-model:checked="form.isPermanentlyValid"
              @change="() => formRef.clearValidate(['validityPeriod'])"
            >
              {{ t('permanentlyValid') }}
            </a-checkbox>
          </a-form-item-rest>
        </div>
      </a-form-item>
    </template>
  </a-form>
  <div class="mt-30px">
    <a-button :loading="submitting" class="w-full" size="large" type="primary" @click="onSubmit">
      {{ t('nextStep') }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped></style>
