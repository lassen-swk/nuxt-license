<template>

    <div class="flex px-4 py-3.5 border-b border-accented space-x-5">
      <UInput v-model="globalFilter" class="max-w-sm" placeholder="Filter..." />
      <UButton @click="onCreate" class="cursor-pointer">Neue Lizenz</UButton>
    </div>

    <UTable :data="allLicenses"
    :columns="columns"
    v-model:sorting="sorting"
    v-model:global-filter="globalFilter"
    v-model:column-visibility="columnVisibility"
    :ui="{
        th : 'cursor-default',
        tr : 'cursor-pointer',
        td: 'text-black'
    }"
    @select="onSelect"/>


    <UModal v-model:open="modalOpen">
            <template #content>
    <LicenseForm2 
    v-model:license="currentLicense"
     @licenseupdated="(newLicense : any) => {currentLicense = newLicense; refreshLicenses()}"
     @licensecreated ="(newLicense : any) => {modalOpen = false; refreshLicenses()} "
     @licensedeleted ="(formerLicense : any) => {currentLicense = undefined; modalOpen = false; refreshLicenses()} "
     @canceled = "(sameLicense : any) => {currentLicense = sameLicense}"

     />
            </template>
    </UModal>

</template>



<script setup lang="ts">
const {fetchAllLicenses} = UseLicense()
const {formatDate, getDaysLeft} = useUtil()
const today= new Date()

const allLicenses = ref()
allLicenses.value = await fetchAllLicenses()
const refreshLicenses = async () => {
    allLicenses.value = await fetchAllLicenses()
}
const globalFilter= ref()
const UButton = resolveComponent('UButton')
const ColorDot = resolveComponent('ColorDot')

const modalOpen = ref(false)
const formType = ref()
const currentLicense = ref()

const columns = [
    {
        header: ({column} : any) => getHeader(column, 'Lizenz'),
        accessorKey: 'title',
        id: 'title'
    },
    {
        header: ({column} : any) => getHeader(column, 'Eingepfl. von:'),
        accessorFn: (row: any) => row.author?.username ?? '',
        id: 'authorName',
        cell: (row: any) => {
            // console.log(row.row.original.author)
            const author = row.row.original.author || undefined;
            const fullName = author ? author.username : '';
            return fullName;
        }
    },

    {
        header: ({column} : any) => getHeader(column, 'Firma'),
        accessorKey: 'firm'
    },

    {
        header: ({column} : any) => getHeader(column, 'Läuft aus:'),
        id: 'expiryDate',
        accessorFn: (row: any) => new Date(row.expiryDate),
        meta: {
            class: {
            td: 'font-mono',
      }},
        cell: (row: any) => {
            const dateObject = new Date(row.row.original.expiryDate)
            const expiry = formatDate(dateObject)
            const daysLeft = getDaysLeft(today, dateObject)
            return h('div', { class: 'flex items-center gap-2', title : (daysLeft >= 0)? `Noch ${daysLeft} Tage` : 'Abgelaufen'},
            [
            h(ColorDot, { daysLeft: daysLeft}),
            h('span', expiry)
            ])

        }
    },

    {
        header: "Invisible",
        id: 'sortingDate',
        accessorFn: (row: any) => new Date(row.expiryDate).toLocaleDateString()
    }
]

function getHeader(column : any, label: string) {
  const isSorted = column.getIsSorted()
  return h(UButton, {

        variant: 'ghost',
        label,
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: isSorted ?  '-mx-2.5 bg-blue-200 cursor-pointer' : '-mx-2.5 cursor-pointer' , 
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
}

const sorting = ref([
  {
    id: 'expiryDate',
    desc: false
  },
])

const columnVisibility = ref(
    {sortingDate : false}
)

const onCreate = () => {
    currentLicense.value = undefined;
    modalOpen.value = true;
}

const onSelect = (e: Event, row: any) => {
  console.log(row.original)
  currentLicense.value = row.original
  modalOpen.value = true
}




</script>