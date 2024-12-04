<script setup
  lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useField } from 'vee-validate'
import { z } from 'zod'

interface InputTextProps {
  name: string
  value?: string
  placeholder?: string
  header?: string
  disabled?: boolean
  type: 'text' | 'email'
}

const props      = defineProps<InputTextProps>()

const schema = props.type === 'email' ? toTypedSchema(
  z.string()
   .email( {
     message: 'Correo no válido'
   } )
) : toTypedSchema(
  z.string().min(1,{
    message: 'Debe tener al menos 1 caracter',
  })
)

const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
        meta
      } = useField( props.name, schema, {
  initialValue: props.value
} )

</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <label v-if="header" :for="name">{{ header }}</label>
    <InputText
      :type
      @blur="handleBlur"
      @input="handleChange"
      :disabled
      :id="name"
      :invalid="errorMessage"
      :name
      class="w-full"
      :placeholder
      v-model="inputValue"/>
    <Message size="small" severity="error" variant="simple">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped>

</style>
