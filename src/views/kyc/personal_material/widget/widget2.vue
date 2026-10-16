<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { supplementaryApi } from '@/api'
import { useConfigStore } from '@/store/modules/config.ts'
import { ExclamationCircleFilled, CheckOutlined, CloseOutlined } from '@ant-design/icons-vue'
import { turnoverMonthlyOptions } from '@/options'
import { accountPurposeOptions } from '@/options/personal_material_config.ts'

defineOptions({
  name: 'kycWidget2',
})

const useConfig = useConfigStore()

const { t } = useI18n()

const parentStep: any = inject('step')
const parentForm: any = inject('form')

const loading = ref(false)
const formRef = ref()

const form = reactive<any>({
  accountPurpose: [], // 账号用户 多选英文逗号隔开 PURCHASE（购买） BILL_PAYMENT（账单支付） EDUCATIONAL_EXPENSES（教育费用） PERSONAL_REMITTANCE（个人汇款） CHARITABLE_DONATION（慈善捐赠）LOAN_REPAYMENT（贷款还款） INVESTMENT（投资） OTHERS（其他）
  otherPurpose: undefined, // 其他目的 多选英文逗号隔开
  bankingCountries: [], // 申请哪个国家的银行卡 多选英文逗号隔开
  bankingCurrencies: [], // 申请银行币种 多选英文逗号隔开
  internationally: true, // 是否涉及国际交易
  turnoverMonthly: undefined, // 本月预计的营业总收入（单位：美元） TM001 Less than 50,000 ;TM002 50,000 to 100,000 ;TM003 100,000 to 250,000 ;TM004 250,000 to 500,000; TM005 Over 500,000
  annualIncome: undefined, // 年收入
  turnoverMonthlyCurrency: undefined, // 估算每月交易量的货币
  sourceOfFundsObject: [], // 资金来源证明
})

