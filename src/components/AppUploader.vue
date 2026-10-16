<script setup lang="ts">
import { reactive, ref } from 'vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

import { uploadFileApi } from '@/api'
import { useRoute } from 'vue-router'

const emit = defineEmits(['update:modelValue'])
const route = useRoute()

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: 'image/*', // 移除了 required: true
  },
})

const loading = ref(false)
const form = reactive({
  uploadUrl: props.modelValue,
})

// 检查是否为pdf
const isPdfByExtension = computed(() => {
  const urlObj = new URL(form.uploadUrl)
  const pathname = urlObj.pathname.toLowerCase()
  return pathname.endsWith('.pdf')
})

const extractPdfFileName = computed(() => {
  // 移除查询参数和锚点
  const cleanUrl = new URL(form.uploadUrl)

  // 提取路径最后一部分
  return cleanUrl.pathname.split('/').pop()
})

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'
  const isLt10M = file.size / 1024 / 1024 < 10
  if (!isImage && !isPdf) {
    message.error('只能上传图片格式文件')
    return false
  }

  console.log(file.size / 1024 / 1024)
  if (!isLt10M) {
    message.error('图片大小不能超过 10MB')
    return false
  }
  return true
}

/**
 * 覆盖 Ant Design 默认上传行为，使用自定义接口上传
 */
const customUpload = async (options: any) => {
  const { file, onSuccess, onError } = options

  loading.value = true
  const params = new FormData()
  params.append('multipartFile', file as File)
  params.append('tempToken', (route.query?.t as string) ?? '')

  console.log(params.get('tempToken'))

  try {
    const { data } = await uploadFileApi(params)
    // form.uploadPath = data.uploadPath
    form.uploadUrl = data.uploadUrl
    emit('update:modelValue', form.uploadUrl)
    onSuccess?.(data, file)
  } catch (err) {
    console.error('文件上传失败:', err)
    message.error('文件上传失败')
    onError?.(err as Error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <a-upload-dragger
    :show-upload-list="false"
    :custom-request="customUpload"
    :disabled="loading"
    :before-upload="beforeUpload"
    :accept="accept"
  >
    <div class="relative">
      <div class="flex justify-center aspect-video">
        <template v-if="form.uploadUrl">
          <div
            class="w-full flex justify-center items-center p-20px relative"
            v-if="isPdfByExtension"
          >
            <img src="@/assets/img/pdf.png" alt="" />
            <p class="absolute bottom-[20%] max-w-[80%] truncate text-[#1D2023]/45">
              {{ extractPdfFileName }}
            </p>
          </div>
          <div v-else class="w-full flex justify-center items-center max-h-[50vh]">
            <img :src="form.uploadUrl" style="max-width: 100%; max-height: 100%" alt="" />
          </div>
        </template>
        <template v-else>
          <div class="p-20px">
            <slot name="img"> img</slot>
          </div>
        </template>
      </div>
      <div
        class="flex items-center justify-center pt-[30px] pb-[10px] absolute left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-[#fff]/60"
      >
        <img src="@/assets/icon/camera.png" style="width: 16px" alt="" />
        <span class="pl-[8px] text-[#1D2023]">{{ text }}</span>
      </div>
      <div class="absolute inset-0 flex justify-center items-center" v-if="loading">
        <loading-outlined style="font-size: 30px" />
      </div>
    </div>
  </a-upload-dragger>
</template>

<style lang="scss" scoped>
:deep(.ant-upload-drag) {
  overflow: hidden;
  background-color: initial;

  .ant-upload {
    padding: 0;
  }
}
</style>
