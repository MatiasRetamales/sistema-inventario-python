<script setup
  lang="ts">

import IconButton from 'components/IconButton.vue'
import { useUser } from 'stores/useUser'
import { ref } from 'vue'

const links            = [
  {
    label  : 'Inicio',
    urlName: 'home'
  },
  {
    label  : 'Inventario',
    urlName: 'inventory'
  },
  {
    label  : 'Movimientos',
    urlName: 'movement'
  },
  {
    label  : 'Proveedores',
    urlName: 'provider'
  },
  {
    label  : 'Usuarios',
    urlName: 'user'
  },
  {
    label  : 'Perfil',
    urlName: 'user-edit'
  }
]
const leftDrawerOpen   = ref( false )
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer show-if-above
      v-model="leftDrawerOpen"
      side="left"
      class="flex flex-col justify-between q-pa-sm"
      bordered>
      <div class="flex flex-col gap-4">
        <RouterLink
          v-for="link in links"
          :to="{
          name: link.urlName
        }"
          v-slot="{isExactActive}"
        >
          <icon-button type="button"
            class="w-full"
            :severity="isExactActive ? 'contrast' :'secondary'"
            :label="link.label"></icon-button>
        </RouterLink>
      </div>
      <div>
        <RouterLink
          replace
          class="mb-8"
          :to="{
        name: 'login'
      }">
          <icon-button type="button"
            class="w-full"
            severity="secondary"
            label="Cerrar Sesion"></icon-button>
        </RouterLink>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<style>
</style>
