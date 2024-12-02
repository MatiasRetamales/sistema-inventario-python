<script setup lang="ts">

import { ref } from 'vue'

interface IconButtonProps {
	icon: string
}

defineProps<IconButtonProps>()

// const numero = defineModel<number>({
//   default: 10,
// })
const numero = ref(10)

const emit = defineEmits<{
  notify: [number]
}>()

const changeNumber = () => {
  numero.value += 1
  emit('notify', numero.value)
}
</script>

<template>
  <button @click="changeNumber">
    icon-button {{ numero }} {{ icon }}
  </button>
</template>

<style scoped>

</style>
