<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { supplementaryApi } from '@/api'
import { useConfigStore } from '@/store/modules/config.ts'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import {
  employmentStatusOptions,
  jobTitleOptions,
  industryOptions,
} from '@/options/personal_material_config.ts'

defineOptions({
  name: 'kycWidget1',
})

const useConfig = useConfigStore()
const { t } = useI18n()

const parentStep: any = inject('step')
const parentForm: any = inject('form')
const parentIsProofUrl: any = inject('isProofUrl')

const loading = ref(false)
const formRef = ref()

const form = reactive<any>({
  countryOrTerritory: undefined, // 居住国家
  streetAddress: undefined, // 街道地址
  apartmentSuiteOrFloor: undefined, // 公寓
  city: undefined, // 城市
  state: undefined, // 省份
  postalCode: undefined, // 邮政编码
  employmentStatus: undefined, // 雇员状态
  industry: undefined, // 行业
  jobTitle: undefined, // 职位
  companyName: undefined, // 公司名称
  proofOfAddressResp: [], // 地址证明
})

const rules: Record<string, Rule[]> = {
  countryOrTerritory: [
    {
      required: true,
      message: t('personal_material.error.selectCountry'),
      trigger: 'change',
    },
  ],
  streetAddress: [
    {
      required: true,
      message: t('personal_material.error.streetAddressRequired'),
      trigger: 'change',
    },
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
    { required: true, message: t('personal_material.error.cityRequired'), trigger: 'change' },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  state: [
    { required: true, message: t('personal_material.error.stateRequired'), trigger: 'change' },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  postalCode: [
    {
      required: true,
      message: t('personal_material.error.postalCodeInvalid'),
      trigger: 'change',
    },
  ],
  employmentStatus: [
    {
      required: true,
      message: t('personal_material.error.employmentStatusRequired'),
      trigger: 'change',
    },
  ],
  industry: [
    {
      required: true,
      message: t('personal_material.error.industryRequired'),
      trigger: 'change',
    },
  ],
  jobTitle: [
    {
      required: true,
      message: t('personal_material.error.jobTitleRequired'),
      trigger: 'change',
    },
  ],
  companyName: [
    {
      required: true,
      message: t('personal_material.error.companyNameRequired'),
      trigger: 'change',
    },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  proofOfAddressResp: [
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
        ...toRaw(form),
        tempToken: useConfig.tempToken,
      }
      try {
        await supplementaryApi(params)
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

// 默认展开的父级节点
const expandedKeys = ref<any>([])

// 搜索行业
const filterTreeNode = (input: string, node: any) => {
  return node.label?.toLowerCase().includes(input.toLowerCase())
}

onMounted(() => {
  for (const argumentsKey in form) {
    form[argumentsKey] = parentForm[argumentsKey]
  }

  // 切割默认展示父级
  const industry = form.industry
  expandedKeys.value = industry ? [industry.split('-')[0]] : []
})

const industryOptionsMap = computed(() => {
  return industryOptions.map((item) => ({
    selectable: false,
    label: t(`personal_material.options.industry.${item.label}`), // 👈 自定义显示
    value: item.value,
    children: item.children?.map((child) => ({
      label: t(`personal_material.options.industry.${child.label}`),
      value: child.value,
    })),
  }))
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
      <a-progress type="circle" :percent="50" :size="20" />
    </div>

    <a-divider />

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-form-item :label="t('personal_material.form.country')" name="countryOrTerritory">
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

      <a-col :span="24">
        <a-form-item
          ref="name"
          :label="t('personal_material.form.streetAddressEn')"
          name="streetAddress"
        >
          <a-input v-model:value="form.streetAddress" :placeholder="t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item
          :label="t('personal_material.form.apartmentOptionalEn')"
          name="apartmentSuiteOrFloor"
        >
          <a-input v-model:value="form.apartmentSuiteOrFloor" :placeholder="t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item ref="name" :label="t('personal_material.form.cityEn')" name="city">
          <a-input v-model:value="form.city" :placeholder="t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item ref="name" :label="t('personal_material.form.stateEn')" name="state">
          <a-input v-model:value="form.state" :placeholder="t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item ref="name" :label="t('personal_material.form.postalCode')" name="postalCode">
          <a-input v-model:value="form.postalCode" :placeholder="t('pleaseEnter')" />
        </a-form-item>
      </a-col>

      <a-col :span="24" v-if="!parentIsProofUrl">
        <a-form-item :label="t('company.proof_of_address')" name="proofOfAddressResp">
          <p class="text-[14px] text-[#000000]/65 mb-[6px]">
            {{ t('company.address_proof_example') }}
          </p>
          <app-upload v-model="form.proofOfAddressResp" />
          <a-alert
            v-if="form.countryOrTerritory === 'CN'"
            class="mt-[10px]"
            banner
            :message="t('company.remittance_rule_notice')"
            type="warning"
          />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item :label="t('personal_material.form.employmentStatus')" name="employmentStatus">
          <a-select
            v-model:value="form.employmentStatus"
            :placeholder="t('pleaseSelect')"
            optionLabelProp="label"
          >
            <a-select-option
              v-for="item in employmentStatusOptions"
              :key="item.value"
              :value="item.value"
              :label="t(`personal_material.options.employmentStatus.${item.label}`)"
            >
              {{ t(`personal_material.options.employmentStatus.${item.label}`) }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item :label="t('personal_material.form.industry')" name="industry">
          <a-tree-select
            v-model:value="form.industry"
            :tree-data="industryOptionsMap"
            treeExpandAction="click"
            show-search
            :placeholder="t('pleaseSelect')"
            :filter-tree-node="filterTreeNode"
            :treeDefaultExpandedKeys="expandedKeys"
          />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item :label="t('personal_material.form.jobTitle')" name="jobTitle">
          <a-select
            v-model:value="form.jobTitle"
            :placeholder="t('pleaseSelect')"
            optionLabelProp="label"
          >
            <a-select-option
              v-for="item in jobTitleOptions"
              :key="item.value"
              :value="item.value"
              :label="t(`personal_material.options.jobTitle.${item.label}`)"
            >
              {{ t(`personal_material.options.jobTitle.${item.label}`) }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item :label="t('personal_material.form.companyNameEn')" name="companyName">
          <a-input v-model:value="form.companyName" :placeholder="t('pleaseEnter')" />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <p class="text-[12px] text-[#000000]/65">
          {{ t('personal_material.form.employmentNote') }}
        </p>
      </a-col>

      <a-form-item class="mt-30px">
        <a-button block type="primary" @click="onSubmit"
          >{{ t('personal_material.common.next') }}
        </a-button>
      </a-form-item>
    </a-form>
  </a-spin>
</template>

<style scoped lang="scss"></style>
