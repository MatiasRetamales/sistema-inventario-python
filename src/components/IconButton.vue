<script setup lang="ts">

interface IconButtonProps {
	icon ?: string
	label ?: string
}

defineProps<IconButtonProps>()
</script>

<template>
  <button class="w-full py-1 flex bg-gray-300 rounded-lg items-center justify-evenly">
    <q-icon v-if="icon" :name="icon" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<style scoped>

</style>
