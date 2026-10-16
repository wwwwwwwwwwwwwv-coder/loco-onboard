<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Rule } from 'ant-design-vue/es/form'
import { representativesInfoApi, representativesUpdateApi } from '@/api'
import { identificationTypeOptions } from '@/options'
import { useConfigStore } from '@/store/modules/config.ts'
import { jobTitleOptions } from '@/options'
import dayjs from 'dayjs'

const { t, locale } = useI18n()

const useConfig = useConfigStore()

const emit = defineEmits(['cancel', 'submit'])

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  isApplicant: {
    type: Boolean, // 是否为代表
  },
})

const rules: Record<string, Rule[]> = {
  legalFirstNameEnglish: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  legalLastNameEnglish: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      pattern: /^$|^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/,
      message: t('personal_material.error.enterEnglish'),
      trigger: 'change',
    },
  ],
  nameInOtherLanguage: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  emailAddress: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      type: 'email',
      message: t('company.valid_email'),
      trigger: 'change',
    },
  ],
  // isApplicant: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  jobTitle: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  ownershipPercentage: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  nationality: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  taxNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  areaCode: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  phoneNumber: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  dateOfBirth: [
    { required: true, message: t('requiredField'), trigger: 'change' },
    {
      validator: (_, value) => {
        if (!value) return Promise.resolve()
        const age = dayjs().diff(dayjs(value), 'year')
        return age >= 18 ? Promise.resolve() : Promise.reject(t('company.age_over_18'))
      },
      trigger: 'change',
    },
  ],
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
  identificationType: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  identificationValue: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  identityDocs: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  proofOfAddress: [{ required: true, message: t('requiredField'), trigger: 'change' }],
}

// 股东表单是否显示
// const shareholdersFormShow = ref(false)
// 股东步数
const step = ref(1)
// 股东表单
const formRef = ref()
// const form = reactive({
//   id: 0,
//   legalFirstNameEnglish: 'aa', // 法定名字英文
//   legalLastNameEnglish: 'bb', // 法定姓氏英文
//   nameInOtherLanguage: 'aa bb', // 其他语言姓名
//   emailAddress: 'sadfas@qq.com', // 邮箱
//   isApplicant: props.isApplicant, // 是否是代表申请人
//   jobTitle: 'DIRECTOR', // 职称 DIRECTOR,BENEFICIAL_OWNER,BENEFICIAL_OWNER_AND_DIRECTOR,AUTHORISED_PERSON
//   ownershipPercentage: 10, // 所有权百分比
//   nationality: 'AD', // 国籍
//   taxNumber: 'aa', // 税号
//   areaCode: '376', // 区号
//   phoneNumber: '100', // 企业联系电话号码
//   dateOfBirth: '2026-04-30', // 出生日期（YYYY-MM-DD）
//   countryOrTerritory: 'AE', // 国家或地区
//   streetAddress: 'bb', // 街道地址
//   apartmentSuiteOrFloor: 'cc', // 公寓套房或楼层
//   city: 'dd', // 城市
//   state: 'ee', // 所在州或省份
//   postalCode: '100000', // 邮政编码
//   identificationType: 'PASSPORT', // 识别类型 PASSPORT ,DRIVERS_LICENSE,NATIONAL_ID
//   identificationValue: 1343241234, // 身份证件号码
//   identityDocs: [
//     {
//       uploadPath: 'local/upload/2026/4/20/20260420020915/门口地垫.jpg',
//       uploadType: 1,
//       uploadName: '门口地垫.jpg',
//       id: 208090,
//       uploadUrl:
//         'https://gat-money-local.s3.ap-east-1.amazonaws.com/local/upload/2026/4/20/20260420020915/%E9%97%A8%E5%8F%A3%E5%9C%B0%E5%9E%AB.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260420T020915Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIASRR36NTEPNFW7NYB%2F20260420%2Fap-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b2f178037a655b283e25fe79fa4b399941110def7e11696a4bc1fbf13dc590a7',
//     },
//   ], // 身份文档
//   proofOfAddress: [
//     {
//       uploadPath: 'local/upload/2026/4/20/20260420020917/电脑桌.jpg',
//       uploadType: 1,
//       uploadName: '电脑桌.jpg',
//       id: 208091,
//       uploadUrl:
//         'https://gat-money-local.s3.ap-east-1.amazonaws.com/local/upload/2026/4/20/20260420020917/%E7%94%B5%E8%84%91%E6%A1%8C.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260420T020918Z&X-Amz-SignedHeaders=host&X-Amz-Expires=900&X-Amz-Credential=AKIASRR36NTEPNFW7NYB%2F20260420%2Fap-east-1%2Fs3%2Faws4_request&X-Amz-Signature=06911aa6f1f29a67027bff7e83677879e9ea4772afb3920e34c4a97d02f701ec',
//     },
//   ], // 地址证明
// })

