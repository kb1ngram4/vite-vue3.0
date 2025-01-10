import { defineAsyncComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

const TableCar = defineAsyncComponent(() => import('@/views/tableCar.vue'))
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: '主页',
            show: true,
            icon: 'location'
        },
    },
    {
        path: '/carmanage',
        name: '车辆管理',
        meta: {
            title: '车辆管理',
            show: true,
            icon: 'location'
        },
        redirect: '/carmanage/carRecord',
        children: [
            {
                path: '/carmanage/carRecord',
                name: '车辆档案',
                meta: {
                    title: '车辆档案',
                    show: true,
                    icon: 'location'
                },
                component: () => import('@/views/cascader.vue'),
            },
            {
                path: '/carmanage/carMonitor',
                name: '车辆监控',
                meta: {
                    title: '车辆监控',
                    show: true,
                    icon: 'location'
                },
                component: () => import('@/views/tree.vue')
            },
        ]
    },
    {
        path: '/uploadFile',
        name: 'uploadFile',
        component: () => import('@/views/uploadFile.vue'),
        meta: {
            title: '上传文件',
            show: true,
            icon: 'location'
        }
    },
    {
        path: '/drag',
        name: 'Drag',
        component: () => import('@/views/DragDemo.vue'),
        meta: {
            title: '拖拽演示',
            show: true,
            icon: 'Rank'
        }
    },
    {
        path: '/worker',
        name: 'Worker',
        component: () => import('@/views/WorkerDemo.vue'),
        meta: {
            title: 'Worker Demo',
            show: true,
            icon: 'Promotion'
        }
    }
]
export default routes