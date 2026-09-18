<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
const {currentUser, updateUser} = useUser()
const toast = useToast();
const router = useRouter();


const schema = z.object({
  email: z.email("Dies ist keine gültige E-Mail"),
  oldPassword: z
  .string("Altest Passwort zur Bestätigung eingeben")
  .min(1, 'Bitte Passwort eingeben'),
  newPassword: z
    .string("Diese Zeichen sind nicht gültig"),
  confirmPassword: z
    .string("Diese Zeichen sind nicht gültig"),
    firstname: z
    .string("Diese Zeichen sind nicht gültig"),
    lastname: z
    .string("Diese Zeichen sind nicht gültig"),
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
   path: ['confirmPassword'],
})


type Schema = z.output<typeof schema>;

  const state = reactive<Partial<Schema>>({
  email: currentUser?.value?.email,
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  firstname: currentUser?.value?.firstname,
  lastname: currentUser?.value?.lastname,
})

const loading = ref(false);

const emit = defineEmits(["formSubmitted"])

async function onSubmit(event: FormSubmitEvent<any>) {
  const updateData : any = Object.fromEntries(
  Object.entries(state).filter(([key, value]) => 
    value !== '' && key!=='confirmPassword' ))
  const res = await updateUser(currentUser.value?.id || '', updateData); 
  if (res) {toast.add({title: "Erfolg", description: "Benutzerdaten wurden geändert"});
  currentUser.value = res;
  router.push('/');
}

}


</script>

<template>
    <UForm  :state="state" :schema="schema" class="space-y-4 m-4" @submit.prevent="onSubmit">

        <h1 class="m-4 font-bold">{{ currentUser?.username }}</h1>        

        <UFormField class="m-4" label="Vorname" name="first_name">
        <UInput v-model="state.firstname" />
        </UFormField>

        <UFormField class="m-4" label="Nachname" name="last_name">
        <UInput v-model="state.lastname" />
        </UFormField>
       
        <UFormField class="m-4" label="Neues Passwort (Optional)" name="newPassword">
        <UInput v-model="state.newPassword" type="password" />
        </UFormField>

        <UFormField class="m-4" label="Neues Passwort wiederholen" name="confirmPassword">
        <UInput v-model="state.confirmPassword" type="password" />
        </UFormField>

        <UFormField class="m-4" label="Derzeitiges Passwort zur Bestätigung eingeben" name="oldPassword">
        <UInput v-model="state.oldPassword" type="password" />
        </UFormField>   

        <UButton class="m-4 hover:cursor-pointer" type="submit">
        Bestätigen
        </UButton>

     
    </UForm>
</template>