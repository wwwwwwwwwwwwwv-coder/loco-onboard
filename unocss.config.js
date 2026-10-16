import { defineConfig, presetAttributify, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  // presets: [presetUno(), presetAttributify(), presetIcons({scale: 1.2, warn: true})],
  shortcuts: [
  //   ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['text-black2', 'text-black text-opacity-65'],
    ['text-black3', 'text-black text-opacity-40'],
    // ['border','border border-color-border']

  //   ['flex-col', 'flex flex-col'],
  //   ['text-ellipsis', 'truncate'],
  //   ['icon-btn', 'text-16 inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-primary !outline-none']
  ],
  rules: [
    ['form-w',{'width':'var(--v-form-width)'}],
    ['w-form',{'width':'var(--v-form-width)'}]
    // [/^m-(\d+)$/, ([_, num]) => ({ margin: `${num}px` })],
    // [/^mx-(\d+)$/, ([_, num]) => ({ 'margin-left': `${num}px` ,'margin-right':`${num}px`})],
    // [/^p-(\d+)$/, ([_, num]) => ({ padding: `${num}px` })]
    // [/^bc-(.+)$/, ([, color]) => ({ 'border-color': `#${color}` })],
    // ['card-shadow', { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }],
  ],
  theme: {
    colors: {
      primary: 'var(--el-color-primary)',
      red:'#FF442F',
      green:'#06CB55',
      dark_bg: 'var(--dark-bg)',
      // border:'#e8e8e8',
    },
  },
})