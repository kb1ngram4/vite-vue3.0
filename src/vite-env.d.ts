/// <reference types="vite/client" />
#开发环境
VITE_APP_TITLE="朱兴"
#端口号
VITE_APP_PORT="3000"
#请求接口
VITE_APP_DEV_URL="http://localhost:3000"
#前缀
VITE_APP_BASE_URL="/api"
// 以.vue文件结尾的文件都是vue组件
declare module '*.vue' { import { Component } from 'vue'; const component: Component; export default component;}
