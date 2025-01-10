import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import SubMenu from '@/components/layout/SubMenu.vue'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// Register SubMenu globally for recursive use
app.component('SubMenu', SubMenu)

app.use(router).use(ElementPlus).mount('#app')
