<template>
  <div class="flex flex-col rounded-xl bg-white shadow-sm">
    <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
      <h3 class="text-sm font-semibold">{{ title }}</h3>
      <slot name="actions" />
    </div>
    <div class="flex-1 p-5">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
})
</script>