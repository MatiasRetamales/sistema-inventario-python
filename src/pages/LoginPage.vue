<script setup
  lang="ts">

import { toTypedSchema } from '@vee-validate/zod'
import { ValidString } from 'app/modules/shared/domain/value_objects/valid-string'
import {
  checkWrapType,
  checkWrapTypeErrors
} from 'app/modules/shared/utils/wrap-type'
import IconButton from 'components/IconButton.vue'
import TextInput from 'components/TextInput.vue'
import { useUser } from 'stores/useUser'
import {
  ErrorMessage,
  Field,
  useForm
} from 'vee-validate'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const form = useForm( {
  validationSchema: toTypedSchema(
    z.object( {
      email   : z.string( {
        message: 'Ingrese Usuario',
      } ),
      password: z.string({
        message: 'Ingrese Contraseña',
      })
    } )
  )
} )

const store = useUser()
const router = useRouter()
const onSubmit = form.handleSubmit( ( values ) => {
  console.log( 'Form submitted!', values )
  store.login()
  router.replace( {
    name: 'home',
  } )
} )
</script>

<template>
  <router-view>
    <div class="flex flex-col h-screen w-screen items-center justify-center bg-gray-100">
      <form @submit="onSubmit"
        class="max-w-xl flex flex-col justify-center gap-10">
        <Field name="email"
          v-slot="{field}">
          <div class="flex flex-col gap-2">
            <text-input header="Usuario"
              v-bind="field"
              type="text"></text-input>
            <ErrorMessage class="text-red-600" name="email"/>
          </div>
        </Field>
        <Field name="password"
          v-slot="{field}">
          <div class="flex flex-col gap-2">
            <text-input header="Contraseña"
              v-bind="field"
              type="password"></text-input>
            <ErrorMessage class="text-red-600" name="password"/>
          </div>
        </Field>
        <icon-button label="Ingresar"></icon-button>
      </form>
    </div>
  </router-view>
</template>

<style scoped>

</style>
