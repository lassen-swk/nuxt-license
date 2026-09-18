<template>
    <Pie
    id="expiriesChart"
    :options ="chartOptions"
    :data="chartData"
     />
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PieController, ArcElement, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, PieController, CategoryScale, LinearScale, ArcElement, Filler)



const {getDaysLeft} = useUtil()
const now = new Date()


const expiries = {
    expired : 0,
    under3 : 0,
    under7: 0,
    under14: 0,
    under30: 0,
    over30: 0
}

const props = defineProps({ licenses : Array}) as any

for (const license of props?.licenses) {
    const daysLeft = getDaysLeft(now, new Date (license.expiryDate)) ;
    if (daysLeft <= 0) {expiries.expired += 1}
    else if (daysLeft <= 3 ) {expiries.under3 +=1}
    else if (daysLeft <= 7 ) {expiries.under7 +=1}
    else if (daysLeft <= 14 ) {expiries.under14 +=1}
    else if (daysLeft <= 30 ) {expiries.under30 +=1}
    else {expiries.over30 += 1}
}

const chartData = ref({
        labels: ['Abgelaufen', 'Unter 3 Tagen', "Unter 7 Tagen", 'Unter 14 Tagen', 'Unter 30 Tagen', 'Noch über 30 Tage'],
        datasets: [ { data: Object.values(expiries),
                
                      backgroundColor: ['#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
                      fill: true
         } ],
      })

    const chartOptions = {
//        cutout : '40%'
    }
</script>