const rules: Record<string, Rule[]> = {
  accountPurpose: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('personal_material.error.accountPurposeRequired'),
      trigger: 'change',
    },
  ],
  otherPurpose: [
    {
      required: true,
      message: t('personal_material.error.otherPurposeRequired'),
      trigger: 'change',
    },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  bankingCurrencies: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('personal_material.error.currencyRequired'),
      trigger: 'change',
    },
  ],
  bankingCountries: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('personal_material.error.countryOfIssuanceRequired'),
      trigger: 'change',
    },
  ],
  turnoverMonthly: [
    {
      required: true,
      message: t('personal_material.error.monthlyRevenueRequired'),
      trigger: 'change',
    },
  ],
  annualIncome: [
    {
      required: true,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  turnoverMonthlyCurrency: [
    {
      required: true,
      message: t('personal_material.error.revenueCurrencyRequired'),
      trigger: 'change',
    },
  ],
  sourceOfFundsObject: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('personal_material.error.sourceOfFundsRequired'),
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
        ...toRaw(form),
        tempToken: useConfig.tempToken,
      }
      params.accountPurpose = params.accountPurpose.join()
      params.bankingCountries = params.bankingCountries.join()
      params.bankingCurrencies = params.bankingCurrencies.join()
      params['isSubmit'] = true
      try {
        await supplementaryApi(params)
        parentForm.auditStatus = 'under_review'
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

// 货币
const handleChangeBankingCurrencies: any = (val: string[]) => {
  if (val.length > 3) {
    form.bankingCurrencies = val.slice(0, 3)
  } else {
    form.bankingCurrencies = val
  }
}

// 国家
const handleChangeIssuingCountries: any = (val: string[]) => {
  if (val.length > 3) {
    form.bankingCountries = val.slice(0, 3)
  } else {
    form.bankingCountries = val
  }
}

onMounted(() => {
  for (const argumentsKey in form) {
    form[argumentsKey] = parentForm[argumentsKey]
  }
})
</script>

<template>
  <a-spin :spinning="loading">
    <div
      class="bg-[#E6F4FF] border-solid border-[#91CAFF] rounded-[8px] px-[10px] py-[17px] flex items-start gap-[10px]"
    >
      <ExclamationCircleFilled class="text-[#1677FF] mt-[4px]" />
      <div class="flex-1">
        <h3 class="text-[16px] text-black/88">{{ t('personal_material.common.reminderTitle') }}</h3>
        <p class="text-[14px] text-black/88">{{ t('personal_material.common.reminderDesc') }}</p>
      </div>
      <a-progress type="circle" :percent="100" :size="20" />
    </div>

    <a-divider />

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="t('personal_material.form.accountPurpose')" name="accountPurpose">
            <a-select
              v-model:value="form.accountPurpose"
              :placeholder="t('pleaseSelect')"
              mode="multiple"
              optionLabelProp="label"
            >
              <a-select-option
                v-for="item in accountPurposeOptions"
                :key="item.value"
                :value="item.value"
                :label="t(`personal_material.options.accountPurpose.${item.label}`)"
              >
                {{ t(`personal_material.options.accountPurpose.${item.label}`) }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24" v-if="form.accountPurpose.indexOf('OTHERS') > -1">
          <a-form-item :label="t('personal_material.form.otherPurposeEn')" name="otherPurpose">
            <a-input v-model:value="form.otherPurpose" :placeholder="t('pleaseEnter')" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="t('personal_material.form.topCountries')" name="bankingCountries">
            <a-select
              v-model:value="form.bankingCountries"
              show-search
              mode="multiple"
              :placeholder="t('pleaseSelect')"
              @change="handleChangeIssuingCountries"
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
          <a-form-item :label="t('personal_material.form.topCurrencies')" name="bankingCurrencies">
            <a-select
              v-model:value="form.bankingCurrencies"
              show-search
              :placeholder="t('pleaseSelect')"
              mode="multiple"
              @change="handleChangeBankingCurrencies"
            >
              <a-select-option
                v-for="v in useConfig.currency.onboard"
                :key="v.currencyCode"
                :value="v.currencyCode"
              >
                {{ v.currencyCode }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24" class="mt-[10px]">
          <a-form-item>
            <p class="text-[#1D2023] text-[14px] font-600 mb-[4px]">
              {{ t('personal_material.form.crossBorder') }}
            </p>
            <a-switch v-model:checked="form.internationally">
              <template #checkedChildren>
                <check-outlined />
              </template>
              <template #unCheckedChildren>
                <close-outlined />
              </template>
            </a-switch>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :label="t('personal_material.form.monthly_income_ask')"
            name="turnoverMonthly"
          >
            <a-select
              v-model:value="form.turnoverMonthly"
              :placeholder="t('personal_material.form.monthlyRevenueHint')"
              optionLabelProp="label"
            >
              <a-select-option
                v-for="item in turnoverMonthlyOptions"
                :key="item.value"
                :value="item.value"
                :label="t(`options.turnoverMonthly.${item.label}`)"
              >
                {{ t(`options.turnoverMonthly.${item.label}`) }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :label="t('personal_material.form.annual_income_question')"
            name="annualIncome"
          >
            <a-input
              v-model:value.number="form.annualIncome"
              type="number"
              @wheel.prevent
              :placeholder="t('personal_material.form.monthlyRevenueHint')"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :label="t('personal_material.form.primaryCurrency')"
            name="turnoverMonthlyCurrency"
          >
            <a-select
              v-model:value="form.turnoverMonthlyCurrency"
              show-search
              :placeholder="t('pleaseSelect')"
            >
              <a-select-option
                v-for="v in useConfig.currency.onboard"
                :key="v.currencyCode"
                :value="v.currencyCode"
              >
                {{ v.currencyCode }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <!--        <a-col :span="24">-->
        <!--          <a-form-item ref="name" :label="t('personal_material.form.sourceOfFunds')" name="sourceOfFundsObject">-->
        <!--            <app-upload v-model="form.sourceOfFundsObject" />-->
        <!--          </a-form-item>-->
        <!--        </a-col>-->

        <a-col :span="12">
          <a-form-item class="mt-30px">
            <a-button block @click="parentStep--">
              {{ t('personal_material.common.back') }}
            </a-button>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item class="mt-30px">
            <a-button block type="primary" @click="onSubmit">
              {{ t('personal_material.common.submit') }}
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-spin>
</template>

<style scoped lang="scss"></style>
