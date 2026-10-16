<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { companyKycApi, companyKycCommitApi } from '@/api'
import { MailOutlined } from '@ant-design/icons-vue'
import AppUpload from '@/components/AppUpload.vue'
import { useConfigStore } from '@/store/modules/config.ts'
import { industryOptions, turnoverMonthlyOptions, numberOfEmployeeOptions } from '@/options'

defineOptions({
  name: 'kycWidget3',
})

const useConfig = useConfigStore()

const step = 'business_details'

const { t } = useI18n()

const parentStep: any = inject('step')
const verifyStep: any = inject('verifyStep')

const loading = ref(true)
const formRef = ref()

const form = reactive({
  isSameAddress: false, // 经营地址是否与注册地址一致 0-否 1-是
  countryOrTerritory: undefined, // 国家或领地
  streetAddress: undefined, // 街道地址
  apartmentSuiteOrFloor: undefined, // 公寓、套房、单元或楼层
  city: undefined, // 城市的地址
  state: undefined, // 所在的州或省
  postalCode: undefined, // 邮政编码
  industry: undefined, // 工业
  turnoverMonthly: undefined, // 本月的总营业收入以美元估算(eg:TM001) 。TM001 :Less than 50,000 ; TM002:50,000 to 100,000 ;TM003 : 100,000 to 250,000 ; TM004 :250,000 to 500,000 ; TM005 : Over 500,000
  numberOfEmployee: undefined, // 目前为该业务工作的员工、承包商、供应商等的估计上限(eg:BS001)。 BS001: 0-1 Employee; BS002: 2-10 Employees; BS003: 11-50 Employees; BS004: 51-200 Employees; BS005:>200 Employees ;
  companyDescType: 0, // 类型
  websiteUrl: undefined, // 公司官方网站网址
  companyDescription: undefined, // 公司业务的简要介绍
  companyDescriptionDocuments: [], // 公司业务的简要介绍文件
  businessArticlesOfAssociation: [], // 组织章程
  businessOtherDocuments: [], // 其他文件
})

