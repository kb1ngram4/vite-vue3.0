import { createRouter,createMemoryHistory,createWebHashHistory,RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'Home',
        component: ()=>import('@/views/Home.vue')
    },
]
const router = createRouter({
    history: createMemoryHistory(),
    routes
})
export default router