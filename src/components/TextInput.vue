<script setup
  lang="ts">
interface InputTextProps {
  placeholder?: string
  header?: string
  disabled?: boolean
  type : 'text' | 'password' | 'email'
}

const props = defineProps<InputTextProps>()
const modelValue = defineModel<string>()
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <label v-if="header" :for="header">{{ header }}</label>
    <InputText :type :placeholder v-model="modelValue" />
  </div>
</template>

<style scoped>

</style>