const rules: Record<string, Rule[]> = {
  isSameAddress: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  countryOrTerritory: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  streetAddress: [
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
  industry: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  turnoverMonthly: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  numberOfEmployee: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  websiteUrl: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  companyDescription: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  companyDescriptionDocuments: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  businessArticlesOfAssociation: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  businessOtherDocuments: [{ required: true, message: t('requiredField'), trigger: 'change' }],
}

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      const params = {
        step,
        companyKycBusinessDetail: { ...toRaw(form) },
      }
      try {
        await verifyStep()
        await companyKycCommitApi(params)
        parentStep.value++
      } catch (error) {
        console.log(error)
      } finally {
        loading.value = true
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

// 默认展开的父级节点
const expandedKeys = ref<any>([])

const loadData = async () => {
  const params = { step }
  loading.value = true
  try {
    const {
      data: { business_details },
    } = await companyKycApi(params)
    console.log(business_details)

    !business_details.companyDescriptionDocuments &&
      (business_details.companyDescriptionDocuments = [])
    !business_details.businessArticlesOfAssociation &&
      (business_details.businessArticlesOfAssociation = [])
    !business_details.businessOtherDocuments && (business_details.businessOtherDocuments = [])

    // 切割默认展示父级
    const { industry } = business_details
    expandedKeys.value = industry ? [industry.split('-')[0]] : []

    Object.assign(form, business_details)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// 搜索行业
const filterTreeNode = (input: string, node: any) => {
  return node.label?.toLowerCase().includes(input.toLowerCase())
}

const industryOptionsMap = computed(() => {
  return industryOptions.map((item) => ({
    selectable: false,
    label: t(`company.options.industry.${item.label}`), // 👈 自定义显示
    value: item.value,
    children: item.children?.map((child) => ({
      label: t(`company.options.industry.${child.label}`),
      value: child.value,
    })),
  }))
})

onMounted(() => {
  loadData()
})
</script>

<template>
  <a-spin :spinning="loading">
    <h3 class="text-[26px] font-600">{{ t('company.business_details') }}</h3>
    <h4 class="text-[14px] font-600 mt-[20px]">{{ t('company.main_work_region_question') }}</h4>

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item>
            <a-checkbox class="mt-10px" v-model:checked="form.isSameAddress"
              >{{ t('company.business_address_same_as_registered') }}
            </a-checkbox>
          </a-form-item>
        </a-col>

        <template v-if="!form.isSameAddress">
          <a-col :span="24">
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
                    <app-flag-img type="country" :img="v.alphaTwoCode" />&nbsp;{{
                      v.countryName
                    }}
                    ({{ v.alphaTwoCode }})
                  </div>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item
              ref="name"
              :label="t('company.street_address_english')"
              name="streetAddress"
            >
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
        </template>
        <a-col :span="24">
          <a-form-item :label="t('company.industry')" name="industry">
            <a-tree-select
              v-model:value="form.industry"
              :tree-data="industryOptionsMap"
              treeExpandAction="click"
              show-search
              placeholder="Please select"
              :filter-tree-node="filterTreeNode"
              :treeDefaultExpandedKeys="expandedKeys"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="t('company.monthly_revenue_question')" name="turnoverMonthly">
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

            <p class="mt-10px text-[#000000]/45">{{ t('company.estimate_in_usd') }}</p>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="t('company.number_of_employee')" name="numberOfEmployee">
            <a-select
              v-model:value="form.numberOfEmployee"
              :placeholder="$t('pleaseSelect')"
              optionLabelProp="label"
            >
              <a-select-option
                v-for="item in numberOfEmployeeOptions"
                :key="item.value"
                :value="item.value"
                :label="t(`company.options.number_of_employee.${item.label}`)"
              >
                {{ t(`company.options.number_of_employee.${item.label}`) }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24" class="mt-[30px]">
          <h4 class="text-[14px] font-600">
            {{ t('company.company_information_provide_at_least_one') }}
          </h4>
          <a-tabs v-model:activeKey="form.companyDescType" destroyInactiveTabPane>
            <a-tab-pane :key="0">
              <template #tab>
                <span>
                  <MailOutlined />
                  {{ t('company.company_website') }}
                </span>
              </template>
              <a-col :span="24">
                <a-form-item :label="t('company.company_website')" name="websiteUrl">
                  <a-input v-model:value="form.websiteUrl" placeholder="https://www.example.com" />
                </a-form-item>
              </a-col>
            </a-tab-pane>
            <a-tab-pane :key="1">
              <template #tab>
                <span>
                  <MailOutlined />
                  {{ t('company.marketing_material') }}
                </span>
              </template>
              <a-col :span="24">
                <a-form-item
                  :label="t('company.marketing_material')"
                  name="companyDescriptionDocuments"
                >
                  <p class="text-[#000000]/65 mb-[10px] whitespace-pre-wrap">
                    <i18n-t keypath="company.template_reference_tips">
                      <template #link>
                        <a href="/Company Introduction.pdf" target="_blank">
                          {{ t('company.template') }}
                        </a>
                      </template>
                    </i18n-t>
                  </p>
                  <app-upload v-model="form.companyDescriptionDocuments" />
                </a-form-item>
              </a-col>
            </a-tab-pane>
          </a-tabs>
        </a-col>

        <a-col :span="24">
          <a-form-item
            ref="name"
            :label="t('company.company_description')"
            name="companyDescription"
          >
            <a-textarea
              v-model:value="form.companyDescription"
              allow-clear
              :auto-size="{ minRows: 2, maxRows: 5 }"
              :placeholder="t('company.company_description_example')"
            />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :label="$t('company.memorandum_articles_of_formation')"
            name="businessArticlesOfAssociation"
          >
            <app-upload v-model="form.businessArticlesOfAssociation" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :label="$t('company.other_documents')">
            <app-upload v-model="form.businessOtherDocuments" />
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
