<script lang="ts" setup>
import { ref, toRaw, inject } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { CountryOption } from '@/options/country.ts'

defineOptions({
  name: 'kycWidget3',
})

const { t, locale } = useI18n()

const router = useRouter()
const route = useRoute()

interface FormState {
  isAllCommit: boolean

  residenceCountry: string
  residenceProvince: string
  residenceCity: string
  postcode: string
  address1: string
  address2: string
  // proofUrl: string
}

const parentStep: any = inject('step')
const submit: any = inject('submit')
const form: UnwrapRef<FormState> = inject('form')!

const formRef = ref()

const rules: Record<string, Rule[]> = {
  residenceCountry: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  residenceProvince: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  residenceCity: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  postcode: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  address1: [{ required: true, message: t('requiredField'), trigger: 'change' }]
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
  router.resolve({ name: 'Success' })

  formRef.value
    .validate()
    .then(async () => {
      console.log('values', form, toRaw(form))
      form.isAllCommit = true
      try {
        await submit()
        await router.replace({ name: 'Success', query: route.query })
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
      <a-col :span="24" :md="12">
        <a-form-item :label="$t('residenceCountry')" name="residenceCountry">
          <a-select
            v-model:value="form.residenceCountry"
            show-search
            :filter-option="filterOption"
            :placeholder="t('selectCountry')"
          >
            <a-select-option :value="v.iso2" v-for="v in CountryOption" :key="v.iso2">
              {{ locale === 'en_US' ? v.name : v.chineseName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('residenceProvince')" name="residenceProvince">
          <a-input v-model:value="form.residenceProvince" :placeholder="$t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('residenceCity')" name="residenceCity">
          <a-input v-model:value="form.residenceCity" :placeholder="$t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('postalCode')" name="postcode">
          <a-input v-model:value.trim="form.postcode" :placeholder="$t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('addressLine1')" name="address1">
          <a-input v-model:value="form.address1" :placeholder="$t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('addressLine2')" name="address2">
          <a-input v-model:value="form.address2" :placeholder="$t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <!--      <a-col :span="24" :md="12">-->
      <!--        <a-form-item :label="$t('addressProofPhoto')" name="proofUrl">-->
      <!--          <app-uploader v-model="form.proofUrl" :text="t('upload')" accept="image/*,.pdf">-->
      <!--            <template #img>-->
      <!--              <img src="@/assets/img/address.png" style="width: 100%" alt="" />-->
      <!--            </template>-->
      <!--          </app-uploader>-->
      <!--        </a-form-item>-->
      <!--      </a-col>-->
    </a-row>
  </a-form>

  <div class="mt-30px">
    <a-button type="primary" size="large" class="w-full md:w-auto min-w-200px" @click="onSubmit">
      {{ t('submit') }}
    </a-button>
    <a-button
      class="w-full mt-[10px] md:w-auto md:ml-[10px] md:mt-0"
      size="large"
      @click="parentStep = 2"
    >
      {{ t('previousStep') }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped></style>
