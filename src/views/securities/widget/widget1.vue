<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { CountryOption } from '@/options/country.ts'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'kycWidget1',
})

const { t, locale } = useI18n()

interface FormState {
  isAllCommit: boolean
  nationality: string
  idType: string
  idNumber: string
}

const parentStep: any = inject('step')
const submit: any = inject('submit')
const form: UnwrapRef<FormState> = inject('form')!

const formRef = ref()

const rules: Record<string, Rule[]> = {
  nationality: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  idType: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  idNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
}

const filterOption = (input: any, option: any) => {
  const country = CountryOption.find((item) => item.iso2 === option.value)
  if (!country) return false

  const searchText = input.toLowerCase()
  return (
    country.chineseName.toLowerCase().includes(searchText) ||
    country.iso3.toLowerCase().includes(searchText) ||
    country.iso2.toLowerCase().includes(searchText)
  )
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      console.log('values', form, toRaw(form))
      form.isAllCommit = false
      try {
        await submit()
        parentStep.value = 2
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}
</script>

<template>
  <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
    <a-row :gutter="16">
      <!--      <a-col :span="24">-->
      <!--        <div class="mb-24px mt-24px">-->
      <!--          <h3 class="text-[18px] font-600">{{ t('identityInformation') }}</h3>-->
      <!--        </div>-->
      <!--      </a-col>-->

      <a-col :span="24" :md="12">
        <a-form-item :label="t('issuingCountry')" name="nationality">
          <a-select
            v-model:value="form.nationality"
            show-search
            :filter-option="filterOption"
            :placeholder="t('selectCountry')"
          >
            <a-select-option
              v-for="item in CountryOption"
              :key="item.iso2"
              :value="item.iso2"
              :label="locale === 'zh_CN' ? item.chineseName : item.name"
            >
              <div class="flex items-center gap-9px">
                <img
                  :src="item.icon"
                  style="width: 20px; height: 20px; border-radius: 20px"
                  :alt="item.name"
                />
                {{ locale === 'zh_CN' ? item.chineseName : item.name }}
              </div>
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="t('documentType')" name="idType">
          <a-select v-model:value="form.idType" :placeholder="t('selectDocumentType')">
            <a-select-option value="national_id">{{ t('idCard') }}</a-select-option>
            <a-select-option value="passport">{{ t('passport') }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item ref="name" :label="t('documentNumber')" name="idNumber">
          <a-input v-model:value="form.idNumber" />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <div class="mt-30px">
    <a-button type="primary" size="large" class="w-full md:w-auto min-w-200px" @click="onSubmit">
      {{ t('nextStep') }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped></style>
