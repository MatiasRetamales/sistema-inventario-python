<script setup
  lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { passwordSchema } from 'src/utils/zod-schemas'
import { useField } from 'vee-validate'
import { ref } from 'vue'

interface PasswordInputProps {
  name: string
  value?: string
  header?: string
  disabled?: boolean
}

const props = defineProps<PasswordInputProps>()

const {
        value: inputValue,
        errorMessage,
        handleBlur,
        handleChange,
        meta
      } = useField( props.name, toTypedSchema( passwordSchema ), {
  initialValue: props.value,
} )

type VisibilityType = 'password' | 'text'
const visibility = ref<VisibilityType>( 'password' )

const toggleVisibility = () => {
  visibility.value = visibility.value === 'password' ? 'text' : 'password'
}

</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <label v-if="header"
      :for="name">{{ header }}</label>
    <div class="relative w-full flex ">
      <button
        type="button"
        @click="toggleVisibility"
        class="absolute inset-y-0 -translate-x-1/2 right-0 flex items-center">
        <q-icon class="text-zinc-400"
          :name="visibility === 'password' ? 'visibility' : 'visibility_off'"/>
      </button>
      <InputText :type="visibility"
        :id="name"
        @blur="handleBlur"
        @input="handleChange"
        :disabled
        :invalid="errorMessage"
        class="w-full"
        :name
        v-model="inputValue"/>
    </div>
    <Message size="small" severity="error" variant="simple">{{ errorMessage }}</Message>
  </div>
</template>

<style scoped>

</style>
