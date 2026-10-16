<script lang="ts" setup>
import AppLoadingComponent from '@/components/AppLoadingComponent.vue'
import { submitApi } from '@/api'
import { useRoute } from 'vue-router'
import { getInfoApi } from '@/api'

defineOptions({
  name: 'kycPage',
})

const route = useRoute()

const form = reactive<any>({
  isAllCommit: false, // 是否完全提交

  // widget 1
  nationality: '', // 国家
  idType: 'national_id', // 证件类型
  idNumber: '', // 证件编号

  // widget 2
  userSurname: null, // 姓
  userMiddleName: null, // 中间名
  userGivenName: null, // 名

  firstNamePy: null, // 姓拼音
  middleNamePy: null, // 中间名拼音
  lastNamePy: null, // 名拼音

  userGender: null, // 性别0男1女
  birthday: null, // 用户生日
  idCardFrontUrl: null, // 身份证前面照片
  idCardBackUrl: null, // 身份证背面照片
  idCardHoldingUrl: null, // 手持身份证照片
  idCardValidity: null, // 身份证有效期
  isPermanentlyValid: false, // 是否长期有效
  //
  // widget 3
  userMobile: null, // 手机号
  userMobileArea: null, // 手机区号
  residenceCountry: null, // 居住国家iso2
  residenceProvince: null, // 居住省份
  residenceCity: null, // 居住城市
  postcode: null, // 邮编
  address1: null, // 地址1
  address2: null, // 地址2
  proofUrl: null, // 证明url
})

const componentRef = ref()
const step = ref(1)
const currentComponent = reactive<any>({
  1: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget1.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  2: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget2.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
  3: markRaw(
    defineAsyncComponent({
      loader: () => import('./widget/widget3.vue'),
      loadingComponent: AppLoadingComponent,
    }),
  ),
})

const newUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    const path = decodeURIComponent(urlObj.pathname)
    return path.startsWith('/') ? path.substring(1) : path
  } catch (e) {
    return url
  }
}

const submit = async () => {
  const params: any = {
    tempToken: route.query.t,
    ...toRaw(form),
  }

  // if (params.isIpo) {
  if (params.idCardBackUrl) {
    params.idCardBackUrl = newUrl(params.idCardBackUrl)
  }
  if (params.idCardFrontUrl) {
    params.idCardFrontUrl = newUrl(params.idCardFrontUrl)
  }
  if (params.idCardHoldingUrl) {
    params.idCardHoldingUrl = newUrl(params.idCardHoldingUrl)
  }
  if (params.proofUrl) {
    params.proofUrl = newUrl(params.proofUrl)
  }

  // if (params.isPermanentlyValid) {
  //   params['idCardValidity'] = '2999-01-01'
  // }

  // 合并字段传递
  if (params.middleNamePy) {
    params.firstNamePy = `${params.firstNamePy} ${params.middleNamePy}`
  }

  await submitApi(params)
}

const getInfo = async () => {
  const params = {
    tempToken: route.query.t,
  }
  const { data } = await getInfoApi(params)
  if (data) Object.assign(form, data)

  // if (data.idCardValidity === '2999-01-01') {
  //   form.isPermanentlyValid = true
  // }
  // form.idCardValidity = null
  // console.log(form)
}

provide('step', step)
provide('form', form)
provide('submit', submit)

onMounted(() => {
  getInfo()
})
</script>

<template>
  <!--  <div>{{ form }}</div>-->
  <div class="max-w-1200px mx-auto px-[16px] pt-[20px] md:pt-[60px] pb-[40px]">
    <div class="flex justify-between items-center mb-20px">
      <h3 class="text-[24px] font-600">{{ $t('authentication') }}</h3>
      <a-progress
        :percent="step * 33"
        :showInfo="false"
        :size="30"
        :strokeWidth="14"
        type="circle"
      />
    </div>
    <component :is="currentComponent[step]" ref="componentRef" />
    <!--        <component ref="componentRef" :is="currentComponent[1]" />-->
    <!--        <component ref="componentRef" :is="currentComponent[2]" />-->
    <!--        <component ref="componentRef" :is="currentComponent[3]" />-->
  </div>
</template>

<style lang="scss" scoped></style>
