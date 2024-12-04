<script setup
  lang="ts">

import { toTypedSchema } from '@vee-validate/zod'
import IconButton from 'components/IconButton.vue'
import PasswordInput from 'components/PasswordInput.vue'
import TextInput from 'components/TextInput.vue'
import { passwordSchema } from 'src/utils/zod-schemas'
import { useUser } from 'stores/useUser'
import {
  ErrorMessage,
  useForm
} from 'vee-validate'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const form = useForm( {
  validationSchema: toTypedSchema(
    z.object( {
      user    : z.string( {
        message: 'Ingrese Usuario'
      } )
                 .min( 1, {
                   message: 'Ingrese Usuario'
                 } ),
      password: z.string( {
        message: 'Ingrese Contraseña'
      } )
                 .min( 1, {
                   message: 'Ingrese Usuario'
                 } )
    } )
  )
} )

const store    = useUser()
const router   = useRouter()
const onSubmit = form.handleSubmit( ( values ) => {
  store.login()
  router.replace( {
    name: 'home'
  } )
} )
</script>

<template>
  <router-view>
    <div class="flex flex-col h-screen w-screen items-center justify-center bg-gray-50">
      <form @submit="onSubmit"
        class="max-w-xl flex flex-col justify-center gap-4">
        <text-input
          name="user"
          header="Usuario"
          type="text"></text-input>
        <password-input
          header="Contraseña"
          name="password"></password-input>
        <icon-button type="submit" severity="secondary" label="Ingresar"></icon-button>
      </form>
    </div>
  </router-view>
</template>

<style scoped>

</style>
