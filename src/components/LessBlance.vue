<script setup lang="ts">
const props = defineProps<{ address: string }>()

let balance = $ref('')

await contract.getBalance(props.address).then((result) => {
  balance = result.data
})
</script>

<template v-if="Number(balance) < 0.002">
  <div class="mt-2">
    <div class="block">
      You only have <b>{{ balance }} $CSB</b>, which may not be enough to complete the character creation.
    </div>
    <a-link href="https://faucet.crossbell.io/">
      Get some from Crossbell Faucet.
    </a-link>
  </div>
</template>
