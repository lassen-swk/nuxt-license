<template>
    <UIcon v-if="warning" name="fluent-mdl2:alert-solid" :class="colorClass"/>
    <UIcon v-else name="fluent-mdl2:status-circle-outer" :class="colorClass" />
</template>


<script setup>
const props = defineProps({ daysLeft: Number })

const pickedColor = computed(() => {
  if (props.daysLeft < 0) return 'pink'
  if (props.daysLeft < 4) return 'red'
  if (props.daysLeft < 8) return 'orange'
  if (props.daysLeft < 15) return 'yellow'
  if (props.daysLeft < 31) return 'green'
  return 'blue'
})

const warning = computed(() => props.daysLeft < 0)

const colorMap = {
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  orange: 'text-orange-500',
  red: 'text-red-500',
  pink: 'text-pink-500',
}

const colorClass = computed(() => colorMap[pickedColor.value])

</script>