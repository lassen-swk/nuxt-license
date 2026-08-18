<template>
  <UForm :schema="schema" :state="state" class="flex-1 overflow-y-auto p-6 space-y-4" @submit="onSubmit">
    <UFormField label="Lizenz" name="title">
      <UInput v-if="editing" v-model="state.title" />
      <div v-else>{{ state.title }}</div>
    </UFormField>

    <UFormField label="Firma" name="firmField">
      <UInput v-if="editing" v-model="state.firm"/>
      <div v-else>{{ state.firm }} </div>
    </UFormField>

    <UFormField label="Läuft aus am:" name="expiryISO">
      <input v-if="editing" type="date" id="expiryId" v-model="state.expiryISO" name="expiryISO">
      <div v-else> {{state.expiryISO}} </div> 
    </UFormField>
  
    <UFormField label="Info" name="info">
        <UTextarea v-if="editing" v-model="state.info" class="w-full"
            :rows="6"/>
        <div v-else>{{ state.info }}</div>
    </UFormField>


    <UButton v-if="!editing" type="button" @click="() => editing = true">
      Bearbeiten
    </UButton>

    <UButton v-if="editing" type="submit">
      Speichern
    </UButton>
  </UForm>


</template>


<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps(['license'])
const emit = defineEmits(["licenseupdated"])

const editing = ref(false)

const {createLicense, updateLicense} = UseLicense()

const schema = v.object({
  title : v.pipe(v.string(), v.minLength(3, "Mindestlänge: 3 Zeichen")),
  expiryISO : v.pipe(v.string(), v.minLength(8, "Kein Ablaufdatum gewählt"))
})

type Schema = v.InferOutput<typeof schema>
const myvar = new Date().toISOString().split('T')[0]
const state = reactive({
  title :props.license.title,
  firm: props.license.firm,
  expiryISO: computed ( () => new Date(props.license.expiryDate).toISOString().split('T')[0] as string),
  info: props.license.info
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
    const input = {
      title: state.title,
      firm: state.firm,
      expiryDate: new Date(state.expiryISO),
      info: state.info,
    }
  const newLicense = await updateLicense(props.license.id, input)
  if (newLicense) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  emit("licenseupdated", newLicense)
  editing.value = false
  }
}
  

</script>