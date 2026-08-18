<template>
  <aside class="flex w-60 shrink-0 flex-col bg-gray-900 p-3 text-gray-100">
    <div class="px-3 pb-6 pt-2 text-lg font-bold">
      My App
    </div>

    <nav class="flex flex-col gap-1">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
        active-class="bg-gray-700/60 text-white"
      >
        <UIcon :name="item.icon" class="h-[18px] w-[18px]" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </nav>
  </aside>
</template>


<script setup>


const navItems = [
  { label: 'Overview', to: '/', icon: 'i-lucide-layout-dashboard' },
  { label: 'Lizenzen', to: '/license', icon: 'i-lucide-key-round' },
]
</script>