import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path     : '/',
    name     : 'index',
    meta     : { requiresAuth: true },
    component: () => import('layouts/MainLayout.vue'),
    children : [
      {
        name: 'home',
        path: '', component: () => import('pages/IndexPage.vue')
      },
      {
        name: 'inventory',
        path: 'inventory', component: () => import('pages/InventoryPage.vue')
      }
    ]
  },
  {
    path     : '/login',
    name     : 'login',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path     : '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
