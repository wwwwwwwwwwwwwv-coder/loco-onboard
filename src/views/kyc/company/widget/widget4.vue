<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { companyKycApi, companyKycCommitApi } from '@/api'
import { useConfigStore } from '@/store/modules/config.ts'
import { accountPurposeOptions } from '@/options'

defineOptions({
  name: 'kycWidget4',
})

const useConfig = useConfigStore()

const step = 'business_operations'

const { t } = useI18n()

const parentStep: any = inject('step')
const verifyStep: any = inject('verifyStep')

const loading = ref(true)
const formRef = ref()

const form = reactive<any>({
  accountPurpose: [], // 开户目的声明 BUSINESS_PAYMENT,BILL_PAYMENT,CHARITABLE_DONATION,LOAN_REPAYMENT,INVESTMENT,COLLECTION_OF_BUSINESS,OTHERS
  bankingCurrencies: [], // 银行交易中使用的货币
  issuingCountries: [], // 支持发行国家
})

const rules: Record<string, Rule[]> = {
  accountPurpose: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  bankingCurrencies: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  issuingCountries: [
    {
      required: true,
      type: 'array',
      min: 1,
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
        companyKycBusinessOperations: { ...toRaw(form) },
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
      data: { business_operations },
    } = await companyKycApi(params)

    !business_operations.accountPurpose && (business_operations.accountPurpose = [])
    !business_operations.bankingCurrencies && (business_operations.bankingCurrencies = [])
    !business_operations.issuingCountries && (business_operations.issuingCountries = [])

    Object.assign(form, business_operations)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
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
    form.issuingCountries = val.slice(0, 3)
  } else {
    form.issuingCountries = val
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <a-spin :spinning="loading">
    <h3 class="text-[26px] font-600">{{ t('company.business_operations') }}</h3>

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item :label="t('company.account_purpose')" name="accountPurpose">
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
                :label="t(`company.options.account_purpose.${item.label}`)"
              >
                {{ t(`company.options.account_purpose.${item.label}`) }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="t('company.top_3_pay_receive_currencies')" name="bankingCurrencies">
            <a-select
              v-model:value="form.bankingCurrencies"
              show-search
              mode="multiple"
              :placeholder="t('pleaseSelect')"
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

        <a-col :span="24">
          <a-form-item :label="t('company.top_3_pay_receive_countries')" name="issuingCountries">
            <a-select
              v-model:value="form.issuingCountries"
              show-search
              :placeholder="t('pleaseSelect')"
              mode="multiple"
              @change="handleChangeIssuingCountries"
            >
              <a-select-option
                v-for="v in useConfig.country.onboard"
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
