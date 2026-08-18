<template>
  <UForm :schema="schema" :state="state" class="flex-1 overflow-y-auto p-6 space-y-4" @submit="onSubmit">
    <UFormField label="Lizenz" name="title">
      <UInput v-model="state.title" />
    </UFormField>

    <UFormField label="Firma" name="firmField">
      <UInput v-model="state.firm"/>
    </UFormField>

    <UFormField label="Läuft aus am:" name="expiryISO">
      <input type="date" id="expiryId" v-model="state.expiryISO" name="expiryISO">
    </UFormField>
  
    <UFormField label="Info" name="info">
        <UTextarea v-model="state.info" class="w-full"

            :rows="6"/>
        </UFormField>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>

  {{ myvar }}
</template>


<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const {createLicense} = UseLicense()

const emit = defineEmits(["formsubmit"])

const schema = v.object({
  title : v.pipe(v.string(), v.minLength(3, "Mindestlänge: 3 Zeichen")),
  expiryISO : v.pipe(v.string(), v.minLength(8, "Kein Ablaufdatum gewählt"))
})

type Schema = v.InferOutput<typeof schema>
const myvar = new Date().toISOString().split('T')[0]
const state = reactive({
  title :'',
  firm: '',
  expiryISO: '',
  info: ''
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    const licenseData = {
      title: state.title,
      firm: state.firm,
      expiryDate: new Date(state.expiryISO),
      info: state.info,
      authorId: 2
    }

  const res = await createLicense(licenseData)
  emit("formsubmit")
  
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })

}
  

</script>