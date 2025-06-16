import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/page-a',
      name: 'PageA',
      component: () => import('@/views/page-a.vue'),
    },
    {
      path: '/page-b',
      name: 'PageB',
      component: () => import('@/views/page-b.vue'),
    },
  ],
})

export default router
