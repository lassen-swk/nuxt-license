<template>
    <UModal v-model:open="modalOpen">
            <template #content>
 <LicenseForm :license="currentLicense" />
            </template>
    </UModal>
    <LicenseForm :license="currentLicense" />
    {{ currentLicense }}
</template>

<script setup lang="ts">
const modalOpen = ref(false)
const {fetchAllLicenses} = UseLicense()
const allLicenses : any = await fetchAllLicenses()
const currentLicense = ref(allLicenses[0])
defineShortcuts({
  o: () => modalOpen.value = !modalOpen.value
})

</script>