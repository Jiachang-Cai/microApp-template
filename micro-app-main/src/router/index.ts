import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '', // 默认子路由
          name: 'home',
          component: () => import('@/views/index.vue'),
        },
        {
          path: 'page-a',
          name: 'PageA',
          component: () => import('@/views/page-a.vue'),
        },
        {
          path: 'page-b',
          name: 'PageB',
          component: () => import('@/views/page-b.vue'),
        },
        {
          path: 'micro/:catchAll(.*)*',
          name: 'SubApp',
          component: () => import('@/views/sub-app.vue'),
        }
      ]
    },
  ],
})

export default router
