<template>
  <div class="grid grid-cols-1  gap-5 md:grid-cols-3">
    <DashboardWidget title="Laufzeiten" class="md:col-span-1">
      <LicenseChart :licenses="allLicenses" />
    </DashboardWidget>

    <DashboardWidget title="Nahende Ablauftermine" class="h-fit">
      <SmallTable :licenses="allLicenses.slice(0,5)" />
    </DashboardWidget>
  


  </div>
</template>

<script setup lang="ts">
  const mycolor=ref('text-green-500')
  const {fetchAllLicenses} = UseLicense()
  const allLicenses : any  = ref (await fetchAllLicenses()) 
</script>