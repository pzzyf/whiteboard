import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import Home from '@/views/home.vue'
import NotFound from '@/views/not-found.vue'

// 定义路由配置
const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    redirect: 'home',
    children: [
      {
        path: 'home',
        component: Home,
      },
    ],
  },

  // 404 页面 - 必须放在最后
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '页面未找到',
    },
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
