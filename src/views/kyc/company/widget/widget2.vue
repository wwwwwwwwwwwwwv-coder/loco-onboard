<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { companyKycApi, companyKycCommitApi } from '@/api'
import { useConfigStore } from '@/store/modules/config.ts'

defineOptions({
  name: 'kycWidget2',
})

const useConfig = useConfigStore()

const step = 'company_address'

const { t } = useI18n()

const parentStep: any = inject('step')
const verifyStep: any = inject('verifyStep')

const loading = ref(true)
const formRef = ref()

const form = reactive({
  countryOrTerritory: undefined, // 国家或领域
  streetAddress: undefined, // 公司的街道地址
  apartmentSuiteOrFloor: undefined, // 公寓、套房、单元或楼层
  city: undefined, // 公司所在城市的地址
  state: undefined, // 公司地址所在的州或省
  postalCode: undefined, // 公司地址的邮政编码
})

const rules: Record<string, Rule[]> = {
  countryOrTerritory: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  streetAddress: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  apartmentSuiteOrFloor: [
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  city: [
    {
      required: true,
      message: t('requiredField'),
      trigger: 'change',
    },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  state: [
    {
      required: true,
      message: t('requiredField'),
      trigger: 'change',
    },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  postalCode: [{ required: true, message: t('requiredField'), trigger: 'change' }],
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      const params = {
        step,
        companyKycAddress: { ...toRaw(form) },
      }
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

const loadData = async () => {
  const params = { step }
  try {
    const {
      data: { company_address },
    } = await companyKycApi(params)
    console.log(company_address)
    Object.assign(form, company_address)
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
    <h3 class="text-[26px] font-600">{{ t('company.company_address') }}</h3>
    <h4 class="text-[14px] font-600 mt-[20px]">{{ t('company.legal_address_question') }}？</h4>
    <p class="text-[14px] text-[#000000]/65 mt-[10px]">
      {{ t('company.daily_address_description') }}
    </p>

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <!--        使用第一步的地址给默认 但是可以改-->
          <a-form-item :label="t('company.country_or_territory')" name="countryOrTerritory">
            <a-select
              v-model:value="form.countryOrTerritory"
              show-search
              :placeholder="t('pleaseSelect')"
            >
              <a-select-option
                v-for="v in useConfig.country.all"
                :key="v.alphaTwoCode"
                :value="v.alphaTwoCode"
              >
                <div class="flex items-center">
                  <app-flag-img type="country" :img="v.alphaTwoCode" />&nbsp;{{ v.countryName }} ({{
                    v.alphaTwoCode
                  }})
                </div>
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="t('company.street_address_english')" name="streetAddress">
            <a-textarea
              v-model:value="form.streetAddress"
              :placeholder="t('pleaseEnter')"
              show-count
              :maxlength="100"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :label="t('company.apartment_suite_or_floor_english')"
            name="apartmentSuiteOrFloor"
          >
            <a-textarea
              v-model:value="form.apartmentSuiteOrFloor"
              :placeholder="t('pleaseEnter')"
              show-count
              :maxlength="100"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="t('company.city_english')" name="city">
            <a-input v-model:value="form.city" :placeholder="t('pleaseEnter')" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item :label="t('company.state_english')" name="state">
            <a-input v-model:value="form.state" :placeholder="t('pleaseEnter')" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item :label="t('company.postal_code')" name="postalCode">
            <a-input v-model:value="form.postalCode" :placeholder="t('pleaseEnter')" />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item class="mt-30px">
            <a-button block @click="parentStep--">{{ t('company.back') }}</a-button>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item class="mt-30px">
            <a-button block type="primary" @click="onSubmit"
              >{{ t('company.save_and_next') }}
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<style scoped lang="scss"></style>
