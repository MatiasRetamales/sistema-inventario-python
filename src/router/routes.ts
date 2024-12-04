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
        name     : 'inventory',
        path     : 'inventory',
        component: () => import('pages/inventory/InventoryListPage.vue')
      },
      {
        name     : 'inventory-create',
        path     : 'inventory/create',
        component: () => import('pages/inventory/InventoryCreatePage.vue')
      },
      {
        name     : 'inventory-edit',
        path     : 'inventory/edit',
        component: () => import('pages/inventory/InventoryEditPage.vue')
      },
      {
        name: 'user',
        path: 'user', component: () => import('pages/user/UserListPage.vue')
      },
      {
        name     : 'user-create',
        path     : 'user/create',
        component: () => import('pages/user/UserCreatePage.vue')
      },
      {
        name     : 'user-edit',
        path     : 'user/edit',
        component: () => import('pages/user/UserEditPage.vue')
      },
      {
        name     : 'provider',
        path     : 'provider',
        component: () => import('pages/provider/ProviderListPage.vue')
      },
      {
        name     : 'provider-create',
        path     : 'provider/create',
        component: () => import('pages/provider/ProviderCreatePage.vue')
      },
      {
        name     : 'movement',
        path     : 'movement',
        component: () => import('pages/movement/MovementListPage.vue')
      },
      {
        name     : 'movement-create',
        path     : 'movement/create',
        component: () => import('pages/movement/MovementCreatePage.vue')
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
