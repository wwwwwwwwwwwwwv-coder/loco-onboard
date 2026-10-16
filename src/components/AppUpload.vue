<script lang="ts" setup>
import { ref, watch } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam, UploadFile } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { uploadCompanyFileApi } from '@/api'
import { useI18n } from 'vue-i18n'

/**
 * 对外数据结构（业务）
 */

export interface UploadItem {
  id?: number
  uploadPath: string
  uploadUrl?: string
  uploadName: string
  uploadType?: number
}

const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    modelValue: UploadItem[]
    maxCount?: number
  }>(),
  {
    maxCount: 5,
  },
)

const emit = defineEmits(['update:modelValue'])

/**
 * 内部 UI 数据（给 a-upload 用） UploadFile[]
 */
const fileList = ref<any>([])

/**
 * 🔁 modelValue → fileList（回显）
 */
watch(
  () => props.modelValue,
  (val) => {
    fileList.value = (val || []).map((item, index) => ({
      uid: item.id ? String(item.id) : `${index}`,
      name: item.uploadName,
      url: item.uploadUrl,
      status: item.uploadType === 1 ? 'done' : item.uploadType === 0 ? 'uploading' : 'error',
      path: item.uploadPath,

      // ...item,
    }))
  },
  { immediate: true },
)

/**
 * 📤 上传处理
 */
const customUpload = async (options: any) => {
  const { file, onSuccess, onError } = options

  const params = new FormData()
  params.append('multipartFile', file as File)

  try {
    const { data } = await uploadCompanyFileApi(params)

    // 👇 标准化返回
    onSuccess?.(
      {
        ...data,
        url: data.uploadUrl, // 给 Ant 用
      },
      file,
    )
  } catch (err) {
    console.log(err)
    message.error('Error')
    // file.status = 'error'
    onSuccess?.({ status: 'error' }, file)
    onError?.(err)
  }
}

/**
 * 🔄 change 统一处理
 */
const handleChange = (info: UploadChangeParam) => {
  console.log('info')
  console.log(info)
  fileList.value = info.fileList.map((f: any) => {
    // 👇 接口返回 → 挂到 f 上
    if (f.response) {
      Object.assign(f, {
        url: f.response?.uploadUrl ?? f.url,
        path: f.response?.uploadPath ?? f.path,
        uploadType: f.status === 'done' ? 1 : f.status === 'uploading' ? 0 : -1,
        uid: f.response?.id ?? f.uid,
      })
    }
    return f
  })

  // 👇 对外输出（只要业务数据）
  const result = fileList.value.map((f: any) => ({
    uploadPath: f.path,
    uploadType: f.status === 'done' ? 1 : f.status === 'uploading' ? 0 : -1,
    uploadName: f.name,
    id: f.uid,
    uploadUrl: f.url,
  }))

  emit('update:modelValue', result)
}

/**
 * 📦 删除
 */
const handleRemove = (file: UploadFile) => {
  const newList = fileList.value.filter((f: any) => f.uid !== file.uid)
  fileList.value = newList

  const result = newList.map((f: any) => ({
    uploadPath: f.path,
    uploadType: f.status === 'done' ? 1 : f.status === 'uploading' ? 0 : -1,
    uploadName: f.name,
    id: f.uid,
    uploadUrl: f.url,
  }))

  emit('update:modelValue', result)
}

/**
 * ✅ 上传前校验
 */
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith('image/')
  const isPdf = file.type === 'application/pdf'
  const isLt50M = file.size / 1024 / 1024 < 50

  if (!isImage && !isPdf) {
    message.error('只能上传图片或 PDF 文件')
    return false
  }

  if (!isLt50M) {
    message.error('文件大小不能超过 50MB')
    return false
  }

  return true
}
</script>

<template>
  <!--  <div class="p-[20px] bg-gray">-->
  <!--    {{ modelValue }}-->
  <!--  </div>-->

  <!--  <div>{{ fileList }}</div>-->
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :multiple="true"
    :accept="'image/*,.pdf'"
    :before-upload="beforeUpload"
    :custom-request="customUpload"
    @change="handleChange"
    @remove="handleRemove"
  >
    <slot>
      <div class="px-10px">
        <p class="ant-upload-drag-icon">
          <inbox-outlined />
        </p>
        <p class="ant-upload-text">{{t('personal_material.upload.dragText')}}</p>
        <p class="ant-upload-hint">{{t('personal_material.upload.hint')}}</p>
      </div>
    </slot>
  </a-upload-dragger>
</template>
