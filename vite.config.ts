import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'     // 若没有path包，可yarn add @types/node
// vite
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default (command,mode)=>{
  console.log('mode',mode);
  
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve:{
      alias:{
        '@': resolve('src')
      }
    },
    server:{
      port:8080,
      open:true, //服务启动自动打开浏览器
      proxy:{    //代理
        '/api':{
          target: 'http://localhost:3000/api',
          // target: mode==='development'?loadEnv(mode, process.cwd()).VITE_APP_DEV_URL:loadEnv(mode, process.cwd()).VITE_APP_PROD_URL,
          changeOrigin: true,
          rewrite:(path)=>path.replace(/^\/api/,''),//代理地址的重写
          // secure: false,
        },
        //可配置多个
  
      }
  
    }
  })
}
