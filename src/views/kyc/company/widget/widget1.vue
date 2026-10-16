<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import AppUpload from '@/components/AppUpload.vue'
import { companyKycApi, companyKycCommitApi } from '@/api'
import { useConfigStore } from '@/store/modules/config.ts'
import { companyTypeOptions, taxTypeOptions } from '@/options'
import dayjs from 'dayjs'

defineOptions({
  name: 'kycWidget1',
})

const useConfig = useConfigStore()

const step = 'company_profile'

const dateFormat = 'YYYY-MM-DD'

const { t } = useI18n()

const parentStep: any = inject('step')
const verifyStep: any = inject('verifyStep')

const loading = ref(true)
const formRef = ref()

const form = reactive({
  legalBusinessNameEnglish: undefined, // 英文的法定商业名称
  legalBusinessName: undefined, // 企业在其注册国的法定名称
  businessTradingName: undefined, // 企业商业名称
  countryOfIncorporation: undefined, // 企业注册所在国家IOS2
  companyType: undefined, // 公司实体类型 SOLE_PROPRIETOR,LIMITED_COMPANY,PARTNERSHIP,OTHERS
  areaCode: undefined, // 区号
  phoneNumber: undefined, // 商务联系电话，包括国家代码。+12025550123
  emailAddress: undefined, // 企业联系邮箱 匹配模式:^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$
  companyRegistrationNumber: undefined, // 官方公司注册号
  taxType: undefined, // 税务登记类型。 VAT 、GST 、TAX
  taxNumber: undefined, // 税务识别号码
  incorparateDate: undefined, // 公司成立日期 (YYYY-MM-DD)
  certificationOfIncorporation: [], // array[string]公司注册证书
})

// const form = reactive({
//   legalBusinessNameEnglish: 'aa',
//   legalBusinessName: 'bb',
//   businessTradingName: 'cc',
//   countryOfIncorporation: 'AD',
//   companyType: 'SOLE_PROPRIETOR',
//   areaCode: '376',
//   phoneNumber: '8610086', // 商务联系电话，包括国家代码。+12025550123
//   emailAddress: '123@qq.com',
//   companyRegistrationNumber: '11',
//   taxType: 'GST',
//   taxNumber: '22',
//   incorparateDate: '2015-06-06',
//   certificationOfIncorporation: [], // array[string]公司注册证书
// })

const checked = ref(false)

