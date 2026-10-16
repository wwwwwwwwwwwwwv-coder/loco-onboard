// import { CountryOption } from '@/options/country.ts'
//
// export const filterCountry = (input: any, option: any) => {
//   const country = CountryOption.find((item) => item.alphaTwoCode === option.value)
//   if (!country) return false
//
//   const searchText = input.toLowerCase()
//   return (
//     country.countryName.toLowerCase().includes(searchText) ||
//     country.alphaThreeCode.toLowerCase().includes(searchText) ||
//     country.alphaTwoCode.toLowerCase().includes(searchText)
//   )
// }

// 根据数组返回对象
export const filter = (items: Array<any>, key: String) => {
  return items.filter((item) => item.value === key)[0]
}

export const toArray = (val?: string | null) =>
  typeof val === 'string' ? val.split(',') : []
