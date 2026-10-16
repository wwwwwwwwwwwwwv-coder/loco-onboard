<script lang="ts" setup>
import { ref, toRaw } from 'vue'
import type { UnwrapRef } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useI18n } from 'vue-i18n'
import { CountryOption } from '@/options/country.ts'

defineOptions({
  name: 'kycWidget2',
})

const { t } = useI18n()

interface FormState {
  isAllCommit: boolean
  nationality: string
  firstNamePy: string
  middleNamePy: string
  // isFlag: boolean
  lastNamePy: string
  userSurname: string
  userMiddleName: string
  userGivenName: string
  userGender: string
  birthday: string
  idCardFrontUrl: string
  idCardBackUrl: string
  idCardHoldingUrl: string
  idCardValidity: string
  isPermanentlyValid: boolean
  idType: string
  userMobile: string
  userMobileArea: string
}

const parentStep: any = inject('step')
const submit: any = inject('submit')
const form: UnwrapRef<FormState> = inject('form')!

const formRef = ref()

const rules: Record<string, Rule[]> = reactive({
  firstNamePy: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  lastNamePy: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  userSurname: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  userMiddleName: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  userGivenName: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  userGender: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  birthday: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  idCardFrontUrl: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  idCardBackUrl: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  idCardHoldingUrl: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  userMobile: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  userMobileArea: [{ required: true, message: t('requiredField'), trigger: 'change' }],
  // idCardValidity: [
  //   {
  //     validator: async (_rule, value) => {
  //       if (!form.isPermanentlyValid && !value) {
  //         return Promise.reject(t('requiredField'))
  //       }
  //       return Promise.resolve()
  //     },
  //     trigger: 'change',
  //   },
  // ],
})

const disabledDate = (current: any) => {
  // 限制只能选择今天之前的日期（防止选未来日期）
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // 设置最小可选年份（示例：允许选择1900年之后的日期）
  // const minYear = 1900
  // const minDate = new Date(minYear, 0, 1)
  // || current > minDate
  return current < today
}

// const isZH = computed(() => {
//   return (
//     form.nationality === 'HK' ||
//     form.nationality === 'TW' ||
//     form.nationality === 'MO' ||
//     form.nationality === 'CN'
//   )
// })

