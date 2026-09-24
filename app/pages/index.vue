<template>
  <div class="grid grid-cols-1  gap-5 md:grid-cols-3">
    <DashboardWidget title="Laufzeiten" class="md:col-span-1">
      <LicenseChart :licenses="allLicenses" />
    </DashboardWidget>

    <DashboardWidget title="Nahende Ablauftermine" class="h-fit">
      <SmallTable :licenses="allLicenses.slice(0,5)" />
    </DashboardWidget>

  </div>
    <UButton label="Mailversand Testen" class="mt-4 cursor-pointer" @click="onMailtest()" />
</template>

<script setup lang="ts">
  const mycolor=ref('text-green-500')
  const {fetchAllLicenses, testMailSend} = UseLicense()
  const allLicenses : any  = ref (await fetchAllLicenses()) 
        const toast = useToast()
  const onMailtest = async () => {
    try {

      const res = await testMailSend()
      toast.add( {title : "Mailer-Test", description: "Fällige Mails werden in Kürze gesendet"})

      console.log(res)
    }
    catch (error)
    {console.log(error)}
  }
</script>