const rules: Record<string, Rule[]> = {
  legalBusinessNameEnglish: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  legalBusinessName: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  businessTradingName: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  countryOfIncorporation: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  companyType: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  areaCode: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  phoneNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  emailAddress: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      type: 'email',
      message: t('company.valid_email'),
      trigger: 'change',
    },
  ],
  companyRegistrationNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  taxType: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  taxNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  incorparateDate: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  certificationOfIncorporation: [
    {
      required: true,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      const params = {
        step,
        companyKycProfile: { ...toRaw(form) },
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
  loading.value = true
  try {
    const {
      data: { company_profile },
    } = await companyKycApi(params)
    if (
      Array.isArray(company_profile.certificationOfIncorporation) &&
      company_profile.certificationOfIncorporation.length > 0
    ) {
      company_profile.certificationOfIncorporation =
        company_profile.certificationOfIncorporation.map((item: any, index: number) => ({
          uid: item.id?.toString() || String(index),
          name: item.uploadName,
          status: 'done',
          url: item.uploadUrl,
          ...item,
        }))
    }
    Object.assign(form, company_profile)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

// 使用英文作为其他语言名称
const setName = (e: any) => {
  if (e.target.checked) {
    form.legalBusinessName = form.legalBusinessNameEnglish
  }
}

// 更改法定名称英文 同步到其他语言输入框中
const changeLegalBusinessNameEnglish = (_e: any) => {
  if (checked.value) {
    form.legalBusinessName = form.legalBusinessNameEnglish
  }
}

const disabledDate = (current: dayjs.Dayjs) => {
  return current && current.isAfter(dayjs().endOf('day'))
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <a-spin :spinning="loading">
    <h3 class="text-[26px] font-600">{{ t('company.company_profile') }}</h3>

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-form-item
        :label="t('company.legal_business_name_english')"
        name="legalBusinessNameEnglish"
      >
        <a-input
          v-model:value="form.legalBusinessNameEnglish"
          :placeholder="t('pleaseEnter')"
          @change="changeLegalBusinessNameEnglish"
        />
      </a-form-item>

      <a-form-item :label="t('company.native_lang_company_name')" name="legalBusinessName">
        <a-input
          v-model:value="form.legalBusinessName"
          :disabled="checked"
          :placeholder="t('company.native_lang_company_tip')"
        />
        <a-form-item-rest>
          <a-checkbox class="mt-10px" v-model:checked="checked" @change="setName">
            {{ t('company.use_the_english_name_as_the_name_in_other_language') }}
          </a-checkbox>
        </a-form-item-rest>
      </a-form-item>

      <a-form-item :label="t('company.business_trading_name_optional')">
        <a-input v-model:value="form.businessTradingName" :placeholder="t('pleaseEnter')" />
      </a-form-item>

      <a-form-item :label="t('company.country_of_incorporation')" name="countryOfIncorporation">
        <a-select
          v-model:value="form.countryOfIncorporation"
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

      <a-form-item :label="t('company.company_type')" name="companyType">
        <a-select
          v-model:value="form.companyType"
          :placeholder="t('pleaseSelect')"
          optionLabelProp="label"
        >
          <a-select-option
            v-for="item in companyTypeOptions"
            :key="item.value"
            :value="item.value"
            :label="t(`company.options.company_type.${item.label}`)"
          >
            {{ t(`company.options.company_type.${item.label}`) }}
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :label="t('company.phone_number_with_country_code')" required>
        <a-input-group compact>
          <a-form-item name="areaCode" no-style>
            <a-select
              v-model:value="form.areaCode"
              :placeholder="$t('countryCode')"
              show-search
              style="width: 120px"
            >
              <a-select-option
                v-for="(v, i) in useConfig.country.onboard"
                :key="i"
                :value="v.phoneAreaCode"
              >
                <div class="flex items-center">
                  <app-flag-img type="country" :img="v.alphaTwoCode" />&nbsp;+{{ v.phoneAreaCode }}
                </div>
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="phoneNumber" no-style>
            <a-input
              v-model:value="form.phoneNumber"
              :placeholder="$t('pleaseEnter')"
              style="width: calc(100% - 120px)"
              type="number"
            />
          </a-form-item>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="t('company.email_address')" name="emailAddress">
        <a-input v-model:value="form.emailAddress" :placeholder="t('pleaseEnter')" />
      </a-form-item>

      <a-form-item
        :label="t('company.company_registration_number')"
        name="companyRegistrationNumber"
      >
        <a-input v-model:value="form.companyRegistrationNumber" :placeholder="t('pleaseEnter')" />
      </a-form-item>

      <a-form-item :label="$t('company.vat_gst_number')">
        <a-input-group compact>
          <a-form-item no-style>
            <a-select
              v-model:value="form.taxType"
              :placeholder="$t('pleaseSelect')"
              style="width: 120px"
              optionLabelProp="label"
            >
              <a-select-option
                v-for="item in taxTypeOptions"
                :key="item.value"
                :value="item.value"
                :label="t(`company.options.tax_type.${item.label}`)"
              >
                {{ t(`company.options.tax_type.${item.label}`) }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item no-style>
            <a-input
              v-model:value="form.taxNumber"
              :placeholder="$t('pleaseEnter')"
              style="width: calc(100% - 120px)"
            />
          </a-form-item>
        </a-input-group>
      </a-form-item>

      <a-form-item :label="t('company.formation_date')" name="incorparateDate">
        <a-date-picker
          class="w-full"
          :format="dateFormat"
          :valueFormat="dateFormat"
          v-model:value="form.incorparateDate"
          :disabled-date="disabledDate"
        />
      </a-form-item>
      <a-form-item
        :label="$t('company.certification_of_incorporation')"
        name="certificationOfIncorporation"
      >
        <app-upload v-model="form.certificationOfIncorporation"></app-upload>
      </a-form-item>

      <a-form-item class="mt-30px">
        <a-button block type="primary" @click="onSubmit">{{ t('company.save_and_next') }}</a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<style scoped lang="scss"></style>
