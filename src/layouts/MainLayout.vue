<script setup lang="ts">

const links = [
  {
    label  : 'Inicio',
    urlName: 'home',
  },
  {
    label  : 'Inventario',
    urlName: 'inventory',
  },
]

</script>

<template>
  <q-layout>
  <div class="w-screen h-screen flex">
    <div class="flex flex-col w-32 bg-blue-300 gap-4">
      <RouterLink
        v-for="link in links"
        :to="{
          name: link.urlName
        }"
        replace
        exact-active-class="bg-blue-400"
        class="p-2 text-white"
      >{{ link.label }}</RouterLink>
      <RouterLink to="/login">Logout</RouterLink>
    </div>
    <router-view />
  </div>
  </q-layout>
</template>

<style>
.exact-active-class {
  background-color: #ff4081 !important;
  color: white !important;
}
</style>
