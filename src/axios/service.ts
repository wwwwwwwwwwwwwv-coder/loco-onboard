import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'
import axios from 'axios'
import { config } from './config'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import { useConfigStoreWithOut } from '@/store/modules/config.ts'
import { message } from 'ant-design-vue'

const { result_code, base_url } = config

const basePath: BasePathType = import.meta.env.VITE_API_BASEPATH
const PATH_URL: any = base_url[basePath]

// const localeStore = useLocaleStoreWithOut()
// const configStore = useConfigStoreWithOut()
// const locale = localeStore.getLocale

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL,
  timeout: config.request_timeout,
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const localeStore = useLocaleStoreWithOut()
    const configStore = useConfigStoreWithOut()

    const locale = localeStore.getLocale

    ;(config.headers as AxiosRequestHeaders)['version'] = '1.0.0+1'
    ;(config.headers as AxiosRequestHeaders)['lang'] = locale.lang
    ;(config.headers as AxiosRequestHeaders)['temp-token'] = configStore.tempToken
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// response 拦截器
service.interceptors.response.use(
  async (response: AxiosResponse<any>) => {
    const _data = response.data
    if (response.config.responseType === 'blob') {
      return response
    } else if (_data.code === result_code) {
      return _data
    } else {
      await message.error(_data.message)
      // showFailToast(_data.message)
      return Promise.reject(_data.res_msg)
    }
  },
  (error: AxiosError) => {
    console.log(`err${error}`) // for debug
    return Promise.reject(error)
  },
)

export { service }
