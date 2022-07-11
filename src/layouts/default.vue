<script setup lang="ts">
await contract.connect()
</script>

<template>
  <div class="flex flex-row">
    <Sidebar />

    <div class="p-10 w-full">
      <RouterView />
    </div>
  </div>
</template>
