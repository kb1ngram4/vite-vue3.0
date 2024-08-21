
import { createRouter,createMemoryHistory,createWebHistory } from "vue-router";
import routes from "./routes";
/**
 *createMemoryHistory//不会有历史记录
 */

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router