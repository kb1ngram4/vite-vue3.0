import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'     // 若没有path包，可yarn add @types/node

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@': resolve('src')
    }
  },
  server:{
    port:3000,
    open:true, //服务启动自动打开浏览器
    proxy:{    //代理
      '/api':{
        target:'',
        changeOrigin: true,
        rewrite:(path)=>path.replace(/^\/api/,''),//代理地址的重写
      },
      //可配置多个

    }

  }
})
