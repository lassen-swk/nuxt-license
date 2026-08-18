<template>
    <UTable :data="allLicenses"
    :columns="columns"

    @select="onSelect"/>
    {{ allLicenses }}

    <UModal v-model:open="modalOpen">
            <template #content>
    <LicenseForm 
    v-model:license="currentLicense"
     @licenseupdated="(newLicense : any) => {currentLicense = newLicense; console.log(currentLicense); refreshLicenses()}"
     />
            </template>
    </UModal>

</template>



<script setup lang="ts">
import { modal } from '#build/ui'



const {fetchAllLicenses} = UseLicense()

const allLicenses = ref()
allLicenses.value = await fetchAllLicenses()
const refreshLicenses = async () => {
    allLicenses.value = await fetchAllLicenses()
}

const UIcon = resolveComponent('UIcon')
const ColorDot = resolveComponent('ColorDot')

const modalOpen = ref(false)
const formType = ref()
const currentLicense = ref()

const columns = [
    {
        header: 'Lizenz',
        accessorKey: 'title'
    },
    {
        header: 'Eingepfl. von:',
        id: 'authorName',
        cell: (row: any) => {
            // console.log(row.row.original.author)
            const author = row.row.original.author || undefined;
            const fullName = author ? author.firstName + " " + author.lastName : '';
            return fullName;
        }
    },

    {
        header: 'Firma',
        accessorKey: 'firm'
    },

    {
        header: 'Läuft aus:',
        id: 'expiryDate',
                meta: {
        class: {
        td: 'font-mono',
      }},
        cell: (row: any) => {
            const expiry = new Date(row.row.original.expiryDate).toLocaleDateString()
            return h('div', { class: 'flex items-center gap-2', title : 'Tooltip' },
            [
            h(ColorDot, { expiry: new Date(row.row.original.expiryDate), class: '' }),
            h('span', expiry)
            ])

        }
    }
]

const sorting = ref([
  {
    id: 'lastUpdated',
    desc: false
  },



])

const onSelect = (e: Event, row: any) => {
  console.log(row.original)
  currentLicense.value = row.original
  modalOpen.value = true
}


</script>