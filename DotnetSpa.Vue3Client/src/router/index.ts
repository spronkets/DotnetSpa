import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard.vue'),
    },
    {
      path: '/vuex-dashboard',
      name: 'vuex-dashboard',
      component: () => import('@/views/vuex-dashboard.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/not-found.vue'),
    },
  ],
})

export default router
