<template>
  <UForm :schema="schema" :state="state" class="flex-1 overflow-y-auto p-6 space-y-4" @submit="onSubmit">
    
    <div class="pb-4 border-b border-gray-200 dark:border-gray-700 space-y-2">

    <UFormField v-if="editing || creating" name="title" label="Lizenzname">
      <UInput  v-model="state.title"/>
    </UFormField>
    <UFormField v-else name="titleShow">
      <div class="text-lg font-bold">{{ state.title }}</div>
    </UFormField>

    <UFormField v-if="creating || editing" name="expiryISO" label="Ablaufdatum">
      <input type="date" id="expiryId" v-model="state.expiryISO" name="expiryISO">
    </UFormField>


  <UFormField v-else name="expiryShow">
        <div class ="flex space-x-5">
        <UBadge
          variant="subtle"
          size="lg"
          :title="(state.daysLeft >= 0) ? `Noch ${state.daysLeft} Tage` : 'Abgelaufen'"
        >
        <ColorDot :daysLeft="state.daysLeft" />
        {{ formatFromISO(state.expiryISO) }}
        </UBadge>

          <UBadge
          variant="subtle"
          size="lg"

        >
        <div v-if="state.daysLeft >= 0">
         Noch {{ state.daysLeft }} Tage
        </div>
        <div v-else>
          Abgelaufen!
        </div>
        </UBadge>



        </div>
  </UFormField>
    </div>

    
    <UFormField label="Firma" name="firmField" >
      <UInput v-if="editing || creating" v-model="state.firm"/>
      <div v-else>{{ state.firm }} </div>
    </UFormField>


    <UFormField label="Info" name="info">
        <UTextarea v-if="editing || creating" v-model="state.info" class="w-full"
            :rows="6"/>
        <div v-else>{{ state.info }}</div>
    </UFormField>

    <UFormField v-if="!editing && !creating" label="Eingepflegt von" name="author">
    <div> {{ state.authorName }} </div>
    </UFormField>


        <div class="flex space-x-5 ">
    <UButton v-if="!editing && !creating" type="button" @click="() => editing = true">
      Bearbeiten
    </UButton>

    <UButton v-if="editing" type="submit">
      Änderungen Speichern
    </UButton>

    <UButton v-if="creating" type="submit">
      Lizenz Speichern 
    </UButton>

    <UButton v-if="!creating" color="error" @click="() => {modalOpen = true}">
      Löschen
    </UButton>

    <UButton v-if="editing || creating" @click="onCancel">
      Abbrechen
    </UButton>

      </div>

  </UForm>

      <UModal v-model:open="modalOpen">
            <template #content>
                  <span class="flex justify-center p-4">Wollen Sie diese Lizenz wirklich löschen? </span>
              <div class="flex space-x-15 justify-center py-4">
                <UButton class="w-20 justify-center hover:cursor-pointer" color="error" @click="onDelete">Ja</UButton>
                <UButton class="w-20 justify-center hover:cursor-pointer" @click="() => {modalOpen = false}" >Nein</UButton>
              </div>
            </template>
    </UModal>

</template>


<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const props = defineProps(['license'])
const emit = defineEmits(["licenseupdated", "licensecreated", "licensedeleted", "canceled"])
const dateObjectRef = ref(computed (() => props.license ? new Date(props.license.expiryDate) : new Date()))

const editing = ref(false)
const creating =ref(props.license ? false : true)
const modalOpen = ref(false)

const {createLicense, updateLicense, deleteLicense} = UseLicense()
const {formatDate, formatFromISO, getDaysLeft} = useUtil()
const {currentUser} = useUser()


const schema = v.object({
  title : v.pipe(v.string(), v.minLength(3, "Mindestlänge: 3 Zeichen")),
  expiryISO : v.pipe(v.string(), v.minLength(8, "Kein Ablaufdatum gewählt"))
})
const today = new Date()
type Schema = v.InferOutput<typeof schema>
const myvar = new Date().toISOString().split('T')[0]
const state = reactive({
  title : props.license ? props.license.title : '',
  firm: props.license ? props.license.firm : '',
  expiryISO: props.license ? dateObjectRef.value.toISOString().split('T')[0] as string : '',
  info: props.license ? props.license.info : '',
  daysLeft : computed ( () => getDaysLeft(today, dateObjectRef.value) ) ,
  authorName: props.license ? props.license.author.username : ''
})

const toast = useToast()

async function onSubmit() {
  console.log("stuff submitted")
  if (creating.value) {await onCreate()}
  if (editing.value) {await onUpdated()}
} 

async function onUpdated() {
    const input = {
      title: state.title,
      firm: state.firm,
      expiryDate: new Date(state.expiryISO),
      info: state.info,
    }
  const newLicense = await updateLicense(props.license.id, input)
  if (newLicense) {
  toast.add({ title: 'Erfolg', description: 'Änderungen gespeichert.', color: 'success' })
  emit("licenseupdated", newLicense)
  editing.value = false
  
  }
}

async function onCreate() {
      const input = {
      title: state.title,
      firm: state.firm,
      expiryDate: new Date(state.expiryISO),
      info: state.info,
      authorId: currentUser.value.id
    }
    const newLicense = await createLicense(input)
      if (newLicense) {
  toast.add({ title: 'Erfolg', description: 'Neue Lizenz gespeichert.', color: 'success' })
  emit("licensecreated", newLicense)
  creating.value = false
  }
}

function onCancel() {
  emit("canceled")
}

async function onDelete() {
    const formerLicense = await deleteLicense(props.license.id)
    if (formerLicense) {
      toast.add({ title: 'Erfolg', description: 'Lizenz wurde gelöscht', color: 'success' })
    editing.value = false
    modalOpen.value = false
    emit("licensedeleted", formerLicense)
    }

}

</script>