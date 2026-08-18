<template>
  <div class="grid grid-cols-1 gap-5 md:grid-cols-4 ">
    <DashboardWidget title="Revenue" class="md:col-span-2">
      <p>Chart or stat goes here.</p> <UIcon name="fluent-mdl2:status-circle-outer" :class="mycolor"  />
    </DashboardWidget>

    <DashboardWidget title="Active Users">
      <p>Stat goes here.Stat goes here.Stat goes here.Stat goes here.Stat goes here.Stat goes here.Stat goes here.Stat goes here.Stat goes here.</p>
    </DashboardWidget>

    <DashboardWidget title="Recent Activity" class="md:col-span-2 md:row-span-2">
      <p>List/table goes here.</p>
    </DashboardWidget>

    <DashboardWidget title="Tasks">
      <p>Widget content.</p>
    </DashboardWidget>
  </div>
</template>

<script setup lang="ts">
  const mycolor=ref('text-green-500')
</script>