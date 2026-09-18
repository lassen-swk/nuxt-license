<template>
    <UTable :data="licenses"
    :columns="columns"

    :ui="{
        td: 'text-black'
    }"
    />
</template>


<script setup lang="ts">

const props = defineProps({ licenses : Array}) as any
const {formatDate, getDaysLeft} = useUtil()
const today = new Date()
const ColorDot = resolveComponent('ColorDot')

const columns = [
    {
        header: 'Lizenz',
        accessorKey: 'title',
        id: 'title'
    },
    {
        header: 'Eingepfl. von',
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
        header: 'Läuft aus:',
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

]

const onSelect = () => {}

</script>