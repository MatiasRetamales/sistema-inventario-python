<script setup
  lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import IconButton from 'components/IconButton.vue'
import PasswordInput from 'components/PasswordInput.vue'
import TextInput from 'components/TextInput.vue'
import { passwordSchema } from 'src/utils/zod-schemas'
import { useForm } from 'vee-validate'
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
      password: passwordSchema,
      repassword: z.string()
    } ).refine(
      ( data ) => data.password === data.repassword,
      {
        message: 'Las contraseñas no coinciden',
        path   : [ 'repassword' ]
      }
    )
  )
} )
const onSubmit = form.handleSubmit( ( values ) => {
} )
</script>

<template>
  <form @submit="onSubmit"
    class="max-w-xl flex flex-col justify-center gap-4">
    <text-input
      name="user"
      header="Usuario"
      type="text"></text-input>
    <password-input
      header="Contraseña"
      name="password"></password-input>
    <password-input
      header="Confirmar Contraseña"
      name="repassword"></password-input>
    <icon-button label="Ingresar"></icon-button>
  </form>
</template>

<style scoped>

</style>
