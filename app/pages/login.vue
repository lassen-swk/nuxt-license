<template>
  <div>
    <div class="w-full flex flex-col items-center justify-center min-h-screen">
  <UForm :schema="schema" :state="state" class="space-y-4 p-5" @submit="onSubmit">

    <div class="text-2xl font-bold">SWK Lizenzverwaltung</div>

    <UFormField label="Benutzername" name="username">
      <UInput autofocus v-model="state.username" />
    </UFormField>

    <UFormField label="Passwort" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit">
      Anmelden
    </UButton>
  </UForm>

</div>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot'

const router = useRouter();
const toast = useToast();
const {login, authCookie} = useUser();

definePageMeta({
  layout: "noframe",
});

const schema = v.object({
  username: v.pipe(v.string()),
  password: v.pipe(v.string())
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  username: '',
  password: ''
})

const onSubmit = async () => {
    try {
  await login(state.username, state.password)
  router.push('/')
  }
    
  catch {
    toast.add({ title: 'Fehler', description: 'Anmeldung fehlgeschlagen', color: 'error' })
}
}


</script>
