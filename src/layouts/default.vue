<script setup lang="ts">
import { useStore } from '~/stores/wallet'

const store = useStore()
const router = useRouter()

if (!store.address) router.push('/')
</script>

<template>
  <RouterView />
</template>
