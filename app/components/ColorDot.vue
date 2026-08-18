<template>
    <UIcon v-if="warning" name="fluent-mdl2:alert-solid" :class="colorClass"/>
    <UIcon v-else name="fluent-mdl2:status-circle-outer" :class="colorClass" />
</template>


<script setup>
const props = defineProps({
  expiry: { type: Date },
})

const pickedColor = ref('blue')
const today = new Date()
const timeLeft = Math.ceil((props.expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))
const warning = ref(false)



const changeColor = () => {
    if (timeLeft < 31) {
    pickedColor.value='green'
}
if (timeLeft < 15) {
    pickedColor.value='yellow'
}
if (timeLeft < 8) {
    pickedColor.value='orange'
}
if (timeLeft < 4) {
    pickedColor.value='red'
}
if (timeLeft < 0) {
    pickedColor.value='pink'
    warning.value = true
}
}     
changeColor()

const colorMap = {
  blue: 'text-blue-500',
  green: 'text-green-500',
  yellow: 'text-yellow-500',
  orange: 'text-orange-500',
  red: 'text-red-500',
  pink: 'text-pink-500',
}

const colorClass = computed(() => colorMap[pickedColor.value])
console.log(timeLeft, colorClass.value)

</script>