const form = reactive({
  id: 0,
  legalFirstNameEnglish: undefined, // 法定名字英文
  legalLastNameEnglish: undefined, // 法定姓氏英文
  nameInOtherLanguage: undefined, // 其他语言姓名
  emailAddress: undefined, // 邮箱
  isApplicant: props.isApplicant, // 是否是代表申请人
  jobTitle: props.isApplicant ? 'AUTHORISED_PERSON' : undefined, // 职称 DIRECTOR,BENEFICIAL_OWNER,BENEFICIAL_OWNER_AND_DIRECTOR,AUTHORISED_PERSON
  ownershipPercentage: undefined, // 所有权百分比
  nationality: undefined, // 国籍
  taxNumber: undefined, // 税号
  areaCode: undefined, // 区号
  phoneNumber: undefined, // 企业联系电话号码
  dateOfBirth: undefined, // 出生日期（YYYY-MM-DD）
  countryOrTerritory: undefined, // 国家或地区
  streetAddress: undefined, // 街道地址
  apartmentSuiteOrFloor: undefined, // 公寓套房或楼层
  city: undefined, // 城市
  state: undefined, // 所在州或省份
  postalCode: undefined, // 邮政编码
  identificationType: undefined, // 识别类型 PASSPORT ,DRIVERS_LICENSE,NATIONAL_ID
  identificationValue: undefined, // 身份证件号码
  identityDocs: [], // 身份文档
  proofOfAddress: [], // 地址证明
})

const initData = (v: any) => {
  // 写入数据
  // console.log('写入数据')
  // console.log(v)
  Object.assign(form, v)
}

// 提交股东信息
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      if (step.value === 1) {
        step.value = 2
        return
      }
      const params = { ...toRaw(form) }
      try {
        if (params.id != 0) {
          await representativesUpdateApi(params)
        } else {
          await representativesInfoApi(params)
        }
        emit('submit')
      } catch (error) {
        console.log(error)
      }
    })
    .catch((error: any) => {
      console.log('error', error)
    })
}

// 股东取消按钮
const onCancel = () => {
  emit('cancel')
  step.value = 1
}

// 职位只取前三个 去掉代理
const jobTitleOptions2 = computed(() => {
  return jobTitleOptions.slice(0, 3)
})

defineExpose({ initData })
</script>

