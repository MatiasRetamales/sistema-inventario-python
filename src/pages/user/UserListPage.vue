<script setup
  lang="ts">
import IconButton from 'components/IconButton.vue'
import { storeToRefs } from 'pinia'
import { useUser } from 'stores/useUser'
import {
  onMounted,
  ref
} from 'vue'
import { useRouter } from 'vue-router'

const router       = useRouter()
const store        = useUser()
const { userList } = storeToRefs( store )

const rowsPerPage  = 3
// ajustar total
const totalRecords = ref( 5 )
const loading      = ref( false )

const dataPage = ( event: any ) => {
  loading.value        = true
  const { page, rows } = event
  const from           = page * rows
  const to             = from + rows
  store.getUsers( from, to )
  loading.value = false
}

const navigateCreateUser = () => {
  router.push( {
    name: 'user-create'
  } )
}

onMounted( () => {
  store.getUsers( 0, 3 )
} )

</script>

<template>
  <q-page>
    <div class="q-pa-md w-full flex justify-between">
      <span>Usuarios</span>
      <icon-button @click="navigateCreateUser"
        severity="secondary"
        icon="pi pi-plus"
        label="Crear Usuario"></icon-button>
    </div>
    <DataTable :value="userList"
      paginator
      @page="dataPage"
      stripedRows
      :rows="rowsPerPage"
      :total-records="totalRecords"
      :loading="loading"
      :lazy="true"
      table-style="min-height: 86.5vh">
      <Column style="width:33.3%"
        sortable
        field="id.value"
        header="ID"></Column>
      <Column style="width:33.3%"
        sortable
        field="name.value"
        header="Nombre"></Column>
      <Column style="width:33.3%"
        sortable
        field="surname.value"
        header="Appelido"></Column>
    </DataTable>
  </q-page>
</template>

<style scoped>

</style>
