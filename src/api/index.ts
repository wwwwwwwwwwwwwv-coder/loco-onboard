import request from '@/axios'

// export const addressApi = (data: any): Promise<IResponse<any>> => {
//   return request.post({ url: '/api/walletDeflation/getAddress', data })
// }
// export const orderApi = (data: any): Promise<IResponse<any>> => {
//   return request.post({ url: '/api/walletDeflation/getList', data })
// }

// 提交申请证券账号资料
export const submitApi = (data: any): Promise<any> => {
  return request.post({ url: '/kyc/individual', data })
}

// 文件上传
export const uploadFileApi = (data: any): Promise<any> => {
  return request.post({
    url: `/kyc/file/${data.get('tempToken')}`,
    data,
    headersType: 'multipart/form-data',
  })
}

// 获取信息
export const getInfoApi = (params: any): Promise<any> => {
  return request.get({ url: `/kyc/info/${params.tempToken}` })
}

// // 文件上传
// export const uploadFileApi = (data: any): Promise<any> => {
//   return request.post({ url: '/v1/upload/file', data, headersType: 'multipart/form-data' })
// }

// 获取文章管理列表
export const getArticleListApi = (params: any): Promise<any> => {
  return request.get({ url: '/common/sys-article-list', params })
}

// 获取文章管理详情
export const getArticleDetailApi = (params: any): Promise<any> => {
  return request.get({ url: '/common/sys-article-detail', params })
}

// 获取KYC信息
export const companyKycApi = (params: any): Promise<any> => {
  return request.get({ url: '/company/kyc/get', params })
}

// 提交企业kyc
export const companyKycCommitApi = (data: any): Promise<any> => {
  return request.post({ url: '/company/kyc/commit', data })
}

// KYC文件上传
export const uploadCompanyFileApi = (data: any): Promise<any> => {
  return request.post({
    url: '/company/kyc/file',
    data,
    headersType: 'multipart/form-data',
  })
}

// 提交公司人物代表信息
export const representativesInfoApi = (data: any): Promise<any> => {
  return request.post({ url: '/company/kyc/submit/representatives/info', data })
}

// 删除公司人物代表信息
export const representativesDELApi = (params: any): Promise<any> => {
  return request.delete({ url: '/company/kyc/remove/representatives/info', params })
}

// 修改公司人物代表信息
export const representativesUpdateApi = (data: any): Promise<any> => {
  return request.post({ url: '/company/kyc/update/representatives/info', data })
}

// 发送文件上传链接
export const sendLinkApi = (data: any): Promise<any> => {
  return request.post({ url: '/company/kyc/send/link', data })
}

// 国家
export const countryApi = (params: any): Promise<any> => {
  return request.get({ url: '/common/bank/country', params })
}

// 货币
export const currencyApi = (params: any): Promise<any> => {
  return request.get({ url: '/common/bank/currency', params })
}

// 公司认证资料
export const companyCheckFileApi = (params: any): Promise<any> => {
  return request.get({ url: '/company/kyc/check/file', params })
}

// 上传验证文件
export const verificationApi = (data: any): Promise<any> => {
  return request.post({ url: '/company/kyc/upload/verification', data })
}

// 个人补充资料获取
export const requestInfoApi = (params: any): Promise<any> => {
  return request.get({ url: `/global-rapid-remittance/request-info/${params.tempToken}` })
}

// 个人补充资料上传
export const supplementaryApi = (data: any): Promise<any> => {
  return request.post({ url: '/global-rapid-remittance/supplementary', data })
}

// 查询地址信息
export const addressInfoApi = (params: any): Promise<any> => {
  return request.get({ url: `/global-rapid-remittance/address-info/${params.tempToken}`, params })
}

// RFI 内容
export const rfiInfoApi = (data: any): Promise<any> => {
  return request.post({ url: '/rfi/info', data })
}

// RFI 提交
export const rfiCommitApi = (data: any): Promise<any> => {
  return request.post({ url: '/rfi/commit', data })
}

// 获取申请证券账户资料信息
export const ceeiirsstuInfoApi = (params: any): Promise<any> => {
  return request.get({ url: `/api/securities/getInfo/${params.tempToken}`, params })
}

// 提交申请证券账号资料
export const securitiesSubmitApi = (data: any): Promise<any> => {
  return request.post({ url: `/api/securities/opending/${data.tempToken}`, data })
}