<template>
  <div class="border-solid border-[#000000]/15 rounded-[8px] p-[16px] mt-[24px]">
    <h3 class="text-[14px] font-600">{{ title }}</h3>
    <a-form class="mt-5px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <!--        第一步-->
        <template v-if="step === 1">
          <a-col :span="24">
            <a-form-item
              :label="t('company.legal_first_name_english')"
              name="legalFirstNameEnglish"
            >
              <a-input v-model:value="form.legalFirstNameEnglish" :placeholder="t('pleaseEnter')" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="t('company.legal_last_name_english')" name="legalLastNameEnglish">
              <a-input v-model:value="form.legalLastNameEnglish" :placeholder="t('pleaseEnter')" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="t('fullNameNative')" name="nameInOtherLanguage">
              <a-input
                v-model:value="form.nameInOtherLanguage"
                :placeholder="t('fill_native_name')"
              />
              <!--            <a-form-item-rest>-->
              <!--              <a-checkbox class="mt-10px" v-model:checked="form.checked"-->
              <!--                >使用英文作为其他语言名称-->
              <!--              </a-checkbox>-->
              <!--            </a-form-item-rest>-->
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="t('company.email_address')" name="emailAddress">
              <a-input v-model:value="form.emailAddress" :placeholder="t('pleaseEnter')" />
            </a-form-item>
          </a-col>

          <a-col :span="24" v-if="!isApplicant">
            <a-form-item :label="t('company.job_title')" name="jobTitle">
              <a-select
                v-model:value="form.jobTitle"
                :placeholder="t('pleaseSelect')"
                optionLabelProp="label"
              >
                <a-select-option
                  v-for="item in jobTitleOptions2"
                  :key="item.value"
                  :value="item.value"
                  :label="t(`company.options.job_title.${item.label}`)"
                >
                  {{ t(`company.options.job_title.${item.label}`) }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="24" v-if="!isApplicant">
            <a-form-item :label="t('company.ownership_percentage')" name="ownershipPercentage">
              <a-input-number
                v-model:value="form.ownershipPercentage"
                :placeholder="t('pleaseEnter')"
                :precision="2"
                :min="0"
                :max="100"
                class="w-full"
              />
              <p class="mt-10px text-[#000000]/45">{{ t('company.input_percentage_range') }}</p>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item class="mt-30px">
              <a-button block @click="onCancel">{{ t('company.cancel') }}</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item class="mt-30px">
              <a-button block type="primary" @click="onSubmit"
                >{{ t('company.continue') }}
              </a-button>
            </a-form-item>
          </a-col>
        </template>

        <!--        第二步-->
        <template v-if="step === 2">
          <a-col :span="24">
            <a-form-item :label="t('company.nationality')" name="nationality">
              <a-select
                v-model:value="form.nationality"
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
            <a-form-item :label="t('company.tax_number_optional')">
              <a-input v-model:value="form.taxNumber" :placeholder="t('pleaseEnter')" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="$t('company.phone_number_with_country_code')" required>
              <a-input-group compact>
                <a-form-item name="areaCode" no-style>
                  <a-select
                    v-model:value="form.areaCode"
                    :placeholder="$t('countryCode')"
                    show-search
                    style="width: 120px"
                  >
                    <a-select-option
                      v-for="(v, i) in useConfig.country.all"
                      :key="i"
                      :value="v.phoneAreaCode"
                    >
                      <div class="flex items-center">
                        <app-flag-img type="country" :img="v.alphaTwoCode" />&nbsp;+{{
                          v.phoneAreaCode
                        }}
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
          </a-col>

          <a-col :span="24">
            <a-form-item :label="t('company.date_of_birth')" name="dateOfBirth">
              <a-date-picker
                class="w-full"
                valueFormat="YYYY-MM-DD"
                v-model:value="form.dateOfBirth"
              />
            </a-form-item>
          </a-col>

          <a-col :span="24" class="mt-[24px] mb-[4px]">
            <h4 class="text-[14px] font-600">{{ t('company.residential_address') }}</h4>
          </a-col>

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
            <a-form-item :label="t('company.street_address_english')" name="streetAddress">
              <a-input v-model:value="form.streetAddress" :placeholder="t('pleaseEnter')" />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="t('company.apartment_suite_or_floor_english')">
              <a-input v-model:value="form.apartmentSuiteOrFloor" :placeholder="t('pleaseEnter')" />
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

          <a-col :span="24" class="mt-[24px] mb-[4px]">
            <h4 class="text-[14px] font-600">{{ t('company.identity_verification') }}</h4>
            <p class="text-[14px] text-[#000000]/65">{{ t('company.kyc_manual_verify_steps') }}</p>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="$t('company.identification_type')" required>
              <a-input-group compact>
                <a-form-item name="identificationType" no-style>
                  <a-select
                    v-model:value="form.identificationType"
                    :placeholder="t('pleaseSelect')"
                    optionLabelProp="label"
                    style="width: 140px"
                  >
                    <a-select-option
                      v-for="item in identificationTypeOptions"
                      :key="item.value"
                      :value="item.value"
                      :label="t(`company.options.identification_type.${item.label}`)"
                    >
                      {{ t(`company.options.identification_type.${item.label}`) }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item name="identificationValue" no-style>
                  <a-input
                    v-model:value="form.identificationValue"
                    :placeholder="$t('company.input_id_number')"
                    style="width: calc(100% - 140px)"
                  />
                </a-form-item>
              </a-input-group>
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item :label="t('company.upload_id_doc')" name="identityDocs">
              <p class="text-[14px] mb-[3px] text-[#000000]/65">
                {{ t('company.upload_id_doc_msg') }}
              </p>
              <ul class="list-disc pl-[14px] text-[14px] text-[#000000]/65 mb-[15px]">
                <li>
                  <strong class="font-600"
                    >{{ t('company.options.identification_type.passport') }}: </strong
                  >{{ t('company.passport_msg') }}
                </li>
                <li>
                  <strong class="font-600"
                    >{{ t('company.options.identification_type.driver_license') }}: </strong
                  >{{ t('company.driver_license_msg') }}
                </li>
                <li>
                  <strong class="font-600"
                    >{{ t('company.options.identification_type.national_id') }}: </strong
                  >{{ t('company.national_id_msg') }}
                </li>
              </ul>
              <app-upload v-model="form.identityDocs" />
            </a-form-item>
          </a-col>

          <a-col :span="24" class="mt-[24px] mb-[4px]">
            <h4 class="text-[14px]">{{ t('company.id_document_check_requirement_title') }}</h4>
            <ul class="list-disc pl-[14px] text-[14px] text-[#000000]/65">
              <li>{{ t('company.id_document_check_requirement_1') }}</li>
              <li>{{ t('company.id_document_check_requirement_2') }}</li>
              <li>{{ t('company.id_document_check_requirement_3') }}</li>
            </ul>
          </a-col>

          <a-col :span="24" class="mt-[24px] mb-[4px]">
            <a-form-item :label="t('company.proof_of_address')" name="proofOfAddress">
              <p class="text-[14px] text-[#000000]/65 mb-[6px]">
                {{ t('company.address_proof_example') }}
              </p>
              <app-upload v-model="form.proofOfAddress" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item class="mt-30px">
              <a-button block @click="onCancel">{{ t('company.cancel') }}</a-button>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item class="mt-30px">
              <a-button block type="primary" @click="onSubmit">{{ t('company.save') }}</a-button>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
    </a-form>
  </div>
</template>

<style scoped lang="scss"></style>
