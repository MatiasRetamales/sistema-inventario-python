<script setup lang="ts">

interface IconButtonProps {
	icon ?: string
	iconPos ?: 'left' | 'right' | 'top' | 'bottom' | undefined
	label ?: string
  severity?:string
}

const {iconPos = 'left'} =defineProps<IconButtonProps>()
</script>

<template>
  <Button :icon-pos :icon :label :severity class="w-fit h-fit py-1 flex bg-gray-300 rounded-lg items-center justify-evenly">
<!--    <q-icon v-if="icon" :name="icon" />-->
<!--    <span v-if="label">{{ label }}</span>-->
  </Button>
</template>

<style scoped>

</style>
