import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Unocss(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-import.d.ts', // 路径下自动生成文件夹存放全局指令
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // 如果使用自定义主题需要设置为 false
          // importStyle: 'less', // 让组件引入 less 而不是 css
        }),
      ],
      dirs: ['src/components', 'src/components/**'],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      directoryAsNamespace: false, // 组件根据目录生成命名空间
      dts: 'types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         // Input 高度
  //         '@input-height-lg': '80px',
  //
  //         // Select 高度
  //         '@select-single-item-height-lg': '80px',
  //
  //         // Button 高度
  //         '@btn-height-lg': '80px',
  //
  //         // 字体大小
  //         '@font-size-lg': '24px',
  //       },
  //       javascriptEnabled: true,
  //     },
  //   },
  // }
})
