import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vitePluginStyleToVw from "vite-plugin-style-to-vw"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    vitePluginStyleToVw({
      allReplace: true, //是否全部属性替换
      unitToConvert: "px", // 需要转换的单位，默认为"px"
      viewportWidth: 375, // 设计稿的视口宽度,如传入函数，函数的参数为当前处理的文件路径
      unitPrecision: 6, // 单位转换后保留的精度
      viewportUnit: "vw", // 希望使用的视口单位
      fontViewportUnit: "vw", // 字体使用的视口单位
      minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "${path.resolve(__dirname, 'src/style/mixins.less')}";`
      }
    }
  }
})
