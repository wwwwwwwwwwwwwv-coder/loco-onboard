<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { companyKycApi, companyKycCommitApi, representativesDELApi } from '@/api'
import {
  PlusCircleOutlined,
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons-vue'
import Shareholder from '@/views/kyc/company/widget/widget/shareholder.vue'
import { ref } from 'vue'
import { filter } from '@/utils'
import { jobTitleOptions } from '@/options'

defineOptions({
  name: 'kycWidget5',
})

const step = 'ownership_details'

const { t } = useI18n()

const parentStep: any = inject('step')
const verifyStep: any = inject('verifyStep')

// 股东信息
const shareholder1 = ref()
// 代理人
const shareholder2 = ref()

const loading = ref(true)
const formRef = ref()

const form = reactive<any>({
  companyKycRepresentatives: [], // 公司人务代表信息
  shareholdingFile: [], // 股东文件
  shareholderDocsList: [], // 股权结构
  applicantId: undefined, // 负责人
  agree: false, // 是否同意
})

const rules: Record<string, Rule[]> = {
  applicantId: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  companyKycRepresentatives: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  shareholdingFile: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  shareholderDocsList: [
    {
      required: true,
      type: 'array',
      min: 1,
      message: t('requiredField'),
      trigger: 'change',
    },
  ],
  agree: [
    {
      validator: (_: any, value: boolean) => {
        if (value) {
          return Promise.resolve()
        }
        return Promise.reject(t('company.please_confirm_the_information'))
      },
      trigger: 'change',
    },
  ],
}

// 保存并下一步
const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      loading.value = true
      const params = {
        step,
        companyKycOwnershipDetail: { ...toRaw(form) },
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
  loading.value = true
  const params = { step }
  try {
    const {
      data: { ownership_details },
    } = await companyKycApi(params)
    !ownership_details.shareholderDocsList && (ownership_details.shareholderDocsList = [])
    Object.assign(form, ownership_details)
  } catch (e) {
    console.log('error', e)
  } finally {
    loading.value = false
  }
}

// 股东列表
const shareholdersDataList = computed(() => {
  return form.companyKycRepresentatives.filter((item: any) => item.jobTitle != 'AUTHORISED_PERSON')
})

// 授权列表
const authorizedDataList = computed(() => {
  return form.companyKycRepresentatives.filter((item: any) => item.jobTitle === 'AUTHORISED_PERSON')
})

// 股东表单是否显示
const shareholdersFormShow = ref(false)
// 授权人表单是否显示
const authorizedFormShow = ref(false)

// 股东与授权人信息下拉菜单 isApplicant:是否为授权人
const onClick = async (info: any, item: any, isApplicant: boolean) => {
  console.log(info)
  if (info.key === 'del') {
    await onDeleteShareholders(item.id)
  } else if (info.key === 'edit') {
    if (isApplicant) {
      authorizedFormShow.value = true
      await nextTick()
      shareholder2.value.initData(item)
    } else {
      shareholdersFormShow.value = true
      await nextTick()
      shareholder1.value.initData(item)
    }
  }
}

// 删除股东与授权人
const onDeleteShareholders = async (id: number) => {
  try {
    await representativesDELApi({ id })
    await loadData()
  } catch (error) {
    console.log(error)
  }
}

// 添加股东与授权人回调
const shareholderSubmit = async () => {
  if (authorizedDataList.value.length > 0) {
    form.applicantId = authorizedDataList.value[0].id
  }
  await loadData()
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <a-spin :spinning="loading">
    <h3 class="text-[26px] font-600">{{ t('company.ownership_details') }}</h3>
    <p class="text-[14px] text-[#000000]/65 mt-[10px]">
      <i18n-t keypath="company.beneficial_owner_explain">
        <template #strong>
          <strong class="text-[#000000] font-bold">
            {{ t('company.beneficial_owner_explain_strong') }}
          </strong>
        </template>
      </i18n-t>
    </p>

    <!--  股东列表-->
    <div
      class="border-solid border-[#000000]/15 rounded-[8px] p-[16px] mt-[24px] flex items-center justify-between"
      v-for="(v, i) in shareholdersDataList"
      :key="i"
    >
      <div class="flex items-center gap-[6px]">
        <div
          class="w-48px h-48px bg-[#000000]/2 rounded-full flex justify-center items-center font-bold text-[16px]"
        >
          {{ v.legalFirstNameEnglish[0] }}{{ v.legalLastNameEnglish[0] }}
        </div>
        <div class="flex flex-col gap-[4px]">
          <div class="flex gap-[10px]">
            <strong class="font-bold"
              >{{ v.legalFirstNameEnglish }} {{ v.legalLastNameEnglish }}</strong
            >
            <a-tag color="success">{{ t('company.completed') }}</a-tag>
          </div>
          <p class="text-[#000000]/45">
            {{ t(`company.options.job_title.${filter(jobTitleOptions, v.jobTitle).label}`) }}
          </p>
        </div>
      </div>

      <a-dropdown :trigger="['click']">
        <a-button shape="circle" type="text">
          <template #icon>
            <MoreOutlined />
          </template>
        </a-button>

        <template #overlay>
          <a-menu @click="(info) => onClick(info, v, false)">
            <a-menu-item key="edit">
              <EditOutlined />
              {{ t('company.edit') }}
            </a-menu-item>
            <a-menu-item key="del" style="color: #ff4d4f">
              <DeleteOutlined />
              {{ t('company.delete') }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <!--  股东列表结束-->

    <!--  股东表单-->
    <Shareholder
      ref="shareholder1"
      :title="t('company.ownership_details')"
      :isApplicant="false"
      @cancel="shareholdersFormShow = false"
      @submit="
        () => {
          shareholdersFormShow = false
          shareholderSubmit()
        }
      "
      v-if="shareholdersFormShow"
    />

    <!--  股东表单结束-->

    <div class="mt-[8px]">
      <a-button block type="dashed" @click="shareholdersFormShow = true">
        <template #icon>
          <PlusCircleOutlined />
        </template>
        {{ t('company.add_shareholder') }}
      </a-button>
    </div>

    <a-form class="mt-20px" ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="24">
          <p class="text-[14px] text-[#000000]/65 mb-[6px]">
            {{ t('company.business_account_manager_question') }}
            <a-button
              style="font-size: 14px"
              size="small"
              type="link"
              v-if="authorizedDataList.length === 0"
              @click="authorizedFormShow = true"
              >{{ t('company.add_authorized_representative') }}
            </a-button>
          </p>
        </a-col>

        <a-col :span="24" v-if="authorizedFormShow">
          <!--  授权人表单-->
          <Shareholder
            ref="shareholder2"
            :title="t('company.add_authorized_representative')"
            :isApplicant="true"
            @cancel="authorizedFormShow = false"
            @submit="
              () => {
                authorizedFormShow = false
                shareholderSubmit()
              }
            "
          />
          <!--  授权人表单结束-->
        </a-col>

        <a-col :span="24" v-if="!authorizedFormShow && authorizedDataList.length === 0">
          <a-form-item name="applicantId">
            <a-select v-model:value="form.applicantId" :placeholder="t('pleaseSelect')">
              <a-select-option
                :value="v.id"
                v-for="v in form.companyKycRepresentatives"
                :key="v.id"
              >
                {{ v.legalFirstNameEnglish }} {{ v.legalLastNameEnglish }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="24" v-if="!authorizedFormShow && authorizedDataList.length > 0">
          <!-- 授权人列表-->
          <div
            class="border-solid border-[#000000]/15 rounded-[8px] p-[16px] flex items-center justify-between"
            v-for="(v, i) in authorizedDataList"
            :key="i"
          >
            <div class="flex items-center gap-[6px]">
              <div
                class="w-48px h-48px bg-[#000000]/2 rounded-full flex justify-center items-center font-bold text-[16px]"
              >
                {{ v.legalFirstNameEnglish[0] }}{{ v.legalLastNameEnglish[0] }}
              </div>
              <div class="flex flex-col gap-[4px]">
                <div class="flex gap-[10px]">
                  <strong class="font-bold"
                    >{{ v.legalFirstNameEnglish }} {{ v.legalLastNameEnglish }}</strong
                  >
                  <a-tag color="success">{{ t('company.completed') }}</a-tag>
                </div>
                <p class="text-[#000000]/45">
                  {{ t(`company.options.job_title.${filter(jobTitleOptions, v.jobTitle).label}`) }}
                </p>
              </div>
            </div>

            <a-dropdown :trigger="['click']">
              <a-button shape="circle" type="text">
                <template #icon>
                  <MoreOutlined />
                </template>
              </a-button>

              <template #overlay>
                <a-menu @click="(info) => onClick(info, v, true)">
                  <a-menu-item key="edit">
                    <EditOutlined />
                    {{ t('company.edit') }}
                  </a-menu-item>
                  <a-menu-item key="del" style="color: #ff4d4f">
                    <DeleteOutlined />
                    {{ t('company.delete') }}
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <!--    授权人列表结束-->
        </a-col>

        <a-col :span="24" class="mt-[20px]">
          <a-form-item :label="t('company.shareholder_docs')" name="shareholdingFile">
            <p class="text-[14px] text-[#000000]/65 mb-[6px]">
              {{ t('company.shareholder_supporting_docs') }}
            </p>
            <app-upload v-model="form.shareholdingFile"></app-upload>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item
            :label="t('company.shareholding_structure_chart')"
            name="shareholderDocsList"
          >
            <p class="text-[14px] text-[#000000]/65 mb-[6px]">
              <i18n-t keypath="company.authorization_document_tips">
                <template #link>
                  <a href="/Shareholding_structure.docx" target="_blank">
                    {{ t('company.download_template') }}
                  </a>
                </template>
              </i18n-t>
            </p>
            <app-upload v-model="form.shareholderDocsList"></app-upload>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item name="agree">
            <a-checkbox class="mt-10px" v-model:checked="form.agree"
              >{{ t('company.certify_ownership_information') }}
            </a-checkbox>
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