const onSubmit = () => {
  formRef.value
    .validate()
    .then(async () => {
      console.log('values', form, toRaw(form))
      form.isAllCommit = false
      try {
        await submit()
        parentStep.value = 3
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
    <div class="w-full border-1 border-solid border-[#000000]/9 p-[8px] rounded-[8px]">
      <h4 class="mt-[5px] mb-[20px]">{{ $t('fullNameEn') }}</h4>
      <a-row :gutter="16">
        <a-col :span="24" :md="8">
          <a-form-item :label="$t('firstNameEn')" name="firstNamePy">
            <a-input v-model:value="form.firstNamePy" :placeholder="$t('pleaseEnter')" />
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="8">
          <a-form-item :label="$t('middleNameEn')">
            <a-input v-model:value="form.middleNamePy" :placeholder="$t('pleaseEnter')" />
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="8">
          <a-form-item :label="$t('lastNameEn')" name="lastNamePy">
            <a-input v-model:value="form.lastNamePy" :placeholder="$t('pleaseEnter')" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>

    <!--    <div class="w-full py-[20px]">-->
    <!--      <a-form-item name="isFlag">-->
    <!--        <a-checkbox v-model:checked="form.isFlag">英文姓名与本国姓名相同</a-checkbox>-->
    <!--      </a-form-item>-->
    <!--    </div>-->

    <div class="w-full border-1 border-solid border-[#000000]/9 p-[8px] rounded-[8px] mt-[30px]">
      <h4 class="mt-[5px] mb-[20px]">{{ $t('fullNameNative') }}</h4>
      <a-row :gutter="16">
        <a-col :span="24" :md="8">
          <a-form-item :label="$t('firstNameNative')" name="userGivenName">
            <a-input v-model:value="form.userGivenName" :placeholder="$t('fill_native_name')" />
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="8">
          <a-form-item :label="$t('middleNameNative')">
            <a-input v-model:value="form.userMiddleName" :placeholder="$t('fill_native_name')" />
          </a-form-item>
        </a-col>

        <a-col :span="24" :md="8">
          <a-form-item :label="$t('lastNameNative')" name="userSurname">
            <a-input v-model:value="form.userSurname" :placeholder="$t('fill_native_name')" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>

    <a-row :gutter="16">
      <a-col :span="24" :md="12">
        <a-form-item :label="$t('gender')" name="userGender">
          <a-select v-model:value="form.userGender">
            <a-select-option :value="0">{{ $t('male') }}</a-select-option>
            <a-select-option :value="1">{{ $t('female') }}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item :label="$t('birthDate')" name="birthday">
          <a-date-picker
            v-model:value="form.birthday"
            :inputReadOnly="true"
            type="date"
            :showToday="false"
            valueFormat="YYYY-MM-DD"
            :placeholder="$t('selectDate')"
            class="w-full md:w-500px"
          />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item :label="$t('contactInfo')" required>
          <a-input-group compact>
            <a-form-item name="userMobileArea" no-style>
              <a-select
                v-model:value="form.userMobileArea"
                :placeholder="$t('countryCode')"
                show-search
                style="width: 120px"
              >
                <a-select-option v-for="v in CountryOption" :key="v.dialCode" :value="v.dialCode">
                  <div class="flex items-center">
                    <img
                      :src="v.icon"
                      alt=""
                      style="width: 24px; height: 24px; border-radius: 24px"
                    />&nbsp;<span>+{{ v.dialCode }}</span>
                  </div>
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item name="userMobile" no-style>
              <a-input
                v-model:value="form.userMobile"
                :placeholder="$t('mobileNumber')"
                style="width: calc(100% - 120px)"
                type="number"
              />
            </a-form-item>
          </a-input-group>
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="t('frontSidePhoto')" name="idCardFrontUrl">
          <app-uploader v-model="form.idCardFrontUrl" :text="t('upload')">
            <template #img>
              <img src="@/assets/img/front.png" style="width: 100%" alt="" />
            </template>
          </app-uploader>
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12" v-if="form.idType === 'national_id'">
        <a-form-item :label="t('backSidePhoto')" name="idCardBackUrl">
          <app-uploader v-model="form.idCardBackUrl" :text="t('upload')">
            <template #img>
              <img src="@/assets/img/back.png" style="width: 100%" alt="" />
            </template>
          </app-uploader>
        </a-form-item>
      </a-col>

      <a-col :span="24" :md="12">
        <a-form-item :label="$t('idPhoto')" name="idCardHoldingUrl">
          <app-uploader v-model="form.idCardHoldingUrl" :text="t('upload')">
            <template #img>
              <img src="@/assets/img/selfie.png" style="width: 100%" alt="" />
            </template>
          </app-uploader>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item
          :label="t('validityPeriod')"
          name="idCardValidity"
          :rules="[
            {
              required: !form.isPermanentlyValid,
              message: t('requiredField'),
              trigger: 'change',
            },
          ]"
        >
          <a-date-picker
            v-model:value="form.idCardValidity"
            :disabled="form.isPermanentlyValid"
            :disabledDate="disabledDate"
            :inputReadOnly="true"
            type="date"
            :showToday="false"
            valueFormat="YYYY-MM-DD"
            :placeholder="$t('selectDate')"
            class="w-full md:w-500px"
          />
          <div class="mt-10px">
            <a-form-item-rest>
              <a-checkbox v-model:checked="form.isPermanentlyValid">
                {{ t('permanentlyValid') }}
              </a-checkbox>
            </a-form-item-rest>
          </div>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
  <div class="mt-30px">
    <a-button type="primary" size="large" class="w-full md:w-auto min-w-200px" @click="onSubmit">
      {{ t('nextStep') }}
    </a-button>
    <a-button
      class="w-full mt-[10px] md:w-auto md:ml-[10px] md:mt-0"
      size="large"
      @click="parentStep = 1"
    >
      {{ t('previousStep') }}
    </a-button>
  </div>
</template>

<style lang="scss" scoped></style>
